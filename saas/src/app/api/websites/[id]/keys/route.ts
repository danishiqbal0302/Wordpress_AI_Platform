import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/auth";
import { probeSiteConnection } from "../../../../../lib/diagnostics";

export async function PUT(
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

    const body = await req.json();
    const { apiKey, hmacSecret } = body;

    if (!apiKey && !hmacSecret) {
      return NextResponse.json(
        { error: "At least one credential field (API Key or HMAC Secret) must be provided." },
        { status: 400 }
      );
    }

    // Run a live probe with the target site URL
    const probeResult = await probeSiteConnection(site.url);

    // Update ConnectedWebsite record if present
    if ((prisma as any).connectedWebsite) {
      try {
        await (prisma as any).connectedWebsite.updateMany({
          where: { siteUrl: site.url },
          data: {
            ...(apiKey && { apiKey: apiKey.trim() }),
            ...(hmacSecret && { hmacSecret: hmacSecret.trim() }),
            status: probeResult.connectionState === "connected_healthy" ? "active" : "degraded",
          },
        });
      } catch (e) {
        console.warn("[Update Keys API] ConnectedWebsite update notice:", e);
      }
    }

    // Update WordPressSite record in PostgreSQL including apiKey & hmacSecret
    const updatedSite = await prisma.wordPressSite.update({
      where: { id },
      data: {
        ...(apiKey && { apiKey: apiKey.trim() }),
        ...(hmacSecret && { hmacSecret: hmacSecret.trim() }),
        connectionState: probeResult.connectionState,
        health: probeResult.healthDiagnostics as any,
        lastAuditedAt: new Date(),
      },
    });

    console.log(`[Update Keys API] Credentials updated for ${site.name}. New status: ${probeResult.connectionState}`);

    return NextResponse.json({
      message: "Connection keys updated successfully.",
      site: updatedSite,
      probe: probeResult,
    });
  } catch (error: any) {
    console.error("[Update Keys API Error]:", error);
    return NextResponse.json({ error: "Failed to update connection keys." }, { status: 500 });
  }
}
