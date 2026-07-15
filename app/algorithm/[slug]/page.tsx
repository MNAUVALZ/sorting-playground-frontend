import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
  },
  'quick-sort': {
    title: "Quicksort: An Efficient In-Place Divide & Conquer Algorithm",
    badge: "Lanjutan • Kompleksitas O(n log n)",
    abstract: "Ditemukan oleh Sir Charles Antony Richard Hoare pada tahun 1959 dan dipublikasikan dalam The Computer Journal (1962), Quicksort adalah algoritma berbasis Divide and Conquer yang menjadi fondasi standar perpustakaan pengurutan di berbagai bahasa pemrograman modern (seperti qsort di C dan sort di C++ STL). Algoritma ini bekerja dengan memilih sebuah elemen sebagai 'pivot' dan mempartisi array sehingga elemen yang lebih kecil berada di kiri pivot dan yang lebih besar di kanan pivot.",
    bestCase: "O(n log n) - Partisi seimbang di posisi tengah array",
    worstCase: "O(n²) - Saat pivot selalu merupakan elemen terkecil atau terbesar",
    spaceComp: "O(log n) - Auxiliary Stack Space untuk pemanggilan rekursif",
    mechanism: [
      "Pilih satu elemen dari array sebagai titik acuan atau 'pivot' (pada implementasi standar biasanya mengambil elemen terakhir).",
      "Lakukan proses partisi (Partitioning): atur ulang array sehingga seluruh elemen yang bernilai lebih kecil dari pivot berada di sebelah kiri, dan elemen yang lebih besar berada di sebelah kanan.",
      "Setelah partisi selesai, elemen pivot otomatis berada di posisi indeks akhir yang terurut sempurna.",
      "Terapkan langkah-langkah di atas secara rekursif pada sub-array sebelah kiri pivot dan sub-array sebelah kanan pivot hingga seluruh elemen terurut."
    ],
    pseudocode: `procedure quickSort(A : array of items, low : int, high : int)
    if low < high then
        pivot_idx = partition(A, low, high)
        quickSort(A, low, pivot_idx - 1)
        quickSort(A, pivot_idx + 1, high)
    end if
end procedure

procedure partition(A : array of items, low : int, high : int) returns int
    pivot = A[high]
    i = low - 1
    for j = low to high - 1 do
        if A[j] <= pivot then
            i = i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i + 1], A[high])
    return i + 1
end procedure`,
    citation: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15.",
    doi: "https://doi.10.1093/comjnl/5.1.10"
  }
};

export default async function AlgorithmDetailPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const material = journalMaterials[resolvedParams?.slug];

  if (!material) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-8"
        >
          ← Kembali ke Katalog Modul
        </Link>

        <article className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
            {material.badge}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
            {material.title}
          </h1>

          <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>🏛️</span> Abstrak & Latar Belakang Riset Jurnal
            </h3>
            <p className="text-slate-700 leading-relaxed italic text-sm md:text-base">
              &quot;{material.abstract}&quot;
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
              <span className="font-bold">Referensi:</span> {material.citation} <br/>
              <span className="text-blue-600">{material.doi}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
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

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            🔄 Mekanisme Kerja Algoritma
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-slate-700 mb-10 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200">
            {material.mechanism.map((step, idx) => (
              <li key={idx} className="pl-2">{step}</li>
            ))}
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            💻 Formal Pseudocode
          </h2>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-inner mb-10 border border-slate-800">
            <pre>{material.pseudocode}</pre>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-xl font-bold mb-1">Siap menguji teori ini secara langsung?</h3>
              <p className="text-slate-300 text-sm">
                Jalankan animasi interaktif, lihat perpindahan variabel, dan pantau log eksekusi secara real-time.
              </p>
            </div>
            <Link 
              href="/playground" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md whitespace-nowrap transition-all"
            >
              Buka Lab Visualisasi 🛠️
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
