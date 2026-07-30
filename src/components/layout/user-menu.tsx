"use client";

import * as React from "react";
import Link from "next/link";
import { Dropdown } from "@/components/ui/dropdown";
import { User, Settings, CreditCard, LogOut } from "lucide-react";

export function UserMenu() {
  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2.5 rounded-full p-1 border border-border hover:bg-accent transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            TA
          </div>
          <span className="text-xs font-medium text-foreground pr-2 hidden md:inline-block">
            Tariq A.
          </span>
        </button>
      }
      items={[
        {
          label: "User Profile",
          icon: User,
          onClick: () => (window.location.href = "/profile"),
        },
        {
          label: "Account Settings",
          icon: Settings,
          onClick: () => (window.location.href = "/settings"),
        },
        {
          label: "Billing & Plans",
          icon: CreditCard,
          onClick: () => (window.location.href = "/billing"),
        },
        {
          label: "Log Out",
          icon: LogOut,
          variant: "destructive",
          onClick: () => (window.location.href = "/login"),
        },
      ]}
    />
  );
}
