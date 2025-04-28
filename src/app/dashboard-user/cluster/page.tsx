"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogIn } from "lucide-react";

const heroImages = [
  "/images/perumahan.webp",
  "/images/perumahan2.webp",
  "/images/perumahan3.webp",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen scroll-smooth bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed left-0 top-0 z-30 w-full bg-white/30 shadow-md backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/50 px-3 py-1 font-bold text-gray-800">
            <span className="text-2xl">🏘️</span>
            <span>Cluster App</span>
          </div>
          <div className="hidden space-x-6 md:flex">
            {[
              { label: "Home", target: "#home" },
              { label: "About", target: "#about" },
              { label: "Fitur Utama", target: "#fitur" },
              { label: "Profil Pengurus", target: "#pengurus" },
              { label: "Lokasi", target: "#lokasi" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.target}
                className="font-medium text-gray-700 transition hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700"
              aria-label="Open Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute left-0 top-full z-20 flex w-full flex-col gap-4 bg-white/80 px-6 py-4 backdrop-blur-md md:hidden">
            {[
              { label: "Home", target: "#home" },
              { label: "About", target: "#about" },
              { label: "Fitur Utama", target: "#fitur" },
              { label: "Profil Pengurus", target: "#pengurus" },
              { label: "Lokasi", target: "#lokasi" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.target}
                className="text-lg font-medium text-gray-800 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section Carousel */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        {heroImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Gambar Perumahan ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 z-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl"
          >
            Selamat Datang di Portal Warga Harmony Residence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg drop-shadow md:text-xl"
          >
            Sistem Manajemen RT/RW Digital untuk Warga yang Lebih Terorganisir
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              href="cluster/app"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-gray-800 shadow-lg transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <LogIn className="h-5 w-5 text-gray-800 transition group-hover:text-white" />
              <span className="font-semibold">Masuk ke Aplikasi</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About the System */}
      <section
        id="about"
        className="flex h-[50vh] items-center justify-center bg-gradient-to-r from-sky-100 via-white to-sky-200"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 px-4 text-center text-3xl font-bold text-gray-700">
            Tentang Sistem Kami
          </h2>
          <p className="mx-auto max-w-3xl text-center text-xl font-bold text-gray-700">
            Aplikasi ini dirancang khusus untuk memudahkan pengurus RT/RW dalam
            mengelola data warga, kegiatan, informasi, dan layanan masyarakat.
            Dengan tampilan yang intuitif dan mudah digunakan, warga dapat
            terhubung lebih baik dengan pengurus lingkungan.
          </p>
        </motion.div>
      </section>

      {/* Fitur Utama */}
      <section
        id="fitur"
        className="max-w-8xl mx-auto bg-gradient-to-r from-sky-100 via-white to-sky-200 px-8 py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-10 whitespace-nowrap text-center text-3xl font-semibold">
            Fitur Utama Aplikasi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Data Warga",
              desc: "Mencatat dan mengelola data penduduk secara lengkap dan aman.",
            },
            {
              title: "Informasi & Pengumuman",
              desc: "Menyampaikan informasi penting dan pengumuman langsung ke warga.",
            },
            {
              title: "Laporan dan Aspirasi",
              desc: "Warga bisa menyampaikan keluhan atau usulan secara online.",
            },
            {
              title: "Agenda Kegiatan",
              desc: "Kelola dan informasikan kegiatan seperti kerja bakti, rapat, atau acara sosial.",
            },
            {
              title: "Pembayaran Iuran",
              desc: "Pantau dan kelola pembayaran iuran bulanan dengan mudah.",
            },
            {
              title: "Dokumen dan Surat",
              desc: "Permintaan surat pengantar dan dokumen administratif jadi lebih praktis.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-transform duration-300 hover:shadow-2xl"
            >
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Profil Pengurus */}
      <section
        id="pengurus"
        className="max-w-8xl mx-auto bg-gradient-to-r from-sky-100 via-white to-sky-200 px-8 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-10 whitespace-nowrap text-center text-2xl font-semibold sm:text-3xl md:text-3xl lg:text-4xl">
            Profil Pengurus RT & RW
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {[
            { role: "Ketua RW", name: "Pak Rudi" },
            { role: "Ketua RT 01", name: "Bu Sari" },
            { role: "Ketua RT 02", name: "Pak Joko" },
            { role: "Ketua RT 03", name: "Bu Lilis" },
          ].map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer rounded-2xl border bg-white p-6 text-center shadow-md transition-transform duration-300"
            >
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-200" />
              <h3 className="text-xl font-bold">{person.role}</h3>
              <p className="text-gray-600">{person.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Peta Lokasi */}
      <section
        id="lokasi"
        className="max-w-8xl mx-auto bg-gradient-to-r from-sky-100 via-white to-sky-200 px-8 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center text-3xl font-semibold"
        >
          Lokasi Perumahan
        </motion.h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-gray-700">
          Harmony Residence terletak di lokasi strategis dengan akses mudah ke
          berbagai fasilitas umum seperti sekolah, rumah sakit, dan pusat
          perbelanjaan.
        </p>
        <div className="h-96 w-full overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.8310241562484!2d-122.08424948469125!3d37.42206597982595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5b5eae5d89f%3A0xd8079d4f5b497d28!2sGoogleplex!5e0!3m2!1sen!2sus!4v1616890020134!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
