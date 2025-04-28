import Link from "next/link";
import { Home, Calendar, MessageSquare, Wallet, User } from "lucide-react";
import type { BottomNavigationProps } from "./types";

export function BottomNavigation({}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-2 shadow-lg md:hidden">
      <div className="flex justify-around">
        <Link href="/" className="flex flex-col items-center text-xs">
          <div className="flex h-6 w-6 items-center justify-center text-purple-700">
            <Home className="h-5 w-5" />
          </div>
          <span>Beranda</span>
        </Link>
        <Link href="/acara" className="flex flex-col items-center text-xs">
          <div className="flex h-6 w-6 items-center justify-center text-gray-500">
            <Calendar className="h-5 w-5" />
          </div>
          <span>Jadwal</span>
        </Link>
        <Link href="/pengumuman" className="flex flex-col items-center">
          <div className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
            <MessageSquare className="h-6 w-6" />
          </div>
        </Link>
        <Link
          href="/keuangan/tagihan"
          className="flex flex-col items-center text-xs"
        >
          <div className="flex h-6 w-6 items-center justify-center text-gray-500">
            <Wallet className="h-5 w-5" />
          </div>
          <span>Keuangan</span>
        </Link>
        <Link href="/profil" className="flex flex-col items-center text-xs">
          <div className="flex h-6 w-6 items-center justify-center text-gray-500">
            <User className="h-5 w-5" />
          </div>
          <span>Profil</span>
        </Link>
      </div>
    </div>
  );
}
