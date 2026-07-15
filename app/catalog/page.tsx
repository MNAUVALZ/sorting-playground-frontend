import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AlgorithmCard from '@/components/ui/AlgorithmCard';

export default function CatalogPage() {
  const algorithms = [
    {
      title: "Bubble Sort",
      description: "Langkah pertama memahami algoritma. Sangat sederhana dan intuitif karena hanya menukar elemen yang bersebelahan secara berulang hingga nilai terbesar mengapung ke ujung layaknya gelembung air.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "bubble-sort",
      stepsCount: "5 - 10 Langkah",
      journalRef: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin.",
    },
    {
      title: "Selection Sort",
      description: "Memperbaiki kelemahan Bubble Sort dengan mengurangi operasi penukaran (swap). Algoritma ini mencari nilai terkecil dari seluruh sisa data, lalu menempatkannya ke depan. Sangat hemat penulisan memori.",
      complexity: "O(n²)",
      difficulty: "Pemula",
      slug: "selection-sort",
      stepsCount: "7 - 12 Langkah",
      journalRef: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing.",
    },
    {
      title: "Insertion Sort",
      description: "Sangat natural, meniru cara manusia mengurutkan kartu remi di tangan. Algoritma ini mengambil satu elemen baru dan menyisipkannya tepat di posisi yang benar di antara elemen yang sudah terurut.",
      complexity: "O(n²)",
      difficulty: "Menengah",
      slug: "insertion-sort",
      stepsCount: "6 - 15 Langkah",
      journalRef: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys.",
    },
    {
      title: "Quick Sort",
      description: "Algoritma kelas industri yang memecah array memanjang menjadi bagian-bagian kecil menggunakan teknik 'Pivot'. Diciptakan tahun 1959, ini adalah algoritma pengurutan tercepat dan paling sering digunakan di dunia nyata.",
      complexity: "O(n log n)",
      difficulty: "Lanjutan",
      slug: "quick-sort",
      stepsCount: "10 - 25 Langkah",
      journalRef: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        {/* Header Kurikulum */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Silabus Pembelajaran
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-4">
            Modul di bawah ini disusun berurutan dari konsep komparasi paling dasar hingga teknik partisi tingkat lanjut. Disarankan untuk membacanya secara berurutan mulai dari Modul 01.
          </p>
        </div>

        {/* Daftar Modul Kurikulum */}
        <div className="flex flex-col gap-8">
          {algorithms.map((algo, index) => (
            <AlgorithmCard key={algo.slug} index={index + 1} {...algo} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
