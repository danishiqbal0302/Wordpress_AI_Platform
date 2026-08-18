"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Download, ShieldCheck, CheckCircle2, Zap, Server, Code, ArrowRight } from "lucide-react";

interface PluginStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PluginStatusModal({ isOpen, onClose }: PluginStatusModalProps) {
  const handleDownload = () => {
    window.location.href = "/api/plugin/download";
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="WP-AI Connector Plugin Status"
      description="Official WordPress AI Security & REST API Connector Specifications"
      maxWidth="md"
    >
      <div className="space-y-4 py-1 text-xs text-slate-700 dark:text-slate-300">
        {/* Status Badge Box */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Connector v1.4.2 Ready</div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-300">Gutenberg & Classic Editor Aware</div>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
            Verified
          </span>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> HMAC Security Handshake
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Every request is signed with SHA-256 HMAC timestamped headers to block replay attacks.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Raw Block Preservation
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Preserves Gutenberg `&lt;!-- wp:... --&gt;` block comments and prevents Classic editor mode corruption.
            </p>
          </div>
        </div>

        {/* REST API Endpoints List */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Active REST API Routes
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>GET /wp-json/wp-ai/v1/health</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">200 OK</span>
            </div>
            <div className="flex justify-between">
              <span>GET /wp-json/wp-ai/v1/inventory</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">200 OK</span>
            </div>
            <div className="flex justify-between">
              <span>POST /wp-json/wp-ai/v1/quick-fix</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Signed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex justify-between items-center">
          <Button
            type="button"
            onClick={handleDownload}
            variant="outline"
            className="rounded-xl border-slate-300 dark:border-slate-700 text-xs font-semibold gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> Download Connector ZIP
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold px-4"
          >
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
