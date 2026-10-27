import React from 'react';
import { Sparkles, ShieldAlert, Heart, Calendar, Stethoscope, ChevronRight, Activity, Smile } from 'lucide-react';

interface HeroProps {
  onStartScreening: () => void;
  onExploreDangerSigns: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartScreening,
  onExploreDangerSigns,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background cute decorative circles & pastel gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-pink-200/40 via-peach-200/30 to-purple-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-24 left-10 w-20 h-20 bg-pink-100 rounded-full blur-xl -z-10 animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-xl -z-10 animate-pulse-gentle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Friendly Hero Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-pink-200 text-pink-700 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                <span>🌸 Halo Bunda Cantik! Selamat Datang di Siaga Bumil</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-extrabold shadow-sm">
                <span>🎓 Karya Nadia Safitri • S1 Kebidanan Univ. Hang Tuah</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-gray-800 tracking-tight leading-tight">
              Kawal Kehamilan Sehat,{' '}
              <span className="bg-gradient-to-r from-bumil-pink-600 via-pink-500 to-bumil-peach-500 bg-clip-text text-transparent">
                Tenang & Bahagia
              </span>{' '}
              Bersama Bidan
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Skrining dini kesehatan ibu hamil berbasis pedoman bidan dan Kemenkes RI. Cukup 3 menit untuk mengetahui status risiko kehamilan, mengenali tanda bahaya, dan tersambung langsung ke pemantauan Bidan wilayah Bunda!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartScreening}
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-bumil-pink-500 via-pink-500 to-rose-400 hover:from-bumil-pink-600 hover:to-rose-500 text-white font-extrabold text-base shadow-cute hover:shadow-cute-lg transform hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                <span>Mulai Skrining Mandiri</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreDangerSigns}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white hover:bg-pink-50/60 border-2 border-pink-200 text-pink-700 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Pelajari 10 Tanda Bahaya</span>
              </button>
            </div>

            {/* Quick Benefits Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-pink-100 max-w-lg mx-auto lg:mx-0">
              <div className="text-center p-2 rounded-xl bg-pink-50/50">
                <span className="block text-sm sm:text-base font-extrabold text-pink-600">3 Menit</span>
                <span className="text-[11px] sm:text-xs text-gray-500">Cepat & Mudah</span>
              </div>
              <div className="text-center p-2 rounded-xl bg-purple-50/50">
                <span className="block text-sm sm:text-base font-extrabold text-purple-600">Standar Bidan</span>
                <span className="text-[11px] sm:text-xs text-gray-500">Pedoman Kemenkes</span>
              </div>
              <div className="text-center p-2 rounded-xl bg-amber-50/50">
                <span className="block text-sm sm:text-base font-extrabold text-amber-600">WhatsApp Alert</span>
                <span className="text-[11px] sm:text-xs text-gray-500">Tersambung Bidan</span>
              </div>
            </div>

          </div>

          {/* Right Column: Cute Midwife & Bumil Card Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Cute Floating Mascot Box */}
              <div className="relative z-10 bg-gradient-to-b from-white via-pink-50/60 to-white p-6 sm:p-8 rounded-[36px] border-4 border-white shadow-cute-lg">
                
                {/* Speech Bubble from Midwife */}
                <div className="relative bg-gradient-to-r from-bumil-pink-500 to-pink-400 text-white p-4 rounded-2xl rounded-bl-sm shadow-md mb-6 animate-bounce-subtle">
                  <div className="flex items-start gap-2.5">
                    <Smile className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-pink-100">Pesan dari Nadia Safitri (Bidan)</p>
                      <p className="text-xs sm:text-sm font-semibold mt-0.5 leading-snug">
                        "Jangan ragu cek kondisi Bunda ya! Deteksi dini melindungi Bunda & buah hati tercinta 💕"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Illustrated Avatar Center */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-pink-200 via-rose-100 to-purple-100 p-2 shadow-inner flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3">
                        <span className="text-5xl sm:text-6xl select-none">👩‍⚕️</span>
                        <span className="text-xs font-black text-pink-700 mt-1">Nadia Safitri</span>
                        <span className="text-[10px] font-bold text-gray-400">NIM 24101005 • S1 Kebidanan</span>
                      </div>
                    </div>
                    {/* Floating Heart Badge */}
                    <div className="absolute -top-1 -right-1 bg-white p-2 rounded-full shadow-md animate-float-slow">
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </div>
                    {/* Floating Stethoscope Badge */}
                    <div className="absolute -bottom-1 -left-1 bg-white p-2 rounded-full shadow-md">
                      <Stethoscope className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Quick Info Mini-Cards */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-pink-100 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Kalkulator HPL Otomatis</p>
                        <p className="text-[10px] text-gray-500">Hitung hari perkiraan lahir & usia janin</p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenCalculator}
                      className="px-2.5 py-1 text-[11px] font-bold bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg transition-colors"
                    >
                      Coba ➔
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Input Keluhan Khusus</p>
                        <p className="text-[10px] text-gray-500">Terbaca langsung di dashboard Bidan</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      Siaga
                    </span>
                  </div>
                </div>

              </div>

              {/* Decorative pastel glowing background rings */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-pink-300/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
