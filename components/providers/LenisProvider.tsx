'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,        // Tingkat kelembutan animasi (semakin kecil = semakin mulus)
        duration: 1.5,    // Durasi perlambatan scroll dalam detik
        smoothWheel: true // Mengaktifkan efek untuk scroll mouse biasa
      }}
    >
      {children}
    </ReactLenis>
  );
}