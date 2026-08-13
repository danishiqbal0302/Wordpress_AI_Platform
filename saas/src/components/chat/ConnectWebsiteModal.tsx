"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog } from "../ui/dialog";
import { Globe, Key, ShieldCheck, Loader2 } from "lucide-react";

interface ConnectWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (site: any) => void;
}

export function ConnectWebsiteModal({ isOpen, onClose, onSuccess }: ConnectWebsiteModalProps) {
  const [siteUrl, setSiteUrl] = React.useState("https://lightpink-frog-246933.hostingersite.com");
  const [apiKey, setApiKey] = React.useState("wp_ai_live_sec_key_7749219481");
  const [hmacSecret, setHmacSecret] = React.useState("wp_ai_hmac_live_sec_9918231");
  const [siteName, setSiteName] = React.useState("My WordPress Site");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/websites/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: siteName || "My WordPress Site",
          url: siteUrl,
          apiKey,
          hmacSecret,
          adminEmail: "admin@example.com",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to connect website");
      }

      const data = await res.json();
      onSuccess(data.site || data.website);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Connection failed. Please check plugin keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Connect WordPress Website"
      description="Connect your site using your WP-AI Connector plugin keys to enable real-time AI optimizations and 1-click safe edits."
    >
      {errorMsg && (
        <div className="p-3 text-xs rounded-xl bg-red-950/60 text-red-300 border border-red-800 mb-3">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleConnect} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Website Name
          </label>
          <Input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g. My WordPress Store"
            className="rounded-xl bg-slate-800 border-slate-700 text-sm"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="pl-9 rounded-xl bg-slate-800 border-slate-700 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Plugin API Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="wp_ai_live_sec_key_..."
              className="pl-9 rounded-xl bg-slate-800 border-slate-700 text-sm font-mono text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            HMAC Secret Key
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={hmacSecret}
              onChange={(e) => setHmacSecret(e.target.value)}
              placeholder="wp_ai_hmac_live_sec_..."
              className="pl-9 rounded-xl bg-slate-800 border-slate-700 text-sm font-mono text-xs"
              required
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-slate-700 text-slate-300 text-xs font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-semibold px-5"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Website"
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
