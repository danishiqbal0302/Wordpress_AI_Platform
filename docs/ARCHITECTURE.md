# Architecture Blueprint - WordPress AI Platform

> [!IMPORTANT]
> **Highest Authority Reference**: This document translates the requirements from the [Development Strategy Document](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/PROJECT_LOG.md) into concrete full-stack architectural components, data models, state machines, and execution pipelines.

---

## 1. High-Level Architectural Diagram

```
+----------------------------------------------------------------------------------------------------+
|                                    SaaS Client (Next.js 15 App Router)                             |
|                                                                                                    |
|  +--------------------+   +---------------------+   +---------------------+   +-----------------+  |
|  | Diagnostic Wizard  |   | Auditing Dashboard  |   | AI Copilot & SERP   |   | Rollback & Logs |  |
|  +---------+----------+   +----------+----------+   +----------+----------+   +--------+--------+  |
+------------|-------------------------|-------------------------|-------------------------|---------+
             |                         |                         |                         |
             v                         v                         v                         v
+----------------------------------------------------------------------------------------------------+
|                                      Platform Core (API Engine)                                    |
|                                                                                                    |
|  +------------------------+  +-------------------------+  +-------------------------------------+  |
|  | Diagnostics Engine     |  | AI Logic & Function     |  | Action Execution Engine             |  |
|  | - Auth Header Check    |  |   Calling (OpenAI)      |  | - 20-State Machine                  |  |
|  | - Firewall Detection   |  | - Context Resolver      |  | - Checksum Validator                |  |
|  | - REST Accessibility   |  | - SERP Preview Gen      |  | - Entity Locking System             |  |
|  +-----------+------------+  +------------+------------+  +------------------+------------------+  |
+--------------|----------------------------|----------------------------------|---------------------+
               |                            |                                  |
               v                            v                                  v
+----------------------------------------------------------------------------------------------------+
|                                  WordPress Connector Subsystem                                     |
|                                                                                                    |
|  +--------------------------------+  +--------------------------------+  +----------------------+  |
|  | Public Diagnostic Endpoint     |  | Authenticated Connector API    |  | Snapshot Store       |  |
|  | GET /wp-json/wp-ai/v1/health     |  | - REST / Application Passwords |  | - Pre-execution data |  |
|  +--------------------------------+  +--------------------------------+  +----------------------+  |
+----------------------------------------------------------------------------------------------------+
                                            |
                                            v
+----------------------------------------------------------------------------------------------------+
|                             WordPress Target System (WordPress Core)                               |
|                                                                                                    |
|  +------------------+   +-------------------+   +--------------------+   +-------------------+  |
|  | Yoast / RankMath |   | Gutenberg Blocks  |   | Classic / ACF Text |   | Media ALT Text    |  |
|  +------------------+   +-------------------+   +--------------------+   +-------------------+  |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Five Product Subsystems (Strategy Alignment)

### Subsystem 1: WordPress Connection & Diagnostics
- **Authority**: Section 2.1 & 7.1 of Strategy Document
- **Responsibility**: Validate connection health *before* enabling user interactions. Diagnoses network failures, web server misconfigurations, and firewall blocks with specific error messages rather than vague "Connection failed" alerts.
- **Connection States**:
  1. `not_detected`: Connector plugin not found on target domain.
  2. `detected_unpaired`: Connector installed but pairing handshake incomplete.
  3. `paired_auth_failing`: Paired credentials rejected by WordPress REST API (e.g., Application Password revoked).
  4. `limited_permissions`: Authenticated user lacks required capabilities (e.g., `edit_posts`, `edit_others_posts`).
  5. `connected_healthy`: All diagnostic checks passed, connection 100% operational.
  6. `connected_warnings`: Connected with non-critical warnings (e.g., outdated plugin version).
  7. `degraded`: Intermittent timeouts or proxy issues detected.
  8. `unsupported_version`: WordPress or PHP version below minimum requirement.

### Subsystem 2: Read-Only Website Understanding
- **Authority**: Section 7.2 of Strategy Document
- **Responsibility**: Safely inspect site content structures without modification risks.
- **Scope**:
  - Gutenberg text block discovery & structural parsing.
  - Classic Editor raw HTML inspection.
  - Basic ACF field discovery (Text, Textarea, WYSIWYG, Image, URL).
  - SEO Provider Detection (Yoast SEO, Rank Math, AIOSEO, SEOPress).
  - Automated Site Audits: missing title tags, missing meta descriptions, missing image ALT attributes, duplicate titles/descriptions, broken internal links.

### Subsystem 3: Deterministic Write Engine & Stale Target Safeguards
- **Authority**: Section 5 & 9 of Strategy Document
- **Responsibility**: Execute narrow, reversible updates while strictly preventing race conditions or overwriting stale data.
- **State Machine Architecture (20 Execution States)**:

```
[REQUESTED] 
    │
    ▼
[CONTEXT_RESOLVED] ──► [AMBIGUOUS_TARGET] / [UNSUPPORTED_ACTION]
    │
    ▼
[PROPOSAL_GENERATED]
    │
    ▼
[AWAITING_APPROVAL]
    │
    ▼
[APPROVED] ──► [PERMISSION_DENIED]
    │
    ▼
[PRECONDITION_CHECK] ──► [STALE_TARGET]
    │
    ▼
[SNAPSHOT_CAPTURED] ──► [SNAPSHOT_FAILED]
    │
    ▼
[EXECUTING] ──► [EXECUTION_FAILED]
    │
    ▼
[VERIFYING] ──► [VERIFICATION_FAILED]
    │
    ▼
[SUCCEEDED] ──► [ROLLBACK_AVAILABLE] / [ROLLBACK_PARTIAL] / [ROLLBACK_FAILED]
```

- **Checksum & Stale Protection Flow**:
  1. At proposal generation time, calculate `approvedChecksum` = `MD5(EntityID + OriginalFields + LastModifiedTimestamp)`.
  2. At execution time, re-read live target from WordPress and calculate `currentChecksum`.
  3. If `currentChecksum != approvedChecksum`, transition to `STALE_TARGET` state, hard-fail execution, and present difference to user.

### Subsystem 4: Adapter Reliability Matrix
- **Authority**: Section 3 & 4 of Strategy Document
- **Responsibility**: Treat third-party plugin integrations as versioned adapter products backed by contract tests.
- **Adapter Support Levels**:
  - `verified`: Exact plugin version passed automated contract tests.
  - `compatible`: Nearby version passed tests; exact version not yet verified.
  - `read_only`: System can inspect fields but will refuse write operations.
  - `detected_unsupported`: Integration present, but no safe write adapter available.
  - `unknown_implementation`: Custom or un-identified metadata storage pattern (never fallback to guessing keys).

### Subsystem 5: Honest Field-Level Rollback Model
- **Authority**: Section 6 & 11 of Strategy Document
- **Responsibility**: Maintain accurate field-level snapshots and communicate precise rollback limitations.
- **Rollback Confidence Levels**:
  - `full`: Complete restoration guaranteed (e.g., post title, meta description, image alt text).
  - `partial`: Platform fields restored, but external side-effects (sitemap regeneration, cache invalidation, webhooks) cannot be undone.
  - `non_reversible`: Operations that cannot be reversed automatically (clearly disclosed before user approval).

---

## 3. Core Data Types & Schemas (`src/types/`)

### [wordpress.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/wordpress.ts)
```typescript
export type ConnectionState =
  | "not_detected"
  | "detected_unpaired"
  | "paired_auth_failing"
  | "limited_permissions"
  | "connected_healthy"
  | "connected_warnings"
  | "degraded"
  | "unsupported_version";

export type AdapterSupportLevel =
  | "verified"
  | "compatible"
  | "read_only"
  | "detected_unsupported"
  | "unknown_implementation";

export type RollbackConfidenceLevel = "full" | "partial" | "non_reversible";

export type ExecutionState =
  | "REQUESTED"
  | "CONTEXT_RESOLVED"
  | "PROPOSAL_GENERATED"
  | "AWAITING_APPROVAL"
  | "APPROVED"
  | "PRECONDITION_CHECK"
  | "SNAPSHOT_CAPTURED"
  | "EXECUTING"
  | "VERIFYING"
  | "SUCCEEDED"
  | "AMBIGUOUS_TARGET"
  | "UNSUPPORTED_ACTION"
  | "PERMISSION_DENIED"
  | "STALE_TARGET"
  | "SNAPSHOT_FAILED"
  | "EXECUTION_FAILED"
  | "VERIFICATION_FAILED"
  | "ROLLBACK_AVAILABLE"
  | "ROLLBACK_PARTIAL"
  | "ROLLBACK_FAILED";

export interface DiagnosticsCheck {
  id: string;
  name: string;
  status: "pass" | "warn" | "fail" | "pending";
  message: string;
  details?: string;
  recommendation?: string;
}

export interface ActionProposal {
  id: string;
  siteId: string;
  siteName: string;
  targetPageId: number;
  targetPageTitle: string;
  targetPageSlug: string;
  actionType: "update_meta_title" | "update_meta_description" | "update_alt_text" | "update_content_block";
  currentValues: Record<string, string>;
  proposedValues: Record<string, string>;
  approvedChecksum: string;
  currentChecksum: string;
  isStale: boolean;
  seoProvider: string;
  adapterSupportLevel: AdapterSupportLevel;
  rollbackConfidence: RollbackConfidenceLevel;
  possibleSideEffects: string[];
  status: ExecutionState;
  createdTime: string;
}
```

### [audit.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/audit.ts)
```typescript
export interface AuditIssue {
  id: string;
  category: "SEO" | "Content Quality" | "Accessibility" | "Technical";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  affectedUrl: string;
  pageTitle: string;
  recommendation: string;
  autoFixable: boolean;
  actionPayload?: {
    actionType: string;
    field: string;
    suggestedValue: string;
  };
}
```

### [activity.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/types/activity.ts)
```typescript
export interface ActionLogItem {
  id: string;
  siteId: string;
  siteName: string;
  actionTitle: string;
  targetEntity: string;
  executedBy: string;
  timestamp: string;
  executionState: ExecutionState;
  verificationStatus: "verified_exact_match" | "verification_failed" | "pending";
  rollbackStatus: "available" | "restored" | "failed" | "not_supported";
  rollbackConfidence: RollbackConfidenceLevel;
  checksum: string;
  snapshotData: {
    previousValues: Record<string, string>;
    appliedValues: Record<string, string>;
  };
  sideEffects: string[];
}
```

---

## 4. Diagnostics & Health Contract

The WordPress connector exposes a **public health endpoint** returning non-sensitive metadata:
- `GET /wp-json/wp-ai/v1/health`
- Response fields: `connector_installed`, `connector_version`, `wp_version`, `php_version`, `rest_available`, `https_status`, `auth_methods`, `auth_header_passed`, `app_passwords_enabled`, `multisite`, `firewall_detected`, `filesystem_write_method`.

Sensitive details (such as detailed capability mapping, post lists, or plugin settings) require **Authenticated REST Requests** via WordPress Application Passwords or OAuth.
