"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  SquarePen,
  Search,
  Image as ImageIcon,
  Puzzle,
  Compass,
  Sparkles,
  Settings,
  HelpCircle,
  CreditCard,
  ChevronDown,
  Globe,
  Plus,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { ConnectWebsiteModal } from "./ConnectWebsiteModal";

interface ChatGPTLayoutProps {
  children: React.ReactNode;
  user: any | null;
  activeSite: any | null;
  userSites: any[];
  onSelectSite: (site: any) => void;
  onNewChat: () => void;
  onOpenConnectModal: () => void;
  onLogout: () => void;
}

export function ChatGPTLayout({
  children,
  user,
  activeSite,
  userSites,
  onSelectSite,
  onNewChat,
  onOpenConnectModal,
  onLogout,
}: ChatGPTLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSites = userSites.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-[#ffffff] dark:bg-[#171717] text-slate-900 dark:text-slate-100 overflow-hidden font-sans selection:bg-slate-200 dark:selection:bg-slate-800">
      {/* Left Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-200 bg-[#f9f9f9] dark:bg-[#171717] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col shrink-0 overflow-hidden relative z-20`}
      >
        {/* Sidebar Header: Logo & Sidebar Toggle */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 px-2">
            <div className="h-6 w-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
              WordPress AI
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title="Close Sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Actions: New Chat & Search */}
        <div className="px-3 space-y-1 mt-1">
          <button
            type="button"
            onClick={onNewChat}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <SquarePen className="h-4 w-4 text-slate-500" />
            <span>New chat</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats"
              className="w-full bg-transparent pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none rounded-xl border border-transparent focus:border-slate-300 dark:focus:border-slate-700 transition-all"
            />
          </div>
        </div>

        {/* Navigation Items (Matching ChatGPT Screenshot) */}
        <div className="px-3 py-2 space-y-0.5 border-b border-slate-200/60 dark:border-slate-800/60 mt-2">
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Images</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <Puzzle className="h-3.5 w-3.5" />
            <span>Plugins</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Deep research</span>
          </button>
        </div>

        {/* Connected Websites / Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="flex items-center justify-between px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            <span>Your Websites</span>
            {user && (
              <button
                type="button"
                onClick={onOpenConnectModal}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-normal lowercase"
              >
                <Plus className="h-3 w-3" /> connect
              </button>
            )}
          </div>

          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <button
                key={site.id}
                type="button"
                onClick={() => onSelectSite(site)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors text-left ${
                  activeSite?.id === site.id
                    ? "bg-slate-200 dark:bg-[#212121] text-slate-900 dark:text-white font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-[#212121]"
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{site.name}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-center space-y-2">
              <p className="text-xs text-slate-400">No websites connected yet.</p>
              {user && (
                <Button
                  size="sm"
                  onClick={onOpenConnectModal}
                  className="w-full rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold py-1.5"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Connect Website
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Sidebar Settings & Auth Footer */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1">
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>See plans and pricing</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>

          {/* Unauthenticated Bottom Box (Matching Screenshot) */}
          {!user ? (
            <div className="mt-3 p-3 bg-slate-100 dark:bg-[#212121] rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-semibold text-slate-900 dark:text-white">
                Get responses tailored to you
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Log in to get answers based on saved chats, plus create images and upload files.
              </p>
              <Link href="/login" className="block">
                <Button className="w-full rounded-full bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold py-1.5 shadow-sm">
                  Log in
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-7 w-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {user.name || "User"}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-slate-100 dark:border-slate-800/80 px-4 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#171717]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Open Sidebar"
              >
                <PanelLeftOpen className="h-5 w-5" />
              </button>
            )}

            {/* Top Model Dropdown Title (Matching Screenshot) */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3 py-1.5 rounded-xl transition-colors">
              <span className="font-semibold text-lg text-slate-900 dark:text-white">
                ChatGPT
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Top Right Header Buttons */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link href="/login">
                  <Button className="rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 text-xs font-semibold px-4 py-1.5 h-8">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold px-4 py-1.5 h-8 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Sign up for free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {activeSite ? (
                  <div className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                    <Globe className="h-3 w-3" /> {activeSite.name}
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={onOpenConnectModal}
                    className="rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold px-3 py-1 h-7"
                  >
                    + Connect Site
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Children (Hero Prompt View or Chat Stream) */}
        <div className="flex-1 flex flex-col overflow-hidden relative">{children}</div>

        {/* Footer Disclaimer */}
        <div className="text-[10px] text-center text-slate-400 pb-2">
          ChatGPT is AI. By using it, you agree to our Terms & Privacy Policy.
        </div>
      </div>
    </div>
  );
}
