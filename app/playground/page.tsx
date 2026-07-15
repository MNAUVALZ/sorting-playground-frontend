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

export default function PlaygroundPage() {
  const [labMode, setLabMode] = useState<'single' | 'race'>('single');

  // --- STATE UMUM ---
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(3);
  const [customInput, setCustomInput] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const logCounterRef = useRef<number>(2);

  // --- STATE MODE TUNGGAL ---
  const [array, setArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50]);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [allFrames, setAllFrames] = useState<StepFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogItem[]>([
    { id: 1, time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Sistem siap. Pilih algoritma dan tekan Putar Animasi untuk memulai." }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // --- STATE MODE KOMPARASI ---
  const [raceArray, setRaceArray] = useState<number[]>([45, 12, 88, 33, 5, 67, 23, 91, 18, 50, 77, 29]);
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(['quick', 'insertion', 'selection', 'bubble']);
  const [raceFramesMap, setRaceFramesMap] = useState<Record<string, StepFrame[]>>({});
  const [currentRaceIdx, setCurrentRaceIdx] = useState<number>(0);
  const [maxRaceFrames, setMaxRaceFrames] = useState<number>(0);
  const [isRaceSorted, setIsRaceSorted] = useState<boolean>(false);
  const [activeLogTab, setActiveLogTab] = useState<string>('general');
  const [generalLogs, setGeneralLogs] = useState<LogItem[]>([
    { id: 1, time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Pilih minimal 2 algoritma yang ingin diadu, lalu tekan Putar Komparasi." }
  ]);
  const raceTerminalRef = useRef<HTMLDivElement>(null);

  const allAlgos: AlgoOption[] = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)', color: 'bg-rose-500' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)', color: 'bg-amber-500' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)', color: 'bg-blue-600' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)', color: 'bg-purple-600' },
  ];

  // SMART SCROLL: Jika user scroll manual, autoScroll otomatis dimatikan
  const handleManualScroll = () => {
    if (autoScroll) setAutoScroll(false);
  };

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
    setLogs(prev => [...prev, { id: newId, time: new Date().toLocaleTimeString('id-ID'), type, text }]);
  };

  const addGeneralLog = (type: LogItem['type'], text: string) => {
    const newId = logCounterRef.current++;
    setGeneralLogs(prev => [...prev, { id: newId, time: new Date().toLocaleTimeString('id-ID'), type, text }]);
  };

  // --- MESIN KOMPUTASI SERAGAM (UNTUK TUNGGAL & KOMPARASI) ---
  const computeAlgoFrames = (algo: string, startArr: number[]): StepFrame[] => {
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
              logMsg: `Minimum baru di indeks [${minIdx}] bernilai (${arr[minIdx]})`,
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
            logMsg: `Partisi [${low}..${high}] -> Pilih Pivot: (${pivot})`,
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

  // --- UPDATE FRAME MODE TUNGGAL ---
  useEffect(() => {
    setIsPlaying(false); setIsSorted(false); setCurrentFrameIdx(0);
    const generated = computeAlgoFrames(algorithm, initialArray);
    setAllFrames(generated); setArray([...initialArray]);
  }, [algorithm, initialArray]);

  // --- UPDATE FRAME MODE KOMPARASI ---
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

  // --- PEMUTAR OTOMATIS MODE TUNGGAL ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && labMode === 'single' && currentFrameIdx < allFrames.length) {
      const delayMs = Math.max(40, Math.round(800 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentFrameIdx + 1;
        if (nextIdx >= allFrames.length) {
          setIsPlaying(false); setIsSorted(true); setAutoScroll(false);
          addLog('SORTED', `Pengurutan selesai sempurna dalam ${allFrames.length} langkah! (Auto-scroll mati)`);
        } else {
          setCurrentFrameIdx(nextIdx);
          const frame = allFrames[nextIdx];
          setArray(frame.array);
          addLog(frame.logType, frame.logMsg);
        }
      }, delayMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIdx, allFrames, speedMultiplier, labMode]);

  // --- PEMUTAR OTOMATIS MODE KOMPARASI (SERENTAK!) ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && labMode === 'race' && currentRaceIdx < maxRaceFrames) {
      const delayMs = Math.max(50, Math.round(900 / speedMultiplier));
      timer = setTimeout(() => {
        const nextIdx = currentRaceIdx + 1;
        if (nextIdx >= maxRaceFrames) {
          setIsPlaying(false); setIsRaceSorted(true); setAutoScroll(false);
          addGeneralLog('SORTED', `Seluruh kompetisi algoritma selesai dijalankan! (Auto-scroll mati)`);
        } else {
          setCurrentRaceIdx(nextIdx);
          // Cek algoritma yang baru selesai tepat pada frame ini
          selectedAlgos.forEach(id => {
            const f = raceFramesMap[id];
            if (f && nextIdx === f.length - 1) {
              const algoName = allAlgos.find(a => a.id === id)?.name || id;
              addGeneralLog('SORTED', `[FINISH] ${algoName} menyelesaikan pengurutan (${f[f.length-1].totalSwaps} pertukaran)`);
            }
          });
        }
      }, delayMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentRaceIdx, maxRaceFrames, speedMultiplier, labMode, raceFramesMap, selectedAlgos]);

  // --- KONTROL TOMBOL TUNGGAL ---
  const handlePlayPause = () => {
    if (labMode === 'single') {
      if (isSorted) return;
      setIsPlaying(!isPlaying);
      if (!isPlaying && currentFrameIdx === 0) { setAutoScroll(true); addLog('INFO', `Memulai simulasi ${algorithm.toUpperCase()}...`); }
    } else {
      if (isRaceSorted) return;
      setIsPlaying(!isPlaying);
      if (!isPlaying && currentRaceIdx === 0) { setAutoScroll(true); addGeneralLog('INFO', `Memulai komparasi serentak...`); }
    }
  };

  const handleNextStep = () => {
    if (isPlaying) return;
    if (labMode === 'single') {
      if (isSorted || currentFrameIdx >= allFrames.length - 1) return;
      const nextIdx = currentFrameIdx + 1;
      setCurrentFrameIdx(nextIdx); setArray(allFrames[nextIdx].array);
      addLog(allFrames[nextIdx].logType, `[STEP] ${allFrames[nextIdx].logMsg}`);
      if (nextIdx === allFrames.length - 1) { setIsSorted(true); addLog('SORTED', "Pengurutan selesai."); }
    } else {
      if (isRaceSorted || currentRaceIdx >= maxRaceFrames - 1) return;
      const nextIdx = currentRaceIdx + 1;
      setCurrentRaceIdx(nextIdx);
      addGeneralLog('INFO', `[STEP FORWARD] Maju ke langkah serentak #${nextIdx}`);
      if (nextIdx === maxRaceFrames - 1) { setIsRaceSorted(true); addGeneralLog('SORTED', "Seluruh komparasi selesai."); }
    }
  };

  const handlePrevStep = () => {
    if (isPlaying) return;
    if (labMode === 'single') {
      if (currentFrameIdx <= 0) return;
      setIsSorted(false);
      const prevIdx = currentFrameIdx - 1;
      setCurrentFrameIdx(prevIdx); setArray(allFrames[prevIdx].array);
      addLog('INFO', `[PREV] Kembali ke langkah #${allFrames[prevIdx].stepNum}`);
    } else {
      if (currentRaceIdx <= 0) return;
      setIsRaceSorted(false);
      const prevIdx = currentRaceIdx - 1;
      setCurrentRaceIdx(prevIdx);
      addGeneralLog('INFO', `[STEP BACKWARD] Kembali ke langkah serentak #${prevIdx}`);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (labMode === 'single') {
      setIsSorted(false); setCurrentFrameIdx(0); setArray([...initialArray]); setAutoScroll(true);
      addLog('INFO', "Simulasi direset ke array awal.");
    } else {
      setIsRaceSorted(false); setCurrentRaceIdx(0); setAutoScroll(true);
      addGeneralLog('INFO', "Komparasi direset ke awal.");
    }
  };

  const generateRandom = () => {
    if (isPlaying) return;
    if (labMode === 'single') {
      const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 95) + 5);
      setInitialArray(newArr); addLog('INFO', `Array baru diacak: [${newArr.join(', ')}]`);
    } else {
      const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 95) + 5);
      setRaceArray(newArr); addGeneralLog('INFO', `Deret komparasi baru diacak: [${newArr.join(', ')}]`);
    }
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlaying) return;
    const parsed = customInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0 && n <= 500);
    if (parsed.length < 3) { alert("Minimal 3 angka valid berpemisah koma."); return; }
    if (labMode === 'single') {
      setInitialArray(parsed); setCustomInput(""); addLog('INFO', `Deret custom diset: [${parsed.join(', ')}]`);
    } else {
      setRaceArray(parsed); setCustomInput(""); addGeneralLog('INFO', `Deret komparasi custom diset: [${parsed.join(', ')}]`);
    }
  };

  const toggleAlgoSelection = (id: string) => {
    if (isPlaying) return;
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length <= 2) { alert("Pilih minimal 2 algoritma untuk dibandingkan."); return; }
      setSelectedAlgos(selectedAlgos.filter(item => item !== id));
    } else { setSelectedAlgos([...selectedAlgos, id]); }
  };

  const currentFrame = allFrames[currentFrameIdx] || { comparing: [], swappedIdx: [], totalCompares: 0, totalSwaps: 0, stepNum: 0 };
  const maxVal = Math.max(...array, 100);
  const maxRaceVal = Math.max(...raceArray, 100);

  // Hasil Klasemen Komparasi
  const raceLeaderboard = selectedAlgos.map(id => {
    const f = raceFramesMap[id] || [];
    const lastF = f[f.length - 1] || { totalCompares: 0, totalSwaps: 0 };
    const algoObj = allAlgos.find(a => a.id === id)!;
    return { id, name: algoObj.name, complexity: algoObj.complexity, steps: f.length, compares: lastF.totalCompares, swaps: lastF.totalSwaps };
  }).sort((a, b) => (a.swaps + a.steps) - (b.swaps + b.steps));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* TAB SWITCHER SIMULATOR */}
      <div className="bg-slate-900 text-white py-3.5 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-extrabold text-sm tracking-wide text-slate-200">
            PILIH MODE SIMULATOR:
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => { setLabMode('single'); setIsPlaying(false); setAutoScroll(true); }}
              className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                labMode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mode Visualisasi Tunggal
            </button>
            <button
              onClick={() => { setLabMode('race'); setIsPlaying(false); setAutoScroll(true); }}
              className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                labMode === 'race' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mode Komparasi Serentak
            </button>
          </div>
        </div>
      </div>

      {/* TOOLBAR KONTROL UMUM (BERLAKU UNTUK TUNGGAL & KOMPARASI) */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Bagian Kiri: Tombol Algoritma di Mode Tunggal atau Filter di Mode Komparasi */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-2">Algoritma:</span>
            {labMode === 'single' ? (
              allAlgos.map((algo) => {
                const isActive = algorithm === algo.id;
                return (
                  <button
                    key={algo.id} onClick={() => setAlgorithm(algo.id)} disabled={isPlaying}
                    className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                      isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {algo.name}
                  </button>
                );
              })
            ) : (
              allAlgos.map((algo) => {
                const isChecked = selectedAlgos.includes(algo.id);
                return (
                  <button
                    key={algo.id} onClick={() => toggleAlgoSelection(algo.id)} disabled={isPlaying}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-all border flex items-center gap-1.5 ${
                      isChecked ? 'bg-blue-50 text-blue-700 border-blue-300 font-extrabold' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isChecked ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                    <span>{algo.name}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Bagian Kanan: Speed & Acak */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-slate-500">Tempo:</span>
              <input
                type="range" min="1" max="10" step="1" value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                className="w-20 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-extrabold text-blue-600 w-8 text-right">{speedMultiplier}x</span>
            </div>

            <button
              onClick={generateRandom} disabled={isPlaying}
              className="px-4 py-1.5 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Acak Baru
            </button>
          </div>
        </div>

        {/* Panel Tombol Pemutar Animasi (LENGKAP DI KEDUA MODE!) */}
        <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep} disabled={isPlaying || (labMode === 'single' ? currentFrameIdx <= 0 : currentRaceIdx <= 0)}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 transition-all"
            >
              Sebelumnya
            </button>

            <button
              onClick={handlePlayPause} disabled={labMode === 'single' ? isSorted : isRaceSorted}
              className={`px-6 py-2 font-extrabold text-xs rounded-xl shadow-md transition-all ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50`}
            >
              {isPlaying ? 'Jeda Animasi' : 'Putar Animasi'}
            </button>

            <button
              onClick={handleNextStep} disabled={isPlaying || (labMode === 'single' ? isSorted || currentFrameIdx >= allFrames.length - 1 : isRaceSorted || currentRaceIdx >= maxRaceFrames - 1)}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-sm disabled:opacity-40 transition-all"
            >
              Selanjutnya
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl ml-2"
            >
              Reset
            </button>
          </div>

          <form onSubmit={handleApplyCustom} className="flex items-center gap-2">
            <input
              type="text" placeholder="Uji deret custom: 15, 3, 88, 12" value={customInput}
              onChange={(e) => setCustomInput(e.target.value)} disabled={isPlaying}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono w-48 sm:w-60 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <button type="submit" disabled={isPlaying || !customInput.trim()} className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs disabled:opacity-40 shadow-sm whitespace-nowrap">
              Set Data
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RUANG KERJA MODE 1: VISUALISASI TUNGGAL */}
      {/* ========================================================================= */}
      {labMode === 'single' && (
        <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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

          {/* Terminal Log Tunggal Tinggi 610px & Bisa Di-scroll Bebas di Layar! */}
          <div 
            onWheel={handleManualScroll} onTouchMove={handleManualScroll}
            className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col h-[610px]"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                RIWAYAT LOG EKSEKUSI
              </span>
              <button onClick={() => setLogs([{ id: Date.now(), time: new Date().toLocaleTimeString('id-ID'), type: 'INFO', text: "Log dibersihkan." }])} className="text-xs text-slate-400 hover:text-white underline font-mono">
                Clear
              </button>
            </div>
            
            <div className="text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800/60 mb-2 flex justify-between items-center">
              <span>Total: <strong className="text-white">{logs.length}</strong> baris</span>
              <button onClick={() => setAutoScroll(!autoScroll)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${autoScroll ? 'bg-blue-900/60 text-blue-300 border border-blue-600' : 'bg-slate-800 text-slate-400'}`}>
                Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
              </button>
            </div>

            <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {logs.map((log) => {
                let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
                let label = "INFO";
                if (log.type === 'PIVOT') { badgeColor = "bg-purple-900/60 text-purple-300 border-purple-700"; label = "PIVOT"; }
                else if (log.type === 'COMPARE') { badgeColor = "bg-amber-900/60 text-amber-300 border-amber-700"; label = "COMPARE"; }
                else if (log.type === 'SWAP') { badgeColor = "bg-rose-900/60 text-rose-300 border-rose-700 font-bold"; label = "SWAP"; }
                else if (log.type === 'SORTED') { badgeColor = "bg-emerald-900/60 text-emerald-300 border-emerald-700 font-bold"; label = "SORTED"; }
                else if (log.type === 'ERROR') { badgeColor = "bg-red-950 text-red-400 border-red-800 font-bold"; label = "ERROR"; }

                return (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed bg-slate-950/50 p-2 rounded-lg border border-slate-800/60 hover:border-slate-700 transition-colors">
                    <span className="text-slate-500 shrink-0 text-[11px]">[{log.time}]</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 text-center min-w-[65px] ${badgeColor}`}>
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
      )}

      {/* ========================================================================= */}
      {/* RUANG KERJA MODE 2: KOMPARASI SERENTAK (SIDE-BY-SIDE DENGAN LOG SERAGAM!) */}
      {/* ========================================================================= */}
      {labMode === 'race' && (
        <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fadeIn">
          {/* KOLOM KIRI: Racing Grid Arena */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedAlgos.map((id) => {
                const algoObj = allAlgos.find(a => a.id === id)!;
                const frames = raceFramesMap[id] || [];
                const safeIdx = Math.min(currentRaceIdx, Math.max(0, frames.length - 1));
                const activeFrame = frames[safeIdx] || { array: raceArray, totalSwaps: 0 };
                const isTrackDone = isRaceSorted || (frames.length > 0 && currentRaceIdx >= frames.length - 1);

                return (
                  <div key={id} className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-52">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isTrackDone ? 'bg-emerald-500' : 'bg-blue-600 animate-pulse'}`}></span>
                        {algoObj.name}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isTrackDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {isTrackDone ? `Selesai (${activeFrame.totalSwaps} swap)` : `Langkah #${safeIdx}`}
                      </span>
                    </div>

                    <div className="flex items-end justify-center gap-1 flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 overflow-hidden">
                      {activeFrame.array.map((val, idx) => {
                        const heightPct = Math.max(15, Math.round((val / maxRaceVal) * 100));
                        return <div key={idx} style={{ height: `${heightPct}%` }} className={`flex-1 rounded-t transition-all duration-200 ${isTrackDone ? 'bg-emerald-500 shadow-sm' : algoObj.color}`} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tabel Klasemen Akhir */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-4">Klasemen Efisiensi Pengurutan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase">
                      <th className="py-3 px-4">Peringkat & Algoritma</th>
                      <th className="py-3 px-4">Kompleksitas</th>
                      <th className="py-3 px-4">Total Langkah</th>
                      <th className="py-3 px-4">Pertukaran (Swap)</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {raceLeaderboard.map((res, index) => (
                      <tr key={res.id} className={index === 0 ? "bg-blue-50/40" : ""}>
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${index === 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{index + 1}</span>
                          {res.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">{res.complexity}</td>
                        <td className="py-3 px-4 font-mono">{res.steps}</td>
                        <td className="py-3 px-4 font-mono text-rose-600 font-bold">{res.swaps} kali</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${index === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                            {index === 0 ? 'Terbaik' : 'Standar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Terminal Log Komparasi Seragam dengan Mode Tunggal! */}
          <div 
            onWheel={handleManualScroll} onTouchMove={handleManualScroll}
            className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col h-[610px]"
          >
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                LOG KOMPARASI SERENTAK
              </span>
              <div className="flex flex-wrap gap-1">
                <button onClick={() => setActiveLogTab('general')} className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${activeLogTab === 'general' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  Umum
                </button>
                {selectedAlgos.map((id) => {
                  const algoObj = allAlgos.find(a => a.id === id);
                  return (
                    <button key={id} onClick={() => setActiveLogTab(id)} className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${activeLogTab === id ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'}`}>
                      {algoObj?.name.replace(' Sort', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800/60 mb-2 flex justify-between items-center">
              <span>Filter: <strong className="text-white uppercase">{activeLogTab}</strong></span>
              <button onClick={() => setAutoScroll(!autoScroll)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${autoScroll ? 'bg-blue-900/60 text-blue-300 border border-blue-600' : 'bg-slate-800 text-slate-400'}`}>
                Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
              </button>
            </div>

            <div ref={raceTerminalRef} className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {activeLogTab === 'general' ? (
                generalLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-slate-500 shrink-0 text-[11px]">[{log.time}]</span>
                    <span className="text-slate-300 text-xs">{log.text}</span>
                  </div>
                ))
              ) : (
                (raceFramesMap[activeLogTab] || []).slice(0, currentRaceIdx + 1).map((f, idx) => {
                  let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
                  let label = "INFO";
                  if (f.logType === 'PIVOT') { badgeColor = "bg-purple-900/60 text-purple-300 border-purple-700"; label = "PIVOT"; }
                  else if (f.logType === 'COMPARE') { badgeColor = "bg-amber-900/60 text-amber-300 border-amber-700"; label = "COMPARE"; }
                  else if (f.logType === 'SWAP') { badgeColor = "bg-rose-900/60 text-rose-300 border-rose-700 font-bold"; label = "SWAP"; }

                  return (
                    <div key={idx} className="flex items-start gap-2 leading-relaxed bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                      <span className="text-slate-500 shrink-0 text-[11px]">#{idx+1}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 text-center min-w-[65px] ${badgeColor}`}>
                        {label}
                      </span>
                      <span className={f.logType === 'SWAP' ? "text-rose-200 font-semibold text-xs" : "text-slate-300 text-xs"}>
                        {f.logMsg}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
