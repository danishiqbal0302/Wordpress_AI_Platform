import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { hashPassword } from "../../../../lib/auth";

const resetPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid work email address."),
    token: z.string().min(6, "Reset code must be 6 digits."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/[0-9!@#$%^&*]/, "Password must contain at least one number or special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Reset Password API] Request received for email:", body?.email);

    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0] || "Validation failed";
      console.warn("[Reset Password API] Validation failed:", firstError);
      return NextResponse.json(
        { error: firstError, details: fieldErrors },
        { status: 400 }
      );
    }

    const { email, token, newPassword } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Verify token in PostgreSQL
    const resetRecord = await prisma.passwordResetToken.findFirst({
      where: {
        email: normalizedEmail,
        token: token.trim(),
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!resetRecord) {
      console.warn("[Reset Password API] Invalid or expired token for email:", normalizedEmail);
      return NextResponse.json(
        { error: "Invalid or expired reset code. Please request a new password reset." },
        { status: 400 }
      );
    }

    // Verify user existence in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      console.warn("[Reset Password API] User record not found for email:", normalizedEmail);
      return NextResponse.json({ error: "User record not found." }, { status: 404 });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update user password in PostgreSQL
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    // Delete used reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail },
    });

    console.log("[Reset Password API] Password reset successful for user:", user.email);

    return NextResponse.json({
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error: any) {
    console.error("[Reset Password API Error]:", error?.stack || error);
    return NextResponse.json(
      { error: `An internal error occurred during password reset: ${error?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
