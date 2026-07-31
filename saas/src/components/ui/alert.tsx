import * as React from "react";
import { cn } from "../../lib/utils";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "destructive";
  title?: string;
}

export function Alert({
  className,
  variant = "info",
  title,
  children,
  ...props
}: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    destructive: XCircle,
  };

  const variants = {
    info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    destructive: "border-red-500/30 bg-red-500/10 text-red-300",
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 shadow-sm flex items-start gap-3 backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        {title && <h5 className="font-bold tracking-tight mb-1">{title}</h5>}
        {children}
      </div>
    </div>
  );
}
