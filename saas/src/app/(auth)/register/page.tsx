"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters."),
    agencyName: z.string().min(2, "Agency name must be at least 2 characters."),
    email: z.string().email("Please enter a valid work email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/[0-9!@#$%^&*]/, "Password must contain at least one number or special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      agencyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordVal = watch("password") || "";

  const hasMinLength = passwordVal.length >= 8;
  const hasLetter = /[A-Za-z]/.test(passwordVal);
  const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(passwordVal);

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        setApiError(body.error || "Failed to create account.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setApiError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4 py-8 overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Glowing Ambient Orbs matching landing page */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              WordPress <span className="gradient-text">AI</span> Platform
            </span>
          </Link>
        </div>

        <Card className="border-border/80 shadow-2xl backdrop-blur-2xl bg-card/70">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-xl font-bold">Create your account</CardTitle>
            <CardDescription className="text-xs">
              Start auditing and optimizing WordPress sites securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{apiError}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Alex Morgan"
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                label="Agency / Company Name"
                placeholder="Apex Digital Agency"
                error={errors.agencyName?.message}
                {...register("agencyName")}
              />

              <Input
                label="Work Email"
                type="email"
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                error={errors.password?.message}
                {...register("password")}
              />

              {passwordVal.length > 0 && (
                <div className="p-2.5 rounded-lg bg-card/80 border border-border/60 text-xs space-y-1.5">
                  <p className="font-semibold text-muted-foreground">Password requirements:</p>
                  <div className="grid grid-cols-1 gap-1">
                    <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> 8+ characters long
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasLetter ? "text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Contains a letter
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasNumberOrSymbol ? "text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Contains a number or symbol
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                className="w-full py-5 text-sm font-semibold rounded-xl mt-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                isLoading={loading}
              >
                Create Account <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
            Already registered?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline ml-1">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
