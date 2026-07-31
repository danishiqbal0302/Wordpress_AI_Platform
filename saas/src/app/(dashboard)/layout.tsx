"use client";

import * as React from "react";
import { Sidebar } from "../../components/layout/sidebar";
import { TopNav } from "../../components/layout/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Responsive Sidebar */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main App Content Area */}
      <div className="flex-1 pl-0 md:pl-64 flex flex-col min-h-screen">
        <TopNav onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6 md:space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
