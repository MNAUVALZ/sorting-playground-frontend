"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ArrayBar from '@/components/visualizer/ArrayBar';

interface LogItem {
  id: number;
  time: string;
  type: 'INFO' | 'PIVOT' | 'COMPARE' | 'SWAP' | 'SORTED' | 'ERROR';
  text: string;
}

interface StepFrame {
  array: number[];
  comparing: number[];
  swappedIdx: number[];
  logType: LogItem['type'];
  logMsg: string;
  stepNum: number;
  totalCompares: number;
  totalSwaps: number;
}

export default function PlaygroundPage() {
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  
  // Slider Kecepatan Ergonomis (Skala 1x hingga 10x)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(3); 
  const [customInput, setCustomInput] = useState<string>("");
  
  // State Pemutar Animasi (Player Engine)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [allFrames, setAllFrames] = useState<StepFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  // State Log & Telemetri
  const [logs, setLogs] = useState<LogItem[]>([
    { id: 1, time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Sistem Lab siap. Pilih algoritma atau acak deret angka, lalu klik Play (▶) untuk memulai." }
  ]);
  const [autoScroll, setAutoScroll] = useState<boolean>(true); // Fitur Baru: Toggle Auto-Scroll
  const terminalRef = useRef<HTMLDivElement>(null);
  const logCounterRef = useRef<number>(2);

  // Efek Auto-Scroll hanya berjalan jika user mengaktifkannya (ON)
  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const addLog = (type: LogItem['type'], text: string) => {
    const newId = logCounterRef.current++;
    setLogs(prev => [...prev, { id: newId, time: new Date().toLocaleTimeString('id-ID'), type, text }]);
  };

  // Mesin Komputasi Langkah Awal (Membuat seluruh Frame animasi saat array berubah)
  const buildSimulationFrames = (algo: string, startArr: number[]) => {
    const frames: StepFrame[] = [];
    const arr = [...startArr];
    const n = arr.length;
    let compares = 0; let swaps = 0; let stepNum = 0;

    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          compares++; stepNum++;
          frames.push({
            array: [...arr], comparing: [j, j + 1], swappedIdx: [],
            logType: 'COMPARE', logMsg: `Bandingkan elemen [${j}] (${arr[j]}) dengan [${j+1}] (${arr[j+1]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
            swaps++; stepNum++;
            frames.push({
              array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1],
              logType: 'SWAP', logMsg: `Tukar posisi: (${arr[j+1]}) > (${arr[j]}), maka (${arr[j]}) digeser ke kanan`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
        }
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        stepNum++;
        frames.push({
          array: [...arr], comparing: [i], swappedIdx: [], logType: 'INFO',
          logMsg: `Batas wilayah terurut diset pada indeks [${i}]. Asumsikan nilai minimum sementara adalah (${arr[i]})`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        for (let j = i + 1; j < n; j++) {
          compares++; stepNum++;
          frames.push({
            array: [...arr], comparing: [minIdx, j], swappedIdx: [], logType: 'COMPARE',
            logMsg: `Pindai angka (${arr[j]}) apakah lebih kecil dari minimum sementara (${arr[minIdx]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] < arr[minIdx]) {
            minIdx = j; stepNum++;
            frames.push({
              array: [...arr], comparing: [minIdx], swappedIdx: [], logType: 'INFO',
              logMsg: `🎯 Minimum baru ditemukan pada indeks [${minIdx}] bernilai (${arr[minIdx]})`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
        }
        if (minIdx !== i) {
          const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
          swaps++; stepNum++;
          frames.push({
            array: [...arr], comparing: [i, minIdx], swappedIdx: [i, minIdx], logType: 'SWAP',
            logMsg: `Tukar posisi minimum (${arr[i]}) ke posisi awal wilayah belum terurut indeks [${i}]`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i]; let j = i - 1; stepNum++;
        frames.push({
          array: [...arr], comparing: [i], swappedIdx: [], logType: 'INFO',
          logMsg: `Ambil elemen [${i}] bernilai (${key}) untuk mulai disisipkan ke kiri`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        while (j >= 0 && arr[j] > key) {
          compares++; swaps++; stepNum++;
          arr[j + 1] = arr[j];
          frames.push({
            array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1], logType: 'SWAP',
            logMsg: `Geser angka (${arr[j]}) ke kanan karena bernilai lebih besar dari kunci (${key})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          j = j - 1;
        }
        if (j >= 0) compares++;
        arr[j + 1] = key; stepNum++;
        frames.push({
          array: [...arr], comparing: [j + 1], swappedIdx: [], logType: 'INFO',
          logMsg: `Sisipkan kunci (${key}) tepat di posisi terurut indeks [${j + 1}]`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
      }
    } else if (algo === 'quick') {
      const quickHelper = (low: number, high: number) => {
        if (low < high) {
          let pivot = arr[high]; stepNum++;
          frames.push({
            array: [...arr], comparing: [high], swappedIdx: [], logType: 'PIVOT',
            logMsg: `🎯 Partisi wilayah [${low}..${high}] -> Pilih elemen acuan Pivot: (${pivot})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          let i = low - 1;
          for (let j = low; j < high; j++) {
            compares++; stepNum++;
            frames.push({
              array: [...arr], comparing: [j, high], swappedIdx: [], logType: 'COMPARE',
              logMsg: `Bandingkan elemen [${j}] (${arr[j]}) <= Pivot (${pivot})`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
            if (arr[j] <= pivot) {
              i++; const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
              if (i !== j) {
                swaps++; stepNum++;
                frames.push({
                  array: [...arr], comparing: [i, j], swappedIdx: [i, j], logType: 'SWAP',
                  logMsg: `Pindahkan angka kecil (${arr[i]}) ke wilayah kiri pivot indeks [${i}]`,
                  stepNum, totalCompares: compares, totalSwaps: swaps
                });
              }
            }
          }
          const temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
          if (i + 1 !== high) {
            swaps++; stepNum++;
            frames.push({
              array: [...arr], comparing: [i + 1, high], swappedIdx: [i + 1, high], logType: 'SWAP',
              logMsg: `Tempatkan Pivot (${pivot}) tepat di batas tengah final indeks [${i + 1}]`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
          let pi = i + 1;
          quickHelper(low, pi - 1);
          quickHelper(pi + 1, high);
        }
      };
      quickHelper(0, n - 1);
    }

    return frames;
  };

  // Re-build frame setiap kali algoritma atau array acak berubah
  useEffect(() => {
    setIsPlaying(false);
    setIsSorted(false);
    setCurrentFrameIdx(0);
    const generatedFrames = buildSimulationFrames(algorithm, initialArray);
    setAllFrames(generatedFrames);
    setArray([...initialArray]);
  }, [algorithm, initialArray]);

  // Player Engine: Interval eksekusi frame otomatis jika isPlaying = true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentFrameIdx < allFrames.length) {
      // Perhitungan delay: Semakin besar speedMultiplier (geser kanan), durasi jeda semakin kecil (animasi melesat cepat!)
      const delayMs = Math.max(50, Math.round(900 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentFrameIdx + 1;
        if (nextIdx >= allFrames.length) {
          setIsPlaying(false);
          setIsSorted(true);
          addLog('SORTED', `🏆 Seluruh elemen array telah terurut sempurna dalam ${allFrames.length} langkah komputasi!`);
        } else {
          setCurrentFrameIdx(nextIdx);
          const frame = allFrames[nextIdx];
          setArray(frame.array);
          addLog(frame.logType, frame.logMsg);
        }
      }, delayMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIdx, allFrames, speedMultiplier]);

  // Kontrol Tombol Player
  const handlePlayPause = () => {
    if (isSorted) return;
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentFrameIdx === 0) {
      addLog('INFO', `▶ Memulai pemutaran animasi (Algoritma: ${algorithm.toUpperCase()} | Tempo: ${speedMultiplier}x)...`);
    }
  };

  const handleNextStep = () => {
    if (isPlaying || isSorted || currentFrameIdx >= allFrames.length - 1) return;
    const nextIdx = currentFrameIdx + 1;
    setCurrentFrameIdx(nextIdx);
    const frame = allFrames[nextIdx];
    setArray(frame.array);
    addLog(frame.logType, `[STEP FORWARD] ${frame.logMsg}`);
    if (nextIdx === allFrames.length - 1) {
      setIsSorted(true);
      addLog('SORTED', `🏆 Pengurutan selesai pada langkah terakhir!`);
    }
  };

  const handlePrevStep = () => {
    if (isPlaying || currentFrameIdx <= 0) return;
    setIsSorted(false);
    const prevIdx = currentFrameIdx - 1;
    setCurrentFrameIdx(prevIdx);
    const frame = allFrames[prevIdx];
    setArray(frame.array);
    addLog('INFO', `[STEP BACKWARD] Kembali ke langkah #${frame.stepNum}`);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsSorted(false);
    setCurrentFrameIdx(0);
    setArray([...initialArray]);
    addLog('INFO', "⏹️ Simulasi direset kembali ke urutan array awal.");
  };

  const generateRandomArray = () => {
    if (isPlaying) return;
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 95) + 5);
    setInitialArray(newArr);
    addLog('INFO', `🔄 Array baru diacak: [${newArr.join(', ')}]`);
  };

  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;
    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(num => !isNaN(num) && num > 0 && num <= 500);

    if (parsed.length < 3) {
      addLog('ERROR', "Input gagal: Masukkan minimal 3 angka valid berpemisah koma.");
      return;
    }
    if (parsed.length > 20) {
      addLog('ERROR', "Terlalu banyak elemen: Maksimal 20 angka agar visualisasi balok tetap optimal.");
      return;
    }
    setInitialArray(parsed);
    setCustomInput("");
    addLog('INFO', `🛠️ Deret angka custom berhasil diset: [${parsed.join(', ')}]`);
  };

  const currentFrame = allFrames[currentFrameIdx] || { comparing: [], swappedIdx: [], totalCompares: 0, totalSwaps: 0, stepNum: 0 };
  const maxVal = Math.max(...array, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* Toolbar Kontrol Lab */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🛠️</span> Interactive Algorithm Lab
            </h1>
            {/* Indikator Animasi Aktif (FITUR BARU!) */}
            {isPlaying ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-bold shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span>
                ⚡ ENGINE RUNNING
              </span>
            ) : isSorted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-bold shadow-sm">
                <span>✔️</span> SORTED COMPLETE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-semibold">
                <span>⏸️</span> READY / PAUSED
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            >
              <option value="bubble">Bubble Sort (O(n²))</option>
              <option value="selection">Selection Sort (O(n²))</option>
              <option value="insertion">Insertion Sort (O(n²))</option>
              <option value="quick">Quick Sort (O(n log n))</option>
            </select>

            {/* Slider Kecepatan Ergonomis (Geser kanan = Semakin Cepat!) */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl" title="Geser ke kanan untuk mempercepat pemutaran animasi">
              <span className="text-xs font-bold text-slate-500">⏱️ Tempo:</span>
              <input
                type="range" min="1" max="10" step="1" value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                className="w-20 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-extrabold text-blue-600 w-8 text-right">{speedMultiplier}x</span>
            </div>

            <button
              onClick={generateRandomArray} disabled={isPlaying}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-all disabled:opacity-50 shadow-sm flex items-center gap-1.5"
            >
              <span>🔄</span> Acak
            </button>
          </div>
        </div>

        {/* Panel Tombol Pemutar Video (Prev, Play/Pause, Next, Reset) */}
        <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep} disabled={isPlaying || currentFrameIdx <= 0}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 transition-all flex items-center gap-1"
              title="Langkah Sebelumnya (Step Backward)"
            >
              <span>⏮️</span> Sebelumnya
            </button>

            <button
              onClick={handlePlayPause} disabled={isSorted}
              className={`px-6 py-2 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50`}
            >
              <span>{isPlaying ? '⏸️' : '▶'}</span>
              <span>{isPlaying ? 'Jeda Animasi' : 'Putar Animasi'}</span>
            </button>

            <button
              onClick={handleNextStep} disabled={isPlaying || isSorted || currentFrameIdx >= allFrames.length - 1}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 transition-all flex items-center gap-1"
              title="Langkah Selanjutnya (Step Forward)"
            >
              <span>Selanjutnya</span> ⏭️
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all ml-2"
              title="Reset ke Posisi Awal"
            >
              ⏹️ Reset
            </button>
          </div>

          <form onSubmit={handleApplyCustomInput} className="flex items-center gap-2">
            <input
              type="text" placeholder="Uji deret angka sendiri: 15, 3, 88, 12" value={customInput}
              onChange={(e) => setCustomInput(e.target.value)} disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono w-48 sm:w-60 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <button type="submit" disabled={isPlaying || !customInput.trim()} className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs disabled:opacity-40 shadow-sm whitespace-nowrap">
              📥 Set Data
            </button>
          </form>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-6">
        {/* Panel Telemetri Real-Time */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase block">Progres Langkah</span>
            <span className="text-2xl font-mono font-extrabold text-slate-900">
              {currentFrame.stepNum} <span className="text-xs font-normal text-slate-400">/ {allFrames.length}</span>
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-amber-500 uppercase block">Total Perbandingan</span>
            <span className="text-2xl font-mono font-extrabold text-amber-600">{currentFrame.totalCompares}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-rose-500 uppercase block">Total Pertukaran (Swap)</span>
            <span className="text-2xl font-mono font-extrabold text-rose-600">{currentFrame.totalSwaps}</span>
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
                isComparing={currentFrame.comparing.includes(idx)} 
                isSwapped={currentFrame.swappedIdx.includes(idx)} 
                isSorted={isSorted}
              />
            ))}
          </div>
        </div>

        {/* Panel Log Terstruktur dengan Toggle Auto-Scroll (ANTI-LOMPAT!) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-72">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              RIWAYAT EXECUTION LOG LENGKAP (POIN-POIN TERSTRUKTUR)
            </span>
            <div className="flex items-center gap-4">
              {/* Tombol Toggle Auto-Scroll */}
              <button
                onClick={() => setAutoScroll(!autoScroll)}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  autoScroll ? 'bg-blue-900/60 text-blue-300 border-blue-600' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title="Matikan Auto-Scroll jika ingin membaca log bagian atas tanpa tergeser ke bawah"
              >
                🔒 Auto-Scroll: {autoScroll ? 'ON' : 'OFF'}
              </button>
              <span className="text-xs font-mono text-slate-500">Total: {logs.length} baris</span>
              <button 
                onClick={() => setLogs([{ id: Date.now(), time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Terminal log dibersihkan." }])} 
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                Clear Log
              </button>
            </div>
          </div>
          
          <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {logs.map((log) => {
              let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
              let label = "INFO";
              if (log.type === 'PIVOT') { badgeColor = "bg-purple-900/60 text-purple-300 border-purple-700"; label = "🎯 PIVOT"; }
              else if (log.type === 'COMPARE') { badgeColor = "bg-amber-900/60 text-amber-300 border-amber-700"; label = "🔍 COMPARE"; }
              else if (log.type === 'SWAP') { badgeColor = "bg-rose-900/60 text-rose-300 border-rose-700 font-bold"; label = "🔄 SWAP"; }
              else if (log.type === 'SORTED') { badgeColor = "bg-emerald-900/60 text-emerald-300 border-emerald-700 font-bold"; label = "🏆 SORTED"; }
              else if (log.type === 'ERROR') { badgeColor = "bg-red-950 text-red-400 border-red-800 font-bold"; label = "❌ ERROR"; }

              return (
                <div key={log.id} className="flex items-start gap-2.5 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 hover:border-slate-700 transition-colors">
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
