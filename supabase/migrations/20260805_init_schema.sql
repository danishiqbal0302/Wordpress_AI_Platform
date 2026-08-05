-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'USER',
    "agencyName" TEXT,
    "apiKey" TEXT UNIQUE,
    avatar TEXT DEFAULT 'blue',
    "auditSchedule" TEXT NOT NULL DEFAULT 'daily',
    "staleProtection" BOOLEAN NOT NULL DEFAULT true,
    "autoPurgeCache" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Connected Websites Table
CREATE TABLE IF NOT EXISTS public.connected_websites (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    "siteUrl" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "hmacSecret" TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Sessions Table
CREATE TABLE IF NOT EXISTS public.sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Password Reset Tokens Table
CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. WordPress Sites Table
CREATE TABLE IF NOT EXISTS public.wordpress_sites (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "connectionState" TEXT NOT NULL DEFAULT 'not_detected',
    "apiKey" TEXT,
    "hmacSecret" TEXT,
    health JSONB NOT NULL DEFAULT '{}'::jsonb,
    "seoProvider" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "acfVersion" TEXT,
    "themeName" TEXT NOT NULL DEFAULT 'Default',
    "lastAuditedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Action Proposals Table
CREATE TABLE IF NOT EXISTS public.action_proposals (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteId" TEXT NOT NULL REFERENCES public.wordpress_sites(id) ON DELETE CASCADE,
    "userId" TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    "targetPageId" INTEGER NOT NULL,
    "targetPageTitle" TEXT NOT NULL,
    "targetPageSlug" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "currentValues" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "proposedValues" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "approvedChecksum" TEXT NOT NULL,
    "currentChecksum" TEXT NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "seoProvider" TEXT NOT NULL,
    "adapterSupportLevel" TEXT NOT NULL,
    "rollbackConfidence" TEXT NOT NULL,
    "possibleSideEffects" JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'AWAITING_APPROVAL',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Action Logs Table
CREATE TABLE IF NOT EXISTS public.action_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteId" TEXT NOT NULL REFERENCES public.wordpress_sites(id) ON DELETE CASCADE,
    "userId" TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    "actionTitle" TEXT NOT NULL,
    "targetEntity" TEXT NOT NULL,
    "executedBy" TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "executionState" TEXT NOT NULL,
    "verificationStatus" TEXT NOT NULL,
    "rollbackStatus" TEXT NOT NULL,
    "rollbackConfidence" TEXT NOT NULL,
    checksum TEXT NOT NULL,
    "snapshotData" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "sideEffects" JSONB NOT NULL DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Site Audit Summaries Table
CREATE TABLE IF NOT EXISTS public.site_audit_summaries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteId" TEXT NOT NULL REFERENCES public.wordpress_sites(id) ON DELETE CASCADE,
    "overallScore" INTEGER NOT NULL,
    "seoScore" INTEGER NOT NULL,
    "contentScore" INTEGER NOT NULL,
    "technicalScore" INTEGER NOT NULL,
    "auditDate" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "totalIssuesCount" INTEGER NOT NULL DEFAULT 0,
    "criticalIssuesCount" INTEGER NOT NULL DEFAULT 0,
    "warningIssuesCount" INTEGER NOT NULL DEFAULT 0,
    "infoIssuesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Audit Issues Table
CREATE TABLE IF NOT EXISTS public.audit_issues (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "auditSummaryId" TEXT NOT NULL REFERENCES public.site_audit_summaries(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    severity TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "affectedUrl" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    "autoFixable" BOOLEAN NOT NULL DEFAULT false,
    "actionPayload" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_wordpress_sites_user ON public.wordpress_sites("userId");
CREATE INDEX IF NOT EXISTS idx_connected_websites_user ON public.connected_websites("userId");
CREATE INDEX IF NOT EXISTS idx_site_audit_summaries_site ON public.site_audit_summaries("siteId");
CREATE INDEX IF NOT EXISTS idx_audit_issues_summary ON public.audit_issues("auditSummaryId");
