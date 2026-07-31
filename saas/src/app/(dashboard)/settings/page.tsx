"use client";

import * as React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Select } from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { Alert } from "../../../components/ui/alert";
import { Settings, Key, Save, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [agencyName, setAgencyName] = React.useState("Apex Web Services Agency");
  const [auditSchedule, setAuditSchedule] = React.useState("daily");
  const [staleProtection, setStaleProtection] = React.useState(true);
  const [autoPurgeCache, setAutoPurgeCache] = React.useState(true);
  const [apiKey, setApiKey] = React.useState("wp_ai_live_8f90a2b13c7d9e0f");

  const [loading, setLoading] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/users/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          if (data.settings.agencyName) setAgencyName(data.settings.agencyName);
          if (data.settings.auditSchedule) setAuditSchedule(data.settings.auditSchedule);
          if (data.settings.staleProtection !== undefined) setStaleProtection(data.settings.staleProtection);
          if (data.settings.autoPurgeCache !== undefined) setAutoPurgeCache(data.settings.autoPurgeCache);
          if (data.settings.apiKey) setApiKey(data.settings.apiKey);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/users/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agencyName,
          auditSchedule,
          staleProtection,
          autoPurgeCache,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save workspace settings.");
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message || "Workspace settings updated successfully!");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error while saving settings.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Application Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure agency workspace defaults, automated audit frequencies, and security preferences in PostgreSQL.
        </p>
      </div>

      {successMsg && (
        <Alert variant="success" title="Settings Saved!">
          {successMsg}
        </Alert>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 font-medium">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workspace & Audit Defaults</CardTitle>
            <CardDescription className="text-xs">
              Set default auditing intervals and concurrency locks for your agency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Agency Organization Name"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
            <Select
              label="Automated Audit Schedule"
              value={auditSchedule}
              onChange={(e) => setAuditSchedule(e.target.value)}
              options={[
                { label: "Daily Automated Audits (Recommended)", value: "daily" },
                { label: "Weekly Audits", value: "weekly" },
                { label: "Manual Scans Only", value: "manual" },
              ]}
            />
            <Checkbox
              label="Enforce Hard-Fail Stale Checksum Target Protection"
              checked={staleProtection}
              onChange={(e) => setStaleProtection(e.target.checked)}
            />
            <Checkbox
              label="Automatically purge WordPress cache after verified writes"
              checked={autoPurgeCache}
              onChange={(e) => setAutoPurgeCache(e.target.checked)}
            />
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
            <Input label="Active Platform API Key" type="password" value={apiKey} readOnly />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={loading} className="font-semibold text-xs gap-1.5 px-6 bg-primary text-primary-foreground">
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
