'use client';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export default function ArrayBar({ value, maxValue, state }: ArrayBarProps) {
  // Hitung persentase tinggi balok berdasarkan nilai maksimum di dalam array
  const heightPercentage = Math.max((value / maxValue) * 100, 8); // Minimal 8% agar angka kecil tetap terlihat

  // Tentukan warna balok berdasarkan status animasi saat ini
  const getBarColor = () => {
    switch (state) {
      case 'comparing':
        return 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]'; // Kuning menyala
      case 'swapping':
        return 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]';   // Merah menyala
      case 'sorted':
        return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'; // Hijau
      default:
        return 'bg-blue-600 hover:bg-blue-500';                       // Biru standar
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
      {/* Label Angka di Atas Balok */}
      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
        {value}
      </span>

      {/* Balok Animasi */}
      <div
        style={{ height: `${heightPercentage}%` }}
        className={`w-full max-w-10 rounded-t-lg transition-all duration-200 ease-in-out ${getBarColor()}`}
      />
    </div>
  );
}