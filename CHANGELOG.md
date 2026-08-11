# Changelog: WordPress AI Platform

## [2.2.0] - 2026-08-10

### Fixed
- **PostgreSQL AuditIssue Cleanup (`apply/route.ts`)**: Replaced incomplete rule ID checks with target entity ID and target field mapping cleanup for all action types (`update_meta_description`, `update_meta_title`, `update_focus_keyword`, `update_alt_text`, `update_post_title`, `update_post_excerpt`, `update_post_content`).
- **Live Audit SEO Title Evaluation (`class-rule-seo-002.php` & `class-rule-seo-004.php`)**: Evaluates `$entity['seo_title']` first (from Yoast, Rank Math, AIOSEO, SEOPress) with fallback to `$entity['title']`, eliminating false positive title length warnings.
- **Rollback Cache Invalidation & Multi-Layer Snapshot (`class-wp-ai-executor.php` & `class-wp-ai-rollback.php`)**: Added object cache invalidation (`clean_post_cache`, `wp_cache_delete`), parent post content/Elementor data snapshot capture, and post-restoration verification checks.
