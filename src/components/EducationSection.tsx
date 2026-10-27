import React, { useState } from 'react';
import { EDUCATION_ARTICLES, NUTRITION_TIPS } from '../data/educationData';
import { Sparkles, CheckCircle, Apple, Calendar, Heart } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [selectedTrimester, setSelectedTrimester] = useState<string>('Trimester 1');

  const currentArticle =
    EDUCATION_ARTICLES.find((a) => a.trimester === selectedTrimester) || EDUCATION_ARTICLES[0];

  return (
    <section id="edukasi" className="py-16 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bumil-pink-100 text-bumil-pink-700 text-xs sm:text-sm font-bold mb-3 border border-bumil-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-bumil-pink-500" />
            <span>Info & Edukasi Kehamilan Ramah Bunda</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800">
            Panduan Lengkap Setiap Trimester
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Perjalanan menjadi seorang ibu adalah momen istimewa. Pelajari perubahan tubuh Bunda, perkembangan si kecil, dan jadwal ANC resmi Kemenkes RI.
          </p>

          {/* Trimester Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {['Trimester 1', 'Trimester 2', 'Trimester 3', 'Semua'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTrimester(tab)}
                className={`py-2 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  selectedTrimester === tab
                    ? 'bg-gradient-to-r from-bumil-pink-500 to-rose-400 text-white shadow-cute'
                    : 'bg-white text-gray-600 border border-pink-200 hover:bg-pink-50'
                }`}
              >
                {tab === 'Semua' ? 'Jadwal ANC (K1-K6)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-pink-100 shadow-cute max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-100">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-pink-50 rounded-2xl border border-pink-100">
                {currentArticle.icon}
              </span>
              <div>
                <span className="text-xs font-bold text-bumil-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                  {currentArticle.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mt-1">
                  {currentArticle.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 my-5 font-medium leading-relaxed bg-pink-50/50 p-4 rounded-2xl border border-pink-100/60">
            {currentArticle.summary}
          </p>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-pink-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              Saran & Anjuran Bidan untuk Bunda:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentArticle.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-50/60 to-white border border-pink-100 flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-bumil-pink-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition Tips Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Apple className="w-5 h-5 text-bumil-pink-500" />
              Pilar Nutrisi Sehat Ibu & Janin
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Menu seimbang setiap hari untuk mendukung tumbuh kembang optimal si buah hati
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NUTRITION_TIPS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm hover:shadow-cute transition-all text-center flex flex-col items-center"
              >
                <span className="text-3xl p-3 bg-pink-50 rounded-2xl mb-3">{item.icon}</span>
                <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Standar ANC Kemenkes Card */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 via-pink-50 to-peach-50 p-6 sm:p-8 rounded-3xl border border-purple-100 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-800 text-base sm:text-lg">
                Gerakan Periksa Kehamilan 6 Kali (ANC Kemenkes)
              </h4>
              <p className="text-xs text-purple-700 font-semibold">
                Minimal 2 kali diperiksa oleh Dokter dengan USG di Trimester 1 & 3
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-sm">
              <span className="font-black text-purple-700 block mb-1">Trimester 1 (K1)</span>
              <p className="text-gray-600">1x pemeriksaan awal oleh Dokter (skrining USG, tes darah Hb, goldar, HIV, Sifilis, HBsAg).</p>
            </div>
            <div className="bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-sm">
              <span className="font-black text-pink-600 block mb-1">Trimester 2 (K2 & K3)</span>
              <p className="text-gray-600">2x pemeriksaan oleh Bidan / Dokter (pantau tensi, TFU rahim, DJJ denyut jantung janin).</p>
            </div>
            <div className="bg-white/80 p-3.5 rounded-2xl border border-purple-100 shadow-sm">
              <span className="font-black text-rose-600 block mb-1">Trimester 3 (K4, K5, K6)</span>
              <p className="text-gray-600">3x pemeriksaan, minimal 1x periksa Dokter untuk evaluasi letak janin dan rencana persalinan aman.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
