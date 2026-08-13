"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bot, User, Sparkles, CheckCircle2, ShieldCheck, RotateCcw, ExternalLink, ArrowRight, Loader2 } from "lucide-react";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp?: string;
  proposalDraft?: {
    ruleId: string;
    category: string;
    actionType: string;
    fieldLabel: string;
    pageTitle: string;
    affectedUrl: string;
    entityId: number | string;
    currentValue: string;
    suggestedValue: string;
  };
  site?: {
    id: string;
    name: string;
    url: string;
  };
  actionStatus?: "idle" | "applying" | "applied" | "rolling_back" | "rolled_back";
  actionLogId?: string;
  errorMessage?: string;
}

interface ChatMessageStreamProps {
  messages: ChatMessage[];
  siteId?: string;
  onApplyAction: (msgId: string, proposal: any) => Promise<void>;
  onRollbackAction: (msgId: string, actionLogId: string) => Promise<void>;
}

export function ChatMessageStream({ messages, siteId, onApplyAction, onRollbackAction }: ChatMessageStreamProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-4 ${
            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
          } items-start animate-in fade-in duration-200`}
        >
          {/* Avatar Icon */}
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              msg.sender === "user"
                ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-black"
                : "bg-black dark:bg-white text-white dark:text-black shadow-sm"
            }`}
          >
            {msg.sender === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </div>

          {/* Message Content */}
          <div
            className={`flex-1 max-w-[85%] space-y-3 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block text-sm leading-relaxed p-4 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-slate-100 dark:bg-[#2f2f2f] text-slate-900 dark:text-white rounded-tr-none"
                  : "bg-transparent text-slate-900 dark:text-slate-100"
              }`}
            >
              {msg.text.split("\n\n").map((para, pIdx) => (
                <p key={pIdx} className="mb-2 last:mb-0">
                  {para.split("**").map((part, bIdx) =>
                    bIdx % 2 === 1 ? (
                      <strong key={bIdx} className="font-semibold text-slate-950 dark:text-white">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>

            {/* Interactive Action Card (if message has proposalDraft) */}
            {msg.proposalDraft && (
              <div className="mt-4 p-5 bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      1-Click Safe Proposal
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {msg.proposalDraft.ruleId}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Stale Checksum Protected
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Target Entity</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{msg.proposalDraft.pageTitle}</span>
                    <a
                      href={msg.site?.url ? `${msg.site.url.replace(/\/$/, "")}${msg.proposalDraft.affectedUrl}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-normal"
                    >
                      {msg.proposalDraft.affectedUrl} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Proposed Field & Code Value */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {msg.proposalDraft.fieldLabel}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto max-h-48 whitespace-pre-wrap">
                    {msg.proposalDraft.suggestedValue}
                  </div>
                </div>

                {/* Error Banner */}
                {msg.errorMessage && (
                  <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800">
                    {msg.errorMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  {msg.actionStatus === "applied" || msg.actionStatus === "rolling_back" ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Edit Applied & Verified on WordPress
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={msg.actionStatus === "rolling_back"}
                        onClick={() => msg.actionLogId && onRollbackAction(msg.id, msg.actionLogId)}
                        className="rounded-xl text-xs font-semibold border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/40 gap-1.5"
                      >
                        {msg.actionStatus === "rolling_back" ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Rolling Back...
                          </>
                        ) : (
                          <>
                            <RotateCcw className="h-3.5 w-3.5" /> Rollback Edit
                          </>
                        )}
                      </Button>
                    </div>
                  ) : msg.actionStatus === "rolled_back" ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <RotateCcw className="h-4 w-4" /> Edit Rolled Back. Original Content Restored.
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      disabled={msg.actionStatus === "applying"}
                      onClick={() => onApplyAction(msg.id, msg.proposalDraft)}
                      className="rounded-xl bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 text-xs font-bold px-5 py-2 shadow-sm gap-2"
                    >
                      {msg.actionStatus === "applying" ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Applying to WordPress...
                        </>
                      ) : (
                        <>
                          Apply Safe Edit <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
