"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { User, Sparkles, CheckCircle2, ShieldCheck, RotateCcw, ExternalLink, ArrowRight, Loader2 } from "lucide-react";

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
  isLoading?: boolean;
  onApplyAction: (msgId: string, proposal: any) => Promise<void>;
  onRollbackAction: (msgId: string, actionLogId: string) => Promise<void>;
}

// Rich Markdown & Link Text Formatter Component
function FormattedText({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-2 text-sm leading-relaxed [overflow-wrap:anywhere] text-slate-800 dark:text-slate-200 overflow-hidden">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1.5" />;

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-base font-bold text-slate-900 dark:text-white pt-2 pb-0.5 border-b border-slate-100 dark:border-slate-800/80 break-words">
              {renderInlineStyles(trimmed.slice(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-lg font-bold text-slate-900 dark:text-white pt-3 pb-1 break-words">
              {renderInlineStyles(trimmed.slice(3))}
            </h2>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-3 pb-1 break-words">
              {renderInlineStyles(trimmed.slice(2))}
            </h1>
          );
        }

        if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed)) {
          const listText = trimmed.replace(/^[•\-]\s*|^\d+\.\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 py-0.5">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1 break-words">{renderInlineStyles(listText)}</span>
            </div>
          );
        }

        return <p key={idx} className="my-1 break-words">{renderInlineStyles(trimmed)}</p>;
      })}
    </div>
  );
}

// Inline Markdown Parser: **bold**, `code`, [link](url)
function renderInlineStyles(text: string): React.ReactNode {
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-0.5 break-all"
          >
            {match[1]}
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        );
      }
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-950 dark:text-white break-words">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs border border-slate-200 dark:border-slate-700 break-all">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export function ChatMessageStream({ messages, siteId, isLoading, onApplyAction, onRollbackAction }: ChatMessageStreamProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 max-w-3xl mx-auto w-full space-y-6 scrollbar-none">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3.5 ${
            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
          } items-start animate-in fade-in duration-200 max-w-full`}
        >
          {/* Avatar Icon */}
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              msg.sender === "user"
                ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-black shadow-sm"
                : "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md"
            }`}
          >
            {msg.sender === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </div>

          {/* Message Content Container */}
          <div
            className={`flex-1 min-w-0 max-w-[85%] overflow-hidden space-y-3 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block text-sm p-4 rounded-2xl break-words max-w-full overflow-hidden ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none shadow-sm"
                  : "bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.sender === "user" ? (
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              ) : (
                <FormattedText content={msg.text} />
              )}

              {/* Clickable Log In & Sign Up Action Buttons for Guest Prompts */}
              {(msg.text.includes("Log In") || msg.text.includes("Sign Up")) && msg.sender === "ai" && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 text-xs font-semibold shadow-sm transition-all"
                  >
                    Log In
                  </a>
                  <a
                    href="/register"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-4 py-1.5 text-xs font-semibold transition-all"
                  >
                    Sign Up for Free
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Action Card (if message has proposalDraft) */}
            {msg.proposalDraft && (
              <div className="mt-4 p-5 bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md text-left space-y-4 max-w-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      1-Click Safe Proposal
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {msg.proposalDraft.ruleId}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Stale Checksum Protected
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Target Entity</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between flex-wrap gap-1">
                    <span className="truncate max-w-[200px]">{msg.proposalDraft.pageTitle}</span>
                    <a
                      href={msg.site?.url ? `${msg.site.url.replace(/\/$/, "")}${msg.proposalDraft.affectedUrl}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-normal break-all"
                    >
                      {msg.proposalDraft.affectedUrl} <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Proposed Field & Clean Preview Code Value */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {msg.proposalDraft.fieldLabel}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 max-h-48 overflow-y-auto overflow-x-hidden break-all whitespace-pre-wrap scrollbar-none">
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
                        <CheckCircle2 className="h-4 w-4 shrink-0" /> Edit Applied & Verified on WordPress
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={msg.actionStatus === "rolling_back"}
                        onClick={() => msg.actionLogId && onRollbackAction(msg.id, msg.actionLogId)}
                        className="rounded-xl text-xs font-semibold border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/40 gap-1.5 shrink-0"
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
                      <RotateCcw className="h-4 w-4 shrink-0" /> Edit Rolled Back. Original Content Restored.
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      disabled={msg.actionStatus === "applying"}
                      onClick={() => onApplyAction(msg.id, msg.proposalDraft)}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 shadow-sm gap-2"
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

      {/* ChatGPT-style Animated Pulsing Dots Loading Bubble */}
      {isLoading && (
        <div className="flex gap-3.5 flex-row items-start animate-in fade-in duration-200">
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md animate-pulse">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0 max-w-[88%] text-left">
            <div className="inline-block p-4 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200/80 dark:border-slate-800 rounded-tl-none shadow-sm">
              <div className="flex items-center gap-1.5 py-1 px-1">
                <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
