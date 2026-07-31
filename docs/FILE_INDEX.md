# File Index - WordPress AI Platform

> [!NOTE]
> This index tracks all files in the **WordPress AI Platform** repository. Each entry provides absolute file links, purpose descriptions, and module mappings.

---

## 1. Application Root & Configuration

| File Path | Description | Key Responsibilities |
| :--- | :--- | :--- |
| [package.json](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/package.json) | Package Manifest | Manages dependencies (`next`, `react`, `@tanstack/react-query`, `zod`, `tailwind-merge`) and scripts. |
| [tsconfig.json](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/tsconfig.json) | TypeScript Configuration | Configures strict type-checking options and path aliases (`@/*`). |
| [tailwind.config.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/tailwind.config.ts) | Tailwind CSS Setup | Theme configurations, HSL color tokens, animations, and typography styles. |
| [postcss.config.mjs](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/postcss.config.mjs) | PostCSS Configuration | Connects `@tailwindcss/postcss` plugin for Next.js build compilation. |
| [.gitignore](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/.gitignore) | Git Exclusion File | Excludes `node_modules`, `.next`, environment files, and internal `PROJECT_LOG.md`. |
| [PROJECT_LOG.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/PROJECT_LOG.md) | Initial Execution Log | Record of foundational setup, Tailwind v4 fixes, and initial route deployments. |

---

## 2. App Router Pages & Layouts (`src/app/`)

### Core Layouts & Public Pages

| File Path | Component / Function | Purpose |
| :--- | :--- | :--- |
| [layout.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/layout.tsx) | `RootLayout` | HTML document shell, font loading (`Inter`), metadata, and provider wrapping. |
| [globals.css](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/globals.css) | Global Stylesheet | CSS variables for HSL color system, glassmorphism utilities, and scrollbar styling. |
| [providers.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/providers.tsx) | `AppProviders` | React Query Client (`QueryClientProvider`) wrapper for application state. |
| [page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/page.tsx) | `LandingPage` | Public marketing landing page featuring 6 product pillars, diagnostic engine preview, pricing, and FAQ. |

### Auth Route Group (`src/app/(auth)/`)

| File Path | Route | Purpose |
| :--- | :--- | :--- |
| [login/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/login/page.tsx) | `/login` | User authentication form with Zod schema validation and password toggle. |
| [register/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/register/page.tsx) | `/register` | Account registration form with terms acceptance and password confirmation. |
| [forgot-password/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/forgot-password/page.tsx) | `/forgot-password` | Password reset request form with email verification feedback. |

### Dashboard Route Group (`src/app/(dashboard)/`)

| File Path | Route | Purpose |
| :--- | :--- | :--- |
| [layout.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/layout.tsx) | `DashboardLayout` | Authenticated dashboard shell containing `Sidebar`, `TopNav`, and main content area. |
| [dashboard/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/dashboard/page.tsx) | `/dashboard` | Executive overview with metric cards, pending proposals, audit summaries, and diagnostic highlights. |
| [websites/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/page.tsx) | `/websites` | Connected WordPress site roster displaying health states, SEO adapters, and quick actions. |
| [websites/connect/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/connect/page.tsx) | `/websites/connect` | 4-Step diagnostic onboarding wizard (URL, plugin pairing, REST/Auth tests, complete). |
| [websites/[id]/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/websites/[id]/page.tsx) | `/websites/[id]` | Site diagnostic hub with 13 health checks, `.htaccess` resolution guide, and capability inspector. |
| [audits/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/audits/page.tsx) | `/audits` | SEO & Content Audit Center featuring health score gauges, category filters, and proposal triggers. |
| [ai-chat/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/ai-chat/page.tsx) | `/ai-chat` | Interactive AI Copilot chat interface with search result preview, side-effect disclosures, and checksum verification modal. |
| [activity/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/activity/page.tsx) | `/activity` | Audit trail and activity log with field-level snapshot comparison and honest rollback dialog. |
| [settings/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/settings/page.tsx) | `/settings` | Agency workspace preferences, audit execution schedule, and API key management. |
| [profile/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/profile/page.tsx) | `/profile` | User profile details, security settings, and notification preferences. |
| [billing/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/billing/page.tsx) | `/billing` | Subscription plan management, usage limits, payment methods, and invoice downloads. |

---

## 3. UI Components & Layout Systems (`src/components/`)

### Layout Components (`src/components/layout/`)

| File Path | Component Name | Key Features |
| :--- | :--- | :--- |
| [sidebar.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/sidebar.tsx) | `Sidebar` | Collapsible navigation drawer with active route highlighting, agency switcher, and connection badges. |
| [top-nav.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx) | `TopNav` | Header bar featuring site context selector, search bar, notification dropdown, and user menu trigger. |
| [user-menu.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/user-menu.tsx) | `UserMenu` | User profile dropdown with quick links to profile, billing, settings, and sign-out action. |

### UI Primitives (`src/components/ui/`)

| File Path | Component Name | Exported Elements |
| :--- | :--- | :--- |
| [alert.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/alert.tsx) | `Alert` | `Alert`, `AlertTitle`, `AlertDescription` (info, success, warning, error variants). |
| [badge.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/badge.tsx) | `Badge` | `Badge` (default, secondary, outline, success, warning, danger variants). |
| [button.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/button.tsx) | `Button` | `Button` (default, primary, secondary, danger, ghost, link variants, with loading state). |
| [card.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/card.tsx) | `Card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. |
| [checkbox.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/checkbox.tsx) | `Checkbox` | Custom styled accessible checkbox input with label and helper text. |
| [dialog.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dialog.tsx) | `Dialog` | `Dialog`, `DialogHeader`, `DialogTitle`, `DialogContent`, `DialogFooter` modal overlay. |
| [drawer.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/drawer.tsx) | `Drawer` | `Drawer` side slide-over panel for quick detail inspections. |
| [dropdown.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dropdown.tsx) | `Dropdown` | Interactive popover menu with trigger, item lists, and divider lines. |
| [empty-state.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/empty-state.tsx) | `EmptyState` | Empty state placeholder layout with icon, title, description, and action button. |
| [input.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/input.tsx) | `Input` | Styled text input with optional prefix/suffix icons, error messages, and helper text. |
| [pagination.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/pagination.tsx) | `Pagination` | Page navigation controls with page numbers, previous/next triggers, and total counts. |
| [search.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/search.tsx) | `SearchInput` | Debounced search bar input with clear button and magnifying icon. |
| [select.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/select.tsx) | `Select` | Form dropdown select control with label, helper text, and error states. |
| [spinner.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/spinner.tsx) | `Spinner` | Animated loading spinner with size and color options. |
| [table.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/table.tsx) | `Table` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`. |
| [textarea.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/textarea.tsx) | `Textarea` | Multi-line text field control with resize options and character counts. |

---

## 4. Types, Utilities & Mock Data

| File Path | Module Name | Purpose & Content |
| :--- | :--- | :--- |
| [wordpress.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/wordpress.ts) | WordPress Types | Core TypeScript definitions for `ConnectionState`, `AdapterSupportLevel`, `ExecutionState`, `WordPressHealthDiagnostic`, `WordPressSite`, and `ActionProposal`. |
| [audit.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/audit.ts) | Audit Types | Type interfaces for `AuditIssue`, `SiteAuditSummary`, and severity classifications. |
| [activity.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/activity.ts) | Activity Types | Type interfaces for `ActionLogItem`, snapshot comparison structures, and rollback status types. |
| [data.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/mock/data.ts) | Mock Data Store | Comprehensive mock dataset simulating connected WordPress sites, health diagnostics, pending proposals, audit results, and activity trails. |
| [utils.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/lib/utils.ts) | Utility Helpers | Helper functions including `cn()` (Tailwind class merging via `clsx` and `tailwind-merge`). |
