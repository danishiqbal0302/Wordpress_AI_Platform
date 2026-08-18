"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { AlertTriangle, Trash2, Loader2, Globe } from "lucide-react";

interface DeleteWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: any | null;
  onConfirmDelete: (siteId: string) => Promise<void>;
}

export function DeleteWebsiteModal({
  isOpen,
  onClose,
  site,
  onConfirmDelete,
}: DeleteWebsiteModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (!site?.id) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      await onConfirmDelete(site.id);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Connected Website"
      description="This action cannot be undone."
      maxWidth="sm"
    >
      <div className="space-y-4 py-1">
        {/* Warning Callout Box */}
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-red-700 dark:text-red-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Are you sure you want to delete this site?</span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
            Deleting <strong>"{site?.name || "Website"}"</strong> will disconnect it from WordPress AI Assistant and permanently remove its stored connection credentials.
          </p>
        </div>

        {site?.url && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{site.url}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 text-xs rounded-xl bg-red-100 text-red-800 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-2 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-5 shadow-md flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                Delete Website
              </>
            )}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
