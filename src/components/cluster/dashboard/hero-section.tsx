"use client";

import { Button } from "~/components/ui/button";
import { Wallet } from "lucide-react";
import type { HeroSectionProps } from "./types";

export function HeroSection({
  userName = "A. Risyan",
  billAmount = "Rp 350.000",
}: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-b from-indigo-600 to-indigo-500 text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold md:text-2xl">
              Selamat Datang, {userName}!
            </h2>
            <p className="mb-2 text-sm opacity-90">
              Akses semua informasi dan layanan cluster Anda di satu tempat.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="h-7 bg-white text-xs text-indigo-600 hover:bg-white/90"
              >
                Lihat Pengumuman
              </Button>
              <Button
                size="sm"
                className="h-7 bg-white text-xs text-indigo-600 hover:bg-white/90"
              >
                Lapor Masalah
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-[280px]">
            {/* Notification Banner for Billing - ultra compact */}
            <div className="w-fit rounded-lg border border-white/10 bg-white/10 p-2 shadow-md backdrop-blur-sm transition">
              <div className="flex items-center justify-between">
                {/* Icon + Text */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-nowrap text-[13px] text-white/80">
                      Tagihan Bulan Ini
                    </p>
                    <p className="text-xl font-bold text-white">{billAmount}</p>
                  </div>
                </div>

                {/* Button */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="ml-1 mt-5 h-8 px-2 text-[14px]"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard-user/cluster/ipkl/bayar")
                  }
                >
                  Bayar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
