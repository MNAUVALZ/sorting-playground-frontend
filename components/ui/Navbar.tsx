"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Katalog Modul', href: '/catalog' },
    { name: 'Lab IDE Interaktif', href: '/playground' },
    { name: '⚖️ Perbandingan Algoritma', href: '/comparison' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 group">
          <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-all">
            📊
          </span>
          <span>Sort<span className="text-blue-600">Lab</span>.id</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors py-1 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button Desktop */}
        <div className="hidden md:flex items-center">
          <Link
            href="/playground"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
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
          <span className="text-2xl font-bold">{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/playground"
              onClick={() => setIsOpen(false)}
              className="block w-full py-2.5 bg-blue-600 text-white text-center text-sm font-semibold rounded-xl shadow-md"
            >
              Mulai Eksperimen Lab 🚀
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
