"use client";

import { useState } from "react";
import { Sidebar } from "~/components/manufacture/dashboard/sidebar";
import { Header } from "~/components/manufacture/dashboard/header";
import { RealtimeStats } from "~/components/manufacture/dashboard/RealtimeStats";
import { QuickAccess } from "~/components/manufacture/dashboard/QuickAccess";
import { ManufacturingUpdates } from "~/components/manufacture/dashboard/ManufacturingUpdates";
import { SafetyCompliance } from "~/components/manufacture/dashboard/SafetyCompliance";
import { SubmenuCards } from "~/components/manufacture/dashboard/SubmenuCards";
import { BottomNav } from "~/components/manufacture/dashboard/BottomNav";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Overlay for when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        {/* Header Component */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1">
          <RealtimeStats />
          <QuickAccess />
          <ManufacturingUpdates />
          <SafetyCompliance />
          <SubmenuCards />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
