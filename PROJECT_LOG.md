# Project Log: WordPress AI Platform

## Overview
Enterprise SaaS platform and native WordPress connector plugin for automated SEO auditing, metadata optimization, Gutenberg content quality checks, and verified execution.

## Implemented Milestones & Subsystems

### 1. Conversational Chatbot & Suggestion UI
- Replaced rigid milestone-based text command flow with Claude-style interactive suggestion chips.
- Frontend auto-submits button choices dynamically without requiring manual keyboard input from the user.
- Dynamically loads suggestions returned from LLM completions.

### 2. Live Scan & Classifier Pipeline
- Automatically scans connected sites on connection/load.
- Ignores default WordPress sample content (e.g. Sample Page, Hello World!) during blank checks.
- Classifies site state:
  - **FRESH/BLANK**: Guides user to generate a custom block theme or use their active theme.
  - **EXISTING**: Auto-detects business niche (e.g. Dental clinic, Cleaning services) and asks how to help.

### 3. Autonomous Background Builder Loop
- Server-side background build loop (`runAutonomousBuild`) runs asynchronously to prevent HTTP timeouts.
- Intercepts conversational build requests via a fast OpenAI Classifier router to extract parameters.
- Steps executed sequentially:
  - Phase 1: Brand assets & custom colors mapping.
  - Phase 2: Compiling & uploading custom Premium Block Theme.
  - Phase 3: Dynamic Image Selection based on niche keywords.
  - Phase 4: Modeling custom layout with max 3-column rows constraint to prevent squished layouts.
  - Phase 5: Sideloading homepage stock images to WordPress Media Library.
  - Phase 6: Publishing Homepage to WordPress using post_title & post_content payload matching.
  - Phase 7: Assigning static Front Page configurations.
  - Phase 8: Generating sitemap inner pages.
  - Phase 8b: Populating WordPress Custom Post Type 'service' entries.
  - Phase 9: Configuring Navigation menus linking sitemap pages.
  - Phase 10: Running final SEO quality checks.
- Progress Logs Console rendering: Client polls `/api/chat/status` to show a live progress logs console in the chat bubble.

### 4. Dynamic Image Sideloading Helper
- Automatically extracts external Unsplash URLs from blocks HTML on the fly.
- Downloads, imports, and uploads them to the WordPress Media Library via the connector's REST endpoint.
- Replaces URLs in the Gutenberg block markup with local WordPress media upload URLs.
- Chat UI filters out raw Gutenberg HTML comments and JSON proposals, rendering clean layouts badges instead.

### 5. Security & Verification Core
- Bypass strict Hostinger/LiteSpeed firewall header stripping via custom HMAC-SHA256 headers (`X-WP-AI-Signature`, `X-WP-AI-Timestamp`).
- Atomic rollbacks and object cache invalidations on WordPress to protect against site breakages.

## Future Implementation Roadmap
1. **Interactive Design Customizer Panel**: Let users preview and tweak brand colors, custom styles, and Google Fonts live.
2. **Multi-Niche Blueprint Expansion**: Expand sitemap generator to support Restaurants, Gyms, Real Estate, and portfolios.
3. **Form & Interactive Blocks Integrations**: Enable conversational addition of working contact forms, maps, and sliders.
4. **Autonomous Completion Alerts**: Browser push notifications and completion audio signals.
