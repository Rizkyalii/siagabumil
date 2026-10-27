import React, { useState } from 'react';
import { Calendar, Baby, Sparkles, Clock, ArrowRight, Heart } from 'lucide-react';

interface CalculatorHPLProps {
  onApplyGestationalAge?: (weeks: number) => void;
  onOpenScreening?: () => void;
}

export const CalculatorHPL: React.FC<CalculatorHPLProps> = ({
  onApplyGestationalAge,
  onOpenScreening,
}) => {
  // Default to 12 weeks ago so user sees instant sample
  const today = new Date();
  const defaultHpht = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 70)
    .toISOString()
    .slice(0, 10);

  const [hpht, setHpht] = useState<string>(defaultHpht);
  const [cycleLength, setCycleLength] = useState<number>(28);

  const calculateHPL = () => {
    if (!hpht) return null;
    const hphtDate = new Date(hpht);
    if (isNaN(hphtDate.getTime())) return null;

    // Rumus Naegele modifikasi siklus: HPL = HPHT + 280 hari + (cycleLength - 28)
    const cycleAdjustment = (cycleLength - 28) * 24 * 60 * 60 * 1000;
    const hplDate = new Date(hphtDate.getTime() + 280 * 24 * 60 * 60 * 1000 + cycleAdjustment);

    // Hitung Usia Kehamilan
    const diffTime = today.getTime() - hphtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    // Sisa hari menuju persalinan
    const remainingDays = Math.max(0, Math.floor((hplDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    // Tentukan Trimester
    let trimester = 'Trimester 1';
    if (weeks >= 13 && weeks <= 27) trimester = 'Trimester 2';
    else if (weeks >= 28) trimester = 'Trimester 3';

    // Perumpamaan Buah Lucu
    let fruit = 'Biji Apel Kecil 🍎';
    if (weeks >= 5 && weeks < 9) fruit = 'Buah Raspberry 🫐';
    else if (weeks >= 9 && weeks < 13) fruit = 'Buah Lemon Segar 🍋';
    else if (weeks >= 13 && weeks < 17) fruit = 'Buah Alpukat Manis 🥑';
    else if (weeks >= 17 && weeks < 21) fruit = 'Buah Mangga Harum 🥭';
    else if (weeks >= 21 && weeks < 25) fruit = 'Jagung Manis 🌽';
    else if (weeks >= 25 && weeks < 29) fruit = 'Kembang Kol 🥦';
    else if (weeks >= 29 && weeks < 34) fruit = 'Kelapa Muda 🥥';
    else if (weeks >= 34 && weeks < 38) fruit = 'Melon Cantaloupe 🍈';
    else if (weeks >= 38) fruit = 'Semangka Manis 🍉';

    return {
      hplDate,
      weeks: Math.max(0, weeks),
      days: Math.max(0, days),
      remainingDays,
      trimester,
      fruit,
    };
  };

  const result = calculateHPL();

  return (
    <section id="kalkulator" className="py-16 bg-gradient-to-b from-white via-peach-50/20 to-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bumil-peach-100 text-bumil-peach-500 text-xs sm:text-sm font-bold mb-3 border border-bumil-peach-200">
            <Baby className="w-4 h-4 text-bumil-peach-500" />
            <span>Kalkulator HPL & Usia Janin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800">
            Kapan Si Kecil Menyapa Dunia?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Masukkan Hari Pertama Haid Terakhir (HPHT) Bunda untuk menghitung Hari Perkiraan Lahir (HPL) dan usia kehamilan terkini.
          </p>
        </div>

        {/* Main Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-cute grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Inputs Column */}
          <div className="md:col-span-5 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Tanggal HPHT Bunda <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={hpht}
                  onChange={(e) => setHpht(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-bumil-pink-500 focus:outline-none text-sm font-bold text-gray-800 bg-pink-50/30 shadow-inner"
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Tanggal hari pertama haid/menstruasi terakhir Bunda sebelum hamil.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Panjang Siklus Rata-rata
                </label>
                <span className="text-xs font-black text-bumil-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                  {cycleLength} Hari
                </span>
              </div>
              <input
                type="range"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full accent-bumil-pink-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>21 Hari</span>
                <span>28 Hari (Normal)</span>
                <span>35 Hari</span>
              </div>
            </div>

            <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100 text-xs text-pink-700 leading-relaxed">
              💡 <b>Catatan Bidan:</b> Perhitungan menggunakan Rumus Naegele modifikasi siklus haid standar medis kebidanan.
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-7">
            {result ? (
              <div className="bg-gradient-to-br from-pink-50 via-rose-50/40 to-purple-50 p-6 rounded-3xl border-2 border-pink-200 shadow-inner space-y-5">
                
                {/* HPL Highlight */}
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-pink-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-pink-500" /> Hari Perkiraan Lahir (HPL)
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-gray-800 mt-1">
                    {result.hplDate.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <span className="inline-block mt-1 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-0.5 rounded-full">
                    ± {result.remainingDays} Hari Lagi Menuju Persalinan
                  </span>
                </div>

                {/* Sub metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-2xl border border-pink-100 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-gray-500 block">Usia Kehamilan Saat Ini</span>
                    <p className="text-lg font-extrabold text-bumil-pink-600 mt-0.5">
                      {result.weeks} Minggu {result.days} Hari
                    </p>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {result.trimester}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-pink-100 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-gray-500 block">Ukuran Si Kecil Saat Ini</span>
                    <p className="text-sm font-extrabold text-amber-700 mt-1">
                      {result.fruit}
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-1">
                      Tumbuh makin sehat & kuat 💕
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      if (onApplyGestationalAge) onApplyGestationalAge(result.weeks);
                      if (onOpenScreening) onOpenScreening();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-bumil-pink-500 hover:bg-bumil-pink-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Lanjut Skrining dengan Usia Ini ({result.weeks} mgg)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <Calendar className="w-12 h-12 mx-auto text-pink-200 mb-2" />
                <p className="text-sm">Silakan pilih tanggal HPHT Bunda di samping.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
