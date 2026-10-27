import React, { useState } from 'react';
import { DANGER_SIGNS } from '../data/dangerSigns';
import { DangerSignInfo } from '../types';
import { AlertTriangle, PhoneCall, ShieldAlert, Sparkles, ChevronRight, X, HeartPulse } from 'lucide-react';

interface DangerSignsSectionProps {
  onStartScreening: () => void;
}

export const DangerSignsSection: React.FC<DangerSignsSectionProps> = ({ onStartScreening }) => {
  const [selectedSign, setSelectedSign] = useState<DangerSignInfo | null>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filteredSigns = DANGER_SIGNS.filter((sign) => {
    if (filter === 'all') return true;
    return sign.urgency === filter;
  });

  return (
    <section id="tanda-bahaya" className="py-16 bg-gradient-to-b from-white via-rose-50/30 to-pink-50/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold mb-3 border border-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Wajib Diketahui Ibu Hamil & Suami</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800">
            10 Tanda Bahaya Kehamilan
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Jika Bunda mengalami satu atau lebih tanda di bawah ini, <b>jangan ditunda!</b> Segera ke fasilitas kesehatan (Puskesmas PONED, RS, atau Bidan Siaga).
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
              }`}
            >
              Semua (10 Tanda)
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'high'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
              }`}
            >
              🚨 Bahaya Akut (Segera ke IGD)
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'medium'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
              }`}
            >
              ⚠️ Perlu Evaluasi Cepat
            </button>
          </div>
        </div>

        {/* Danger Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSigns.map((sign, index) => (
            <div
              key={sign.id}
              onClick={() => setSelectedSign(sign)}
              className="bg-white rounded-3xl p-6 border-2 border-pink-100/80 shadow-cute hover:shadow-cute-lg hover:border-rose-200 transition-all cursor-pointer group flex flex-col justify-between transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Urgency Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl select-none p-2 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform">
                  {sign.icon}
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                    sign.urgency === 'high'
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {sign.urgency === 'high' ? 'Darurat / Kritis' : 'Waspada Tinggi'}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-extrabold text-gray-800 text-base sm:text-lg group-hover:text-rose-600 transition-colors">
                  {sign.title}
                </h3>
                <p className="text-xs text-rose-600 font-semibold mt-1">
                  {sign.subtitle}
                </p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  {sign.description}
                </p>
              </div>

              {/* Action Hint */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-bumil-pink-600 group-hover:text-rose-600">
                <span>Lihat Panduan Bidan</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Floating Banner */}
        <div className="mt-12 bg-gradient-to-r from-rose-500 via-pink-600 to-bumil-peach-500 text-white rounded-3xl p-6 sm:p-8 shadow-cute-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <HeartPulse className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">Merasa Ada yang Tidak Beres dengan Kehamilan Bunda?</h3>
              <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-xl">
                Jangan ragu melakukan skrining mandiri sekarang atau hubungi ambulans darurat 119 dan Bidan terdekat.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:119"
              className="flex-1 sm:flex-none py-3 px-5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md font-extrabold text-xs sm:text-sm text-white flex items-center justify-center gap-2 border border-white/30 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Hubungi 119
            </a>
            <button
              onClick={onStartScreening}
              className="flex-1 sm:flex-none py-3 px-6 rounded-2xl bg-white text-rose-600 hover:bg-pink-50 font-black text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-rose-500" /> Skrining Sekarang
            </button>
          </div>
        </div>

      </div>

      {/* Modal Detail Tanda Bahaya */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-pink-100">
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-pink-50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl p-2.5 bg-rose-50 rounded-2xl">{selectedSign.icon}</span>
              <div>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    selectedSign.urgency === 'high'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedSign.urgency === 'high' ? 'Tanda Bahaya Kritis' : 'Perlu Evaluasi Cepat'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-800 mt-1">
                  {selectedSign.title}
                </h3>
              </div>
            </div>

            <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 mb-4">
              <p className="text-xs font-bold text-rose-700">{selectedSign.subtitle}</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedSign.description}</p>
            </div>

            <div className="p-4 bg-rose-50/80 rounded-2xl border-2 border-rose-200 mb-6">
              <h4 className="text-xs font-extrabold uppercase text-rose-800 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Langkah yang Harus Dilakukan:
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-rose-900 leading-relaxed">
                {selectedSign.action}
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href="tel:119"
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4" /> Telepon IGD (119)
              </a>
              <button
                onClick={() => {
                  setSelectedSign(null);
                  onStartScreening();
                }}
                className="py-3 px-5 rounded-xl bg-bumil-pink-500 hover:bg-bumil-pink-600 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                Mulai Skrining
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
