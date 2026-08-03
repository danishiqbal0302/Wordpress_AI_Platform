"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Dialog } from "../../../components/ui/dialog";
import { Search } from "../../../components/ui/search";
import { WordPressSite } from "../../../types/wordpress";
import {
  Plus,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Trash2,
  Key,
} from "lucide-react";

export default function WebsitesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sites, setSites] = React.useState<WordPressSite[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [reverifyingId, setReverifyingId] = React.useState<string | null>(null);

  // Modal States
  const [deleteTargetSite, setDeleteTargetSite] = React.useState<WordPressSite | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [keysTargetSite, setKeysTargetSite] = React.useState<WordPressSite | null>(null);
  const [apiKeyInput, setApiKeyInput] = React.useState("");
  const [hmacSecretInput, setHmacSecretInput] = React.useState("");
  const [isUpdatingKeys, setIsUpdatingKeys] = React.useState(false);
  const [keysError, setKeysError] = React.useState<string | null>(null);

  async function fetchSites() {
    try {
      setLoading(true);
      const res = await fetch("/api/websites");
      if (res.ok) {
        const data = await res.json();
        if (data?.sites) {
          setSites(data.sites);
        }
      }
    } catch (err) {
      console.error("Websites fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchSites();
  }, []);

  const handleReverify = async (siteId: string) => {
    setReverifyingId(siteId);
    try {
      const res = await fetch(`/api/websites/${siteId}/reverify`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchSites();
      }
    } catch (err) {
      console.error("Reverify error:", err);
    } finally {
      setReverifyingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetSite) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/websites/${deleteTargetSite.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSites((prev) => prev.filter((s) => s.id !== deleteTargetSite.id));
        setDeleteTargetSite(null);
      }
    } catch (err) {
      console.error("Delete site error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateKeysSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keysTargetSite) return;
    setKeysError(null);
    setIsUpdatingKeys(true);

    try {
      const res = await fetch(`/api/websites/${keysTargetSite.id}/keys`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKeyInput,
          hmacSecret: hmacSecretInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setKeysError(data.error || "Failed to update connection keys.");
      } else {
        setKeysTargetSite(null);
        await fetchSites();
      }
    } catch (err) {
      setKeysError("Network error updating connection keys.");
    } finally {
      setIsUpdatingKeys(false);
    }
  };

  const filteredSites = sites.filter(
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
            Manage paired WordPress sites, real-time lifecycle status, and environment health checks.
          </p>
        </div>
        <Link href="/websites/connect">
          <Button className="gap-2 font-semibold text-xs bg-primary text-primary-foreground">
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
          Showing {filteredSites.length} of {sites.length} websites
        </span>
      </div>

      {/* Empty State when zero sites */}
      {!loading && sites.length === 0 && (
        <Card className="p-12 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20 mx-auto flex items-center justify-center font-bold">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">No Websites Connected</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You haven't paired any WordPress websites yet. Connect your first site using the 4-step diagnostic wizard.
          </p>
          <Link href="/websites/connect" className="inline-block">
            <Button size="sm" className="font-semibold bg-primary text-primary-foreground">
              Connect WordPress Website
            </Button>
          </Link>
        </Card>
      )}

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => {
          const seoObj = (site.seoProvider as unknown as Record<string, string>) || {};
          const healthObj = (site.health as unknown as Record<string, any>) || {};

          return (
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

                  {/* Card Action Buttons (Manage Keys & Delete) */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setKeysTargetSite(site);
                        setApiKeyInput("");
                        setHmacSecretInput("");
                        setKeysError(null);
                      }}
                      title="Manage Keys / Re-pair"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => setDeleteTargetSite(site)}
                      title="Delete Website"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Connection State Badge */}
                <div className="pt-3 flex items-center justify-between">
                  {site.connectionState === "connected_healthy" && (
                    <Badge variant="success">Connected & Healthy</Badge>
                  )}
                  {site.connectionState === "not_detected" && (
                    <Badge variant="destructive">Plugin Uninstalled / Not Found</Badge>
                  )}
                  {site.connectionState === "paired_auth_failing" && (
                    <Badge variant="destructive">Auth Failing (Stripped Header)</Badge>
                  )}
                  {site.connectionState === "limited_permissions" && (
                    <Badge variant="warning">Limited Permissions</Badge>
                  )}
                  {site.connectionState === "degraded" && (
                    <Badge variant="destructive">Degraded (Offline / WAF)</Badge>
                  )}
                  {site.connectionState === "connected_warnings" && (
                    <Badge variant="warning">Connected with Warnings</Badge>
                  )}

                  <Button
                    onClick={() => handleReverify(site.id)}
                    isLoading={reverifyingId === site.id}
                    variant="ghost"
                    size="sm"
                    className="text-[11px] h-7 px-2 gap-1 text-muted-foreground hover:text-foreground"
                    title="Re-verify live connection status"
                  >
                    <RefreshCw className="h-3 w-3" /> Re-Verify
                  </Button>
                </div>
              </CardHeader>

              {/* Diagnostic Error & Recovery Alert Callout */}
              {site.connectionState !== "connected_healthy" && (healthObj.errorMessage || healthObj.recoverySuggestion) && (
                <div className="mx-6 mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-red-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>Connection Diagnostic Notice</span>
                  </div>
                  {healthObj.errorMessage && (
                    <p className="text-[11px] text-red-300">{healthObj.errorMessage}</p>
                  )}
                  {healthObj.recoverySuggestion && (
                    <p className="text-[10px] font-mono text-amber-300 pt-0.5">
                      💡 Fix: {healthObj.recoverySuggestion}
                    </p>
                  )}
                </div>
              )}

              <CardContent className="space-y-3 text-xs border-t border-border/60 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">SEO Provider:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    {seoObj.name || "Detecting..."} {seoObj.version ? `v${seoObj.version}` : ""}
                    {seoObj.adapterSupportLevel && (
                      <Badge variant={seoObj.adapterSupportLevel === "verified" ? "success" : "warning"} className="text-[9px] px-1.5 py-0">
                        {seoObj.adapterSupportLevel}
                      </Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Connector Plugin:</span>
                  <span className="font-mono text-foreground font-semibold">
                    {healthObj.connector_version || healthObj.connectorVersion ? `v${healthObj.connector_version || healthObj.connectorVersion}` : "Not Detected"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">WordPress / PHP:</span>
                  <span className="font-mono text-foreground font-medium">
                    {healthObj.wp_version || healthObj.wordpressVersion ? `WP ${healthObj.wp_version || healthObj.wordpressVersion}` : "WP N/A"} • {healthObj.php_version || healthObj.phpVersion ? `PHP ${healthObj.php_version || healthObj.phpVersion}` : "PHP N/A"}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-muted-foreground">Theme:</span>
                  <span className="font-semibold text-foreground">{site.themeName || "Default"}</span>
                </div>
              </CardContent>

              <div className="p-4 border-t border-border/60 bg-muted/20 rounded-b-xl flex items-center justify-between">
                <Link href={`/audits?siteId=${site.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Run Audit
                  </Button>
                </Link>
                <Link href={`/websites/${site.id}`}>
                  <Button size="sm" className="text-xs font-semibold gap-1 bg-primary text-primary-foreground">
                    Diagnostics <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        isOpen={!!deleteTargetSite}
        onClose={() => setDeleteTargetSite(null)}
        title="Confirm Website Deletion"
        description={`Are you sure you want to permanently delete "${deleteTargetSite?.name}" (${deleteTargetSite?.url})? This action cannot be undone.`}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-muted-foreground">
            Deleting this website will permanently remove its connection records and configuration from PostgreSQL.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setDeleteTargetSite(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs"
            >
              Permanently Delete Website
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Manage Keys Modal */}
      <Dialog
        isOpen={!!keysTargetSite}
        onClose={() => setKeysTargetSite(null)}
        title="Manage Connection Keys & Credentials"
        description={`Update the Platform API Key or 64-character HMAC Secret Key for "${keysTargetSite?.name}".`}
      >
        <form onSubmit={handleUpdateKeysSubmit} className="space-y-4 py-2">
          {keysError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {keysError}
            </div>
          )}

          <Input
            label="Platform API Key"
            type="password"
            placeholder="Enter new Platform API key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
          />

          <Input
            label="HMAC Secret Key"
            type="password"
            placeholder="Enter 64-character HMAC secret key"
            value={hmacSecretInput}
            onChange={(e) => setHmacSecretInput(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-border/60">
            <Button variant="outline" type="button" onClick={() => setKeysTargetSite(null)}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isUpdatingKeys}
              className="bg-primary text-primary-foreground font-semibold text-xs"
            >
              Update Credentials & Re-test
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
