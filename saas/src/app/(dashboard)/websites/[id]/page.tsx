"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Alert } from "../../../../components/ui/alert";
import { Input } from "../../../../components/ui/input";
import { Dialog } from "../../../../components/ui/dialog";
import { Spinner } from "../../../../components/ui/spinner";
import { SiteInventoryResponse } from "../../../../types/wordpress";
import {
  Server,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Database,
  Trash2,
  Key,
  AlertCircle,
  FolderTree,
  Menu as MenuIcon,
  Package,
  Palette,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function WebsiteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.id as string;

  const [site, setSite] = React.useState<any>(null);
  const [inventory, setInventory] = React.useState<SiteInventoryResponse | null>(null);
  const [inventoryError, setInventoryError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isRescanning, setIsRescanning] = React.useState(false);

  // Modals
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [showKeysModal, setShowKeysModal] = React.useState(false);
  const [apiKeyInput, setApiKeyInput] = React.useState("");
  const [hmacSecretInput, setHmacSecretInput] = React.useState("");
  const [isUpdatingKeys, setIsUpdatingKeys] = React.useState(false);
  const [keysError, setKeysError] = React.useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setInventoryError(null);

      const siteRes = await fetch(`/api/websites`);
      if (siteRes.ok) {
        const siteData = await siteRes.json();
        const found = siteData?.sites?.find((s: any) => s.id === siteId);
        if (found) {
          setSite(found);
        } else {
          setSite(null);
        }
      }

      const invRes = await fetch(`/api/websites/${siteId}/inventory`);
      if (invRes.ok) {
        const invData = await invRes.json();
        if (invData && typeof invData.site_health_score === "number") {
          setInventory(invData);
        } else if (invData?.error) {
          setInventoryError(invData.error);
          setInventory(null);
        } else {
          setInventory(null);
        }
      } else {
        const invErrData = await invRes.json().catch(() => ({}));
        setInventoryError(invErrData.error || "Sync or Authentication is required to load live inventory.");
        setInventory(null);
      }
    } catch (err) {
      console.error("Website detail fetch error:", err);
      setInventoryError("Network error fetching live inventory.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (siteId) loadData();
  }, [siteId]);

  const handleRescan = async () => {
    setIsRescanning(true);
    try {
      const revRes = await fetch(`/api/websites/${siteId}/reverify`, { method: "POST" });
      if (revRes.ok) {
        const revData = await revRes.json();
        if (revData?.site) setSite(revData.site);
      }
    } catch (e) {
      console.error("Re-verify probe error:", e);
    } finally {
      await loadData();
      setIsRescanning(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/websites/${siteId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/websites");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateKeysSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeysError(null);
    setIsUpdatingKeys(true);

    try {
      const res = await fetch(`/api/websites/${siteId}/keys`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKeyInput,
          hmacSecret: hmacSecretInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setKeysError(data.error || "Failed to update credentials.");
      } else {
        setShowKeysModal(false);
        if (data.site) setSite(data.site);
        await loadData();
      }
    } catch (err) {
      setKeysError("Network error updating credentials.");
    } finally {
      setIsUpdatingKeys(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3">
        <Spinner size="lg" />
        <span className="text-xs text-muted-foreground">Fetching website diagnostics and live telemetry...</span>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="space-y-6">
        <Link href="/websites" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Websites
        </Link>
        <Card className="p-12 text-center space-y-3">
          <h2 className="text-lg font-bold text-foreground">Website Not Found</h2>
          <p className="text-xs text-muted-foreground">The requested website record does not exist or was deleted.</p>
          <Link href="/websites">
            <Button size="sm">Return to Roster</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const healthData = site.health || {};
  const connectionState = site.connectionState || "connected_healthy";
  const seoProviderObj = site.seoProvider || {};
  const lastAuditedStr = site.lastAuditedAt ? new Date(site.lastAuditedAt).toLocaleString() : "Recently";

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Back Button & Connection Actions */}
      <div className="flex items-center justify-between">
        <Link href="/websites" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Websites
        </Link>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowKeysModal(true)} variant="outline" size="sm" className="gap-1.5 text-xs border-slate-700">
            <Key className="h-3.5 w-3.5" /> Manage Connection Keys
          </Button>
          <Button onClick={() => setShowDeleteModal(true)} variant="outline" size="sm" className="gap-1.5 text-xs text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-500/10">
            <Trash2 className="h-3.5 w-3.5" /> Delete Site
          </Button>
          <Button onClick={handleRescan} isLoading={isRescanning} size="sm" className="gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700">
            <RefreshCw className="h-3.5 w-3.5" /> Re-Verify Connection
          </Button>
        </div>
      </div>

      {/* Overview Hero Banner with Prominent Primary CTA */}
      <Card className="border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center font-black text-2xl text-primary shadow-inner shrink-0">
            {site.name.charAt(0)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-foreground tracking-tight">{site.name}</h1>
              {connectionState === "connected_healthy" && <Badge variant="success">Connected & Healthy</Badge>}
              {connectionState === "not_detected" && <Badge variant="destructive">Plugin Uninstalled / Not Found</Badge>}
              {connectionState === "paired_auth_failing" && <Badge variant="destructive">Auth Failing</Badge>}
              {connectionState === "limited_permissions" && <Badge variant="warning">Limited Permissions</Badge>}
              {connectionState === "degraded" && <Badge variant="destructive">Degraded (Offline / WAF)</Badge>}
              {connectionState === "connected_warnings" && <Badge variant="warning">Connected with Warnings</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{site.url} • Admin: {site.adminEmail || "N/A"}</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1.5">
              <Clock className="h-3.5 w-3.5 text-sky-400" />
              <span>Last Diagnostics Ping: <strong>{lastAuditedStr}</strong></span>
            </div>
          </div>
        </div>

        {/* Prominent Primary CTA Button for AI Audit Center */}
        <div className="w-full lg:w-auto flex items-center justify-end">
          <Link href={`/audits?siteId=${site.id}`} className="w-full lg:w-auto">
            <Button size="lg" className="w-full lg:w-auto font-black text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2.5 px-6 py-5 rounded-xl border border-primary-foreground/20">
              <Sparkles className="h-5 w-5 animate-pulse text-amber-300" /> Open AI Audit Center <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Connection Warning Banner */}
      {connectionState !== "connected_healthy" && healthData.errorMessage && (
        <Alert
          variant={connectionState === "limited_permissions" || connectionState === "connected_warnings" ? "warning" : "destructive"}
          title="Connection Diagnostic Warning"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
            <div>
              <p className="font-medium text-xs">
                {healthData.errorMessage}
              </p>
              {healthData.recoverySuggestion && (
                <p className="text-[11px] font-mono text-amber-200 mt-1">
                  💡 {healthData.recoverySuggestion}
                </p>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleRescan}
              isLoading={isRescanning}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shrink-0 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-Verify Connection
            </Button>
          </div>
        </Alert>
      )}

      {/* Quick Audit Summary Strip (Diagnostics Level) */}
      {inventory && typeof inventory.site_health_score === "number" ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <Card className="border-primary/40 bg-card">
            <CardContent className="p-5 text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Site Health Score</span>
              <div className="text-4xl font-black text-emerald-400 mt-2">{inventory.site_health_score}/100</div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Live Audit Metric</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Missing Meta Desc</span>
              <div className="text-4xl font-black text-foreground mt-2">{inventory.site_audit_summary?.missing_meta_descriptions_count ?? 0}</div>
              <span className="text-[10px] text-muted-foreground mt-1 block">Pages/Posts Checked</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Missing Alt Texts</span>
              <div className="text-4xl font-black text-foreground mt-2">{inventory.site_audit_summary?.missing_alt_texts_count ?? 0}</div>
              <span className="text-[10px] text-muted-foreground mt-1 block">Media Attachments</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Thin Content Pages</span>
              <div className="text-4xl font-black text-amber-400 mt-2">{inventory.site_audit_summary?.thin_content_count ?? 0}</div>
              <span className="text-[10px] text-amber-400 mt-1 block font-semibold">&lt; 300 Words</span>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
            <AlertCircle className="h-5 w-5" />
            <span>Live Inventory Telemetry Ready</span>
          </div>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {inventoryError || "Live site inventory is ready to sync. Re-verify connection to test REST API telemetry."}
          </p>
          <div className="pt-1 flex items-center justify-center gap-3">
            <Button onClick={handleRescan} isLoading={isRescanning} size="sm" className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Re-Verify Connection Telemetry
            </Button>
          </div>
        </Card>
      )}

      {/* Discovered Site Entities Overview Card */}
      {inventory && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-base flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-sky-400" /> Discovered Site Entities & Structure
            </CardTitle>
            <CardDescription className="text-xs">
              Summary of entity counts, taxonomies, navigation menus, and active theme extracted via connector.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* Custom Post Types (CPTs) */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between text-foreground font-bold">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-purple-400" /> Custom Post Types
                </span>
                <Badge variant="outline">{inventory.custom_post_types ? inventory.custom_post_types.length : 0}</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {inventory.custom_post_types && inventory.custom_post_types.length > 0
                  ? inventory.custom_post_types.map((cpt) => `${cpt.label} (${cpt.total_count})`).join(", ")
                  : "No Custom Post Types registered."}
              </p>
            </div>

            {/* Taxonomies */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between text-foreground font-bold">
                <span className="flex items-center gap-1.5">
                  <FolderTree className="h-4 w-4 text-emerald-400" /> Taxonomies
                </span>
                <Badge variant="outline">
                  {((inventory.taxonomies?.categories?.length || 0) + (inventory.taxonomies?.tags?.length || 0))} Terms
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {inventory.taxonomies?.categories ? `${inventory.taxonomies.categories.length} Categories` : "0 Categories"},{" "}
                {inventory.taxonomies?.tags ? `${inventory.taxonomies.tags.length} Tags` : "0 Tags"}
              </p>
            </div>

            {/* Navigation Menus */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between text-foreground font-bold">
                <span className="flex items-center gap-1.5">
                  <MenuIcon className="h-4 w-4 text-amber-400" /> Navigation Menus
                </span>
                <Badge variant="outline">{inventory.navigation_menus?.menus_count ?? 0} Menus</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {inventory.navigation_menus?.menus && inventory.navigation_menus.menus.length > 0
                  ? inventory.navigation_menus.menus.map((m) => `${m.name} (${m.items_count} items)`).join(", ")
                  : "No custom menus found."}
              </p>
            </div>

            {/* Active Theme Specs */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between text-foreground font-bold">
                <span className="flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-rose-400" /> Active Theme
                </span>
                <Badge variant="outline">{inventory.active_theme?.version ? `v${inventory.active_theme.version}` : "Active"}</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {inventory.active_theme?.name || site.themeName || "WordPress Theme"}
                {inventory.active_theme?.is_child_theme ? " (Child Theme)" : ""}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Diagnostics Telemetry Suite & Technical Environment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Diagnostic Checks Suite */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" /> Connector Telemetry & Health Suite
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time technical checks for REST API availability, security plugins, application passwords, and capability status.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border/60 text-xs">
              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  {connectionState !== "not_detected" ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                  Connector Plugin Installed
                </span>
                <Badge variant={connectionState !== "not_detected" ? "success" : "destructive"}>
                  {healthData.connector_version || healthData.connectorVersion ? `v${healthData.connector_version || healthData.connectorVersion}` : "Not Detected"}
                </Badge>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  {connectionState !== "degraded" && connectionState !== "not_detected" ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                  REST API Endpoint /wp-json/
                </span>
                <Badge variant={connectionState !== "degraded" && connectionState !== "not_detected" ? "success" : "destructive"}>
                  {connectionState !== "degraded" && connectionState !== "not_detected" ? "Responsive" : "Unreachable"}
                </Badge>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  {healthData.auth_header_status !== false ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                  Authorization Header Status (5-Layer Fallback)
                </span>
                <Badge variant={healthData.auth_header_status !== false ? "success" : "destructive"}>
                  {healthData.auth_header_status !== false ? "Received" : "Stripped"}
                </Badge>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  {healthData.capabilities_status !== false ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                  User Capability Verification
                </span>
                <Badge variant={healthData.capabilities_status !== false ? "success" : "destructive"}>
                  {healthData.capabilities_status !== false ? "edit_posts Active" : "Missing Caps"}
                </Badge>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" /> Database I/O Latency Test
                </span>
                <span className="font-mono font-bold text-emerald-300">
                  {healthData.database_io_test?.latency_ms ? `${healthData.database_io_test.latency_ms} ms` : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Environment Specs & Active Plugin Adapter */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-400" /> Active Plugin Adapter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-bold text-foreground">{seoProviderObj.name || "Detecting..."}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Plugin Version:</span>
                <span className="font-mono text-foreground font-semibold">{seoProviderObj.version ? `v${seoProviderObj.version}` : "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Support Level:</span>
                <Badge variant={seoProviderObj.adapterSupportLevel === "verified" ? "success" : "warning"}>
                  {seoProviderObj.adapterSupportLevel || "checking"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Auditing Plugins Badge List */}
          {inventory && inventory.active_plugins_auditing && inventory.active_plugins_auditing.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-400" /> Detected Active Plugins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {inventory.active_plugins_auditing.map((plug, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="font-medium text-foreground">{plug.name}</span>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">{plug.category}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="h-5 w-5 text-sky-400" /> Server Environment Specs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">WordPress Version:</span>
                <span className="font-mono font-semibold text-foreground">{healthData.wp_version || healthData.wordpressVersion || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">PHP Version:</span>
                <span className="font-mono font-semibold text-foreground">{healthData.php_version || healthData.phpVersion || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Filesystem Method:</span>
                <span className="font-mono text-foreground">{healthData.filesystem_write_method || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Firewall WAF:</span>
                <span className="font-mono text-amber-300">{healthData.firewall_detection || healthData.firewallDetected || "None Detected"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Website Deletion"
        description={`Are you sure you want to permanently delete "${site.name}" (${site.url})? This action cannot be undone.`}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-slate-300">
            Deleting this website will permanently remove its connection record and configuration from PostgreSQL.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="border-slate-700 text-slate-200">
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
        isOpen={showKeysModal}
        onClose={() => setShowKeysModal(false)}
        title="Manage Connection Keys & Credentials"
        description={`Update the Platform API Key or 64-character HMAC Secret Key for "${site.name}".`}
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

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="outline" type="button" onClick={() => setShowKeysModal(false)} className="border-slate-700 text-slate-200">
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
