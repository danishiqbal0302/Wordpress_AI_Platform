"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { User, Shield, Key, Save } from "lucide-react";

export default function ProfilePage() {
  const [saved, setSaved] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
    }, 600);
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <User className="h-6 w-6 text-primary" /> User Profile & Security
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your account credentials, avatar, and security preferences.
        </p>
      </div>

      {saved && (
        <Alert variant="success" title="Profile Updated">
          Your user profile information has been updated.
        </Alert>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xl text-white shadow-md">
                TA
              </div>
              <Button variant="outline" size="sm" type="button">Change Avatar</Button>
            </div>
            <Input label="Full Name" defaultValue="Tariq A." />
            <Input label="Email Address" type="email" defaultValue="tariq@example.com" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" /> Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={loading} className="font-semibold text-xs gap-1.5 px-6">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
