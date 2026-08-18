"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog } from "../ui/dialog";
import { Download, Globe, Key, ShieldCheck, CheckCircle2, AlertTriangle, Loader2, Sparkles, ArrowRight, Upload } from "lucide-react";

interface ConnectWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (site: any) => void;
}

export function ConnectWebsiteModal({ isOpen, onClose, onSuccess }: ConnectWebsiteModalProps) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [siteUrl, setSiteUrl] = React.useState("https://lightpink-frog-246933.hostingersite.com");
  const [apiKey, setApiKey] = React.useState("wp_ai_live_sec_key_7749219481");
  const [hmacSecret, setHmacSecret] = React.useState("wp_ai_hmac_live_sec_9918231");
  const [siteName, setSiteName] = React.useState("My WordPress Site");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleDownloadPlugin = () => {
    window.location.href = "/api/plugin/download";
  };

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
          siteUrl,
          apiKey,
          hmacSecret,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to connect website. Make sure the wp-ai-connector plugin is activated in WordPress.");
      }

      onSuccess(data.site || data.website);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Connection failed. Please check plugin installation and keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Connect WordPress Website"
      description="Follow these 3 easy steps to pair your WordPress site with AI Assistant."
      maxWidth="lg"
    >
      {/* Step Indicator Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
        <div
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors ${
            step === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px]">
            1
          </span>
          Download Plugin
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
        <div
          onClick={() => setStep(2)}
          className={`flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors ${
            step === 2 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px]">
            2
          </span>
          Install in WordPress
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
        <div
          onClick={() => setStep(3)}
          className={`flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors ${
            step === 3 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px]">
            3
          </span>
          Pair Credentials
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 text-xs rounded-2xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: DOWNLOAD PLUGIN */}
      {step === 1 && (
        <div className="space-y-4 py-2 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                WP-AI Connector Plugin (`wp-ai-connector.zip`)
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official security connector required for HMAC-signed safe edits and live inventory auditing.
              </p>
            </div>
            <Button
              onClick={handleDownloadPlugin}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold px-4 py-2 shadow-md gap-2 shrink-0"
            >
              <Download className="h-3.5 w-3.5" /> Download ZIP
            </Button>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => setStep(2)}
              className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold px-5"
            >
              Next: Install Instructions <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: INSTALL IN WORDPRESS */}
      {step === 2 && (
        <div className="space-y-4 py-2 animate-in fade-in duration-200">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Go to WP Admin</strong>
                Log in to your WordPress admin dashboard (`your-site.com/wp-admin`).
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Upload & Activate Plugin</strong>
                Navigate to <strong>Plugins &rarr; Add New &rarr; Upload Plugin</strong>, select `wp-ai-connector.zip`, and click <strong>Activate Plugin</strong>.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Copy Plugin Keys</strong>
                Click <strong>WordPress AI</strong> in your WP Admin left menu to view your generated API Key and HMAC Secret.
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-medium"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold px-5"
            >
              Next: Enter Keys <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: PAIR CREDENTIALS */}
      {step === 3 && (
        <form onSubmit={handleConnect} className="space-y-4 py-2 animate-in fade-in duration-200">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Website Name
            </label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="e.g. My WordPress Store"
              className="rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 selection:bg-blue-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Website URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-9 rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 selection:bg-blue-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
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
                className="pl-9 rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 selection:bg-blue-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
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
                className="pl-9 rounded-xl bg-slate-50 dark:bg-[#282828] border-slate-200 dark:border-slate-700 text-sm font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 selection:bg-blue-600 selection:text-white focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="pt-3 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-medium"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold px-6 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Plugin & Connecting...
                </>
              ) : (
                "Verify & Connect Site"
              )}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
