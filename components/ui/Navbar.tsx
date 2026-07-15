"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 group">
          <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-all">
            📊
          </span>
          <span>Sort<span className="text-blue-600">Lab</span>.id</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <Link href="#katalog" className="hover:text-blue-600 transition-colors">Katalog Modul</Link>
          <Link href="/playground" className="hover:text-blue-600 transition-colors">Lab IDE Interaktif</Link>
          <a 
            href="https://github.com/MNAUVALZ" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* CTA Button Desktop */}
        <div className="hidden md:flex items-center">
          <Link
            href="/playground"
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <span>Buka Lab</span> 🚀
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <span className="text-2xl font-bold">✕</span>
          ) : (
            <span className="text-2xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg animate-fadeIn">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            🏠 Beranda
          </Link>
          <Link 
            href="#katalog" 
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            📚 Katalog Modul
          </Link>
          <Link 
            href="/playground" 
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            🛠️ Lab IDE Interaktif
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/playground"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-blue-600 text-white text-center text-sm font-semibold rounded-xl shadow-md"
            >
              Mulai Eksperimen Lab 🚀
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
