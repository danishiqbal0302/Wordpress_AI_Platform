"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_AUDITS } from "@/mock/data";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Search,
  Filter,
  Bot,
} from "lucide-react";

export default function AuditsPage() {
  const audit = MOCK_AUDITS[0];
  const [isScanning, setIsScanning] = React.useState(false);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1500);
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
            Automated SEO metadata inspection, missing alt-text finder, and Gutenberg content quality audits.
          </p>
        </div>
        <Button onClick={handleRunScan} isLoading={isScanning} className="gap-2 font-semibold text-xs">
          <RefreshCw className="h-4 w-4" /> Run New Site Audit
        </Button>
      </div>

      {/* Score Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card className="border-primary/40 bg-card">
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Overall Health Score</span>
            <div className="text-4xl font-black text-emerald-400 mt-2">{audit.overallScore}/100</div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Good SEO Standard</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">SEO Score</span>
            <div className="text-4xl font-black text-foreground mt-2">{audit.seoScore}/100</div>
            <span className="text-[10px] text-muted-foreground mt-1 block">Yoast 22.6 Active</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Content Quality</span>
            <div className="text-4xl font-black text-foreground mt-2">{audit.contentScore}/100</div>
            <span className="text-[10px] text-muted-foreground mt-1 block">Gutenberg Blocks Ok</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Critical Issues</span>
            <div className="text-4xl font-black text-red-400 mt-2">{audit.criticalIssuesCount}</div>
            <span className="text-[10px] text-red-400 mt-1 block font-semibold">Requires Attention</span>
          </CardContent>
        </Card>
      </div>

      {/* Issues Breakdown List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/60">
          <div>
            <CardTitle className="text-base">Audit Findings & Recommendations</CardTitle>
            <CardDescription className="text-xs">
              Review issues discovered across pages, posts, and media attachments.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            {audit.issues.length} Issues Found
          </Badge>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border/60">
          {audit.issues.map((issue) => (
            <div key={issue.id} className="p-5 space-y-3 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {issue.severity === "critical" && (
                      <Badge variant="destructive">Critical</Badge>
                    )}
                    {issue.severity === "warning" && (
                      <Badge variant="warning">Warning</Badge>
                    )}
                    <span className="font-bold text-sm text-foreground">{issue.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                </div>

                {issue.autoFixable && (
                  <Link href={`/ai-chat?issueId=${issue.id}`}>
                    <Button size="sm" className="text-xs font-semibold gap-1.5 shrink-0">
                      <Bot className="h-3.5 w-3.5" /> Fix with Copilot <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                )}
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border border-border text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Page: <strong className="text-foreground">{issue.pageTitle}</strong></span>
                  <span className="font-mono">{issue.affectedUrl}</span>
                </div>
                <div className="text-emerald-400 font-medium text-xs pt-1">
                  💡 Recommendation: {issue.recommendation}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
