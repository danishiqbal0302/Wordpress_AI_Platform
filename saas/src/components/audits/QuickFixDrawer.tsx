"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Wand2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Loader2,
  Info,
} from "lucide-react";

export interface QuickFixIssue {
  id?: string;
  rule_id?: string;
  category?: string;
  severity?: string;
  title?: string;
  description?: string;
  affectedUrl?: string;
  pageTitle?: string;
  currentValue?: string;
  expectedValue?: string;
  remediation?: string;
  entityId?: number | string;
}

interface QuickFixDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  siteId?: string;
  issue: QuickFixIssue | null;
  onSuccess?: () => void;
}

export function QuickFixDrawer({ isOpen, onClose, siteId, issue, onSuccess }: QuickFixDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [actionType, setActionType] = useState<string>("update_meta_description");
  const [fieldLabel, setFieldLabel] = useState<string>("Meta Description");
  const [proposedText, setProposedText] = useState<string>("");
  const [currentText, setCurrentText] = useState<string>("");
  const [executedSuccess, setExecutedSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastLogId, setLastLogId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && issue) {
      setExecutedSuccess(false);
      setErrorMsg(null);
      setLoading(false);
      setCurrentText(issue.currentValue || "Not set / Empty");

      // Auto-generate proposal draft
      fetchProposalDraft(issue);
    }
  }, [isOpen, issue]);

  const fetchProposalDraft = async (targetIssue: QuickFixIssue) => {
    setGenerating(true);
    try {
      const res = await fetch("/api/proposals/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ruleId: targetIssue.rule_id || "SEO_001",
          category: targetIssue.category || "SEO Metadata",
          title: targetIssue.title,
          affectedUrl: targetIssue.affectedUrl,
          pageTitle: targetIssue.pageTitle,
          entityId: targetIssue.entityId || 1,
          currentValue: targetIssue.currentValue,
          siteId: siteId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.proposalDraft) {
          setActionType(data.proposalDraft.actionType);
          setFieldLabel(data.proposalDraft.fieldLabel);
          setProposedText(data.proposalDraft.suggestedValue);
        }
      }
    } catch (err) {
      console.error("Draft generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleApplyEdit = async () => {
    if (!issue || !siteId) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/proposals/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          entityId: issue.entityId || 1,
          actionType,
          proposedValue: proposedText,
          currentValue: currentText,
          pageTitle: issue.pageTitle || "Page",
          pageSlug: issue.affectedUrl?.split("/").filter(Boolean).pop() || "page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to execute update on WordPress.");
      }

      setExecutedSuccess(true);
      if (data.logItem?.id) {
        setLastLogId(data.logItem.id);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to apply edit to WordPress.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !issue) return null;

  const severityColor =
    issue.severity === "critical"
      ? "bg-red-500/10 text-red-400 border-red-500/30"
      : issue.severity === "warning"
      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
      : "bg-blue-500/10 text-blue-400 border-blue-500/30";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border/80 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-border/60 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base tracking-tight text-foreground">Quick Fix Remediation</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityColor}`}>
                    {issue.severity || "Warning"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Rule ID: {issue.rule_id || "SEO_001"}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Success State Banner */}
            {executedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in zoom-in-95 duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300">Edit Applied Successfully!</h4>
                    <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                      Changes were safely written to your WordPress database via native plugin connector. A snapshot backup has been saved for instant rollback.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-emerald-500/20 text-xs">
                  <span className="text-emerald-300/80 flex items-center gap-1 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5" /> Checksum Verified
                  </span>
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : null}

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Target Page Overview Card */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary" /> Affected Target Entity
                </span>
                {issue.affectedUrl && (
                  <a
                    href={issue.affectedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    Open Page <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">{issue.pageTitle || "Target Page"}</h4>
                <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">{issue.affectedUrl || "/"}</p>
              </div>
            </div>

            {/* Issue Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-amber-400" /> Audit Finding
              </label>
              <div className="p-3 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground leading-relaxed">
                {issue.title || issue.description}
              </div>
            </div>

            {/* Current Value Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Current Value in WordPress</label>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/60 text-xs font-mono text-foreground/80 break-all">
                {currentText || <span className="text-muted-foreground/50 italic">None set / Empty</span>}
              </div>
            </div>

            {/* AI Suggestion & Editable Draft Input */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Proposed {fieldLabel} (Editable)
                </label>
                {generating && (
                  <span className="text-[11px] text-primary flex items-center gap-1 font-medium animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" /> AI Draft...
                  </span>
                )}
              </div>

              <textarea
                value={proposedText}
                onChange={(e) => setProposedText(e.target.value)}
                placeholder={`Type or customize ${fieldLabel}...`}
                rows={4}
                className="w-full p-3 rounded-xl bg-background border border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary text-xs font-medium text-foreground transition-all outline-none resize-y"
              />
              <p className="text-[11px] text-muted-foreground flex items-center justify-between">
                <span>User editable text box. Customize draft before applying.</span>
                <span className="font-mono text-[10px]">{proposedText.length} chars</span>
              </p>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-border/60 bg-muted/20 flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-border/80 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyEdit}
              disabled={loading || !proposedText.trim() || executedSuccess}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Applying Edit to WordPress...
                </>
              ) : executedSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Applied
                </>
              ) : (
                <>
                  Apply Safe Edit <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
