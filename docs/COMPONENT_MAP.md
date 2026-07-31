# Component Map - WordPress AI Platform

> [!NOTE]
> This map outlines the component hierarchy, design system primitives, layout shells, and page-level dependencies across the **WordPress AI Platform**.

---

## 1. Component Architecture Overview

The UI layer is structured into three clear tiers:
1. **Design System Primitives** (`src/components/ui/`): Low-level, reusable components wrapped with Tailwind CSS v4 design tokens.
2. **Layout Shells** (`src/components/layout/`): Structural layout wrappers handling navigation, sidebar state, top nav headers, and user session controls.
3. **Page-Level View Components** (`src/app/`): Feature pages that compose primitives and layout components to deliver complete workflows.

---

## 2. Layout Components (`src/components/layout/`)

### [Sidebar](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/sidebar.tsx)
- **Path**: `src/components/layout/sidebar.tsx`
- **Props**: `isOpen?: boolean`, `onClose?: () => void`
- **Dependencies**: `lucide-react` icons (`LayoutDashboard`, `Globe`, `Sparkles`, `Bot`, `Activity`, `Settings`, `User`, `CreditCard`, `ShieldCheck`, `PlusCircle`), `next/link`, `next/navigation` (`usePathname`)
- **Key Responsibilities**:
  - Primary navigation links with active path detection and indicator.
  - Responsive mobile drawer mode with background overlay and slide-in transition.
  - Agency/Tenant selection header and site connect action.
  - Adapter harness status indicator.
- **Used In**: [DashboardLayout](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/layout.tsx)

### [TopNav](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx)
- **Path**: `src/components/layout/top-nav.tsx`
- **Props**: `onMobileMenuToggle?: () => void`
- **Dependencies**: [UserMenu](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/user-menu.tsx), `lucide-react` (`Globe`, `Bell`, `ShieldCheck`, `Menu`, `ChevronRight`), `next/link`
- **Key Responsibilities**:
  - Global site selector dropdown and dynamic route breadcrumbs.
  - Mobile hamburger menu toggle button for triggering the mobile sidebar drawer.
  - Active verification status badge and notifications icon.
  - Embeds the `UserMenu` popover component.
- **Used In**: [DashboardLayout](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/(dashboard)/layout.tsx)

### [UserMenu](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/user-menu.tsx)
- **Path**: `src/components/layout/user-menu.tsx`
- **Props**: None
- **Dependencies**: [Dropdown](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dropdown.tsx), `lucide-react` (`User`, `CreditCard`, `Settings`, `LogOut`), `next/link`
- **Key Responsibilities**:
  - Displays current user avatar, name, and email.
  - Dropdown options linking to Profile, Billing, Settings, and Sign-Out handler.
- **Used In**: [TopNav](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/layout/top-nav.tsx)

---

## 3. Design System UI Primitives (`src/components/ui/`)

| Component Name | File Link | Variants / Options | Component Dependencies | Consumed By Pages / Components |
| :--- | :--- | :--- | :--- | :--- |
| **Alert** | [alert.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/alert.tsx) | `info`, `success`, `warning`, `error` | `lucide-react`, `utils.ts` | `/websites/connect`, `/websites/[id]`, `/ai-chat`, `/activity`, `/audits` |
| **Badge** | [badge.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/badge.tsx) | `default`, `secondary`, `outline`, `success`, `warning`, `danger` | `utils.ts` | `/websites`, `/websites/[id]`, `/dashboard`, `/ai-chat`, `/activity`, `Sidebar`, `TopNav` |
| **Button** | [button.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/button.tsx) | `default`, `primary`, `secondary`, `danger`, `ghost`, `link` \| Sizes: `sm`, `md`, `lg` \| `isLoading` | `spinner.tsx`, `utils.ts` | All public & dashboard routes, modals, wizards |
| **Card** | [card.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/card.tsx) | Header, Title, Description, Content, Footer | `utils.ts` | `/dashboard`, `/websites`, `/websites/[id]`, `/audits`, `/billing`, `/settings` |
| **Checkbox** | [checkbox.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/checkbox.tsx) | `label`, `helperText`, `disabled`, `checked` | `lucide-react`, `utils.ts` | `/settings`, `/websites/connect`, `/audits` |
| **Dialog** | [dialog.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dialog.tsx) | Header, Title, Content, Footer, `isOpen`, `onClose` | `lucide-react`, `utils.ts` | `/ai-chat` (Checksum Approval Modal), `/activity` (Rollback Snapshot Inspection) |
| **Drawer** | [drawer.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/drawer.tsx) | `isOpen`, `onClose`, `title`, Position (`right`) | `lucide-react`, `utils.ts` | `/audits` (Issue Inspection Drawer), `/websites` |
| **Dropdown** | [dropdown.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/dropdown.tsx) | Trigger, Item list, Dividers, Alignment (`left` \| `right`) | `utils.ts` | `UserMenu`, `TopNav`, `/websites` (Quick Actions Menu) |
| **EmptyState** | [empty-state.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/empty-state.tsx) | `icon`, `title`, `description`, `action` | `utils.ts` | `/websites`, `/audits`, `/activity` |
| **Input** | [input.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/input.tsx) | `prefixIcon`, `suffixIcon`, `error`, `helperText`, `label` | `utils.ts` | `/login`, `/register`, `/forgot-password`, `/websites/connect`, `/settings`, `/profile` |
| **Pagination** | [pagination.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/pagination.tsx) | `currentPage`, `totalPages`, `onPageChange` | `lucide-react`, `utils.ts` | `/websites`, `/audits`, `/activity` |
| **SearchInput** | [search.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/search.tsx) | `value`, `onChange`, `onClear`, `placeholder` | `lucide-react`, `utils.ts` | `/websites`, `/audits`, `/activity`, `TopNav` |
| **Select** | [select.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/select.tsx) | `options`, `label`, `error`, `helperText` | `lucide-react`, `utils.ts` | `/websites/connect`, `/audits`, `/settings`, `/ai-chat` |
| **Spinner** | [spinner.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/spinner.tsx) | Sizes: `sm`, `md`, `lg` \| Color variants | `utils.ts` | [Button](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/button.tsx), `/websites/connect` (Diagnostic Spinner) |
| **Table** | [table.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/table.tsx) | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` | `utils.ts` | `/websites`, `/websites/[id]`, `/activity`, `/audits`, `/billing` |
| **Textarea** | [textarea.tsx](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/components/ui/textarea.tsx) | `label`, `error`, `helperText`, `rows` | `utils.ts` | `/ai-chat`, `/settings`, `/audits` |

---

## 4. Primitive Styling & Design System Mapping

All UI components draw from the CSS variables and custom utility classes declared in [globals.css](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/src/app/globals.css) and [tailwind.config.ts](file:///c:/Users/tariq/Desktop/WordPress%20AI%20Platform/tailwind.config.ts):

- **Background Glassmorphism**: `.glass-card` (`background: rgba(15, 23, 42, 0.75)`, `backdrop-filter: blur(12px)`)
- **Primary Color HSL**: `--primary: 217 91% 60%` (Vibrant Indigo/Blue)
- **Status Colors**:
  - `connected_healthy` / `verified`: `--success: 142 71% 45%` (Emerald)
  - `warning` / `limited_permissions`: `--warning: 38 92% 50%` (Amber)
  - `degraded` / `failing` / `stale`: `--danger: 0 84% 60%` (Crimson)
  - `read_only` / `info`: `--info: 199 89% 48%` (Sky Blue)
