import React from 'react';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  isComparing?: boolean;
  isSwapped?: boolean;
  isSorted?: boolean;
}

export default function ArrayBar({
  value,
  maxValue,
  isComparing = false,
  isSwapped = false,
  isSorted = false,
}: ArrayBarProps) {
  const heightPercentage = Math.max(15, Math.round((value / maxValue) * 100));

  let barColor = 'bg-blue-600 group-hover:bg-blue-700';
  if (isSorted) {
    barColor = 'bg-emerald-500 shadow-emerald-200';
  } else if (isSwapped) {
    barColor = 'bg-rose-500 shadow-rose-200';
  } else if (isComparing) {
    barColor = 'bg-amber-400 shadow-amber-200';
  }

  return (
    <div className="flex flex-col items-center gap-2 flex-1 max-w-[40px] group">
      <span className="text-xs font-mono font-bold text-slate-800 transition-all duration-200">
        {value}
      </span>

      <div className="w-full bg-slate-200 rounded-t-lg h-64 flex items-end justify-center p-1 shadow-inner overflow-hidden">
        <div
          style={{ height: `${heightPercentage}%` }}
          className={`w-full rounded-t-md transition-all duration-200 shadow-md ${barColor}`}
        />
      </div>
    </div>
  );
}
