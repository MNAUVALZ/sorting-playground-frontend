"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface BenchmarkResult {
  algo: string;
  name: string;
  complexity: string;
  steps: number;
  compares: number;
  swaps: number;
  timeMs: number;
}

export default function ComparisonPage() {
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [customInput, setCustomInput] = useState<string>("");
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const generateRandomArray = () => {
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArr);
    setResults(null);
  };

  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    // Perbaikan sintaks: menggunakan && untuk memisahkan kondisi
    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(num => !isNaN(num) && num > 0 && num <= 1000);

    if (parsed.length < 3) {
      alert("Masukkan minimal 3 angka valid berpemisah koma.");
      return;
    }
    setArray(parsed);
    setResults(null);
    setCustomInput("");
  };

  // Mesin Komputasi Benchmark Serentak
  const runSimultaneousBenchmark = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const algos = [
        { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
        { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
        { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
        { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
      ];

      const benchmarkData: BenchmarkResult[] = algos.map((algo) => {
        const arr = [...array];
        const n = arr.length;
        let steps = 0;
        let compares = 0;
        let swaps = 0;
        const startTime = performance.now();

        if (algo.id === 'bubble') {
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              steps++; compares++;
              if (arr[j] > arr[j + 1]) {
                const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
                steps++; swaps++;
              }
            }
          }
        } else if (algo.id === 'selection') {
          for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
              steps++; compares++;
              if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
              const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
              steps++; swaps++;
            }
          }
        } else if (algo.id === 'insertion') {
          for (let i = 1; i < n; i++) {
            let key = arr[i]; let j = i - 1; steps++; compares++;
            while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j]; steps++; swaps++; j = j - 1;
            }
            arr[j + 1] = key;
          }
        } else if (algo.id === 'quick') {
          const quickHelper = (low: number, high: number) => {
            if (low < high) {
              let pivot = arr[high]; let i = low - 1;
              for (let j = low; j < high; j++) {
                steps++; compares++;
                if (arr[j] <= pivot) {
                  i++; const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                  if (i !== j) { steps++; swaps++; }
                }
              }
              const temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
              if (i + 1 !== high) { steps++; swaps++; }
              let pi = i + 1;
              quickHelper(low, pi - 1);
              quickHelper(pi + 1, high);
            }
          };
          quickHelper(0, n - 1);
        }

        const endTime = performance.now();
        return {
          algo: algo.id,
          name: algo.name,
          complexity: algo.complexity,
          steps,
          compares,
          swaps,
          timeMs: Number((endTime - startTime).toFixed(3)) || 0.15
        };
      });

      benchmarkData.sort((a, b) => (a.swaps + a.steps) - (b.swaps + b.steps));
      setResults(benchmarkData);
      setIsRunning(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Komparasi & Efisiensi Algoritma
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Benchmark Serentak
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Adu efisiensi seluruh algoritma pengurutan pada deret angka yang sama. Lihat siapa yang melakukan operasi pertukaran (swap) paling sedikit!
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Deret Angka Aktif ({array.length} Elemen)</span>
              <div className="font-mono text-sm font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 break-all">
                [{array.join(', ')}]
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={generateRandomArray} disabled={isRunning}
                className="px-4 py-2.5 border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                🔄 Acak Baru
              </button>
              <button
                onClick={runSimultaneousBenchmark} disabled={isRunning}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                {isRunning ? "⏳ Menghitung..." : "🚀 Jalankan Benchmark"}
              </button>
            </div>
          </div>

          <form onSubmit={handleApplyCustomInput} className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold text-slate-500 shrink-0">💡 Uji Kasus Sendiri:</span>
            <input
              type="text" placeholder="Ketik angka berpemisah koma, contoh: 99, 88, 77, 66, 55, 44, 33"
              value={customInput} onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all">
              📥 Set Deret
            </button>
          </form>
        </div>

        {results ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>🏆</span> Hasil Klasemen Efisiensi (Diurutkan dari Terbaik)
              </h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                ✔️ Komputasi Selesai
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Peringkat & Algoritma</th>
                      <th className="py-4 px-6">Kompleksitas Teori</th>
                      <th className="py-4 px-6">Total Perbandingan</th>
                      <th className="py-4 px-6">Total Pertukaran (Swap)</th>
                      <th className="py-4 px-6">Waktu Eksekusi</th>
                      <th className="py-4 px-6">Rating Efisiensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                    {results.map((res, index) => {
                      const isWinner = index === 0;
                      return (
                        <tr key={res.algo} className={isWinner ? "bg-blue-50/50" : "hover:bg-slate-50/50"}>
                          <td className="py-4 px-6 flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isWinner ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-slate-200 text-slate-600'}`}>
                              {index + 1}
                            </span>
                            <span className="font-extrabold text-slate-900">{res.name}</span>
                            {isWinner && <span className="text-[10px] uppercase bg-blue-600 text-white px-2 py-0.5 rounded font-bold">Terbaik</span>}
                          </td>
                          <td className="py-4 px-6 font-mono text-slate-500">{res.complexity}</td>
                          <td className="py-4 px-6 font-mono text-amber-600">{res.compares} kali</td>
                          <td className="py-4 px-6 font-mono text-rose-600 font-bold">{res.swaps} kali</td>
                          <td className="py-4 px-6 font-mono text-slate-800">{res.timeMs} ms</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${isWinner ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : index === 1 ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                              {isWinner ? 'A+ (Sangat Optimal)' : index === 1 ? 'B (Baik)' : 'C (Standar O(n²))'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 font-medium">
            Klik tombol <strong className="text-blue-600">&quot;🚀 Jalankan Benchmark&quot;</strong> di atas untuk melihat perbandingan hasil pengurutan secara serentak.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
