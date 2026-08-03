# Changelog: WordPress AI Platform

## [1.4.2] - 2026-08-03

### Added
- **Production-Grade Modular Auditing Framework**:
  - Implemented `WP_AI_Audit_Rule` base class, `WP_AI_Audit_Finding` DTO, and modular evaluator rules (`SEO_001`, `SEO_002`, `CONTENT_001`, `MEDIA_001`, `TECH_001`) in `wordpress-plugin/wp-ai-connector/includes/audits/`.
  - Implemented `WP_AI_Scoring_Config` and `WP_AI_Scoring_Engine` for centralized category weighting (SEO 35%, Content 30%, Media 20%, Technical 15%) and explainable score deduction itemization.
  - Implemented `WP_AI_Audit_Engine` core registry and filter `wp_ai_register_audit_rules` for seamless rule extensibility.
  - Created `docs/AUDIT_FRAMEWORK.md` and updated `docs/ARCHITECTURE.md` to document the rule-based audit architecture and scoring methodology.
  - Updated SaaS TypeScript types in `saas/src/types/wordpress.ts` and UI in `saas/src/app/(dashboard)/audits/page.tsx`.

### Fixed
- **SEO Provider Live Detection**:
  - Fixed `class-wp-ai-health.php` and `class-wp-ai-inventory.php` in the PHP connector plugin to inspect the WordPress active plugins list (`get_option('active_plugins')`) rather than relying solely on global constants. Deactivating an SEO plugin (such as Yoast SEO) immediately updates detected provider to `None / Custom` (`Core`, `read_only`).
  - Updated `/api/websites/[id]/reverify` and `/api/websites/[id]/inventory` Next.js backend proxy endpoints to overwrite `wordPressSite.seoProvider` in PostgreSQL with live detection results on every re-verify probe or live audit scan.
- **HMAC Secret Persistence & Signature Calculation**: Added `apiKey` and `hmacSecret` fields to `WordPressSite` model in `prisma/schema.prisma` and updated `POST /api/websites/connect`, `PUT /api/websites/[id]/keys`, `GET /api/websites/[id]/inventory`, and `POST /api/audits` to resolve credentials directly from PostgreSQL.
