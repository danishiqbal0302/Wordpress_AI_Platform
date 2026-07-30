"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { MOCK_WEBSITES, MOCK_AUDITS, MOCK_PROPOSALS, MOCK_ACTIVITIES } from "@/mock/data";
import {
  Globe,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Plus,
  CheckCircle2,
  Bot,
  Activity,
  Layers,
  RotateCcw,
} from "lucide-react";

export default function DashboardPage() {
  const primarySite = MOCK_WEBSITES[0];
  const auditSummary = MOCK_AUDITS[0];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-card border border-primary/20 shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Welcome back, <span className="gradient-text">Tariq</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Your connected WordPress sites are being audited for SEO metadata, Gutenberg blocks, and ACF compatibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/websites/connect">
            <Button size="sm" className="gap-1.5 font-semibold">
              <Plus className="h-4 w-4" /> Connect New Site
            </Button>
          </Link>
          <Link href="/ai-chat">
            <Button size="sm" variant="outline" className="gap-1.5 font-semibold border-primary/40 text-primary">
              <Bot className="h-4 w-4" /> Open Copilot
            </Button>
          </Link>
        </div>
      </div>

      {/* Connection State Warning Alert if applicable */}
      {MOCK_WEBSITES.some((s) => s.connectionState === "paired_auth_failing") && (
        <Alert variant="warning" title="Authorization Header Warning Detected">
          One or more websites (<strong className="underline">Coastal Real Estate Group</strong>) are failing application password authentication because the web server is stripping the HTTP Authorization header.{" "}
          <Link href="/websites/site-3" className="font-bold underline ml-1 text-amber-200 hover:text-white">
            View Diagnostic Fix Instructions →
          </Link>
        </Alert>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Connected Websites</p>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">{MOCK_WEBSITES.length}</h3>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">
                2 Healthy • 1 Auth Warning
              </span>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Globe className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Average SEO Score</p>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">84/100</h3>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">
                +4 pts since last audit
              </span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Pending Proposals</p>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">{MOCK_PROPOSALS.length}</h3>
              <span className="text-[10px] text-amber-400 font-semibold mt-1 inline-block">
                Awaiting Checksum Approval
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bot className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Adapter Compatibility</p>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">Yoast 22.6</h3>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">
                100% Contract Test Passed
              </span>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connected Sites List & Diagnostics Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/60">
              <div>
                <CardTitle className="text-base">Website Diagnostics & Connection States</CardTitle>
                <CardDescription className="text-xs">
                  Active WordPress onboarding health & plugin capability monitoring.
                </CardDescription>
              </div>
              <Link href="/websites">
                <Button variant="outline" size="sm" className="text-xs">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border/60">
              {MOCK_WEBSITES.map((site) => (
                <div key={site.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center font-bold text-xs text-primary">
                      {site.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/websites/${site.id}`} className="font-bold text-sm text-foreground hover:underline">
                          {site.name}
                        </Link>
                        <span className="text-xs text-muted-foreground">({site.url})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-muted-foreground">
                          SEO: <strong className="text-foreground">{site.seoProvider.name} {site.seoProvider.version}</strong>
                        </span>
                        <span className="text-[11px] text-muted-foreground">•</span>
                        <span className="text-[11px] text-muted-foreground">
                          Connector: v{site.health.connectorVersion}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {site.connectionState === "connected_healthy" && (
                      <Badge variant="success">Healthy</Badge>
                    )}
                    {site.connectionState === "connected_warnings" && (
                      <Badge variant="warning">Warnings</Badge>
                    )}
                    {site.connectionState === "paired_auth_failing" && (
                      <Badge variant="destructive">Auth Failing</Badge>
                    )}
                    <Link href={`/websites/${site.id}`}>
                      <Button variant="ghost" size="sm">Diagnostics →</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Proposals needing approval */}
          <Card className="border-primary/40 bg-card/90">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" /> Pending Action Proposal (Stale Lock Protected)
                </CardTitle>
                <CardDescription className="text-xs">
                  Review proposed metadata updates before explicit execution.
                </CardDescription>
              </div>
              <Badge variant="wp">Awaiting Approval</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_PROPOSALS.map((prop) => (
                <div key={prop.id} className="p-4 rounded-xl bg-background border border-border space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Target: {prop.targetPageTitle} ({prop.siteName})</span>
                    <span className="font-mono text-[10px] text-muted-foreground">Checksum: {prop.approvedChecksum}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-muted/30 p-3 rounded-lg border border-border/50">
                    <div>
                      <span className="text-muted-foreground font-semibold block text-[10px] uppercase">Current Meta Description</span>
                      <p className="text-destructive mt-1 font-mono text-[11px]">{prop.currentValues.meta_description}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold block text-[10px] uppercase">Proposed Meta Description</span>
                      <p className="text-emerald-400 mt-1 font-mono text-[11px]">{prop.proposedValues.meta_description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Rollback Level: <strong>Full Field Snapshot</strong></span>
                    </div>
                    <Link href="/ai-chat">
                      <Button size="sm" className="font-semibold text-xs gap-1">
                        Review in Copilot <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Recent Verified Activity Audit Trail */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Verified Activity Audit Trail
              </CardTitle>
              <CardDescription className="text-xs">
                Audit history of applied changes & verification statuses.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} className="p-3 rounded-xl bg-muted/20 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{act.actionTitle}</span>
                    <Badge variant="success" className="text-[10px]">Verified</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{act.targetEntity}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                    <span>By: {act.executedBy}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-mono">
                      <CheckCircle2 className="h-3 w-3" /> Exact Reread Match
                    </span>
                  </div>
                </div>
              ))}

              <Link href="/activity" className="block text-center text-xs font-semibold text-primary hover:underline pt-2">
                View Complete Audit History →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
