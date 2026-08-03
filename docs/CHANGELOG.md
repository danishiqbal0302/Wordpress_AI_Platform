# Changelog - WordPress AI Platform

All notable changes to the **WordPress AI Platform** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2026-08-03

### Added & Enhanced
- **Real-Time Connection Lifecycle Management**:
  - Implemented `probeSiteConnection` classifier in [diagnostics.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/lib/diagnostics.ts) supporting 8 connection states: `not_detected`, `detected_unpaired`, `paired_auth_failing`, `limited_permissions`, `connected_healthy`, `connected_warnings`, `degraded`, `unsupported_version`.
  - Created `POST /api/websites/[id]/reverify` endpoint in [reverify/route.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/api/websites/[id]/reverify/route.ts) to execute on-demand live probes against `/wp-json/wp-ai/v1/health`.
  - Handled 8 critical connection lifecycle failure scenarios:
    1. **Plugin Uninstalled**: Detects 404 response on `/wp-json/wp-ai/v1/health` and sets `not_detected` status with plugin re-installation guidance.
    2. **Plugin Disabled**: Flags disabled REST routes and suggests permalink/plugin activation.
    3. **Website Offline / DNS Error**: Captures network connection failures/timeouts and transitions status to `degraded`.
    4. **REST API Unavailable**: Detects non-JSON or disabled REST responses.
    5. **Invalid API Key / HMAC Secret**: Catches authentication failures.
    6. **Firewall / WAF Block**: Detects HTTP 403/406/429 Cloudflare/Wordfence blocks and provides IP whitelist advice.
    7. **Connection Timeout**: Enforces 3500ms timeout controller and flags latency bottlenecks.
    8. **Connection Restored**: Automatically recovers status to `connected_healthy` when live probe passes.
  - **Preserves Website Records**: Ensures site records, history, and audit trails are never automatically deleted when connection degrades.

- **Frontend Diagnostic & Lifecycle UI**:
  - Updated [websites/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/(dashboard)/websites/page.tsx) with live connection status badges, error diagnostic callouts, and an interactive "Re-Verify" button for each site.
  - Updated [websites/[id]/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/(dashboard)/websites/[id]/page.tsx) to render real-time health probe results, recovery code snippets (`.htaccess` / WAF rules), and instant diagnostic re-verification.

---

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
  - Built 16 custom HSL glassmorphism UI components.
