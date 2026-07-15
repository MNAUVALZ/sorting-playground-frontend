import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide border border-blue-200">
            🎓 Platform Belajar Struktur Data Interaktif
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Kuasai Algoritma Pengurutan Tanpa Pusing Membaca Kode Buta.
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed">
            Visualisasikan langkah demi langkah perbandingan elemen, pahami kompleksitas waktu, dan uji deret angka Anda sendiri secara real-time.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/playground" 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Mulai Visualisasi Sekarang
            </Link>
            <Link 
              href="#katalog" 
              className="px-6 py-3 border border-slate-300 text-slate-800 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Lihat Katalog Algoritma
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full h-64 md:h-96 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-8 shadow-inner">
          <div className="text-center text-slate-400 font-mono text-sm italic">
            [ Area Ilustrasi Visualisasi & Grafik Interaktif ]
          </div>
        </div>
      </div>
    </section>
  );
}
