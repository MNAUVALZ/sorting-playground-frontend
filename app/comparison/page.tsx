"use client";

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface AlgoOption {
  id: string;
  name: string;
  complexity: string;
  color: string;
}

interface BenchmarkResult {
  algo: string;
  name: string;
  complexity: string;
  steps: number;
  compares: number;
  swaps: number;
  timeMs: number;
  detailedLogs: string[];
}

interface RaceTrack {
  id: string;
  name: string;
  array: number[];
  isDone: boolean;
}

export default function ComparisonPage() {
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [customInput, setCustomInput] = useState<string>("");
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(['quick', 'insertion', 'selection', 'bubble']);

  // State Log Komparasi Per-Algoritma
  const [activeLogTab, setActiveLogTab] = useState<string>('quick');
  const [raceTracks, setRaceTracks] = useState<RaceTrack[]>([]);
  const [generalLogs, setGeneralLogs] = useState<string[]>(["💬 Pilih minimal 2 algoritma yang ingin diadu, lalu klik 'Jalankan Benchmark & Balap Animasi'."]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [generalLogs, activeLogTab]);

  const addGeneralLog = (msg: string) => {
    setGeneralLogs(prev => [...prev, `[${new Date().toLocaleTimeString('id-ID')}] ${msg}`]);
  };

  const allAlgos: AlgoOption[] = [
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)', color: 'bg-purple-600' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)', color: 'bg-blue-600' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)', color: 'bg-amber-500' },
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)', color: 'bg-rose-500' },
  ];

  const toggleAlgoSelection = (id: string) => {
    if (isRunning) return;
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length <= 2) {
        alert("Pilih minimal 2 algoritma untuk dibandingkan.");
        return;
      }
      setSelectedAlgos(selectedAlgos.filter(item => item !== id));
    } else {
      setSelectedAlgos([...selectedAlgos, id]);
    }
  };

  const generateRandomArray = () => {
    if (isRunning) return;
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArr);
    setResults(null);
    setRaceTracks([]);
    addGeneralLog(`🔄 Deret angka baru disiapkan: [${newArr.join(', ')}]`);
  };

  const handleApplyCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRunning) return;
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
    setRaceTracks([]);
    setCustomInput("");
    addGeneralLog(`🛠️ Deret angka custom diset: [${parsed.join(', ')}]`);
  };

  // Mesin Simulasi Balap dengan Durasi Diperlambat & Pencatatan Log Per-Algoritma
  const runSimultaneousBenchmark = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setResults(null);
    setActiveLogTab(selectedAlgos[0]);
    
    const initialTracks: RaceTrack[] = selectedAlgos.map(id => {
      const algoObj = allAlgos.find(a => a.id === id);
      return { id, name: algoObj?.name || id, array: [...array], isDone: false };
    });
    setRaceTracks(initialTracks);
    addGeneralLog(`🚀 Memulai kompetisi pengurutan untuk ${selectedAlgos.length} algoritma serentak!`);

    const benchmarkData: BenchmarkResult[] = selectedAlgos.map((id) => {
      const algoObj = allAlgos.find(a => a.id === id)!;
      const arr = [...array];
      const n = arr.length;
      let steps = 0; let compares = 0; let swaps = 0;
      const detailedLogs: string[] = [`[INFO] Memulai simulasi ${algoObj.name} pada array awal: [${arr.join(', ')}]`];
      const startTime = performance.now();

      if (id === 'bubble') {
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            steps++; compares++;
            detailedLogs.push(`[COMPARE] Bandingkan elemen [${j}] (${arr[j]}) vs [${j+1}] (${arr[j+1]})`);
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
              steps++; swaps++;
              detailedLogs.push(`[SWAP] Tukar posisi (${arr[j+1]}) > (${arr[j]})`);
            }
          }
        }
      } else if (id === 'selection') {
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            steps++; compares++;
            if (arr[j] < arr[minIdx]) minIdx = j;
          }
          if (minIdx !== i) {
            const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
            steps++; swaps++;
            detailedLogs.push(`[SWAP] Tukar posisi minimum (${arr[i]}) ke indeks [${i}]`);
          }
        }
      } else if (id === 'insertion') {
        for (let i = 1; i < n; i++) {
          let key = arr[i]; let j = i - 1; steps++; compares++;
          detailedLogs.push(`[INFO] Ambil kunci (${key}) untuk disisipkan`);
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; steps++; swaps++;
            detailedLogs.push(`[SWAP] Geser (${arr[j]}) ke kanan`);
            j = j - 1;
          }
          arr[j + 1] = key;
        }
      } else if (id === 'quick') {
        const quickHelper = (low: number, high: number) => {
          if (low < high) {
            let pivot = arr[high]; let i = low - 1;
            detailedLogs.push(`[PIVOT] Pilih Pivot: (${pivot}) pada rentang [${low}..${high}]`);
            for (let j = low; j < high; j++) {
              steps++; compares++;
              if (arr[j] <= pivot) {
                i++; const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                if (i !== j) {
                  steps++; swaps++;
                  detailedLogs.push(`[SWAP] Pindahkan (${arr[i]}) ke kiri pivot`);
                }
              }
            }
            const temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
            if (i + 1 !== high) {
              steps++; swaps++;
              detailedLogs.push(`[SWAP] Tempatkan Pivot (${pivot}) ke batas tengah indeks [${i+1}]`);
            }
            let pi = i + 1;
            quickHelper(low, pi - 1);
            quickHelper(pi + 1, high);
          }
        };
        quickHelper(0, n - 1);
      }

      detailedLogs.push(`[SORTED] ✔️ Selesai dalam ${steps} langkah, ${compares} perbandingan, ${swaps} pertukaran.`);
      const endTime = performance.now();
      return {
        algo: id, name: algoObj.name, complexity: algoObj.complexity,
        steps, compares, swaps, timeMs: Number((endTime - startTime).toFixed(3)) || 0.15,
        detailedLogs
      };
    });

    benchmarkData.sort((a, b) => (a.swaps + a.steps) - (b.swaps + b.steps));

    // Animasi Balap Diperlambat (900ms per putaran agar observasi nyaman!)
    addGeneralLog(`⚡ Memutar balapan animasi visual (ditempo lebih lambat agar mudah diamati)...`);
    const sortedArrayFinal = [...array].sort((a, b) => a - b);
    
    for (let i = 0; i < benchmarkData.length; i++) {
      const winner = benchmarkData[i];
      await new Promise(r => setTimeout(r, 900)); 
      
      setRaceTracks(prev => prev.map(track => {
        if (track.id === winner.algo) {
          return { ...track, array: sortedArrayFinal, isDone: true };
        }
        return track;
      }));
      addGeneralLog(`🏁 [FINISH Peringkat #${i + 1}] ${winner.name} menyelesaikan pengurutan (${winner.swaps} pertukaran)!`);
    }

    setResults(benchmarkData);
    setIsRunning(false);
    addGeneralLog(`🏆 Balapan selesai! ${benchmarkData[0].name} menjadi juara efisiensi.`);
  };

  const maxVal = Math.max(...array, 100);
  const activeResultObj = results?.find(r => r.algo === activeLogTab);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Komparasi & Efisiensi Algoritma
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Benchmark & Balap Algoritma
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pilih algoritma yang ingin Anda bandingkan, lalu saksikan balapan animasi pengurutannya secara real-time di arena eksekusi.
          </p>
        </div>

        {/* Control Filter Checkbox */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              🎯 Pilih Algoritma Yang Ingin Diadu (Minimal 2):
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {allAlgos.map((algo) => {
                const isSelected = selectedAlgos.includes(algo.id);
                return (
                  <button
                    key={algo.id}
                    onClick={() => toggleAlgoSelection(algo.id)}
                    disabled={isRunning}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${isSelected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`}></span>
                    <span>{algo.name}</span>
                    <span className="text-[10px] font-mono opacity-80">({algo.complexity})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Deret Angka Uji ({array.length} Elemen)</span>
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
                {isRunning ? "⏳ Sedang Balapan..." : "🚀 Jalankan Benchmark & Balap"}
              </button>
            </div>
          </div>

          <form onSubmit={handleApplyCustomInput} className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold text-slate-500 shrink-0">💡 Uji Kasus Sendiri:</span>
            <input
              type="text" placeholder="Ketik angka berpemisah koma, contoh: 99, 88, 77, 66, 55, 44, 33"
              value={customInput} onChange={(e) => setCustomInput(e.target.value)} disabled={isRunning}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 w-full disabled:opacity-50"
            />
            <button type="submit" disabled={isRunning} className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50">
              📥 Set Deret
            </button>
          </form>
        </div>

        {/* Live Racing Grid Arena */}
        {raceTracks.length > 0 && (
          <div className="mb-10 space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🏎️</span> Live Racing Visualizer Arena (Tempo Observasi)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raceTracks.map((track) => {
                const algoColor = allAlgos.find(a => a.id === track.id)?.color || 'bg-blue-600';
                return (
                  <div key={track.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-48">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${track.isDone ? 'bg-emerald-500' : 'bg-amber-400 animate-ping'}`}></span>
                        {track.name}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${track.isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {track.isDone ? '✔️ Selesai Terurut' : '⏳ Sedang Memproses...'}
                      </span>
                    </div>

                    <div className="flex items-end justify-center gap-1.5 flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden">
                      {track.array.map((val, idx) => {
                        const heightPct = Math.max(15, Math.round((val / maxVal) * 100));
                        return (
                          <div
                            key={idx}
                            style={{ height: `${heightPct}%` }}
                            className={`flex-1 rounded-t transition-all duration-300 ${track.isDone ? 'bg-emerald-500 shadow-sm' : algoColor}`}
                            title={`Value: ${val}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB LOG PER-ALGORITMA & STREAM GENERAL (FITUR BARU & LENGKAP!) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-80 mb-10">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-3">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              LOG KOMPARASI TERPERINCI PER-ALGORITMA
            </span>
            
            {/* Navigasi Tab Log */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveLogTab('general')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  activeLogTab === 'general' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🏁 Log Klasemen Balap
              </button>
              {selectedAlgos.map((id) => {
                const algoObj = allAlgos.find(a => a.id === id);
                const isSelected = activeLogTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveLogTab(id)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {algoObj?.name || id}
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {activeLogTab === 'general' ? (
              generalLogs.map((log, index) => (
                <div key={index} className={log.includes("🏁") ? "text-emerald-400 font-bold" : log.includes("🏆") ? "text-amber-300 font-extrabold" : log.includes("🚀") ? "text-cyan-400 font-semibold" : "text-slate-300"}>
                  {log}
                </div>
              ))
            ) : activeResultObj ? (
              activeResultObj.detailedLogs.map((logLine, index) => {
                const isSwap = logLine.includes("[SWAP]");
                const isSorted = logLine.includes("[SORTED]");
                const isPivot = logLine.includes("[PIVOT]");
                return (
                  <div key={index} className={`p-1.5 rounded bg-slate-950/40 border border-slate-800/50 ${isSwap ? 'text-rose-300' : isSorted ? 'text-emerald-300 font-bold' : isPivot ? 'text-purple-300' : 'text-slate-300'}`}>
                    {logLine}
                  </div>
                );
              })
            ) : (
              <div className="text-slate-500 italic">Jalankan benchmark terlebih dahulu untuk melihat log terperinci algoritma ini.</div>
            )}
          </div>
        </div>

        {/* Tabel Benchmark Klasemen */}
        {results && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>🏆</span> Hasil Klasemen Akhir Efisiensi
            </h2>

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
        )}
      </main>

      <Footer />
    </div>
  );
}
