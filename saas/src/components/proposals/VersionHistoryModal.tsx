"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  RotateCcw,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Loader2,
  FileText,
} from "lucide-react";

export interface LogItem {
  id: string;
  actionTitle: string;
  targetEntity: string;
  executedBy: string;
  timestamp: string;
  executionState: string;
  verificationStatus: string;
  rollbackStatus: string;
  rollbackConfidence: string;
  snapshotData?: any;
}

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId?: string;
}

export function VersionHistoryModal({ isOpen, onClose, siteId }: VersionHistoryModalProps) {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [rollbackId, setRollbackId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/proposals/history");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.history || []);
      }
    } catch (err) {
      console.error("Fetch history error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRollback = async (logId: string) => {
    setRollbackId(logId);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/proposals/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionLogId: logId, siteId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Rollback failed.");
      }

      setSuccessMsg("Rollback executed successfully! Previous state restored on WordPress site.");
      fetchHistory();
    } catch (err: any) {
      alert(err.message || "Failed to rollback changes.");
    } finally {
      setRollbackId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-border/60 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground tracking-tight">Version History & Rollback Log</h3>
              <p className="text-xs text-muted-foreground">Snapshot version control and field-level rollback trail</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Loading snapshot version logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="py-12 text-center space-y-2 border border-dashed border-border/60 rounded-2xl">
              <History className="h-8 w-8 text-muted-foreground/40 mx-auto" />
              <p className="text-sm font-semibold text-foreground">No Version History Available</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No automated safe edits have been executed on this site yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const isRestored = log.rollbackStatus === "restored";
                const isRolling = rollbackId === log.id;
                const prevVal = log.snapshotData?.previousValue || "N/A";
                const appliedVal = log.snapshotData?.appliedValue || "N/A";

                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-3 hover:border-border transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-foreground">{log.actionTitle}</h4>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                              isRestored
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            }`}
                          >
                            {isRestored ? "Rolled Back" : "Applied"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <FileText className="h-3 w-3" /> {log.targetEntity}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </p>
                      </div>

                      {!isRestored && (
                        <button
                          onClick={() => handleRollback(log.id)}
                          disabled={isRolling}
                          className="px-3 py-1.5 rounded-xl bg-muted border border-border/80 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-400 text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          {isRolling ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                          ) : (
                            <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                          )}
                          <span>Rollback</span>
                        </button>
                      )}
                    </div>

                    {/* Snapshot Values Comparison */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40 text-xs">
                      <div className="space-y-1">
                        <span className="text-[11px] font-medium text-muted-foreground">Original Value (Pre-edit)</span>
                        <div className="p-2.5 rounded-xl bg-background border border-border/60 font-mono text-muted-foreground truncate">
                          {prevVal || <span className="italic opacity-50">Empty</span>}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-medium text-primary">Applied Edit Value</span>
                        <div className="p-2.5 rounded-xl bg-background border border-primary/20 font-mono text-foreground truncate">
                          {appliedVal}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/60 bg-muted/20 flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Full Field-Level Snapshot Integrity
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
