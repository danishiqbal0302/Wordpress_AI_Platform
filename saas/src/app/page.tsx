"use client";

import * as React from "react";
import { ChatGPTLayout } from "../components/chat/ChatGPTLayout";
import { HeroPromptView } from "../components/chat/HeroPromptView";
import { ChatMessageStream, ChatMessage } from "../components/chat/ChatMessageStream";
import { ConnectWebsiteModal } from "../components/chat/ConnectWebsiteModal";
import { EditKeysModal } from "../components/chat/EditKeysModal";
import { DeleteWebsiteModal } from "../components/chat/DeleteWebsiteModal";
import { Plus, Mic, ArrowUp, ImageIcon, X, Loader2 } from "lucide-react";

export default function ChatGPTPage() {
  const [user, setUser] = React.useState<any | null>(null);
  const [userSites, setUserSites] = React.useState<any[]>([]);
  const [activeSite, setActiveSite] = React.useState<any | null>(null);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [editKeysModalOpen, setEditKeysModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [siteToEdit, setSiteToEdit] = React.useState<any | null>(null);
  const [siteToDelete, setSiteToDelete] = React.useState<any | null>(null);
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<{ name: string; dataUrl: string } | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const stickyFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenDeleteModal = (site: any) => {
    setSiteToDelete(site);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (siteId: string) => {
    try {
      const res = await fetch(`/api/websites/${siteId}`, { method: "DELETE" });
      if (res.ok) {
        setUserSites((prev) => {
          const updated = prev.filter((s) => s.id !== siteId);
          if (activeSite?.id === siteId) {
            setActiveSite(updated[0] || null);
          }
          return updated;
        });
      }
    } catch (err) {
      console.error("Delete site error:", err);
    }
  };

  const handleOpenEditKeys = (site: any) => {
    setSiteToEdit(site);
    setEditKeysModalOpen(true);
  };

  const handleKeysUpdated = (updatedSite: any) => {
    setUserSites((prev) =>
      prev.map((s) => (s.id === updatedSite.id ? updatedSite : s))
    );
    if (activeSite?.id === updatedSite.id) {
      setActiveSite(updatedSite);
    }
  };

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

  // Load persistent chat history from PostgreSQL database when user or active site changes
  React.useEffect(() => {
    if (!user || !activeSite?.id) {
      setMessages([]);
      return;
    }

    let isSubscribed = true;
    setIsLoading(true);

    fetch(`/api/chat/history?siteId=${activeSite.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isSubscribed) return;
        if (data?.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load chat history from database:", err);
      })
      .finally(() => {
        if (isSubscribed) setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [user?.id, activeSite?.id]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setMessages([]);
    setUser(null);
    setUserSites([]);
    setActiveSite(null);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputPrompt("");
    setSelectedImage(null);
  };

  // 2. Submit Prompt Handler
  const handleSubmitPrompt = async (customPrompt?: string) => {
    const textToSubmit = customPrompt || inputPrompt;
    if ((!textToSubmit || !textToSubmit.trim()) && !selectedImage) return;
    if (isLoading) return;

    const attachedImg = selectedImage;
    const userPromptText = textToSubmit.trim() || (attachedImg ? `Add image ${attachedImg.name} to the page` : "");

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: attachedImg ? `📷 Attached [${attachedImg.name}]\n${userPromptText}` : userPromptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPromptText,
          siteId: activeSite?.id,
          imageAttachment: attachedImg,
          chatHistory: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
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
        suggestions: data.suggestions
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (data.generationState && data.generationState.status === "BUILDING") {
        const progressMsgId = `progress-${Date.now()}`;
        const progressMsg: ChatMessage = {
          id: progressMsgId,
          sender: "system",
          text: "⚙️ **Autonomous Build Tasks Initiated...**\n```text\nInitializing background site builder...\n```",
        };
        setMessages((prev) => [...prev, progressMsg]);

        const intervalId = setInterval(async () => {
          try {
            const statusRes = await fetch(`/api/chat/status?siteId=${activeSite?.id}`);
            if (statusRes.ok) {
              const statusData = await statusRes.json();
              
              if (statusData.logs && statusData.logs.length > 0) {
                const logsText = statusData.logs.join("\n");
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === progressMsgId
                      ? {
                          ...m,
                          text: `🛠️ **Background Build Progress Logs:**\n\`\`\`text\n${logsText}\n\`\`\``,
                        }
                      : m
                  )
                );
              }

              if (statusData.status === "COMPLETED" || statusData.status === "FAILED") {
                clearInterval(intervalId);
                setIsLoading(false);

                const finalMsg: ChatMessage = {
                  id: `final-${Date.now()}`,
                  sender: "ai",
                  text: statusData.status === "COMPLETED"
                    ? "🎉 **Autonomous site build completed successfully!** All pages, navigation menus, static front page settings, and stock media assets have been fully configured on your live WordPress site!"
                    : `❌ **Autonomous build failed**: ${statusData.error || "An unexpected error occurred during page generation."}`,
                  suggestions: statusData.suggestions || [
                    "Check my website home page",
                    "Configure my services list"
                  ]
                };
                setMessages((prev) => [...prev, finalMsg]);
              }
            }
          } catch (pollErr) {
            console.error("Error polling build status:", pollErr);
          }
        }, 3000);
      }
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
      onOpenDeleteModal={handleOpenDeleteModal}
      onEditSiteKeys={handleOpenEditKeys}
      onLogout={handleLogout}
    >
      {/* View Switch: Hero View vs Active Chat Stream */}
      {messages.length === 0 ? (
        <HeroPromptView
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSubmitPrompt={handleSubmitPrompt}
          onOpenConnectModal={() => setConnectModalOpen(true)}
          isLoading={isLoading}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatMessageStream
            messages={messages}
            siteId={activeSite?.id}
            isLoading={isLoading}
            onApplyAction={handleApplyAction}
            onRollbackAction={handleRollbackAction}
            onSelectSuggestion={(suggestion) => handleSubmitPrompt(suggestion)}
          />

          {/* Sticky Bottom Floating Input Pill Box */}
          <div className="p-4 max-w-3xl mx-auto w-full space-y-2">
            {/* Selected Image Thumbnail Badge */}
            {selectedImage && (
              <div className="flex items-center gap-2 p-1.5 px-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-2xl w-fit text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm animate-in fade-in">
                <img src={selectedImage.dataUrl} alt="Upload preview" className="h-6 w-6 rounded-lg object-cover border border-indigo-300 dark:border-indigo-700" />
                <span className="truncate max-w-[160px]">{selectedImage.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-0.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="relative flex items-center bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-full shadow-md p-2 pl-3">
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mr-1"
                title="Connect New Website"
              >
                <Plus className="h-5 w-5" />
              </button>

              <input
                type="file"
                ref={stickyFileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      setSelectedImage({
                        name: file.name,
                        dataUrl: evt.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => stickyFileInputRef.current?.click()}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mr-2 shrink-0"
                title="Attach Image from Desktop"
              >
                <ImageIcon className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if ((inputPrompt.trim() || selectedImage) && !isLoading) {
                      handleSubmitPrompt();
                    }
                  }
                }}
                placeholder={selectedImage ? `Instructions for ${selectedImage.name}...` : "Ask follow up..."}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2 selection:bg-indigo-500 selection:text-white"
              />

              <button
                type="button"
                onClick={() => handleSubmitPrompt()}
                disabled={(!inputPrompt.trim() && !selectedImage) || isLoading}
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                  (inputPrompt.trim() || selectedImage) && !isLoading
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen welcome scan loader overlay */}
      {isLoading && messages.length === 0 && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-sm w-full mx-4 space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">🔍 Scanning Website Connection</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Analyzing page sitemaps, active theme specifications, and content inventory on your live WordPress site...
              </p>
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
          // Purge localStorage cache for this new site ID to ensure clean onboarding
          if (typeof window !== "undefined") {
            const storageKey = `wp_ai_chat_history_user_${user?.id}_site_${newSite.id}`;
            localStorage.removeItem(storageKey);
          }
        }}
      />

      {/* Edit Website Connection Keys Modal */}
      <EditKeysModal
        isOpen={editKeysModalOpen}
        onClose={() => setEditKeysModalOpen(false)}
        site={siteToEdit}
        onSuccess={handleKeysUpdated}
      />

      {/* Delete Website Confirmation Modal */}
      <DeleteWebsiteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        site={siteToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </ChatGPTLayout>
  );
}
