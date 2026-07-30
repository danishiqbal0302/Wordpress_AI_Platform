import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
