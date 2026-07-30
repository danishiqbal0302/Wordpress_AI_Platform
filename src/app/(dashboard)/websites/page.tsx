"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "@/components/ui/search";
import { MOCK_WEBSITES } from "@/mock/data";
import {
  Globe,
  Plus,
  Server,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function WebsitesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSites = MOCK_WEBSITES.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Connected Websites
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage paired WordPress sites, adapter compatibility, and environment health checks.
          </p>
        </div>
        <Link href="/websites/connect">
          <Button className="gap-2 font-semibold text-xs">
            <Plus className="h-4 w-4" /> Connect WordPress Site
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by site name or domain..."
        />
        <span className="text-xs text-muted-foreground hidden sm:inline-block">
          Showing {filteredSites.length} of {MOCK_WEBSITES.length} websites
        </span>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => (
          <Card key={site.id} className="flex flex-col justify-between hover:border-primary/50 transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center font-bold text-sm text-primary">
                    {site.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-1.5">
                      {site.name}
                    </CardTitle>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-0.5"
                    >
                      {site.url} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-3">
                {site.connectionState === "connected_healthy" && (
                  <Badge variant="success">Connected & Healthy</Badge>
                )}
                {site.connectionState === "connected_warnings" && (
                  <Badge variant="warning">Connected with Warnings</Badge>
                )}
                {site.connectionState === "paired_auth_failing" && (
                  <Badge variant="destructive">Auth Failing (Stripped Header)</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-3 text-xs border-t border-border/60 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SEO Provider:</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  {site.seoProvider.name} v{site.seoProvider.version}
                  <Badge variant={site.seoProvider.adapterSupportLevel === "verified" ? "success" : "warning"} className="text-[9px] px-1.5 py-0">
                    {site.seoProvider.adapterSupportLevel}
                  </Badge>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connector Plugin:</span>
                <span className="font-mono text-foreground font-semibold">v{site.health.connectorVersion}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">WordPress / PHP:</span>
                <span className="font-mono text-foreground font-medium">WP {site.health.wordpressVersion} • PHP {site.health.phpVersion}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-muted-foreground">Pages / Posts:</span>
                <span className="font-semibold text-foreground">{site.stats.totalPages} pages / {site.stats.totalPosts} posts</span>
              </div>
            </CardContent>

            <div className="p-4 border-t border-border/60 bg-muted/20 rounded-b-xl flex items-center justify-between">
              <Link href={`/audits?siteId=${site.id}`}>
                <Button variant="outline" size="sm" className="text-xs">
                  Run Audit
                </Button>
              </Link>
              <Link href={`/websites/${site.id}`}>
                <Button size="sm" className="text-xs font-semibold gap-1">
                  Diagnostics <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
