"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ArrayBar from '@/components/visualizer/ArrayBar';

interface LogItem {
  time: string;
  type: 'INFO' | 'PIVOT' | 'COMPARE' | 'SWAP' | 'SORTED' | 'ERROR';
  text: string;
}

export default function PlaygroundPage() {
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speed, setSpeed] = useState<number>(300);
  const [customInput, setCustomInput] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const [comparingIdx, setComparingIdx] = useState<number[]>([]);
  const [swappedIdx, setSwappedIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);
  
  const [stepCount, setStepCount] = useState<number>(0);
  const [compareCount, setCompareCount] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);

  // State Log Lengkap Terstruktur
  const [logs, setLogs] = useState<LogItem[]>([
    { time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Sistem Lab siap. Pilih algoritma dan klik 'Visualisasikan' untuk memulai simulasi." }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: LogItem['type'], text: string) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('id-ID'), type, text }]);
  };

  const resetTelemetry = () => {
    setStepCount(0);
    setCompareCount(0);
    setSwapCount(0);
  };

  const generateRandomArray = () => {
    if (isPlaying) return;
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArr);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    resetTelemetry();
    addLog('INFO', `Array baru diacak: [${newArr.join(', ')}]`);
  };

  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;

    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(num => !isNaN(num) && num > 0 && num <= 500);

    if (parsed.length < 3) {
      addLog('ERROR', "Input gagal: Masukkan minimal 3 angka valid berpemisah koma (contoh: 10, 50, 23).");
      return;
    }
    if (parsed.length > 20) {
      addLog('ERROR', "Terlalu banyak elemen: Maksimal 20 angka agar visualisasi balok tetap optimal.");
      return;
    }

    setArray(parsed);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    resetTelemetry();
    addLog('INFO', `Deret angka manual berhasil diset: [${parsed.join(', ')}]`);
    setCustomInput("");
  };

  const computeLocalSteps = (algo: string, initialArr: number[]) => {
    const steps: Array<{ array: number[]; comparing: number[]; swapped: boolean; logType: LogItem['type']; logMsg: string }> = [];
    const arr = [...initialArr];
    const n = arr.length;

    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({ array: [...arr], comparing: [j, j + 1], swapped: false, logType: 'COMPARE', logMsg: `Bandingkan elemen [${j}] (${arr[j]}) dengan [${j+1}] (${arr[j+1]})` });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
            steps.push({ array: [...arr], comparing: [j, j + 1], swapped: true, logType: 'SWAP', logMsg: `Tukar posisi: ${arr[j+1]} > ${arr[j]}, maka (${arr[j]}) digeser ke kanan` });
          }
        }
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({ array: [...arr], comparing: [i], swapped: false, logType: 'INFO', logMsg: `Batas indeks [${i}] (${arr[i]}) diset sebagai nilai minimum sementara` });
        for (let j = i + 1; j < n; j++) {
          steps.push({ array: [...arr], comparing: [minIdx, j], swapped: false, logType: 'COMPARE', logMsg: `Pindai elemen [${j}] (${arr[j]}) apakah lebih kecil dari minimum sementara (${arr[minIdx]})` });
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            steps.push({ array: [...arr], comparing: [minIdx], swapped: false, logType: 'INFO', logMsg: `Minimum baru ditemukan pada indeks [${minIdx}] (${arr[minIdx]})` });
          }
        }
        if (minIdx !== i) {
          const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
          steps.push({ array: [...arr], comparing: [i, minIdx], swapped: true, logType: 'SWAP', logMsg: `Tukar posisi minimum [${minIdx}] (${arr[i]}) ke batas kiri terurut [${i}]` });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i]; let j = i - 1;
        steps.push({ array: [...arr], comparing: [i], swapped: false, logType: 'INFO', logMsg: `Ambil kartu/elemen [${i}] bernilai (${key}) untuk disisipkan` });
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          steps.push({ array: [...arr], comparing: [j, j + 1], swapped: true, logType: 'SWAP', logMsg: `Geser elemen (${arr[j]}) ke kanan karena lebih besar dari kunci (${key})` });
          j = j - 1;
        }
        arr[j + 1] = key;
        steps.push({ array: [...arr], comparing: [j + 1], swapped: false, logType: 'INFO', logMsg: `Sisipkan kunci (${key}) tepat di posisi indeks [${j + 1}]` });
      }
    } else if (algo === 'quick') {
      const quickHelper = (low: number, high: number) => {
        if (low < high) {
          let pivot = arr[high];
          steps.push({ array: [...arr], comparing: [high], swapped: false, logType: 'PIVOT', logMsg: `Partisi sub-array [${low}..${high}] -> Pilih elemen acuan Pivot: (${pivot})` });
          let i = low - 1;
          for (let j = low; j < high; j++) {
            steps.push({ array: [...arr], comparing: [j, high], swapped: false, logType: 'COMPARE', logMsg: `Bandingkan elemen [${j}] (${arr[j]}) <= Pivot (${pivot})` });
            if (arr[j] <= pivot) {
              i++;
              const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
              if (i !== j) steps.push({ array: [...arr], comparing: [i, j], swapped: true, logType: 'SWAP', logMsg: `Pindahkan elemen lebih kecil (${arr[i]}) ke wilayah kiri pivot indeks [${i}]` });
            }
          }
          const temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
          if (i + 1 !== high) steps.push({ array: [...arr], comparing: [i + 1, high], swapped: true, logType: 'SWAP', logMsg: `Tempatkan Pivot (${pivot}) tepat di posisi batas final indeks [${i + 1}]` });
          
          let pi = i + 1;
          quickHelper(low, pi - 1);
          quickHelper(pi + 1, high);
        }
      };
      quickHelper(0, n - 1);
    }
    return steps;
  };

  const handleSimulate = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    resetTelemetry();
    addLog('INFO', `Memulai komputasi simulasi untuk algoritma: ${algorithm.toUpperCase()}...`);

    let steps = computeLocalSteps(algorithm, array);
    addLog('INFO', `Komputasi selesai! Menghasilkan ${steps.length} langkah eksekusi animasi.`);

    let currentCompares = 0;
    let currentSwaps = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (step.array) setArray(step.array);
      
      const comp = step.comparing || [];
      const swap = step.swapped ? comp : [];
      setComparingIdx(comp);
      setSwappedIdx(swap);
      setStepCount(i + 1);

      if (step.logType === 'COMPARE') {
        currentCompares++;
        setCompareCount(currentCompares);
      } else if (step.logType === 'SWAP') {
        currentSwaps++;
        setSwapCount(currentSwaps);
      }

      addLog(step.logType, step.logMsg);
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    setSortedIdx(Array.from({ length: array.length }, (_, i) => i));
    setComparingIdx([]);
    setSwappedIdx([]);
    addLog('SORTED', `🎉 Seluruh elemen array telah terurut sempurna dalam ${steps.length} langkah!`);
    setIsPlaying(false);
  };

  const maxVal = Math.max(...array, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* Control Header Lab */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🛠️</span> Interactive Algorithm Lab
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
              Real-time Simulation
            </span>
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
                type="range" min="50" max="1000" step="50" value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))} disabled={isPlaying}
                className="w-20 accent-blue-600 cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs font-mono font-bold text-blue-600 w-11 text-right">{speed}ms</span>
            </div>

            <button
              onClick={generateRandomArray} disabled={isPlaying}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-all disabled:opacity-50 shadow-sm flex items-center gap-1.5"
            >
              <span>🔄</span> Acak
            </button>

            <button
              onClick={handleSimulate} disabled={isPlaying}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isPlaying ? "⏳ Memutar..." : "▶ Visualisasikan"}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            💡 <strong className="text-slate-700">Tips:</strong> Uji deret angka khusus untuk melihat kasus terburuk (Worst Case).
          </span>
          <form onSubmit={handleApplyCustomInput} className="flex items-center gap-2">
            <input
              type="text" placeholder="Contoh: 15, 3, 88, 12, 45" value={customInput}
              onChange={(e) => setCustomInput(e.target.value)} disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono w-52 sm:w-64 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              type="submit" disabled={isPlaying || !customInput.trim()}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all disabled:opacity-40 shadow-sm whitespace-nowrap"
            >
              📥 Set Data
            </button>
          </form>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-6">
        {/* Panel Telemetri Real-Time */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase block">Total Langkah</span>
            <span className="text-2xl font-mono font-extrabold text-slate-900">{stepCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-amber-500 uppercase block">Perbandingan (Compare)</span>
            <span className="text-2xl font-mono font-extrabold text-amber-600">{compareCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-rose-500 uppercase block">Pertukaran (Swap)</span>
            <span className="text-2xl font-mono font-extrabold text-rose-600">{swapCount}</span>
          </div>
        </div>

        {/* Kanvas Balok */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm flex flex-col justify-between min-h-[400px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span> Belum Terurut</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Dibandingkan</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Tukar Posisi (Swap)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Terurut</span>
            </div>
            <div className="text-xs font-mono font-semibold text-slate-400">Total Elemen: {array.length}</div>
          </div>

          <div className="flex items-end justify-center gap-2 md:gap-4 flex-1 px-4 h-full">
            {array.map((val, idx) => (
              <ArrayBar
                key={idx} value={val} maxValue={maxVal}
                isComparing={comparingIdx.includes(idx)} isSwapped={swappedIdx.includes(idx)} isSorted={sortedIdx.includes(idx)}
              />
            ))}
          </div>
        </div>

        {/* Panel Log Poin-Poin Lengkap (Tanpa Batas 30 Baris!) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-72">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              RIWAYAT EXECUTION LOG LENGKAP (POIN-POIN TERSTRUKTUR)
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-slate-500">Total Log: {logs.length} baris</span>
              <button 
                onClick={() => setLogs([{ time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Terminal log dibersihkan." }])} 
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                Clear Log
              </button>
            </div>
          </div>
          
          {/* Area Scroll Riwayat Log */}
          <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {logs.map((log, index) => {
              let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
              let label = "INFO";
              if (log.type === 'PIVOT') { badgeColor = "bg-purple-900/60 text-purple-300 border-purple-700"; label = "🎯 PIVOT"; }
              else if (log.type === 'COMPARE') { badgeColor = "bg-amber-900/60 text-amber-300 border-amber-700"; label = "🔍 COMPARE"; }
              else if (log.type === 'SWAP') { badgeColor = "bg-rose-900/60 text-rose-300 border-rose-700 font-bold"; label = "🔄 SWAP"; }
              else if (log.type === 'SORTED') { badgeColor = "bg-emerald-900/60 text-emerald-300 border-emerald-700 font-bold"; label = "🏆 SORTED"; }
              else if (log.type === 'ERROR') { badgeColor = "bg-red-950 text-red-400 border-red-800 font-bold"; label = "❌ ERROR"; }

              return (
                <div key={index} className="flex items-start gap-2.5 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 hover:border-slate-700 transition-colors">
                  <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 min-w-[75px] text-center ${badgeColor}`}>
                    {label}
                  </span>
                  <span className={log.type === 'SWAP' ? "text-rose-200 font-semibold" : log.type === 'SORTED' ? "text-emerald-300 font-bold" : log.type === 'PIVOT' ? "text-purple-200 font-semibold" : "text-slate-300"}>
                    {log.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
