"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ArrayBar from '@/components/visualizer/ArrayBar';

export default function PlaygroundPage() {
  // State Utama Lab
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speed, setSpeed] = useState<number>(300); // Fitur Baru: Slider Kecepatan (ms)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // State Animasi Visual
  const [comparingIdx, setComparingIdx] = useState<number[]>([]);
  const [swappedIdx, setSwappedIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);
  
  // State Terminal Log
  const [logs, setLogs] = useState<string[]>([
    "💬 System ready. Pilih algoritma dan klik 'Visualisasikan' untuk memulai simulasi cloud."
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log ke bawah
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Fungsi menghasilkan array acak baru
  const generateRandomArray = () => {
    if (isPlaying) return;
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArr);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    setLogs(prev => [...prev, `🔄 Array baru diacak: [${newArr.join(', ')}]`]);
  };

  // Fungsi menambah pesan ke terminal
  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-30), msg]); // Simpan maksimal 30 baris log terakhir
  };

  // Fungsi Utama Pemanggil Cloud API Laravel & Eksekusi Animasi
  const handleSimulate = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    addLog(`🚀 Mengirim request ke Cloud Railway (Algoritma: ${algorithm.toUpperCase()})...`);

    try {
      // Panggil endpoint API Railway
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
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const steps = result.steps || [];

      addLog(`✅ Data diterima dari cloud! Memutar animasi dengan durasi jeda ${speed}ms...`);

      // Looping langkah animasi sesuai Slider Kecepatan
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        
        // Perbarui posisi elemen array
        if (step.array) setArray(step.array);
        
        // Perbarui status warna balok
        const comp = step.comparing || [];
        const swap = step.swapped ? comp : [];
        setComparingIdx(comp);
        setSwappedIdx(swap);

        // Catat ke log terminal
        if (comp.length === 2) {
          const [idx1, idx2] = comp;
          if (step.swapped) {
            addLog(`🔄 Swap: Elemen [${idx1}] (${step.array[idx1]}) ditukar dengan [${idx2}] (${step.array[idx2]})`);
          } else {
            addLog(`🔍 Compare: Elemen [${idx1}] & [${idx2}] posisi sudah sesuai.`);
          }
        }

        // Jeda animasi sesuai state slider 'speed'
        await new Promise(resolve => setTimeout(resolve, speed));
      }

      // Tandai seluruh elemen selesai terurut
      setSortedIdx(Array.from({ length: array.length }, (_, i) => i));
      setComparingIdx([]);
      setSwappedIdx([]);
      addLog("🎯 Visualisasi selesai! Seluruh elemen array telah terurut sempurna.");

    } catch (error) {
      console.error("Simulation error:", error);
      addLog("❌ Gagal terhubung ke Cloud API Railway. Pastikan server backend sedang aktif.");
    } finally {
      setIsPlaying(false);
    }
  };

  const maxVal = Math.max(...array, 100);

  return (
    <div className="min-h-screen bg-dicoding-bg flex flex-col justify-between">
      {/* Top Navbar Lab */}
      <header className="bg-white border-b border-dicoding-border px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-sm font-semibold text-dicoding-blue hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
            >
              ← Kembali ke Katalog
            </Link>
            <h1 className="text-xl font-extrabold text-dicoding-navy flex items-center gap-2">
              <span>🛠️</span> Interactive Algorithm Lab
            </h1>
          </div>

          {/* Control Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Dropdown Algoritma */}
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isPlaying}
              className="bg-slate-50 border border-dicoding-border text-dicoding-navy text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-dicoding-blue disabled:opacity-50"
            >
              <option value="bubble">Bubble Sort (O(n²))</option>
              <option value="selection">Selection Sort (O(n²))</option>
              <option value="insertion">Insertion Sort (O(n²))</option>
            </select>

            {/* Fitur Baru: Slider Kecepatan */}
            <div className="flex items-center gap-2 bg-slate-50 border border-dicoding-border px-3 py-1.5 rounded-lg">
              <span className="text-xs font-bold text-slate-500">⏱️ Tempo:</span>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isPlaying}
                className="w-24 accent-dicoding-blue cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs font-mono font-bold text-dicoding-blue w-12 text-right">
                {speed}ms
              </span>
            </div>

            {/* Tombol Acak Array */}
            <button
              onClick={generateRandomArray}
              disabled={isPlaying}
              className="px-4 py-2 bg-white border border-dicoding-border text-dicoding-navy hover:bg-slate-50 font-semibold text-sm rounded-lg transition-all disabled:opacity-50 shadow-sm"
            >
              🔄 Acak Array
            </button>

            {/* Tombol Mulai Visualisasi */}
            <button
              onClick={handleSimulate}
              disabled={isPlaying}
              className="px-6 py-2 bg-dicoding-blue hover:bg-dicoding-blue-hover text-white font-semibold text-sm rounded-lg transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isPlaying ? "⏳ Memutar..." : "▶ Visualisasikan"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-8">
        {/* Kanvas Visualisasi Balok */}
        <div className="bg-white rounded-2xl border border-dicoding-border p-6 md:p-10 shadow-sm flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-dicoding-blue inline-block"></span> Belum Terurut
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
            <div className="text-xs font-mono font-semibold text-slate-400">
              Total Elemen: {array.length}
            </div>
          </div>

          {/* Render Balok Array */}
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

        {/* Panel Log Eksekusi IDE/Terminal */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-64">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE EXECUTION TERMINAL LOG (RAILWAY CLOUD STREAM)
            </span>
            <button 
              onClick={() => setLogs(["💬 Terminal log dibersihkan."])}
              className="text-xs text-slate-500 hover:text-slate-300 underline font-mono"
            >
              Clear Log
            </button>
          </div>

          {/* Area Output Log */}
          <div 
            ref={terminalRef} 
            className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={
                  log.includes("❌") ? "text-rose-400 font-semibold" :
                  log.includes("🎯") ? "text-emerald-400 font-bold" :
                  log.includes("🚀") ? "text-cyan-400 font-semibold" :
                  log.includes("🔄 Swap") ? "text-amber-300" : "text-slate-300"
                }
              >
                <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString('id-ID')}]</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="py-6 text-center text-xs text-dicoding-text-light border-t border-dicoding-border mt-12 bg-white">
        Interactive Sorting Playground Full-Stack Architecture • Powered by Next.js & Laravel Railway Cloud
      </footer>
    </div>
  );
}
