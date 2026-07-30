"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShieldCheck, ArrowRight } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
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
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription className="text-xs">
              Start auditing and optimizing WordPress sites securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Tariq Agency"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="tariq@agency.com"
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

              <Button
                type="submit"
                className="w-full py-5 text-sm font-semibold rounded-xl"
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
