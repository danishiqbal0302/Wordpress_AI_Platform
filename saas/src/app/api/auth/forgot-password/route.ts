import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { sendPasswordResetEmail } from "../../../../lib/mail";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid work email address."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Forgot Password API] Request received for email:", body?.email);

    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // For security, return standard confirmation even if email not registered
      return NextResponse.json({
        message: "If an account exists for this email, reset instructions have been sent.",
        email: normalizedEmail,
      });
    }

    // Generate secure 6-digit PIN reset code
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    // Clean old tokens for this email first
    try {
      if (prisma.passwordResetToken) {
        await prisma.passwordResetToken.deleteMany({
          where: { email: normalizedEmail },
        });
      }
    } catch (e) {
      console.warn("[Forgot Password API] Cleanup old tokens warning:", e);
    }

    // Save token in PostgreSQL database
    if (prisma.passwordResetToken) {
      await prisma.passwordResetToken.create({
        data: {
          email: normalizedEmail,
          token: resetToken,
          expiresAt,
        },
      });
    } else {
      console.error("[Forgot Password API] prisma.passwordResetToken is undefined!");
      return NextResponse.json(
        { error: "Database model passwordResetToken is uninitialized." },
        { status: 500 }
      );
    }

    // Send email using Nodemailer utility (Ethereal test fallback if SMTP env missing)
    let mailResult;
    try {
      mailResult = await sendPasswordResetEmail({ to: normalizedEmail, resetToken });
    } catch (mailError: any) {
      console.error("[Forgot Password API] Email sending failed:", mailError);
    }

    return NextResponse.json({
      message: "Password reset code sent successfully to your email address.",
      email: normalizedEmail,
      previewUrl: mailResult?.previewUrl || null,
    });
  } catch (error: any) {
    console.error("[Forgot Password API Error]:", error?.stack || error);
    return NextResponse.json(
      { error: `Failed to process password reset: ${error?.message || "Internal server error"}` },
      { status: 500 }
    );
  }
}
