"use client";

import * as React from "react";
import { Dropdown } from "../ui/dropdown";
import { User, Settings, CreditCard, LogOut } from "lucide-react";
import { AVATAR_MAP } from "../../app/(dashboard)/profile/page";

export function UserMenu() {
  const [userName, setUserName] = React.useState("Naday A.");
  const [userInitials, setUserInitials] = React.useState("NA");
  const [avatarKey, setAvatarKey] = React.useState("blue");

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          if (data.user.name) {
            setUserName(data.user.name);
            const parts = data.user.name.split(" ");
            const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0].slice(0, 2);
            setUserInitials(initials.toUpperCase());
          }
          if (data.user.avatar && AVATAR_MAP[data.user.avatar]) {
            setAvatarKey(data.user.avatar);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  };

  const gradient = (AVATAR_MAP[avatarKey] || AVATAR_MAP.blue).gradient;

  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2.5 rounded-full p-1 border border-border hover:bg-accent transition-colors">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center text-xs font-bold text-white shadow-sm uppercase`}>
            {userInitials}
          </div>
          <span className="text-xs font-medium text-foreground pr-2 hidden md:inline-block">
            {userName}
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
          onClick: handleLogout,
        },
      ]}
    />
  );
}
