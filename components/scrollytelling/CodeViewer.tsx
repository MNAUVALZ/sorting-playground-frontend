'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

interface CodeViewerProps {
  snippets: CodeSnippet[];
}

export default function CodeViewer({ snippets }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl my-8">
      {/* Header IDE & Tab Bahasa */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Implementasi Kode
          </span>
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {snippets.map((snip, idx) => (
            <button
              key={snip.language}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                activeTab === idx
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {snip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area Kode & Tombol Copy */}
      <div className="relative p-6 font-mono text-sm overflow-x-auto bg-slate-950/50">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-sans transition-all border border-slate-700 shadow-md"
          title="Salin Kode"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </>
          )}
        </button>

        <pre className="text-slate-300 leading-relaxed pr-20">
          <code>{snippets[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}