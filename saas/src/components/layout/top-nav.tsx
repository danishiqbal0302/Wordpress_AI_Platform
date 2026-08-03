"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserMenu } from "./user-menu";
import { ChevronRight, Globe, Bell, ShieldCheck, Menu } from "lucide-react";
import { WordPressSite } from "../../types/wordpress";

interface TopNavProps {
  onMobileMenuToggle?: () => void;
}

export function TopNav({ onMobileMenuToggle }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sites, setSites] = React.useState<WordPressSite[]>([]);
  const [selectedSiteId, setSelectedSiteId] = React.useState<string>("");

  const fetchWebsites = React.useCallback(async () => {
    try {
      const res = await fetch("/api/websites");
      if (res.ok) {
        const data = await res.json();
        if (data?.sites) {
          setSites(data.sites);
          
          // Check if current URL path matches /websites/[id]
          const pathParts = pathname.split("/");
          if (pathParts[1] === "websites" && pathParts[2] && pathParts[2] !== "connect") {
            setSelectedSiteId(pathParts[2]);
          } else if (data.sites.length > 0) {
            setSelectedSiteId(data.sites[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Header websites fetch error:", err);
    }
  }, [pathname]);

  React.useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const handleSelectSite = (siteId: string) => {
    if (!siteId) return;
    setSelectedSiteId(siteId);
    router.push(`/websites/${siteId}`);
  };

  // Generate dynamic breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <header className="h-16 border-b border-border/80 bg-card/40 backdrop-blur-xl sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Mobile Menu Trigger & Breadcrumb */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Site Quick Dropdown Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs font-medium text-slate-100 shadow-md">
          <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
          <select
            value={selectedSiteId}
            onChange={(e) => handleSelectSite(e.target.value)}
            className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer max-w-[150px] sm:max-w-none text-slate-100"
          >
            {sites.length === 0 ? (
              <option value="" className="bg-slate-900 text-slate-100">
                No Websites Connected
              </option>
            ) : (
              sites.map((site) => (
                <option key={site.id} value={site.id} className="bg-slate-900 text-slate-100 font-medium py-1">
                  {site.name} ({new URL(site.url).hostname})
                </option>
              ))
            )}
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
      <div className="flex items-center gap-2.5 sm:gap-3">
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
