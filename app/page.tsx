import React from 'react';
import Hero from '@/components/ui/Hero';
import AlgorithmCard from '@/components/ui/AlgorithmCard';

export default function Home() {
  const algorithms = [
    {
      title: "Bubble Sort",
      description: "Algoritma pengurutan sederhana yang membandingkan dan menukar elemen yang bersebelahan secara berulang hingga seluruh array terurut sempurna.",
      complexity: "O(n²)",
      difficulty: "Pemula" as const,
      slug: "bubble-sort",
      stepsCount: "5 - 10 Langkah",
    },
    {
      title: "Selection Sort",
      description: "Membagi array menjadi bagian terurut dan belum terurut, lalu secara berulang mencari elemen terkecil untuk dipindahkan ke posisi awal.",
      complexity: "O(n²)",
      difficulty: "Pemula" as const,
      slug: "selection-sort",
      stepsCount: "7 - 12 Langkah",
    },
    {
      title: "Insertion Sort",
      description: "Membangun array terurut satu per satu dengan menyisipkan setiap elemen ke posisi yang tepat di antara elemen-elemen sebelumnya.",
      complexity: "O(n²)",
      difficulty: "Menengah" as const,
      slug: "insertion-sort",
      stepsCount: "6 - 15 Langkah",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Banner Section */}
      <Hero />

      {/* Katalog Algoritma Section */}
      <section id="katalog" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-dicoding-navy tracking-tight">
              Katalog Modul Algoritma
            </h2>
            <p className="text-dicoding-text-light mt-2">
              Pilih materi algoritma di bawah ini untuk mempelajari teori konsepnya atau langsung uji di dalam lab interaktif.
            </p>
          </div>
          <div className="text-sm font-semibold text-dicoding-blue bg-blue-50 px-4 py-2 rounded-lg self-start md:self-auto">
            📚 Total 3 Modul Tersedia
          </div>
        </div>

        {/* Grid Kartu Algoritma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.slug} {...algo} />
          ))}
        </div>
      </section>
    </main>
  );
}
