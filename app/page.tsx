import Hero from '@/components/ui/Hero';
import Link from 'next/link';
import { ArrowUpRight, BarChart2, Cpu, Zap } from 'lucide-react';

// Data sementara (Nantinya data ini akan diambil otomatis dari API Laravel kita)
const algorithms = [
  {
    name: 'Bubble Sort',
    slug: 'bubble-sort',
    complexity: 'O(n²)',
    desc: 'Algoritma sederhana yang berulang kali menukar elemen bersebelahan jika urutannya salah. Cocok untuk memahami konsep dasar sorting.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Selection Sort',
    slug: 'selection-sort',
    complexity: 'O(n²)',
    desc: 'Membagi array menjadi bagian terurut dan belum terurut, lalu terus menerus mencari elemen terkecil untuk dipindahkan.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Insertion Sort',
    slug: 'insertion-sort',
    complexity: 'O(n²)',
    desc: 'Membangun array terurut satu per satu dengan cara menyisipkan elemen ke posisi yang tepat di sisi kirinya.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Quick Sort',
    slug: 'quick-sort',
    complexity: 'O(n log n)',
    desc: 'Algoritma Divide & Conquer berkecepatan tinggi yang memilih elemen pivot dan mempartisi array ke kiri dan kanannya.',
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      {/* 1. Hero Section dengan Animasi GSAP */}
      <Hero />

      {/* 2. Katalog Algoritma Section */}
      <section id="katalog" className="max-w-6xl mx-auto px-4 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Katalog Algoritma
            </h2>
            <p className="text-slate-400">
              Pilih algoritma untuk melihat animasi scrollytelling dan penjelasan baris kodenya.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>4 Algoritma Siap Dipelajari</span>
          </div>
        </div>

        {/* Grid Kartu Algoritma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithms.map((algo) => (
            <Link
              key={algo.slug}
              href={`/algorithm/${algo.slug}`}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Garis warna aksen di bagian atas kartu */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${algo.color} opacity-70 group-hover:opacity-100 transition-opacity`} />

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-white">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  Kompleksitas: {algo.complexity}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>{algo.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {algo.desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Pelajari Step-by-Step &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}