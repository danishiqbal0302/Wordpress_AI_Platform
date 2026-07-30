"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./user-menu";
import { MOCK_WEBSITES } from "@/mock/data";
import { ChevronRight, Globe, Bell, ShieldCheck } from "lucide-react";

export function TopNav() {
  const pathname = usePathname();

  // Generate dynamic breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <header className="h-16 border-b border-border/80 bg-card/40 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Breadcrumb & Site Selector */}
      <div className="flex items-center gap-4">
        {/* Site Quick Dropdown Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground">
          <Globe className="h-3.5 w-3.5 text-primary" />
          <select className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer">
            {MOCK_WEBSITES.map((site) => (
              <option key={site.id} value={site.id} className="bg-card text-foreground">
                {site.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            App
          </Link>
          {breadcrumbItems.map((item, idx) => (
            <React.Fragment key={item.href}>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              {idx === breadcrumbItems.length - 1 ? (
                <span className="font-semibold text-foreground">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Verification Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verification Engine Active
        </div>

        {/* Notification Icon */}
        <button className="relative p-2 rounded-xl border border-border bg-card/60 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
