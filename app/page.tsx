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

        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eksplorasi Fitur</h2>
            <p className="text-slate-600 text-sm mt-2">Ringkasan akses cepat ke seluruh kapabilitas platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/catalog" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Modul Pembelajaran</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Silabus materi komprehensif, analogi dunia nyata, analisis kompleksitas matematis (Big-O), lengkap dengan kuis evaluasi.
              </p>
            </Link>

            <Link href="/playground" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Simulator</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Kanvas animasi pengurutan array visual, mode komparasi serentak, dan Trace Table untuk melacak riwayat memori.
              </p>
            </Link>

            <Link href="/toolkit" className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold mb-4 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">Toolkit Akademis</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Kumpulan cuplikan kode implementasi berbagai bahasa (Java, Python, C++, PHP) dan fitur ekspor laporan PDF.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
