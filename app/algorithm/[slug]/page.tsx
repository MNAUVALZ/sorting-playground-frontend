import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Database Materi Berbasis Jurnal Ilmiah
const journalMaterials: Record<string, {
  title: string;
  badge: string;
  abstract: string;
  bestCase: string;
  worstCase: string;
  spaceComp: string;
  mechanism: string[];
  pseudocode: string;
  citation: string;
  doi: string;
}> = {
  'bubble-sort': {
    title: "Bubble Sort: An Archaeological Algorithmic Analysis",
    badge: "Pemula • Kompleksitas O(n²)",
    abstract: "Menurut kajian riset Owen Astrachan dalam publikasi ACM SIGCSE Bulletin (2003), Bubble Sort sering kali mendapat kritik dalam penerapan industri komputasi modern karena kompleksitas waktunya yang kuadratik. Namun, literatur pedagogi komputer mempertahankan algoritma ini sebagai standar fundamental karena kemampuannya mendemonstrasikan invariansi loop dan perbandingan pasangan elemen berurutan (adjacent pairing) dengan sangat intuitif.",
    bestCase: "O(n) - Saat data sudah terurut (menggunakan flag swapped)",
    worstCase: "O(n²) - Saat data terurut terbalik (Reverse Order)",
    spaceComp: "O(1) - Auxiliary Space (In-Place Sorting)",
    mechanism: [
      "Mulai dari elemen pertama (indeks 0), bandingkan elemen saat ini dengan elemen berikutnya (indeks + 1).",
      "Jika elemen saat ini lebih besar dari elemen berikutnya, lakukan operasi pertukaran posisi (swapping).",
      "Lanjutkan perbandingan hingga akhir array. Pada tahap ini, elemen terbesar otomatis 'mengapung' (bubble up) ke posisi paling kanan.",
      "Ulangi proses iterasi untuk sisa elemen yang belum terurut hingga tidak ada lagi pertukaran yang terjadi."
    ],
    pseudocode: `procedure bubbleSort( A : daftar item yang dapat diurutkan )
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure`,
    citation: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin, 35(1), 1-5.",
    doi: "https://doi.10.1145/792548.611918"
  },
  'selection-sort': {
    title: "Selection Sort: Optimal Memory Write Efficiency",
    badge: "Pemula • Kompleksitas O(n²)",
    abstract: "Dalam penelitian komparatif yang dipublikasikan oleh Mishra & Garg (2008), Selection Sort terbukti memiliki keunggulan arsitektural yang signifikan dibandingkan algoritma kuadratik lainnya dalam aspek operasi penulisan memori (memory write). Algoritma ini secara konsisten membatasi operasi pertukaran tepat sebanyak O(n) kali, menjadikannya pilihan utama pada arsitektur perangkat keras di mana biaya penulisan ke memori (seperti Flash Memory atau EEPROM) sangat mahal.",
    bestCase: "O(n²) - Selalu memindai seluruh sisa elemen",
    worstCase: "O(n²) - Kompleksitas waktu konstan di semua skenario data",
    spaceComp: "O(1) - Auxiliary Space (In-Place Sorting)",
    mechanism: [
      "Bagi array menjadi dua sub-bagian: sub-array terurut di kiri dan sub-array belum terurut di kanan.",
      "Asumsikan elemen pertama dari bagian belum terurut sebagai nilai minimum sementara (min_idx).",
      "Lakukan pemindaian linear ke kanan untuk mencari apakah terdapat elemen lain yang bernilai lebih kecil dari min_idx.",
      "Jika ditemukan nilai yang lebih kecil, perbarui min_idx. Setelah satu putaran selesai, tukar elemen di min_idx dengan batas awal bagian belum terurut."
    ],
    pseudocode: `procedure selectionSort( A : array of items )
    n = length(A)
    for i = 0 to n - 2 do
        min_idx = i
        for j = i + 1 to n - 1 do
            if A[j] < A[min_idx] then
                min_idx = j
            end if
        end for
        if min_idx != i then
            swap(A[i], A[min_idx])
        end if
    end for
end procedure`,
    citation: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. International Journal of Intelligent Information Processing, 2(2), 363-368.",
    doi: "Literature Reference: CS-TR-2008-02"
  },
  'insertion-sort': {
    title: "Adaptive Insertion Sort for Nearly Sorted Arrays",
    badge: "Menengah • Kompleksitas O(n²)",
    abstract: "Berdasarkan survei klasik dari Estivill-Castro & Wood dalam ACM Computing Surveys (1992) serta teks literatur Donald Knuth (1998), Insertion Sort diklasifikasikan sebagai algoritma adaptif yang sangat tangguh. Efisiensinya mendekati linier O(n) ketika dihadapkan pada data yang sudah 'hampir terurut' (nearly sorted) atau data berukuran kecil. Algoritma ini bekerja menyerupai psikologi kognitif manusia ketika menyusun kartu remi di tangan.",
    bestCase: "O(n) - Saat array sudah dalam kondisi terurut",
    worstCase: "O(n²) - Saat array terurut terbalik (maksimal pergeseran)",
    spaceComp: "O(1) - In-Place Sorting dengan overhead memori minimal",
    mechanism: [
      "Elemen pertama (indeks 0) diasumsikan sudah berada dalam posisi terurut.",
      "Ambil elemen berikutnya (key) dan bandingkan dengan elemen-elemen di sebelah kirinya yang sudah terurut.",
      "Geser semua elemen yang bernilai lebih besar dari 'key' sebanyak satu posisi ke kanan untuk membuka ruang.",
      "Sisipkan 'key' ke dalam ruang kosong yang tepat. Ulangi hingga seluruh elemen array terproses."
    ],
    pseudocode: `procedure insertionSort( A : array of items )
    n = length(A)
    for i = 1 to n - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        A[j + 1] = key
    end for
end procedure`,
    citation: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys (CSUR), 24(4), 441-476.",
    doi: "https://doi.10.1145/146370.146381"
  }
};

export default async function AlgorithmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const material = journalMaterials[resolvedParams.slug];

  if (!material) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dicoding-bg py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Tombol Kembali */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-dicoding-blue hover:underline mb-8"
        >
          ← Kembali ke Katalog Modul
        </Link>

        {/* Kontainer Modul Utama ala Dicoding */}
        <article className="bg-white rounded-2xl border border-dicoding-border p-8 md:p-12 shadow-sm">
          {/* Header Modul */}
          <span className="px-3 py-1 bg-blue-50 text-dicoding-blue border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
            {material.badge}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-dicoding-navy mt-4 mb-6 leading-tight">
            {material.title}
          </h1>

          {/* Abstrak / Kutipan Jurnal */}
          <div className="bg-slate-50 border-l-4 border-dicoding-blue p-6 rounded-r-xl mb-10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>🏛️</span> Abstrak & Latar Belakang Riset Jurnal
            </h3>
            <p className="text-slate-700 leading-relaxed italic text-sm md:text-base">
              "{material.abstract}"
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
              <span className="font-bold">Referensi:</span> {material.citation} <br/>
              <span className="text-dicoding-blue">{material.doi}</span>
            </div>
          </div>

          {/* Tabel Analisis Kompleksitas */}
          <h2 className="text-2xl font-bold text-dicoding-navy mb-4">
            ⚡ Analisis Kompleksitas Algoritma
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Best Case</span>
              <span className="text-lg font-mono font-bold text-emerald-900">{material.bestCase}</span>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-800 uppercase block mb-1">Worst Case</span>
              <span className="text-lg font-mono font-bold text-amber-900">{material.worstCase}</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-xs font-bold text-blue-800 uppercase block mb-1">Space Complexity</span>
              <span className="text-lg font-mono font-bold text-blue-900">{material.spaceComp}</span>
            </div>
          </div>

          {/* Mekanisme Kerja */}
          <h2 className="text-2xl font-bold text-dicoding-navy mb-4">
            🔄 Mekanisme Kerja Algoritma
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-dicoding-text mb-10 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200">
            {material.mechanism.map((step, idx) => (
              <li key={idx} className="pl-2">{step}</li>
            ))}
          </ol>

          {/* Pseudocode */}
          <h2 className="text-2xl font-bold text-dicoding-navy mb-4">
            💻 Formal Pseudocode
          </h2>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-inner mb-10 border border-slate-800">
            <pre>{material.pseudocode}</pre>
          </div>

          {/* Call to Action ke Lab */}
          <div className="bg-gradient-to-r from-dicoding-navy to-dicoding-dark p-8 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-xl font-bold mb-1">Siap menguji teori ini secara langsung?</h3>
              <p className="text-slate-300 text-sm">
                Jalankan animasi interaktif, lihat perpindahan variabel, dan pantau log eksekusi secara real-time.
              </p>
            </div>
            <Link 
              href="/playground" 
              className="px-6 py-3 bg-dicoding-blue hover:bg-dicoding-blue-hover text-white font-semibold rounded-lg shadow-md whitespace-nowrap transition-all"
            >
              Buka Lab Visualisasi 🛠️
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
