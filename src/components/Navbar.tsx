import React, { useState } from 'react';
import { Heart, QrCode, Stethoscope, Sparkles, Menu, X, Baby, ShieldAlert, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenScreening: () => void;
  onOpenQr: () => void;
  onSelectTab: (tab: 'home' | 'edukasi' | 'bahaya' | 'kalkulator' | 'bidan' | 'bio') => void;
  activeTab: 'home' | 'edukasi' | 'bahaya' | 'kalkulator' | 'bidan' | 'bio';
  unreadDangerCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScreening,
  onOpenQr,
  onSelectTab,
  activeTab,
  unreadDangerCount = 1,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'edukasi' | 'bahaya' | 'kalkulator' | 'bidan' | 'bio') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand with Cute Midwife & Baby Theme */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bumil-pink-500 via-pink-400 to-bumil-peach-400 flex items-center justify-center text-white shadow-cute transform transition-transform group-hover:scale-105">
                <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                <Baby className="w-3.5 h-3.5 text-bumil-pink-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-bumil-pink-600 via-pink-500 to-bumil-peach-500 bg-clip-text text-transparent font-cute tracking-tight">
                  SIAGA BUMIL
                </span>
                <span className="text-xs bg-bumil-pink-100 text-bumil-pink-600 font-bold px-2 py-0.5 rounded-full border border-bumil-pink-200 shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Bidan Care
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">
                Skrining Kehamilan Cepat, Tepat & Ramah Bunda 💕
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-pink-50/70 p-1.5 rounded-2xl border border-pink-100">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-bumil-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-bumil-pink-600 hover:bg-white/50'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNav('bahaya')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'bahaya'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-rose-600 hover:bg-white/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              10 Tanda Bahaya
            </button>
            <button
              onClick={() => handleNav('edukasi')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'edukasi'
                  ? 'bg-white text-bumil-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-bumil-pink-600 hover:bg-white/50'
              }`}
            >
              Edukasi Trimester
            </button>
            <button
              onClick={() => handleNav('kalkulator')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'kalkulator'
                  ? 'bg-white text-bumil-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-bumil-pink-600 hover:bg-white/50'
              }`}
            >
              Kalkulator HPL
            </button>
            <button
              onClick={() => handleNav('bio')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'bio'
                  ? 'bg-white text-pink-600 shadow-sm border border-pink-200'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-white/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-pink-500" />
              Profil Bidan
            </button>
            <button
              onClick={() => handleNav('bidan')}
              className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'bidan'
                  ? 'bg-gradient-to-r from-purple-500 to-bumil-pink-500 text-white shadow-sm'
                  : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Sisi Bidan
              {unreadDangerCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {unreadDangerCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenQr}
              className="p-2.5 rounded-xl border border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Tampilkan QR Code"
            >
              <QrCode className="w-4 h-4" />
              <span>QR Link</span>
            </button>

            <button
              onClick={onOpenScreening}
              className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-bumil-pink-500 to-rose-400 hover:from-bumil-pink-600 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-cute hover:shadow-cute-lg transform active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Mulai Skrining</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQr}
              className="p-2 rounded-xl border border-pink-200 text-pink-600"
              aria-label="QR Code"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-pink-50 text-bumil-pink-600 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-pink-100 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => handleNav('home')}
              className={`p-3 rounded-xl text-left text-sm font-bold flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-pink-100 text-pink-700' : 'bg-gray-50 text-gray-700'
              }`}
            >
              🌸 Beranda
            </button>
            <button
              onClick={() => handleNav('bahaya')}
              className={`p-3 rounded-xl text-left text-sm font-bold flex items-center gap-2 ${
                activeTab === 'bahaya' ? 'bg-rose-100 text-rose-700' : 'bg-gray-50 text-gray-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" /> 10 Bahaya
            </button>
            <button
              onClick={() => handleNav('edukasi')}
              className={`p-3 rounded-xl text-left text-sm font-bold flex items-center gap-2 ${
                activeTab === 'edukasi' ? 'bg-pink-100 text-pink-700' : 'bg-gray-50 text-gray-700'
              }`}
            >
              📖 Edukasi
            </button>
            <button
              onClick={() => handleNav('kalkulator')}
              className={`p-3 rounded-xl text-left text-sm font-bold flex items-center gap-2 ${
                activeTab === 'kalkulator' ? 'bg-pink-100 text-pink-700' : 'bg-gray-50 text-gray-700'
              }`}
            >
              🗓️ Kalkulator HPL
            </button>
            <button
              onClick={() => handleNav('bio')}
              className={`col-span-2 p-3 rounded-xl text-left text-sm font-bold flex items-center gap-2 ${
                activeTab === 'bio' ? 'bg-pink-100 text-pink-700' : 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 border border-pink-200'
              }`}
            >
              👩‍⚕️ Profil Bidan Nadia Safitri (Univ. Hang Tuah)
            </button>
          </div>

          <button
            onClick={() => handleNav('bidan')}
            className={`w-full p-3 rounded-xl text-left text-sm font-bold flex items-center justify-between ${
              activeTab === 'bidan'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-700 border border-purple-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span>Portal Khusus Bidan (Data Google Sheet)</span>
            </div>
            {unreadDangerCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-rose-500 text-white rounded-full">
                {unreadDangerCount} Bahaya
              </span>
            )}
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScreening();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-bumil-pink-500 to-rose-400 text-white font-bold text-center shadow-cute flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 fill-white" />
              <span>Mulai Skrining Mandiri Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
