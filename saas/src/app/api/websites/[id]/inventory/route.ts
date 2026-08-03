import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const site = await prisma.wordPressSite.findUnique({
      where: { id },
    });

    if (!site) {
      return NextResponse.json({ error: "Website record not found." }, { status: 404 });
    }

    // Resolve HMAC Secret from WordPressSite or ConnectedWebsite
    let hmacSecret = (site as any).hmacSecret;
    if (!hmacSecret && (prisma as any).connectedWebsite) {
      try {
        const connected = await (prisma as any).connectedWebsite.findFirst({
          where: { siteUrl: site.url },
        });
        if (connected?.hmacSecret) {
          hmacSecret = connected.hmacSecret;
        }
      } catch (e) {
        console.warn("[Inventory API] ConnectedWebsite lookup notice:", e);
      }
    }

    // Live HMAC Signed Request to WordPress Plugin Inventory Endpoint
    const inventoryUrl = `${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/inventory`;

    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const secretToUse = hmacSecret || "default_hmac_secret";
      const payloadToSign = `${timestamp}.`;
      const signature = crypto
        .createHmac("sha256", secretToUse)
        .update(payloadToSign)
        .digest("hex");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const invRes = await fetch(inventoryUrl, {
        method: "GET",
        headers: {
          "X-WP-AI-Timestamp": timestamp,
          "X-WP-AI-Signature": signature,
          "Authorization": `Bearer ${signature}`,
          "X-WP-AI-Authorization": `Bearer ${signature}`,
          "X-WP-AI-Token": signature,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (invRes.ok) {
        const liveData = await invRes.json();

        // Overwrite site.seoProvider in PostgreSQL with live detected provider
        const detectedName = liveData.site_audit_summary?.seo_provider_detected || "None / Custom";
        let activeVersion = "Core";
        let supportLvl = "read_only";

        if (liveData.seo_providers) {
          for (const [key, p] of Object.entries<any>(liveData.seo_providers)) {
            if (p?.active) {
              activeVersion = p.version || "Active";
              supportLvl = (key === "yoast" || key === "rank_math") ? "verified" : (key === "aioseo" ? "compatible" : "read_only");
              break;
            }
          }
        }

        const liveSeoProvider = {
          name: detectedName,
          version: activeVersion,
          adapterSupportLevel: supportLvl,
        };

        try {
          await prisma.wordPressSite.update({
            where: { id },
            data: {
              seoProvider: liveSeoProvider,
              lastAuditedAt: new Date(),
            },
          });
        } catch (dbErr) {
          console.warn("[Inventory Proxy API] Failed to update live seoProvider in DB:", dbErr);
        }

        return NextResponse.json(liveData);
      } else {
        const errText = await invRes.text().catch(() => "");
        console.warn(`[Inventory Proxy API] Endpoint returned status ${invRes.status}: ${errText}`);
      }
    } catch (e: any) {
      console.warn("[Inventory Proxy API] Live inventory fetch error:", e?.message || e);
    }

    // Graceful Return when live inventory fails
    return NextResponse.json(
      {
        error: "Website response timed out or plugin credentials require re-verification.",
        site_health_score: null,
        site_audit_summary: null,
        issues: [],
        recommendations: [],
        pages: [],
        posts: [],
        media_inventory: { total_count: 0, missing_alt_count: 0, sample_items: [] },
        basic_acf_discovery: { acf_active: false, acf_version: null, field_groups: [] },
        gutenberg_block_parsing: [],
        seo_providers: {},
        timestamp: Math.floor(Date.now() / 1000),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Inventory Proxy API Error]:", error);
    return NextResponse.json({ error: "Failed to fetch website inventory." }, { status: 500 });
  }
}
