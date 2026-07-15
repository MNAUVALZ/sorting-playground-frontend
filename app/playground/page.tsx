"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ArrayBar from '@/components/visualizer/ArrayBar';

interface LogItem {
  id: number;
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
}

interface RaceTrack {
  id: string;
  name: string;
  array: number[];
  isDone: boolean;
}

export default function PlaygroundPage() {
  const [labMode, setLabMode] = useState<'single' | 'race'>('single');

  // --- STATE UMUM & KONTROL ---
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(3);
  const [arraySize, setArraySize] = useState<number>(12);
  const [customInput, setCustomInput] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const logCounterRef = useRef<number>(1);

  // --- STATE MODE TUNGGAL ---
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [allFrames, setAllFrames] = useState<StepFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogItem[]>([
    { id: 0, type: 'INFO', text: "Sistem siap. Pilih algoritma dan tekan Putar Animasi untuk memulai." }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // --- STATE MODE KOMPARASI ---
  const [raceArray, setRaceArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(['quick', 'insertion', 'selection', 'bubble']);
  const [raceFramesMap, setRaceFramesMap] = useState<Record<string, StepFrame[]>>({});
  const [currentRaceIdx, setCurrentRaceIdx] = useState<number>(0);
  const [maxRaceFrames, setMaxRaceFrames] = useState<number>(0);
  const [isRaceSorted, setIsRaceSorted] = useState<boolean>(false);
  
  // Tab di terminal log komparasi DIHAPUS (Log gabungan langsung ditampilkan)
  const [activeTableTab, setActiveTableTab] = useState<string>('quick');
  const [generalLogs, setGeneralLogs] = useState<LogItem[]>([
    { id: 0, type: 'INFO', text: "Pilih minimal 2 algoritma yang ingin diadu, lalu tekan Putar Komparasi." }
  ]);
  const raceTerminalRef = useRef<HTMLDivElement>(null);

  const allAlgos: AlgoOption[] = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)', color: 'bg-rose-500' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)', color: 'bg-amber-500' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)', color: 'bg-blue-600' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)', color: 'bg-purple-600' },
  ];

  useEffect(() => {
    if (selectedAlgos.length > 0 && !selectedAlgos.includes(activeTableTab)) {
      setActiveTableTab(selectedAlgos[0]);
    }
  }, [selectedAlgos, activeTableTab]);

  const handleManualScroll = () => { if (autoScroll) setAutoScroll(false); };

  useEffect(() => {
    if (autoScroll && terminalRef.current && labMode === 'single') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, autoScroll, labMode]);

  useEffect(() => {
    if (autoScroll && raceTerminalRef.current && labMode === 'race') {
      raceTerminalRef.current.scrollTop = raceTerminalRef.current.scrollHeight;
    }
  }, [generalLogs, autoScroll, labMode, currentRaceIdx]);

  const addLog = (type: LogItem['type'], text: string) => {
    const newId = logCounterRef.current++;
    setLogs(prev => [...prev, { id: newId, type, text }]);
  };

  const addGeneralLog = (type: LogItem['type'], text: string) => {
    const newId = logCounterRef.current++;
    setGeneralLogs(prev => [...prev, { id: newId, type, text }]);
  };

  // --- MESIN KOMPUTASI ---
  const computeAlgoFrames = (algo: string, startArr: number[]): StepFrame[] => {
    const frames: StepFrame[] = [];
    const arr = [...startArr];
    const n = arr.length;
    let compares = 0; let swaps = 0; let stepNum = 0;

    frames.push({
      array: [...arr], comparing: [], swappedIdx: [], logType: 'INFO',
      logMsg: `Kondisi array awal sebelum pengurutan`,
      stepNum: 0, totalCompares: 0, totalSwaps: 0
    });

    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          compares++; stepNum++;
          frames.push({
            array: [...arr], comparing: [j, j + 1], swappedIdx: [], logType: 'COMPARE',
            logMsg: `Bandingkan elemen (${arr[j]}) vs (${arr[j+1]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
            swaps++; stepNum++;
            frames.push({
              array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1], logType: 'SWAP',
              logMsg: `Tukar posisi (${arr[j+1]}) dengan (${arr[j]})`,
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
          logMsg: `Asumsikan batas kiri (${arr[i]}) adalah minimum sementara`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        for (let j = i + 1; j < n; j++) {
          compares++; stepNum++;
          frames.push({
            array: [...arr], comparing: [minIdx, j], swappedIdx: [], logType: 'COMPARE',
            logMsg: `Cek apakah (${arr[j]}) < minimum (${arr[minIdx]})`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          if (arr[j] < arr[minIdx]) {
            minIdx = j; stepNum++;
            frames.push({
              array: [...arr], comparing: [minIdx], swappedIdx: [], logType: 'INFO',
              logMsg: `Minimum baru ditemukan: (${arr[minIdx]})`,
              stepNum, totalCompares: compares, totalSwaps: swaps
            });
          }
        }
        if (minIdx !== i) {
          const temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
          swaps++; stepNum++;
          frames.push({
            array: [...arr], comparing: [i, minIdx], swappedIdx: [i, minIdx], logType: 'SWAP',
            logMsg: `Tukar minimum (${arr[i]}) ke batas kiri`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        let key = arr[i]; let j = i - 1; stepNum++;
        frames.push({
          array: [...arr], comparing: [i], swappedIdx: [], logType: 'INFO',
          logMsg: `Ambil elemen (${key}) untuk disisipkan ke kiri`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
        while (j >= 0 && arr[j] > key) {
          compares++; swaps++; stepNum++;
          arr[j + 1] = arr[j];
          frames.push({
            array: [...arr], comparing: [j, j + 1], swappedIdx: [j, j + 1], logType: 'SWAP',
            logMsg: `Geser (${arr[j]}) ke kanan karena lebih besar dari kunci`,
            stepNum, totalCompares: compares, totalSwaps: swaps
          });
          j = j - 1;
        }
        if (j >= 0) compares++;
        arr[j + 1] = key; stepNum++;
        frames.push({
          array: [...arr], comparing: [j + 1], swappedIdx: [], logType: 'INFO',
          logMsg: `Sisipkan kunci (${key}) di posisinya`,
          stepNum, totalCompares: compares, totalSwaps: swaps
        });
      }
    } else if (algo === 'quick') {
      const quickHelper = (low: number, high: number) => {
        if (low < high) {
          let pivot = arr[high]; stepNum++;
          frames.push({
            array: [...arr], comparing: [high], swappedIdx: [], logType: 'PIVOT',
            logMsg: `Partisi wilayah -> Pilih Pivot: (${pivot})`,
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
                  logMsg: `Pindahkan (${arr[i]}) ke wilayah kiri pivot`,
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
              logMsg: `Tempatkan Pivot (${pivot}) sebagai batas tengah`,
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
    
    frames.push({
      array: [...arr], comparing: [], swappedIdx: [], logType: 'SORTED',
      logMsg: `Pengurutan selesai! (${swaps} swap)`,
      stepNum: stepNum + 1, totalCompares: compares, totalSwaps: swaps
    });

    return frames;
  };

  useEffect(() => {
    setIsPlaying(false); setIsSorted(false); setCurrentFrameIdx(0);
    const generated = computeAlgoFrames(algorithm, initialArray);
    setAllFrames(generated); setArray([...initialArray]);
  }, [algorithm, initialArray]);

  useEffect(() => {
    setIsPlaying(false); setIsRaceSorted(false); setCurrentRaceIdx(0);
    const map: Record<string, StepFrame[]> = {};
    let maxLen = 0;
    selectedAlgos.forEach(algo => {
      const frames = computeAlgoFrames(algo, raceArray);
      map[algo] = frames;
      if (frames.length > maxLen) maxLen = frames.length;
    });
    setRaceFramesMap(map);
    setMaxRaceFrames(maxLen);
  }, [selectedAlgos, raceArray]);

  // --- PEMUTAR OTOMATIS TUNGGAL & KOMPARASI ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && labMode === 'single' && currentFrameIdx < allFrames.length - 1) {
      const delayMs = Math.max(20, Math.round(600 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentFrameIdx + 1;
        setCurrentFrameIdx(nextIdx);
        const frame = allFrames[nextIdx];
        setArray(frame.array);
        
        if (frame.logType !== 'SORTED') addLog(frame.logType, frame.logMsg);
        
        if (nextIdx >= allFrames.length - 1) {
          setIsPlaying(false); setIsSorted(true); setAutoScroll(false);
          addLog('SORTED', `Selesai dalam ${allFrames.length - 1} langkah!`);
        }
      }, delayMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIdx, allFrames, speedMultiplier, labMode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && labMode === 'race' && currentRaceIdx < maxRaceFrames - 1) {
      const delayMs = Math.max(20, Math.round(600 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentRaceIdx + 1;
        setCurrentRaceIdx(nextIdx);
        if (nextIdx >= maxRaceFrames - 1) {
          setIsPlaying(false); setIsRaceSorted(true); setAutoScroll(false);
          addGeneralLog('SORTED', `Seluruh kompetisi algoritma selesai!`);
        } else {
          selectedAlgos.forEach(id => {
            const f = raceFramesMap[id];
            if (f && nextIdx === f.length - 1) {
              const algoName = allAlgos.find(a => a.id === id)?.name || id;
              addGeneralLog('SORTED', `[FINISH] ${algoName} selesai!`);
            }
          });
        }
      }, delayMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentRaceIdx, maxRaceFrames, speedMultiplier, labMode, raceFramesMap, selectedAlgos]);

  const handlePlayPause = () => {
    if (labMode === 'single') {
      if (isSorted) return;
      setIsPlaying(!isPlaying); setAutoScroll(true);
      if (!isPlaying && currentFrameIdx === 0) addLog('INFO', `Memulai simulasi ${algorithm.toUpperCase()}...`);
    } else {
      if (isRaceSorted) return;
      setIsPlaying(!isPlaying); setAutoScroll(true);
      if (!isPlaying && currentRaceIdx === 0) addGeneralLog('INFO', `Memulai komparasi serentak...`);
    }
  };

  const handleNextStep = () => {
    if (isPlaying) return;
    setAutoScroll(true);
    if (labMode === 'single') {
      if (isSorted || currentFrameIdx >= allFrames.length - 1) return;
      const nextIdx = currentFrameIdx + 1;
      setCurrentFrameIdx(nextIdx); setArray(allFrames[nextIdx].array);
      if (allFrames[nextIdx].logType !== 'SORTED') addLog(allFrames[nextIdx].logType, allFrames[nextIdx].logMsg);
      if (nextIdx === allFrames.length - 1) { setIsSorted(true); addLog('SORTED', "Selesai."); setAutoScroll(false); }
    } else {
      if (isRaceSorted || currentRaceIdx >= maxRaceFrames - 1) return;
      const nextIdx = currentRaceIdx + 1;
      setCurrentRaceIdx(nextIdx);
      if (nextIdx === maxRaceFrames - 1) { setIsRaceSorted(true); setAutoScroll(false); }
    }
  };

  const handlePrevStep = () => {
    if (isPlaying) return;
    setAutoScroll(true);
    if (labMode === 'single') {
      if (currentFrameIdx <= 0) return;
      setIsSorted(false); const prevIdx = currentFrameIdx - 1;
      setCurrentFrameIdx(prevIdx); setArray(allFrames[prevIdx].array);
      addLog('INFO', `Mundur ke langkah #${allFrames[prevIdx].stepNum}`);
    } else {
      if (currentRaceIdx <= 0) return;
      setIsRaceSorted(false); const prevIdx = currentRaceIdx - 1;
      setCurrentRaceIdx(prevIdx);
      addGeneralLog('INFO', `Mundur ke langkah serentak #${prevIdx}`);
    }
  };

  const handleReset = () => {
    setIsPlaying(false); setAutoScroll(true);
    if (labMode === 'single') {
      setIsSorted(false); setCurrentFrameIdx(0); setArray([...initialArray]); addLog('INFO', "Simulasi direset.");
    } else {
      setIsRaceSorted(false); setCurrentRaceIdx(0); addGeneralLog('INFO', "Komparasi direset.");
    }
  };

  const generateRandom = () => {
    if (isPlaying) return;
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 95) + 5);
    if (labMode === 'single') { setInitialArray(newArr); addLog('INFO', `Diacak ulang (${arraySize} balok)`); } 
    else { setRaceArray(newArr); addGeneralLog('INFO', `Diacak ulang (${arraySize} balok)`); }
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;
    const parsed = customInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0 && n <= 500);
    if (parsed.length < 3) { alert("Minimal 3 angka valid berpemisah koma."); return; }
    if (labMode === 'single') { setInitialArray(parsed); setArraySize(parsed.length); setCustomInput(""); addLog('INFO', `Deret custom diset!`); } 
    else { setRaceArray(parsed); setArraySize(parsed.length); setCustomInput(""); addGeneralLog('INFO', `Deret komparasi custom diset!`); }
  };

  const toggleAlgoSelection = (id: string) => {
    if (isPlaying) return;
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length <= 2) { alert("Pilih minimal 2 algoritma."); return; }
      setSelectedAlgos(selectedAlgos.filter(item => item !== id));
    } else { setSelectedAlgos([...selectedAlgos, id]); }
  };

  useEffect(() => {
    if (!isPlaying) generateRandom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]); 

  const currentFrame = allFrames[currentFrameIdx] || { comparing: [], swappedIdx: [], totalCompares: 0, totalSwaps: 0, stepNum: 0 };
  const maxVal = Math.max(...array, 100);
  const maxRaceVal = Math.max(...raceArray, 100);

  const raceLeaderboard = selectedAlgos.map(id => {
    const f = raceFramesMap[id] || [];
    const lastF = f[f.length - 1] || { totalCompares: 0, totalSwaps: 0 };
    const algoObj = allAlgos.find(a => a.id === id)!;
    return { id, name: algoObj.name, complexity: algoObj.complexity, steps: f.length - 1, compares: lastF.totalCompares, swaps: lastF.totalSwaps };
  }).sort((a, b) => (a.swaps + a.steps) - (b.swaps + b.steps));

  const getBadgeStyle = (type: string) => {
    if (type === 'PIVOT') return "bg-purple-900/60 text-purple-300 border-purple-700";
    if (type === 'COMPARE') return "bg-amber-900/60 text-amber-300 border-amber-700";
    if (type === 'SWAP') return "bg-rose-900/60 text-rose-300 border-rose-700 font-bold";
    if (type === 'SORTED') return "bg-emerald-900/60 text-emerald-300 border-emerald-700 font-bold";
    if (type === 'ERROR') return "bg-red-950 text-red-400 border-red-800 font-bold";
    return "bg-slate-800 text-slate-300 border-slate-700";
  };

  const renderLogItem = (log: LogItem) => (
    <div key={log.id} className="flex items-start gap-2.5 leading-relaxed p-1.5 hover:bg-slate-800/30 rounded border border-transparent transition-colors">
      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 text-center min-w-[65px] ${getBadgeStyle(log.type)}`}>
        {log.type}
      </span>
      <span className={log.type === 'SWAP' ? "text-rose-200 font-medium text-xs" : log.type === 'SORTED' ? "text-emerald-300 font-bold text-xs" : log.type === 'PIVOT' ? "text-purple-200 font-medium text-xs" : "text-slate-300 text-xs"}>
        {log.text}
      </span>
    </div>
  );

  const traceFrames = labMode === 'single'
    ? allFrames.slice(0, currentFrameIdx + 1)
    : (raceFramesMap[activeTableTab] || []).slice(0, currentRaceIdx + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <div className="bg-slate-900 text-white py-3 px-6 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-extrabold text-sm tracking-wide text-slate-200 uppercase">
            Pilih Mode Simulator
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button onClick={() => { setLabMode('single'); setIsPlaying(false); setAutoScroll(true); }} className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${labMode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
              Visualisasi Tunggal
            </button>
            <button onClick={() => { setLabMode('race'); setIsPlaying(false); setAutoScroll(true); }} className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${labMode === 'race' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
              Komparasi Serentak
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-t-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center bg-slate-100 border-b border-slate-200 px-2 pt-2 gap-1">
              {labMode === 'single' ? (
                allAlgos.map((algo) => (
                  <button key={algo.id} onClick={() => setAlgorithm(algo.id)} disabled={isPlaying} className={`px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all border-t border-x ${algorithm === algo.id ? 'bg-white text-blue-700 border-slate-200 relative top-[1px]' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-200'}`}>
                    {algo.name}
                  </button>
                ))
              ) : (
                allAlgos.map((algo) => (
                  <button key={algo.id} onClick={() => toggleAlgoSelection(algo.id)} disabled={isPlaying} className={`px-4 py-2 rounded-t-xl font-bold text-xs transition-all border-t border-x flex items-center gap-1.5 ${selectedAlgos.includes(algo.id) ? 'bg-white text-slate-900 border-slate-200 relative top-[1px]' : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-200'}`}>
                    <span className={`w-2 h-2 rounded-full ${selectedAlgos.includes(algo.id) ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                    {algo.name}
                  </button>
                ))
              )}
            </div>

            <div className="p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-col gap-1 w-32">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Jumlah Data: {arraySize}</span>
                  <input type="range" min="5" max="40" step="1" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} disabled={isPlaying} className="accent-blue-600 cursor-pointer" />
                </div>
                <div className="flex flex-col gap-1 w-32">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Kecepatan: {speedMultiplier}x</span>
                  <input type="range" min="1" max="10" step="1" value={speedMultiplier} onChange={(e) => setSpeedMultiplier(Number(e.target.value))} className="accent-emerald-500 cursor-pointer" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={generateRandom} disabled={isPlaying} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-all">Acak Baru</button>
                <form onSubmit={handleApplyCustom} className="flex items-center gap-2">
                  <input type="text" placeholder="Data manual..." value={customInput} onChange={(e) => setCustomInput(e.target.value)} disabled={isPlaying} className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono w-32 outline-none focus:border-blue-500 disabled:opacity-50" />
                  <button type="submit" disabled={isPlaying} className="px-3 py-1.5 bg-slate-800 text-white font-bold text-xs rounded-lg">Set</button>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-2xl border border-slate-200 border-t-0 p-6 shadow-sm flex flex-col justify-between h-[420px]">
            {labMode === 'single' ? (
              <div className="flex items-end justify-center gap-1.5 flex-1 px-2 h-full w-full">
                {array.map((val, idx) => {
                  const ht = Math.max(5, Math.round((val / maxVal) * 100));
                  return <div key={idx} style={{ height: `${ht}%` }} className={`flex-1 rounded-t transition-all duration-150 ${isSorted ? 'bg-emerald-500' : currentFrame.swappedIdx.includes(idx) ? 'bg-rose-500' : currentFrame.comparing.includes(idx) ? 'bg-amber-400' : 'bg-blue-600'}`} />
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 h-full">
                {selectedAlgos.map(id => {
                  const algo = allAlgos.find(a=>a.id===id)!;
                  const frames = raceFramesMap[id] || [];
                  const safeIdx = Math.min(currentRaceIdx, Math.max(0, frames.length - 1));
                  const activeFrame = frames[safeIdx] || { array: raceArray };
                  const isDone = isRaceSorted || (frames.length > 0 && currentRaceIdx >= frames.length - 1);
                  return (
                    <div key={id} className="bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex justify-between">
                        <span>{algo.name}</span>
                        {isDone && <span className="text-emerald-600">Selesai</span>}
                      </span>
                      <div className="flex items-end gap-0.5 flex-1 w-full">
                        {activeFrame.array.map((v, i) => {
                          const h = Math.max(5, Math.round((v / maxRaceVal) * 100));
                          return <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t transition-all ${isDone ? 'bg-emerald-400' : algo.color}`} />
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <div className="mt-6 text-center h-8">
              {labMode === 'single' ? (
                <span className={`text-sm font-bold px-4 py-2 rounded-full border ${isSorted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : currentFrame.swappedIdx.length > 0 ? 'bg-rose-50 text-rose-700 border-rose-200' : currentFrame.comparing.length > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {isSorted ? "Pengurutan Selesai!" : currentFrame.logMsg || "Siap dijalankan."}
                </span>
              ) : (
                <span className="text-sm font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                  {isRaceSorted ? "Komparasi Selesai!" : isPlaying ? "Mesin Komparasi Berjalan..." : "Siap dijalankan."}
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between shadow-lg text-white">
            <div className="flex items-center gap-4">
              <button onClick={handlePrevStep} disabled={isPlaying || (labMode==='single' ? currentFrameIdx<=0 : currentRaceIdx<=0)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-colors text-lg">⏮</button>
              <button onClick={handlePlayPause} disabled={labMode==='single' ? isSorted : isRaceSorted} className={`w-14 h-14 flex items-center justify-center rounded-full text-xl shadow-lg transition-transform hover:scale-105 ${isPlaying ? 'bg-amber-500 text-slate-900' : 'bg-blue-600 text-white'}`}>{isPlaying ? '⏸' : '▶'}</button>
              <button onClick={handleNextStep} disabled={isPlaying || (labMode==='single' ? isSorted||currentFrameIdx>=allFrames.length-1 : isRaceSorted||currentRaceIdx>=maxRaceFrames-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-colors text-lg">⏭</button>
              <button onClick={handleReset} className="ml-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-400 font-bold text-xs transition-colors">Reset</button>
            </div>
            <div className="hidden sm:flex items-center gap-6 pr-4 font-mono text-xs">
              <div className="flex flex-col text-right"><span className="text-slate-500">Langkah</span><span className="font-bold text-blue-400">{labMode==='single' ? currentFrame.stepNum : currentRaceIdx}</span></div>
              {labMode === 'single' && (
                <>
                  <div className="flex flex-col text-right"><span className="text-slate-500">Compare</span><span className="font-bold text-amber-400">{currentFrame.totalCompares}</span></div>
                  <div className="flex flex-col text-right"><span className="text-slate-500">Swap</span><span className="font-bold text-rose-400">{currentFrame.totalSwaps}</span></div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: TERMINAL LOG MURNI TANPA TAB ALGORITMA */}
        <div className="xl:col-span-1 bg-[#0d1117] rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-[650px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2 tracking-widest uppercase">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
              Execution Log
            </span>
            <button onClick={() => { labMode==='single'?setLogs([]):setGeneralLogs([]) }} className="text-xs text-slate-500 hover:text-white transition-colors font-mono">Clear</button>
          </div>
          
          <div className="text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-800/50 mb-3 flex justify-between items-center">
            <span>Auto-Scroll: <button onClick={()=>setAutoScroll(!autoScroll)} className={`ml-1 font-bold ${autoScroll ? 'text-blue-400' : 'text-slate-400'}`}>{autoScroll ? 'ON' : 'OFF'}</button></span>
            <span className="italic">Scroll area log untuk mematikan</span>
          </div>

          <div 
            ref={labMode === 'single' ? terminalRef : raceTerminalRef}
            onWheel={handleManualScroll} onTouchMove={handleManualScroll}
            className="flex-1 overflow-y-auto font-mono space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {labMode === 'single' ? (
              logs.map(renderLogItem)
            ) : (
              <>
                {generalLogs.map(renderLogItem)}
                {/* MENAMPILKAN SELURUH LOG GABUNGAN SECARA BERSAMAAN */}
                {Array.from({ length: currentRaceIdx + 1 }).map((_, i) => (
                  <React.Fragment key={`step-${i}`}>
                    {selectedAlgos.map(id => {
                      const f = raceFramesMap[id];
                      if (!f || i >= f.length || i === 0) return null; 
                      const frame = f[i];
                      const algoName = allAlgos.find(a => a.id === id)?.name.replace(' Sort', '') || id;
                      return (
                        <div key={`${id}-${i}`} className="flex items-start gap-2.5 leading-relaxed p-1.5 hover:bg-slate-800/30 rounded border border-transparent transition-colors mt-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 text-center min-w-[65px] ${getBadgeStyle(frame.logType)}`}>{frame.logType}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold border bg-slate-800 text-slate-300 border-slate-600 uppercase shrink-0">{algoName}</span>
                          <span className={frame.logType === 'SWAP' ? "text-rose-200 font-medium text-xs" : frame.logType === 'SORTED' ? "text-emerald-300 font-bold text-xs" : frame.logType === 'PIVOT' ? "text-purple-200 font-medium text-xs" : "text-slate-300 text-xs"}>
                            {frame.logMsg}
                          </span>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </main>

      <section className="max-w-6xl mx-auto w-full px-6 pb-16 print-area">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
            <h3 className="font-extrabold text-white flex items-center gap-2 no-print">
              <span>📋</span> Tabel Riwayat Data Penuh (Trace Table)</h3><button onClick={() => window.print()} className="no-print px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-2"><span>🖨️</span> Ekspor PDF Laporan</button><h3 className="hidden">
            </h3>
            
            {labMode === 'race' && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider hidden sm:block">Data Algoritma:</span>
                <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                  {selectedAlgos.map((id) => {
                    const algo = allAlgos.find(a => a.id === id);
                    const isActive = activeTableTab === id;
                    return (
                      <button
                        key={id} onClick={() => setActiveTableTab(id)}
                        className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                      >
                        {algo?.name.replace(' Sort', '')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-300">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10 shadow-sm">
                <tr>
                  <th className="py-3.5 px-6 font-extrabold text-slate-600 uppercase">Langkah</th>
                  <th className="py-3.5 px-6 font-extrabold text-slate-600 uppercase">Operasi</th>
                  <th className="py-3.5 px-6 font-extrabold text-slate-600 uppercase">Keterangan Aktivitas</th>
                  <th className="py-3.5 px-6 font-extrabold text-slate-600 uppercase">Isi Array (Kondisi Memori)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                {traceFrames.map((frame, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-6 font-bold text-slate-900">#{frame.stepNum}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeStyle(frame.logType).replace('bg-slate-800', 'bg-slate-100').replace('text-slate-300', 'text-slate-600')}`}>
                        {frame.logType}
                      </span>
                    </td>
                    <td className="py-3 px-6">{frame.logMsg}</td>
                    <td className="py-3 px-6 font-bold tracking-wider text-blue-700">
                      [{frame.array.join(', ')}]
                    </td>
                  </tr>
                ))}
                {traceFrames.length === 0 && (
                  <tr><td colSpan={4} className="py-12 text-center text-slate-400 italic">Belum ada riwayat data yang tercatat.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

