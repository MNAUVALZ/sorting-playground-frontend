import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const journalMaterials: Record<string, any> = {
  'bubble-sort': {
    title: "Bubble Sort", badge: "Pemula • O(n²)",
    analogy: "Bayangkan Anda sedang melihat gelembung udara di dalam air. Gelembung yang paling besar akan selalu naik ke permukaan lebih cepat. Begitu juga Bubble Sort: angka terbesar akan 'mengapung' ke posisi paling kanan pada setiap putarannya.",
    concept: "Bubble Sort adalah algoritma pengurutan paling dasar. Ia bekerja dengan memindai deretan angka dari kiri ke kanan. Ia akan melihat dua angka yang bersebelahan; jika angka sebelah kiri lebih besar dari angka sebelah kanan, ia akan menukarnya (swap). Proses ini diulang terus-menerus. Pada putaran pertama, angka paling besar dijamin sudah berada di ujung kanan. Pada putaran kedua, angka terbesar kedua berada di sebelahnya, dan seterusnya.",
    pros: ["Secara logika sangat mudah dipahami oleh programmer pemula.", "Algoritma ini bersifat Stabil (Stable).", "Bisa berhenti lebih awal (Early Termination) jika mendeteksi array sudah terurut."],
    cons: ["Sangat lambat untuk jumlah data yang banyak (Skala Kuadratik).", "Terlalu banyak melakukan pertukaran (swap), yang membebani kinerja memori komputer."],
    bestCase: "O(n) - Terjadi jika data yang dimasukkan kebetulan sudah terurut sempurna dari awal.",
    worstCase: "O(n²) - Terjadi jika data terurut terbalik (dari besar ke kecil). Setiap angka harus digeser secara manual.",
    spaceComp: "O(1) - Tidak butuh memori tambahan (In-Place).",
    mechanism: [
      "Mulai dari indeks paling kiri. Bandingkan angka di posisi saat ini dengan angka di sebelah kanannya.",
      "Jika angka di kiri lebih besar (>), tukar posisi kedua angka tersebut.",
      "Pindah ke sepasang angka berikutnya di sebelah kanan, lakukan perbandingan dan penukaran yang sama.",
      "Saat mencapai ujung kanan array, satu putaran (pass) selesai. Angka paling besar telah terkunci di posisinya.",
      "Ulangi proses dari indeks paling kiri lagi, namun abaikan angka-angka di ujung kanan yang sudah terkunci.",
      "Proses berhenti sepenuhnya saat algoritma melakukan satu putaran penuh tanpa menukar angka satupun."
    ],
    pseudocode: `procedure bubbleSort( A : daftar angka )
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
    citation: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin."
  },
  'selection-sort': {
    title: "Selection Sort", badge: "Pemula • O(n²)",
    analogy: "Bayangkan Anda memiliki sekeranjang bola bernomor yang acak. Anda mencari seluruh keranjang untuk menemukan bola dengan nomor paling kecil, lalu mengeluarkannya dan meletakkannya di barisan paling depan. Lalu Anda mencari bola terkecil kedua dari sisa keranjang, dan meletakkannya di urutan kedua.",
    concept: "Algoritma ini membagi array menjadi dua bagian imajiner: 'terurut' di sebelah kiri dan 'belum terurut' di sebelah kanan. Daripada terus-menerus menukar elemen seperti Bubble Sort, Selection Sort hanya mencari indeks dari angka paling kecil di wilayah yang belum terurut. Setelah selesai memindai, ia hanya akan melakukan satu kali pertukaran (swap) untuk memindahkan angka terkecil tersebut ke batas wilayah terurut.",
    pros: ["Jumlah pertukaran memori (swap) sangat sedikit, maksimal hanya sebanyak n - 1 kali.", "Sangat optimal untuk sistem perangkat keras dengan biaya tulis memori yang lambat (seperti EEPROM)."],
    cons: ["Tidak peduli datanya sudah terurut atau belum, ia tetap memindai seluruh sisa array (Tidak Adaptif).", "Termasuk algoritma yang Tidak Stabil (Unstable)."],
    bestCase: "O(n²) - Tetap memindai semuanya untuk memastikan tidak ada angka yang lebih kecil.",
    worstCase: "O(n²) - Kompleksitas waktunya selalu pasti dan konstan di semua kondisi.",
    spaceComp: "O(1) - Mengurutkan langsung di dalam array aslinya (In-Place).",
    mechanism: [
      "Tandai batas awal wilayah 'belum terurut' di indeks 0. Asumsikan angka di indeks 0 ini adalah yang paling kecil (Minimum Sementara).",
      "Pindai sisa angka di sebelah kanannya satu per satu.",
      "Jika menemukan angka yang lebih kecil, catat indeks angka baru tersebut sebagai Minimum Sementara yang baru.",
      "Setelah mencapai ujung array, tukar angka di posisi Minimum Sementara dengan angka di batas awal wilayah.",
      "Geser batas awal wilayah satu langkah ke kanan. Ulangi proses hingga seluruh batas habis."
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
    citation: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing."
  },
  'insertion-sort': {
    title: "Insertion Sort", badge: "Menengah • O(n²)",
    analogy: "Ini adalah cara alamiah manusia menyusun kartu remi. Saat Anda mengambil satu kartu baru dari dek, Anda akan melihat susunan kartu di tangan kiri Anda (yang sudah terurut), mencari sela-sela yang pas, menggeser kartu lain, dan menyelipkan kartu baru tersebut ke posisinya.",
    concept: "Insertion Sort memproses data secara bertahap dari kiri ke kanan. Setiap kali algoritma berhadapan dengan elemen baru (kunci), ia akan menarik elemen tersebut, membandingkannya dengan elemen-elemen di sebelah kirinya secara mundur. Algoritma akan terus menggeser elemen-elemen besar ke kanan untuk 'membuka ruang', lalu menyisipkan kunci tersebut ke ruang kosong yang tepat.",
    pros: ["Sadar Urutan (Adaptif). Jika datanya sudah hampir terurut, ia bekerja secepat kilat O(n).", "Online Sorting: Bisa langsung mengurutkan data baru yang datang belakangan.", "Sangat cepat untuk array berukuran kecil."],
    cons: ["Sangat lambat untuk array berskala besar.", "Terlalu banyak operasi 'geser memori' (array shifting) jika angka terkecil terjebak di ujung kanan."],
    bestCase: "O(n) - Saat data sudah terurut. Ia hanya mengecek angka sebelumnya sekali, lalu langsung pindah.",
    worstCase: "O(n²) - Saat data terbalik total (Descending). Semua angka harus digeser perlahan-lahan ke kanan.",
    spaceComp: "O(1) - Menggunakan sangat sedikit overhead memori.",
    mechanism: [
      "Anggap angka pertama di indeks 0 sudah berada dalam keadaan terurut.",
      "Ambil angka di sebelahnya (indeks 1) sebagai 'Kunci' (Key) yang akan disisipkan.",
      "Bandingkan 'Kunci' dengan angka di sebelah kirinya secara mundur.",
      "Jika angka di sebelah kiri lebih besar dari 'Kunci', geser angka tersebut satu posisi ke kanan.",
      "Terus bandingkan dan geser ke kanan hingga menemukan angka yang lebih kecil dari 'Kunci'.",
      "Letakkan 'Kunci' di posisi kosong yang baru saja terbuka. Ulangi proses."
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
    citation: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys."
  },
  'quick-sort': {
    title: "Quick Sort", badge: "Lanjutan • O(n log n)",
    analogy: "Bayangkan Anda harus memisahkan ratusan berkas ujian. Anda mengambil satu berkas acak sebagai 'Standar' (Pivot). Semua ujian di bawah standar ditaruh di tumpukan kiri, yang di atas standar di tumpukan kanan. Lalu Anda mengulangi pemisahan itu pada masing-masing tumpukan.",
    concept: "Quick Sort adalah algoritma Divide and Conquer terbaik. Algoritma ini menunjuk satu angka sebagai 'Pivot'. Ia lalu memerintahkan dua pointer untuk menggiring semua angka kecil ke wilayah kiri Pivot, dan semua angka besar ke wilayah kanan. Setelah itu, Pivot diposisikan di tengah sebagai batas permanen. Proses ini diulangi secara rekursif pada sub-array kiri dan kanan.",
    pros: ["Kompleksitas waktu rata-rata sangat cepat yaitu O(n log n), ideal untuk Big Data.", "Bekerja secara In-Place dengan konsumsi memori rekursif hanya O(log n).", "Kompatibilitas cache CPU (cache locality) yang sangat optimal."],
    cons: ["Jika tebakan Pivot selalu salah, kecepatannya runtuh menjadi O(n²).", "Bersifat Unstable Sort dan berisiko Stack Overflow jika rekursi terlalu dalam."],
    bestCase: "O(n log n) - Terjadi saat nilai Pivot selalu membelah array menjadi dua bagian seimbang.",
    worstCase: "O(n²) - Terjadi jika pivot selalu jatuh pada elemen paling ekstrem (terkecil/terbesar).",
    spaceComp: "O(log n) - Membutuhkan ruang Stack untuk pemanggilan fungsi rekursif.",
    mechanism: [
      "Pilih salah satu angka di array sebagai Pivot (umumnya mengambil elemen paling kanan).",
      "Buat batas wilayah imajiner di sebelah kiri untuk mengumpulkan angka-angka kecil.",
      "Pindai seluruh array. Jika menemukan angka <= Pivot, lempar angka tersebut ke dalam batas wilayah kecil.",
      "Letakkan Pivot tepat di sebelah kanan wilayah kecil tersebut. Pivot kini terkunci di posisi akhirnya.",
      "Array terbelah dua (Kiri < Pivot, Kanan > Pivot).",
      "Lakukan kembali langkah secara rekursif pada sub-array kiri dan kanan."
    ],
    pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        pivot_idx = partition(A, low, high)
        quickSort(A, low, pivot_idx - 1)
        quickSort(A, pivot_idx + 1, high)
    end if
end procedure

procedure partition(A, low, high) returns int
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
    citation: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15."
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlgorithmDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const material = journalMaterials[resolvedParams.slug];

  if (!material) {
    return (
      <div className="min-h-screen bg-white text-center py-32">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Modul Tidak Ditemukan</h1>
        <Link href="/catalog" className="text-blue-600 hover:underline">Kembali ke Katalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm hidden md:block">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/catalog" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
            ← Silabus Modul
          </Link>
          <div className="text-[10px] font-extrabold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-md uppercase tracking-wider">
            {material.title}
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 flex-1">
        <header className="mb-14">
          <div className="text-sm font-extrabold text-blue-600 mb-4 tracking-widest uppercase">
            {material.badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            {material.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            {material.concept}
          </p>
        </header>

        <div className="space-y-12 text-slate-800 leading-loose text-base md:text-lg">
          <section className="bg-amber-50 border border-amber-200 p-6 md:p-8 rounded-2xl">
            <h2 className="text-sm font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>💡</span> Analogi Sederhana Dunia Nyata
            </h2>
            <p className="text-amber-950 font-medium leading-relaxed">{material.analogy}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-slate-200 py-10">
            <div>
              <h3 className="text-base font-extrabold text-emerald-700 flex items-center gap-2 mb-4">✔️ Keunggulan</h3>
              <ul className="space-y-3">
                {material.pros.map((pro: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="text-emerald-500 font-bold mt-1">•</span><span className="text-slate-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-rose-700 flex items-center gap-2 mb-4">⚠️ Kelemahan</h3>
              <ul className="space-y-3">
                {material.cons.map((con: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="text-rose-500 font-bold mt-1">•</span><span className="text-slate-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Bagaimana Cara Kerjanya?</h2>
            <div className="space-y-4">
              {material.mechanism.map((step: string, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                  <div className="w-8 h-8 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                  <p className="pt-1 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Analisis Kompleksitas</h2>
            <ul className="space-y-6">
              <li>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kecepatan Terbaik (Best Case)</div>
                <div className="font-mono text-emerald-700 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded mb-2 text-sm">{material.bestCase.split('-')[0]}</div>
                <p className="text-sm text-slate-600">{material.bestCase.split('-')[1]}</p>
              </li>
              <li>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kecepatan Terburuk (Worst Case)</div>
                <div className="font-mono text-rose-700 font-bold bg-rose-50 inline-block px-2 py-0.5 rounded mb-2 text-sm">{material.worstCase.split('-')[0]}</div>
                <p className="text-sm text-slate-600">{material.worstCase.split('-')[1]}</p>
              </li>
              <li>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Konsumsi Memori (Space Complexity)</div>
                <div className="font-mono text-blue-700 font-bold bg-blue-50 inline-block px-2 py-0.5 rounded mb-2 text-sm">{material.spaceComp.split('-')[0]}</div>
                <p className="text-sm text-slate-600">{material.spaceComp.split('-')[1]}</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Pseudocode Standar</h2>
            <div className="bg-[#0d1117] p-6 rounded-2xl overflow-x-auto border border-slate-800 shadow-xl">
              <pre className="text-sm font-mono leading-relaxed text-blue-300">
                {material.pseudocode.replace(/procedure/g, '<span class="text-rose-400">procedure</span>')
                                    .replace(/for/g, '<span class="text-purple-400">for</span>')
                                    .replace(/if/g, '<span class="text-purple-400">if</span>')
                                    .replace(/while/g, '<span class="text-purple-400">while</span>')
                                    .replace(/swap/g, '<span class="text-emerald-400">swap</span>')
                                    .replace(/return/g, '<span class="text-rose-400">return</span>')}
              </pre>
            </div>
            <div className="mt-6 text-xs text-slate-500 font-mono">Referensi: {material.citation}</div>
          </section>

          {/* BOX EVALUASI KUIS DAN SIMULATOR TERPISAH */}
          <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Selesai Membaca Modul?</h3>
              <p className="text-slate-300 mb-10 max-w-lg mx-auto leading-relaxed">
                Uji pemahaman Anda melalui 8 pertanyaan kuis evaluasi singkat, atau langsung terapkan teori ini di dalam Simulator interaktif.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/algorithm/${resolvedParams.slug}/quiz`} 
                  className="w-full sm:w-auto bg-blue-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2"
                >
                  Mulai Kuis Evaluasi
                </Link>
                <Link 
                  href="/playground" 
                  className="w-full sm:w-auto bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all hover:bg-slate-700 flex items-center justify-center gap-2"
                >
                  Langsung ke Simulator
                </Link>
              </div>
            </div>
          </div>

        </div>
      </article>
      
      <Footer />
    </div>
  );
}
