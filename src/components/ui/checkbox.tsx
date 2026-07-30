import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const boxId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label htmlFor={boxId} className="flex items-center gap-2.5 cursor-pointer select-none group">
        <div className="relative">
          <input
            type="checkbox"
            id={boxId}
            checked={checked}
            onChange={onChange}
            className="sr-only"
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-md border border-input bg-card/60 transition-all group-hover:border-primary flex items-center justify-center",
              checked && "bg-primary border-primary text-primary-foreground"
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
        {label && <span className="text-sm text-foreground/90 font-medium">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
