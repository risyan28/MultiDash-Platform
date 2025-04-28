import Link from "next/link"
import { CreditCard, Bell, Calendar } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"
import { cn } from "~/lib/utils"
import type { ActivityItem } from "./types"

export function RecentActivities() {
  const activities: ActivityItem[] = [
    {
      title: "Pembayaran Iuran Bulanan",
      desc: "Pembayaran iuran bulanan Juni 2023 berhasil",
      time: "Hari ini, 10:25",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pengumuman Baru",
      desc: "Admin telah menambahkan pengumuman baru",
      time: "Kemarin, 15:30",
      icon: <Bell className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pemeliharaan Taman",
      desc: "Jadwal pemeliharaan taman telah diperbarui",
      time: "2 hari lalu, 09:15",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <div className="container mx-auto mb-20 px-4 md:mb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Aktivitas Terbaru</h2>
        <Link href="#" className="text-sm font-medium text-purple-700 hover:text-purple-900">
          Lihat Semua
        </Link>
      </div>
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="space-y-4">
            {activities.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div
                  className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", item.color)}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
