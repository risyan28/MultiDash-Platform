"use client";

import { useState } from "react";
import {
  Bell,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Receipt,
  ChevronRight,
  CalendarDays,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { motion } from "framer-motion";

export default function TagihanPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expanded, setExpanded] = useState(false);

  // Current IPKL data
  const currentIPKL = {
    id: 1,
    title: "Iuran Pemeliharaan Kawasan Lingkungan",
    amount: "Rp 350.000",
    dueDate: "30 Juni 2023",
    status: "Belum Dibayar",
    statusColor: "bg-amber-100 text-amber-600",
    icon: <Clock className="h-5 w-5" />,
    description:
      "Iuran rutin bulanan untuk pemeliharaan lingkungan dan fasilitas umum",
    category: "ipkl",
    daysLeft: 14,
    period: "Juni 2023",
    components: [
      { name: "Kebersihan", amount: "Rp 150.000" },
      { name: "Keamanan", amount: "Rp 100.000" },
      { name: "Pemeliharaan Taman", amount: "Rp 50.000" },
      { name: "Listrik Fasilitas Umum", amount: "Rp 50.000" },
    ],
  };

  // Payment history
  const paymentHistory = [
    {
      id: 5,
      title: "IPKL Mei 2023",
      amount: "Rp 350.000",
      dueDate: "31 Mei 2023",
      paidDate: "28 Mei 2023",
      status: "Lunas",
      statusColor: "bg-green-100 text-green-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Iuran rutin bulanan untuk pemeliharaan lingkungan",
      category: "ipkl",
      period: "Mei 2023",
      receiptNumber: "IPKL-2023-05-001",
    },
    {
      id: 6,
      title: "IPKL April 2023",
      amount: "Rp 350.000",
      dueDate: "30 April 2023",
      paidDate: "25 April 2023",
      status: "Lunas",
      statusColor: "bg-green-100 text-green-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Iuran rutin bulanan untuk pemeliharaan lingkungan",
      category: "ipkl",
      period: "April 2023",
      receiptNumber: "IPKL-2023-04-001",
    },
    {
      id: 7,
      title: "IPKL Maret 2023",
      amount: "Rp 350.000",
      dueDate: "31 Maret 2023",
      paidDate: "30 Maret 2023",
      status: "Lunas",
      statusColor: "bg-green-100 text-green-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Iuran rutin bulanan untuk pemeliharaan lingkungan",
      category: "ipkl",
      period: "Maret 2023",
      receiptNumber: "IPKL-2023-03-001",
    },
    {
      id: 8,
      title: "IPKL Februari 2023",
      amount: "Rp 350.000",
      dueDate: "28 Februari 2023",
      paidDate: "20 Februari 2023",
      status: "Lunas",
      statusColor: "bg-green-100 text-green-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Iuran rutin bulanan untuk pemeliharaan lingkungan",
      category: "ipkl",
      period: "Februari 2023",
      receiptNumber: "IPKL-2023-02-001",
    },
    {
      id: 9,
      title: "IPKL Januari 2023",
      amount: "Rp 350.000",
      dueDate: "31 Januari 2023",
      paidDate: "15 Januari 2023",
      status: "Lunas",
      statusColor: "bg-green-100 text-green-600",
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: "Iuran rutin bulanan untuk pemeliharaan lingkungan",
      category: "ipkl",
      period: "Januari 2023",
      receiptNumber: "IPKL-2023-01-001",
    },
  ];

  // Calculate progress for due date
  const calculateProgress = () => {
    // Assuming a 30-day month for simplicity
    const progress = ((30 - currentIPKL.daysLeft) / 30) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ensure between 0-100
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-600 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard-user/cluster/app"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Kembali</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/20"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tagihan IPKL</h1>
          <p className="text-gray-500">Iuran Pemeliharaan Kawasan Lingkungan</p>
        </div>

        {/* Current IPKL Payment Card - More compact and elegant */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 overflow-hidden border-none bg-white shadow-lg">
            <CardContent className="p-0">
              {/* Top section with gradient background */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2 bg-white/20 text-white hover:bg-white/30">
                      Periode {currentIPKL.period}
                    </Badge>
                    <h2 className="text-xl font-bold">IPKL</h2>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-xs text-white/80">Total Tagihan</p>
                    <p className="text-2xl font-bold">{currentIPKL.amount}</p>
                  </div>
                </div>
              </div>

              {/* Middle section with countdown and progress */}
              <div className="border-b p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Jatuh tempo: {currentIPKL.dueDate}
                    </span>
                  </div>
                  <Badge className={cn("text-xs", currentIPKL.statusColor)}>
                    {currentIPKL.status}
                  </Badge>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-600">
                    {currentIPKL.daysLeft}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      Hari lagi sebelum jatuh tempo
                    </p>
                    <Progress
                      value={calculateProgress()}
                      className="mt-1 h-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom section with action button */}
              <div className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                  >
                    {expanded ? "Sembunyikan rincian" : "Lihat rincian tagihan"}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expanded ? "rotate-90" : "",
                      )}
                    />
                  </button>
                  <Link href="/dashboard-user/cluster/ipkl/bayar">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 sm:w-auto">
                      <Wallet className="mr-2 h-4 w-4" /> Bayar Sekarang
                    </Button>
                  </Link>
                </div>

                {/* Expandable details section */}
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 border-t pt-4"
                  >
                    <h3 className="mb-3 text-sm font-medium text-gray-700">
                      Rincian Tagihan:
                    </h3>
                    <div className="space-y-2">
                      {currentIPKL.components.map((component, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-600">
                            {component.name}
                          </span>
                          <span className="text-sm font-medium">
                            {component.amount}
                          </span>
                        </div>
                      ))}
                      <div className="mt-2 border-t pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total</span>
                          <span className="text-sm font-bold text-purple-700">
                            {currentIPKL.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment History - More elegant and compact */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Riwayat Pembayaran</h2>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="mx-auto mb-4 grid w-full max-w-xs grid-cols-3">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="2023">2023</TabsTrigger>
              <TabsTrigger value="2022">2022</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-2 space-y-3">
              {paymentHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border-none shadow-sm transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center border-l-4 border-green-500 p-3">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {item.title}
                            </h3>
                            <p className="font-bold">{item.amount}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Dibayar: {item.paidDate}</span>
                            <span className="text-gray-300">•</span>
                            <Receipt className="h-3 w-3" />
                            <span>{item.receiptNumber}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="2023" className="mt-2 space-y-3">
              {paymentHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border-none shadow-sm transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center border-l-4 border-green-500 p-3">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {item.title}
                            </h3>
                            <p className="font-bold">{item.amount}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Dibayar: {item.paidDate}</span>
                            <span className="text-gray-300">•</span>
                            <Receipt className="h-3 w-3" />
                            <span>{item.receiptNumber}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="2022" className="mt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium text-gray-500">
                  Tidak ada data untuk tahun 2022
                </h3>
                <p className="text-sm text-gray-400">
                  Riwayat pembayaran untuk tahun 2022 tidak tersedia
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button variant="outline" className="gap-2">
              Lihat Semua Riwayat <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
