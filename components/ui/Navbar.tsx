"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Modul Pembelajaran', href: '/catalog' },
    { name: 'Simulator', href: '/playground' },
    { name: '🧰 Toolkit Akademis', href: '/toolkit' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all no-print">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl text-slate-900 group">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
            SL
          </span>
          <span className="tracking-tight hidden sm:block">Sort<span className="text-blue-600">Lab</span>.id</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} href={link.href} 
                className={`transition-colors py-1 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* TOMBOL SAKELAR DARK/LIGHT MODE */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all shadow-sm border border-slate-200"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100"
          >
            <span className="text-xl font-bold">{isOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
