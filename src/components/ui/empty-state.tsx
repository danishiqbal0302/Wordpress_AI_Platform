import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FolderOpen,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-dashed border-border/80 bg-card/40 my-6">
      <div className="rounded-full bg-primary/10 p-4 text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
