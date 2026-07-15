import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-white border-b border-dicoding-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Kolom Kiri: Copywriting */}
        <div className="flex-1 space-y-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-dicoding-blue rounded-full text-sm font-semibold tracking-wide">
            🎓 Platform Belajar Struktur Data Interaktif
          </span>
          <h1 className="text-5xl font-extrabold text-dicoding-navy leading-tight">
            Kuasai Algoritma Pengurutan Tanpa Pusing Membaca Kode Buta.
          </h1>
          <p className="text-lg text-dicoding-text-light max-w-lg">
            Visualisasikan langkah demi langkah perbandingan elemen, pahami kompleksitas waktu, dan uji deret angka Anda sendiri secara real-time.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/playground" 
              className="px-6 py-3 bg-dicoding-blue text-white rounded-lg font-semibold hover:bg-dicoding-blue-hover transition-all shadow-dicoding"
            >
              Mulai Visualisasi Sekarang
            </Link>
            <Link 
              href="#katalog" 
              className="px-6 py-3 border border-dicoding-border text-dicoding-navy rounded-lg font-semibold hover:bg-dicoding-bg transition-all"
            >
              Lihat Katalog Algoritma
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Ilustrasi Visual */}
        <div className="flex-1 w-full h-64 md:h-96 bg-dicoding-bg rounded-2xl border border-dicoding-border flex items-center justify-center p-8 shadow-inner">
          <div className="text-center text-dicoding-text-light italic">
            [ Area Ilustrasi Visualisasi ]
          </div>
        </div>
      </div>
    </section>
  );
}
