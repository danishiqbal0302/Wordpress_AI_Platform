"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Alert } from "../../../../components/ui/alert";
import { MOCK_WEBSITES } from "../../../../mock/data";
import {
  Globe,
  Server,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
  ArrowLeft,
  RefreshCw,
  FileCode,
} from "lucide-react";

export default function WebsiteDetailPage() {
  const params = useParams();
  const siteId = params.id as string;
  const site = MOCK_WEBSITES.find((s) => s.id === siteId) || MOCK_WEBSITES[0];

  const [isRescanning, setIsRescanning] = React.useState(false);

  const handleRescan = () => {
    setIsRescanning(true);
    setTimeout(() => setIsRescanning(false), 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Back Button */}
      <div className="flex items-center justify-between">
        <Link href="/websites" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Websites
        </Link>
        <Button onClick={handleRescan} isLoading={isRescanning} variant="outline" size="sm" className="gap-1.5 text-xs">
          <RefreshCw className="h-3.5 w-3.5" /> Re-run Full Diagnostic Probe
        </Button>
      </div>

      {/* Overview Banner */}
      <Card className="border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-card border border-border flex items-center justify-center font-black text-xl text-primary shadow-inner">
            {site.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{site.name}</h1>
              {site.connectionState === "connected_healthy" && <Badge variant="success">Healthy</Badge>}
              {site.connectionState === "connected_warnings" && <Badge variant="warning">Warnings</Badge>}
              {site.connectionState === "paired_auth_failing" && <Badge variant="destructive">Auth Failing</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{site.url} • Admin: {site.adminEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/audits?siteId=${site.id}`}>
            <Button size="sm" variant="outline" className="font-semibold text-xs">View Audits</Button>
          </Link>
          <Link href={`/ai-chat?siteId=${site.id}`}>
            <Button size="sm" className="font-semibold text-xs">Open Copilot</Button>
          </Link>
        </div>
      </Card>

      {/* Specific Troubleshooting Warning for Stripped Auth Header if paired_auth_failing */}
      {site.connectionState === "paired_auth_failing" && (
        <Alert variant="destructive" title="Action Required: Authorization Header Stripped by Server">
          <p className="mt-1">
            The WordPress connector plugin is installed, but your server environment (Apache/Nginx or Cloudflare) is removing the <code>Authorization</code> header before it reaches PHP.
          </p>
          <div className="mt-3 p-3 bg-black/40 rounded-lg font-mono text-[11px] text-red-200 border border-red-500/30">
            # Add this line to your WordPress root .htaccess file:<br />
            SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
          </div>
        </Alert>
      )}

      {/* Detailed Diagnostic Checks Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" /> Onboarding & Diagnostics Suite
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time checks for REST API availability, security plugins, application passwords, and capability status.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border/60">
              {site.health.checks.map((check) => (
                <div key={check.id} className="p-4 space-y-1 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground flex items-center gap-2">
                      {check.status === "pass" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                      {check.status === "warn" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                      {check.status === "fail" && <XCircle className="h-4 w-4 text-red-400" />}
                      {check.name}
                    </span>
                    <Badge
                      variant={
                        check.status === "pass"
                          ? "success"
                          : check.status === "warn"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {check.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{check.message}</p>
                  {check.recommendation && (
                    <p className="text-[11px] text-amber-300 font-mono pl-6 pt-1">
                      💡 Fix: {check.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gutenberg & ACF Field Discovery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileCode className="h-5 w-5 text-indigo-400" /> ACF & Gutenberg Inspector
              </CardTitle>
              <CardDescription className="text-xs">
                Field discovery for Advanced Custom Fields and Gutenberg block content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground">ACF Text/Textarea Support</span>
                  <p className="text-muted-foreground text-[11px]">Normalizes text, textarea, WYSIWYG, image, and URL fields.</p>
                </div>
                <Badge variant="success">Supported</Badge>
              </div>

              <div className="p-3 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground">Complex ACF Fields (Repeater / Flexible Content)</span>
                  <p className="text-muted-foreground text-[11px]">Complex nested fields are read-only to prevent layout corruption.</p>
                </div>
                <Badge variant="warning">Read-Only Guard</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Environment Specs & Adapter Telemetry */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-400" /> Active Plugin Adapter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-bold text-foreground">{site.seoProvider.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Plugin Version:</span>
                <span className="font-mono text-foreground font-semibold">v{site.seoProvider.version}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Support Level:</span>
                <Badge variant={site.seoProvider.adapterSupportLevel === "verified" ? "success" : "warning"}>
                  {site.seoProvider.adapterSupportLevel}
                </Badge>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Contract Test Date:</span>
                <span className="font-mono text-foreground">{site.seoProvider.lastTestedDate}</span>
              </div>
              <div className="pt-2 text-[11px] text-muted-foreground">
                Automated contract tests pass on every connector release before write operations are authorized.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="h-5 w-5 text-sky-400" /> Server Environment Specs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">WordPress Version:</span>
                <span className="font-mono font-semibold text-foreground">{site.health.wordpressVersion}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">PHP Version:</span>
                <span className="font-mono font-semibold text-foreground">{site.health.phpVersion}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Theme:</span>
                <span className="font-semibold text-foreground">{site.themeName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Firewall WAF:</span>
                <span className="font-mono text-amber-300">{site.health.firewallDetected || "None Detected"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
