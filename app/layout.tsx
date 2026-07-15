import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visualisasi Algoritma Sorting - Next.js & PHP',
  description: 'Belajar algoritma sorting dengan scrollytelling dan animasi interaktif',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {/* Membungkus seluruh aplikasi dengan Lenis dari Darkroom Engineering */}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}