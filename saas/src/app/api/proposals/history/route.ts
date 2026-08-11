import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

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
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const logs = await prisma.actionLogItem.findMany({
      where: payload.role !== "ADMIN" ? { userId: payload.userId } : undefined,
      include: { site: true },
      orderBy: { timestamp: "desc" },
      take: 50,
    });

    return NextResponse.json({ history: logs });
  } catch (error) {
    console.error("Proposals History Error:", error);
    return NextResponse.json({ error: "Failed to fetch proposal history." }, { status: 500 });
  }
}
