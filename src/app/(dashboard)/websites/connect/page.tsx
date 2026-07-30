"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Key,
  Server,
  Lock,
  Download,
} from "lucide-react";

export default function ConnectWebsitePage() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [siteUrl, setSiteUrl] = React.useState("https://my-wordpress-site.com");
  const [appPassword, setAppPassword] = React.useState("xxxx xxxx xxxx xxxx");
  const [isTesting, setIsTesting] = React.useState(false);
  const [testSuccess, setTestSuccess] = React.useState(false);

  const handleTestDiagnostics = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestSuccess(true);
      setStep(3);
    }, 1500);
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
        <div className={`p-2.5 rounded-xl border ${step >= 1 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
          1. Site URL
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 2 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
          2. Pair Plugin
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 3 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
          3. Pre-flight Check
        </div>
        <div className={`p-2.5 rounded-xl border ${step >= 4 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
          4. Complete
        </div>
      </div>

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
            />
            <Alert variant="info" title="Public Connector Probe">
              Our service probe will check REST availability, SSL certificate status, HTTPS enforcement, and PHP version before asking for credentials.
            </Alert>
          </CardContent>
          <CardFooter className="justify-end border-t border-border/60 pt-4">
            <Button onClick={() => setStep(2)} className="font-semibold text-xs gap-1.5">
              Next: Install Connector <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Install Connector & Credentials */}
      {step === 2 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Step 2: Connector & Application Password
            </CardTitle>
            <CardDescription className="text-xs">
              Download the lightweight helper plugin or generate a dedicated WordPress Application Password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">WordPress Connector Plugin (v1.4.2)</span>
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <Download className="h-3.5 w-3.5" /> Download .ZIP
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Install directly via wp-admin Plugins → Add New → Upload Plugin.
              </p>
            </div>

            <div className="space-y-2">
              <Input
                label="Application Password (Generated in Users -> Profile)"
                type="password"
                placeholder="xxxx xxxx xxxx xxxx"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                We recommend creating a dedicated service user with <code>edit_posts</code> and <code>edit_pages</code> capabilities.
              </p>
            </div>

            {isTesting && (
              <div className="flex items-center justify-center p-6 space-x-3 text-xs text-muted-foreground">
                <Spinner size="md" />
                <span>Testing Authorization Header, REST JSON, and Wordfence firewall response...</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between border-t border-border/60 pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleTestDiagnostics} isLoading={isTesting} className="font-semibold text-xs gap-1.5">
              Run Onboarding Diagnostics <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Diagnostic Results */}
      {step === 3 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" /> Step 3: Diagnostic Onboarding Results
            </CardTitle>
            <CardDescription className="text-xs">
              Pre-flight environment diagnostics summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Connector Detected (v1.4.2)
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> REST API Endpoint /wp-json/ Responsive
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Authorization Header Received by PHP
                </span>
                <Badge variant="success">Pass</Badge>
              </div>
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Yoast SEO v22.6 Detected (Adapter Status: Verified)
                </span>
                <Badge variant="success">Verified</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t border-border/60 pt-4">
            <Button onClick={() => setStep(4)} className="font-semibold text-xs gap-1.5">
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
            Your website is paired and healthy. You can now run SEO audits, discover ACF fields, and manage metadata safely.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Button onClick={() => router.push("/websites/site-1")} className="font-semibold">
              View Site Diagnostics
            </Button>
            <Button variant="outline" onClick={() => router.push("/audits")} className="font-semibold">
              Run Initial Audit
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
