"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AlgorithmCard from '@/components/ui/AlgorithmCard';

export default function CatalogPage() {
  const [filter, setFilter] = useState<string>('Semua');

  const algorithms = [
    {
      title: "Bubble Sort",
      description: "Algoritma komparasi fundamental yang bekerja dengan membandingkan pasangan elemen bersebelahan dan menukarnya jika urutannya salah. Setiap putaran iterasi akan membuat elemen terbesar 'mengapung' ke posisi paling kanan bagaikan gelembung udara.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "bubble-sort",
      stepsCount: "5 - 10 Langkah",
      journalRef: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin, 35(1), 1-5.",
      useCase: "Pengantar logika pemrograman komputer & verifikasi array ukuran sangat kecil yang hampir terurut."
    },
    {
      title: "Selection Sort",
      description: "Algoritma berbasis seleksi yang membagi array menjadi dua sub-bagian: terurut dan belum terurut. Secara konsisten mencari nilai minimum dari bagian belum terurut untuk diletakkan di batas awal, menghasilkan operasi penulisan memori yang sangat hemat.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "selection-sort",
      stepsCount: "7 - 12 Langkah",
      journalRef: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing, 2(2), 363-368.",
      useCase: "Sistem arsitektur perangkat keras dengan biaya penulisan memori tinggi seperti Flash Memory atau EEPROM."
    },
    {
      title: "Insertion Sort",
      description: "Algoritma adaptif yang membangun urutan data akhir satu per satu elemen. Bekerja sangat natural menyerupai kognisi manusia ketika menyusun kartu remi di tangan, di mana setiap elemen baru disisipkan ke posisi yang tepat di antara elemen yang sudah terurut.",
      complexity: "O(n²)",
      difficulty: "Menengah",
      slug: "insertion-sort",
      stepsCount: "6 - 15 Langkah",
      journalRef: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys (CSUR), 24(4), 441-476.",
      useCase: "Sistem pengurutan real-time untuk data bertahap (streaming) & algoritma basis untuk Timsort (standar Python & Java)."
    },
    {
      title: "Quick Sort",
      description: "Algoritma Divide and Conquer performa tinggi yang mempartisi array menggunakan elemen acuan atau 'pivot'. Elemen lebih kecil diletakkan di kiri pivot dan yang lebih besar di kanan, kemudian diproses secara rekursif hingga mencapai urutan sempurna.",
      complexity: "O(n log n)",
      difficulty: "Lanjutan",
      slug: "quick-sort",
      stepsCount: "10 - 25 Langkah",
      journalRef: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15.",
      useCase: "Standar perpustakaan pengurutan di hampir seluruh bahasa pemrograman modern (qsort C, sort C++ STL)."
    },
  ];

  const filteredAlgos = filter === 'Semua' 
    ? algorithms 
    : algorithms.filter(a => a.difficulty === filter);

  const filterTabs = ['Semua', 'Pemula', 'Menengah', 'Lanjutan'];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Header Halaman */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Silabus Pembelajaran & Teori
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Modul Pembelajaran
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Daftar modul disusun secara bertingkat untuk memudahkan pemahaman alur komputasi dari konsep iteratif dasar hingga algoritma rekursif tingkat lanjut.
          </p>
        </div>

        {/* Tab Filter Kategori */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filter === tab 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab === 'Semua' ? '🌟 Semua Modul (4)' : `🎯 Tingkat ${tab}`}
            </button>
          ))}
        </div>

        {/* Daftar Modul Disusun Ke Bawah (Vertical Stack) */}
        <div className="flex flex-col gap-6">
          {filteredAlgos.map((algo) => (
            <AlgorithmCard key={algo.slug} {...algo} />
          ))}
        </div>

        {filteredAlgos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-500 font-medium">
            Modul untuk kategori ini sedang dalam tahap pengembangan.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
