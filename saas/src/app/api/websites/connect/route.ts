import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";
import { probeSiteConnection } from "../../../../lib/diagnostics";
import crypto from "crypto";

const connectSchema = z.object({
  siteUrl: z.string().refine((url) => {
    try {
      const fullUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
      const parsed = new URL(fullUrl);
      return parsed.hostname.includes(".") && parsed.hostname.length >= 3;
    } catch (e) {
      return false;
    }
  }, "Please enter a valid website domain or URL (e.g. https://example.com)"),
  apiKey: z.string().min(6, "API Key must be at least 6 characters."),
  hmacSecret: z.string().min(6, "HMAC Secret Key must be at least 6 characters."),
});

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
    }

    const body = await req.json();
    console.log("[Websites Connect API] Received connection request:", body);

    const result = connectSchema.safeParse(body);
    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0] || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { siteUrl, apiKey, hmacSecret } = result.data;
    let formattedUrl = siteUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }
    formattedUrl = formattedUrl.replace(/\/+$/, "");

    // 1. Live Probe against WordPress Plugin Health REST Endpoint
    const probeResult = await probeSiteConnection(formattedUrl);
    if (probeResult.connectionState === "not_detected") {
      return NextResponse.json(
        {
          error: `Could not detect WP-AI Connector plugin on '${formattedUrl}'. Please download, install, and activate the plugin on your WordPress site.`,
        },
        { status: 400 }
      );
    }

    // 2. Authenticated Probe against Inventory Endpoint with User's Keys
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = crypto.createHmac("sha256", hmacSecret.trim()).update(`${timestamp}.`).digest("hex");
      const invHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
        "X-WP-AI-API-Key": apiKey.trim(),
        "Authorization": `Bearer ${apiKey.trim()}`,
      };

      const invRes = await fetch(`${formattedUrl}/wp-json/wp-ai/v1/inventory`, { headers: invHeaders });
      if (!invRes.ok) {
        return NextResponse.json(
          {
            error: `Authentication failed on '${formattedUrl}' (HTTP ${invRes.status}). Please check that your Plugin API Key and HMAC Secret Key match your WP Admin settings.`,
          },
          { status: 400 }
        );
      }
    } catch (authErr: any) {
      return NextResponse.json(
        {
          error: `Unable to verify keys on '${formattedUrl}': ${authErr.message || "Connection refused"}. Make sure your WordPress site is online.`,
        },
        { status: 400 }
      );
    }

    const healthDiagnostics = probeResult.healthDiagnostics;

    // 3. Save Verified ConnectedWebsite record in PostgreSQL
    let connectedRecord;
    if ((prisma as any).connectedWebsite) {
      try {
        connectedRecord = await (prisma as any).connectedWebsite.create({
          data: {
            userId: payload.userId,
            siteUrl: formattedUrl,
            apiKey: apiKey.trim(),
            hmacSecret: hmacSecret.trim(),
            status: "active",
          },
        });
      } catch (e) {
        console.warn("[Websites Connect API] ConnectedWebsite create notice:", e);
      }
    }

    // 4. Save Verified WordPressSite record for Assistant display
    const siteName = new URL(formattedUrl).hostname.replace("www.", "");
    const siteRecord = await prisma.wordPressSite.create({
      data: {
        userId: payload.userId,
        name: siteName.charAt(0).toUpperCase() + siteName.slice(1),
        url: formattedUrl,
        adminEmail: "admin@" + siteName,
        connectionState: "connected_healthy",
        apiKey: apiKey.trim(),
        hmacSecret: hmacSecret.trim(),
        health: healthDiagnostics as any,
        seoProvider: healthDiagnostics.seo_provider || { name: "Yoast SEO", version: "22.6", adapterSupportLevel: "verified" },
        themeName: healthDiagnostics.active_theme || "WordPress Theme",
        lastAuditedAt: new Date(),
      },
    });

    console.log("[Websites Connect API] Verified WordPress website connected:", siteRecord.id);

    return NextResponse.json({
      message: "Website verified and connected successfully!",
      connectedWebsiteId: connectedRecord?.id || siteRecord.id,
      site: siteRecord,
      diagnostics: healthDiagnostics,
    });
  } catch (error: any) {
    console.error("[Websites Connect API Error]:", error?.stack || error);
    return NextResponse.json(
      { error: `Failed to connect website: ${error?.message || "Internal server error"}` },
      { status: 500 }
    );
  }
}
