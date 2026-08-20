import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "siteId parameter is required" }, { status: 400 });
    }

    const memory = await prisma.siteMemory.findFirst({
      where: { siteId, key: "site_generation_state" }
    });

    if (!memory) {
      return NextResponse.json({
        status: "IDLE",
        current_milestone: 0,
        logs: []
      });
    }

    const state = JSON.parse(memory.value);
    return NextResponse.json({
      status: state.status || "IDLE",
      current_milestone: state.current_milestone || 0,
      logs: state.logs || [],
      suggestions: state.suggestions || []
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
