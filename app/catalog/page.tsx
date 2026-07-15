"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AlgorithmCard from '@/components/ui/AlgorithmCard';

export default function CatalogPage() {
  const [nValue, setNValue] = useState<number>(50);

  const algorithms = [
    { title: "Bubble Sort", description: "Langkah pertama memahami algoritma. Sangat sederhana karena hanya menukar elemen yang bersebelahan secara berulang hingga nilai terbesar mengapung ke ujung layaknya gelembung.", complexity: "O(n²)", difficulty: "Pemula", slug: "bubble-sort", stepsCount: "5 - 10 Langkah", journalRef: "" },
    { title: "Selection Sort", description: "Memperbaiki kelemahan Bubble Sort dengan mengurangi operasi penukaran. Algoritma ini mencari nilai terkecil dari sisa data, lalu menempatkannya ke depan. Sangat hemat Write memori.", complexity: "O(n²)", difficulty: "Pemula", slug: "selection-sort", stepsCount: "7 - 12 Langkah", journalRef: "" },
    { title: "Insertion Sort", description: "Sangat natural, meniru cara manusia menyusun kartu remi. Algoritma ini mengambil elemen baru dan menyisipkannya tepat di posisi yang benar di antara elemen yang sudah terurut.", complexity: "O(n²)", difficulty: "Menengah", slug: "insertion-sort", stepsCount: "6 - 15 Langkah", journalRef: "" },
    { title: "Quick Sort", description: "Algoritma kelas industri yang memecah array memanjang menjadi bagian kecil menggunakan teknik Pivot. Ini adalah algoritma pengurutan tercepat dan paling sering digunakan di dunia nyata.", complexity: "O(n log n)", difficulty: "Lanjutan", slug: "quick-sort", stepsCount: "10 - 25 Langkah", journalRef: "" },
  ];

  // Logika Grafik Big-O SVG
  const maxN = 100; const maxY = maxN * maxN; const svgWidth = 1000; const svgHeight = 500;
  const mapX = (n: number) => (n / maxN) * svgWidth;
  const mapY = (val: number) => svgHeight - ((val / maxY) * svgHeight);
  const n2Points = Array.from({length: maxN + 1}, (_, i) => `${mapX(i)},${mapY(i * i)}`).join(' ');
  const nLognPoints = Array.from({length: maxN + 1}, (_, i) => { const val = i === 0 ? 0 : i * Math.log2(i); return `${mapX(i)},${mapY(val)}`; }).join(' ');
  const currentN2 = nValue * nValue;
  const currentNLogn = nValue === 0 ? 0 : Math.round(nValue * Math.log2(nValue));
  const cursorX = mapX(nValue);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full">
        {/* SECTION 1: DAFTAR MODUL */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Silabus Pembelajaran
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-4 bg-white p-4 rounded-r-xl shadow-sm">
              Modul di bawah ini disusun berurutan dari konsep komparasi paling dasar hingga teknik partisi tingkat lanjut. Disarankan untuk membacanya secara berurutan mulai dari Modul 01. 
              <strong> Setiap modul dilengkapi dengan Kuis Evaluasi untuk menguji pemahaman Anda sebelum menggunakan Simulator.</strong>
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {algorithms.map((algo, index) => (
              <AlgorithmCard key={algo.slug} index={index + 1} {...algo} />
            ))}
          </div>
        </section>

        {/* SECTION 2: GRAFIK BIG-O VISUALIZER DI BAWAH MODUL */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Grafik Big-O Time Complexity</h2>
            <p className="text-slate-600">Perhatikan perbedaan performa antara algoritma O(n²) melawan O(n log n) saat memproses data dalam jumlah besar.</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2">
                <label className="flex justify-between items-end mb-4">
                  <span className="font-extrabold text-slate-900 text-lg">Jumlah Data (N)</span>
                  <span className="font-mono text-3xl font-extrabold text-blue-600 bg-blue-50 px-4 py-1 rounded-xl border border-blue-200">{nValue}</span>
                </label>
                <input type="range" min="1" max="100" step="1" value={nValue} onChange={(e) => setNValue(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                  <span className="text-[11px] font-bold text-rose-700 uppercase mb-1 block">Skala O(n²)</span>
                  <div className="font-mono text-2xl font-extrabold text-rose-600">{currentN2.toLocaleString()}</div>
                  <span className="text-xs text-rose-700 mt-1 block">Beban Operasi</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <span className="text-[11px] font-bold text-blue-700 uppercase mb-1 block">Skala O(n log n)</span>
                  <div className="font-mono text-2xl font-extrabold text-blue-600">{currentNLogn.toLocaleString()}</div>
                  <span className="text-xs text-blue-700 mt-1 block">Beban Operasi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
            <h3 className="text-white font-extrabold mb-6 flex items-center gap-2"><span>📈</span> Kurva Simulasi SVG</h3>
            <div className="absolute left-6 top-[80px] bottom-[40px] w-12 flex flex-col justify-between text-[10px] font-mono text-slate-500 pb-6 pointer-events-none">
              <span>10k op</span><span>7.5k</span><span>5k op</span><span>2.5k</span><span>0</span>
            </div>

            <div className="w-full aspect-[2/1] relative ml-8">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                {[0, 0.25, 0.5, 0.75, 1].map(ratio => (<line key={ratio} x1="0" y1={svgHeight * ratio} x2={svgWidth} y2={svgHeight * ratio} stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />))}
                {[0, 0.25, 0.5, 0.75, 1].map(ratio => (<line key={ratio} x1={svgWidth * ratio} y1="0" x2={svgWidth * ratio} y2={svgHeight} stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />))}

                <polyline points={n2Points} fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinejoin="round" />
                <polyline points={nLognPoints} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinejoin="round" />
                
                <line x1={cursorX} y1="0" x2={cursorX} y2={svgHeight} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx={cursorX} cy={mapY(currentN2)} r="6" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
                <circle cx={cursorX} cy={mapY(currentNLogn)} r="6" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
