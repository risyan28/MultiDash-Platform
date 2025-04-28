import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { AnnouncementItem } from "./types";
import { motion } from "framer-motion";

export function AnnouncementsEvents() {
  const announcements: AnnouncementItem[] = [
    {
      title: "Rapat Warga Bulanan",
      date: "Minggu, 15 Juni 2023 · 09:00 WIB",
      description:
        "Rapat bulanan untuk membahas program kerja dan evaluasi kegiatan bulan lalu.",
      image: "/images/meeting.jpg?height=200&width=400",
      badgeText: "Penting",
      badgeColor: "bg-red-500 text-white",
    },
    {
      title: "Kerja Bakti Lingkungan",
      date: "Sabtu, 21 Juni 2023 · 07:00 WIB",
      description:
        "Mari bergotong royong membersihkan lingkungan untuk menciptakan suasana yang nyaman.",
      image: "/images/kerja-bakti.jpg?height=200&width=400",
      badgeText: "Acara",
      badgeColor: "bg-green-500 text-white",
    },
  ];

  return (
    <div className="container mx-auto mb-6 px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Pengumuman & Acara</h2>
        <Link
          href="/pengumuman"
          className="text-sm font-medium text-purple-700 hover:text-purple-900"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {announcements.map((item, index) => (
          <motion.div
            key={index}
            className="w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            {" "}
            <Card
              key={index}
              className="overflow-hidden border-none shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image ?? "https://picsum.photos/400/200"}
                    width={400}
                    height={200}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className={item.badgeColor}>{item.badgeText}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-2 text-sm text-gray-600">{item.date}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
