import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Kolom 1: Tentang */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 font-extrabold text-xl">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">
              📊
            </span>
            <span>Sort<span className="text-blue-500">Lab</span>.id</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Platform pembelajaran struktur data interaktif yang memadukan teori literatur ilmiah IEEE/ACM dengan eksperimen real-time berbasis komputasi cloud.
          </p>
          <div className="flex gap-3 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">⚡ Next.js 16</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">🎨 Tailwind v4</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">☁️ Railway Cloud</span>
          </div>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4">Navigasi Modul</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda Utama</Link></li>
            <li><Link href="#katalog" className="hover:text-white transition-colors">Katalog Algoritma</Link></li>
            <li><Link href="/playground" className="hover:text-white transition-colors">Lab IDE Visualisasi</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Referensi Ilmiah */}
        <div>
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4">Dasar Teori</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
            <li>📖 <span className="text-slate-300 font-medium">ACM SIGCSE:</span> Bubble Sort Analysis (Astrachan, 2003)</li>
            <li>📖 <span className="text-slate-300 font-medium">IEEE / IJIP:</span> Memory Write Efficiency (Mishra, 2008)</li>
            <li>📖 <span className="text-slate-300 font-medium">The Computer Journal:</span> Quicksort Partition (Hoare, 1962)</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} Interactive Sorting Playground • Tugas Struktur Data
        </div>
        <div className="text-slate-400">
          Designed for high-impact computer science presentation.
        </div>
      </div>
    </footer>
  );
}
