"use client";

import { useState } from "react";
import {
  Bell,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Building,
  CreditCardIcon,
  Smartphone,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Image from "next/image";

export default function MetodePembayaranPage() {
  const [defaultMethod, setDefaultMethod] = useState(1);

  const paymentMethods = [
    {
      id: 1,
      type: "bank",
      name: "Bank BCA",
      number: "••••••8901",
      logo: "/placeholder.svg?height=40&width=40&text=BCA",
      expiry: "09/25",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      icon: <Building className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "card",
      name: "Visa",
      number: "••••••4567",
      logo: "/placeholder.svg?height=40&width=40&text=VISA",
      expiry: "12/24",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      icon: <CreditCardIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "ewallet",
      name: "GoPay",
      number: "0812****7890",
      logo: "/placeholder.svg?height=40&width=40&text=GOPAY",
      expiry: null,
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      id: 4,
      type: "ewallet",
      name: "OVO",
      number: "0812****7891",
      logo: "/placeholder.svg?height=40&width=40&text=OVO",
      expiry: null,
      status: "Tidak Aktif",
      statusColor: "bg-red-100 text-red-600",
      icon: <Smartphone className="h-5 w-5" />,
    },
  ];

  const setAsDefault = (id: number) => {
    setDefaultMethod(id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-600 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard-user/cluster/ipkl/"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Kembali ke Keuangan</span>
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
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Metode Pembayaran</h1>
            <p className="text-gray-500">Kelola metode pembayaran Anda</p>
          </div>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" /> Tambah Metode Baru
          </Button>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={cn(
                "overflow-hidden border-none shadow-sm transition-shadow hover:shadow-md",
                defaultMethod === method.id ? "ring-2 ring-purple-500" : "",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={method.logo ?? "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={method.name}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="mb-1 font-medium text-gray-900">
                        {method.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setAsDefault(method.id)}
                          >
                            Set sebagai Utama
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full",
                          method.statusColor,
                        )}
                      >
                        {method.icon}
                      </div>
                      <p className="text-sm text-gray-600">{method.number}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={cn("text-xs", method.statusColor)}>
                        {method.status}
                      </Badge>
                      {defaultMethod === method.id && (
                        <Badge className="bg-purple-100 text-xs text-purple-600">
                          Utama
                        </Badge>
                      )}
                    </div>
                    {method.expiry && (
                      <p className="mt-2 text-xs text-gray-500">
                        Berlaku hingga: {method.expiry}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-0">
                <div className="grid w-full grid-cols-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-center gap-1 rounded-none py-3 text-xs"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-center gap-1 rounded-none border-l py-3 text-xs text-red-600"
                  >
                    <Trash2 className="h-4 w-4" /> Hapus
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          {/* Add New Payment Method Card */}
          <Card className="flex h-[200px] cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-1 font-medium text-gray-900">
                Tambah Metode Pembayaran
              </h3>
              <p className="text-sm text-gray-500">
                Tambahkan kartu kredit, rekening bank, atau e-wallet
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Tips */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Tips Pembayaran</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-none bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-gray-900">
                      Pembayaran Otomatis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Aktifkan pembayaran otomatis untuk menghindari
                      keterlambatan pembayaran tagihan bulanan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-gray-900">
                      Keamanan Pembayaran
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pastikan Anda hanya menggunakan metode pembayaran yang
                      terdaftar di aplikasi resmi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
