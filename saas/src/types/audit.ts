export type SeverityLevel = "critical" | "warning" | "info";

export interface AuditIssue {
  id: string;
  category: "SEO" | "Content Quality" | "Accessibility" | "Technical";
  severity: SeverityLevel;
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

export interface SiteAuditSummary {
  id: string;
  siteId: string;
  siteName: string;
  siteUrl: string;
  overallScore: number;
  seoScore: number;
  contentScore: number;
  technicalScore: number;
  auditDate: string;
  totalIssuesCount: number;
  criticalIssuesCount: number;
  warningIssuesCount: number;
  infoIssuesCount: number;
  issues: AuditIssue[];
}
