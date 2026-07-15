import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Kolom Kiri: Copywriting */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-bold tracking-wide border border-blue-200 shadow-sm">
            <span>🎓</span> Platform Belajar Struktur Data Generasi Baru
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Kuasai Algoritma Pengurutan Tanpa <span className="text-blue-600 underline decoration-blue-300 decoration-wavy decoration-2">Kode Buta</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Visualisasikan langkah perbandingan elemen secara nyata, pahami kompleksitas waktu matematis, dan uji deret angka Anda sendiri di dalam lab eksekusi waktu nyata.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link 
              href="/playground" 
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              <span>Mulai Visualisasi Lab</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="#katalog" 
              className="w-full sm:w-auto px-7 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 rounded-xl font-bold text-sm transition-all shadow-sm hover:bg-slate-50 text-center"
            >
              Lihat Katalog Modul
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Ilustrasi Mockup Lab & Visualisasi Balok (MENGGANTIKAN KOTAK KOSONG!) */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-2xl relative">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                LIVE SIMULATION PREVIEW
              </span>
            </div>

            {/* Ilustrasi Grafik Balok Array */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 mb-4 flex flex-col justify-end h-56 sm:h-64">
              <div className="flex items-end justify-between gap-2 h-full px-2">
                <div className="w-full bg-blue-600 rounded-t h-[40%] flex items-start justify-center pt-1 shadow-md animate-pulse">
                  <span className="text-[10px] font-mono font-bold text-white">25</span>
                </div>
                <div className="w-full bg-blue-600 rounded-t h-[70%] flex items-start justify-center pt-1 shadow-md">
                  <span className="text-[10px] font-mono font-bold text-white">64</span>
                </div>
                <div className="w-full bg-amber-400 rounded-t h-[90%] flex items-start justify-center pt-1 shadow-lg shadow-amber-500/20 translate-y-[-4px] transition-transform">
                  <span className="text-[10px] font-mono font-bold text-slate-900">88</span>
                </div>
                <div className="w-full bg-rose-500 rounded-t h-[30%] flex items-start justify-center pt-1 shadow-lg shadow-rose-500/20 translate-y-[-4px] transition-transform">
                  <span className="text-[10px] font-mono font-bold text-white">12</span>
                </div>
                <div className="w-full bg-blue-600 rounded-t h-[55%] flex items-start justify-center pt-1 shadow-md">
                  <span className="text-[10px] font-mono font-bold text-white">45</span>
                </div>
                <div className="w-full bg-emerald-500 rounded-t h-[95%] flex items-start justify-center pt-1 shadow-md">
                  <span className="text-[10px] font-mono font-bold text-white">91</span>
                </div>
              </div>
            </div>

            {/* Mockup Terminal Status */}
            <div className="font-mono text-xs text-slate-300 bg-slate-800/50 p-3.5 rounded-lg border border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                <span className="text-amber-400 font-bold">SWAP</span>
                <span className="text-slate-400">→ Menukar elemen [88] dengan [12]</span>
              </div>
              <span className="text-emerald-400 font-bold ml-2 shrink-0">O(n²)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
