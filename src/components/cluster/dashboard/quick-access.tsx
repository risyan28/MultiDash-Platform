"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  ShieldCheck,
  CreditCard,
  Building,
  MessageSquare,
  Users,
  Settings,
  X,
  Cctv,
  NotebookText,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// Define types for our items
type SubmenuItem = {
  label: string;
  link: string;
  icon: React.ReactNode;
};

type QuickAccessItem = {
  icon: React.ReactNode;
  label: string;
  color: string;
  link: string;
  dialog?: boolean;
  submenu?: SubmenuItem[];
};

export function QuickAccess() {
  // Track which dialog is currently open (if any)
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  // Function to open a dialog
  const openDialog = (dialogId: string) => {
    const dialog = document.getElementById(dialogId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
      setOpenDialogId(dialogId);
    }
  };

  // Function to close a dialog
  const closeDialog = (dialogId: string) => {
    const dialog = document.getElementById(dialogId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.close();
      setOpenDialogId(null);
    }
  };

  // Quick access items data
  const quickAccessItems: QuickAccessItem[] = [
    /*     {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Pembayaran",
      color: "bg-purple-100 text-purple-600",
      link: "#",
      dialog: true,
      submenu: [
        {
          label: "Bayar Tagihan",
          link: "/keuangan/tagihan",
          icon: <CreditCard className="h-4 w-4" />,
        },
        {
          label: "Riwayat Pembayaran",
          link: "/keuangan/pembayaran",
          icon: <Clock className="h-4 w-4" />,
        },
        {
          label: "Metode Pembayaran",
          link: "/keuangan/metode",
          icon: <Wallet className="h-4 w-4" />,
        },
      ],
    }, */
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Pembayaran IPKL",
      color: "bg-purple-100 text-purple-600",
      link: "/dashboard-user/cluster/ipkl",
    },
    {
      icon: <NotebookText className="h-5 w-5" />,
      label: "Laporan Keuangan",
      color: "bg-amber-100 text-amber-600",
      link: "/acara",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      label: "Keamanan",
      color: "bg-green-100 text-green-600",
      link: "#",
      dialog: true,
      submenu: [
        {
          label: "Akses CCTV",
          link: "/Keamanan/cctv",
          icon: <Cctv className="h-4 w-4" />,
        },
        {
          label: "Jadwal Security",
          link: "/Keamanan/security",
          icon: <Calendar className="h-4 w-4" />,
        },
      ],
    },

    {
      icon: <Building className="h-5 w-5" />,
      label: "Fasilitas",
      color: "bg-indigo-100 text-indigo-600",
      link: "/fasilitas",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Dokumen",
      color: "bg-blue-100 text-blue-600",
      link: "/dokumen",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Lapor Masalah",
      color: "bg-pink-100 text-pink-600",
      link: "/komunitas/forum",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Warga",
      color: "bg-teal-100 text-teal-600",
      link: "/dashboard-user/cluster/warga",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Pengaturan",
      color: "bg-gray-100 text-gray-600",
      link: "/pengaturan",
    },
  ];

  return (
    <div className="container mx-auto mb-6 px-4">
      <h2 className="mb-4 text-xl font-bold">Akses Cepat</h2>
      <div className="hide-scrollbar grid grid-cols-4 gap-4 overflow-x-auto pb-2">
        {quickAccessItems.map((item, index) => (
          <div key={index} className="relative">
            {item.dialog ? (
              <>
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                    onClick={() => openDialog(`dialog-${index}`)}
                  >
                    <div
                      className={cn(
                        "mb-2 flex h-12 w-12 items-center justify-center rounded-full",
                        item.color,
                      )}
                    >
                      {item.icon}
                    </div>
                    <span className="text-center text-xs font-medium">
                      {item.label}
                    </span>
                  </div>
                </motion.div>

                <dialog
                  id={`dialog-${index}`}
                  className="w-72 rounded-lg p-0 shadow-lg backdrop:bg-black/50"
                >
                  <div className="p-4">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-black hover:bg-black/20"
                        onClick={() => closeDialog(`dialog-${index}`)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {item.submenu?.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        href={subitem.link}
                        className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-purple-50"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                          {subitem.icon}
                        </div>
                        <span className="font-medium">{subitem.label}</span>
                      </Link>
                    ))}
                  </div>
                </dialog>
              </>
            ) : (
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={item.link}
                  className="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className={cn(
                      "mb-2 flex h-12 w-12 items-center justify-center rounded-full",
                      item.color,
                    )}
                  >
                    {item.icon}
                  </div>
                  <span className="text-center text-xs font-medium">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
