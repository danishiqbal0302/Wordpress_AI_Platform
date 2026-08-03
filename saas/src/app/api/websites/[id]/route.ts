import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

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
