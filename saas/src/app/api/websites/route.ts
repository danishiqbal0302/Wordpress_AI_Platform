import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";
import { probeSiteConnection } from "../../../lib/diagnostics";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    const payload = token ? verifyToken(token) : null;

    // Fetch sites from PostgreSQL database
    const sites = await prisma.wordPressSite.findMany({
      where: payload && payload.role !== "ADMIN" ? { userId: payload.userId } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sites });
  } catch (error) {
    console.error("Websites API Error:", error);
    return NextResponse.json({ error: "Failed to fetch websites from database." }, { status: 500 });
  }
}

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

    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const { name, url, adminEmail, themeName, seoProvider } = body;

    if (!name || !url) {
      return NextResponse.json({ error: "Website name and URL are required." }, { status: 400 });
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    // Run initial probe
    const probeResult = await probeSiteConnection(formattedUrl);

    const site = await prisma.wordPressSite.create({
      data: {
        userId: payload.userId,
        name,
        url: formattedUrl,
        adminEmail: adminEmail || "admin@" + new URL(formattedUrl).hostname,
        connectionState: probeResult.connectionState,
        themeName: themeName || "Astra Pro",
        seoProvider: seoProvider || { name: "Yoast SEO", version: "22.6", adapterSupportLevel: "verified", lastTestedDate: "2026-07-25" },
        health: probeResult.healthDiagnostics as any,
        lastAuditedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Website connected successfully.", site }, { status: 201 });
  } catch (error) {
    console.error("Connect Website Error:", error);
    return NextResponse.json({ error: "Failed to connect website." }, { status: 500 });
  }
}
