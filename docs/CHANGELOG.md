# Changelog - WordPress AI Platform

All notable changes to the **WordPress AI Platform** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2026-07-31

### Added & Refactored
- **WordPress AI Platform Connector Plugin (PHP)**:
  - Created [wp-ai-connector.php](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/wordpress-plugin/wp-ai-connector/wp-ai-connector.php) with activation hooks and WP Admin credentials settings page.
  - Implemented HMAC-SHA256 middleware in [class-wp-ai-security.php](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/wordpress-plugin/wp-ai-connector/includes/class-wp-ai-security.php) (300s timestamp expiration, timing-attack safe `hash_equals`).
  - Added diagnostic endpoint `GET /wp-json/wp-ai/v1/health` in [class-wp-ai-health.php](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/wordpress-plugin/wp-ai-connector/includes/class-wp-ai-health.php).
  - Added execution endpoint `POST /wp-json/wp-ai/v1/execute` in [class-wp-ai-executor.php](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/wordpress-plugin/wp-ai-connector/includes/class-wp-ai-executor.php) enforcing pre-execution checksum verification (`target_checksum`) and saving snapshot history to `wp_options`.
  - Added rollback endpoint `POST /wp-json/wp-ai/v1/rollback` in [class-wp-ai-rollback.php](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/wordpress-plugin/wp-ai-connector/includes/class-wp-ai-rollback.php).

- **Next.js ZIP Packaging & Frontend Download Button**:
  - Created `GET /api/plugin/download` endpoint in [route.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/api/plugin/download/route.ts) using `archiver` to generate in-memory `.zip` archive.
  - Connected "Download .ZIP" button on [connect/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/%28dashboard%29/websites/connect/page.tsx) to trigger automatic file downloads.

---

## [0.1.2] - 2026-07-31

### Added & Refactored
- **Professional Forgot Password Experience**:
  - Expiration window configured to 15 minutes in PostgreSQL database.
  - Implemented 60-second interactive cooldown timer for Resend Code button.
  - Added live password complexity checklist for setting new passwords.
  - Removed auto-filling code in UI; reset input fields start clean and empty.

- **Avatar Selection Modal & In-Dashboard Password Change**:
  - Built Avatar Selection Modal in [profile/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/(dashboard)/profile/page.tsx) with 6 theme presets saving directly to PostgreSQL `User.avatar`.
  - Built `POST /api/users/change-password` endpoint allowing users to update their password from the dashboard.

- **PostgreSQL Settings & Hero Cleanup**:
  - Connected workspace settings page to PostgreSQL user preferences (`agencyName`, `auditSchedule`, `staleProtection`, `autoPurgeCache`).
  - Removed "Explore Demo Dashboard" button from landing page hero section.

---

## [0.1.1] - 2026-07-30

### Added
- **Responsive Mobile Navigation**:
  - Implemented responsive mobile drawer menu in [page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/page.tsx) with hamburger toggle (`Menu`/`X` icons) for mobile viewports.
  - Implemented responsive mobile sidebar drawer in [sidebar.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/sidebar.tsx) with backdrop overlay and slide-in drawer transition.
  - Added mobile menu trigger button to [top-nav.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx) and mobile sidebar state to [layout.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/layout.tsx).

### Fixed & Improved
- **Functional Header & Footer Links**:
  - Added smooth anchor scrolling targets (`#features`, `#diagnostics`, `#rollback`, `#pricing`, `#faq`) in [page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/page.tsx).
  - Added an interactive Accordion FAQ section (`#faq`) on the landing page.
  - Made Privacy Policy and Terms of Service footer links functional via interactive modal dialogs.

---

## [0.1.0] - 2026-07-30

### Added
- **Permanent Memory Documentation Suite**:
  - Created `docs/` folder containing persistent documentation aligned with the highest authority document ([Revised WordPress AI Platform Development Strategy](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/PROJECT_LOG.md)):
    - [PROJECT_INDEX.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/PROJECT_INDEX.md)
    - [FILE_INDEX.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/FILE_INDEX.md)
    - [COMPONENT_MAP.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/COMPONENT_MAP.md)
    - [ROUTES.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/ROUTES.md)
    - [ARCHITECTURE.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/ARCHITECTURE.md)
    - [CHANGELOG.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/CHANGELOG.md)

- **Domain Data Models & Types (`src/types/`)**:
  - Implemented [wordpress.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/wordpress.ts): `ConnectionState` (8 explicit states), `AdapterSupportLevel` (5 levels), `ExecutionState` (20 state lifecycle), `WordPressHealthDiagnostic` (13 health checks), `SEOProviderInfo`, `WordPressSite`, `ActionProposal`.
  - Implemented [audit.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/audit.ts): `AuditIssue`, `SiteAuditSummary`, severity levels (`critical`, `warning`, `info`).
  - Implemented [activity.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/activity.ts): `ActionLogItem`, snapshot comparison structures, rollback confidence levels.

- **Design System & UI Primitives (`src/components/ui/`)**:
  - Built 16 custom HSL glassmorphism UI components: [Alert](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/alert.tsx), [Badge](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/badge.tsx), [Button](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/button.tsx), [Card](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/card.tsx), [Checkbox](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/checkbox.tsx), [Dialog](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dialog.tsx), [Drawer](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/drawer.tsx), [Dropdown](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dropdown.tsx), [EmptyState](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/empty-state.tsx), [Input](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/input.tsx), [Pagination](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/pagination.tsx), [SearchInput](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/search.tsx), [Select](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/select.tsx), [Spinner](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/spinner.tsx), [Table](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/table.tsx), [Textarea](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/textarea.tsx).

- **Layout Components (`src/components/layout/`)**:
  - Implemented [Sidebar](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/sidebar.tsx): Collapsible navigation drawer with active route highlighting and health state indicators.
  - Implemented [TopNav](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx): Top header with site selector dropdown, search bar, notifications, and user menu trigger.
  - Implemented [UserMenu](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/user-menu.tsx): User profile popover menu.

- **Complete Route Architecture (15 Pages)**:
  - Landing Page (`/`): Product overview, live interactive diagnostic engine mock, pricing plans, FAQ.
  - Auth Pages (`/login`, `/register`, `/forgot-password`): Authentication forms with Zod validation.
  - Dashboard Hub (`/dashboard`): Executive overview, stat cards, pending proposals, audit activity stream.
  - Site Management (`/websites`, `/websites/connect`, `/websites/[id]`): Site roster, 4-step diagnostic wizard, 13 health checks inspection table, `.htaccess` resolution guide.
  - Audit Center (`/audits`): SEO and content quality audit hub with score gauges and issue drawer.
  - AI Copilot (`/ai-chat`): Conversational proposal assistant with SERP search preview and Checksum Approval Modal.
  - Activity & Rollback (`/activity`): Activity log, field snapshot comparison, and 1-click rollback execution.
  - Settings & Profile (`/settings`, `/profile`, `/billing`): Agency preferences, API keys, subscription management.

- **Mock Data Store (`src/mock/data.ts`)**:
  - Comprehensive dataset providing realistic test data for connected sites, health diagnostics, pending proposals with checksums, audit issues, and activity trails.

### Fixed
- **Root Layout & Tailwind v4 Integration**:
  - Resolved missing root `layout.tsx` issue.
  - Configured `@tailwindcss/postcss` in [postcss.config.mjs](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/postcss.config.mjs) for Tailwind CSS v4 compatibility.
  - Clean TypeScript compilation (`npm run build`) passing all 15 static/dynamic routes.
