"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function ToolkitPage() {
  const [activeLang, setActiveLang] = useState<string>('Python');

  const snippets: Record<string, string> = {
    'Python': `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,

    'Java': `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}`,

    'C++': `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,

    'PHP': `function quickSort($array) {
    if (count($array) < 2) {
        return $array;
    }
    $left = $right = array();
    reset($array);
    $pivot_key = key($array);
    $pivot = array_shift($array);
    
    foreach ($array as $k => $v) {
        if ($v < $pivot) $left[$k] = $v;
        else $right[$k] = $v;
    }
    return array_merge(quickSort($left), array($pivot_key => $pivot), quickSort($right));
}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    alert("Kode berhasil disalin!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full animate-fadeIn">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">Resource Tambahan</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">🧰 Toolkit Akademis</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Pustaka blok kode siap pakai untuk tugas pemrograman Anda, beserta fitur pencetakan laporan untuk keperluan akademis.</p>
        </div>

        {/* BAGIAN 1: SNIPPET KODE */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><span>💻</span> Pustaka Kode (Quick Sort Teroptimasi)</h2>
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800">
            <div className="flex bg-slate-950 px-4 pt-4 gap-2 border-b border-slate-800">
              {Object.keys(snippets).map(lang => (
                <button
                  key={lang} onClick={() => setActiveLang(lang)}
                  className={`px-6 py-2.5 rounded-t-xl font-bold text-sm transition-colors ${activeLang === lang ? 'bg-slate-800 text-blue-400' : 'bg-transparent text-slate-500 hover:text-slate-300'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="p-6 relative">
              <button onClick={copyToClipboard} className="absolute top-6 right-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all border border-slate-700">
                📄 Copy Code
              </button>
              <pre className="text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {snippets[activeLang]}
              </pre>
            </div>
          </div>
        </section>

        {/* BAGIAN 2: PANDUAN EKSPOR LAPORAN */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><span>🖨️</span> Fitur Ekspor Laporan PDF</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-blue-900 font-medium">Simulator kami telah dilengkapi fitur <strong>Cetak PDF (Print Layout)</strong> khusus. Fitur ini dirancang untuk menyembunyikan tombol-tombol antarmuka dan hanya mencetak <strong className="text-blue-700">Tabel Riwayat Penuh (Trace Table)</strong> dalam format yang sangat rapi untuk laporan tugas Anda.</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 font-medium">
                <li>Buka menu Simulator dan jalankan pengurutan.</li>
                <li>Pilih tab algoritma di Tabel Trace bagian bawah.</li>
                <li>Klik tombol <strong>"🖨️ Ekspor PDF Laporan"</strong>.</li>
                <li>Browser akan membuka menu cetak (Pilih 'Save as PDF').</li>
              </ol>
              <div className="pt-4">
                <Link href="/playground" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Coba Cetak Laporan Sekarang
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white p-4 rounded-xl border border-blue-100 shadow-sm opacity-80 rotate-2">
              <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
              <div className="h-2 bg-slate-100 rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                <div className="h-8 bg-blue-50 border border-blue-100 rounded"></div>
                <div className="h-8 bg-slate-50 border border-slate-100 rounded"></div>
                <div className="h-8 bg-slate-50 border border-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
