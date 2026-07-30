import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Zap,
  RotateCcw,
  Layers,
  Lock,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  FileCode2,
  Activity,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              WordPress <span className="gradient-text">AI</span> Platform
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#diagnostics" className="hover:text-foreground transition-colors">Diagnostics</a>
            <a href="#rollback" className="hover:text-foreground transition-colors">Rollback Guarantee</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <Badge variant="wp" className="py-1 px-4 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> Verified WordPress AI Assistant
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15]">
            Audit WordPress. Optimize Content. <br />
            <span className="gradient-text">Zero Unintended Side Effects.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
            The first AI optimization assistant engineered specifically for WordPress agencies. Connect safely, audit SEO & ACF metadata, detect stale conflicts, and apply <strong>checksum-verified</strong> updates with honest rollback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 text-base px-8 py-6 rounded-xl">
                Audit Your First Website <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl border-border/80">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md">
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-xs text-muted-foreground">Checksum Conflict Lock</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md">
              <div className="text-2xl font-bold text-foreground">14+ Point</div>
              <div className="text-xs text-muted-foreground">Diagnostic Server Health</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md">
              <div className="text-2xl font-bold text-emerald-400">Verified</div>
              <div className="text-xs text-muted-foreground">Yoast & RankMath Adapters</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md">
              <div className="text-2xl font-bold text-foreground">Honest</div>
              <div className="text-xs text-muted-foreground">Field-Level Rollback Model</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section id="features" className="py-20 px-6 border-t border-border/60 bg-card/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline">Engineered for Trust</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">Built as 5 Products, Not One Integration</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Most plugins break sites by guessing database keys. We maintain contract-tested adapters, pre-flight diagnostics, and deterministic verification.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                  <Server className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">1. Detailed Diagnostics</CardTitle>
                <CardDescription className="text-xs">
                  Pinpoint stripped auth headers, Wordfence blocks, Cloudflare WAF restrictions, and application password issues before entering the chat interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                  <Layers className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">2. Tested Plugin Adapters</CardTitle>
                <CardDescription className="text-xs">
                  We never guess raw meta keys. Every write operation targets explicitly verified versions of Yoast SEO, Rank Math, and ACF text fields.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">3. Stale Target Protection</CardTitle>
                <CardDescription className="text-xs">
                  Actions capture target field checksums at proposal time. If a user edits the page in wp-admin before approval, the action hard-fails safely.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">4. Honest Rollback</CardTitle>
                <CardDescription className="text-xs">
                  Clear side-effect registries. We restore changed field values and explain what plugin side-effects (e.g. sitemap regeneration) cannot be undone.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">5. Post-Write Verification</CardTitle>
                <CardDescription className="text-xs">
                  An update is only marked successful after our connector rereads the saved value from WordPress and verifies exact character match.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/80 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                  <FileCode2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">6. Gutenberg & ACF Inspection</CardTitle>
                <CardDescription className="text-xs">
                  Parse structured Gutenberg blocks and discover basic ACF fields safely without breaking page layout structure or raw shortcodes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-border/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline">Transparent Plans</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">Flexible SaaS Pricing</h2>
            <p className="text-sm text-muted-foreground">Scale from single site management to multi-client agency management.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <Card className="border-border p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">Starter</h3>
                <p className="text-xs text-muted-foreground mt-1">Perfect for single website owners.</p>
                <div className="text-3xl font-black mt-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-3 text-xs text-muted-foreground mt-6">
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 1 Connected WordPress Site</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Daily Automated SEO Audits</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Yoast & RankMath Read/Write</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Checksum Stale Target Locks</li>
                </ul>
              </div>
              <Link href="/register"><Button variant="outline" className="w-full">Get Started</Button></Link>
            </Card>

            {/* Pro Agency */}
            <Card className="border-primary p-6 space-y-6 flex flex-col justify-between relative shadow-xl shadow-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </div>
              <div>
                <h3 className="text-lg font-bold">Pro Agency</h3>
                <p className="text-xs text-muted-foreground mt-1">For growing web development agencies.</p>
                <div className="text-3xl font-black mt-4">$79<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-3 text-xs text-muted-foreground mt-6">
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Up to 10 WordPress Sites</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Full Diagnostics & Health Suite</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Gutenberg & ACF Field Support</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verification & Rollback Log</li>
                </ul>
              </div>
              <Link href="/register"><Button className="w-full">Start 14-Day Trial</Button></Link>
            </Card>

            {/* Enterprise */}
            <Card className="border-border p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">Enterprise</h3>
                <p className="text-xs text-muted-foreground mt-1">Unlimited sites & custom SLAs.</p>
                <div className="text-3xl font-black mt-4">$199<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-3 text-xs text-muted-foreground mt-6">
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Unlimited Connected Sites</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Custom Adapter Environments</li>
                  <li className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Priority Support & Audit Log Export</li>
                </ul>
              </div>
              <Link href="/register"><Button variant="outline" className="w-full">Contact Sales</Button></Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>WordPress AI Platform © 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-foreground">Login</Link>
            <Link href="/register" className="hover:text-foreground">Register</Link>
            <a href="#privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
