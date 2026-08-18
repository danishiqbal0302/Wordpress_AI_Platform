import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";
import { probeSiteConnection } from "../../../../lib/diagnostics";
import crypto from "crypto";

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

    return NextResponse.json({ site });
  } catch (error: any) {
    console.error("[Get Website Error]:", error);
    return NextResponse.json({ error: "Failed to fetch website." }, { status: 500 });
  }
}

export async function PATCH(
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

    const existingSite = await prisma.wordPressSite.findUnique({
      where: { id },
    });

    if (!existingSite) {
      return NextResponse.json({ error: "Website record not found." }, { status: 404 });
    }

    const body = await req.json();
    const { apiKey, hmacSecret, siteName } = body;

    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length < 6) {
      return NextResponse.json({ error: "API Key must be at least 6 characters." }, { status: 400 });
    }

    if (!hmacSecret || typeof hmacSecret !== "string" || hmacSecret.trim().length < 6) {
      return NextResponse.json({ error: "HMAC Secret Key must be at least 6 characters." }, { status: 400 });
    }

    const cleanApiKey = apiKey.trim();
    const cleanHmacSecret = hmacSecret.trim();
    const targetUrl = existingSite.url;

    // 1. Live Verification Probe with updated keys
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = crypto.createHmac("sha256", cleanHmacSecret).update(`${timestamp}.`).digest("hex");
      const invHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
        "X-WP-AI-API-Key": cleanApiKey,
        "Authorization": `Bearer ${cleanApiKey}`,
      };

      const invRes = await fetch(`${targetUrl.replace(/\/$/, "")}/wp-json/wp-ai/v1/inventory`, { headers: invHeaders });
      if (!invRes.ok) {
        return NextResponse.json(
          {
            error: `Key verification failed on '${targetUrl}' (HTTP ${invRes.status}). Please ensure the new API Key and HMAC Secret match your WP Admin settings.`,
          },
          { status: 400 }
        );
      }
    } catch (authErr: any) {
      return NextResponse.json(
        {
          error: `Unable to reach '${targetUrl}': ${authErr.message || "Connection refused"}. Make sure your site is online.`,
        },
        { status: 400 }
      );
    }

    // 2. Probe Health
    const probeResult = await probeSiteConnection(targetUrl);

    // 3. Update PostgreSQL WordPressSite record
    const updatedSite = await prisma.wordPressSite.update({
      where: { id },
      data: {
        name: siteName?.trim() || existingSite.name,
        apiKey: cleanApiKey,
        hmacSecret: cleanHmacSecret,
        connectionState: "connected_healthy",
        health: probeResult.healthDiagnostics as any,
        updatedAt: new Date(),
      },
    });

    // 4. Update PostgreSQL ConnectedWebsite record if present
    if ((prisma as any).connectedWebsite) {
      try {
        await (prisma as any).connectedWebsite.updateMany({
          where: { siteUrl: targetUrl },
          data: {
            apiKey: cleanApiKey,
            hmacSecret: cleanHmacSecret,
            status: "active",
          },
        });
      } catch (e) {
        console.warn("[Update Website Keys API] ConnectedWebsite update notice:", e);
      }
    }

    console.log(`[Update Website Keys API] Keys verified and updated for site: ${id}`);

    return NextResponse.json({
      message: `Keys updated and verified successfully for "${updatedSite.name}".`,
      site: updatedSite,
    });
  } catch (error: any) {
    console.error("[Update Website Keys API Error]:", error);
    return NextResponse.json({ error: `Failed to update keys: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(
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

    const existingSite = await prisma.wordPressSite.findUnique({
      where: { id },
    });

    if (!existingSite) {
      return NextResponse.json({ error: "Website record not found." }, { status: 404 });
    }

    // Permanently delete website record from PostgreSQL
    await prisma.wordPressSite.delete({
      where: { id },
    });

    // Delete associated ConnectedWebsite record if present in prisma
    if ((prisma as any).connectedWebsite) {
      try {
        await (prisma as any).connectedWebsite.deleteMany({
          where: { siteUrl: existingSite.url },
        });
      } catch (e) {
        console.warn("[Delete Website API] ConnectedWebsite delete notice:", e);
      }
    }

    console.log(`[Delete Website API] Permanently deleted website record: ${id} (${existingSite.name})`);

    return NextResponse.json({
      message: `Website "${existingSite.name}" was permanently deleted.`,
      deletedId: id,
    });
  } catch (error: any) {
    console.error("[Delete Website API Error]:", error);
    return NextResponse.json({ error: "Failed to delete website record." }, { status: 500 });
  }
}
