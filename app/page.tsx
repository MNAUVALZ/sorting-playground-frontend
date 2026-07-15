import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function Home() {
  const previewAlgos = [
    { name: "Bubble Sort", time: "O(n²)", desc: "Algoritma komparasi fundamental dengan metode pertukaran elemen bersebelahan secara berulang." },
    { name: "Selection Sort", time: "O(n²)", desc: "Optimalisasi penulisan memori dengan mencari nilai minimum absolut pada setiap iterasi." },
    { name: "Insertion Sort", time: "O(n²)", desc: "Sangat adaptif dan super cepat O(n) untuk data yang sudah terurut sebagian (nearly sorted)." },
    { name: "Quick Sort", time: "O(n log n)", desc: "Algoritma standar industri berbasis partisi Divide & Conquer yang sangat efisien." }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Section Keunggulan (Value Proposition) */}
        <section className="py-24 px-6 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Pendekatan Baru Belajar Algoritma
              </h2>
              <p className="text-slate-600 text-base">
                Platform ini menjembatani kesenjangan antara teori akademis di atas kertas dengan implementasi memori di dunia nyata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                  1
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Observasi Visual</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Saksikan langsung bagaimana variabel `pivot`, proses `swap`, dan komparasi bekerja lewat pergerakan balok dinamis tanpa harus membayangkan kode di kepala.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                  2
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Validasi Jurnal Ilmiah</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Setiap modul pembelajaran didukung penuh oleh abstrak dan referensi publikasi komputer resmi (IEEE, ACM SIGCSE) sebagai dasar teori yang kuat.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                  3
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Benchmark Serentak</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Buktikan sendiri perbedaan efisiensi algoritma O(n²) melawan O(n log n) dengan mengadunya di arena balap eksekusi serentak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section Preview Modul Algoritma */}
        <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Pustaka Algoritma Standar
                </h2>
                <p className="text-slate-600 max-w-lg">
                  Pelajari keempat algoritma pengurutan paling esensial dalam ilmu komputer dasar.
                </p>
              </div>
              <Link href="/catalog" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Lihat Semua Modul →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {previewAlgos.map((algo) => (
                <div key={algo.name} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-slate-900">{algo.name}</h3>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{algo.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 h-12 line-clamp-3">
                    {algo.desc}
                  </p>
                  <Link href="/catalog" className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    Baca Materi <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Bottom CTA (Call to Action Tunggal & Tegas) */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center bg-slate-900 rounded-[2rem] p-10 sm:p-16 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Dekorasi Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Siap Melakukan Eksperimen?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10">
                Pilih deret angka Anda sendiri, atur tempo kecepatan, dan saksikan mesin komputasi membongkar logika pengurutan langkah demi langkah.
              </p>
              
              {/* HANYA ADA 1 TOMBOL FOKUS DI SINI */}
              <Link 
                href="/playground" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                Buka Simulator Sekarang
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
