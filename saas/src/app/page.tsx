"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog } from "../components/ui/dialog";
import {
  ShieldCheck,
  RotateCcw,
  Layers,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  FileCode2,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  Star,
  Quote,
  LayoutDashboard,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"privacy" | "terms" | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setIsLoggedIn(true);
          setUserName(data.user.name || "Agency Owner");
        }
      })
      .catch(() => {});
  }, []);

  const faqs = [
    {
      q: "How does the WordPress AI Assistant protect against broken layouts?",
      a: "Unlike generic AI models that rewrite entire post objects, our assistant uses deterministic adapters for Yoast, Rank Math, Classic Editor, and Gutenberg blocks. It calculates MD5 target checksums before execution to prevent overwriting target pages edited concurrently in wp-admin.",
    },
    {
      q: "What happens if a user rejects an AI proposal?",
      a: "Nothing is modified on your live site. Proposals remain in 'AWAITING_APPROVAL' state until explicitly confirmed or dismissed by an authorized agency administrator.",
    },
    {
      q: "Is rollback 100% complete for all WordPress actions?",
      a: "We maintain honest rollback models. Database field values (titles, meta descriptions, image alt text) are restored to exact pre-execution states. Known plugin side-effects (such as Yoast sitemap regeneration or Cloudflare cache purging) are explicitly flagged in our side-effect registry.",
    },
    {
      q: "Can I connect multiple client sites to one account?",
      a: "Yes! Our Pro Agency and Enterprise plans support multi-site agency management with team access control, tenant isolation, and centralized diagnostic monitoring.",
    },
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Head of SEO, Vance Digital",
      quote: "The checksum lock feature saved us twice when clients were editing pages in WordPress while we were approving SEO proposals. Zero accidental overwrites.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Lead WP Developer, Apex Media",
      quote: "Pre-flight diagnostics identified a stripped Authorization header on Apache before we spent hours debugging. Solved in 2 minutes with their .htaccess snippet.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Agency Founder, Chen Growth Lab",
      quote: "Having exact character reread verification and honest field-level rollback gave our agency the confidence to deploy AI content optimization across 30+ client sites.",
      rating: 5,
    },
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#diagnostics" className="hover:text-foreground transition-colors">Diagnostics</a>
            <a href="#stale-protection" className="hover:text-foreground transition-colors">Stale Protection</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Agency Reviews</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>

          {/* Desktop Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary text-primary-foreground gap-1.5 font-semibold">
                  <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Trial
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border/80 bg-card/95 backdrop-blur-2xl px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-muted-foreground">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors border-b border-border/40"
              >
                Features
              </a>
              <a
                href="#diagnostics"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors border-b border-border/40"
              >
                Diagnostics
              </a>
              <a
                href="#stale-protection"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors border-b border-border/40"
              >
                Stale Protection
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors border-b border-border/40"
              >
                Agency Reviews
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors border-b border-border/40"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-1.5 transition-colors"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full justify-center bg-primary text-primary-foreground gap-1.5 font-semibold">
                    <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full justify-center">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button className="w-full justify-center bg-primary text-primary-foreground">
                      Start Free Trial
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
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
            <Link href={isLoggedIn ? "/dashboard" : "/register"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 text-base px-8 py-6 rounded-xl">
                {isLoggedIn ? "Open Agency Dashboard" : "Audit Your First Website"} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div id="diagnostics" className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left scroll-mt-20">
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
      <section id="features" className="py-20 px-6 border-t border-border/60 bg-card/30 scroll-mt-16">
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

            <Card id="rollback" className="border-border/80 hover:border-primary/50 transition-all scroll-mt-20">
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

      {/* Interactive Stale Lock Visualizer Section */}
      <section id="stale-protection" className="py-20 px-6 border-t border-border/60 scroll-mt-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline"><Lock className="w-3.5 h-3.5 mr-1 inline" /> Checksum Security</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">Stale Target Protection in Action</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              How our 8-step safety engine blocks accidental overwrites when clients edit pages concurrently in WordPress admin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/30 bg-destructive/5 p-6 space-y-4">
              <div className="flex items-center gap-2 text-destructive font-bold text-sm">
                <X className="h-5 w-5" /> Standard Unsafe AI Plugins
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span>Blindly overwrites post meta fields without checking current state.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span>Erases client changes made in wp-admin while AI prompt was generating.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span>No verification that the database accepted the write correctly.</span>
                </li>
              </ul>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" /> WordPress AI Platform Safety Lock
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Captures exact MD5 checksum of target field at proposal creation time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Re-checks live checksum pre-execution; hard-fails safely if <strong className="text-foreground">STALE_TARGET</strong> is detected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Rereads updated value post-execution to confirm 100% exact match before marking success.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 border-t border-border/60 bg-card/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline"><Star className="w-3.5 h-3.5 mr-1 inline text-amber-400" /> Agency Feedback</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">Trusted by WordPress Agency Owners</h2>
            <p className="text-sm text-muted-foreground">Here is what leading WordPress development and SEO agencies say about our safety engine.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-border/80 bg-card/60 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="border-t border-border/40 pt-3">
                  <p className="text-xs font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-border/60 scroll-mt-16">
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 border-t border-border/60 bg-card/30 scroll-mt-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="outline"><HelpCircle className="w-3.5 h-3.5 mr-1 inline" /> FAQ</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">Everything you need to know about safety, adapters, and site connections.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-border/80 rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-primary" : ""
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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
            <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy & Terms Modal */}
      <Dialog
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={modalType === "privacy" ? "Privacy Policy & Data Security" : "Terms of Service & Usage Authority"}
      >
        <div className="space-y-4 text-xs text-muted-foreground leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {modalType === "privacy" ? (
            <>
              <p>
                <strong>Data Collection & Security:</strong> We collect non-sensitive environment diagnostics (WordPress version, PHP version, active plugins) and target content checksums to provide verified AI assistance.
              </p>
              <p>
                <strong>API Keys & Isolation:</strong> WordPress REST API credentials and Application Passwords are encrypted at rest using AES-256 and never shared with third-party sub-processors.
              </p>
              <p>
                <strong>Telemetry Privacy:</strong> Telemetry collected from your connected WordPress connector only includes execution status rates (read/write success) and side-effect registries.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Deterministic Operations:</strong> The WordPress AI Platform operates under explicit user approval controls. By approving a proposal, you authorize our platform to execute verified changes on your target site.
              </p>
              <p>
                <strong>Stale Target Locks:</strong> Our platform automatically halts execution if target content has been altered in WordPress admin after a proposal is generated.
              </p>
              <p>
                <strong>Rollback Limitations:</strong> Rollback restores database field values changed by this platform. External plugin side-effects (such as third-party cache purges or webhooks) cannot be automatically reversed.
              </p>
            </>
          )}
          <div className="pt-4 border-t border-border/60 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setModalType(null)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
