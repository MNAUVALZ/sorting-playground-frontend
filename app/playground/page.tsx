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

export default function PlaygroundPage() {
  // Switcher Tab Utama: Mode Single vs Mode Race
  const [labMode, setLabMode] = useState<'single' | 'race'>('single');

  // --- STATE MODE SINGLE LAB ---
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(3);
  const [customInput, setCustomInput] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [allFrames, setAllFrames] = useState<StepFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const [logs, setLogs] = useState<LogItem[]>([
    { id: 1, time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Sistem Lab siap. Pilih algoritma dan tekan Play (▶) untuk simulasi." }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const logCounterRef = useRef<number>(2);

  // --- STATE MODE BENCHMARK & BALAP ---
  const [raceArray, setRaceArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [raceCustomInput, setRaceCustomInput] = useState<string>("");
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(['quick', 'insertion', 'selection', 'bubble']);
  const [raceTracks, setRaceTracks] = useState<RaceTrack[]>([]);
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const [isRacing, setIsRacing] = useState<boolean>(false);
  const [activeLogTab, setActiveLogTab] = useState<string>('general');
  const [generalLogs, setGeneralLogs] = useState<string[]>(["💬 Pilih minimal 2 algoritma yang ingin diadu, lalu klik 'Jalankan Balap & Benchmark'."]);
  const raceTerminalRef = useRef<HTMLDivElement>(null);

  const allAlgos: AlgoOption[] = [
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)', color: 'bg-purple-600' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)', color: 'bg-blue-600' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)', color: 'bg-amber-500' },
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)', color: 'bg-rose-500' },
  ];

  // SMART SCROLL LOGIKA: Hanya auto-scroll jika animasi SEDANG BERJALAN (isPlaying / isRacing).
  // Saat selesai / dijeda, scroll tidak dikunci agar Anda bebas scroll ke atas melihat riwayat!
  useEffect(() => {
    if (isPlaying && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, isPlaying]);

  useEffect(() => {
    if (isRacing && raceTerminalRef.current) {
      raceTerminalRef.current.scrollTop = raceTerminalRef.current.scrollHeight;
    }
  }, [generalLogs, isRacing]);

  const addLog = (type: LogItem['type'], text: string) => {
    const newId = logCounterRef.current++;
    setLogs(prev => [...prev, { id: newId, time: new Date().toLocaleTimeString('id-ID'), type, text }]);
  };

  const addGeneralLog = (msg: string) => {
    setGeneralLogs(prev => [...prev, `[${new Date().toLocaleTimeString('id-ID')}] ${msg}`]);
  };

  // --- LOGIKA MESIN SINGLE LAB ---
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
            logType: 'COMPARE', logMsg: `Bandingkan elemen [${j}] (${arr[j]}) vs [${j+1}] (${arr[j+1]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
            swaps++; stepNum++;
            frames.push({
              array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1],
              logType: 'SWAP', logMsg: `Tukar posisi (${arr[j+1]}) > (${arr[j]}), geser (${arr[j]}) ke kanan`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
        }
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i; stepNum++;
        frames.push({
          array: [...arr], comparing: [i], swappedIdx: [], logType: 'INFO',
          logMsg: `Batas indeks [${i}]. Asumsikan minimum sementara (${arr[i]})`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        for (let j = i + 1; j < n; j++) {
          compares++; stepNum++;
          frames.push({
            array: [...arr], comparing: [minIdx, j], swappedIdx: [], logType: 'COMPARE',
            logMsg: `Pindai (${arr[j]}) apakah < minimum (${arr[minIdx]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] < arr[minIdx]) {
            minIdx = j; stepNum++;
            frames.push({
              array: [...arr], comparing: [minIdx], swappedIdx: [], logType: 'INFO',
              logMsg: `🎯 Minimum baru di indeks [${minIdx}] bernilai (${arr[minIdx]})`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
        }
        if (minIdx !== i) {
          const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
          swaps++; stepNum++;
          frames.push({
            array: [...arr], comparing: [i, minIdx], swappedIdx: [i, minIdx], logType: 'SWAP',
            logMsg: `Tukar posisi minimum (${arr[i]}) ke batas kiri [${i}]`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i]; let j = i - 1; stepNum++;
        frames.push({
          array: [...arr], comparing: [i], swappedIdx: [], logType: 'INFO',
          logMsg: `Ambil elemen [${i}] bernilai (${key}) untuk disisipkan ke kiri`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        while (j >= 0 && arr[j] > key) {
          compares++; swaps++; stepNum++;
          arr[j + 1] = arr[j];
          frames.push({
            array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1], logType: 'SWAP',
            logMsg: `Geser (${arr[j]}) ke kanan karena > kunci (${key})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          j = j - 1;
        }
        if (j >= 0) compares++;
        arr[j + 1] = key; stepNum++;
        frames.push({
          array: [...arr], comparing: [j + 1], swappedIdx: [], logType: 'INFO',
          logMsg: `Sisipkan kunci (${key}) di posisi terurut [${j + 1}]`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
      }
    } else if (algo === 'quick') {
      const quickHelper = (low: number, high: number) => {
        if (low < high) {
          let pivot = arr[high]; stepNum++;
          frames.push({
            array: [...arr], comparing: [high], swappedIdx: [], logType: 'PIVOT',
            logMsg: `🎯 Partisi [${low}..${high}] -> Pilih Pivot: (${pivot})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          let i = low - 1;
          for (let j = low; j < high; j++) {
            compares++; stepNum++;
            frames.push({
              array: [...arr], comparing: [j, high], swappedIdx: [], logType: 'COMPARE',
              logMsg: `Bandingkan (${arr[j]}) <= Pivot (${pivot})`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
            if (arr[j] <= pivot) {
              i++; const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
              if (i !== j) {
                swaps++; stepNum++;
                frames.push({
                  array: [...arr], comparing: [i, j], swappedIdx: [i, j], logType: 'SWAP',
                  logMsg: `Pindahkan (${arr[i]}) ke kiri pivot indeks [${i}]`,
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
              logMsg: `Tempatkan Pivot (${pivot}) ke batas tengah final [${i + 1}]`,
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

  useEffect(() => {
    setIsPlaying(false);
    setIsSorted(false);
    setCurrentFrameIdx(0);
    const generatedFrames = buildSimulationFrames(algorithm, initialArray);
    setAllFrames(generatedFrames);
    setArray([...initialArray]);
  }, [algorithm, initialArray]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentFrameIdx < allFrames.length) {
      const delayMs = Math.max(50, Math.round(900 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentFrameIdx + 1;
        if (nextIdx >= allFrames.length) {
          setIsPlaying(false);
          setIsSorted(true);
          addLog('SORTED', `🏆 Seluruh elemen terurut sempurna dalam ${allFrames.length} langkah! (Auto-scroll dimatikan agar bebas direview)`);
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

  const handlePlayPause = () => {
    if (isSorted) return;
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentFrameIdx === 0) addLog('INFO', `▶ Memulai simulasi ${algorithm.toUpperCase()} (Speed: ${speedMultiplier}x)...`);
  };

  const handleNextStep = () => {
    if (isPlaying || isSorted || currentFrameIdx >= allFrames.length - 1) return;
    const nextIdx = currentFrameIdx + 1;
    setCurrentFrameIdx(nextIdx);
    const frame = allFrames[nextIdx];
    setArray(frame.array);
    addLog(frame.logType, `[NEXT] ${frame.logMsg}`);
    if (nextIdx === allFrames.length - 1) { setIsSorted(true); addLog('SORTED', `🏆 Pengurutan selesai!`); }
  };

  const handlePrevStep = () => {
    if (isPlaying || currentFrameIdx <= 0) return;
    setIsSorted(false);
    const prevIdx = currentFrameIdx - 1;
    setCurrentFrameIdx(prevIdx);
    const frame = allFrames[prevIdx];
    setArray(frame.array);
    addLog('INFO', `[PREV] Kembali ke langkah #${frame.stepNum}`);
  };

  const handleReset = () => {
    setIsPlaying(false); setIsSorted(false); setCurrentFrameIdx(0); setArray([...initialArray]);
    addLog('INFO', "⏹️ Simulasi direset ke array awal.");
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
    const parsed = customInput.split(',').map(str => parseInt(str.trim(), 10)).filter(num => !isNaN(num) && num > 0 && num <= 500);
    if (parsed.length < 3) { addLog('ERROR', "Minimal 3 angka valid berpemisah koma."); return; }
    if (parsed.length > 20) { addLog('ERROR', "Maksimal 20 angka agar optimal."); return; }
    setInitialArray(parsed); setCustomInput(""); addLog('INFO', `🛠️ Deret angka custom diset: [${parsed.join(', ')}]`);
  };

  // --- LOGIKA MESIN RACE & BENCHMARK ---
  const toggleAlgoSelection = (id: string) => {
    if (isRacing) return;
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length <= 2) { alert("Pilih minimal 2 algoritma untuk dibandingkan."); return; }
      setSelectedAlgos(selectedAlgos.filter(item => item !== id));
    } else { setSelectedAlgos([...selectedAlgos, id]); }
  };

  const generateRaceRandomArray = () => {
    if (isRacing) return;
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 95) + 5);
    setRaceArray(newArr); setResults(null); setRaceTracks([]);
    addGeneralLog(`🔄 Deret balap baru diacak: [${newArr.join(', ')}]`);
  };

  const handleApplyRaceCustomInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRacing) return;
    const parsed = raceCustomInput.split(',').map(str => parseInt(str.trim(), 10)).filter(num => !isNaN(num) && num > 0 && num <= 1000);
    if (parsed.length < 3) { alert("Minimal 3 angka valid."); return; }
    setRaceArray(parsed); setResults(null); setRaceTracks([]); setRaceCustomInput("");
    addGeneralLog(`🛠️ Deret balap custom diset: [${parsed.join(', ')}]`);
  };

  const runSimultaneousBenchmark = async () => {
    if (isRacing) return;
    setIsRacing(true); setResults(null); setActiveLogTab('general');
    
    const initialTracks: RaceTrack[] = selectedAlgos.map(id => {
      const algoObj = allAlgos.find(a => a.id === id);
      return { id, name: algoObj?.name || id, array: [...raceArray], isDone: false };
    });
    setRaceTracks(initialTracks);
    addGeneralLog(`🚀 Memulai kompetisi untuk ${selectedAlgos.length} algoritma serentak!`);

    const benchmarkData: BenchmarkResult[] = selectedAlgos.map((id) => {
      const algoObj = allAlgos.find(a => a.id === id)!;
      const arr = [...raceArray];
      const n = arr.length;
      let steps = 0; let compares = 0; let swaps = 0;
      const detailedLogs: string[] = [`[INFO] Memulai ${algoObj.name} pada: [${arr.join(', ')}]`];
      const startTime = performance.now();

      if (id === 'bubble') {
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            steps++; compares++;
            detailedLogs.push(`[COMPARE] [${j}] (${arr[j]}) vs [${j+1}] (${arr[j+1]})`);
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
              steps++; swaps++;
              detailedLogs.push(`[SWAP] Tukar (${arr[j+1]}) > (${arr[j]})`);
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
            detailedLogs.push(`[SWAP] Tukar minimum (${arr[i]}) ke indeks [${i}]`);
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
            detailedLogs.push(`[PIVOT] Pilih Pivot: (${pivot}) pada [${low}..${high}]`);
            for (let j = low; j < high; j++) {
              steps++; compares++;
              if (arr[j] <= pivot) {
                i++; const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                if (i !== j) { steps++; swaps++; detailedLogs.push(`[SWAP] Pindahkan (${arr[i]}) ke kiri pivot`); }
              }
            }
            const temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
            if (i + 1 !== high) { steps++; swaps++; detailedLogs.push(`[SWAP] Tempatkan Pivot (${pivot}) ke tengah [${i+1}]`); }
            let pi = i + 1;
            quickHelper(low, pi - 1); quickHelper(pi + 1, high);
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
    addGeneralLog(`⚡ Memutar animasi balap secara bertahap (tempo observasi)...`);
    const sortedArrayFinal = [...raceArray].sort((a, b) => a - b);
    
    for (let i = 0; i < benchmarkData.length; i++) {
      const winner = benchmarkData[i];
      await new Promise(r => setTimeout(r, 800)); 
      setRaceTracks(prev => prev.map(track => {
        if (track.id === winner.algo) return { ...track, array: sortedArrayFinal, isDone: true };
        return track;
      }));
      addGeneralLog(`🏁 [FINISH Peringkat #${i + 1}] ${winner.name} selesai (${winner.swaps} swap)!`);
    }

    setResults(benchmarkData);
    setIsRacing(false);
    addGeneralLog(`🏆 Balapan selesai! ${benchmarkData[0].name} menjadi juara efisiensi. (Auto-scroll mati)`);
  };

  const currentFrame = allFrames[currentFrameIdx] || { comparing: [], swappedIdx: [], totalCompares: 0, totalSwaps: 0, stepNum: 0 };
  const maxVal = Math.max(...array, 100);
  const maxRaceVal = Math.max(...raceArray, 100);
  const activeResultObj = results?.find(r => r.algo === activeLogTab);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* TAB SWITCHER DI ATAS: SATUKAN LAB DAN PERBANDINGAN! */}
      <div className="bg-slate-900 text-white py-4 px-6 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <span className="font-extrabold text-base tracking-wide">Pilih Mode Eksperimen Lab:</span>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => { setLabMode('single'); setIsPlaying(false); }}
              className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                labMode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🛠️</span> Mode Visualisasi Tunggal
            </button>
            <button
              onClick={() => { setLabMode('race'); setIsPlaying(false); }}
              className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                labMode === 'race' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🏎️</span> Mode Benchmark & Balap
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: VISUALISASI TUNGGAL (SIDE-BY-SIDE, KARTU 620PX, SMART SCROLL) */}
      {/* ========================================================================= */}
      {labMode === 'single' && (
        <>
          <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-extrabold text-slate-900">Lab Eksperimen Interaktif</h2>
                {isPlaying ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-bold animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span> ⚡ RUNNING
                  </span>
                ) : isSorted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-bold">
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

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl">
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
                  className="px-3.5 py-2 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-sm rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <span>🔄</span> Acak
                </button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button onClick={handlePrevStep} disabled={isPlaying || currentFrameIdx <= 0} className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 flex items-center gap-1">
                  <span>⏮️</span> Sebelumnya
                </button>
                <button
                  onClick={handlePlayPause} disabled={isSorted}
                  className={`px-6 py-2 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 ${
                    isPlaying ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } disabled:opacity-50`}
                >
                  <span>{isPlaying ? '⏸️' : '▶'}</span>
                  <span>{isPlaying ? 'Jeda Animasi' : 'Putar Animasi'}</span>
                </button>
                <button onClick={handleNextStep} disabled={isPlaying || isSorted || currentFrameIdx >= allFrames.length - 1} className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 flex items-center gap-1">
                  <span>Selanjutnya</span> ⏭️
                </button>
                <button onClick={handleReset} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl ml-2">
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

          {/* LAYOUT SIDE-BY-SIDE: KANVAS KIRI (2 KOLOM), LOG KANAN (1 KOLOM), TINGGI 620PX! */}
          <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* KOLOM KIRI (2 Kolom di Desktop): Telemetri + Kanvas Balok */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Progres Langkah</span>
                  <span className="text-xl font-mono font-extrabold text-slate-900">{currentFrame.stepNum} <span className="text-xs font-normal text-slate-400">/ {allFrames.length}</span></span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-amber-500 uppercase block">Perbandingan</span>
                  <span className="text-xl font-mono font-extrabold text-amber-600">{currentFrame.totalCompares}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-rose-500 uppercase block">Pertukaran (Swap)</span>
                  <span className="text-xl font-mono font-extrabold text-rose-600">{currentFrame.totalSwaps}</span>
                </div>
              </div>

              {/* Kanvas Animasi Ditinggikan menjadi 520px */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between h-[520px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Belum Terurut</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Dibandingkan</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Tukar Posisi (Swap)</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Terurut</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-400">Total: {array.length}</div>
                </div>

                <div className="flex items-end justify-center gap-2.5 flex-1 px-4 h-full">
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
            </div>

            {/* KOLOM KANAN (1 Kolom di Desktop): Terminal Log Tinggi 620px & Smart Scroll! */}
            <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col h-[610px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  EXECUTION LOG STREAM
                </span>
                <button 
                  onClick={() => setLogs([{ id: Date.now(), time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Terminal log dibersihkan." }])} 
                  className="text-xs text-slate-400 hover:text-white underline font-mono"
                >
                  Clear
                </button>
              </div>
              
              <div className="text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800/60 mb-2 flex justify-between items-center">
                <span>Total: <strong className="text-white">{logs.length}</strong> baris</span>
                <span className="italic text-slate-500">{isPlaying ? '⚡ Auto-scrolling...' : '🔓 Scroll bebas aktif'}</span>
              </div>

              {/* Area Scroll Memanjang Ke Bawah yang Sangat Nyaman */}
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
                    <div key={log.id} className="flex items-start gap-2 leading-relaxed bg-slate-950/50 p-2 rounded-lg border border-slate-800/60 hover:border-slate-700 transition-colors">
                      <span className="text-slate-500 shrink-0 text-[11px]">[{log.time}]</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 text-center ${badgeColor}`}>
                        {label}
                      </span>
                      <span className={log.type === 'SWAP' ? "text-rose-200 font-semibold text-xs" : log.type === 'SORTED' ? "text-emerald-300 font-bold text-xs" : log.type === 'PIVOT' ? "text-purple-200 font-semibold text-xs" : "text-slate-300 text-xs"}>
                        {log.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: BENCHMARK & BALAP SERENTAK (DIINTEGRASIKAN DI DALAM LAB!) */}
      {/* ========================================================================= */}
      {labMode === 'race' && (
        <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                🎯 Pilih Algoritma Yang Ingin Diadu (Minimal 2):
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {allAlgos.map((algo) => {
                  const isSelected = selectedAlgos.includes(algo.id);
                  return (
                    <button
                      key={algo.id} onClick={() => toggleAlgoSelection(algo.id)} disabled={isRacing}
                      className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
                        isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
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
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Deret Angka Balap ({raceArray.length} Elemen)</span>
                <div className="font-mono text-sm font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 break-all">
                  [{raceArray.join(', ')}]
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={generateRaceRandomArray} disabled={isRacing} className="px-4 py-2.5 border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-sm rounded-xl shadow-sm">
                  🔄 Acak Baru
                </button>
                <button onClick={runSimultaneousBenchmark} disabled={isRacing} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-md flex items-center gap-2">
                  {isRacing ? "⏳ Sedang Balapan..." : "🚀 Jalankan Balap & Benchmark"}
                </button>
              </div>
            </div>

            <form onSubmit={handleApplyRaceCustomInput} className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-bold text-slate-500 shrink-0">💡 Uji Kasus Sendiri:</span>
              <input
                type="text" placeholder="Ketik angka berpemisah koma: 99, 88, 77, 66, 55" value={raceCustomInput}
                onChange={(e) => setRaceCustomInput(e.target.value)} disabled={isRacing}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 w-full disabled:opacity-50"
              />
              <button type="submit" disabled={isRacing} className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl disabled:opacity-50">
                📥 Set Deret Balap
              </button>
            </form>
          </div>

          {/* Arena Racing Grid */}
          {raceTracks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>🏎️</span> Live Racing Visualizer Arena
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {raceTracks.map((track) => {
                  const algoColor = allAlgos.find(a => a.id === track.id)?.color || 'bg-blue-600';
                  return (
                    <div key={track.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-52">
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
                          const heightPct = Math.max(15, Math.round((val / maxRaceVal) * 100));
                          return <div key={idx} style={{ height: `${heightPct}%` }} className={`flex-1 rounded-t transition-all duration-300 ${track.isDone ? 'bg-emerald-500 shadow-sm' : algoColor}`} />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Log Komparasi Per-Algoritma */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col h-80">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-3">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                LOG BENCHMARK TERPERINCI PER-ALGORITMA
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setActiveLogTab('general')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeLogTab === 'general' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                  🏁 Log Klasemen
                </button>
                {selectedAlgos.map((id) => {
                  const algoObj = allAlgos.find(a => a.id === id);
                  return (
                    <button key={id} onClick={() => setActiveLogTab(id)} className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeLogTab === id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                      {algoObj?.name || id}
                    </button>
                  );
                })}
              </div>
            </div>
            <div ref={raceTerminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {activeLogTab === 'general' ? (
                generalLogs.map((log, index) => <div key={index} className={log.includes("🏁") ? "text-emerald-400 font-bold" : log.includes("🏆") ? "text-amber-300 font-extrabold" : "text-slate-300"}>{log}</div>)
              ) : results?.find(r => r.algo === activeLogTab)?.detailedLogs.map((logLine, index) => (
                <div key={index} className={`p-1.5 rounded bg-slate-950/40 border border-slate-800/50 ${logLine.includes("[SWAP]") ? 'text-rose-300' : logLine.includes("[SORTED]") ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>{logLine}</div>
              )) || <div className="text-slate-500 italic">Jalankan benchmark untuk melihat log algoritma ini.</div>}
            </div>
          </div>

          {/* Klasemen Akhir */}
          {results && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><span>🏆</span> Hasil Klasemen Akhir Efisiensi</h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Peringkat & Algoritma</th>
                      <th className="py-4 px-6">Kompleksitas</th>
                      <th className="py-4 px-6">Perbandingan</th>
                      <th className="py-4 px-6">Pertukaran (Swap)</th>
                      <th className="py-4 px-6">Waktu Eksekusi</th>
                      <th className="py-4 px-6">Efisiensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                    {results.map((res, index) => (
                      <tr key={res.algo} className={index === 0 ? "bg-blue-50/50" : "hover:bg-slate-50/50"}>
                        <td className="py-4 px-6 flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>{index + 1}</span>
                          <span className="font-extrabold text-slate-900">{res.name}</span>
                          {index === 0 && <span className="text-[10px] uppercase bg-blue-600 text-white px-2 py-0.5 rounded font-bold">Terbaik</span>}
                        </td>
                        <td className="py-4 px-6 font-mono text-slate-500">{res.complexity}</td>
                        <td className="py-4 px-6 font-mono text-amber-600">{res.compares} kali</td>
                        <td className="py-4 px-6 font-mono text-rose-600 font-bold">{res.swaps} kali</td>
                        <td className="py-4 px-6 font-mono text-slate-800">{res.timeMs} ms</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${index === 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : index === 1 ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {index === 0 ? 'A+ (Optimal)' : index === 1 ? 'B (Baik)' : 'C (Standar O(n²))'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}
