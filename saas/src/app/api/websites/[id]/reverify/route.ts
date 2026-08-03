import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/auth";
import { probeSiteConnection } from "../../../../../lib/diagnostics";

export async function POST(
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

    // Run live connection health probe
    const probeResult = await probeSiteConnection(site.url);

    // Persist updated connectionState, health diagnostics, AND live seoProvider in database
    const updatedSite = await prisma.wordPressSite.update({
      where: { id },
      data: {
        connectionState: probeResult.connectionState,
        health: probeResult.healthDiagnostics as any,
        seoProvider: probeResult.healthDiagnostics.seo_provider || { name: "None / Custom", version: "Core", adapterSupportLevel: "read_only" },
        lastAuditedAt: new Date(),
      },
    });

    console.log(`[Reverify API] Website ${site.name} status: ${probeResult.connectionState}, Provider: ${probeResult.healthDiagnostics.seo_provider?.name}`);

    return NextResponse.json({
      message: `Connection probe complete. Status: ${probeResult.connectionState.replace("_", " ")}`,
      site: updatedSite,
      probe: probeResult,
    });
  } catch (error: any) {
    console.error("[Reverify API Error]:", error);
    return NextResponse.json({ error: "Failed to re-verify website connection." }, { status: 500 });
  }
}
