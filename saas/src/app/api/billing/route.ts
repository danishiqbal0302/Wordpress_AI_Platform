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

    // Count user's connected sites from PostgreSQL
    const connectedSitesCount = await prisma.wordPressSite.count({
      where: payload && payload.role !== "ADMIN" ? { userId: payload.userId } : undefined,
    });

    return NextResponse.json({
      plan: {
        name: "Pro Agency Plan",
        status: "Active",
        price: 79,
        interval: "mo",
        renewsDate: "Aug 15, 2026",
        maxSites: 10,
        connectedSites: connectedSitesCount,
        features: [
          "Up to 10 connected WordPress sites",
          "Daily automated SEO audits",
          "Verified Yoast & RankMath write engine",
          "Stale target checksum locks",
        ],
      },
      invoices: [
        {
          id: "INV-2026-07-001",
          date: "Jul 15, 2026",
          amount: "$79.00 USD",
          status: "Paid",
        },
        {
          id: "INV-2026-06-001",
          date: "Jun 15, 2026",
          amount: "$79.00 USD",
          status: "Paid",
        },
      ],
    });
  } catch (error) {
    console.error("[Billing API Error]:", error);
    return NextResponse.json({ error: "Failed to fetch billing data." }, { status: 500 });
  }
}
