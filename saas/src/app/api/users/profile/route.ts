import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";

const profileSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  avatar: z.string().optional(),
});

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
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
    }

    const body = await req.json();
    console.log("[Profile Update API] Payload received for user:", payload.userId, body);

    const result = profileSchema.safeParse(body);

    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0] || "Validation failed";
      console.warn("[Profile Update API] Validation failed:", firstError);
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, avatar } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if another user has this email
    const existing = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: { id: payload.userId },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "This email address is already in use by another account." }, { status: 409 });
    }

    // Build update object based on available fields
    const updateData: Record<string, any> = {
      name,
      email: normalizedEmail,
    };
    if (avatar) {
      updateData.avatar = avatar;
    }

    // Update user in PostgreSQL database
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        agencyName: true,
        avatar: true,
      },
    });

    console.log("[Profile Update API] User updated successfully in PostgreSQL:", updatedUser.id);

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("[Profile Update API Error]:", error?.stack || error);
    return NextResponse.json(
      { error: `Failed to update user profile: ${error?.message || "Internal server error"}` },
      { status: 500 }
    );
  }
}
