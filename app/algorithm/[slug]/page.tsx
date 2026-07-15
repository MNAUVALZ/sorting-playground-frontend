'use client';

import { useEffect, useRef, useState, use } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrayBar from '@/components/visualizer/ArrayBar';
import CodeViewer from '@/components/scrollytelling/CodeViewer';
import Link from 'next/link';
import { ArrowLeft, Clock, Database, Sparkles, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Data Lengkap 4 Algoritma Sorting
const algorithmsData: Record<string, any> = {
  'bubble-sort': {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    desc: 'Algoritma pengurutan sederhana yang berulang kali melangkah melintasi daftar, membandingkan elemen yang bersebelahan, dan menukarnya jika posisinya salah.',
    steps: [
      { title: 'Kondisi Awal Array', text: 'Kita memiliki array acak berisikan 5 angka. Tujuan kita adalah mengurutkannya dari yang terkecil ke terbesar ke arah kanan.', array: [25, 12, 30, 10, 18], comparing: [], swapping: [], sorted: [] },
      { title: 'Bandingkan Pasangan Pertama', text: 'Bandingkan elemen pertama (25) dengan kedua (12). Karena 25 lebih besar dari 12, kita harus menukar posisi keduanya.', array: [25, 12, 30, 10, 18], comparing: [0, 1], swapping: [0, 1], sorted: [] },
      { title: 'Tukar & Lanjut ke Berikutnya', text: 'Posisi 12 dan 25 sudah bertukar. Sekarang bandingkan elemen kedua (25) dengan ketiga (30). Karena 25 sudah lebih kecil dari 30, posisi tetap.', array: [12, 25, 30, 10, 18], comparing: [1, 2], swapping: [], sorted: [] },
      { title: 'Elemen Terbesar Mengapung', text: 'Setelah terus membandingkan sampai ujung kanan, angka terbesar (30) kini sudah berada di posisi paling kanan (terurut).', array: [12, 25, 10, 18, 30], comparing: [], swapping: [], sorted: [4] },
      { title: 'Iterasi Selesai!', text: 'Proses diulang untuk elemen tersisa hingga seluruh balok array berwarna hijau dan terurut secara sempurna.', array: [10, 12, 18, 25, 30], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4] },
    ],
    snippets: [
      { language: 'php', label: 'PHP', code: `<?php\nfunction bubbleSort(array $arr): array {\n    $n = count($arr);\n    for ($i = 0; $i < $n; $i++) {\n        for ($j = 0; $j < $n - $i - 1; $j++) {\n            if ($arr[$j] > $arr[$j + 1]) {\n                $temp = $arr[$j];\n                $arr[$j] = $arr[$j + 1];\n                $arr[$j + 1] = $temp;\n            }\n        }\n    }\n    return $arr;\n}` },
      { language: 'python', label: 'Python', code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr` },
      { language: 'cpp', label: 'C++', code: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1])\n                swap(arr[j], arr[j + 1]);\n}` },
    ]
  },
  'selection-sort': {
    name: 'Selection Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    desc: 'Membagi array menjadi bagian terurut dan belum terurut, lalu mencari nilai terkecil secara berulang untuk ditaruh di posisi terdepan.',
    steps: [
      { title: 'Kondisi Awal Array', text: 'Semua elemen berada di zona belum terurut. Kita akan mencari elemen dengan nilai terkecil di seluruh array.', array: [29, 10, 14, 37, 13], comparing: [], swapping: [], sorted: [] },
      { title: 'Cari Nilai Terkecil', text: 'Setelah memindai seluruh array, kita menemukan bahwa 10 adalah elemen terkecil saat ini.', array: [29, 10, 14, 37, 13], comparing: [0, 1], swapping: [], sorted: [] },
      { title: 'Tukar ke Posisi Depan', text: 'Tukar elemen terkecil (10) dengan elemen di indeks pertama (29). Kini indeks ke-0 sudah terurut sempurna!', array: [10, 29, 14, 37, 13], comparing: [], swapping: [0, 1], sorted: [0] },
      { title: 'Iterasi Berikutnya', text: 'Ulangi pencarian di sisa array yang belum terurut. Nilai terkecil berikutnya adalah 13, tukar dengan 29.', array: [10, 13, 14, 37, 29], comparing: [], swapping: [1, 4], sorted: [0, 1] },
      { title: 'Seluruh Array Terurut', text: 'Proses berlanjut sampai semua elemen bergeser ke tempat yang tepat.', array: [10, 13, 14, 29, 37], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4] },
    ],
    snippets: [
      { language: 'php', label: 'PHP', code: `<?php\nfunction selectionSort(array $arr): array {\n    $n = count($arr);\n    for ($i = 0; $i < $n - 1; $i++) {\n        $minIdx = $i;\n        for ($j = $i + 1; $j < $n; $j++) {\n            if ($arr[$j] < $arr[$minIdx]) {\n                $minIdx = $j;\n            }\n        }\n        $temp = $arr[$i];\n        $arr[$i] = $arr[$minIdx];\n        $arr[$minIdx] = $temp;\n    }\n    return $arr;\n}` },
      { language: 'python', label: 'Python', code: `def selection_sort(arr):\n    for i in range(len(arr) - 1):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr` },
      { language: 'cpp', label: 'C++', code: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        swap(arr[min_idx], arr[i]);\n    }\n}` }
    ]
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    desc: 'Membangun array terurut satu per satu dengan cara menyisipkan elemen ke posisi yang tepat di sisi kirinya, mirip seperti menyusun kartu remi di tangan.',
    steps: [
      { title: 'Kondisi Awal Array', text: 'Kita anggap elemen pertama (22) sudah berada di zona terurut. Kita akan mulai memeriksa dari elemen kedua.', array: [22, 15, 38, 10, 25], comparing: [], swapping: [], sorted: [0] },
      { title: 'Ambil & Sisipkan Elemen Ke-2', text: 'Ambil angka 15. Bandingkan dengan elemen di kirinya (22). Karena 15 < 22, geser 22 ke kanan dan sisipkan 15 di paling depan.', array: [15, 22, 38, 10, 25], comparing: [0, 1], swapping: [0, 1], sorted: [0, 1] },
      { title: 'Periksa Elemen Ke-3', text: 'Ambil angka 38. Bandingkan dengan 22. Karena 38 > 22, posisinya sudah tepat di kanan tanpa perlu digeser.', array: [15, 22, 38, 10, 25], comparing: [1, 2], swapping: [], sorted: [0, 1, 2] },
      { title: 'Sisipkan Elemen Terkecil', text: 'Ambil angka 10. Bandingkan berturut-turut dengan 38, 22, dan 15. Karena 10 paling kecil, geser semua ke kanan dan sisipkan 10 di ujung kiri.', array: [10, 15, 22, 38, 25], comparing: [0, 3], swapping: [0, 3], sorted: [0, 1, 2, 3] },
      { title: 'Penyisipan Terakhir', text: 'Ambil angka 25. Sisipkan tepat di antara 22 dan 38. Kini seluruh elemen array telah terurut sempurna!', array: [10, 15, 22, 25, 38], comparing: [2, 3], swapping: [3, 4], sorted: [0, 1, 2, 3, 4] },
    ],
    snippets: [
      { language: 'php', label: 'PHP', code: `<?php\nfunction insertionSort(array $arr): array {\n    $n = count($arr);\n    for ($i = 1; $i < $n; $i++) {\n        $key = $arr[$i];\n        $j = $i - 1;\n        while ($j >= 0 && $arr[$j] > $key) {\n            $arr[$j + 1] = $arr[$j];\n            $j--;\n        }\n        $arr[$j + 1] = $key;\n    }\n    return $arr;\n}` },
      { language: 'python', label: 'Python', code: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr` },
      { language: 'cpp', label: 'C++', code: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}` }
    ]
  },
  'quick-sort': {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    space: 'O(log n)',
    desc: 'Algoritma Divide & Conquer berkecepatan tinggi yang memilih satu elemen sebagai Pivot, lalu mempartisi array agar elemen kecil di kiri dan elemen besar di kanan.',
    steps: [
      { title: 'Tentukan Elemen Pivot', text: 'Dari array [28, 15, 35, 12, 20], kita pilih elemen paling kanan yaitu 20 sebagai titik Pivot.', array: [28, 15, 35, 12, 20], comparing: [4], swapping: [], sorted: [] },
      { title: 'Partisi Array', text: 'Bandingkan setiap angka dengan Pivot 20. Angka 15 dan 12 lebih kecil (kelompok kiri), sedangkan 28 dan 35 lebih besar (kelompok kanan).', array: [15, 12, 28, 35, 20], comparing: [0, 1, 4], swapping: [0, 1], sorted: [] },
      { title: 'Kunci Posisi Pivot', text: 'Tempatkan Pivot 20 tepat di tengah antara kelompok kiri dan kanan. Posisi angka 20 kini sudah final dan terurut!', array: [15, 12, 20, 35, 28], comparing: [], swapping: [2, 4], sorted: [2] },
      { title: 'Sort Sub-array Kiri & Kanan', text: 'Secara rekursif, jalankan proses yang sama untuk sub-array kiri [15, 12] menjadi [12, 15] dan sub-array kanan [35, 28] menjadi [28, 35].', array: [12, 15, 20, 28, 35], comparing: [0, 1, 3, 4], swapping: [0, 1, 3, 4], sorted: [2] },
      { title: 'Penggabungan Selesai', text: 'Seluruh sub-array kini telah menyatu kembali dalam urutan yang tepat dengan kecepatan pemrosesan logaritmik yang sangat efisien.', array: [12, 15, 20, 28, 35], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4] },
    ],
    snippets: [
      { language: 'php', label: 'PHP', code: `<?php\nfunction quickSort(array $arr): array {\n    $length = count($arr);\n    if ($length <= 1) return $arr;\n    \n    $pivot = $arr[0];\n    $left = $right = [];\n    \n    for ($i = 1; $i < $length; $i++) {\n        if ($arr[$i] < $pivot) {\n            $left[] = $arr[$i];\n        } else {\n            $right[] = $arr[$i];\n        }\n    }\n    \n    return array_merge(quickSort($left), [$pivot], quickSort($right));\n}` },
      { language: 'python', label: 'Python', code: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)` },
      { language: 'cpp', label: 'C++', code: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}` }
    ]
  },
  'default': {
    name: 'Algoritma Sorting',
    complexity: 'O(n log n)',
    space: 'O(1)',
    desc: 'Visualisasi interaktif untuk memahami bagaimana data dipindahkan dan diurutkan secara sistematis di dalam memori komputer.',
    steps: [
      { title: 'Langkah 1: Inisiasi Data', text: 'Mempersiapkan data array sebelum diolah oleh algoritma.', array: [20, 35, 15, 40, 10], comparing: [], swapping: [], sorted: [] },
      { title: 'Langkah 2: Pemrosesan', text: 'Algoritma mulai membandingkan elemen-elemen kunci.', array: [20, 15, 35, 10, 40], comparing: [1, 2], swapping: [1, 2], sorted: [] },
      { title: 'Langkah 3: Tahap Akhir', text: 'Data telah berhasil diurutkan dengan sempurna.', array: [10, 15, 20, 35, 40], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4] }
    ],
    snippets: [{ language: 'php', label: 'PHP', code: '// Sintaks akan segera tersedia melalui API Laravel.' }]
  }
};

// --- BAGIAN INI YANG SEBELUMNYA HILANG / TERPUTUS ---
export default function AlgorithmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const data = algorithmsData[slug] || algorithmsData['default'];

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStepIdx(index);
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [data]);

  const currentStepData = data.steps[activeStepIdx] || data.steps[0];
  const maxValue = Math.max(...currentStepData.array, 1);

  const getBarState = (idx: number) => {
    if (currentStepData.sorted.includes(idx)) return 'sorted';
    if (currentStepData.swapping.includes(idx)) return 'swapping';
    if (currentStepData.comparing.includes(idx)) return 'comparing';
    return 'default';
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
          <span className="font-mono text-sm font-bold text-blue-400 bg-blue-950/50 px-3 py-1 rounded-full border border-blue-800/50">
            {data.name}
          </span>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-12 pb-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Waktu: {data.complexity}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Memori: {data.space}</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          {data.name}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          {data.desc}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-6 space-y-32 py-12">
          {data.steps.map((step: any, idx: number) => (
            <div
              key={idx}
              ref={(el) => { stepRefs.current[idx] = el; }}
              className={`p-8 rounded-3xl border transition-all duration-500 ${
                activeStepIdx === idx
                  ? 'bg-slate-900/90 border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-100 opacity-100'
                  : 'bg-slate-900/30 border-slate-800/60 scale-95 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  Langkah {idx + 1}
                </span>
                {activeStepIdx === idx && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" /> Aktif
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6">
          <div className="sticky top-28 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Visualisasi Live Array
              </span>
              <span className="text-xs font-mono text-slate-500">
                Posisi: Langkah {activeStepIdx + 1} / {data.steps.length}
              </span>
            </div>

            <div className="flex items-end justify-center gap-4 h-[220px] w-full px-4 pt-4">
              {currentStepData.array.map((val: number, idx: number) => (
                <ArrayBar
                  key={idx}
                  value={val}
                  maxValue={maxValue}
                  state={getBarState(idx)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-slate-800/80 text-xs font-medium text-slate-400 mt-6">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-600 block" /> Normal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-400 block" /> Membandingkan
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500 block" /> Tukar Posisi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 block" /> Terurut
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Sintaks Pemrograman
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Pelajari bagaimana algoritma {data.name} ditulis dalam berbagai bahasa pemrograman populer.
        </p>
        
        <CodeViewer snippets={data.snippets} />
      </section>
    </main>
  );
}