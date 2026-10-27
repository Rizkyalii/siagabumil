import React from 'react';
import { Heart, Sparkles, PhoneCall, ShieldAlert, Baby, GraduationCap, Building2 } from 'lucide-react';

interface FooterProps {
  onOpenScreening: () => void;
  onOpenQr: () => void;
  onSelectTab: (tab: 'home' | 'edukasi' | 'bahaya' | 'kalkulator' | 'bidan' | 'bio') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenScreening,
  onOpenQr,
  onSelectTab,
}) => {
  return (
    <footer className="bg-gradient-to-b from-white via-pink-50/50 to-pink-100/60 border-t border-pink-200/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Info & Author Midwife Highlight */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bumil-pink-500 to-rose-400 flex items-center justify-center text-white shadow-cute">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-bumil-pink-600 to-rose-500 bg-clip-text text-transparent">
                SIAGA BUMIL
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium max-w-sm">
              Platform pendampingan ibu hamil dan bidan pintar untuk mewujudkan kehamilan sehat, persalinan selamat, dan generasi emas bebas stunting. 💕
            </p>

            {/* Midwife Nadia Safitri Credit Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-pink-200 shadow-sm space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-black text-pink-700">
                <GraduationCap className="w-4 h-4 text-bumil-pink-500" />
                <span>Inovator & Pengembang Platform:</span>
              </div>
              <p className="text-xs font-black text-gray-800">
                Nadia Safitri <span className="text-bumil-pink-600 font-mono font-bold">(NIM: 24101005)</span>
              </p>
              <p className="text-[11px] text-gray-600 font-semibold">
                Prodi S1 Kebidanan • Semester 5
              </p>
              <p className="text-[11px] text-purple-700 font-bold flex items-center gap-1">
                <Building2 className="w-3 h-3 text-purple-500" />
                Universitas Hang Tuah Pekanbaru
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-700">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs font-bold text-gray-600">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-bumil-pink-600 transition-colors"
                >
                  🌸 Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bahaya')}
                  className="hover:text-rose-600 transition-colors"
                >
                  🚨 10 Tanda Bahaya Kehamilan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('edukasi')}
                  className="hover:text-bumil-pink-600 transition-colors"
                >
                  📖 Edukasi Trimester & ANC 6x
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('kalkulator')}
                  className="hover:text-bumil-pink-600 transition-colors"
                >
                  🗓️ Kalkulator HPL & Usia Janin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bio')}
                  className="hover:text-pink-600 transition-colors flex items-center gap-1 text-pink-700"
                >
                  👩‍⚕️ Profil Bidan Nadia Safitri
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bidan')}
                  className="hover:text-purple-600 transition-colors"
                >
                  🩺 Portal Bidan (Google Sheet)
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Kontak Darurat Kesehatan
            </h4>
            <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-semibold">Panggilan Gawat Darurat:</span>
                <a
                  href="tel:119"
                  className="font-black text-rose-600 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> 119 (Bebas Pulsa)
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-semibold">Halo Kemenkes RI:</span>
                <a href="tel:1500567" className="font-bold text-gray-800 hover:underline">
                  1500-567
                </a>
              </div>
              <p className="text-[11px] text-gray-400 pt-1 border-t border-gray-100">
                Segera ke IGD RS / Puskesmas PONED terdekat jika terdapat perdarahan atau kejang.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Note from Workflow (MANDATORY REQUIREMENT) */}
        <div className="p-4 rounded-2xl bg-white/80 border border-pink-200 text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold text-gray-600">
            📌 <b>Catatan Medis Penting:</b> "Hasil adalah skrining awal, bukan diagnosis. Aturan skor dari pedoman bidan."
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-pink-200/70 pt-6">
          <p>© {new Date().getFullYear()} SIAGA BUMIL. Dikembangkan dengan penuh kasih untuk para calon ibu & bidan Indonesia 💕</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenQr}
              className="text-pink-600 hover:underline font-bold"
            >
              Scan QR Link
            </button>
            <button
              onClick={onOpenScreening}
              className="text-pink-600 hover:underline font-bold"
            >
              Mulai Skrining
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
