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
import { ShieldCheck, ArrowLeft, Send, KeyRound, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

const step1Schema = z.object({
  email: z.string().email("Please enter a valid work email address."),
});

const step2Schema = z
  .object({
    email: z.string().email("Please enter a valid work email address."),
    token: z.string().min(6, "Reset code must be 6 digits."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/[0-9!@#$%^&*]/, "Password must contain at least one number or special character."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type Step1FormValues = z.infer<typeof step1Schema>;
type Step2FormValues = z.infer<typeof step2Schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2>(1);
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Resend cooldown timer
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Step 1 Form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    getValues: getValuesStep1,
  } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  // Step 2 Form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    setValue: setValueStep2,
    watch: watchStep2,
    formState: { errors: errorsStep2 },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      email: "",
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onStep1Submit = async (data: Step1FormValues) => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        setApiError(body.error || "Failed to request password reset.");
        setLoading(false);
        return;
      }

      setValueStep2("email", data.email);
      setValueStep2("token", ""); // Clean empty reset code
      setStep(2);
      setCooldown(60); // 60s cooldown
      setLoading(false);
    } catch (err) {
      console.error(err);
      setApiError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (cooldown > 0) return;
    const email = watchStep2("email");
    if (!email) return;

    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const body = await res.json();
      if (!res.ok) {
        setApiError(body.error || "Failed to resend code.");
      } else {
        setCooldown(60);
        setApiError(null);
      }
    } catch (err) {
      console.error(err);
      setApiError("Failed to resend reset code.");
    } finally {
      setLoading(false);
    }
  };

  const onStep2Submit = async (data: Step2FormValues) => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        setApiError(body.error || "Failed to reset password.");
        setLoading(false);
        return;
      }

      setSuccessMessage(body.message || "Password reset successfully!");
      setLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setApiError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const newPasswordVal = watchStep2("newPassword") || "";
  const hasMinLength = newPasswordVal.length >= 8;
  const hasLetter = /[A-Za-z]/.test(newPasswordVal);
  const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(newPasswordVal);

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4 py-8 overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Ambient Glowing Orbs */}
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
            <CardTitle className="text-xl font-bold">
              {step === 1 ? "Reset your password" : "Set new password"}
            </CardTitle>
            <CardDescription className="text-xs">
              {step === 1
                ? "Enter your email address to receive a secure 6-digit reset code."
                : "Enter the 6-digit reset code sent to your email (expires in 15 mins)."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{apiError}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{successMessage} Redirecting to sign in...</span>
              </div>
            )}

            {step === 1 && !successMessage && (
              <form onSubmit={handleSubmitStep1(onStep1Submit)} className="space-y-4">
                <Input
                  label="Work Email Address"
                  type="email"
                  placeholder="name@company.com"
                  error={errorsStep1.email?.message}
                  {...registerStep1("email")}
                />
                <Button
                  type="submit"
                  className="w-full py-5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                  isLoading={loading}
                >
                  Send Reset Code <Send className="h-4 w-4 ml-1.5" />
                </Button>
              </form>
            )}

            {step === 2 && !successMessage && (
              <form onSubmit={handleSubmitStep2(onStep2Submit)} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  error={errorsStep2.email?.message}
                  {...registerStep2("email")}
                  readOnly
                />

                <Input
                  label="6-Digit Reset Code"
                  placeholder="Enter 6-digit code"
                  error={errorsStep2.token?.message}
                  {...registerStep2("token")}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={cooldown > 0 || loading}
                    className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                  >
                    <RefreshCw className="h-3 w-3" />
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend reset code"}
                  </button>
                </div>

                <Input
                  label="New Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  error={errorsStep2.newPassword?.message}
                  {...registerStep2("newPassword")}
                />

                {newPasswordVal.length > 0 && (
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
                  label="Confirm New Password"
                  type="password"
                  placeholder="Re-enter new password"
                  error={errorsStep2.confirmPassword?.message}
                  {...registerStep2("confirmPassword")}
                />

                <Button
                  type="submit"
                  className="w-full py-5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                  isLoading={loading}
                >
                  Reset Password <KeyRound className="h-4 w-4 ml-1.5" />
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
                >
                  Change email address
                </button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
            <Link href="/login" className="flex items-center gap-1 text-primary font-semibold hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
