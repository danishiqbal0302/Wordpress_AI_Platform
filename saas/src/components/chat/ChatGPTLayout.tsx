"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import {
  SquarePen,
  Search,
  Puzzle,
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
  CheckCircle2,
  ShieldCheck,
  Zap,
  MoreVertical,
  Key,
  Trash2,
} from "lucide-react";

import { PluginStatusModal } from "./PluginStatusModal";

interface ChatGPTLayoutProps {
  children: React.ReactNode;
  user: any | null;
  activeSite: any | null;
  userSites: any[];
  onSelectSite: (site: any) => void;
  onNewChat: () => void;
  onOpenConnectModal: () => void;
  onOpenDeleteModal: (site: any) => void;
  onEditSiteKeys: (site: any) => void;
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
  onOpenDeleteModal,
  onEditSiteKeys,
  onLogout,
}: ChatGPTLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // 3-dot Dropdown Open Menu State (key: siteId)
  const [activeMenuSiteId, setActiveMenuSiteId] = React.useState<string | null>(null);

  // Modal Section States
  const [pricingModalOpen, setPricingModalOpen] = React.useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [helpModalOpen, setHelpModalOpen] = React.useState(false);
  const [pluginModalOpen, setPluginModalOpen] = React.useState(false);

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
            <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
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

        {/* Sidebar Actions: Connect Website & Search */}
        <div className="px-3 space-y-1.5 mt-1">
          <button
            type="button"
            onClick={onOpenConnectModal}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md transition-all hover:scale-[1.01]"
          >
            <Plus className="h-4 w-4" />
            <span>Connect Website</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search website"
              className="w-full bg-transparent pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none rounded-xl border border-transparent focus:border-slate-300 dark:focus:border-slate-700 transition-all selection:bg-indigo-500 selection:text-white"
            />
          </div>
        </div>

        {/* Plugins / Tools Item */}
        <div className="px-3 py-2 border-b border-slate-200/60 dark:border-slate-800/60 mt-2">
          <button
            type="button"
            onClick={() => setPluginModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <Puzzle className="h-3.5 w-3.5" />
            <span>WP-AI Plugin Status</span>
          </button>
        </div>

        {/* Connected Websites / Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            Your Websites
          </div>

          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <div key={site.id} className="relative group flex items-center">
                <button
                  type="button"
                  onClick={() => onSelectSite(site)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors text-left pr-8 ${
                    activeSite?.id === site.id
                      ? "bg-slate-200 dark:bg-[#212121] text-slate-900 dark:text-white font-semibold shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-[#212121]"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate flex-1">{site.name}</span>
                </button>

                {/* 3-Dot Options Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuSiteId(activeMenuSiteId === site.id ? null : site.id);
                  }}
                  className="absolute right-1.5 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Website Options"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>

                {/* 3-Dot Dropdown Popup Menu */}
                {activeMenuSiteId === site.id && (
                  <div
                    className="absolute right-0 top-9 w-44 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 space-y-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuSiteId(null);
                        onEditSiteKeys(site);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] rounded-xl transition-colors text-left"
                    >
                      <Key className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      Edit Connection Keys
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuSiteId(null);
                        onOpenDeleteModal(site);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors text-left"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                      Delete Website
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : userSites.length > 0 ? (
            <div className="px-3 py-4 text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">No websites found</p>
            </div>
          ) : (
            <div className="px-3 py-4 text-center space-y-2">
              <p className="text-xs text-slate-400">No websites connected yet.</p>
              {user && (
                <Button
                  size="sm"
                  onClick={onOpenConnectModal}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-1.5 shadow-sm"
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
            onClick={() => setPricingModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>See plans and pricing</span>
          </button>
          <button
            type="button"
            onClick={() => setSettingsModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            onClick={() => setHelpModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#212121] rounded-xl transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help & FAQ</span>
          </button>

          {/* Unauthenticated Bottom Box */}
          {!user ? (
            <div className="mt-3 p-3 bg-slate-100 dark:bg-[#212121] rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-semibold text-slate-900 dark:text-white">
                Get responses tailored to you
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Log in to save your connected websites and perform 1-click safe AI edits.
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
        <header className="h-14 pt-[1px] border-b border-slate-100 dark:border-slate-800/80 px-4 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#171717]/80 backdrop-blur-md z-10">
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

            {/* Top Model Dropdown Title */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3 py-1.5 rounded-xl transition-colors">
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                WordPress AI
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Top Right Header Buttons */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link href="/login">
                  <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 h-8 shadow-sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="rounded-full border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold px-4 py-1.5 h-8 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Sign up for free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {activeSite ? (
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
                      activeSite.connectionState === "plugin_unreachable" || activeSite.connectionState === "not_detected"
                        ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    }`}
                  >
                    <Globe className="h-3 w-3" />
                    <span>{activeSite.name}</span>
                    {activeSite.connectionState === "plugin_unreachable" && (
                      <span className="text-[10px] bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100 font-bold px-1.5 py-0.5 rounded-full">
                        Plugin Uninstalled
                      </span>
                    )}
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={onOpenConnectModal}
                    className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold px-3 py-1 h-7 shadow-sm"
                  >
                    + Connect Site
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Children (Hero Prompt View or Chat Stream) */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">{children}</div>

        {/* Footer Disclaimer */}
        <div className="text-[10px] text-center text-slate-400 pb-2">
          WordPress AI Assistant by using it, you agree to our Terms & Privacy Policy.
        </div>
      </div>

      {/* Interactive Modals */}
      <Dialog
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        title="Plans and Pricing"
        description="Choose the plan that best fits your WordPress site optimization needs."
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base">Agency Pro Plan</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Unlimited WordPress sites & 1-click safe edits</div>
            </div>
            <div className="font-extrabold text-xl text-indigo-600 dark:text-indigo-400">$49/mo</div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setPricingModalOpen(false)} className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold">
              Close
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        title="Assistant Settings"
        description="Configure your AI assistant preferences and security rules."
      >
        <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Stale-Checksum Protection</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Automatic Cache Invalidation</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setSettingsModalOpen(false)} className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold">
              Save & Close
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="Help & FAQ"
        description="Learn how to use WordPress AI Assistant to optimize your website safely."
      >
        <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">How does 1-click safe edit work?</div>
            <p className="text-slate-500 dark:text-slate-400">Every change calculates target checksums before execution to prevent overwriting pages edited concurrently in wp-admin.</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">Can I rollback changes?</div>
            <p className="text-slate-500 dark:text-slate-400">Yes! Full snapshots are recorded for every edit. Click "Rollback Edit" directly in chat.</p>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setHelpModalOpen(false)} className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold">
              Got it
            </Button>
          </div>
        </div>
      </Dialog>

      <PluginStatusModal
        isOpen={pluginModalOpen}
        onClose={() => setPluginModalOpen(false)}
      />
    </div>
  );
}
