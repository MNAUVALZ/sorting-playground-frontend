import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eksplorasi Fitur</h2>
            <p className="text-slate-600 text-sm mt-2">Ringkasan akses cepat ke seluruh kapabilitas platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/catalog" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Modul Teori</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Silabus materi komprehensif, analogi dunia nyata, analisis kompleksitas, lengkap dengan kuis evaluasi.
              </p>
            </Link>

            <Link href="/playground" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-amber-100 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Simulator & Balap</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Kanvas animasi pengurutan array In-Place, mode komparasi serentak, dan Trace Table log memori.
              </p>
            </Link>

            <Link href="/catalog" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Grafik Big-O</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Visualisasi interaktif matematis perbandingan batas waktu O(n²) melawan O(n log n).
              </p>
            </Link>

            <Link href="/toolkit" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Toolkit Akademis</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Kumpulan cuplikan kode implementasi berbagai bahasa (Java, Python, C++, PHP) dan panduan ekspor PDF.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
