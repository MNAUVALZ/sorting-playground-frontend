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
}

export default function AlgorithmCard({
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
    Lanjutan: 'bg-rose-100 text-rose-800 border-rose-200',
  };
  const badgeColor = badgeColors[difficulty] || 'bg-blue-100 text-blue-800 border-blue-200';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>
            {difficulty}
          </span>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            {complexity}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="mb-6 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <span className="text-sm">📖</span>
          <div>
            <span className="font-semibold block text-slate-800">Sumber Literatur:</span>
            <span className="italic text-slate-500">{journalRef}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 mb-6 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-medium">
            <span>📊</span> {stepsCount}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>⚡</span> In-Place Sort
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/algorithm/${slug}`}
            className="flex-1 text-center py-2.5 px-4 rounded-lg border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-all"
          >
            Pelajari Materi
          </Link>
          <Link
            href="/playground"
            className="flex-1 text-center py-2.5 px-4 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm"
          >
            Coba di Lab 🛠️
          </Link>
        </div>
      </div>
    </div>
  );
}
