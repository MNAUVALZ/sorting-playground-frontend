"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function ToolkitPage() {
  const [activeAlgo, setActiveAlgo] = useState<string>('Quick Sort');
  const [activeLang, setActiveLang] = useState<string>('Python');

  const algos = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort'];
  const langs = ['Python', 'Java', 'C++', 'PHP'];

  const snippets: Record<string, Record<string, string>> = {
    'Bubble Sort': {
      'Python': `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr`,
      'Java': `public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    boolean swapped;\n    for (int i = 0; i < n - 1; i++) {\n        swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
      'C++': `void bubbleSort(int arr[], int n) {\n    bool swapped;\n    for (int i = 0; i < n - 1; i++) {\n        swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
      'PHP': `function bubbleSort(&$arr) {\n    $n = sizeof($arr);\n    for ($i = 0; $i < $n; $i++) {\n        $swapped = false;\n        for ($j = 0; $j < $n - $i - 1; $j++) {\n            if ($arr[$j] > $arr[$j + 1]) {\n                $temp = $arr[$j];\n                $arr[$j] = $arr[$j + 1];\n                $arr[$j + 1] = $temp;\n                $swapped = true;\n            }\n        }\n        if (!$swapped) break;\n    }\n}`
    },
    'Selection Sort': {
      'Python': `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        if min_idx != i:\n            arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr`,
      'Java': `public static void selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        }\n        if (min_idx != i) {\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}`,
      'C++': `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        }\n        if (min_idx != i) {\n            swap(arr[min_idx], arr[i]);\n        }\n    }\n}`,
      'PHP': `function selectionSort(&$arr) {\n    $n = count($arr);\n    for ($i = 0; $i < $n - 1; $i++) {\n        $min_idx = $i;\n        for ($j = $i + 1; $j < $n; $j++) {\n            if ($arr[$j] < $arr[$min_idx])\n                $min_idx = $j;\n        }\n        if ($min_idx != $i) {\n            $temp = $arr[$i];\n            $arr[$i] = $arr[$min_idx];\n            $arr[$min_idx] = $temp;\n        }\n    }\n}`
    },
    'Insertion Sort': {
      'Python': `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`,
      'Java': `public static void insertionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 1; i < n; ++i) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      'C++': `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      'PHP': `function insertionSort(&$arr) {\n    $n = count($arr);\n    for ($i = 1; $i < $n; $i++) {\n        $key = $arr[$i];\n        $j = $i - 1;\n        while ($j >= 0 && $arr[$j] > $key) {\n            $arr[$j + 1] = $arr[$j];\n            $j = $j - 1;\n        }\n        $arr[$j + 1] = $key;\n    }\n}`
    },
    'Quick Sort': {
      'Python': `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
      'Java': `public static void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\nprivate static int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n    }\n    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;\n    return i + 1;\n}`,
      'C++': `void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pivot = arr[high];\n        int i = (low - 1);\n        for (int j = low; j <= high - 1; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr[i], arr[j]);\n            }\n        }\n        swap(arr[i + 1], arr[high]);\n        int pi = i + 1;\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
      'PHP': `function quickSort($array) {\n    if (count($array) < 2) return $array;\n    $left = $right = array();\n    reset($array);\n    $pivot_key = key($array);\n    $pivot = array_shift($array);\n    foreach ($array as $k => $v) {\n        if ($v < $pivot) $left[$k] = $v;\n        else $right[$k] = $v;\n    }\n    return array_merge(quickSort($left), array($pivot_key => $pivot), quickSort($right));\n}`
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[activeAlgo][activeLang]);
    alert("Kode berhasil disalin!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full animate-fadeIn">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">Resource Tambahan</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Toolkit Akademis</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">Pustaka blok kode siap pakai untuk tugas pemrograman Anda, beserta panduan pencetakan laporan untuk keperluan akademis.</p>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">Pustaka Kode Implementasi</h2>
          
          <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-auto overflow-x-auto">
              {algos.map(a => (
                <button key={a} onClick={() => setActiveAlgo(a)} className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-all ${activeAlgo === a ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
                  {a}
                </button>
              ))}
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-auto overflow-x-auto">
              {langs.map(l => (
                <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-all ${activeLang === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-b-2xl overflow-hidden shadow-md border border-slate-800">
            <div className="p-6 relative">
              <button onClick={copyToClipboard} className="absolute top-4 right-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all border border-slate-700">
                Copy Code
              </button>
              <pre className="text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed pt-8 sm:pt-0">
                {snippets[activeAlgo][activeLang]}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">Panduan Ekspor Laporan PDF</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-blue-900 font-medium text-sm sm:text-base">Simulator kami telah dilengkapi fitur <strong>Cetak PDF (Print Layout)</strong> khusus. Fitur ini dirancang untuk menyembunyikan tombol-tombol antarmuka dan hanya mencetak <strong className="text-blue-700">Tabel Riwayat Penuh (Trace Table)</strong> dalam format yang sangat rapi untuk laporan tugas Anda.</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 font-medium">
                <li>Buka menu Simulator dan jalankan pengurutan.</li>
                <li>Pilih tab algoritma di Tabel Trace bagian bawah.</li>
                <li>Klik tombol <strong>Ekspor PDF Laporan</strong>.</li>
                <li>Browser akan membuka menu cetak (Pilih Save as PDF).</li>
              </ol>
              <div className="pt-4">
                <Link href="/playground" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all">
                  Coba Cetak Laporan Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

