"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "~/components/cluster/dashboard/sidebar";
import { Header } from "~/components/cluster/dashboard/header";
import { HeroSection } from "~/components/cluster/dashboard/hero-section";
import { FinancialSummary } from "~/components/cluster/dashboard/financial-summary";
import { QuickAccess } from "~/components/cluster/dashboard/quick-access";
import { AnnouncementsEvents } from "~/components/cluster/dashboard/announcements-events";
import { RecentActivities } from "~/components/cluster/dashboard/recent-activities";
import { BottomNavigation } from "~/components/cluster/dashboard/bottom-navigation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Animated Overlay for when sidebar is open */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-black/20"
            onClick={() => setSidebarOpen(false)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <motion.div
        className="flex flex-1 flex-col"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Component */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <motion.div className="flex-1" variants={containerVariants}>
          {/* Hero Section Component */}
          <motion.div variants={itemVariants}>
            <HeroSection userName="A. Risyan" billAmount="Rp 350.000" />
          </motion.div>

          {/* Financial Summary Component */}
          <motion.div variants={itemVariants}>
            <FinancialSummary />
          </motion.div>

          {/* Quick Access Component */}
          <motion.div variants={itemVariants}>
            <QuickAccess />
          </motion.div>

          {/* Announcements & Events Component */}
          <motion.div variants={itemVariants}>
            <AnnouncementsEvents />
          </motion.div>

          {/* Recent Activities Component */}
          <motion.div variants={itemVariants}>
            <RecentActivities />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Navigation Component */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <BottomNavigation />
      </motion.div>

      {/* Global styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
