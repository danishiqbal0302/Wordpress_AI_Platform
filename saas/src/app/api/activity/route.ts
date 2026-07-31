import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";

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

    const activities = await prisma.actionLogItem.findMany({
      where: payload && payload.role !== "ADMIN" ? { userId: payload.userId } : undefined,
      include: { site: true },
      orderBy: { timestamp: "desc" },
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Activity API Error:", error);
    return NextResponse.json({ error: "Failed to fetch activity log." }, { status: 500 });
  }
}
