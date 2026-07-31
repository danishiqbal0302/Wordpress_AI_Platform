"use client";

import * as React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Dialog } from "../../../components/ui/dialog";
import { Alert } from "../../../components/ui/alert";
import { MOCK_PROPOSALS, MOCK_WEBSITES } from "../../../mock/data";
import {
  Bot,
  User,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Search,
  Lock,
  Layers,
} from "lucide-react";

export default function AIChatPage() {
  const [messages, setMessages] = React.useState([
    {
      id: "m1",
      sender: "user",
      text: "Improve the meta title and description for the emergency plumbing page.",
      time: "3:10 PM",
    },
    {
      id: "m2",
      sender: "ai",
      text: "I found one matching page on **Apex Plumbing & Heating**:\n\n**Page:** Emergency Plumbing Services (`/emergency-plumbing`)\n\nYoast SEO controls the page metadata. The installed Yoast version (v22.6) has passed our contract compatibility tests.\n\nI have generated a proposed update below with stale-checksum locking enabled.",
      time: "3:10 PM",
      hasProposal: true,
      proposal: MOCK_PROPOSALS[0],
    },
  ]);

  const [inputPrompt, setInputPrompt] = React.useState("");
  const [isApproving, setIsApproving] = React.useState(false);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);
  const [executionSuccess, setExecutionSuccess] = React.useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: inputPrompt,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");

    setTimeout(() => {
      const aiReply = {
        id: `m-${Date.now() + 1}`,
        sender: "ai",
        text: "I have analyzed your request. I can optimize the featured image alt text for page #108. Would you like me to prepare a proposal with field checksum locking?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  const handleExecuteAction = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setShowApprovalModal(false);
      setExecutionSuccess(true);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> AI Optimization Copilot
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Deterministic, proposal-based WordPress content & SEO editor with checksum concurrency locks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="wp" className="text-xs px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 mr-1 inline" /> Yoast 22.6 Verified Adapter
          </Badge>
        </div>
      </div>

      {executionSuccess && (
        <Alert variant="success" title="Metadata Updated and Verified Successfully!">
          The connector updated the meta description and confirmed exact reread match. Rollback snapshot saved (Confidence: Full Field Restoration).
        </Alert>
      )}

      {/* Main Chat & Proposal Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Chat Conversation */}
        <Card className="lg:col-span-7 flex flex-col justify-between overflow-hidden">
          {/* Messages Container */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0 ${msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    }`}
                >
                  {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-4 space-y-3 ${msg.sender === "user"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted/30 border border-border text-foreground"
                    }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Proposal Card Embedded inside Chat */}
                  {msg.hasProposal && msg.proposal && (
                    <div className="mt-3 p-4 rounded-xl bg-card border border-primary/40 space-y-3 text-foreground shadow-lg">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="font-bold text-xs text-primary">Proposed Metadata Change</span>
                        <Badge variant="outline" className="text-[10px]">Stale Lock: Active</Badge>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div>
                          <span className="text-muted-foreground font-semibold">Target Page:</span>
                          <span className="ml-1 font-bold">{msg.proposal.targetPageTitle}</span>
                        </div>

                        {/* Search Result Preview */}
                        <div className="p-3 rounded-lg bg-black/40 border border-border space-y-1">
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">Google Search Result Preview</span>
                          <div className="text-blue-400 font-semibold text-xs hover:underline cursor-pointer">
                            {msg.proposal.targetPageTitle} | Apex Plumbing
                          </div>
                          <div className="text-emerald-400 text-[10px] font-mono">
                            https://apexplumbing.com/{msg.proposal.targetPageSlug}
                          </div>
                          <p className="text-gray-300 text-[11px]">
                            {msg.proposal.proposedValues.meta_description}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setShowApprovalModal(true)}
                        className="w-full text-xs font-semibold gap-1.5 py-4"
                      >
                        <ShieldCheck className="h-4 w-4" /> Review & Approve Change
                      </Button>
                    </div>
                  )}

                  <span className="text-[10px] opacity-60 block text-right">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border/60 bg-card/60 flex items-center gap-2">
            <Input
              placeholder="Ask Copilot to audit content, rewrite meta tags, or fix alt text..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="text-xs"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* Right Info Drawer / Proposal Details */}
        <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" /> Action Execution Rules & Side-Effects
            </h3>

            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Target Page Checksum:</span>
                <span className="font-mono text-foreground font-bold">a7c82f91b490</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stale Verification:</span>
                <Badge variant="success">Hard-Fail Protected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rollback Level:</span>
                <span className="font-semibold text-emerald-400">Full Field Restoration</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground block">Known Side Effects Registry:</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Yoast XML sitemap auto-regenerations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> WordPress object cache purge for page ID #42
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> External search engine re-indexing ping
                </li>
              </ul>
            </div>
          </div>

          <Alert variant="info" title="Honest Rollback Commitment">
            Rollback will restore the exact meta title and description values changed by this platform. It will not undo external search engine crawling.
          </Alert>
        </Card>
      </div>

      {/* Execution Approval Dialog */}
      <Dialog
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Confirm & Execute WordPress Action"
        description="Verify the target checksum match before triggering the write operation."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-black/40 border border-border space-y-1">
            <span className="text-muted-foreground uppercase text-[10px] font-mono">Approved Target Checksum</span>
            <div className="font-mono text-emerald-400 font-bold">a7c82f91b490 (Verified Unchanged)</div>
          </div>

          <Alert variant="warning" title="Side Effect Pre-Execution Notice">
            Applying this change will update Yoast SEO metadata on <strong>Apex Plumbing & Heating</strong>. The platform will reread and confirm exact character match immediately after execution.
          </Alert>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleExecuteAction} isLoading={isApproving} className="font-semibold gap-1.5">
              Confirm & Apply Now <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
