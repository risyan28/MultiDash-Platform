"use client";

import { useState } from "react";
import {
  Bell,
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  User,
  UserPlus,
  MessageSquare,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DirektoriPage() {
  const [activeTab, setActiveTab] = useState("semua");

  const warga = [
    {
      id: 1,
      name: "Ahmad Rizky",
      address: "Blok A2 No. 15",
      email: "ahmad.rizky~gmail.com",
      phone: "081234567890",
      role: "Ketua RT",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "pengurus",
    },
    {
      id: 2,
      name: "Budi Santoso",
      address: "Blok B3 No. 7",
      email: "budi.santoso~gmail.com",
      phone: "081234567891",
      role: "Sekretaris",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "pengurus",
    },
    {
      id: 3,
      name: "Citra Dewi",
      address: "Blok A1 No. 3",
      email: "citra.dewi~gmail.com",
      phone: "081234567892",
      role: "Bendahara",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "pengurus",
    },
    {
      id: 4,
      name: "Deni Hermawan",
      address: "Blok C2 No. 10",
      email: "deni.hermawan~gmail.com",
      phone: "081234567893",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
    {
      id: 5,
      name: "Eka Putri",
      address: "Blok B1 No. 5",
      email: "eka.putri~gmail.com",
      phone: "081234567894",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
    {
      id: 6,
      name: "Fajar Nugroho",
      address: "Blok A3 No. 12",
      email: "fajar.nugroho~gmail.com",
      phone: "081234567895",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
    {
      id: 7,
      name: "Gita Nirmala",
      address: "Blok C1 No. 8",
      email: "gita.nirmala~gmail.com",
      phone: "081234567896",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
    {
      id: 8,
      name: "Hendra Wijaya",
      address: "Blok B2 No. 9",
      email: "hendra.wijaya~gmail.com",
      phone: "081234567897",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
    {
      id: 9,
      name: "Indah Permata",
      address: "Blok A4 No. 2",
      email: "indah.permata~gmail.com",
      phone: "081234567898",
      role: "Warga",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-600",
      category: "warga",
    },
  ];

  const filteredWarga =
    activeTab === "semua"
      ? warga
      : warga.filter((item) => item.category === activeTab);

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
              <span className="font-medium">Kembali ke Home</span>
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
            <h1 className="text-2xl font-bold">Daftar Warga</h1>
            <p className="text-gray-500">Daftar warga dan pengurus</p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="mb-6 border-none bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Total Warga</h3>
                  <p className="text-2xl font-bold text-indigo-600">42</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:border-l md:border-indigo-200 md:pl-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Kepala Keluarga</h3>
                  <p className="text-2xl font-bold text-purple-600">15</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:border-l md:border-indigo-200 md:pl-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pengurus</h3>
                  <p className="text-2xl font-bold text-blue-600">5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Cari warga..."
              className="bg-white pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Semua Warga</DropdownMenuItem>
              <DropdownMenuItem>Pengurus</DropdownMenuItem>
              <DropdownMenuItem>Kepala Keluarga</DropdownMenuItem>
              <DropdownMenuItem>Blok A</DropdownMenuItem>
              <DropdownMenuItem>Blok B</DropdownMenuItem>
              <DropdownMenuItem>Blok C</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="semua"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:w-fit">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="pengurus">Pengurus</TabsTrigger>
            <TabsTrigger value="warga">Warga</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Warga List */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWarga.map((item) => (
            <Card
              key={item.id}
              className="border-none shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-14 w-14 ring-2 ring-purple-400">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                      alt={item.name}
                    />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="mb-1 font-medium text-gray-900">
                        {item.name}
                      </h3>
                    </div>
                    <Badge className="mb-2">{item.role}</Badge>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-600">{item.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-600">{item.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-600">{item.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
