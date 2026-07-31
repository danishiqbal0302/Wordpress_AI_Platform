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

export interface WordPressHealthDiagnostic {
  connectorInstalled: boolean;
  connectorVersion: string;
  wordpressVersion: string;
  phpVersion: string;
  restAvailable: boolean;
  httpsStatus: boolean;
  authMethods: string[];
  authHeaderStatus: boolean;
  appPasswordStatus: boolean;
  multisiteStatus: boolean;
  firewallDetected: string | null;
  filesystemWriteMethod: string;
  requiredCapabilitiesPass: boolean;
  checks: DiagnosticsCheck[];
}

export interface SEOProviderInfo {
  name: "Yoast SEO" | "Rank Math" | "AIOSEO" | "SEOPress" | "None / Custom";
  version: string;
  adapterSupportLevel: AdapterSupportLevel;
  lastTestedDate: string;
}

export interface WordPressSite {
  id: string;
  name: string;
  url: string;
  adminEmail: string;
  connectionState: ConnectionState;
  health: WordPressHealthDiagnostic;
  seoProvider: SEOProviderInfo;
  acfVersion?: string;
  themeName: string;
  lastAuditedAt: string;
  createdAt: string;
  stats: {
    totalPages: number;
    totalPosts: number;
    missingMetaTitles: number;
    missingMetaDescriptions: number;
    missingAltText: number;
    pendingProposals: number;
  };
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
