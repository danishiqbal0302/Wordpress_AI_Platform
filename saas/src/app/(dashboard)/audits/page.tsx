"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Bot,
  AlertCircle,
  ShieldCheck,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function AuditsPage() {
  const [audits, setAudits] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanMessage, setScanMessage] = React.useState<string | null>(null);

  async function fetchAudits() {
    try {
      setLoading(true);
      const res = await fetch("/api/audits");
      if (res.ok) {
        const data = await res.json();
        if (data?.audits) {
          setAudits(data.audits);
        }
      }
    } catch (err) {
      console.error("Audits fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchAudits();
  }, []);

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanMessage(null);

    try {
      const res = await fetch("/api/audits", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setScanMessage(data.error || "Failed to run audit scan.");
      } else {
        setScanMessage(data.message || "Live audit scan completed.");
        await fetchAudits();
      }
    } catch (err) {
      console.error(err);
      setScanMessage("Network error during audit scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const hasAudits = audits.length > 0;
  const primaryAudit = audits[0] || {
    overallScore: 0,
    seoScore: 0,
    contentScore: 0,
    technicalScore: 0,
    totalIssuesCount: 0,
    criticalIssuesCount: 0,
    warningIssuesCount: 0,
    issues: [],
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Site Audit & Metadata Center
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Production-grade modular rule evaluation, transparent category scoring, and evidence-backed remediation.
          </p>
        </div>
        <Button onClick={handleRunScan} isLoading={isScanning} className="gap-2 font-semibold text-xs bg-primary text-primary-foreground">
          <RefreshCw className="h-4 w-4" /> Run Live Site Audit
        </Button>
      </div>

      {scanMessage && (
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Score Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card className="border-primary/40 bg-card">
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Overall Health Score</span>
            <div className="text-4xl font-black text-emerald-400 mt-2">
              {hasAudits ? `${primaryAudit.overallScore}/100` : "--/100"}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
              {hasAudits ? "Weighted Explainable Score" : "No Audits Performed Yet"}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">SEO Metadata Score</span>
            <div className="text-4xl font-black text-foreground mt-2">
              {hasAudits ? `${primaryAudit.seoScore}/100` : "--/100"}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 block">Weight: 35%</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Content Quality</span>
            <div className="text-4xl font-black text-foreground mt-2">
              {hasAudits ? `${primaryAudit.contentScore}/100` : "--/100"}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 block">Weight: 30%</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Critical Issues</span>
            <div className="text-4xl font-black text-red-400 mt-2">
              {hasAudits ? primaryAudit.criticalIssuesCount : 0}
            </div>
            <span className="text-[10px] text-red-400 mt-1 block font-semibold">Requires Attention</span>
          </CardContent>
        </Card>
      </div>

      {/* Issues Breakdown List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/60">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Verified Findings & Evidence-Backed Remediation
            </CardTitle>
            <CardDescription className="text-xs">
              Modular rule findings evaluated against live site inventory.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            {primaryAudit.issues ? primaryAudit.issues.length : 0} Findings Logged
          </Badge>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border/60">
          {!hasAudits || !primaryAudit.issues || primaryAudit.issues.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted-foreground space-y-3">
              <p className="font-semibold text-foreground text-sm">No Audit Findings Logged Yet</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Run a live audit scan to evaluate site metadata and content depth against active rules.
              </p>
              <div className="pt-2">
                <Button onClick={handleRunScan} isLoading={isScanning} size="sm" className="font-semibold text-xs bg-primary text-primary-foreground">
                  Run Live Audit Scan
                </Button>
              </div>
            </div>
          ) : (
            primaryAudit.issues.map((issue: any) => (
              <div key={issue.id} className="p-5 space-y-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[10px] uppercase bg-slate-900 border-slate-700 text-sky-400">
                        {issue.rule_id || issue.issue_type || "RULE_001"}
                      </Badge>
                      {issue.severity === "critical" && (
                        <Badge variant="destructive">Critical</Badge>
                      )}
                      {issue.severity === "warning" && (
                        <Badge variant="warning">Warning</Badge>
                      )}
                      <span className="font-bold text-sm text-foreground">{issue.title || issue.pageTitle}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.description || issue.evidence}</p>
                  </div>

                  <Link href={`/ai-chat?issueId=${issue.id}`}>
                    <Button size="sm" className="text-xs font-semibold gap-1.5 shrink-0 bg-primary text-primary-foreground">
                      <Bot className="h-3.5 w-3.5" /> Fix with Copilot <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>Target: <strong className="text-foreground">{issue.pageTitle || issue.entity_title}</strong></span>
                    <span>{issue.affectedUrl || issue.entity_url}</span>
                  </div>
                  {issue.evidence && (
                    <div className="text-[11px] text-slate-300 flex items-start gap-1.5 pt-0.5">
                      <Info className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span><strong>Verified Evidence:</strong> {issue.evidence}</span>
                    </div>
                  )}
                  <div className="text-emerald-400 font-medium text-xs pt-1 flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span><strong>Actionable Remediation:</strong> {issue.recommendation || issue.remediation}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
