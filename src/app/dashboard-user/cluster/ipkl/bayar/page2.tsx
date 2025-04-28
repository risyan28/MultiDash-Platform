"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Copy,
  Info,
  Loader2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Building,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

// Update import for toast
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "~/components/ui/toaster";

// Replace the existing toast import
// import { toast } from "~/components/ui/use-toast"

// Payment method types
type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ReactNode;
  logo?: string;
  type: "va" | "ewallet" | "qris";
  isPopular?: boolean;
};

// Add the useToast hook at the component level
export default function PaymentPage() {
  const [selectedCategory, setSelectedCategory] = useState("va");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "select" | "process" | "complete"
  >("select");
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const { toast } = useToast(); // Add this line to use the new toast hook

  // Payment details
  const paymentDetails = {
    id: "IPKL-2023-06-001",
    amount: "Rp 350.000",
    period: "Juni 2023",
    dueDate: "30 Juni 2023",
    customer: "A. RISYAN",
    address: "Blok Q25 No. 32",
  };

  // Payment methods
  const paymentMethods: Record<string, PaymentMethod[]> = {
    va: [
      {
        id: "bca",
        name: "BCA Virtual Account",
        icon: <Building className="h-5 w-5" />,
        logo: "/images/bank-bca.png?height=40&width=40&text=BCA",
        type: "va",
        isPopular: true,
      },
      {
        id: "mandiri",
        name: "Mandiri Virtual Account",
        icon: <Building className="h-5 w-5" />,
        logo: "/images/bank-mandiri.png?height=40&width=40&text=MANDIRI",
        type: "va",
      },
      {
        id: "bni",
        name: "BNI Virtual Account",
        icon: <Building className="h-5 w-5" />,
        logo: "/images/bank-bni.png?height=40&width=40&text=BNI",
        type: "va",
      },
      {
        id: "bri",
        name: "BRI Virtual Account",
        icon: <Building className="h-5 w-5" />,
        logo: "/images/bank-bri.png?height=40&width=40&text=BRI",
        type: "va",
      },
      {
        id: "permata",
        name: "Permata Virtual Account",
        icon: <Building className="h-5 w-5" />,
        logo: "/images/bank-permata.png?height=40&width=40&text=PERMATA",
        type: "va",
      },
    ],
    ewallet: [
      {
        id: "gopay",
        name: "GoPay",
        icon: <Smartphone className="h-5 w-5" />,
        logo: "/images/gopay.png?height=40&width=40&text=GOPAY",
        type: "ewallet",
        isPopular: true,
      },
      {
        id: "ovo",
        name: "OVO",
        icon: <Smartphone className="h-5 w-5" />,
        logo: "/images/ovo.png?height=40&width=40&text=OVO",
        type: "ewallet",
      },
      {
        id: "dana",
        name: "DANA",
        icon: <Smartphone className="h-5 w-5" />,
        logo: "/images/dana.png?height=40&width=40&text=DANA",
        type: "ewallet",
      },
      {
        id: "shopeepay",
        name: "ShopeePay",
        icon: <Smartphone className="h-5 w-5" />,
        logo: "/images/shopepay.png?height=40&width=40&text=SHOPEEPAY",
        type: "ewallet",
      },
      {
        id: "linkaja",
        name: "LinkAja",
        icon: <Smartphone className="h-5 w-5" />,
        logo: "/images/linkaja.webp?height=40&width=40&text=LINKAJA",
        type: "ewallet",
      },
    ],
    qris: [
      {
        id: "qris",
        name: "QRIS",
        icon: <QrCode className="h-5 w-5" />,
        logo: "/images/qris.webp?height=40&width=40&text=QRIS",
        type: "qris",
        isPopular: true,
      },
    ],
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle payment method selection
  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentStep("process");
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep("complete");
    }, 2000);
  };

  // Update the copyToClipboard function to use the new toast implementation
  const copyToClipboard = async (text: string) => {
    // Menambahkan async
    await navigator.clipboard.writeText(text); // Menunggu Promise
    toast({
      title: "Berhasil disalin!",
      description: "Nomor Virtual Account telah disalin ke clipboard.",
    });
  };

  // Countdown timer effect
  useEffect(() => {
    if (paymentStep === "process" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, paymentStep]);

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
    visible: { y: 0, opacity: 1 },
  };

  // Add the Toaster component at the end of the return statement, just before the closing div
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-600 p-4 text-white">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard-user/cluster/ipkl"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Kembali</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-3xl flex-1 p-4 md:p-6">
        <AnimatePresence mode="wait">
          {paymentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Payment Summary */}
              <Card className="mb-6 border-none shadow-md">
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Detail Pembayaran</h2>
                      <p className="text-sm text-gray-500">
                        IPKL Periode {paymentDetails.period}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-purple-700">
                        {paymentDetails.amount}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID Pembayaran</span>
                      <span className="font-medium">{paymentDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nama</span>
                      <span className="font-medium">
                        {paymentDetails.customer}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Alamat</span>
                      <span className="font-medium">
                        {paymentDetails.address}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="mb-6">
                <h2 className="mb-4 text-lg font-bold">
                  Pilih Metode Pembayaran
                </h2>

                <Tabs
                  defaultValue="va"
                  className="w-full"
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="mb-3 grid grid-cols-3">
                    <TabsTrigger value="va">Bank VA</TabsTrigger>
                    <TabsTrigger value="ewallet">E-Wallet</TabsTrigger>
                    <TabsTrigger value="qris">QRIS</TabsTrigger>
                  </TabsList>

                  <TabsContent value="va" className="mt-0">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {paymentMethods.va?.map((method) => (
                        <motion.div key={method.id} variants={itemVariants}>
                          <PaymentMethodCard
                            method={method}
                            onSelect={handleSelectMethod}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="ewallet" className="mt-0">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {paymentMethods.ewallet?.map((method) => (
                        <motion.div key={method.id} variants={itemVariants}>
                          <PaymentMethodCard
                            method={method}
                            onSelect={handleSelectMethod}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="qris" className="mt-0">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {paymentMethods.qris?.map((method) => (
                        <motion.div key={method.id} variants={itemVariants}>
                          <PaymentMethodCard
                            method={method}
                            onSelect={handleSelectMethod}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Secure Payment Notice */}
              <div className="mt-4 flex items-center space-x-2 rounded-b-lg bg-green-600 p-4 text-white">
                <ShieldCheck className="mt-0.5 h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-md mb-1 font-medium text-white">
                    Pembayaran Aman & Terjamin
                  </p>
                  <p className="text-xs text-white">
                    Semua transaksi diproses melalui gateway pembayaran Midtrans
                    yang aman dan terenkripsi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {paymentStep === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {isProcessing ? (
                <div className="py-12 text-center">
                  <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-purple-600" />
                  <h2 className="mb-2 text-xl font-bold">
                    Memproses Pembayaran
                  </h2>
                  <p className="text-gray-500">Mohon tunggu sebentar...</p>
                </div>
              ) : (
                <>
                  {/* Virtual Account Payment Instructions */}
                  {selectedMethod?.type === "va" && (
                    <Card className="mb-6 w-full border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={selectedMethod.logo ?? "/placeholder.svg"}
                                width={40}
                                height={40}
                                alt={selectedMethod.name}
                              />
                            </div>
                            <div>
                              <h2 className="font-bold">
                                {selectedMethod.name}
                              </h2>
                              <p className="text-sm text-gray-500">
                                Nomor Virtual Account
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-4">
                          <div className="flex items-center justify-between">
                            <p className="font-mono text-lg font-bold">
                              8277 0812 3456 7890
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard("8277081234567890")
                              }
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Pembayaran
                            </p>
                            <p className="text-xl font-bold text-purple-700">
                              {paymentDetails.amount}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Batas Waktu Pembayaran
                            </p>
                            <p className="text-lg font-bold text-amber-600">
                              {formatTime(countdown)}
                            </p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="mb-2 font-medium">Cara Pembayaran:</h3>
                          <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-600">
                            <li>
                              Buka aplikasi m-banking{" "}
                              {selectedMethod.name.split(" ")[0]}
                            </li>
                            <li>Pilih menu Transfer atau Pembayaran</li>
                            <li>Pilih menu Virtual Account</li>
                            <li>
                              Masukkan nomor Virtual Account:{" "}
                              <span className="font-medium">
                                8277 0812 3456 7890
                              </span>
                            </li>
                            <li>
                              Konfirmasi detail pembayaran dan selesaikan
                              transaksi
                            </li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* E-Wallet Payment Instructions */}
                  {selectedMethod?.type === "ewallet" && (
                    <Card className="mb-6 w-full border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={selectedMethod.logo ?? "/placeholder.svg"}
                                width={40}
                                height={40}
                                alt={selectedMethod.name}
                              />
                            </div>
                            <div>
                              <h2 className="font-bold">
                                {selectedMethod.name}
                              </h2>
                              <p className="text-sm text-gray-500">
                                Pembayaran Digital
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-4 text-center">
                          <p className="mb-2 text-sm text-gray-500">
                            Scan QR Code dengan aplikasi {selectedMethod.name}
                          </p>
                          <div className="mx-auto h-48 w-48 rounded-lg bg-white p-2 shadow-sm">
                            <Image
                              src="/placeholder.svg?height=180&width=180&text=QR"
                              width={180}
                              height={180}
                              alt="QR Code"
                              className="mx-auto"
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Pembayaran
                            </p>
                            <p className="text-xl font-bold text-purple-700">
                              {paymentDetails.amount}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Batas Waktu Pembayaran
                            </p>
                            <p className="text-lg font-bold text-amber-600">
                              {formatTime(countdown)}
                            </p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="mb-2 font-medium">Cara Pembayaran:</h3>
                          <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-600">
                            <li>
                              Buka aplikasi {selectedMethod.name} di smartphone
                              Anda
                            </li>
                            <li>Pilih menu Scan atau Pay</li>
                            <li>Scan QR Code yang ditampilkan</li>
                            <li>Periksa detail pembayaran dan konfirmasi</li>
                            <li>
                              Masukkan PIN atau metode otentikasi lainnya untuk
                              menyelesaikan pembayaran
                            </li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* QRIS Payment Instructions */}
                  {selectedMethod?.type === "qris" && (
                    <Card className="mb-6 w-full border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={selectedMethod.logo ?? "/placeholder.svg"}
                                width={40}
                                height={40}
                                alt={selectedMethod.name}
                              />
                            </div>
                            <div>
                              <h2 className="font-bold">
                                {selectedMethod.name}
                              </h2>
                              <p className="text-sm text-gray-500">
                                Quick Response Code Indonesian Standard
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-4 text-center">
                          <p className="mb-2 text-sm text-gray-500">
                            Scan dengan aplikasi e-wallet atau m-banking
                          </p>
                          <div className="mx-auto h-48 w-48 rounded-lg bg-white p-2 shadow-sm">
                            <Image
                              src="/placeholder.svg?height=180&width=180&text=QRIS"
                              width={180}
                              height={180}
                              alt="QRIS Code"
                              className="mx-auto"
                            />
                          </div>
                          <p className="mt-2 text-xs text-gray-400">
                            QRIS dapat digunakan dengan GoPay, OVO, DANA,
                            LinkAja, ShopeePay, dan aplikasi lainnya
                          </p>
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Pembayaran
                            </p>
                            <p className="text-xl font-bold text-purple-700">
                              {paymentDetails.amount}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Batas Waktu Pembayaran
                            </p>
                            <p className="text-lg font-bold text-amber-600">
                              {formatTime(countdown)}
                            </p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="mb-2 font-medium">Cara Pembayaran:</h3>
                          <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-600">
                            <li>
                              Buka aplikasi e-wallet atau m-banking pilihan Anda
                            </li>
                            <li>Pilih menu Scan atau Pay with QRIS</li>
                            <li>Scan QRIS Code yang ditampilkan</li>
                            <li>Periksa detail pembayaran dan konfirmasi</li>
                            <li>
                              Masukkan PIN atau metode otentikasi lainnya untuk
                              menyelesaikan pembayaran
                            </li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex w-full gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setPaymentStep("select")}
                    >
                      Ganti Metode Pembayaran
                    </Button>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => setPaymentStep("complete")}
                    >
                      Saya Sudah Bayar
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {paymentStep === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Pembayaran Berhasil!</h2>
              <p className="mb-6 text-gray-500">
                Terima kasih, pembayaran IPKL Anda telah diterima.
              </p>

              <Card className="mb-6 w-full max-w-md border-none shadow-md">
                <CardContent className="p-4">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ID Pembayaran</span>
                      <span className="font-medium">{paymentDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Metode Pembayaran</span>
                      <span className="font-medium">
                        {selectedMethod?.name ?? "Virtual Account"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tanggal</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Waktu</span>
                      <span className="font-medium">
                        {new Date().toLocaleTimeString("id-ID")}
                      </span>
                    </div>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-purple-700">
                          {paymentDetails.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex w-full max-w-md gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.print()}
                >
                  Cetak Bukti
                </Button>
                <Link href="/dashboard-user/cluster/ipkl" className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Kembali ke Tagihan
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex max-w-md items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-left">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-700">
                    Pembayaran Berhasil Diproses
                  </p>
                  <p className="text-xs text-blue-600">
                    Status pembayaran IPKL Anda telah diperbarui. Anda dapat
                    melihat riwayat pembayaran di halaman tagihan.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  );
}

// Payment Method Card Component
function PaymentMethodCard({
  method,
  onSelect,
}: {
  method: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}) {
  return (
    <Card
      className="cursor-pointer overflow-hidden border border-gray-200 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
      onClick={() => onSelect(method)}
    >
      <CardContent className="p-0">
        <div className="flex items-center p-3">
          <div className="mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={method.logo ?? "/placeholder.svg"}
              width={32}
              height={32}
              alt={method.name}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{method.name}</h3>
          </div>
          {method.isPopular && (
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              Populer
            </Badge>
          )}
          <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
