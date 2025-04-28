import type { ReactNode } from "react";

// Sidebar Component
export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Header Component
export interface HeaderProps {
  onMenuClick: () => void;
}

// No props needed for HeroSection, FinancialSummary, AnnouncementsEvents, RecentActivities

// Bottom Navigation
export type BottomNavigationProps = object;

// Quick Access
export interface SubmenuItem {
  label: string;
  link: string;
  icon: ReactNode;
}

export interface QuickAccessItem {
  icon: ReactNode;
  label: string;
  color: string;
  link: string;
  dialog?: boolean;
  submenu?: SubmenuItem[];
}

export type QuickAccessProps = object;

// Activity item for RecentActivities
export interface ActivityItem {
  title: string;
  desc: string;
  time: string;
  icon: ReactNode;
  color: string;
}

// Announcement/Event item
export interface AnnouncementItem {
  title: string;
  date: string;
  description: string;
  image: string;
  badgeText: string;
  badgeColor: string;
}

// Financial summary item
export interface FinancialItem {
  type: "income" | "expense" | "balance";
  amount: string;
  period: string;
  icon: ReactNode;
  color: string;
}

// Menu item for sidebar
export interface MenuItem {
  title: string;
  icon: ReactNode;
  link: string;
  isActive?: boolean;
  submenu?: {
    title: string;
    link: string;
  }[];
}

// Hero section props
export interface HeroSectionProps {
  userName?: string;
  billAmount?: string;
}
