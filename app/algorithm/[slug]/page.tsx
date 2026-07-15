import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const journalMaterials: Record<string, {
  title: string;
  badge: string;
  analogy: string;
  concept: string;
  pros: string[];
  cons: string[];
  bestCase: string;
  worstCase: string;
  spaceComp: string;
  mechanism: string[];
  pseudocode: string;
  citation: string;
}> = {
  'bubble-sort': {
    title: "Bubble Sort",
    badge: "Pemula • O(n²)",
    analogy: "Bayangkan Anda sedang melihat gelembung udara di dalam air. Gelembung yang paling besar akan selalu naik ke permukaan lebih cepat. Begitu juga Bubble Sort: angka terbesar akan 'mengapung' ke posisi paling kanan pada setiap putarannya.",
    concept: "Bubble Sort adalah algoritma pengurutan paling dasar. Ia bekerja dengan memindai deretan angka dari kiri ke kanan. Ia akan melihat dua angka yang bersebelahan; jika angka sebelah kiri lebih besar dari angka sebelah kanan, ia akan menukarnya (swap). Proses ini diulang terus-menerus. Pada putaran pertama, angka paling besar dijamin sudah berada di ujung kanan. Pada putaran kedua, angka terbesar kedua berada di sebelahnya, dan seterusnya hingga tidak ada lagi angka yang perlu ditukar.",
    pros: [
      "Secara logika sangat mudah dipahami oleh programmer pemula.",
      "Algoritma ini bersifat Stabil (Stable), artinya dua angka yang bernilai sama tidak akan saling mendahului.",
      "Bisa berhenti lebih awal (Early Termination) jika mendeteksi array sudah terurut."
    ],
    cons: [
      "Sangat lambat untuk jumlah data yang banyak (Skala Kuadratik).",
      "Terlalu banyak melakukan pertukaran (swap), yang membebani kinerja memori komputer."
    ],
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
            /* Bandingkan elemen bersebelahan */
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        /* Optimasi: kurangi batas pemindaian */
        n = n - 1
    until not swapped
end procedure`,
    citation: "Astrachan, O. (2003). Bubble sort: an archaeological algorithmic analysis. ACM SIGCSE Bulletin."
  },
  'selection-sort': {
    title: "Selection Sort",
    badge: "Pemula • O(n²)",
    analogy: "Bayangkan Anda memiliki sekeranjang bola bernomor yang acak. Anda mencari seluruh keranjang untuk menemukan bola dengan nomor paling kecil, lalu mengeluarkannya dan meletakkannya di barisan paling depan. Lalu Anda mencari bola terkecil kedua dari sisa keranjang, dan meletakkannya di urutan kedua. Itulah Selection Sort.",
    concept: "Algoritma ini membagi array menjadi dua bagian imajiner: bagian 'terurut' di sebelah kiri dan 'belum terurut' di sebelah kanan. Daripada terus-menerus menukar elemen seperti Bubble Sort, Selection Sort hanya mencari indeks dari angka paling kecil di wilayah yang belum terurut. Setelah selesai memindai, ia hanya akan melakukan satu kali pertukaran (swap) untuk memindahkan angka terkecil tersebut ke batas wilayah terurut.",
    pros: [
      "Jumlah pertukaran memori (swap) sangat sedikit, maksimal hanya sebanyak N kali.",
      "Sangat cocok digunakan pada perangkat keras di mana proses 'Menulis' (Write) ke memori sangat mahal/lambat, seperti EEPROM pada mikrokontroler."
    ],
    cons: [
      "Tidak peduli datanya sudah terurut atau belum, ia tetap memindai seluruh sisa array (Tidak Adaptif).",
      "Termasuk algoritma yang Tidak Stabil (Unstable), posisi angka bernilai sama bisa tertukar secara tidak sengaja."
    ],
    bestCase: "O(n²) - Karena algoritma ini 'buta' terhadap urutan, ia tetap memindai semuanya untuk memastikan tidak ada angka yang lebih kecil.",
    worstCase: "O(n²) - Kompleksitas waktunya selalu pasti dan konstan di semua kondisi.",
    spaceComp: "O(1) - Mengurutkan langsung di dalam array aslinya (In-Place).",
    mechanism: [
      "Tandai batas awal wilayah 'belum terurut' di indeks 0. Asumsikan angka di indeks 0 ini adalah yang paling kecil (Minimum Sementara).",
      "Pindai sisa angka di sebelah kanannya satu per satu.",
      "Jika menemukan angka yang lebih kecil dari Minimum Sementara, catat indeks angka baru tersebut sebagai Minimum Sementara yang baru.",
      "Setelah mencapai ujung array, tukar angka di posisi Minimum Sementara dengan angka di batas awal wilayah.",
      "Geser batas awal wilayah satu langkah ke kanan. Ulangi proses hingga seluruh batas habis."
    ],
    pseudocode: `procedure selectionSort( A : array of items )
    n = length(A)
    for i = 0 to n - 2 do
        /* Asumsikan indeks saat ini adalah yang terkecil */
        min_idx = i
        
        /* Cari nilai terkecil di sisa array */
        for j = i + 1 to n - 1 do
            if A[j] < A[min_idx] then
                min_idx = j
            end if
        end for
        
        /* Tukar jika ditemukan angka yang lebih kecil */
        if min_idx != i then
            swap(A[i], A[min_idx])
        end if
    end for
end procedure`,
    citation: "Mishra, A. D., & Garg, D. (2008). Selection of best sorting algorithm. Int. J. of Intelligent Information Processing."
  },
  'insertion-sort': {
    title: "Insertion Sort",
    badge: "Menengah • O(n²)",
    analogy: "Ini adalah cara alamiah manusia menyusun kartu remi. Saat Anda mengambil satu kartu baru dari dek, Anda akan melihat susunan kartu di tangan kiri Anda (yang sudah terurut), mencari sela-sela yang pas, menggeser kartu lain, dan menyelipkan kartu baru tersebut ke posisinya.",
    concept: "Insertion Sort memproses data secara bertahap dari kiri ke kanan. Setiap kali algoritma berhadapan dengan elemen baru (kunci), ia akan menarik elemen tersebut, membandingkannya dengan elemen-elemen di sebelah kirinya secara mundur. Algoritma akan terus menggeser elemen-elemen besar ke kanan untuk 'membuka ruang', lalu menyisipkan kunci tersebut ke ruang kosong yang tepat.",
    pros: [
      "Algoritma ini 'Sadar Urutan' (Adaptif). Jika datanya sudah hampir terurut, ia bekerja secepat kilat.",
      "Online Sorting: Bisa langsung mengurutkan data baru yang datang belakangan tanpa perlu mengulang dari awal.",
      "Sangat cepat untuk array berukuran kecil (kurang dari 50 elemen)."
    ],
    cons: [
      "Sangat lambat untuk array berskala besar.",
      "Terlalu banyak operasi 'geser memori' (array shifting) jika angka terkecil terjebak di ujung kanan."
    ],
    bestCase: "O(n) - Saat data sudah terurut. Ia hanya mengecek angka sebelumnya sekali, lalu langsung pindah ke angka berikutnya.",
    worstCase: "O(n²) - Saat data terbalik total (Descending). Semua angka harus digeser perlahan-lahan ke kanan.",
    spaceComp: "O(1) - Menggunakan sangat sedikit overhead memori.",
    mechanism: [
      "Anggap angka pertama di indeks 0 sudah berada dalam keadaan terurut.",
      "Ambil angka di sebelahnya (indeks 1) sebagai 'Kunci' (Key) yang akan disisipkan.",
      "Bandingkan 'Kunci' dengan angka di sebelah kirinya.",
      "Jika angka di sebelah kiri lebih besar dari 'Kunci', geser angka tersebut satu posisi ke kanan (menutupi posisi Kunci asli).",
      "Terus bandingkan dan geser ke kanan hingga menemukan angka yang lebih kecil dari 'Kunci' (atau mencapai ujung paling kiri).",
      "Letakkan 'Kunci' di posisi kosong yang baru saja terbuka. Ambil angka berikutnya dan ulangi proses."
    ],
    pseudocode: `procedure insertionSort( A : array of items )
    n = length(A)
    for i = 1 to n - 1 do
        key = A[i]
        j = i - 1
        
        /* Geser elemen yang lebih besar ke kanan */
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        
        /* Sisipkan kunci di posisi kosong */
        A[j + 1] = key
    end for
end procedure`,
    citation: "Estivill-Castro, V., & Wood, D. (1992). A survey of adaptive sorting algorithms. ACM Computing Surveys."
  },
  'quick-sort': {
    title: "Quick Sort",
    badge: "Lanjutan • O(n log n)",
    analogy: "Bayangkan Anda harus memisahkan ratusan berkas ujian mahasiswa. Daripada mengurutkannya satu per satu, Anda mengambil satu berkas acak sebagai 'Standar Nilai' (Pivot). Semua ujian dengan nilai di bawah standar ditaruh di tumpukan kiri, yang di atas standar di tumpukan kanan. Lalu, Anda mengulangi pemisahan itu pada masing-masing tumpukan. Pemisahan kelompok besar ke kecil ini jauh lebih cepat!",
    concept: "Quick Sort adalah jantung dari komputasi modern dan merupakan salah satu algoritma Divide and Conquer terbaik. Algoritma ini tidak menggeser angka satu per satu. Ia menunjuk satu angka sebagai 'Pivot'. Ia lalu memerintahkan dua penunjuk (pointer) untuk menggiring semua angka kecil ke wilayah kiri Pivot, dan semua angka besar ke wilayah kanan. Setelah itu, Pivot diposisikan tepat di tengah sebagai batas permanen. Array kiri dan array kanan yang sudah terpisah kemudian diproses dengan cara yang persis sama (Rekursif).",
    pros: [
      "Kecepatan absolut! Ini adalah salah satu algoritma pengurutan tercepat yang ada dalam ilmu komputer (O(n log n)).",
      "Bekerja langsung di dalam array memori yang sama (In-Place), sehingga sangat efisien secara cache CPU dibandingkan Merge Sort.",
      "Digunakan sebagai pondasi fungsi pengurutan standar (.sort()) pada bahasa C++, Java, dan Python."
    ],
    cons: [
      "Jika tebakan 'Pivot' salah (selalu mengambil angka terkecil/terbesar), kinerjanya runtuh menjadi setara Bubble Sort.",
      "Sistem Rekursifnya dapat menyebabkan 'Stack Overflow' jika array yang dimasukkan terlalu panjang dan tidak dioptimasi."
    ],
    bestCase: "O(n log n) - Terjadi saat nilai Pivot selalu tepat membelah array menjadi dua bagian yang sama besar.",
    worstCase: "O(n²) - Terjadi jika pivot selalu jatuh pada elemen paling ujung (membutuhkan optimasi Random Pivot).",
    spaceComp: "O(log n) - Membutuhkan ruang tumpukan (Stack) di memori sistem untuk mengingat pemanggilan fungsi rekursif.",
    mechanism: [
      "Pilih salah satu angka di array sebagai Pivot (umumnya mengambil elemen paling kanan atau paling kiri).",
      "Buat batas wilayah imajiner di sebelah kiri untuk mengumpulkan angka-angka kecil.",
      "Pindai seluruh array dari ujung ke ujung. Jika menemukan angka yang lebih kecil dari Pivot, lempar angka tersebut ke dalam batas wilayah kecil di sebelah kiri.",
      "Setelah seluruh array dipindai, letakkan Pivot tepat di sebelah kanan wilayah kecil tersebut. Sekarang Pivot telah berada di posisi akhirnya yang sah.",
      "Array kini terbelah dua (Sub-array kiri < Pivot, Sub-array kanan > Pivot).",
      "Lakukan kembali langkah 1-4 secara terpisah untuk sub-array kiri dan sub-array kanan hingga pecahannya habis."
    ],
    pseudocode: `procedure quickSort(A : array of items, low : int, high : int)
    /* Proses membelah array secara rekursif */
    if low < high then
        pivot_idx = partition(A, low, high)
        quickSort(A, low, pivot_idx - 1)
        quickSort(A, pivot_idx + 1, high)
    end if
end procedure

procedure partition(A : array of items, low : int, high : int) returns int
    pivot = A[high]
    i = low - 1
    
    /* Giring semua angka kecil ke wilayah kiri */
    for j = low to high - 1 do
        if A[j] <= pivot then
            i = i + 1
            swap(A[i], A[j])
        end if
    end for
    
    /* Letakkan pivot di batas wilayah pemisah */
    swap(A[i + 1], A[high])
    return i + 1
end procedure`,
    citation: "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10-15."
  }
};

export default async function AlgorithmDetailPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const material = journalMaterials[resolvedParams?.slug];

  if (!material) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Sticky Sederhana */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/catalog" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
            ← Kembali ke Silabus
          </Link>
          <div className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {material.title}
          </div>
        </div>
      </div>

      {/* Area Membaca (Reading Layout ala Notion / Medium) */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Title Header */}
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

        {/* Konten Utama */}
        <div className="space-y-12 text-slate-800 leading-loose text-base md:text-lg">
          
          {/* Analogi Kotak Callout */}
          <section className="bg-amber-50 border border-amber-200 p-6 md:p-8 rounded-2xl">
            <h2 className="text-sm font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>💡</span> Analogi Sederhana Dunia Nyata
            </h2>
            <p className="text-amber-950 font-medium leading-relaxed">
              {material.analogy}
            </p>
          </section>

          {/* Kelebihan & Kekurangan */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-slate-200 py-10">
            <div>
              <h3 className="text-base font-extrabold text-emerald-700 flex items-center gap-2 mb-4">
                <span>✔️</span> Keunggulan
              </h3>
              <ul className="space-y-3">
                {material.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="text-emerald-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-rose-700 flex items-center gap-2 mb-4">
                <span>⚠️</span> Kelemahan
              </h3>
              <ul className="space-y-3">
                {material.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="text-rose-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Cara Kerja (Step by step) */}
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Bagaimana Cara Kerjanya?</h2>
            <p className="text-slate-600 mb-6">Berikut adalah urutan logika yang dilakukan oleh algoritma ini di dalam memori komputer:</p>
            <div className="space-y-4">
              {material.mechanism.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                  <div className="w-8 h-8 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="pt-1 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Analisis Kompleksitas */}
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

          {/* Pseudocode & Jurnal */}
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Pseudocode Standar</h2>
            <div className="bg-[#0d1117] p-6 rounded-2xl overflow-x-auto border border-slate-800 shadow-2xl">
              <pre className="text-sm font-mono leading-relaxed text-blue-300">
                {material.pseudocode.replace(/procedure/g, '<span class="text-rose-400">procedure</span>')
                                    .replace(/for/g, '<span class="text-purple-400">for</span>')
                                    .replace(/if/g, '<span class="text-purple-400">if</span>')
                                    .replace(/while/g, '<span class="text-purple-400">while</span>')
                                    .replace(/swap/g, '<span class="text-emerald-400">swap</span>')
                                    .replace(/return/g, '<span class="text-rose-400">return</span>')}
              </pre>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200 text-sm text-slate-500">
              <span className="font-bold text-slate-800">Sumber Literatur Ilmiah:</span><br/>
              {material.citation}
            </div>
          </section>
          
        </div>

        {/* Bottom CTA (Lompat ke Simulator) */}
        <div className="mt-16 bg-blue-600 rounded-3xl p-10 text-center shadow-[0_10px_40px_rgba(37,99,235,0.3)]">
          <h3 className="text-2xl font-extrabold text-white mb-4">Sudah Paham Teorinya?</h3>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Sekarang saatnya melihat bagaimana kode-kode di atas berjalan nyata menyusun balok array di dalam Simulator.</p>
          <Link href="/playground" className="inline-block bg-white text-blue-600 font-extrabold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
            Buka Simulator Sekarang
          </Link>
        </div>

      </article>
    </div>
  );
}
