"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Globe,
  Sparkles,
  Bot,
  Activity,
  Settings,
  CreditCard,
  User,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Websites", href: "/websites", icon: Globe },
  { label: "AI Audits", href: "/audits", icon: Sparkles },
  { label: "AI Copilot", href: "/ai-chat", icon: Bot },
  { label: "Activity Trail", href: "/activity", icon: Activity },
];

const SECONDARY_NAV = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={cn(
          "w-64 border-r border-border/80 bg-card/95 backdrop-blur-xl flex flex-col justify-between h-screen fixed top-0 left-0 z-50 select-none transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-border/60 flex items-center justify-between">
            <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-foreground block">
                  WordPress <span className="gradient-text">AI</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-mono block -mt-1">
                  Audit & Safe Edit
                </span>
              </div>
            </Link>
          </div>

          {/* Connect Action */}
          <div className="p-4">
            <Link
              href="/websites/connect"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-600/25 transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              Connect Site
            </Link>
          </div>

          {/* Main Nav */}
          <nav className="px-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20 shadow-sm font-semibold"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Secondary Nav & Adapter Telemetry Info */}
        <div className="p-3 border-t border-border/60">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Account & Preferences
          </div>
          <nav className="space-y-1">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20 font-semibold"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Adapter Engine Health Badge */}
          <div className="mt-4 p-3 rounded-xl bg-card border border-border/80 text-[11px]">
            <div className="flex items-center justify-between font-semibold text-foreground">
              <span>Adapter Harness</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Yoast 22.6 Verified • Checksum Stale Lock Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
