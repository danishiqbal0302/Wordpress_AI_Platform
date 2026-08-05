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

export interface DatabaseIOTest {
  pass: boolean;
  read_pass: boolean;
  delete_pass: boolean;
  latency_ms: number;
}

export interface WordPressHealthDiagnostic {
  connectorInstalled?: boolean;
  connectorVersion?: string;
  wordpressVersion?: string;
  phpVersion?: string;
  restAvailable?: boolean;
  httpsStatus?: boolean;
  authMethods?: string[];
  authHeaderStatus?: boolean;
  appPasswordStatus?: boolean;
  multisiteStatus?: boolean;
  firewallDetected?: string | null;
  filesystemWriteMethod?: string;
  requiredCapabilitiesPass?: boolean;
  checks?: DiagnosticsCheck[];
  connector_installed?: boolean;
  connector_version?: string;
  wp_version?: string;
  php_version?: string;
  rest_availability?: boolean;
  https_status?: boolean;
  auth_methods_available?: string[];
  auth_header_status?: boolean;
  app_password_status?: boolean;
  multisite_status?: boolean;
  firewall_detection?: string | null;
  filesystem_write_method?: string;
  capabilities_status?: boolean;
  database_io_test?: DatabaseIOTest;
  seo_provider?: any;
  active_theme?: string;
  timestamp?: number;
  errorMessage?: string | null;
  recoverySuggestion?: string | null;
}

export interface SEOProviderInfo {
  name: "Yoast SEO" | "Rank Math" | "AIOSEO" | "SEOPress" | "None / Custom";
  version: string;
  adapterSupportLevel: AdapterSupportLevel;
  lastTestedDate?: string;
}

export interface AuditFinding {
  id: string;
  rule_id: string;
  category: "seo_metadata" | "content_quality" | "media_accessibility" | "technical_structure" | "taxonomies_internal_links";
  severity: "critical" | "warning" | "info";
  entity_id: number;
  entity_type: "page" | "post" | "attachment" | "media";
  entity_title: string;
  entity_url?: string;
  field_name?: string;
  current_value?: string;
  expected_value?: string;
  evidence: string;
  rationale: string;
  remediation: string;
  auto_fixable?: boolean;
}

export interface CategoryScores {
  seo_score: number;
  content_score: number;
  media_score: number;
  technical_score: number;
}

export interface ExplainableDeduction {
  finding_id: string;
  rule_id: string;
  category: string;
  severity: string;
  entity_title: string;
  deduction_points: number;
  reason: string;
}

export interface ScoringMethodology {
  weights: Record<string, number>;
  explainable_deductions: ExplainableDeduction[];
  total_deduction_count: number;
}

export interface AuditReport {
  overall_health_score: number;
  category_scores: CategoryScores;
  rules_evaluated_count: number;
  total_findings_count: number;
  scoring_methodology: ScoringMethodology;
  findings: AuditFinding[];
  rules_evaluated: any[];
  timestamp: number;
}

export interface SiteAuditSummary {
  total_items_checked: number;
  missing_meta_descriptions_count: number;
  missing_alt_texts_count: number;
  thin_content_count: number;
  title_length_warnings_count: number;
  seo_provider_detected: string;
}

export interface SiteIssue {
  id: string;
  entity_id: number;
  entity_type: "page" | "post" | "media" | "attachment";
  entity_title: string;
  issue_type: string;
  severity: "critical" | "warning" | "info";
  remediation: string;
  rule_id?: string;
  evidence?: string;
  rationale?: string;
}

export interface PageNode {
  id: number;
  title: string;
  slug: string;
  child_ids: number[];
  child_count: number;
}

export interface CustomPostTypeItem {
  id: number;
  title: string;
  slug: string;
  status: string;
  post_type: string;
  modified_gmt: string;
  word_count: number;
  meta_description: string;
  focus_keyword: string;
  has_blocks: boolean;
}

export interface CustomPostTypeGroup {
  name: string;
  label: string;
  singular_name: string;
  has_archive: boolean;
  hierarchical: boolean;
  taxonomies: string[];
  total_count: number;
  items: CustomPostTypeItem[];
}

export interface TaxonomyTerm {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent?: number;
  count: number;
}

export interface CustomTaxonomyInfo {
  name: string;
  label: string;
  object_type: string[];
  hierarchical: boolean;
  terms_count: number;
  terms: TaxonomyTerm[];
}

export interface TaxonomiesInventory {
  categories: TaxonomyTerm[];
  tags: TaxonomyTerm[];
  custom_taxonomies: CustomTaxonomyInfo[];
}

export interface NavMenuItem {
  id: number;
  title: string;
  url: string;
  target?: string;
  parent_id: number;
  object_type: string;
  object_id: number;
}

export interface NavMenu {
  id: number;
  name: string;
  slug: string;
  count: number;
  assigned_locations: string[];
  items_count: number;
  items: NavMenuItem[];
}

export interface NavigationMenusInventory {
  registered_locations: string[];
  menus_count: number;
  menus: NavMenu[];
}

export interface ActiveThemeSpecs {
  name: string;
  stylesheet: string;
  version: string;
  author?: string;
  is_child_theme: boolean;
  parent_theme?: string | null;
  theme_supports: Record<string, boolean>;
}

export interface AuditingPluginItem {
  plugin_file: string;
  name: string;
  category: string;
  active: boolean;
}

export interface SiteInventoryResponse {
  site_health_score: number;
  category_scores?: CategoryScores;
  site_audit_summary: SiteAuditSummary;
  audit_report?: AuditReport;
  issues: AuditFinding[] | SiteIssue[];
  recommendations: string[];
  pages: any[];
  pages_hierarchy?: PageNode[];
  posts: any[];
  custom_post_types?: CustomPostTypeGroup[];
  taxonomies?: TaxonomiesInventory;
  media_inventory: {
    total_count: number;
    missing_alt_count: number;
    sample_items: any[];
  };
  navigation_menus?: NavigationMenusInventory;
  basic_acf_discovery: {
    acf_active: boolean;
    acf_version: string | null;
    field_groups: any[];
  };
  gutenberg_block_parsing: any[];
  seo_providers: Record<string, { name: string; active: boolean; version: string | null }>;
  active_theme?: ActiveThemeSpecs;
  active_plugins_auditing?: AuditingPluginItem[];
  timestamp: number;
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
  stats?: {
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
  siteName?: string;
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
  createdTime?: string;
  createdAt?: string;
}
