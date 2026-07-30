"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { Settings, Key, Bell, ShieldCheck, Save } from "lucide-react";

export default function SettingsPage() {
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
    <div className="max-w-4xl space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Application Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure agency workspace defaults, automated audit frequencies, and security preferences.
        </p>
      </div>

      {saved && (
        <Alert variant="success" title="Settings Saved">
          Your workspace settings have been updated.
        </Alert>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workspace & Audit Defaults</CardTitle>
            <CardDescription className="text-xs">
              Set default auditing intervals and concurrency locks for your agency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Agency Organization Name" defaultValue="Apex Web Services Agency" />
            <Select
              label="Automated Audit Schedule"
              defaultValue="daily"
              options={[
                { label: "Daily Automated Audits (Recommended)", value: "daily" },
                { label: "Weekly Audits", value: "weekly" },
                { label: "Manual Scans Only", value: "manual" },
              ]}
            />
            <Checkbox label="Enforce Hard-Fail Stale Checksum Target Protection" defaultChecked />
            <Checkbox label="Automatically purge WordPress cache after verified writes" defaultChecked />
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" /> Platform API Keys
            </CardTitle>
            <CardDescription className="text-xs">
              API tokens for CI/CD automated contract test matrix execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Active Platform API Key" type="password" value="wp_ai_live_8f90a2b13c7d9e0f" readOnly />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={loading} className="font-semibold text-xs gap-1.5 px-6">
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
