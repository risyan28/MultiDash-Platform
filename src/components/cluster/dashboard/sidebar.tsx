"use client"
import Link from "next/link"
import {
  X,
  Home,
  Megaphone,
  Wallet,
  FileText,
  Building,
  ShieldCheck,
  Users,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import type { SidebarProps } from "./types"

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Component content remains the same
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-72 transform border-r bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Component content remains the same */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-600 to-indigo-600 font-bold text-white">
            C
          </div>
          <h1 className="text-xl font-bold text-gray-800">Cluster App</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="mb-6 px-4">
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-bold">A. RISYAN</h2>
              <p className="text-xs text-gray-500">risyan25~gmail.com</p>
            </div>
          </div>
        </div>

        {/* Rest of the sidebar content remains unchanged */}
        <div className="mb-2 px-3">
          <p className="mb-2 px-3 text-xs font-medium text-gray-500">MENU UTAMA</p>
        </div>
        <nav className="space-y-1 px-3">
          <Link href="/" className="flex items-center gap-3 rounded-md bg-purple-50 px-3 py-2 text-purple-700">
            <Home className="h-5 w-5" />
            <span className="font-medium">Beranda</span>
          </Link>

          {/* Pengumuman & Informasi */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5" />
                <span className="font-medium">Pengumuman & Info</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/pengumuman"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Pengumuman Resmi</span>
              </Link>
              <Link
                href="/berita"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Berita Komunitas</span>
              </Link>
              <Link
                href="/acara"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Jadwal Acara</span>
              </Link>
              <Link
                href="/peraturan"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Peraturan</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Keuangan */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5" />
                <span className="font-medium">Keuangan</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/keuangan/tagihan"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Tagihan</span>
              </Link>
              <Link
                href="/keuangan/pembayaran"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Riwayat Pembayaran</span>
              </Link>
              <Link
                href="/keuangan/laporan"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Laporan Keuangan</span>
              </Link>
              <Link
                href="/keuangan/anggaran"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Anggaran</span>
              </Link>
              <Link
                href="/keuangan/metode"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Metode Pembayaran</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Dokumen */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Dokumen</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/dokumen/surat"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Surat Pengantar</span>
              </Link>
              <Link
                href="/dokumen/izin"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Izin Renovasi</span>
              </Link>
              <Link
                href="/dokumen/arsip"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Arsip Dokumen</span>
              </Link>
              <Link
                href="/dokumen/template"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Template Dokumen</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Fasilitas */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5" />
                <span className="font-medium">Fasilitas</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/fasilitas/booking"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Booking Fasilitas</span>
              </Link>
              <Link
                href="/fasilitas/jadwal"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Jadwal Pemeliharaan</span>
              </Link>
              <Link
                href="/fasilitas/lapor"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Lapor Kerusakan</span>
              </Link>
              <Link
                href="/fasilitas/inventaris"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Inventaris</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Keamanan */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-medium">Keamanan</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/keamanan/tamu"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Manajemen Tamu</span>
              </Link>
              <Link
                href="/keamanan/akses"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Kartu Akses</span>
              </Link>
              <Link
                href="/keamanan/laporan"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Laporan Kejadian</span>
              </Link>
              <Link
                href="/keamanan/ronda"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Jadwal Ronda</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Komunitas */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <span className="font-medium">Komunitas</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 pl-10">
              <Link
                href="/komunitas/direktori"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Direktori Warga</span>
              </Link>
              <Link
                href="/komunitas/forum"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Forum Diskusi</span>
              </Link>
              <Link
                href="/komunitas/marketplace"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Marketplace Lokal</span>
              </Link>
              <Link
                href="/komunitas/polling"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Polling & Voting</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* Settings menu remains unchanged */}
        <div className="mb-2 mt-6 px-3">
          <p className="mb-2 px-3 text-xs font-medium text-gray-500">PENGATURAN</p>
        </div>
        <nav className="space-y-1 px-3">
          <Link href="/profil" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
            <User className="h-5 w-5" />
            <span className="font-medium">Profil Saya</span>
          </Link>
          <Link
            href="/pengaturan"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Pengaturan</span>
          </Link>
          <Link href="/bantuan" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
            <HelpCircle className="h-5 w-5" />
            <span className="font-medium">Bantuan</span>
          </Link>
        </nav>

        <div className="mt-8 px-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Tutup Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
