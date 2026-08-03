import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";
import { probeSiteConnection } from "../../../../lib/diagnostics";

const connectSchema = z.object({
  siteUrl: z.string().min(1, "Site URL is required."),
  apiKey: z.string().min(1, "Platform API Key is required."),
  hmacSecret: z.string().min(1, "HMAC Secret Key is required."),
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

    // Live Probe against WordPress Plugin Health REST Endpoint
    const probeResult = await probeSiteConnection(formattedUrl);
    const healthDiagnostics = probeResult.healthDiagnostics;

    // Create or update ConnectedWebsite record in PostgreSQL
    let connectedRecord;
    if ((prisma as any).connectedWebsite) {
      try {
        connectedRecord = await (prisma as any).connectedWebsite.create({
          data: {
            userId: payload.userId,
            siteUrl: formattedUrl,
            apiKey: apiKey.trim(),
            hmacSecret: hmacSecret.trim(),
            status: probeResult.connectionState === "connected_healthy" ? "active" : "degraded",
          },
        });
      } catch (e) {
        console.warn("[Websites Connect API] ConnectedWebsite create notice:", e);
      }
    }

    // Create corresponding WordPressSite record for Dashboard display with apiKey & hmacSecret
    const siteName = new URL(formattedUrl).hostname.replace("www.", "");
    const siteRecord = await prisma.wordPressSite.create({
      data: {
        userId: payload.userId,
        name: siteName.charAt(0).toUpperCase() + siteName.slice(1),
        url: formattedUrl,
        adminEmail: "admin@" + siteName,
        connectionState: probeResult.connectionState,
        apiKey: apiKey.trim(),
        hmacSecret: hmacSecret.trim(),
        health: healthDiagnostics as any,
        seoProvider: healthDiagnostics.seo_provider || { name: "Yoast SEO", version: "22.6", adapterSupportLevel: "verified" },
        themeName: healthDiagnostics.active_theme || "WordPress Theme",
        lastAuditedAt: new Date(),
      },
    });

    console.log("[Websites Connect API] Website successfully connected in PostgreSQL:", siteRecord.id);

    return NextResponse.json({
      message: "Website connected successfully!",
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
