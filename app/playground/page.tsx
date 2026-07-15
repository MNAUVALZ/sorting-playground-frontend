"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ArrayBar from '@/components/visualizer/ArrayBar';

export default function PlaygroundPage() {
  // State Utama Lab
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speed, setSpeed] = useState<number>(300);
  const [customInput, setCustomInput] = useState<string>(""); // Fitur Baru: State Input Manual
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // State Animasi Visual
  const [comparingIdx, setComparingIdx] = useState<number[]>([]);
  const [swappedIdx, setSwappedIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);
  
  // State Terminal Log
  const [logs, setLogs] = useState<string[]>([
    "💬 System ready. Pilih algoritma atau masukkan deret angka manual, lalu klik 'Visualisasikan'."
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

  // Fitur Baru: Fungsi memproses & menerapkan input angka manual dari pengguna
  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;

    // Parser: pecah berdasarkan koma, ubah ke integer, & filter karakter non-angka
    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(num => !isNaN(num) && num > 0 && num <= 500);

    // Validasi jumlah elemen
    if (parsed.length < 3) {
      addLog("⚠️ Input gagal: Masukkan minimal 3 angka valid berpemisah koma (contoh: 10, 50, 23).");
      return;
    }
    if (parsed.length > 20) {
      addLog("⚠️ Terlalu banyak elemen: Maksimal 20 angka agar visualisasi balok tetap optimal.");
      return;
    }

    // Terapkan ke kanvas
    setArray(parsed);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    addLog(`🛠️ Data manual berhasil diterapkan: [${parsed.join(', ')}]`);
    setCustomInput("");
  };

  // Fungsi menambah pesan ke terminal
  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-30), msg]);
  };

  // Fungsi Utama Pemanggil Cloud API Railway & Eksekusi Animasi
  const handleSimulate = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setComparingIdx([]);
    setSwappedIdx([]);
    setSortedIdx([]);
    addLog(`🚀 Mengirim request ke Cloud Railway (Algoritma: ${algorithm.toUpperCase()})...`);

    try {
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

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        
        if (step.array) setArray(step.array);
        
        const comp = step.comparing || [];
        const swap = step.swapped ? comp : [];
        setComparingIdx(comp);
        setSwappedIdx(swap);

        if (comp.length === 2) {
          const [idx1, idx2] = comp;
          if (step.swapped) {
            addLog(`🔄 Swap: Elemen [${idx1}] (${step.array[idx1]}) ditukar dengan [${idx2}] (${step.array[idx2]})`);
          } else {
            addLog(`🔍 Compare: Elemen [${idx1}] & [${idx2}] posisi sudah sesuai.`);
          }
        }

        await new Promise(resolve => setTimeout(resolve, speed));
      }

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
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
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
                className="w-20 accent-dicoding-blue cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs font-mono font-bold text-dicoding-blue w-11 text-right">
                {speed}ms
              </span>
            </div>

            {/* Tombol Acak Array */}
            <button
              onClick={generateRandomArray}
              disabled={isPlaying}
              className="px-3.5 py-2 bg-white border border-dicoding-border text-dicoding-navy hover:bg-slate-50 font-semibold text-sm rounded-lg transition-all disabled:opacity-50 shadow-sm flex items-center gap-1.5"
            >
              <span>🔄</span> Acak
            </button>

            {/* Tombol Mulai Visualisasi */}
            <button
              onClick={handleSimulate}
              disabled={isPlaying}
              className="px-5 py-2 bg-dicoding-blue hover:bg-dicoding-blue-hover text-white font-semibold text-sm rounded-lg transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isPlaying ? "⏳ Memutar..." : "▶ Visualisasikan"}
            </button>
          </div>
        </div>

        {/* Sub-toolbar: Input Angka Manual */}
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
              className="bg-slate-50 border border-dicoding-border rounded-lg px-3 py-1.5 text-xs font-mono w-52 sm:w-64 text-dicoding-navy outline-none focus:ring-2 focus:ring-dicoding-blue disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isPlaying || !customInput.trim()}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all disabled:opacity-40 shadow-sm whitespace-nowrap"
            >
              📥 Set Data
            </button>
          </form>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-8">
        {/* Kanvas Visualisasi Balok */}
        <div className="bg-white rounded-2xl border border-dicoding-border p-6 md:p-10 shadow-sm flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
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
            <div className="text-xs font-mono font-semibold text-slate-400 whitespace-nowrap">
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
                  log.includes("❌") || log.includes("⚠️") ? "text-rose-400 font-semibold" :
                  log.includes("🎯") ? "text-emerald-400 font-bold" :
                  log.includes("🚀") || log.includes("🛠️") ? "text-cyan-400 font-semibold" :
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
