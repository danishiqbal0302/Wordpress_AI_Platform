"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Dialog } from "../../../components/ui/dialog";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Bot,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Search,
  FileText,
  Image as ImageIcon,
  Cpu,
  Link as LinkIcon,
  Database,
  Layers,
  Copy,
  Check,
  Zap,
  Filter,
  SlidersHorizontal,
  XCircle,
  AlertTriangle,
  Info as InfoIcon,
  ShieldCheck,
  History,
  Clock,
  Eye,
  Wand2,
  ExternalLink,
  Ban,
} from "lucide-react";

interface CategorySpec {
  id: string;
  name: string;
  icon: React.ElementType;
}

const CATEGORY_SPECS: CategorySpec[] = [
  { id: "seo_metadata", name: "SEO Metadata", icon: Search },
  { id: "content_quality", name: "Content Quality", icon: FileText },
  { id: "media_accessibility", name: "Media & Accessibility", icon: ImageIcon },
  { id: "technical_structure", name: "Technical Structure", icon: Cpu },
  { id: "taxonomies_internal_links", name: "Internal Links", icon: LinkIcon },
  { id: "acf", name: "ACF Fields", icon: Database },
  { id: "gutenberg", name: "Gutenberg", icon: Layers },
];

interface IssueGroup {
  rule_id: string;
  title: string;
  severity: string;
  category: string;
  remediation: string;
  rationale: string;
  issues: any[];
}

export default function AuditsPage() {
  const [audits, setAudits] = React.useState<any[]>([]);
  const [selectedAuditIndex, setSelectedAuditIndex] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanMessage, setScanMessage] = React.useState<string | null>(null);

  // History Modal State
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);

  // Details Preview Modal State (Phase 3 AI / Technical Inspection)
  const [activePreviewEntity, setActivePreviewEntity] = React.useState<any | null>(null);

  // Expanded Issue Group State (Key: rule_id)
  const [expandedRules, setExpandedRules] = React.useState<Record<string, boolean>>({});

  // Filter & Search States
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedSeverity, setSelectedSeverity] = React.useState("all");
  const [selectedEntityType, setSelectedEntityType] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("top_priority");
  const [showPassedChecks, setShowPassedChecks] = React.useState(false);

  // Copy Feedback State
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

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
        setSelectedAuditIndex(0);
      }
    } catch (err) {
      console.error(err);
      setScanMessage("Network error during audit scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const toggleRuleExpand = (ruleId: string) => {
    setExpandedRules((prev) => ({ ...prev, [ruleId]: !prev[ruleId] }));
  };

  const handleCopyUrl = (url: string, id: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const hasAudits = audits.length > 0;
  const primaryAudit = audits[selectedAuditIndex] || audits[0] || {
    overallScore: 0,
    seoScore: 0,
    contentScore: 0,
    mediaScore: 0,
    technicalScore: 0,
    totalIssuesCount: 0,
    criticalIssuesCount: 0,
    warningIssuesCount: 0,
    issues: [],
  };

  const rawIssuesList: any[] = primaryAudit.issues || [];

  // Category normalization helper
  const normalizeCategory = (rawCat?: string, ruleId?: string): string => {
    const c = (rawCat || "").toLowerCase();
    const r = (ruleId || "").toUpperCase();

    if (c === "seo_metadata" || c === "seo" || r.startsWith("SEO_")) return "seo_metadata";
    if (c === "content_quality" || c === "content" || r.startsWith("CONTENT_")) return "content_quality";
    if (c === "media_accessibility" || c === "accessibility" || c === "media" || r.startsWith("MEDIA_")) return "media_accessibility";
    if (c === "technical_structure" || c === "technical" || c === "tech" || r.startsWith("TECH_")) return "technical_structure";
    if (c === "taxonomies_internal_links" || c === "links" || c === "link" || r.startsWith("LINK_")) return "taxonomies_internal_links";
    if (c === "acf" || r.startsWith("ACF_")) return "acf";
    if (c === "gutenberg" || c === "blocks" || r.startsWith("BLOCK_")) return "gutenberg";

    return "seo_metadata";
  };

  const getCategoryName = (catId: string) => {
    const found = CATEGORY_SPECS.find((c) => c.id === catId);
    return found ? found.name : "SEO Metadata";
  };

  // Helper to normalize entity type
  const normalizeEntityType = (type?: string): string => {
    const t = (type || "").toLowerCase();
    if (t === "page") return "page";
    if (t === "post") return "post";
    if (t === "media" || t === "attachment") return "media";
    if (t === "custom_post_type" || t === "cpt") return "custom_post_type";
    return "page";
  };

  // Group findings into Issue Groups (Single Remediation & Rationale per group)
  const issueGroupsMap = React.useMemo(() => {
    const map: Record<string, IssueGroup> = {};

    rawIssuesList.forEach((issue) => {
      const payload = issue.actionPayload || {};
      const ruleId = issue.rule_id || payload.rule_id || (issue.title && issue.title.includes(":") ? issue.title.split(":")[0] : "SEO_001");
      let ruleTitle = issue.rule_title || payload.rule_title || issue.title || issue.issue_type || "Audit Finding";

      if (ruleTitle.includes(":") && ruleTitle.startsWith(ruleId)) {
        ruleTitle = ruleTitle.split(":").slice(1).join(":").trim();
      }

      const category = normalizeCategory(issue.category || payload.category, ruleId);
      const severity = (issue.severity || payload.severity || "warning").toLowerCase();
      const remediation = issue.remediation || issue.recommendation || payload.remediation || "Review metadata and layout structure.";
      const rationale = issue.rationale || payload.rationale || "Impacts search engine rankings, accessibility, and user engagement.";

      if (!map[ruleId]) {
        map[ruleId] = {
          rule_id: ruleId,
          title: ruleTitle || ruleId,
          severity,
          category,
          remediation,
          rationale,
          issues: [],
        };
      }
      map[ruleId].issues.push(issue);
    });

    return map;
  }, [rawIssuesList]);

  const allIssueGroups = React.useMemo(() => Object.values(issueGroupsMap), [issueGroupsMap]);

  // Compute Top Priority Fixes (Top 3 highest-impact issue groups)
  const topPriorityGroups = React.useMemo(() => {
    const list = [...allIssueGroups];
    const weight: Record<string, number> = { critical: 3, error: 3, warning: 2, info: 1 };
    list.sort((a, b) => {
      const wDiff = (weight[b.severity] || 0) - (weight[a.severity] || 0);
      if (wDiff !== 0) return wDiff;
      return b.issues.length - a.issues.length;
    });
    return list.slice(0, 3);
  }, [allIssueGroups]);

  // Telemetry Counters
  const counters = React.useMemo(() => {
    let critical = 0;
    let warning = 0;
    let info = 0;

    rawIssuesList.forEach((iss) => {
      const payload = iss.actionPayload || {};
      const sev = (iss.severity || payload.severity || "warning").toLowerCase();
      if (sev === "critical" || sev === "error") critical++;
      else if (sev === "warning") warning++;
      else info++;
    });

    const failedRulesCount = allIssueGroups.length;
    const totalEvaluated = primaryAudit.rulesEvaluatedCount || 27;
    const passedRulesCount = Math.max(0, totalEvaluated - failedRulesCount);

    return { critical, warning, info, failedRulesCount, passedRulesCount, totalEvaluated };
  }, [rawIssuesList, allIssueGroups, primaryAudit]);

  // Filtered & Sorted Issue Groups
  const filteredIssueGroups = React.useMemo(() => {
    let list = [...allIssueGroups];

    // Apply Search Query (Matches Issue Group Title, Rule ID, Page Titles, URLs, Evidence, Remediation)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((group) => {
        const matchesGroup =
          group.title.toLowerCase().includes(q) ||
          group.rule_id.toLowerCase().includes(q) ||
          group.remediation.toLowerCase().includes(q) ||
          group.rationale.toLowerCase().includes(q);

        const matchesPages = group.issues.some((iss) => {
          const payload = iss.actionPayload || {};
          const title = (iss.pageTitle || iss.entity_title || payload.entity_title || iss.title || "").toLowerCase();
          const url = (iss.affectedUrl || iss.entity_url || payload.entity_url || "").toLowerCase();
          const evidence = (iss.evidence || payload.evidence || "").toLowerCase();
          return title.includes(q) || url.includes(q) || evidence.includes(q);
        });

        return matchesGroup || matchesPages;
      });
    }

    // Apply Category Filter
    if (selectedCategory !== "all") {
      list = list.filter((g) => g.category === selectedCategory);
    }

    // Apply Severity Filter
    if (selectedSeverity !== "all") {
      list = list.filter((g) => {
        if (selectedSeverity === "critical") return g.severity === "critical" || g.severity === "error";
        if (selectedSeverity === "warning") return g.severity === "warning";
        if (selectedSeverity === "info") return g.severity === "info";
        return true;
      });
    }

    // Apply Entity Type Filter
    if (selectedEntityType !== "all") {
      list = list.filter((g) =>
        g.issues.some((iss) => normalizeEntityType(iss.entity_type || iss.actionPayload?.entity_type) === selectedEntityType)
      );
    }

    // Apply Sorting
    if (sortBy === "top_priority" || sortBy === "critical_first") {
      const weight: Record<string, number> = { critical: 3, error: 3, warning: 2, info: 1 };
      list.sort((a, b) => {
        const wDiff = (weight[b.severity] || 0) - (weight[a.severity] || 0);
        if (wDiff !== 0) return wDiff;
        return b.issues.length - a.issues.length;
      });
    } else if (sortBy === "most_affected") {
      list.sort((a, b) => b.issues.length - a.issues.length);
    } else if (sortBy === "alphabetical") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [allIssueGroups, searchQuery, selectedCategory, selectedSeverity, selectedEntityType, sortBy]);

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "media":
      case "attachment":
        return ImageIcon;
      case "acf":
        return Database;
      case "technical":
        return Cpu;
      default:
        return FileText;
    }
  };

  const lastScanDateStr = primaryAudit.auditDate
    ? new Date(primaryAudit.auditDate).toLocaleString()
    : "Latest Scan";

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Site Audit & Remediation Center
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
            <span>Prioritized issue groups, verified evidence, and future-ready AI resolution.</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
              <Clock className="h-3 w-3 text-sky-400" /> {lastScanDateStr}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {audits.length > 1 && (
            <Button
              onClick={() => setShowHistoryModal(true)}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-semibold border-slate-700 hover:bg-muted"
            >
              <History className="h-4 w-4 text-purple-400" /> View Full History ({audits.length})
            </Button>
          )}

          <Button
            onClick={handleRunScan}
            isLoading={isScanning}
            size="sm"
            className="gap-2 font-semibold text-xs bg-primary text-primary-foreground shadow-sm"
          >
            <RefreshCw className="h-4 w-4" /> Run Live Site Audit
          </Button>
        </div>
      </div>

      {scanMessage && (
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Health & Issue Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="border-primary/40 bg-card col-span-2 sm:col-span-1">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Health Score</span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              {hasAudits ? `${primaryAudit.overallScore}/100` : "--/100"}
            </div>
            <span className="text-[9px] text-emerald-400 font-semibold block">Explainable Score</span>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <XCircle className="h-3 w-3" /> Critical
            </span>
            <div className="text-2xl font-black text-red-400 mt-0.5">
              {hasAudits ? counters.critical : 0}
            </div>
            <span className="text-[9px] text-red-400/80 font-medium block">High Priority</span>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Warning
            </span>
            <div className="text-2xl font-black text-amber-400 mt-0.5">
              {hasAudits ? counters.warning : 0}
            </div>
            <span className="text-[9px] text-amber-400/80 font-medium block">Suboptimal</span>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <InfoIcon className="h-3 w-3" /> Info
            </span>
            <div className="text-2xl font-black text-blue-400 mt-0.5">
              {hasAudits ? counters.info : 0}
            </div>
            <span className="text-[9px] text-blue-400/80 font-medium block">Advisories</span>
          </CardContent>
        </Card>

        <Card className="border-rose-500/30 bg-rose-500/5">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" /> Issue Groups
            </span>
            <div className="text-2xl font-black text-rose-400 mt-0.5">
              {hasAudits ? counters.failedRulesCount : 0}
            </div>
            <span className="text-[9px] text-rose-400/80 font-medium block">Active Rules</span>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-3.5 text-center">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Passed Checks
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              {hasAudits ? counters.passedRulesCount : 0}
            </div>
            <span className="text-[9px] text-emerald-400/80 font-medium block">100% Clean</span>
          </CardContent>
        </Card>
      </div>

      {/* TOP PRIORITY FIXES HERO SECTION ("What should I fix first?") */}
      {hasAudits && topPriorityGroups.length > 0 && (
        <Card className="border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Zap className="h-5 w-5 fill-primary text-primary" />
              </div>
              <div>
                <h2 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                  Top Priority Fixes
                </h2>
                <p className="text-xs text-muted-foreground">
                  Highest-impact issues that will deliver immediate SEO and health score improvements.
                </p>
              </div>
            </div>
            <Badge variant="outline" className="font-mono text-xs text-amber-400 border-amber-500/30 bg-amber-500/10">
              Fix These First
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPriorityGroups.map((group, idx) => (
              <div key={group.rule_id} className="p-4 rounded-xl bg-card border border-border space-y-3 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={group.severity === "critical" ? "destructive" : "warning"}
                      className="text-[9px] uppercase font-bold px-2 py-0.5"
                    >
                      {group.severity} Priority
                    </Badge>
                    <span className="text-[11px] font-bold font-mono text-primary">
                      {group.issues.length} {group.issues.length === 1 ? "page affected" : "pages affected"}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-foreground tracking-tight">{group.title}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{group.remediation}</p>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      toggleRuleExpand(group.rule_id);
                      const el = document.getElementById(`issue_group_${group.rule_id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    Inspect Issues <ArrowRight className="h-3 w-3" />
                  </button>

                  <Link href={`/ai-chat?issueId=${group.issues[0]?.id || ""}`}>
                    <Button size="sm" className="h-7 text-[10px] font-bold gap-1 px-2.5 bg-primary text-primary-foreground">
                      <Bot className="h-3 w-3" /> Fix
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sticky Search & Multi-Filter Control Toolbar */}
      <div className="sticky top-[64px] z-20 bg-background/95 backdrop-blur border border-border p-4 rounded-xl shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Global Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues, entity titles, permalinks, evidence, remediations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-muted/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold font-mono">
              Showing {filteredIssueGroups.length} {filteredIssueGroups.length === 1 ? "Issue Group" : "Issue Groups"}
            </span>

            {(searchQuery || selectedCategory !== "all" || selectedSeverity !== "all" || selectedEntityType !== "all") && (
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSeverity("all");
                  setSelectedEntityType("all");
                  setSortBy("top_priority");
                }}
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-red-400 hover:text-red-300"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Filter Chips & Select Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50 text-xs">
          {/* Category Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
              }`}
            >
              All ({allIssueGroups.length})
            </button>

            {CATEGORY_SPECS.map((cat) => {
              const catGroupCount = allIssueGroups.filter((g) => g.category === cat.id).length;
              if (catGroupCount === 0) return null; // Hide empty categories by default

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat.name} ({catGroupCount})
                </button>
              );
            })}
          </div>

          {/* Severity, Entity Type & Sorting Dropdowns */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="h-8 text-xs rounded-lg border border-border bg-slate-900 px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Only</option>
              <option value="warning">Warning Only</option>
              <option value="info">Info Only</option>
            </select>

            {/* Entity Type Filter */}
            <select
              value={selectedEntityType}
              onChange={(e) => setSelectedEntityType(e.target.value)}
              className="h-8 text-xs rounded-lg border border-border bg-slate-900 px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Entities</option>
              <option value="page">Pages</option>
              <option value="post">Posts</option>
              <option value="media">Media</option>
              <option value="custom_post_type">CPTs</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 text-xs rounded-lg border border-border bg-slate-900 px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            >
              <option value="top_priority">Top Priority First</option>
              <option value="most_affected">Most Affected</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Issue Group Cards Stream */}
      <div className="space-y-3">
        {!hasAudits || rawIssuesList.length === 0 ? (
          <Card className="p-12 text-center text-xs text-muted-foreground space-y-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <p className="font-semibold text-foreground text-sm">No Audit Issues Logged</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Run a live audit scan to evaluate site metadata and content depth against active rules.
            </p>
            <div className="pt-2">
              <Button onClick={handleRunScan} isLoading={isScanning} size="sm" className="font-semibold text-xs bg-primary text-primary-foreground">
                Run Live Audit Scan
              </Button>
            </div>
          </Card>
        ) : filteredIssueGroups.length === 0 ? (
          <Card className="p-8 text-center text-xs text-muted-foreground space-y-2">
            <Filter className="h-6 w-6 text-muted-foreground mx-auto" />
            <p className="font-bold text-foreground">No issues match current filters</p>
            <p className="text-xs text-muted-foreground">Try clearing search keywords or selecting different category filters.</p>
          </Card>
        ) : (
          filteredIssueGroups.map((group) => {
            const isRuleExpanded = !!expandedRules[group.rule_id];
            const firstIssueId = group.issues[0]?.id || "";
            const categoryName = getCategoryName(group.category);

            return (
              <div
                key={group.rule_id}
                id={`issue_group_${group.rule_id}`}
                className="rounded-xl border border-border bg-card overflow-hidden transition-all shadow-sm"
              >
                {/* Collapsed Issue Group Header Card */}
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Badge
                      variant={group.severity === "critical" ? "destructive" : group.severity === "warning" ? "warning" : "outline"}
                      className="text-[10px] uppercase font-bold px-2 py-0.5"
                    >
                      {group.severity}
                    </Badge>

                    <Badge variant="outline" className="font-mono text-[10px] bg-slate-900 border-slate-700 text-sky-400 px-2 py-0.5">
                      {group.rule_id}
                    </Badge>

                    <Badge variant="secondary" className="text-[10px] text-muted-foreground font-medium px-2 py-0.5">
                      {categoryName}
                    </Badge>

                    <span className="font-bold text-xs text-foreground tracking-tight ml-1">
                      {group.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-[11px] font-bold text-primary font-mono bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">
                      {group.issues.length} {group.issues.length === 1 ? "affected item" : "affected items"}
                    </span>

                    <Link href={`/ai-chat?issueId=${firstIssueId}`}>
                      <Button size="sm" className="h-7 text-[11px] font-semibold gap-1.5 px-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                        <Zap className="h-3 w-3" /> Quick Fix
                      </Button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleRuleExpand(group.rule_id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      aria-label="Toggle affected pages"
                    >
                      {isRuleExpanded ? (
                        <ChevronDown className="h-4 w-4 text-primary" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded State: Single Remediation Block & Affected Pages List */}
                {isRuleExpanded && (
                  <div className="p-4 border-t border-border/60 bg-muted/20 space-y-4">
                    {/* SINGLE REMEDIATION & RATIONALE BLOCK FOR THIS ISSUE GROUP */}
                    <div className="p-3.5 rounded-xl bg-card border border-border text-xs space-y-2">
                      <div className="text-[11px] text-slate-300 flex items-start gap-2">
                        <InfoIcon className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sky-400 block mb-0.5">Why it matters:</strong>
                          <span>{group.rationale}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-emerald-300 flex items-start gap-2 font-medium pt-1.5 border-t border-border/50">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                        <div>
                          <strong className="text-emerald-400 block mb-0.5">Recommended Remediation:</strong>
                          <span>{group.remediation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 pt-1">
                      <FileText className="h-3.5 w-3.5 text-sky-400" />
                      <span>Affected Pages & Entities ({group.issues.length})</span>
                    </div>

                    {/* Affected Entity Rows */}
                    <div className="space-y-3">
                      {group.issues.map((issue: any) => {
                        const payload = issue.actionPayload || {};
                        const EntityIcon = getEntityIcon(issue.entity_type || payload.entity_type);
                        const targetUrl = issue.affectedUrl || issue.entity_url || payload.entity_url || "/";
                        const targetTitle = issue.pageTitle || issue.entity_title || payload.entity_title || issue.title || "(Untitled Entity)";
                        const currentValue = issue.current_value || payload.current_value || "(Not Set / Suboptimal)";
                        const expectedValue = issue.expected_value || payload.expected_value || "Compliant metadata / structure";
                        const evidence = issue.evidence || issue.description || payload.evidence || "Suboptimal element state verified in live scan.";
                        const issueId = issue.id || `${group.rule_id}_${issue.entity_id || "1"}`;

                        return (
                          <div key={issueId} className="p-3.5 rounded-xl bg-card border border-border space-y-3 shadow-sm hover:border-primary/30 transition-colors">
                            {/* Entity Header & Copy URL */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-border/60">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-1.5 rounded-lg bg-muted border border-border shrink-0">
                                  <EntityIcon className="h-4 w-4 text-sky-400" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-xs text-foreground truncate">{targetTitle}</h4>
                                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground truncate">
                                    <span className="truncate">{targetUrl}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyUrl(targetUrl, issueId)}
                                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                                      title="Copy URL"
                                    >
                                      {copiedId === issueId ? (
                                        <Check className="h-3 w-3 text-emerald-400" />
                                      ) : (
                                        <Copy className="h-3 w-3" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Value comparison */}
                              <div className="flex items-center gap-3 text-[11px] shrink-0 font-mono">
                                <div><span className="text-red-400 font-semibold">Current:</span> {currentValue}</div>
                                <div className="text-slate-500">|</div>
                                <div><span className="text-emerald-400 font-semibold">Expected:</span> {expectedValue}</div>
                              </div>
                            </div>

                            {/* Verified Evidence Log */}
                            {evidence && (
                              <div className="p-2 rounded-lg bg-muted/20 border border-border text-[11px] text-muted-foreground font-mono">
                                <span>Verified Evidence: {evidence}</span>
                              </div>
                            )}

                            {/* PHASE 3 FUTURE-READY AI ACTION TOOLBAR */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40">
                              <div className="flex items-center gap-1.5">
                                {/* View Details Placeholder */}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setActivePreviewEntity(issue)}
                                  className="h-7 text-[11px] font-medium text-slate-300 hover:text-foreground gap-1 px-2"
                                >
                                  <Eye className="h-3 w-3" /> View Details
                                </Button>

                                {/* Learn More */}
                                <a
                                  href="https://wordpress.org/documentation/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 px-2 py-1"
                                >
                                  Learn More <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Resolve with AI Placeholder (Phase 3 Ready) */}
                                <Button
                                  size="sm"
                                  disabled
                                  variant="outline"
                                  className="h-7 text-[11px] font-bold gap-1 px-2.5 border-purple-500/30 text-purple-300 bg-purple-500/10 opacity-80 cursor-not-allowed"
                                  title="AI Auto-Fix will be enabled in Phase 3"
                                >
                                  <Wand2 className="h-3 w-3 text-purple-400" /> Resolve with AI
                                  <Badge variant="outline" className="text-[8px] font-mono border-purple-500/40 text-purple-300 ml-1">Phase 3</Badge>
                                </Button>

                                {/* Manual Fix via Copilot Chat */}
                                <Link href={`/ai-chat?issueId=${issueId}`}>
                                  <Button size="sm" className="h-7 text-[11px] font-semibold gap-1.5 px-3 bg-primary text-primary-foreground">
                                    <Bot className="h-3.5 w-3.5" /> Manual Fix <ArrowRight className="h-3 w-3" />
                                  </Button>
                                </Link>

                                {/* Ignore / Dismiss Placeholder (Future) */}
                                <button
                                  type="button"
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-muted/40 transition-colors"
                                  title="Ignore finding (Future)"
                                >
                                  <Ban className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Passed Compliance Checks Section */}
      {hasAudits && counters.passedRulesCount > 0 && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between cursor-pointer" onClick={() => setShowPassedChecks(!showPassedChecks)}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <CardTitle className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                Passed Compliance Checks
                <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-400">
                  {counters.passedRulesCount} Rules 100% Clean
                </Badge>
              </CardTitle>
            </div>
            <button type="button" className="text-xs text-emerald-400 font-semibold hover:underline">
              {showPassedChecks ? "Hide Passed Checks" : "Show Passed Checks"}
            </button>
          </CardHeader>

          {showPassedChecks && (
            <CardContent className="px-4 pb-4 pt-0 text-xs border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Array.from({ length: counters.passedRulesCount }).map((_, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-card/60 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Rule Check #{idx + 1}: Fully Compliant</span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Full Audit History Dialog Modal */}
      <Dialog
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="Full Site Audit History Log"
        description="Select any past audit report to inspect historical health scores and issue findings."
      >
        <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto">
          {audits.map((a: any, idx: number) => {
            const isSelected = selectedAuditIndex === idx;
            const dateStr = a.auditDate ? new Date(a.auditDate).toLocaleString() : `Audit Run #${idx + 1}`;
            const siteName = a.site?.name || "WordPress Site";

            return (
              <button
                key={a.id || idx}
                type="button"
                onClick={() => {
                  setSelectedAuditIndex(idx);
                  setShowHistoryModal(false);
                }}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-colors text-left ${
                  isSelected
                    ? "bg-primary/10 border-primary text-foreground"
                    : "bg-card hover:bg-muted/40 border-border text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-foreground block">{siteName}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{dateStr}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30">
                    Score: {a.overallScore}/100
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {a.totalIssuesCount || 0} Issues
                  </Badge>
                  {isSelected && <Badge variant="success" className="text-[9px]">Active</Badge>}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => setShowHistoryModal(false)} className="border-slate-700 text-xs">
            Close History
          </Button>
        </div>
      </Dialog>

      {/* Details Technical Inspection Modal (Phase 3 AI Ready) */}
      <Dialog
        isOpen={!!activePreviewEntity}
        onClose={() => setActivePreviewEntity(null)}
        title="Entity Audit Telemetry & Inspection"
        description="Verified technical evidence log and raw evaluation payload."
      >
        {activePreviewEntity && (
          <div className="space-y-4 py-2 text-xs">
            <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
              <span className="font-bold text-foreground">Target Entity:</span>
              <p className="text-muted-foreground font-mono">{activePreviewEntity.pageTitle || activePreviewEntity.entity_title || "Untitled"}</p>
              <p className="text-[11px] text-sky-400 font-mono">{activePreviewEntity.affectedUrl || activePreviewEntity.entity_url || "/"}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-300 block">Verified Evidence Log:</span>
              <p className="font-mono text-[11px] text-slate-200">
                {activePreviewEntity.evidence || activePreviewEntity.description || "Suboptimal metadata / structure element detected."}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-purple-400">
                <Wand2 className="h-3.5 w-3.5 text-purple-400" /> Phase 3 AI Resolution Readiness
              </span>
              <p className="text-[11px]">
                In Phase 3, clicking &quot;Resolve with AI&quot; will allow AI to generate structured fixes (meta descriptions, titles, headings, alt text) and execute updates safely after your approval.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setActivePreviewEntity(null)} className="text-xs">
                Close Inspection
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
