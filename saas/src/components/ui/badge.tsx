import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "wp";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary/15 text-primary border border-primary/20",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "text-foreground border border-border",
    destructive: "border-transparent bg-destructive/15 text-red-400 border border-destructive/30",
    success: "border-transparent bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "border-transparent bg-amber-500/15 text-amber-400 border border-amber-500/30",
    info: "border-transparent bg-sky-500/15 text-sky-400 border border-sky-500/30",
    wp: "border-transparent bg-[#0073aa]/20 text-sky-300 border border-[#0073aa]/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
