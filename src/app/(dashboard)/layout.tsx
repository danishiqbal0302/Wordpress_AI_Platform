import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main App Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
