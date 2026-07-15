import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import AlgorithmCard from '@/components/ui/AlgorithmCard';
import Footer from '@/components/ui/Footer';

export default function Home() {
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {/* Navigasi Kaca Buram */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section dengan Ilustrasi Balok */}
        <Hero />

        {/* Katalog Modul Algoritma */}
        <section id="katalog" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                Pilih Modul Pembelajaran
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Katalog Modul Algoritma
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                Materi dipadukan langsung dari publikasi ilmiah IEEE, ACM, dan literatur standar ilmu komputer dengan visualisasi waktu nyata.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-xl self-start md:self-auto border border-blue-200 shadow-sm shrink-0">
              <span>📚</span> Total 4 Modul Tersedia
            </div>
          </div>

          {/* Grid Kartu Algoritma Responsif */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithms.map((algo) => (
              <AlgorithmCard key={algo.slug} {...algo} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer EdTech Profesional */}
      <Footer />
    </div>
  );
}
