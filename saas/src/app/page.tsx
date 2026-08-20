"use client";

import * as React from "react";
import { ChatGPTLayout } from "../components/chat/ChatGPTLayout";
import { HeroPromptView } from "../components/chat/HeroPromptView";
import { ChatMessageStream, ChatMessage } from "../components/chat/ChatMessageStream";
import { ConnectWebsiteModal } from "../components/chat/ConnectWebsiteModal";
import { EditKeysModal } from "../components/chat/EditKeysModal";
import { DeleteWebsiteModal } from "../components/chat/DeleteWebsiteModal";
import { Plus, Mic, ArrowUp, ImageIcon, X } from "lucide-react";

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

  // Storage Key Helper: User-scoped and Site-scoped
  const getChatStorageKey = React.useCallback(() => {
    if (!user) return "wp_ai_chat_history_guest";
    return `wp_ai_chat_history_user_${user.id}_site_${activeSite?.id || "none"}`;
  }, [user?.id, activeSite?.id]);

  // Load saved chat history when user or active site changes
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!user) {
      setMessages([]);
      return;
    }
    const storageKey = getChatStorageKey();
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        console.warn("Failed to parse saved chat history:", e);
      }
    }
    setMessages([]);
  }, [user?.id, activeSite?.id, getChatStorageKey]);

  // Persist messages to localStorage whenever they update
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const storageKey = getChatStorageKey();
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, getChatStorageKey]);

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

  React.useEffect(() => {
    if (activeSite && messages.length === 0) {
      setIsLoading(true);
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "hello",
          siteId: activeSite.id,
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.reply) {
          setMessages([
            {
              id: `ai-${Date.now()}`,
              sender: "ai",
              text: data.reply,
              suggestions: data.suggestions || [],
              site: data.site || activeSite,
              proposalDraft: data.proposalDraft,
            }
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
    }
  }, [activeSite, messages.length]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    if (typeof window !== "undefined") {
      const storageKey = getChatStorageKey();
      localStorage.removeItem(storageKey);
      localStorage.removeItem("wp_ai_chat_history_guest");
    }
    setMessages([]);
    setUser(null);
    setUserSites([]);
    setActiveSite(null);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputPrompt("");
    setSelectedImage(null);
    if (typeof window !== "undefined") {
      const storageKey = getChatStorageKey();
      localStorage.removeItem(storageKey);
    }
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

      {/* Connect Website Modal */}
      <ConnectWebsiteModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onSuccess={(newSite) => {
          setUserSites((prev) => [newSite, ...prev]);
          setActiveSite(newSite);
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
