import React from 'react';
import Link from 'next/link';

interface AlgorithmCardProps {
  title: string;
  description: string;
  complexity: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
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
  const badgeColor = {
    Pemula: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Menengah: 'bg-amber-100 text-amber-800 border-amber-200',
    Lanjutan: 'bg-rose-100 text-rose-800 border-rose-200',
  }[difficulty];

  return (
    <div className="bg-dicoding-card rounded-xl border border-dicoding-border p-6 flex flex-col justify-between hover:shadow-dicoding-hover hover:-translate-y-1 transition-all duration-300 group">
      <div>
        {/* Header Kartu: Badge Kesulitan & Kompleksitas */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>
            {difficulty}
          </span>
          <span className="text-xs font-mono font-bold text-dicoding-text-light bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            {complexity}
          </span>
        </div>

        {/* Judul & Deskripsi Modul */}
        <h3 className="text-xl font-bold text-dicoding-navy group-hover:text-dicoding-blue transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-dicoding-text-light line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Kutipan Jurnal Ilmiah */}
        <div className="mb-6 p-2.5 bg-slate-50 rounded-lg border border-slate-150 text-xs text-slate-600 flex items-start gap-2">
          <span className="text-sm">📖</span>
          <div>
            <span className="font-semibold block text-slate-800">Sumber Literatur:</span>
            <span className="italic">{journalRef}</span>
          </div>
        </div>
      </div>

      <div>
        {/* Info Tambahan */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 mb-6 text-xs text-dicoding-text">
          <div className="flex items-center gap-1.5 font-medium">
            <span>📊</span> {stepsCount}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>⚡</span> In-Place Sort
          </div>
        </div>

        {/* Tombol Navigasi Aksi */}
        <div className="flex items-center gap-3">
          <Link
            href={`/algorithm/${slug}`}
            className="flex-1 text-center py-2.5 px-4 rounded-lg border border-dicoding-border text-dicoding-navy font-semibold text-sm hover:bg-slate-50 transition-all"
          >
            Pelajari Materi
          </Link>
          <Link
            href="/playground"
            className="flex-1 text-center py-2.5 px-4 rounded-lg bg-dicoding-blue text-white font-semibold text-sm hover:bg-dicoding-blue-hover transition-all shadow-sm"
          >
            Coba di Lab 🛠️
          </Link>
        </div>
      </div>
    </div>
  );
}
