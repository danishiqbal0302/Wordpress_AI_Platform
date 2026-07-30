import { ExecutionState, RollbackConfidenceLevel } from "./wordpress";

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
