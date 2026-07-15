import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 px-6 overflow-hidden bg-slate-50 border-b border-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-slate-800 rounded-full text-xs font-bold tracking-wide border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Platform Pedagogi Struktur Data
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Pahami Algoritma Tanpa Menghafal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Kode Buta.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Jelajahi analisis kompleksitas berlandaskan literatur IEEE/ACM, dan saksikan logika pengurutan data bekerja secara real-time di dalam Simulator interaktif.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link 
              href="/playground" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Mulai Simulasi</span>
              <span>→</span>
            </Link>
            <Link 
              href="/catalog" 
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-bold text-sm transition-all shadow-sm text-center"
            >
              Baca Modul Teori
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none hidden md:block">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800/80">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">LIVE_SIMULATOR.EXE</span>
              </div>
              <div className="p-6 h-48 flex items-end justify-between gap-2.5 relative bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="w-full bg-slate-700 rounded-t h-[40%]"></div>
                <div className="w-full bg-slate-700 rounded-t h-[70%]"></div>
                <div className="w-full bg-amber-400 rounded-t h-[90%] shadow-[0_0_15px_rgba(251,191,36,0.3)] translate-y-[-4px]"></div>
                <div className="w-full bg-rose-500 rounded-t h-[30%] shadow-[0_0_15px_rgba(244,63,94,0.3)] translate-y-[-4px]"></div>
                <div className="w-full bg-slate-700 rounded-t h-[55%]"></div>
                <div className="w-full bg-emerald-500 rounded-t h-[100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
