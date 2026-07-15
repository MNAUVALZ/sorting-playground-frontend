import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 font-extrabold text-xl">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">📊</span>
            <span>Sort<span className="text-blue-500">Lab</span>.id</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Platform pembelajaran struktur data interaktif yang memadukan teori literatur ilmiah IEEE/ACM dengan eksperimen real-time berbasis komputasi cloud & browser.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">⚡ Next.js 16</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">🎨 Tailwind v4</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">☁️ Railway Cloud</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4">Navigasi Utama</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
            <li><Link href="/catalog" className="hover:text-white transition-colors">Modul Teori</Link></li>
            <li><Link href="/playground" className="hover:text-white transition-colors">Lab IDE & Benchmark</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4">Dasar Teori</h4>
          <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
            <li>📖 <span className="text-slate-300 font-medium">ACM SIGCSE:</span> Bubble Sort Analysis (2003)</li>
            <li>📖 <span className="text-slate-300 font-medium">IEEE / IJIP:</span> Memory Write Efficiency (2008)</li>
            <li>📖 <span className="text-slate-300 font-medium">Computer Journal:</span> Quicksort Partition (1962)</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; 2026 SortLab.id • Tugas Struktur Data & Algoritma
      </div>
    </footer>
  );
}
