"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Factory, Activity, FileText, Settings } from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white md:hidden">
      <div className="grid h-full grid-cols-3">
        <Link
          href="/dashboard-user/energy"
          className={`flex flex-col items-center justify-center ${
            isActive("/dashboard") && !pathname.includes("/dashboard/")
              ? "text-primary"
              : "text-gray-500"
          }`}
        >
          <Factory className="h-5 w-5" />
          <span className="mt-1 text-xs">Dashboard</span>
        </Link>
        <Link
          href="/dashboard-user/energy/consumption"
          className={`flex flex-col items-center justify-center ${
            isActive("/dashboard/consumption")
              ? "text-primary"
              : "text-gray-500"
          }`}
        >
          <Activity className="h-5 w-5" />
          <span className="mt-1 text-xs">Consumption</span>
        </Link>
        <Link
          href="/dashboard-user/energy/reports"
          className={`flex flex-col items-center justify-center ${
            isActive("/dashboard/reports") ? "text-primary" : "text-gray-500"
          }`}
        >
          <FileText className="h-5 w-5" />
          <span className="mt-1 text-xs">Reports</span>
        </Link>
      </div>
    </div>
  );
}
