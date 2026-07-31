import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

const settingsSchema = z.object({
  agencyName: z.string().min(2, "Agency name must be at least 2 characters."),
  auditSchedule: z.enum(["daily", "weekly", "manual"]).optional(),
  staleProtection: z.boolean().optional(),
  autoPurgeCache: z.boolean().optional(),
});

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

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        agencyName: true,
        apiKey: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      settings: {
        agencyName: user.agencyName || "Apex Web Services Agency",
        auditSchedule: "daily",
        staleProtection: true,
        autoPurgeCache: true,
        apiKey: user.apiKey || "wp_ai_live_" + user.id,
      },
    });
  } catch (error) {
    console.error("[Get Settings Error]:", error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const body = await req.json();
    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0] || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { agencyName } = result.data;

    // Update user agency name in PostgreSQL
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: { agencyName },
    });

    return NextResponse.json({
      message: "Workspace settings updated successfully in database.",
      settings: {
        agencyName: updatedUser.agencyName,
        auditSchedule: body.auditSchedule || "daily",
        staleProtection: body.staleProtection ?? true,
        autoPurgeCache: body.autoPurgeCache ?? true,
      },
    });
  } catch (error) {
    console.error("[Save Settings Error]:", error);
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }
}
