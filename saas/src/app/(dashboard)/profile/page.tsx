"use client";

import * as React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Alert } from "../../../components/ui/alert";
import { User, Key, Save, Palette, AlertCircle, CheckCircle2, X } from "lucide-react";

export const AVATAR_MAP: Record<string, { label: string; gradient: string }> = {
  blue: { label: "Blue Sky", gradient: "from-blue-600 to-indigo-500" },
  emerald: { label: "Emerald Isle", gradient: "from-emerald-600 to-teal-500" },
  purple: { label: "Royal Purple", gradient: "from-purple-600 to-pink-500" },
  amber: { label: "Amber Gold", gradient: "from-amber-600 to-orange-500" },
  crimson: { label: "Crimson Fire", gradient: "from-rose-600 to-red-500" },
  cyan: { label: "Cyan Wave", gradient: "from-cyan-600 to-blue-500" },
};

export default function ProfilePage() {
  const [name, setName] = React.useState("Admin Agency Owner");
  const [email, setEmail] = React.useState("admin@agency.com");
  const [avatarKey, setAvatarKey] = React.useState("blue");

  // Avatar Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTempAvatar, setSelectedTempAvatar] = React.useState("blue");

  // Profile Save State
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [profileSuccess, setProfileSuccess] = React.useState<string | null>(null);
  const [profileError, setProfileError] = React.useState<string | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordLoading, setPasswordLoading] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          if (data.user.name) setName(data.user.name);
          if (data.user.email) setEmail(data.user.email);
          if (data.user.avatar && AVATAR_MAP[data.user.avatar]) {
            setAvatarKey(data.user.avatar);
            setSelectedTempAvatar(data.user.avatar);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileSuccess(null);
    setProfileError(null);

    try {
      const res = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar: avatarKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileError(data.error || "Failed to update profile.");
        setProfileLoading(false);
        return;
      }

      setProfileSuccess("Profile updated successfully!");
      setProfileLoading(false);
    } catch (err) {
      console.error(err);
      setProfileError("Network error while updating profile.");
      setProfileLoading(false);
    }
  };

  const handleSaveAvatarFromModal = async () => {
    setAvatarKey(selectedTempAvatar);
    setIsModalOpen(false);

    try {
      await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar: selectedTempAvatar }),
      });
      setProfileSuccess("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordSuccess(null);
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password.");
        setPasswordLoading(false);
        return;
      }

      setPasswordSuccess(data.message || "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordLoading(false);
    } catch (err) {
      console.error(err);
      setPasswordError("Network error while changing password.");
      setPasswordLoading(false);
    }
  };

  const parts = name.trim().split(" ");
  const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0].slice(0, 2);
  const activeGradient = (AVATAR_MAP[avatarKey] || AVATAR_MAP.blue).gradient;

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <User className="h-6 w-6 text-primary" /> User Profile & Security
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your account credentials, avatar preset, and security in PostgreSQL.
        </p>
      </div>

      {profileSuccess && (
        <Alert variant="success" title="Profile Updated">
          {profileSuccess}
        </Alert>
      )}

      {profileError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 font-medium">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <span>{profileError}</span>
        </div>
      )}

      {/* Personal Information Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <div className={`h-16 w-16 rounded-full bg-gradient-to-tr ${activeGradient} flex items-center justify-center font-bold text-xl text-white shadow-xl uppercase transition-all duration-300`}>
                {initials}
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="gap-1.5 text-xs font-semibold"
              >
                <Palette className="h-4 w-4 text-primary" /> Change Avatar
              </Button>
            </div>
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={profileLoading} className="font-semibold text-xs gap-1.5 px-6 bg-primary text-primary-foreground">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </div>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} className="space-y-6">
        {passwordSuccess && (
          <Alert variant="success" title="Password Updated">
            {passwordSuccess}
          </Alert>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 font-medium">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <span>{passwordError}</span>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" /> Security Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={passwordLoading} className="font-semibold text-xs gap-1.5 px-6 bg-primary text-primary-foreground">
            <Key className="h-4 w-4" /> Change Password
          </Button>
        </div>
      </form>

      {/* Avatar Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative text-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" /> Select Avatar Theme
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(AVATAR_MAP).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTempAvatar(key)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    selectedTempAvatar === key
                      ? "border-primary bg-primary/10 ring-2 ring-primary"
                      : "border-slate-800 bg-slate-800/40 hover:border-slate-700"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center font-bold text-white shadow-md uppercase`}>
                    {initials}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveAvatarFromModal} className="bg-primary text-primary-foreground font-semibold">
                Save Selection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
