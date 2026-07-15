import React from 'react';
import Link from 'next/link';

interface AlgorithmCardProps {
  title: string;
  description: string;
  complexity: string;
  difficulty: string;
  slug: string;
  stepsCount: string;
  journalRef: string;
  useCase?: string;
}

export default function AlgorithmCard({
  title,
  description,
  complexity,
  difficulty,
  slug,
  stepsCount,
  journalRef,
  useCase = "Pengurutan data umum & pedagogi komputasi",
}: AlgorithmCardProps) {
  const badgeColors: Record<string, string> = {
    Pemula: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Menengah: 'bg-amber-100 text-amber-800 border-amber-200',
    Lanjutan: 'bg-rose-100 text-rose-800 border-rose-200',
  };
  const badgeColor = badgeColors[difficulty] || 'bg-blue-100 text-blue-800 border-blue-200';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      {/* Panel Kiri: Informasi & Teori */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
            {difficulty}
          </span>
          <span className="text-xs font-mono font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            ⚡ Kompleksitas: {complexity}
          </span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
            🎯 {stepsCount}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 block mb-1">💡 Real-World Use Case:</span>
            <span className="text-slate-600">{useCase}</span>
          </div>
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
            <span className="font-bold text-blue-900 block mb-1">📖 Referensi Jurnal Ilmiah:</span>
            <span className="italic text-slate-600 line-clamp-2">{journalRef}</span>
          </div>
        </div>
      </div>

      {/* Panel Kanan: Tombol Aksi */}
      <div className="flex flex-row lg:flex-col items-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 w-full lg:w-48">
        <Link
          href={`/algorithm/${slug}`}
          className="w-full text-center py-3 px-4 rounded-xl border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
        >
          Pelajari Materi 📚
        </Link>
        <Link
          href="/playground"
          className="w-full text-center py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Coba di Lab 🛠️
        </Link>
      </div>
    </div>
  );
}
