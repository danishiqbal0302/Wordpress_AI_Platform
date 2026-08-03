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

api/
├── websites/
│   ├── route.ts                       --> GET /api/websites, POST /api/websites
│   ├── connect/route.ts               --> POST /api/websites/connect
│   └── [id]/
│       ├── inventory/route.ts         --> GET /api/websites/[id]/inventory
│       └── reverify/route.ts          --> POST /api/websites/[id]/reverify
```

---

## 2. Public & Auth Routes

### `/` - Public Landing Page
- **Page Component**: [page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/page.tsx)
- **Auth Required**: No (Public)
- **Purpose**: Brand presentation, feature introduction, live interactive diagnostic engine mock, pricing tier grid, and FAQ.

### `/login` - Login Page
- **Page Component**: [(auth)/login/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/login/page.tsx)
- **Auth Required**: No (Guest only)

### `/register` - Registration Page
- **Page Component**: [(auth)/register/page.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(auth)/register/page.tsx)
- **Auth Required**: No (Guest only)

---

## 3. Connection Lifecycle API Routes

### `POST /api/websites/[id]/reverify`
- **Route File**: [reverify/route.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/saas/src/app/api/websites/[id]/reverify/route.ts)
- **Auth Required**: Yes
- **Purpose**: Triggers an on-demand live diagnostic probe against `${siteUrl}/wp-json/wp-ai/v1/health`.
- **Behavior**:
  - Probes live endpoint with 3500ms timeout controller.
  - Classifies target connection state into 8 lifecycle states (`not_detected`, `detected_unpaired`, `paired_auth_failing`, `limited_permissions`, `connected_healthy`, `connected_warnings`, `degraded`, `unsupported_version`).
  - Updates `connectionState` and `health` diagnostic object in PostgreSQL via Prisma.
  - **Preserves Website Record**: Historical site records, proposals, and audit logs are preserved even when the plugin is uninstalled or website goes offline.
