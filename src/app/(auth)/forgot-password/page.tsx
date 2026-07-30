"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { ShieldCheck, ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              WordPress <span className="gradient-text">AI</span>
            </span>
          </Link>
        </div>

        <Card className="border-border/80 shadow-2xl backdrop-blur-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription className="text-xs">
              Enter your email address to receive password reset instructions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert variant="success" title="Reset Link Sent">
                If an account exists for {email}, you will receive a password reset link shortly.
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full py-5 text-sm font-semibold rounded-xl">
                  Send Reset Link <Send className="h-4 w-4 ml-1.5" />
                </Button>
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
