import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { hashPassword, generateToken } from "../../../../lib/auth";

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters."),
    agencyName: z.string().optional(),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0] || "Validation failed";
      return NextResponse.json(
        { error: firstError, details: fieldErrors },
        { status: 400 }
      );
    }

    const { name, agencyName, email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();
    const finalAgencyName = agencyName && agencyName.trim().length >= 2 ? agencyName.trim() : `${name.trim()}'s Agency`;

    // Check existing user in PostgreSQL
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user in PostgreSQL database via Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        agencyName: finalAgencyName,
        role: "USER",
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Create session record
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const response = NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          agencyName: user.agencyName,
        },
        token,
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: `An error occurred during registration: ${error.message}` },
      { status: 500 }
    );
  }
}
