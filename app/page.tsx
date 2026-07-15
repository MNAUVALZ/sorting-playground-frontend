import React from 'react';
import Hero from '@/components/ui/Hero';
import AlgorithmCard from '@/components/ui/AlgorithmCard';

export default function Home() {
  const algorithms = [
    {
      title: "Bubble Sort",
      description: "Berdasarkan tinjauan ACM SIGCSE, algoritma ini bekerja melalui pertukaran berulang pada elemen bersebelahan. Sangat relevan untuk pedagogi pemrograman karena merepresentasikan logika iteratif dasar.",
      complexity: "O(n²)",
      difficulty: "Pemula" as const,
      slug: "bubble-sort",
      stepsCount: "5 - 10 Langkah",
      journalRef: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin.",
    },
    {
      title: "Selection Sort",
      description: "Merujuk pada studi komparatif Mishra & Garg (2008), algoritma ini membagi sub-array dan meminimalkan operasi pertukaran memori (maksimal O(n) swap), sangat optimal untuk sistem dengan biaya tulis memori tinggi.",
      complexity: "O(n²)",
      difficulty: "Pemula" as const,
      slug: "selection-sort",
      stepsCount: "7 - 12 Langkah",
      journalRef: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing.",
    },
    {
      title: "Insertion Sort",
      description: "Dalam survei ACM Computing Surveys, algoritma adaptif ini terbukti memiliki efisiensi tinggi pada data berukuran kecil atau hampir terurut (nearly sorted), bekerja secara in-place bagaikan mengurutkan kartu remi.",
      complexity: "O(n²)",
      difficulty: "Menengah" as const,
      slug: "insertion-sort",
      stepsCount: "6 - 15 Langkah",
      journalRef: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys.",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      <Hero />
      <section id="katalog" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-dicoding-navy tracking-tight">
              Katalog Modul Algoritma
            </h2>
            <p className="text-dicoding-text-light mt-2">
              Materi dipadukan langsung dari publikasi ilmiah IEEE, ACM, dan literatur standar ilmu komputer.
            </p>
          </div>
          <div className="text-sm font-semibold text-dicoding-blue bg-blue-50 px-4 py-2 rounded-lg self-start md:self-auto border border-blue-100">
            📚 Berbasis Jurnal Ilmiah
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.slug} {...algo} />
          ))}
        </div>
      </section>
    </main>
  );
}
