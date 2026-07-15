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
      description: "Berdasarkan tinjauan ACM SIGCSE, algoritma ini bekerja melalui pertukaran berulang pada elemen bersebelahan. Sangat relevan untuk pedagogi pemrograman karena merepresentasikan logika iteratif dasar.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "bubble-sort",
      stepsCount: "5 - 10 Langkah",
      journalRef: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin.",
    },
    {
      title: "Selection Sort",
      description: "Merujuk pada studi komparatif Mishra & Garg (2008), algoritma ini membagi sub-array dan meminimalkan operasi pertukaran memori (maksimal O(n) swap), sangat optimal untuk sistem dengan biaya tulis memori tinggi.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "selection-sort",
      stepsCount: "7 - 12 Langkah",
      journalRef: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing.",
    },
    {
      title: "Insertion Sort",
      description: "Dalam survei ACM Computing Surveys, algoritma adaptif ini terbukti memiliki efisiensi tinggi pada data berukuran kecil atau hampir terurut (nearly sorted), bekerja secara in-place bagaikan mengurutkan kartu remi.",
      complexity: "O(n²)",
      difficulty: "Menengah",
      slug: "insertion-sort",
      stepsCount: "6 - 15 Langkah",
      journalRef: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys.",
    },
    {
      title: "Quick Sort",
      description: "Ditemukan oleh Sir C. A. R. Hoare (1962), algoritma Divide & Conquer ini mempartisi array berdasarkan elemen pivot. Sangat efisien dan menjadi standar perpustakaan pengurutan di berbagai bahasa pemrograman modern.",
      complexity: "O(n log n)",
      difficulty: "Lanjutan",
      slug: "quick-sort",
      stepsCount: "10 - 25 Langkah",
      journalRef: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15.",
    },
  ];

  // Filter logika
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
            Pustaka Materi & Teori
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Katalog Modul Algoritma
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pilih algoritma di bawah ini untuk mempelajari analisis kompleksitas matematis, pseudocode formal, serta latar belakang publikasi jurnal ilmiahnya.
          </p>
        </div>

        {/* Tab Filter Kategori */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === tab 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'Semua' ? '🌟 Semua Kategori' : `🎯 Tingkat ${tab}`}
            </button>
          ))}
        </div>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlgos.map((algo) => (
            <AlgorithmCard key={algo.slug} {...algo} />
          ))}
        </div>

        {filteredAlgos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-500">
            Modul untuk kategori ini sedang dalam tahap pengembangan.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
