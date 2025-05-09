"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Activity, FileText } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/dashboard-user/energy",
      label: "Dashboard",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      href: "/dashboard-user/energy/consumption",
      label: "Consumption",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      href: "/dashboard-user/energy/reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <div className="hidden flex-1 justify-center md:flex">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`link ${pathname === item.href ? "active border-b-2 border-primary" : ""} text-sm font-medium transition-colors hover:text-primary`}
          >
            <div className="flex items-center gap-1">
              {item.icon}
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
