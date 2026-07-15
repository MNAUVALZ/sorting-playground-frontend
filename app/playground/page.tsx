"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ArrayBar from '@/components/visualizer/ArrayBar';

export default function PlaygroundPage() {
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speed, setSpeed] = useState<number>(300);
  const [customInput, setCustomInput] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const [comparingIdx, setComparingIdx] = useState<number[]>([]);
  const [swappedIdx, setSwappedIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);
  
  const [logs, setLogs] = useState<string[]>([
    "💬 System ready (Hybrid Architecture). Pilih algoritma atau masukkan deret angka manual, lalu klik 'Visualisasikan'."
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const generateRandomArray = () => {
    if (isPlaying) return;
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArr);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    setLogs(prev => [...prev, `🔄 Array baru diacak: [${newArr.join(', ')}]`]);
  };

  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;

    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(num => !isNaN(num) && num > 0 && num <= 500);

    if (parsed.length < 3) {
      addLog("⚠️ Input gagal: Masukkan minimal 3 angka valid berpemisah koma (contoh: 10, 50, 23).");
      return;
    }
    if (parsed.length > 20) {
      addLog("⚠️ Terlalu banyak elemen: Maksimal 20 angka agar visualisasi balok tetap optimal.");
      return;
    }

    setArray(parsed);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    addLog(`🛠️ Data manual berhasil diterapkan: [${parsed.join(', ')}]`);
    setCustomInput("");
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-30), msg]);
  };

  // --- MESIN KOMPUTASI LOKAL (OFFLINE FALLBACK ENGINE) ---
  // Bertugas menghitung langkah visualisasi jika Cloud Railway sedang tidur/error
  const computeLocalSteps = (algo: string, initialArr: number[]) => {
    const steps: Array<{ array: number[]; comparing: number[]; swapped: boolean }> = [];
    const arr = [...initialArr];
    const n = arr.length;

    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({ array: [...arr], comparing: [j, j + 1], swapped: false });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            steps.push({ array: [...arr], comparing: [j, j + 1], swapped: true });
          }
        }
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          steps.push({ array: [...arr], comparing: [minIdx, j], swapped: false });
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          steps.push({ array: [...arr], comparing: [i, minIdx], swapped: true });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ array: [...arr], comparing: [j, i], swapped: false });
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          steps.push({ array: [...arr], comparing: [j, j + 1], swapped: true });
          j = j - 1;
        }
        arr[j + 1] = key;
      }
    } else if (algo === 'quick') {
      const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
          let pivot = arr[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
            steps.push({ array: [...arr], comparing: [j, high], swapped: false });
            if (arr[j] <= pivot) {
              i++;
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              if (i !== j) steps.push({ array: [...arr], comparing: [i, j], swapped: true });
            }
          }
          const temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          if (i + 1 !== high) steps.push({ array: [...arr], comparing: [i + 1, high], swapped: true });
          
          let pi = i + 1;
          quickSortHelper(low, pi - 1);
          quickSortHelper(pi + 1, high);
        }
      };
      quickSortHelper(0, n - 1);
    }
    return steps;
  };

  // Fungsi Utama Pemanggil Cloud API Railway dengan Auto-Fallback Lokal
  const handleSimulate = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    addLog(`🚀 Mengirim request ke Cloud Railway (Algoritma: ${algorithm.toUpperCase()})...`);

    let steps: Array<{ array: number[]; comparing: number[]; swapped: boolean }> = [];
    let usedFallback = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // Batasi tunggu cloud maksimal 6 detik

      const response = await fetch('https://sorting-playground-backend-production.up.railway.app/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          algorithm: algorithm,
          data: array,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }

      const result = await response.json();
      steps = result.steps || [];
      addLog(`✅ Sukses dari Cloud Railway! Memutar animasi dengan tempo ${speed}ms...`);

    } catch (error: any) {
      console.warn("Cloud Railway unavailable, switching to local fallback:", error);
      usedFallback = true;
      const errorReason = error.name === 'AbortError' ? 'Timeout (Server Tidur)' : error.message || 'CORS/Network Error';
      
      addLog(`⚠️ Cloud Railway kendala (${errorReason}).`);
      addLog(`⚡ Mengaktifkan Mesin Komputasi Lokal (Offline Fallback Engine)...`);
      
      // Hitung algoritma secara lokal di browser
      steps = computeLocalSteps(algorithm, array);
      addLog(`✅ Komputasi lokal selesai (${steps.length} langkah)! Memutar animasi...`);
    }

    // Jalankan Loop Animasi
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      
      if (step.array) setArray(step.array);
      
      const comp = step.comparing || [];
      const swap = step.swapped ? comp : [];
      setComparingIdx(comp);
      setSwappedIdx(swap);

      if (comp.length === 2) {
        const [idx1, idx2] = comp;
        const prefix = usedFallback ? "[Local Engine]" : "[Cloud Engine]";
        if (step.swapped) {
          addLog(`🔄 ${prefix} Swap: Elemen [${idx1}] (${step.array[idx1]}) ditukar dengan [${idx2}] (${step.array[idx2]})`);
        } else {
          addLog(`🔍 ${prefix} Compare: Elemen [${idx1}] & [${idx2}] posisi sudah sesuai.`);
        }
      }

      await new Promise(resolve => setTimeout(resolve, speed));
    }

    setSortedIdx(Array.from({ length: array.length }, (_, i) => i));
    setComparingIdx([]);
    setSwappedIdx([]);
    addLog(`🎯 Visualisasi selesai sempurna! (${usedFallback ? 'Eksekusi: Local Browser Engine' : 'Eksekusi: Laravel Railway Cloud'})`);
    setIsPlaying(false);
  };

  const maxVal = Math.max(...array, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="text-sm font-semibold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"
              >
                ← Kembali ke Katalog
              </Link>
              <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🛠️</span> Interactive Algorithm Lab
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            >
              <option value="bubble">Bubble Sort (O(n²))</option>
              <option value="selection">Selection Sort (O(n²))</option>
              <option value="insertion">Insertion Sort (O(n²))</option>
              <option value="quick">Quick Sort (O(n log n))</option>
            </select>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-slate-500">⏱️ Tempo:</span>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isPlaying}
                className="w-20 accent-blue-600 cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs font-mono font-bold text-blue-600 w-11 text-right">
                {speed}ms
              </span>
            </div>

            <button
              onClick={generateRandomArray}
              disabled={isPlaying}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-all disabled:opacity-50 shadow-sm flex items-center gap-1.5"
            >
              <span>🔄</span> Acak
            </button>

            <button
              onClick={handleSimulate}
              disabled={isPlaying}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isPlaying ? "⏳ Memutar..." : "▶ Visualisasikan"}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            💡 <strong className="text-slate-700">Tips Lab:</strong> Anda dapat menguji kasus khusus dengan memasukkan deret angka sendiri di sebelah kanan.
          </span>
          
          <form onSubmit={handleApplyCustomInput} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Contoh: 15, 3, 88, 12, 45"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono w-52 sm:w-64 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isPlaying || !customInput.trim()}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all disabled:opacity-40 shadow-sm whitespace-nowrap"
            >
              📥 Set Data
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span> Belum Terurut
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Sedang Dibandingkan
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Bertukar Posisi (Swap)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Posisi Terurut
              </span>
            </div>
            <div className="text-xs font-mono font-semibold text-slate-400 whitespace-nowrap">
              Total Elemen: {array.length}
            </div>
          </div>

          <div className="flex items-end justify-center gap-2 md:gap-4 flex-1 px-4 h-full">
            {array.map((val, idx) => (
              <ArrayBar
                key={idx}
                value={val}
                maxValue={maxVal}
                isComparing={comparingIdx.includes(idx)}
                isSwapped={swappedIdx.includes(idx)}
                isSorted={sortedIdx.includes(idx)}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-64">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE EXECUTION TERMINAL LOG (HYBRID CLOUD / LOCAL STREAM)
            </span>
            <button 
              onClick={() => setLogs(["💬 Terminal log dibersihkan."])}
              className="text-xs text-slate-500 hover:text-slate-300 underline font-mono"
            >
              Clear Log
            </button>
          </div>

          <div 
            ref={terminalRef} 
            className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={
                  log.includes("❌") || log.includes("⚠️") ? "text-rose-400 font-semibold" :
                  log.includes("🎯") ? "text-emerald-400 font-bold" :
                  log.includes("🚀") || log.includes("🛠️") || log.includes("⚡") ? "text-cyan-400 font-semibold" :
                  log.includes("🔄") ? "text-amber-300" : "text-slate-300"
                }
              >
                <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString('id-ID')}]</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200 mt-12 bg-white">
        Interactive Sorting Playground Hybrid Architecture • Powered by Next.js & Laravel Railway Cloud
      </footer>
    </div>
  );
}
