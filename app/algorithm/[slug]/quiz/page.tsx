"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { notFound } from 'next/navigation';

const quizDatabase: Record<string, any> = {
  'bubble-sort': {
    title: "Bubble Sort",
    questions: [
      { q: "Kapan Bubble Sort bisa mencapai kecepatan maksimalnya yaitu O(n)?", opts: ["Saat array terbalik secara total", "Saat array sudah terurut sejak awal", "Saat menggunakan pivot", "Saat elemen bernilai negatif"], ans: 1, exp: "Jika dioptimasi dengan variabel 'swapped', Bubble Sort hanya butuh satu putaran untuk menyadari array sudah terurut dan langsung berhenti." },
      { q: "Mengapa Bubble Sort sering dianggap tidak efisien untuk hardware modern?", opts: ["Sulit diimplementasikan", "Tidak stabil (Unstable)", "Melakukan terlalu banyak pertukaran (swap) di memori", "Membutuhkan RAM tambahan yang besar"], ans: 2, exp: "Bubble Sort terus-menerus menukar elemen bersebelahan di setiap langkah iterasi, menyebabkan operasi Write memori membengkak." },
      { q: "Apakah Bubble Sort termasuk algoritma Stable Sort?", opts: ["Ya", "Tidak", "Tergantung data inputnya", "Hanya jika array digabungkan"], ans: 0, exp: "Ya. Dua elemen yang bernilai sama tidak akan saling mendahului karena syarat pertukaran adalah elemen kiri harus 'lebih besar' (bukan sama dengan)." },
      { q: "Apa yang dijamin pasti terjadi setelah SATU putaran (pass) pertama Bubble Sort selesai?", opts: ["Elemen terkecil berada di kiri", "Elemen terbesar berada di posisi paling kanan", "Setengah array terurut", "Tidak ada yang pasti"], ans: 1, exp: "Karena elemen yang lebih besar terus didorong ke kanan, elemen terbesar absolut pasti akan mencapai indeks terakhir pada putaran pertama." },
      { q: "Berapa konsumsi memori tambahan (Space Complexity) Bubble Sort?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], ans: 0, exp: "O(1) atau In-Place. Bubble Sort tidak membutuhkan array tambahan untuk melakukan pengurutan." },
      { q: "Apa paradigma atau teknik utama yang digunakan Bubble Sort?", opts: ["Divide and Conquer", "Comparison and Swapping", "Hashing", "Greedy"], ans: 1, exp: "Bubble Sort sepenuhnya bergantung pada komparasi sepasang nilai (Comparison) dan pertukaran (Swapping)." },
      { q: "Bagaimana kondisi terburuk (Worst Case) bagi Bubble Sort?", opts: ["Array teracak secara acak", "Array berisi angka yang sama semua", "Array terurut terbalik (Descending)", "Array dengan nilai float/desimal"], ans: 2, exp: "Jika array terbalik, setiap elemen harus dipindahkan/digeser sejauh mungkin, membutuhkan tepat n(n-1)/2 pertukaran." },
      { q: "Berapa banyak perbandingan yang dilakukan Bubble Sort jika optimasi 'n = n - 1' tidak dilakukan?", opts: ["O(log n)", "Tepat n kali", "O(n²)", "O(n³)"], ans: 2, exp: "Tanpa pengurangan batas loop, ia akan selalu membandingkan seluruh array di setiap putaran, menghasilkan kompleksitas O(n²)." }
    ]
  },
  'selection-sort': {
    title: "Selection Sort",
    questions: [
      { q: "Apa keunggulan mutlak Selection Sort dibandingkan Bubble Sort?", opts: ["Lebih cepat secara teoritis", "Operasi pertukaran (Swap) sangat sedikit", "Lebih mudah dipahami", "Bersifat Adaptif"], ans: 1, exp: "Selection Sort hanya menukar elemen maksimal 1 kali per putaran, sangat menghemat siklus CPU untuk menulis ke memori." },
      { q: "Berapa banyak penukaran (swap) maksimal pada array dengan n elemen?", opts: ["n² kali", "n log n kali", "n - 1 kali", "1 kali"], ans: 2, exp: "Pertukaran hanya dilakukan di akhir iterasi loop terluar. Karena elemen terakhir otomatis terurut, batas maksimalnya adalah n - 1 kali." },
      { q: "Bagaimana kecepatan Terbaik (Best Case) dari Selection Sort?", opts: ["O(n)", "O(n log n)", "O(1)", "O(n²)"], ans: 3, exp: "Selection Sort 'buta' terhadap keterurutan array. Walaupun data sudah terurut, ia tetap mengecek setiap elemen, menjadikannya selalu O(n²)." },
      { q: "Apakah Selection Sort merupakan algoritma yang Stabil (Stable Sort)?", opts: ["Selalu Stabil", "Biasanya Tidak Stabil (Unstable)", "Tergantung dari hardware", "Hanya stabil pada array kecil"], ans: 1, exp: "Secara default, saat ia menukar nilai minimum ke depan, ia dapat melompati elemen bernilai sama, merusak urutan asli mereka." },
      { q: "Apa mekanisme utama dari Selection Sort?", opts: ["Membagi array menjadi dua bagian (Kiri=Terurut, Kanan=Belum)", "Membelah array di pivot", "Memasukkan elemen ke keranjang", "Menggabungkan dua array terurut"], ans: 0, exp: "Ia memisahkan array secara imajiner, lalu secara berulang memindahkan angka terkecil dari wilayah belum terurut ke batas wilayah terurut." },
      { q: "Dalam skenario apa Selection Sort menjadi pilihan yang rasional digunakan?", opts: ["Saat mengurutkan Big Data (Jutaan record)", "Saat biaya penulisan ke flash memory (EEPROM) sangat mahal", "Saat data selalu diperbarui (Online sorting)", "Saat data bertipe String"], ans: 1, exp: "Karena jumlah operasi 'Write/Swap' sangat kecil (maks O(n)), ia memperpanjang umur perangkat flash memory yang sensitif terhadap frekuensi penulisan." },
      { q: "Berapa kompleksitas ruang (Space Complexity) Selection Sort?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Ia hanya membutuhkan 1 variabel tambahan (`min_idx`) untuk menyimpan posisi sementara, sehingga kompleksitas ruangnya O(1)." },
      { q: "Apa yang terjadi pada loop bagian dalam (inner loop) Selection Sort?", opts: ["Mencari nilai maksimum", "Mencari indeks nilai terkecil dari sisa array", "Menggeser elemen ke kanan", "Menukar setiap elemen yang salah urutan"], ans: 1, exp: "Inner loop sepenuhnya bertugas untuk memindai array dan memperbarui variabel indeks yang merujuk pada elemen bernilai paling kecil." }
    ]
  },
  'insertion-sort': {
    title: "Insertion Sort",
    questions: [
      { q: "Insertion Sort dijuluki algoritma 'Adaptif'. Apa maksudnya?", opts: ["Bisa mengubah fungsinya sendiri", "Bisa berjalan di OS berbeda", "Berjalan sangat cepat (O(n)) jika data sudah hampir terurut", "Digunakan di AI"], ans: 2, exp: "Adaptif berarti kinerjanya membaik secara drastis ketika menangani data yang urutannya sudah 'lumayan rapi' atau 'nearly sorted'." },
      { q: "Manakah pernyataan yang paling tepat menggambarkan cara kerja Insertion Sort?", opts: ["Membelah array di pivot", "Menyelipkan satu elemen ke posisi yang tepat pada bagian array yang sudah terurut di sebelah kiri", "Menukar dua elemen di ujung array", "Mencari nilai terkecil lalu meletakkannya di posisi terdepan"], ans: 1, exp: "Persis seperti orang mengurutkan kartu remi di tangan, ia mengambil satu kartu dan menyisipkannya ke sela-sela kartu yang sudah tersusun." },
      { q: "Kapan Insertion Sort menjadi sangat lambat (O(n²))?", opts: ["Saat array berisi elemen desimal", "Saat array terurut terbalik (Descending)", "Saat memori penuh", "Saat elemen berjumlah genap"], ans: 1, exp: "Jika terurut terbalik, algoritma harus membandingkan dan menggeser SELURUH elemen terurut ke kanan setiap kali ia ingin menyisipkan elemen baru." },
      { q: "Insertion Sort sangat efisien untuk digunakan pada...", opts: ["Data skala jutaan (Big Data)", "Data dalam jumlah kecil atau data yang dimasukkan secara real-time (Online Sorting)", "Menyortir database relasional raksasa", "Data grafik 3D"], ans: 1, exp: "Karena overhead yang sangat rendah, ia sangat ngebut di array kecil (<50 elemen) dan bisa menerima data aliran masuk satu per satu (Online)." },
      { q: "Apakah Insertion Sort termasuk algoritma Stable?", opts: ["Ya", "Tidak", "Tergantung compiler", "Hanya stabil untuk tipe int"], ans: 0, exp: "Ya. Ia tidak akan menukar elemen melewati elemen lain yang nilainya sama, sehingga urutan aslinya terjaga." },
      { q: "Apa nama algoritma pengurutan canggih di bahasa Python (Timsort) yang menggunakan Insertion Sort sebagai pondasinya?", opts: ["Merge Sort & Insertion Sort", "Quick Sort & Insertion Sort", "Heap Sort & Insertion Sort", "Bubble Sort & Insertion Sort"], ans: 0, exp: "Timsort (standar di Python dan Java) adalah hibrida antara Merge Sort untuk membelah data, dan Insertion Sort untuk mengurutkan bagian-bagian kecilnya." },
      { q: "Apa yang dilakukan jika elemen kunci (Key) lebih kecil dari elemen di sebelah kirinya?", opts: ["Elemen kiri dibuang", "Kunci langsung diletakkan di akhir", "Elemen kiri digeser ke kanan untuk membuka ruang bagi Kunci", "Program error"], ans: 2, exp: "Proses utama insertion adalah 'Array Shifting', menggeser elemen yang lebih besar ke kanan hingga menemukan ruang untuk Kunci." },
      { q: "Apa Space Complexity dari Insertion Sort?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], ans: 0, exp: "Ia beroperasi secara In-Place, artinya ia langsung memodifikasi array aslinya tanpa butuh memori array cadangan." }
    ]
  },
  'quick-sort': {
    title: "Quick Sort",
    questions: [
      { q: "Dalam Quick Sort, apa nama elemen yang dijadikan patokan batas pemisah array?", opts: ["Key", "Min_idx", "Pivot", "Anchor"], ans: 2, exp: "Pivot bertugas sebagai standar pemisah. Elemen yang lebih kecil dari pivot digeser ke wilayah kiri, dan yang lebih besar ke wilayah kanan." },
      { q: "Apa kondisi yang menyebabkan Quick Sort terpuruk menjadi O(n²)?", opts: ["Array berisi float", "Nilai Pivot yang terpilih selalu angka terkecil atau terbesar", "Jika menggunakan rekursi", "Jika data dimasukkan ganjil"], ans: 1, exp: "Jika pivot tidak membelah array secara seimbang (misal: array sudah terurut dan kita mengambil pivot paling kanan), Quick Sort menjadi sangat lambat." },
      { q: "Paradigma desain apa yang mendasari Quick Sort?", opts: ["Dynamic Programming", "Greedy Algorithm", "Divide and Conquer", "Backtracking"], ans: 2, exp: "Quick Sort 'Membagi' (Divide) array berdasarkan pivot, dan 'Menaklukkan' (Conquer) setiap sub-array secara rekursif." },
      { q: "Berapa rata-rata kompleksitas waktu (Average Case) dari Quick Sort?", opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], ans: 2, exp: "O(n log n). Ini adalah batas teoritis tercepat untuk algoritma pengurutan berbasis komparasi." },
      { q: "Mengapa Quick Sort sering lebih cepat di dunia nyata dibandingkan Merge Sort meskipun kompleksitasnya sama O(n log n)?", opts: ["Karena kode lebih sedikit", "Karena memiliki Cache Locality (kompatibilitas cache prosesor) yang jauh lebih baik karena bekerja In-Place", "Karena tidak memakai memori sama sekali", "Itu hanya mitos"], ans: 1, exp: "Quick Sort memanipulasi memori array asli secara langsung. Hal ini sangat ramah terhadap L1/L2 Cache pada prosesor modern." },
      { q: "Apa yang terjadi setelah fungsi Partisi (Partition) selesai dieksekusi satu putaran?", opts: ["Array sudah sepenuhnya terurut", "Pivot telah berada di indeks akhirnya yang permanen dan sah", "Seluruh elemen menjadi positif", "Sistem berhenti"], ans: 1, exp: "Tujuan partisi adalah mencari posisi yang benar bagi Pivot. Setelah partisi, posisi Pivot tersebut tidak akan pernah digeser lagi." },
      { q: "Berapa konsumsi memori tambahan (Space) yang dibutuhkan Quick Sort?", opts: ["O(1) mutlak", "O(n) untuk array baru", "O(log n) untuk tumpukan pemanggilan rekursif (Stack)", "O(n²)"], ans: 2, exp: "Meskipun memanipulasi array secara In-Place, fungsi rekursif yang memanggil dirinya sendiri membutuhkan memori tumpukan sistem sebesar O(log n)." },
      { q: "Apakah Quick Sort merupakan algoritma Stable Sort?", opts: ["Ya", "Tidak", "Tergantung bahasa pemrogramannya", "Hanya jika datanya string"], ans: 1, exp: "Secara default Quick Sort tidak stabil. Saat elemen ditukar melewati pivot, elemen bernilai sama bisa kehilangan urutan asli relatifnya." }
    ]
  }
};

export default function QuizPage({ params }: any) {
  // Safe unwrapping for Next.js 15
  const resolvedParams = React.use(params as any);
  const quizData = quizDatabase[resolvedParams.slug];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-white text-center py-32">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Kuis Tidak Ditemukan</h1>
        <Link href="/catalog" className="text-blue-600 hover:underline">Kembali ke Katalog</Link>
      </div>
    );
  }

  const question = quizData.questions[currentIdx];

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === question.ans) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizData.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    let feedback = "";
    if (percentage === 100) feedback = "Sempurna! Anda sudah menguasai algoritma ini sepenuhnya.";
    else if (percentage >= 75) feedback = "Hebat! Pemahaman Anda sangat solid.";
    else if (percentage >= 50) feedback = "Cukup baik, tapi masih ada konsep yang perlu ditinjau ulang.";
    else feedback = "Jangan menyerah! Coba baca kembali modulnya dan ikuti simulasinya.";

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-xl border border-slate-200 w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Evaluasi Selesai!</h1>
            <p className="text-slate-500 mb-10 font-medium">Modul: {quizData.title}</p>
            
            <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-slate-50 mb-8 border-[8px] border-slate-100 shadow-inner">
              <div className="absolute w-full h-full rounded-full border-[8px] border-transparent" style={{ borderColor: percentage >= 75 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444', clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` }}></div>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-slate-900">{score}<span className="text-xl text-slate-400">/8</span></span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-3">{feedback}</h2>
            <p className="text-slate-600 mb-10">Nilai Akhir: <strong className="text-slate-900">{percentage}</strong> / 100</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.location.reload()} className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">
                Ulangi Kuis 🔄
              </button>
              <Link href="/playground" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                Masuk ke Simulator 🛠️
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* Header Sticky Progress */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/algorithm/${resolvedParams.slug}`} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            ← Kembali ke Modul
          </Link>
          <div className="flex items-center gap-4 w-1/2">
            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${((currentIdx + 1) / quizData.questions.length) * 100}%` }}></div>
            </div>
            <span className="text-xs font-bold text-slate-600 font-mono">{currentIdx + 1} / {quizData.questions.length}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-md uppercase tracking-wider mb-4">
            Evaluasi Teori
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Uji Pengetahuan: {quizData.title}</h1>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
            <span className="text-blue-600 mr-2">Q{currentIdx + 1}.</span> {question.q}
          </h2>

          <div className="space-y-3 mb-8">
            {question.opts.map((opt: string, optIdx: number) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectOpt = isAnswered && optIdx === question.ans;
              const isWrongSelected = isAnswered && isSelected && optIdx !== question.ans;

              let btnStyle = "border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700";
              if (isAnswered) {
                if (isCorrectOpt) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-extrabold ring-1 ring-emerald-500";
                else if (isWrongSelected) btnStyle = "border-rose-500 bg-rose-50 text-rose-900 opacity-80";
                else btnStyle = "border-slate-100 bg-slate-50 opacity-40";
              } else if (isSelected) {
                btnStyle = "border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600";
              }

              return (
                <button
                  key={optIdx} onClick={() => !isAnswered && setSelectedOption(optIdx)} disabled={isAnswered}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm md:text-base ${btnStyle} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isAnswered && isCorrectOpt && <span className="text-emerald-600 text-lg">✅</span>}
                    {isAnswered && isWrongSelected && <span className="text-rose-600 text-lg">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          <div className="flex flex-col gap-6 pt-6 border-t border-slate-100 min-h-[120px]">
            {isAnswered && (
              <div className={`p-4 rounded-xl border animate-fadeIn ${selectedOption === question.ans ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <p className={`text-sm font-medium leading-relaxed ${selectedOption === question.ans ? 'text-emerald-800' : 'text-rose-800'}`}>
                  <strong>Penjelasan:</strong> {question.exp}
                </p>
              </div>
            )}

            <div className="flex justify-end mt-auto">
              {!isAnswered ? (
                <button
                  onClick={handleCheck} disabled={selectedOption === null}
                  className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white font-bold rounded-xl transition-all shadow-md w-full md:w-auto"
                >
                  Kunci Jawaban
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg w-full md:w-auto flex items-center justify-center gap-2 animate-fadeIn"
                >
                  {currentIdx < quizData.questions.length - 1 ? 'Pertanyaan Selanjutnya ⏭️' : 'Lihat Hasil Akhir 🏆'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
