'use client';

import { useState, useEffect } from 'react';
import ArrayBar from '@/components/visualizer/ArrayBar';
import Link from 'next/link';
import { Play, RotateCcw, Shuffle, ArrowLeft, Zap, Loader2 } from 'lucide-react';

type BarState = 'default' | 'comparing' | 'swapping' | 'sorted';

interface Step {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  explanation: string;
}

export default function PlaygroundPage() {
  const [array, setArray] = useState<number[]>([15, 8, 25, 12, 5, 20, 10, 18]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [explanation, setExplanation] = useState<string>('Tekan tombol Mulai untuk mengambil kalkulasi dari server Laravel API.');

  const maxValue = Math.max(...array, 1);

  // Fungsi menghasilkan array acak baru
  const generateRandomArray = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 45) + 5);
    setArray(newArr);
    setSteps([]);
    setExplanation('Array baru berhasil diacak! Pilih algoritma dan tekan Mulai.');
  };

  // Fungsi menembak ke Backend Laravel API (127.0.0.1:8000)
  const fetchStepsFromLaravel = async () => {
    setIsLoading(true);
    setExplanation('Menghubungi server Laravel API (127.0.0.1:8000)...');
    try {
      const response = await fetch('sorting-playground-backend-production.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          algorithm: algorithm,
          array: array,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.steps && data.steps.length > 0) {
        setSteps(data.steps);
        setCurrentStep(0);
        setArray(data.steps[0].array);
        setIsPlaying(true);
        setExplanation(`Kalkulasi sukses! Menerima ${data.total_steps} langkah dari backend Laravel.`);
      }
    } catch (error) {
      console.error('API Fetch Error:', error);
      setExplanation('Gagal terhubung! Pastikan server Laravel `php artisan serve` sedang aktif di port 8000.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Memulai, mengambil data dari API, atau melanjut/jeda animasi
  const handleStart = () => {
    if (steps.length === 0 || currentStep >= steps.length - 1) {
      fetchStepsFromLaravel();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Loop pewaktu animasi
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setArray(steps[currentStep + 1].array);
        setExplanation(steps[currentStep + 1].explanation);
      }, 400); // Kecepatan animasi 400 milidetik per langkah
    } else if (currentStep >= steps.length - 1 && steps.length > 0) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, steps]);

  const getBarState = (index: number): BarState => {
    if (steps.length === 0) return 'default';
    const step = steps[currentStep];
    if (!step) return 'default';
    if (step.sorted.includes(index)) return 'sorted';
    if (step.swapping.includes(index)) return 'swapping';
    if (step.comparing.includes(index)) return 'comparing';
    return 'default';
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 flex flex-col justify-between">
      <header className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Interactive Sorting Playground</span>
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            </h1>
            <p className="text-sm text-slate-400">Terhubung secara Real-Time dengan Backend Laravel API</p>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-sm">
          {['bubble', 'selection', 'insertion', 'quick'].map((algo) => (
            <button
              key={algo}
              disabled={isLoading}
              onClick={() => { setAlgorithm(algo); setSteps([]); setIsPlaying(false); }}
              className={`px-4 py-2 rounded-lg capitalize font-medium transition-all ${
                algorithm === algo ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {algo} sort
            </button>
          ))}
        </div>
      </header>

      <section className="flex-1 max-w-5xl mx-auto w-full bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-12 flex flex-col justify-between min-h-100 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div className="bg-slate-900/90 border border-slate-800 px-6 py-4 rounded-2xl mb-8 max-w-xl mx-auto text-center shadow-lg">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-1">
            Status Animasi {steps.length > 0 ? `(Langkah ${currentStep + 1} / ${steps.length})` : ''}
          </span>
          <p className="text-base sm:text-lg font-medium text-slate-200 min-h-7 flex items-center justify-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
            <span>{explanation}</span>
          </p>
        </div>

        <div className="flex items-end justify-center gap-2 sm:gap-4 h-65 w-full px-4 pt-8">
          {array.map((val, idx) => (
            <ArrayBar key={idx} value={val} maxValue={maxValue} state={getBarState(idx)} />
          ))}
        </div>
      </section>

      <footer className="max-w-xl mx-auto w-full mt-8 bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
        <button
          onClick={generateRandomArray}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700 disabled:opacity-50"
        >
          <Shuffle className="w-4 h-4 text-blue-400" />
          <span>Acak Angka</span>
        </button>

        <button
          onClick={handleStart}
          disabled={isLoading}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg disabled:opacity-50 ${
            isPlaying 
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mengambil Data API...</span>
            </>
          ) : (
            <>
              <Play className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span>{isPlaying ? 'Jeda Animasi (Pause)' : 'Mulai Visualisasi (Play)'}</span>
            </>
          )}
        </button>

        <button
          onClick={() => { setIsPlaying(false); setCurrentStep(0); if (steps.length > 0) setArray(steps[0].array); }}
          disabled={isLoading}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 disabled:opacity-50"
          title="Reset ke Awal"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </footer>
    </main>
  );
}