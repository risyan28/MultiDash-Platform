import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Factory, Download, RefreshCw, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { BottomNavigation } from "~/components/energy/bottom-navigation";
import { Footer } from "~/components/energy/footer";
import Navigation from "~/components/energy/top-navigation"; // Impor komponen navigasi

export const metadata: Metadata = {
  title: "Energy Monitoring System",
  description: "Factory Energy Monitoring System Dashboard",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Default date range for the date picker
  const defaultDateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 hari sebelumnya
    to: new Date(),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-40 border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <Link
            href="/dashboard-user/energy"
            className="flex items-center gap-2 font-semibold"
          >
            <Factory className="h-6 w-6" />
            <span className="hidden sm:inline">Energy Monitoring System</span>
            <span className="sm:hidden">EMS</span>
          </Link>
          {/* Navigasi Links */}
          <Navigation /> {/* Menggunakan komponen Navigation */}
          <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Live</span>
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download Report</span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 pb-16 md:pb-0">{children}</div>
      <BottomNavigation />
      <Footer />
    </div>
  );
}
