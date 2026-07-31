# Routes Specification - WordPress AI Platform

> [!NOTE]
> This document details all application routes implemented in Next.js App Router, complete with access requirements, page file links, path parameters, and alignment with the Development Strategy Document.

---

## 1. Route Tree Overview

```
src/app/
├── page.tsx                           --> / (Public Landing Page)
├── (auth)/                            --> Unauthenticated Auth Layout Group
│   ├── login/page.tsx                --> /login
│   ├── register/page.tsx             --> /register
│   └── forgot-password/page.tsx      --> /forgot-password
└── (dashboard)/                       --> Authenticated App Shell Layout Group
    ├── layout.tsx                     --> Dashboard Layout Wrapper
    ├── dashboard/page.tsx             --> /dashboard
    ├── websites/
    │   ├── page.tsx                   --> /websites
    │   ├── connect/page.tsx           --> /websites/connect
    │   └── [id]/page.tsx              --> /websites/[id]
    ├── audits/page.tsx                --> /audits
    ├── ai-chat/page.tsx               --> /ai-chat
    ├── activity/page.tsx              --> /activity
    ├── settings/page.tsx              --> /settings
    ├── profile/page.tsx               --> /profile
    └── billing/page.tsx               --> /billing
```

---

## 2. Public & Auth Routes

### `/` - Public Landing Page
- **Page Component**: [page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/page.tsx)
- **Auth Required**: No (Public)
- **Purpose**: Brand presentation, feature introduction, live interactive diagnostic engine mock, pricing tier grid, and FAQ.
- **Key Features**:
  - Hero section with live diagnostic test input.
  - Interactive demonstration of 6 core product pillars (Diagnostics, Gutenberg/ACF Audits, Stale-Target Safeguards, SEO Adapters, Rollback, Telemetry).
  - Pricing cards (Starter, Agency, Enterprise).

### `/login` - Login Page
- **Page Component**: [(auth)/login/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/login/page.tsx)
- **Auth Required**: No (Guest only)
- **Purpose**: Agency user authentication login interface.
- **Key Features**: Zod validated email & password fields, password visibility toggle, remember-me check, link to registration and forgot password.

### `/register` - Registration Page
- **Page Component**: [(auth)/register/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/register/page.tsx)
- **Auth Required**: No (Guest only)
- **Purpose**: New user / agency onboarding account creation.
- **Key Features**: Form fields for full name, agency name, work email, password strength indicator, terms agreement.

### `/forgot-password` - Password Reset Request
- **Page Component**: [(auth)/forgot-password/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/forgot-password/page.tsx)
- **Auth Required**: No (Public)
- **Purpose**: Self-service account recovery password reset request.
- **Key Features**: Email submission with instant confirmation state and back-to-login link.

---

## 3. Authenticated Dashboard Routes

All dashboard routes are wrapped inside the [(dashboard)/layout.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/layout.tsx) shell containing the collapsible [Sidebar](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/sidebar.tsx) and header [TopNav](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx).

### `/dashboard` - Executive Dashboard Overview
- **Page Component**: [(dashboard)/dashboard/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/dashboard/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 1 & 7 (MVP Overview & Safety Net)
- **Purpose**: Central command center giving agencies high-level visibility across all connected WordPress sites.
- **Key Features**:
  - Executive stat cards (Total Sites, Health Score, Pending Proposals, Rollback Rate).
  - Quick Diagnostic Status widget showing active firewall or permission warnings.
  - Recent AI Proposal review widget with checksum status badges.
  - Audit activity stream.

### `/websites` - Connected Site Roster
- **Page Component**: [(dashboard)/websites/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 2.1 & 3 (Connection States & Adapter Support Levels)
- **Purpose**: Management roster of all connected WordPress websites.
- **Key Features**:
  - Explicit connection state badges (`connected_healthy`, `connected_warnings`, `degraded`, `paired_auth_failing`, `unsupported_version`, `detected_unpaired`, `not_detected`).
  - SEO Provider & Adapter support level indicators (`verified`, `compatible`, `read_only`, `detected_unsupported`).
  - Filter by health status, search by domain URL.
  - Action dropdowns (Run Diagnostic, View Details, Trigger Audit, Settings).

### `/websites/connect` - Diagnostic Onboarding Wizard
- **Page Component**: [(dashboard)/websites/connect/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/connect/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 2.1 (WordPress Connection and Diagnostics Workflow)
- **Purpose**: Step-by-step onboarding pipeline that diagnoses connection issues *before* granting chat access.
- **Wizard Steps**:
  1. **Site Domain**: Input target WordPress site URL and site name.
  2. **Connector Plugin Setup**: Guidelines to download and install the lightweight WordPress connector plugin.
  3. **Diagnostic Test Execution**: Executes tests for `/wp-json` accessibility, Authorization header passthrough, Application Passwords support, security firewalls (Cloudflare/Wordfence), and filesystem permissions.
  4. **Connection Verified**: Displays diagnostic status summary and transition button to dashboard.

### `/websites/[id]` - Site Detail & Diagnostic Inspection
- **Page Component**: [(dashboard)/websites/[id]/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/[id]/page.tsx)
- **Path Parameters**: `id` (e.g., `site_01`)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 2.1 & 7.1 (Detailed Environment Diagnostics)
- **Purpose**: Deep inspection hub for a single WordPress site.
- **Key Features**:
  - Detailed table of 13 explicit diagnostic checks (Public health endpoint, Authorization header, REST availability, Application Password, Cloudflare/Wordfence detection, Multisite status, Filesystem write method).
  - Actionable `.htaccess` / `wp-config.php` troubleshooting code snippets for stripped Authorization headers.
  - Capability inspection & site statistics.

### `/audits` - SEO & Content Audit Center
- **Page Component**: [(dashboard)/audits/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/audits/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 7.2 (Read-Only Website Understanding)
- **Purpose**: Auditing hub for SEO missing metadata, Gutenberg block quality, Classic Editor content, ALT text gaps, and internal link structure.
- **Key Features**:
  - Audit score gauges (Overall Health, SEO, Content Quality, Technical).
  - Filterable audit issues table with severity badges (`critical`, `warning`, `info`).
  - Slide-over [Drawer](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/drawer.tsx) for inspecting affected URLs and triggering fix proposals.

### `/ai-chat` - AI Copilot & Deterministic Execution Pipeline
- **Page Component**: [(dashboard)/ai-chat/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/ai-chat/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 5, 9, 10 (Concurrency, Stale Approval, & 20-State Execution Engine)
- **Purpose**: Conversational AI assistant for requesting website optimization proposals with strict approval gates.
- **Key Features**:
  - Target site context selector.
  - Live Search Result (SERP) snippet preview (Google desktop search simulation).
  - Explicit side-effect disclosure panel (e.g., sitemap regeneration, cache purging).
  - Interactive Checksum Approval Modal enforcing checksum comparison to prevent overwriting stale targets.

### `/activity` - Verified Activity Trail & Honest Rollback
- **Page Component**: [(dashboard)/activity/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/activity/page.tsx)
- **Auth Required**: Yes
- **Strategy Authority Section**: Section 6 & 10 (Honest Rollback Model & Execution Results)
- **Purpose**: Complete audit trail of all platform executions with field-level rollback triggers.
- **Key Features**:
  - Table of historical executions displaying execution state, verification status (`verified_exact_match`), and rollback confidence (`full`, `partial`, `non_reversible`).
  - Field-level snapshot comparison modal showing pre-execution values vs applied values.
  - "Trigger 1-Click Rollback" action with confidence level warnings.

### `/settings` - Workspace & API Configuration
- **Page Component**: [(dashboard)/settings/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/settings/page.tsx)
- **Auth Required**: Yes
- **Purpose**: Agency-level settings, audit automation frequencies, notification webhooks, and OpenAI API key management.

### `/profile` - Account & Security Settings
- **Page Component**: [(dashboard)/profile/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/profile/page.tsx)
- **Auth Required**: Yes
- **Purpose**: Individual user profile editing, password changes, and 2FA settings.

### `/billing` - Usage & Subscription Management
- **Page Component**: [(dashboard)/billing/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/billing/page.tsx)
- **Auth Required**: Yes
- **Purpose**: Plan tier status (Starter / Agency / Enterprise), connected site usage counters, billing history, and PDF invoice downloads.
