'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animasi GSAP: Elemen muncul dari bawah (y: 50) ke posisi asli (y: 0) dengan opacity perlahan
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descRef.current, btnRef.current], {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2, // Muncul berurutan dengan jeda 0.2 detik
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert(); // Membersihkan memori saat komponen ditutup
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Efek Cahaya Latar Belakang (Glow Effect) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md text-sm text-blue-400 mb-6">
        <Sparkles className="w-4 h-4" />
        <span>Interactive Algorithm Scrollytelling</span>
      </div>

      <h1 
        ref={titleRef} 
        className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6"
      >
        Memahami Cara Kerja <span className="text-blue-500 underline decoration-blue-500/30">Sorting</span> Secara Visual.
      </h1>

      <p 
        ref={descRef} 
        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
      >
        Jelajahi algoritma pengurutan data melalui animasi interaktif, komparasi real-time, dan simulasi step-by-step yang mudah dipahami.
      </p>

      <div ref={btnRef} className="flex flex-col sm:flex-row gap-4">
        <a 
          href="#katalog" 
          className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          <span>Pilih Algoritma</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <Link 
          href="/playground" 
          className="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold transition-all flex items-center justify-center"
        >
          Coba Simulator Real-Time
        </Link>
      </div>
    </section>
  );
}