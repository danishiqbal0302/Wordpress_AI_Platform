"use client";

import * as React from "react";
import { ChatGPTLayout } from "../components/chat/ChatGPTLayout";
import { HeroPromptView } from "../components/chat/HeroPromptView";
import { ChatMessageStream, ChatMessage } from "../components/chat/ChatMessageStream";
import { ConnectWebsiteModal } from "../components/chat/ConnectWebsiteModal";
import { Plus, Mic, ArrowUp } from "lucide-react";

export default function ChatGPTPage() {
  const [user, setUser] = React.useState<any | null>(null);
  const [userSites, setUserSites] = React.useState<any[]>([]);
  const [activeSite, setActiveSite] = React.useState<any | null>(null);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // 1. Initial Load Auth & Site Fetch
  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          // Fetch connected websites
          fetch("/api/websites")
            .then((r) => (r.ok ? r.json() : null))
            .then((siteData) => {
              const sites = siteData?.sites || siteData?.websites || [];
              setUserSites(sites);
              if (sites.length > 0) {
                setActiveSite(sites[0]);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserSites([]);
    setActiveSite(null);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputPrompt("");
  };

  // 2. Submit Prompt Handler
  const handleSubmitPrompt = async (customPrompt?: string) => {
    const textToSubmit = customPrompt || inputPrompt;
    if (!textToSubmit || !textToSubmit.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSubmit.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSubmit.trim(),
          siteId: activeSite?.id,
          chatHistory: messages.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
        }),
      });

      const data = await res.json();

      if (data.requireAuth) {
        const authMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.reply || "To perform AI optimizations on your WordPress site, please **Log In** or **Sign Up for Free**.",
        };
        setMessages((prev) => [...prev, authMsg]);
        return;
      }

      if (data.requireSite) {
        const siteMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.reply || "Please connect your WordPress website so I can analyze your content and apply 1-click safe edits.",
        };
        setMessages((prev) => [...prev, siteMsg]);
        setConnectModalOpen(true);
        return;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "I have processed your request.",
        proposalDraft: data.proposalDraft,
        site: data.site || activeSite,
        actionStatus: "idle",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "Sorry, I encountered an error communicating with your WordPress site. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Apply Action Edit Handler (1-Click Execution)
  const handleApplyAction = async (msgId: string, proposal: any) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, actionStatus: "applying", errorMessage: undefined } : m))
    );

    try {
      const targetSiteId = proposal.siteId || activeSite?.id;
      const res = await fetch("/api/proposals/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: targetSiteId,
          entityId: proposal.entityId,
          actionType: proposal.actionType,
          proposedValue: proposal.suggestedValue,
          currentValue: proposal.currentValue,
          pageTitle: proposal.pageTitle,
          pageSlug: proposal.affectedUrl?.replace(/^\//, ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to apply edit to WordPress");
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? {
                ...m,
                actionStatus: "applied",
                actionLogId: data.logItem?.id,
              }
            : m
        )
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? {
                ...m,
                actionStatus: "idle",
                errorMessage: err.message || "Execution error",
              }
            : m
        )
      );
    }
  };

  // 4. Rollback Handler
  const handleRollbackAction = async (msgId: string, actionLogId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, actionStatus: "rolling_back" } : m))
    );

    try {
      const res = await fetch("/api/proposals/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionLogId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Rollback failed");
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, actionStatus: "rolled_back" } : m))
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? { ...m, actionStatus: "applied", errorMessage: err.message || "Rollback failed" }
            : m
        )
      );
    }
  };

  return (
    <ChatGPTLayout
      user={user}
      activeSite={activeSite}
      userSites={userSites}
      onSelectSite={(site) => setActiveSite(site)}
      onNewChat={handleNewChat}
      onOpenConnectModal={() => setConnectModalOpen(true)}
      onLogout={handleLogout}
    >
      {/* View Switch: Hero View vs Active Chat Stream */}
      {messages.length === 0 ? (
        <HeroPromptView
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSubmitPrompt={handleSubmitPrompt}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatMessageStream
            messages={messages}
            siteId={activeSite?.id}
            onApplyAction={handleApplyAction}
            onRollbackAction={handleRollbackAction}
          />

          {/* Sticky Bottom Floating Input Pill Box */}
          <div className="p-4 max-w-3xl mx-auto w-full">
            <div className="relative flex items-center bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-full shadow-md p-2 pl-4">
              <button
                type="button"
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mr-2"
              >
                <Plus className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitPrompt();
                  }
                }}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2"
              />

              <div className="flex items-center gap-2 pr-1">
                <button
                  type="button"
                  className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  <Mic className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmitPrompt()}
                  disabled={!inputPrompt.trim() || isLoading}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    inputPrompt.trim() && !isLoading
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Website Modal */}
      <ConnectWebsiteModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onSuccess={(newSite) => {
          setUserSites((prev) => [newSite, ...prev]);
          setActiveSite(newSite);
        }}
      />
    </ChatGPTLayout>
  );
}
