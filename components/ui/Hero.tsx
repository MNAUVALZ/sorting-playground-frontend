import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden bg-slate-50 border-b border-slate-200 flex items-center justify-center min-h-[50vh]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-40"></div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-slate-800 rounded-full text-xs font-bold tracking-wide border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Platform Pedagogi Struktur Data
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
          Pahami Algoritma Tanpa Menghafal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Kode Buta.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Jelajahi analisis kompleksitas berlandaskan literatur IEEE/ACM, dan saksikan logika pengurutan data bekerja secara real-time di dalam Simulator interaktif.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/playground" 
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            Mulai Simulasi →
          </Link>
          <Link 
            href="/catalog" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-bold text-sm transition-all shadow-sm text-center"
          >
            Baca Modul Teori
          </Link>
        </div>
      </div>
    </section>
  );
}
