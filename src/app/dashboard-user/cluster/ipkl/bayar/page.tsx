"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Copy,
  Loader2,
  ShieldCheck,
  Info,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "~/components/ui/toaster";

type PaymentMethod = {
  id: string;
  name: string;
  logo: string;
  vaNumber?: string;
};

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<
    "select" | "process" | "complete"
  >("select");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Payment details
  const paymentDetails = {
    id: "IPKL-2023-06-001",
    amount: "Rp 350.000",
    period: "Juni 2023",
    dueDate: "23 Apr 2025, 12:21 WIB",
    customer: "A. RISYAN",
    address: "Blok Q25 No. 32",
  };

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "bca",
      name: "BCA Virtual Account",
      logo: "/images/bank-bca.png",
      vaNumber: "8277081234567890",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      logo: "/images/bank-mandiri.png",
      vaNumber: "8277081234567891",
    },
    {
      id: "bni",
      name: "BNI Virtual Account",
      logo: "/images/bank-bni.png",
      vaNumber: "8277081234567892",
    },
    {
      id: "bri",
      name: "BRI Virtual Account",
      logo: "/images/bank-bri.png",
      vaNumber: "8277081234567893",
    },
    {
      id: "permata",
      name: "Permata Virtual Account",
      logo: "/images/bank-permata.png",
      vaNumber: "8277081234567894",
    },
  ];

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin!",
      description: "Nomor Virtual Account telah disalin ke clipboard.",
    });
  };

  const handlePayment = () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    setPaymentStep("process");

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep("complete");
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header with theme from your image */}
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

      <div className="container mx-auto flex-1 p-4">
        <AnimatePresence mode="wait">
          {paymentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
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
              <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-blue-600">
                      Pilih Metode Pembayaran
                    </h2>
                    <p className="text-sm text-gray-500">
                      Bank Transfer Virtual Account
                    </p>
                  </div>
                  <RadioGroup
                    value={selectedMethod ?? ""}
                    onValueChange={setSelectedMethod}
                    className="divide-y"
                  >
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center p-4">
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="h-5 w-5 text-blue-600"
                        />
                        <Label
                          htmlFor={method.id}
                          className="ml-3 flex-1 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={method.logo}
                                width={32}
                                height={32}
                                alt={method.name}
                                className="h-8 w-8 object-contain"
                              />
                            </div>
                            <span className="font-medium">{method.name}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Secure Payment Notice */}
              <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Pembayaran Aman & Terjamin
                  </p>
                  <p className="text-xs text-green-600">
                    Semua transaksi diproses melalui gateway pembayaran yang
                    aman dan terenkripsi.
                  </p>
                </div>
              </div>

              {/* Payment Button - Eye-catching gradient */}
              <Button
                className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 py-6 text-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-600"
                disabled={!selectedMethod}
                onClick={handlePayment}
              >
                Bayar Sekarang
              </Button>
            </motion.div>
          )}

          {paymentStep === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  <h2 className="mt-4 text-xl font-bold">
                    Memproses Pembayaran
                  </h2>
                  <p className="text-gray-500">Mohon tunggu sebentar...</p>
                </>
              ) : (
                <div className="w-full space-y-6">
                  {/* Payment Instructions - Eye-catching header */}
                  <div className="rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
                    <h2 className="text-lg font-bold">Instruksi Pembayaran</h2>
                    <p className="text-sm opacity-90">
                      {
                        paymentMethods.find((m) => m.id === selectedMethod)
                          ?.name
                      }
                    </p>
                  </div>

                  {/* Virtual Account Details */}
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="mb-4 rounded-lg bg-gray-50 p-4">
                        <p className="mb-1 text-sm text-gray-500">
                          Nomor Virtual Account
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-lg font-bold">
                            {paymentMethods
                              .find((m) => m.id === selectedMethod)
                              ?.vaNumber?.match(/.{1,4}/g)
                              ?.join(" ")}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                paymentMethods.find(
                                  (m) => m.id === selectedMethod,
                                )?.vaNumber ?? "",
                              )
                            }
                            className="text-blue-600"
                          >
                            <Copy className="mr-1 h-4 w-4" />
                            Salin
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Tagihan</p>
                          <p className="text-lg font-bold text-blue-600">
                            {paymentDetails.amount}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Batas Waktu</p>
                          <p className="font-medium text-amber-600">
                            {paymentDetails.dueDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Notice - Eye-catching yellow */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-700">
                      Penting: Transfer Virtual Account hanya bisa dilakukan
                      dari bank yang kamu pilih
                    </p>
                    <p className="mt-1 text-xs text-amber-600">
                      Transaksi kamu baru akan diteruskan setelah pembayaran
                      berhasil diverifikasi.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      Lihat Cara Bayar
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                      Cek Status Bayar
                    </Button>
                  </div>
                </div>
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
                        {paymentMethods.find((m) => m.id === selectedMethod)
                          ?.name ?? "Virtual Account"}
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
