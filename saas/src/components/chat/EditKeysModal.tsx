"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog } from "../ui/dialog";
import { Key, ShieldCheck, Globe, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface EditKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: any | null;
  onSuccess: (updatedSite: any) => void;
}

export function EditKeysModal({ isOpen, onClose, site, onSuccess }: EditKeysModalProps) {
  const [apiKey, setApiKey] = React.useState("");
  const [hmacSecret, setHmacSecret] = React.useState("");
  const [siteName, setSiteName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (site) {
      setApiKey(site.apiKey || "");
      setHmacSecret(site.hmacSecret || "");
      setSiteName(site.name || "");
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [site]);

  const handleUpdateKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!site?.id) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/websites/${site.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          apiKey,
          hmacSecret,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update connection keys.");
      }

      setSuccessMsg(data.message || "Keys verified and updated successfully!");
      onSuccess(data.site);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to verify updated keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Connection Keys"
      description={`Update API and HMAC keys for "${site?.name || "Website"}" (${site?.url || ""}).`}
    >
      {errorMsg && (
        <div className="p-3 text-xs rounded-2xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 text-xs rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleUpdateKeys} className="space-y-4 pt-1">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Website Name
          </label>
          <Input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Site Title"
            className="rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 selection:bg-indigo-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Plugin API Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="wp_ai_live_sec_key_..."
              className="pl-9 rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 selection:bg-indigo-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            HMAC Secret Key
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={hmacSecret}
              onChange={(e) => setHmacSecret(e.target.value)}
              placeholder="wp_ai_hmac_live_sec_..."
              className="pl-9 rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 selection:bg-indigo-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold px-5 shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying & Saving...
              </>
            ) : (
              "Verify & Save Keys"
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
