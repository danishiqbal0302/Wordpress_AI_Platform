# WordPress AI Platform - Project Index & Strategic Authority

> [!IMPORTANT]
> **Strategic Authority Document**: The [Revised WordPress AI Platform Development Strategy](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/PROJECT_LOG.md) (attached PDF Strategy Document) is the **highest authority** for all architectural, product, safety, and implementation decisions in this repository.

---

## 1. Executive Summary & Vision

The **WordPress AI Platform** is a production-grade SaaS platform built to provide secure, deterministic, and verifiable WordPress auditing, content optimization, SEO metadata management, and honest field-level rollback capabilities.

Rather than acting as an unsafe general-purpose AI operator, the platform operates as a **secure WordPress auditing and content optimization assistant** that inspects websites, detects conflicts, generates explicit proposals, and executes reversible, checksum-verified updates.

---

## 2. Core Operating Principles (Development Strategy Authority)

All features, code modifications, and UI workflows in this repository strictly adhere to the **8 Core Operating Steps**:

1. **Observe**: Read-only inspection of WordPress content, Gutenberg blocks, Classic Editor content, media, and SEO metadata.
2. **Explain**: Clear, human-understandable explanation of existing configuration, missing fields, or unsupported features (e.g., complex ACF fields or unsupported SEO plugins).
3. **Recommend**: AI-generated optimization suggestions backed by audit data.
4. **Prepare a Change**: Build detailed proposals with current vs. proposed values, target checksums, and side-effect registries without mutating live data.
5. **Apply a Narrow Change**: Execute targeted updates with site-level entity locks and stale-target checksum verification.
6. **Verify the Result**: Re-read target values post-execution to confirm exact match before marking success (`SUCCEEDED`).
7. **Restore Recorded Values**: Field-level rollback using captured pre-execution snapshots.
8. **Expand Only After Evidence**: Broaden permissions only after repeated evidence of adapter reliability and execution safety.

---

## 3. The 5 Product Subsystems

```
+-----------------------------------------------------------------------------------+
|                            WordPress AI SaaS Platform                             |
+----------------------------------------+------------------------------------------+
                                         |
    +------------------------------------+------------------------------------+
    |                                    |                                    |
+---v------------------+       +---------v------------+       +---------------v---------------+
| 1. Diagnostics       |       | 2. Read-Only Auditing|       | 3. Deterministic Write Engine |
| Connector & Health   |       | Gutenberg & SEO      |       | Stale Protection & Checksums  |
+----------------------+       +----------------------+       +-------------------------------+
    |                                    |                                    |
    +------------------------------------+------------------------------------+
                                         |
               +-------------------------v-------------------------+
               |                                                   |
     +---------v-------------------------+       +-----------------v------------------+
     | 4. Adapter Reliability Matrix     |       | 5. Honest Field-Level Rollback     |
     | Supported Plugins & Versioning    |       | Confidence Levels & Side Effects   |
     +-----------------------------------+       +------------------------------------+
```

1. **WordPress Connection & Diagnostics**: Onboarding diagnostic engine verifying REST accessibility, Authorization header passthrough, Application Passwords, Cloudflare/Wordfence firewalls, PHP/WP versions, and filesystem write capabilities.
2. **Read-Only Website Understanding**: Auditing engine for Gutenberg blocks, Classic Editor, ACF fields, Media ALT text, Yoast / Rank Math / AIOSEO metadata, internal link health, and content quality.
3. **Deterministic Write Engine**: Execution pipeline operating with entity locking, target checksum verification, explicit user approval, and post-execution verification.
4. **Adapter Reliability & Test Infrastructure**: Version-tested adapters categorized into `verified`, `compatible`, `read_only`, `detected_unsupported`, and `unknown_implementation`.
5. **Honest Field-Level Rollback**: Rollback model with clear confidence levels (`full`, `partial`, `non_reversible`) and side-effect disclosure (e.g., sitemap regeneration, cache invalidation).

---

## 4. Current Project Tech Stack

| Technology | Role / Usage | Version / Spec |
| :--- | :--- | :--- |
| **Next.js** | Full-Stack Web Framework (App Router) | `^16.2.12` |
| **React** | UI Component Rendering Engine | `^19.2.8` |
| **TypeScript** | Strict Type Safety (Zero `any` policy) | `6.0.3` |
| **Tailwind CSS** | Styling & Custom HSL Glassmorphism System | `^4.3.3` |
| **TanStack Query** | Client-Side State & Async Data Fetching | `^5.101.4` |
| **React Hook Form** | Form Management | `^7.83.0` |
| **Zod** | Schema Validation & Type Inference | `^4.4.3` |
| **Lucide React** | Design System Icons | `^1.27.0` |

---

## 5. Documentation Suite Quick Reference

- **File Index**: [FILE_INDEX.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/FILE_INDEX.md) — Comprehensive inventory of all files in the repository.
- **Component Map**: [COMPONENT_MAP.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/COMPONENT_MAP.md) — Map of UI primitives, layout structures, and reusable components.
- **Routes Specification**: [ROUTES.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/ROUTES.md) — Public and dashboard application routes and page structures.
- **Architecture Blueprint**: [ARCHITECTURE.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/ARCHITECTURE.md) — Full technical architecture, state machines, and data schemas.
- **Changelog & History**: [CHANGELOG.md](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/docs/CHANGELOG.md) — Milestone tracking and record of architectural updates.
