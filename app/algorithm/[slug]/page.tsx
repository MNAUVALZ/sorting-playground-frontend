import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const journalMaterials: Record<string, {
  title: string;
  badge: string;
  abstract: string;
  deepDive: string;
  pros: string[];
  cons: string[];
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
    deepDive: "Bubble Sort bekerja dengan prinsip menggerakkan elemen terbesar ke posisi akhir pada setiap putarannya, menyerupai gelembung udara yang naik ke permukaan air. Dalam implementasi modern yang dioptimalkan, algoritma ini memanfaatkan variabel *flag* (penanda) `swapped`. Jika dalam satu iterasi penuh tidak terjadi pertukaran posisi sama sekali, algoritma akan otomatis berhenti lebih awal (*early termination*), membuktikan bahwa data telah terurut sempurna tanpa perlu membuang siklus komputasi.",
    pros: [
      "Sangat sederhana untuk dipahami dan diimplementasikan oleh pemula ilmu komputer.",
      "Memiliki sifat *Stable Sort* (tidak mengubah urutan relatif elemen bernilai sama).",
      "Efisiensi tinggi O(n) jika data yang diproses sudah dalam kondisi terurut sejak awal."
    ],
    cons: [
      "Sangat tidak efisien untuk himpunan data berukuran besar karena kompleksitas O(n²).",
      "Melakukan terlalu banyak operasi penulisan memori (*memory writes*) akibat pertukaran berulang."
    ],
    bestCase: "O(n) - Saat data sudah terurut sejak awal (optimal dengan flag swapped)",
    worstCase: "O(n²) - Saat data terurut terbalik (Reverse Order - maksimal pergeseran)",
    spaceComp: "O(1) - Auxiliary Space (In-Place Sorting - tanpa memori tambahan)",
    mechanism: [
      "Mulai pemindaian dari elemen indeks ke-0, bandingkan nilainya dengan elemen di sebelahnya (indeks + 1).",
      "Jika elemen kiri bernilai lebih besar dari elemen kanan, lakukan operasi pertukaran posisi (*swap*).",
      "Lanjutkan perbandingan secara berurutan hingga batas akhir array. Pada titik ini, elemen terbesar dijamin telah 'mengapung' ke posisi paling kanan.",
      "Kurangi batas akhir pemindaian sebanyak 1 posisi (karena elemen paling kanan sudah pasti terurut).",
      "Ulangi proses iterasi dari awal hingga seluruh elemen terurut atau tidak ada pertukaran yang terjadi."
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
    abstract: "Dalam penelitian komparatif yang dipublikasikan oleh Mishra & Garg (2008), Selection Sort terbukti memiliki keunggulan arsitektural yang signifikan dibandingkan algoritma kuadratik lainnya dalam aspek operasi penulisan memori (*memory write*). Algoritma ini secara konsisten membatasi operasi pertukaran tepat sebanyak O(n) kali, menjadikannya pilihan utama pada arsitektur perangkat keras di mana biaya penulisan ke memori sangat mahal.",
    deepDive: "Berbeda dengan Bubble Sort yang terus-menerus menukar elemen saat memindai, Selection Sort menggunakan pendekatan 'mencari yang terkecil lalu letakkan di depan'. Pada setiap putaran, algoritma hanya mencatat indeks elemen bernilai terkecil. Pertukaran memori (*swap*) baru dilakukan tepat **satu kali** di akhir setiap putaran iterasi. Karakteristik ini membuat Selection Sort sangat disukai dalam pemrograman sistem tertanam (*embedded systems*) dan mikrokontroler (seperti Arduino atau EEPROM storage) untuk memperpanjang umur perangkat keras.",
    pros: [
      "Operasi pertukaran (*swap*) sangat minimal, paling banyak hanya n - 1 kali.",
      "Sangat optimal untuk sistem perangkat keras dengan biaya tulis memori yang lambat atau terbatas.",
      "Performa komputasi mudah diprediksi karena selalu membutuhkan waktu O(n²) di semua kondisi."
    ],
    cons: [
      "Tidak bersifat adaptif: waktu komputasi tetap lambat O(n²) meskipun data sudah terurut.",
      "Umumnya bersifat *Unstable Sort* (dapat mengubah posisi elemen bernilai identik)."
    ],
    bestCase: "O(n²) - Tetap memindai seluruh sisa elemen untuk mencari nilai minimum",
    worstCase: "O(n²) - Kompleksitas waktu konstan di seluruh skenario distribusi data",
    spaceComp: "O(1) - Auxiliary Space (In-Place Sorting)",
    mechanism: [
      "Bagi array menjadi dua wilayah: wilayah terurut di kiri (awalnya kosong) dan wilayah belum terurut di kanan.",
      "Tetapkan elemen pertama dari wilayah belum terurut sebagai kandidat nilai minimum sementara (`min_idx`).",
      "Lakukan pemindaian linear ke seluruh sisa elemen di sebelah kanan untuk mencari apakah ada angka yang bernilai lebih kecil dari kandidat minimum.",
      "Jika ditemukan angka yang lebih kecil, perbarui variabel penunjuk `min_idx` ke posisi baru tersebut.",
      "Setelah pemindaian putaran selesai, tukar elemen di `min_idx` dengan elemen di batas awal wilayah belum terurut. Geser batas wilayah terurut ke kanan."
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
    citation: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing, 2(2), 363-368.",
    doi: "Literature Reference: CS-TR-2008-02"
  },
  'insertion-sort': {
    title: "Adaptive Insertion Sort for Nearly Sorted Arrays",
    badge: "Menengah • Kompleksitas O(n²)",
    abstract: "Berdasarkan survei klasik dari Estivill-Castro & Wood dalam ACM Computing Surveys (1992) serta teks literatur Donald Knuth (1998), Insertion Sort diklasifikasikan sebagai algoritma adaptif yang sangat tangguh. Efisiensinya mendekati linier O(n) ketika dihadapkan pada data yang sudah 'hampir terurut' (*nearly sorted*) atau data berukuran kecil.",
    deepDive: "Insertion Sort bekerja menyerupai psikologi kognitif manusia ketika menyusun kartu remi di tangan. Kita mengambil satu kartu baru, melihat deretan kartu yang sudah berjejer rapi di tangan kiri, lalu menyisipkan kartu baru tersebut tepat di posisi yang sesuai. Kehebatan utama algoritma ini terletak pada efisiensinya saat menangani data penambahan (*online/streaming data*), di mana angka baru terus berdatangan dan langsung disisipkan tanpa perlu mengacak ulang seluruh deret yang sudah terurut.",
    pros: [
      "Sangat efisien untuk himpunan data berukuran kecil (< 50 elemen).",
      "Bersifat adaptif: sangat cepat O(n) jika data sudah hampir terurut sempurna.",
      "Bersifat *Stable Sort* dan *Online Sort* (dapat mengurutkan data baru yang masuk secara bertahap)."
    ],
    cons: [
      "Mengalami degradasi performa yang drastis menjadi O(n²) pada data berukuran besar.",
      "Banyak melakukan pergeseran elemen di memori (*array shifting*) jika data terbalik total."
    ],
    bestCase: "O(n) - Saat array sudah dalam kondisi terurut (hanya 1 perbandingan per elemen)",
    worstCase: "O(n²) - Saat array terurut terbalik (maksimal pergeseran elemen ke kanan)",
    spaceComp: "O(1) - In-Place Sorting dengan overhead memori minimal",
    mechanism: [
      "Elemen pertama (indeks 0) diasumsikan sudah berada dalam posisi terurut.",
      "Ambil elemen berikutnya (disebut sebagai `key` atau kunci) untuk mulai disisipkan.",
      "Bandingkan `key` dengan elemen-elemen di sebelah kirinya secara mundur (dari kanan ke kiri).",
      "Selama elemen di sebelah kiri bernilai lebih besar dari `key`, geser elemen tersebut satu posisi ke kanan untuk membuka ruang kosong.",
      "Sisipkan `key` ke dalam ruang kosong yang telah terbuka. Ulangi proses untuk seluruh elemen tersisa."
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
    abstract: "Ditemukan oleh Sir Charles Antony Richard Hoare pada tahun 1959 dan dipublikasikan dalam The Computer Journal (1962), Quicksort adalah algoritma berbasis *Divide and Conquer* yang menjadi fondasi standar perpustakaan pengurutan di berbagai bahasa pemrograman modern (seperti `qsort` di C dan `sort` di C++ STL).",
    deepDive: "Quicksort memecah masalah besar menjadi sub-masalah kecil dengan memilih sebuah elemen sebagai titik acuan atau `pivot`. Alur kuncinya disebut tahap **Partisi (*Partitioning*)**: seluruh elemen yang bernilai lebih kecil dari pivot digiring ke wilayah kiri, dan elemen yang lebih besar digiring ke wilayah kanan. Setelah partisi selesai, posisi pivot sudah pasti berada di indeks akhirnya yang permanen. Proses ini kemudian diulangi secara rekursif pada sub-array kiri dan kanan. Karena bekerja secara *in-place* dengan faktor konstanta yang sangat kecil, Quicksort di dunia nyata umumnya 2x hingga 3x lebih cepat dibandingkan Merge Sort atau Heap Sort.",
    pros: [
      "Kompleksitas waktu rata-rata sangat cepat yaitu O(n log n), ideal untuk data skala besar (*Big Data*).",
      "Bekerja secara *In-Place* dengan konsumsi memori tumpukan (*stack space*) hanya O(log n).",
      "Memiliki kompatibilitas cache prosessor (*cache locality*) yang sangat optimal pada arsitektur modern."
    ],
    cons: [
      "Dapat terdegradasi menjadi lambat O(n²) pada kasus terburuk (jika pivot selalu elemen terkecil/terbesar).",
      "Bersifat *Unstable Sort* dan membutuhkan implementasi rekursi yang hati-hati agar tidak *Stack Overflow*."
    ],
    bestCase: "O(n log n) - Partisi selalu membagi array menjadi dua bagian berukuran seimbang",
    worstCase: "O(n²) - Saat pivot yang dipilih selalu merupakan angka ekstrem (terkecil atau terbesar)",
    spaceComp: "O(log n) - Auxiliary Stack Space untuk pemanggilan fungsi rekursif",
    mechanism: [
      "Pilih satu elemen dari array sebagai titik acuan atau `pivot` (pada skema Lomuto standar, mengambil elemen paling kanan).",
      "Atur penunjuk indeks `i` untuk melacak batas wilayah elemen-elemen yang lebih kecil dari pivot.",
      "Lakukan pemindaian dari batas kiri hingga sebelum pivot: jika menemukan angka <= pivot, geser batas `i` dan tukar angkanya ke wilayah kiri.",
      "Setelah pemindaian selesai, letakkan elemen `pivot` tepat di tengah (indeks `i + 1`), memisah wilayah kiri (kecil) dan kanan (besar).",
      "Panggil fungsi Quicksort secara rekursif untuk mengurutkan sub-array sebelah kiri pivot dan sub-array sebelah kanan pivot."
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
          href="/catalog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-8"
        >
          ← Kembali ke Pustaka Modul
        </Link>

        <article className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-10">
          {/* Header Judul */}
          <div>
            <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4">
              {material.badge}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {material.title}
            </h1>
          </div>

          {/* Abstrak Jurnal */}
          <div className="bg-slate-50 border-l-4 border-blue-600 p-6 sm:p-8 rounded-r-2xl border border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-inner">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>🏛️</span> Latar Belakang & Abstrak Riset Jurnal
            </h3>
            <p className="text-slate-700 leading-relaxed italic text-sm sm:text-base">
              &quot;{material.abstract}&quot;
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
              <span className="font-bold">Referensi:</span> {material.citation} <br/>
              <span className="text-blue-600">{material.doi}</span>
            </div>
          </div>

          {/* Deep Dive Materi Teoris (BARU & LENGKAP!) */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span>📖</span> Konsep & Analisis Mendalam
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {material.deepDive}
            </p>
          </div>

          {/* Grid Kelebihan & Kekurangan (BARU & LENGKAP!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-2xl">
              <h3 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>✔️</span> Keunggulan Algoritma
              </h3>
              <ul className="space-y-2.5 text-sm text-emerald-950">
                {material.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 p-6 rounded-2xl">
              <h3 className="text-sm font-extrabold text-rose-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚠️</span> Kelemahan & Batasan
              </h3>
              <ul className="space-y-2.5 text-sm text-rose-950">
                {material.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tabel Kompleksitas */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span>⚡</span> Parameter Kompleksitas Komputasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-emerald-700 uppercase block mb-1">Best Case</span>
                <span className="text-base font-mono font-bold text-slate-900 block">{material.bestCase}</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-amber-700 uppercase block mb-1">Worst Case</span>
                <span className="text-base font-mono font-bold text-slate-900 block">{material.worstCase}</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-blue-700 uppercase block mb-1">Space Complexity</span>
                <span className="text-base font-mono font-bold text-slate-900 block">{material.spaceComp}</span>
              </div>
            </div>
          </div>

          {/* Mekanisme Kerja */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span>🔄</span> Alur Eksekusi Langkah Demi Langkah
            </h2>
            <ol className="list-decimal list-inside space-y-3.5 text-slate-700 leading-relaxed bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              {material.mechanism.map((step, idx) => (
                <li key={idx} className="pl-2 font-medium">{step}</li>
              ))}
            </ol>
          </div>

          {/* Pseudocode */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span>💻</span> Spesifikasi Pseudocode Formal
            </h2>
            <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl font-mono text-sm overflow-x-auto shadow-xl border border-slate-800 leading-relaxed">
              <pre>{material.pseudocode}</pre>
            </div>
          </div>

          {/* Banner CTA Lab */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-8 sm:p-10 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold">Siap Menguji Algoritma Ini di Lab?</h3>
              <p className="text-slate-300 text-sm max-w-lg">
                Saksikan pergeseran balok secara real-time, atur tempo kecepatan animasi, dan amati log telemetri pada setiap langkahnya.
              </p>
            </div>
            <Link 
              href="/playground" 
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg whitespace-nowrap transition-all hover:scale-105 shrink-0"
            >
              Buka Lab Eksperimen 🛠️
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
