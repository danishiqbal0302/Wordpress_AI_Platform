"use client";

import * as React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Dialog } from "../../../components/ui/dialog";
import { Alert } from "../../../components/ui/alert";
import { Spinner } from "../../../components/ui/spinner";
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
  Globe,
  Settings,
  AlertCircle
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  hasProposal?: boolean;
  proposal?: any;
}

export default function AIChatPage() {
  const [websites, setWebsites] = React.useState<any[]>([]);
  const [selectedSiteId, setSelectedSiteId] = React.useState<string>("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [activeState, setActiveState] = React.useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);
  const [activeProposal, setActiveProposal] = React.useState<any>(null);
  const [isApproving, setIsApproving] = React.useState(false);
  const [executionSuccess, setExecutionSuccess] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const milestones = [
    { num: 0, title: "Website Intelligence Initialization" },
    { num: 1, title: "Optional Business and Branding Context" },
    { num: 2, title: "Business Category and Website Strategy" },
    { num: 3, title: "Research and Design Intelligence" },
    { num: 4, title: "Complete Website Architecture" },
    { num: 5, title: "Homepage Blueprint Before Generation" },
    { num: 6, title: "Real Image Discovery & Sideload" },
    { num: 7, title: "Builder-Specific Specification Conversion" },
    { num: 8, title: "Build the Homepage" },
    { num: 9, title: "Configure Real Root Homepage" },
    { num: 10, title: "Header, Navigation, and Footer Template Parts" },
    { num: 11, title: "Build Remaining Pages One at a Time" },
    { num: 12, title: "Autonomous Quality Control" },
    { num: 13, title: "Website-Wide Final Audit" },
  ];

  React.useEffect(() => {
    async function fetchSites() {
      try {
        const res = await fetch("/api/websites");
        if (res.ok) {
          const data = await res.json();
          setWebsites(data.sites || []);
          if (data.sites && data.sites.length > 0) {
            setSelectedSiteId(data.sites[0].id);
          }
        }
      } catch (e) {
        console.error("Failed to load sites:", e);
      }
    }
    fetchSites();
  }, []);

  React.useEffect(() => {
    if (!selectedSiteId) return;
    async function loadSiteState() {
      try {
        const res = await fetch(`/api/websites/${selectedSiteId}/memory`);
        if (res.ok) {
          const data = await res.json();
          const stateRecord = data.memories?.find((m: any) => m.key === "site_generation_state");
          if (stateRecord) {
            const parsedState = JSON.parse(stateRecord.value);
            setActiveState(parsedState);
            setMessages([
              {
                id: "welcome",
                sender: "ai",
                text: `Welcome back! We are currently working on **Milestone ${parsedState.current_milestone} — ${milestones[parsedState.current_milestone]?.title || "Builder Phase"}**.\n\nType your business details or commands to proceed, or reset the state by typing \`reset\` to start a new build.`,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              }
            ]);
          } else {
            setActiveState(null);
            setMessages([
              {
                id: "welcome",
                sender: "ai",
                text: `Welcome to the **WordPress AI Website Builder**! Select a connected website and type "build a cleaning company website" (or any business type) to initialize the autonomous generation state machine! ✨`,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              }
            ]);
          }
        }
      } catch (e) {
        console.error("Failed to load site state:", e);
      }
    }
    loadSiteState();
  }, [selectedSiteId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || !selectedSiteId || isSending) return;

    const userText = inputPrompt;
    setInputPrompt("");
    setErrorMessage(null);
    setExecutionSuccess(null);

    const userMsg: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          siteId: selectedSiteId,
          chatHistory: messages.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to process message.");
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `m-ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "I have processed your request.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        hasProposal: !!data.proposalDraft,
        proposal: data.proposalDraft,
      };

      setMessages((prev) => [...prev, aiMsg]);
      if (data.generationState) {
        setActiveState(data.generationState);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected chat error occurred.");
    } finally {
      setIsSending(false);
    }
  };

  const handleExecuteAction = async () => {
    if (!activeProposal || isApproving) return;
    setIsApproving(true);
    setErrorMessage(null);
    setExecutionSuccess(null);

    try {
      const res = await fetch("/api/proposals/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: selectedSiteId,
          entityId: activeProposal.entityId,
          actionType: activeProposal.actionType,
          proposedValue: activeProposal.suggestedValue || activeProposal.proposedValue,
          currentValue: activeProposal.currentValue,
          pageTitle: activeProposal.pageTitle,
          pageSlug: activeProposal.affectedUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to execute change on WordPress.");
      }

      const data = await res.json();
      setExecutionSuccess(`Successfully applied & verified: ${activeProposal.actionType.replace(/_/g, " ")} on target page.`);
      setShowApprovalModal(false);
      
      setMessages((prev) => [
        ...prev,
        {
          id: `m-system-${Date.now()}`,
          sender: "ai",
          text: `✅ **Action Applied Successfully**:\n* **Action**: \`${activeProposal.actionType}\`\n* **Status**: WordPress executed, character reread matches exactly. Rollback snapshot created.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
      
      const memRes = await fetch(`/api/websites/${selectedSiteId}/memory`);
      if (memRes.ok) {
        const memData = await memRes.json();
        const stateRecord = memData.memories?.find((m: any) => m.key === "site_generation_state");
        if (stateRecord) {
          setActiveState(JSON.parse(stateRecord.value));
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Execution failed.");
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4 animate-in fade-in">
      {/* Header with Site Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary animate-pulse" /> AI Website Builder
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Strict milestone-based autonomous generation with programmatic verification loops.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Globe className="h-4 w-4 text-sky-400 shrink-0" />
          <select
            value={selectedSiteId}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none w-full sm:w-48 font-medium cursor-pointer"
          >
            {websites.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {executionSuccess && (
        <Alert variant="success" title="Proposal Executed Successfully!">
          {executionSuccess}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive" title="Error Encountered">
          {errorMessage}
        </Alert>
      )}

      {/* Main Chat & Milestone Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Chat Conversation */}
        <Card className="lg:col-span-7 flex flex-col justify-between overflow-hidden border-border bg-card">
          <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  }`}
                >
                  {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-4 space-y-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted/30 border border-border text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Proposal Card Embedded inside Chat */}
                  {msg.hasProposal && msg.proposal && (
                    <div className="mt-3 p-4 rounded-xl bg-card border border-primary/40 space-y-3 text-foreground shadow-lg">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="font-bold text-xs text-primary">Proposed Action ({msg.proposal.actionType})</span>
                        <Badge variant="outline" className="text-[10px]">Stale Lock: Active</Badge>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div>
                          <span className="text-muted-foreground font-semibold">Target Entity:</span>
                          <span className="ml-1 font-bold">{msg.proposal.pageTitle || `ID #${msg.proposal.entityId}`}</span>
                        </div>
                        {msg.proposal.actionType === "import_media" && (
                          <div>
                            <span className="text-muted-foreground font-semibold">Image URL:</span>
                            <span className="ml-1 font-mono text-[10px] break-all block p-1.5 bg-black/40 rounded mt-1">{msg.proposal.suggestedValue?.image_url || msg.proposal.suggestedValue}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => {
                          setActiveProposal(msg.proposal);
                          setShowApprovalModal(true);
                        }}
                        className="w-full text-xs font-semibold gap-1.5 py-4 mt-2"
                      >
                        <ShieldCheck className="h-4 w-4" /> Review & Approve Change
                      </Button>
                    </div>
                  )}

                  <span className="text-[10px] opacity-60 block text-right">{msg.time}</span>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex gap-3 text-xs">
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="max-w-[80%] rounded-2xl p-4 bg-muted/30 border border-border text-foreground flex items-center gap-2">
                  <Spinner size="sm" />
                  <span className="text-xs text-muted-foreground">AI Website Builder is executing verification...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Tabs */}
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 border-t border-border/30 bg-muted/5">
            <button
              type="button"
              onClick={() => setInputPrompt("build a cleaning company website")}
              className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-full transition cursor-pointer flex items-center gap-1"
            >
              ✨ Build Cleaning Site
            </button>
            <button
              type="button"
              onClick={() => setInputPrompt("reset")}
              className="px-2.5 py-1 text-[10px] font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-full transition cursor-pointer flex items-center gap-1"
            >
              🔄 Reset State Machine
            </button>
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border/60 bg-card/60 flex items-center gap-2">
            <Input
              placeholder="Tell AI Website Builder what type of website you want to build..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="text-xs"
              disabled={isSending || !selectedSiteId}
            />
            <Button type="submit" size="icon" className="shrink-0" disabled={isSending || !selectedSiteId}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* Right Info Drawer / Milestone Steps */}
        <Card className="lg:col-span-5 p-4 flex flex-col justify-between overflow-hidden border-border bg-card">
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 scrollbar-thin">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
              <Layers className="h-4 w-4 text-sky-400" /> Milestone Generation Progress
            </h3>

            <div className="space-y-2">
              {milestones.map((m) => {
                let status = "PLANNED";
                if (activeState) {
                  if (activeState.current_milestone === m.num) {
                    status = activeState.status || "PLANNED";
                  } else if (activeState.current_milestone > m.num) {
                    status = "PASSED";
                  }
                }

                return (
                  <div
                    key={m.num}
                    className={`p-2.5 rounded-xl border text-[11px] flex items-center justify-between ${
                      status === "PASSED"
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                        : status === "EXECUTING" || status === "VERIFYING" || status === "REPAIRING"
                        ? "bg-sky-500/5 border-sky-500/30 text-sky-400 animate-pulse"
                        : "bg-muted/10 border-border/40 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[10px] bg-slate-800 border border-slate-700 h-5 w-5 rounded-md flex items-center justify-center shrink-0">
                        {m.num}
                      </span>
                      <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">{m.title}</span>
                    </div>
                    <Badge
                      variant={
                        status === "PASSED"
                          ? "success"
                          : status === "EXECUTING" || status === "VERIFYING" || status === "REPAIRING"
                          ? "info"
                          : "secondary"
                      }
                      className="text-[9px] uppercase tracking-wide shrink-0"
                    >
                      {status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Execution Approval Dialog */}
      <Dialog
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Confirm & Execute WordPress Action"
        description="Verify the parameters and execute the safe edit on the WordPress target site."
      >
        <div className="space-y-4 text-xs">
          {activeProposal && (
            <div className="p-3 rounded-lg bg-black/40 border border-border space-y-2">
              <div>
                <span className="text-muted-foreground uppercase text-[10px] font-mono">Action Type</span>
                <div className="font-bold text-slate-200">{activeProposal.actionType}</div>
              </div>
              <div>
                <span className="text-muted-foreground uppercase text-[10px] font-mono">Target Entity</span>
                <div className="font-bold text-slate-200">{activeProposal.pageTitle || `ID #${activeProposal.entityId}`}</div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowApprovalModal(false)} disabled={isApproving}>
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
