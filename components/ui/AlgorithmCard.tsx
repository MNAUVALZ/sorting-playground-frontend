import React from 'react';
import Link from 'next/link';

interface AlgorithmCardProps {
  index: number;
  title: string;
  description: string;
  complexity: string;
  difficulty: string;
  slug: string;
  stepsCount: string;
  journalRef: string;
}

export default function AlgorithmCard({
  index,
  title,
  description,
  complexity,
  difficulty,
  slug,
  stepsCount,
  journalRef,
}: AlgorithmCardProps) {
  const badgeColors: Record<string, string> = {
    Pemula: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Menengah: 'bg-amber-100 text-amber-800 border-amber-200',
    Lanjutan: 'bg-purple-100 text-purple-800 border-purple-200',
  };
  const badgeColor = badgeColors[difficulty] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden group">
      {/* Dekorasi Nomor Modul di Background */}
      <div className="absolute -right-6 -top-10 text-[120px] font-extrabold text-slate-50 opacity-50 pointer-events-none select-none transition-transform group-hover:scale-110 duration-500">
        0{index}
      </div>

      {/* Panel Kiri: Header & Konten */}
      <div className="flex-1 relative z-10 space-y-4">
        {/* Lencana Modul & Tingkat Kesulitan */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-white tracking-widest uppercase">
            Modul 0{index}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded border ${badgeColor} uppercase tracking-wide`}>
            {difficulty}
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Info Tambahan */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span>⚡ Time:</span> <span className="text-slate-900 font-mono">{complexity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span>📈 Space:</span> <span className="text-slate-900 font-mono">O(1) In-Place</span>
          </div>
        </div>
      </div>

      {/* Panel Kanan: Aksi CTA */}
      <div className="flex flex-col justify-center gap-3 shrink-0 w-full md:w-48 relative z-10">
        <Link
          href={`/algorithm/${slug}`}
          className="w-full text-center py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
        >
          Baca Materi 📖
        </Link>
        <Link
          href="/playground"
          className="w-full text-center py-3.5 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          Buka Simulator 🛠️
        </Link>
      </div>
    </div>
  );
}
