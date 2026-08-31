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
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "siteId query parameter is required." }, { status: 400 });
    }

    // Verify site access
    const site = await prisma.wordPressSite.findFirst({
      where: payload.role === "ADMIN" ? { id: siteId } : { id: siteId, userId: payload.userId },
    });

    if (!site) {
      return NextResponse.json({ error: "Website not found or access denied." }, { status: 404 });
    }

    // Fetch chat history for this site and user
    const rawMessages = await prisma.chatMessage.findMany({
      where: { siteId, userId: payload.userId },
      orderBy: { createdAt: "asc" },
    });

    const messages = rawMessages.map((m) => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      proposalDraft: m.proposalDraft || undefined,
      proposal: m.proposalDraft || undefined,
      suggestions: m.suggestions || [],
      hasProposal: !!m.proposalDraft,
      time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: m.createdAt,
    }));

    return NextResponse.json({ siteId, messages });
  } catch (error: any) {
    console.error("[Chat History API Error]:", error);
    return NextResponse.json({ error: `Failed to fetch chat history: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "siteId query parameter is required." }, { status: 400 });
    }

    await prisma.chatMessage.deleteMany({
      where: { siteId, userId: payload.userId },
    });

    return NextResponse.json({ message: "Chat history cleared successfully." });
  } catch (error: any) {
    console.error("[Delete Chat History Error]:", error);
    return NextResponse.json({ error: `Failed to delete chat history: ${error.message}` }, { status: 500 });
  }
}
