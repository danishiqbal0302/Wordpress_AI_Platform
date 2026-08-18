"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Sparkles, AlertCircle, Mail, Lock, User, Building } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    agencyName: z.string().optional(),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
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

      // Redirect directly to ChatGPT Assistant Chat page
      router.push("/");
    } catch (err) {
      console.error(err);
      setApiError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#ffffff] dark:bg-[#171717] text-slate-900 dark:text-white flex flex-col justify-between p-6 font-sans">
      {/* Top Header Logo */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">WordPress AI</span>
        </Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-4 py-1.5 shadow-sm">
            Log in
          </Button>
        </Link>
      </header>

      {/* Main Register Form Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8 px-4 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Get started with WordPress AI Assistant for 1-click safe site optimizations
          </p>
        </div>

        {apiError && (
          <div className="p-3 text-xs rounded-2xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800/60 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className="pl-10 h-11 rounded-2xl bg-slate-50 dark:bg-[#212121] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 selection:bg-blue-500 selection:text-white"
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className="pl-10 h-11 rounded-2xl bg-slate-50 dark:bg-[#212121] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 selection:bg-blue-500 selection:text-white"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("password")}
                type="password"
                placeholder="Minimum 8 characters"
                className="pl-10 h-11 rounded-2xl bg-slate-50 dark:bg-[#212121] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 selection:bg-blue-500 selection:text-white"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Re-enter password"
                className="pl-10 h-11 rounded-2xl bg-slate-50 dark:bg-[#212121] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 selection:bg-blue-500 selection:text-white"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 text-sm font-semibold shadow-md transition-all mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-slate-900 dark:text-white hover:underline">
            Log in
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-400 py-2">
        WordPress AI Platform &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
