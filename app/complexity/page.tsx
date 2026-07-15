"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ComplexityPage() {
  const [nValue, setNValue] = useState<number>(50);

  // Konstanta Skala SVG
  const maxN = 100;
  const maxY = maxN * maxN; // 10000
  const svgWidth = 1000;
  const svgHeight = 500;

  // Pemetaan nilai matematis ke koordinat kanvas SVG
  const mapX = (n: number) => (n / maxN) * svgWidth;
  const mapY = (val: number) => svgHeight - ((val / maxY) * svgHeight);

  // Hitung Titik Koordinat Garis
  const n2Points = Array.from({length: maxN + 1}, (_, i) => `${mapX(i)},${mapY(i * i)}`).join(' ');
  const nLognPoints = Array.from({length: maxN + 1}, (_, i) => {
    const val = i === 0 ? 0 : i * Math.log2(i);
    return `${mapX(i)},${mapY(val)}`;
  }).join(' ');
  const nPoints = Array.from({length: maxN + 1}, (_, i) => `${mapX(i)},${mapY(i)}`).join(' ');

  // Perhitungan Data Real-Time
  const currentN2 = nValue * nValue;
  const currentNLogn = nValue === 0 ? 0 : Math.round(nValue * Math.log2(nValue));

  // Posisi kursor pada SVG
  const cursorX = mapX(nValue);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 md:py-16 w-full animate-fadeIn">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Matematika Ilmu Komputer
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Visualizer Big-O Time Complexity
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Perhatikan bagaimana perbedaan efisiensi algoritma menjadi sangat ekstrem ketika menangani jumlah data (N) yang terus membesar.
          </p>
        </div>

        {/* Panel Kontrol Interaktif */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <label className="flex justify-between items-end mb-4">
                <span className="font-extrabold text-slate-900 text-lg">Jumlah Data (N)</span>
                <span className="font-mono text-3xl font-extrabold text-blue-600 bg-blue-50 px-4 py-1 rounded-xl border border-blue-200">
                  {nValue}
                </span>
              </label>
              <input
                type="range" min="1" max="100" step="1" value={nValue}
                onChange={(e) => setNValue(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-slate-500 mt-3">Geser slider di atas untuk melihat lonjakan beban operasi komputasi.</p>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Skala Kuadratik O(n²)</span>
                <span className="text-[10px] text-rose-600 block mb-2 font-medium">Bubble, Selection, Insertion</span>
                <div className="font-mono text-3xl font-extrabold text-rose-600">
                  {currentN2.toLocaleString()}
                </div>
                <span className="text-xs text-rose-700 mt-1 block">Operasi Eksekusi</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Skala Logaritmik O(n log n)</span>
                <span className="text-[10px] text-blue-600 block mb-2 font-medium">Quick Sort Teroptimasi</span>
                <div className="font-mono text-3xl font-extrabold text-blue-600">
                  {currentNLogn.toLocaleString()}
                </div>
                <span className="text-xs text-blue-700 mt-1 block">Operasi Eksekusi</span>
              </div>
            </div>
          </div>
        </div>

        {/* GRAFIK SVG CUSTOM MURNI */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
          <h3 className="text-white font-extrabold mb-6 flex items-center gap-2">
            <span>📈</span> Kurva Pertumbuhan Waktu Eksekusi
          </h3>
          
          {/* Label Y-Axis */}
          <div className="absolute left-6 top-[80px] bottom-[40px] w-12 flex flex-col justify-between text-[10px] font-mono text-slate-500 pb-6 pointer-events-none">
            <span>10k op</span>
            <span>7.5k</span>
            <span>5k op</span>
            <span>2.5k</span>
            <span>0</span>
          </div>

          <div className="w-full aspect-[2/1] relative ml-8">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              {/* Garis Latar Grid Horizontal */}
              {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
                <line key={ratio} x1="0" y1={svgHeight * ratio} x2={svgWidth} y2={svgHeight * ratio} stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />
              ))}
              
              {/* Garis Latar Grid Vertikal */}
              {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
                <line key={ratio} x1={svgWidth * ratio} y1="0" x2={svgWidth * ratio} y2={svgHeight} stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />
              ))}

              {/* Garis Kurva Algoritma */}
              <polyline points={n2Points} fill="none" stroke="#f43f5e" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" strokeLinejoin="round" />
              <polyline points={nLognPoints} fill="none" stroke="#3b82f6" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" strokeLinejoin="round" />
              
              {/* Garis Panduan Interaktif Kursor */}
              <line x1={cursorX} y1="0" x2={cursorX} y2={svgHeight} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Titik Point Data Saat Ini O(n^2) */}
              <circle cx={cursorX} cy={mapY(currentN2)} r="6" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
              {/* Titik Point Data Saat Ini O(n log n) */}
              <circle cx={cursorX} cy={mapY(currentNLogn)} r="6" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />

              {/* Tooltip pada Kanvas */}
              {nValue > 5 && (
                <>
                  <rect x={cursorX > 800 ? cursorX - 160 : cursorX + 15} y={Math.max(mapY(currentN2) - 40, 0)} width="135" height="40" rx="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x={cursorX > 800 ? cursorX - 150 : cursorX + 25} y={Math.max(mapY(currentN2) - 15, 25)} fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    O(n²): {currentN2}
                  </text>
                  
                  <rect x={cursorX > 800 ? cursorX - 160 : cursorX + 15} y={Math.max(mapY(currentNLogn) - 40, 30)} width="150" height="40" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x={cursorX > 800 ? cursorX - 150 : cursorX + 25} y={Math.max(mapY(currentNLogn) - 15, 55)} fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    O(n log n): {currentNLogn}
                  </text>
                </>
              )}
            </svg>
          </div>
          
          {/* Label X-Axis */}
          <div className="absolute left-[56px] right-6 bottom-4 flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800">
            <span>N=0</span>
            <span>N=25</span>
            <span>N=50</span>
            <span>N=75</span>
            <span>N=100</span>
          </div>
        </div>

        {/* Rangkuman Teoritis */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-900 leading-relaxed shadow-sm">
          <strong className="font-extrabold block mb-2">💡 Mengapa Big-O sangat krusial?</strong>
          <p>
            Seperti yang terlihat pada kurva di atas, saat data masih sedikit (N &lt; 20), performa <strong>Bubble Sort O(n²)</strong> dan <strong>Quick Sort O(n log n)</strong> terlihat hampir setara. 
            Namun, ketika jumlah data menyentuh N = 100, jaraknya menjadi sangat ekstrem. Bubble Sort membutuhkan hingga <strong>10.000 putaran eksekusi</strong>, 
            sementara Quick Sort bisa menyelesaikannya hanya dalam <strong>± 664 langkah</strong>. Inilah alasan industri software skala besar tidak pernah menggunakan algoritma kuadratik.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
