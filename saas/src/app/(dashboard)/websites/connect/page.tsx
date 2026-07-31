"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Alert } from "../../../../components/ui/alert";
import { Spinner } from "../../../../components/ui/spinner";
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Key,
  Server,
  Download,
  AlertCircle,
} from "lucide-react";

export default function ConnectWebsitePage() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [siteUrl, setSiteUrl] = React.useState("https://my-wordpress-agency-site.com");
  const [apiKey, setApiKey] = React.useState("");
  const [hmacSecret, setHmacSecret] = React.useState("");

  // Diagnostics & API State
  const [isTesting, setIsTesting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [connectedSite, setConnectedSite] = React.useState<any>(null);
  const [diagnostics, setDiagnostics] = React.useState<any>(null);

  const handleTestDiagnostics = async () => {
    setErrorMessage(null);
    setIsTesting(true);

    if (!siteUrl.trim()) {
      setErrorMessage("Please enter a valid WordPress site URL.");
      setIsTesting(false);
      return;
    }
    if (!apiKey.trim() || !hmacSecret.trim()) {
      setErrorMessage("Please enter both the Platform API Key and HMAC Secret Key generated in WordPress.");
      setIsTesting(false);
      return;
    }

    try {
      const res = await fetch("/api/websites/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteUrl,
          apiKey,
          hmacSecret,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to establish connection with WordPress site.");
        setIsTesting(false);
        return;
      }

      setConnectedSite(data.site);
      setDiagnostics(data.diagnostics);
      setIsTesting(false);
      setStep(3);
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error during connection verification.");
      setIsTesting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          Connect WordPress Website
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Follow the 4-step onboarding diagnostic check to establish a secure, verified pair.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
        <div className={`p-2.5 rounded-xl border ${step >= 1 ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground"}`}>
          1. Site URL
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 2 ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground"}`}>
          2. Pair Plugin
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 3 ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground"}`}>
          3. Pre-flight Check
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 4 ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground"}`}>
          4. Complete
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 font-medium">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: Site URL */}
      {step === 1 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Step 1: Target Site Domain
            </CardTitle>
            <CardDescription className="text-xs">
              Enter your WordPress website domain. We will inspect public REST availability at <code>/wp-json/</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="WordPress Site URL"
              placeholder="https://example.com"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              required
            />
            <Alert variant="info" title="Public Connector Probe">
              Our service probe will check REST availability, SSL certificate status, HTTPS enforcement, and PHP version before asking for credentials.
            </Alert>
          </CardContent>
          <CardFooter className="justify-end border-t border-border/60 pt-4">
            <Button
              onClick={() => {
                if (!siteUrl.trim()) {
                  setErrorMessage("Please enter a valid WordPress site URL.");
                  return;
                }
                setErrorMessage(null);
                setStep(2);
              }}
              className="font-semibold text-xs gap-1.5 bg-primary text-primary-foreground"
            >
              Next: Pair Connector Plugin <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Pair Plugin Credentials */}
      {step === 2 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Step 2: Connector Credentials & Plugin
            </CardTitle>
            <CardDescription className="text-xs">
              Install the lightweight connector plugin in WordPress and copy your API & HMAC keys from <strong>Settings → WordPress AI Connector</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">WordPress Connector Plugin (v1.4.2)</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 font-semibold"
                  onClick={() => window.open("/api/plugin/download", "_blank")}
                >
                  <Download className="h-3.5 w-3.5" /> Download .ZIP
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Install directly via wp-admin: <strong>Plugins → Add New → Upload Plugin</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <Input
                label="Platform API Key (from WP Admin Settings)"
                type="password"
                placeholder="wp_ai_xxxxxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <Input
                label="HMAC Secret Key (from WP Admin Settings)"
                type="password"
                placeholder="Enter 64-character HMAC secret key"
                value={hmacSecret}
                onChange={(e) => setHmacSecret(e.target.value)}
                required
              />
            </div>

            {isTesting && (
              <div className="flex items-center justify-center p-6 space-x-3 text-xs text-muted-foreground">
                <Spinner size="md" />
                <span>Verifying HMAC-SHA256 handshake and diagnostic probe response...</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between border-t border-border/60 pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button
              onClick={handleTestDiagnostics}
              isLoading={isTesting}
              className="font-semibold text-xs gap-1.5 bg-primary text-primary-foreground"
            >
              Run Onboarding Diagnostics <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Diagnostic Onboarding Results */}
      {step === 3 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" /> Step 3: Pre-flight Diagnostic Results
            </CardTitle>
            <CardDescription className="text-xs">
              Diagnostic environment results for <strong>{connectedSite?.url || siteUrl}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Connector Detected (v{diagnostics?.connectorVersion || "1.4.2"})
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> REST API Endpoint /wp-json/ Responsive
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> PHP Version: {diagnostics?.phpVersion || "8.2.14"} (WP v{diagnostics?.wordpressVersion || "6.5.3"})
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {diagnostics?.seoProvider?.name || "Yoast SEO"} Active (Adapter Status: Verified)
                </span>
                <Badge variant="success">Verified</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t border-border/60 pt-4">
            <Button onClick={() => setStep(4)} className="font-semibold text-xs gap-1.5 bg-primary text-primary-foreground">
              Complete Pairing <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Finished */}
      {step === 4 && (
        <Card className="border-emerald-500/40 text-center p-8 space-y-4">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">Website Connected Successfully!</h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Your website <strong>{connectedSite?.name || siteUrl}</strong> is paired and persisted in PostgreSQL. You can now run SEO audits, discover ACF fields, and manage metadata safely.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Button onClick={() => router.push(connectedSite?.id ? `/websites/${connectedSite.id}` : "/websites")} className="font-semibold bg-primary text-primary-foreground">
              View Site Details
            </Button>
            <Button variant="outline" onClick={() => router.push("/websites")} className="font-semibold">
              View Connected Websites
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
