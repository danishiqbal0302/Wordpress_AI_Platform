import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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

    const memories = await prisma.siteMemory.findMany({
      where: { siteId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ memories });
  } catch (error: any) {
    console.error("[Get Site Memory Error]:", error);
    return NextResponse.json({ error: "Failed to fetch website memory logs." }, { status: 500 });
  }
}

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

    const body = await req.json();
    const { key, value } = body;

    if (!key || typeof key !== "string" || !key.trim()) {
      return NextResponse.json({ error: "Memory key is required." }, { status: 400 });
    }

    if (!value || typeof value !== "string" || !value.trim()) {
      return NextResponse.json({ error: "Memory value is required." }, { status: 400 });
    }

    const newMemory = await prisma.siteMemory.create({
      data: {
        siteId: id,
        key: key.trim(),
        value: value.trim(),
      },
    });

    return NextResponse.json({
      message: "Memory logged successfully.",
      memory: newMemory,
    });
  } catch (error: any) {
    console.error("[Post Site Memory Error]:", error);
    return NextResponse.json({ error: "Failed to save memory log." }, { status: 500 });
  }
}
