import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Section Keunggulan Platform */}
        <section className="py-20 px-6 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Mengapa Memilih Platform Ini?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
              Belajar Struktur Data Lebih Nyata dan Terukur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-6">
                  👁️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Visualisasi Interaktif</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lihat langsung pergeseran variabel, proses partisi pivot, hingga penukaran memori secara proporsional di dalam kanvas visual.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold mb-6">
                  🏛️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Literatur IEEE & ACM</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tidak sekadar kode, setiap modul dilengkapi latar belakang akademis formal dari paper penemu asli (Hoare, Astrachan, Knuth).
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-bold mb-6">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Benchmark Serentak</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Uji performa komputasi algoritma O(n²) melawan O(n log n) secara bersamaan pada deret angka yang sama untuk melihat efisiensinya.
                </p>
              </div>
            </div>

            {/* Banner Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-10 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="text-left space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold">Siap Menjelajahi Seluruh Modul?</h3>
                <p className="text-slate-300 text-sm max-w-md">
                  Pilih materi teori di katalog atau langsung lompat ke dalam lab visualisasi interaktif.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 shrink-0">
                <Link 
                  href="/catalog" 
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  Buka Katalog Modul 📚
                </Link>
                <Link 
                  href="/comparison" 
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all"
                >
                  Bandingkan Algoritma ⚖️
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
