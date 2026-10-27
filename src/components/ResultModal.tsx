import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Siren, AlertTriangle, ShieldCheck, PhoneCall, MessageCircle, Printer, Calendar, Heart, Share2 } from 'lucide-react';
import { ScreeningData } from '../types';
import { getMidwifeSettings } from '../utils/storage';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultData: ScreeningData | null;
  onOpenBidanPortal: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  resultData,
  onOpenBidanPortal,
}) => {
  const midwifeSettings = getMidwifeSettings();

  useEffect(() => {
    if (isOpen && resultData) {
      if (resultData.kategoriRisiko === 'low') {
        // Trigger cute celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f471a4', '#34C77B', '#FA8C54', '#9B7AE8'],
        });
      }
    }
  }, [isOpen, resultData]);

  if (!isOpen || !resultData) return null;

  const isDanger = resultData.kategoriRisiko === 'danger';
  const isRisk = resultData.kategoriRisiko === 'risk';
  const isLow = resultData.kategoriRisiko === 'low';

  const handlePrint = () => {
    window.print();
  };

  // Generate WhatsApp Consultation Message
  const getWhatsAppLink = () => {
    const phone = midwifeSettings.midwifePhone.replace(/\D/g, '');
    const categoryText = isDanger
      ? '🚨 ADA TANDA BAHAYA (Segera ke Faskes)'
      : isRisk
      ? '⚠️ ADA FAKTOR RISIKO (Perlu Konsultasi)'
      : '✨ RISIKO RENDAH (Stabil)';

    const text = encodeURIComponent(
      `Halo Bu Bidan (${midwifeSettings.midwifeName}),\n\n` +
      `Saya baru saja melakukan skrining mandiri di website SIAGA BUMIL:\n` +
      `• *Nama Ibu:* ${resultData.namaIbu}\n` +
      `• *Usia:* ${resultData.usiaIbu} tahun\n` +
      `• *Usia Kehamilan:* ${resultData.usiaKehamilanMinggu} minggu (Hamil ke-${resultData.kehamilanKe})\n` +
      `• *Hasil Skrining:* ${categoryText}\n` +
      `• *Skor Risiko:* ${resultData.skorTotal}\n` +
      `• *Keluhan Khusus:* ${resultData.keluhanKhusus || 'Tidak ada'}\n\n` +
      `Mohon arahan dan jadwal periksa selanjutnya ya Bu Bidan. Terima kasih banyak 💕`
    );

    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-pink-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-pink-50 rounded-full transition-colors print:hidden"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Card Header Based on 3 Branches */}
        <div className="text-center mb-6">
          {isDanger && (
            <div className="animate-pulse">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 shadow-cute mb-3 border-2 border-rose-300">
                <Siren className="w-9 h-9" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase bg-rose-600 text-white tracking-wider mb-2">
                ⚠️ Ada Tanda Bahaya
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-rose-700">
                Segera ke Fasilitas Kesehatan!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto font-semibold">
                Ditemukan tanda bahaya klinis yang membutuhkan penanganan medis segera dari Dokter atau Bidan Siaga.
              </p>
            </div>
          )}

          {isRisk && (
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 shadow-cute mb-3 border-2 border-amber-300">
                <AlertTriangle className="w-9 h-9" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase bg-amber-500 text-white tracking-wider mb-2">
                📋 Ada Faktor Risiko
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-800">
                Konsultasikan dengan Bidan
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto font-semibold">
                Terdapat beberapa faktor risiko kehamilan yang memerlukan pengawasan dan pemeriksaan lebih cermat.
              </p>
            </div>
          )}

          {isLow && (
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 shadow-cute mb-3 border-2 border-emerald-300">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase bg-emerald-600 text-white tracking-wider mb-2">
                ✨ Risiko Rendah
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-800">
                Alhamdulillah! Tetap ANC Rutin
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto font-semibold">
                Kondisi kehamilan Bunda dalam batas aman dan stabil. Terus jaga kesehatan dan pola nutrisi seimbang ya!
              </p>
            </div>
          )}
        </div>

        {/* Patient & Screening Badge Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50/70 via-white to-pink-50/70 border border-pink-200 mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-pink-100">
              <span className="text-[10px] text-gray-400 font-bold block">Nama Bunda</span>
              <span className="text-xs sm:text-sm font-extrabold text-gray-800 truncate block">
                {resultData.namaIbu}
              </span>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-pink-100">
              <span className="text-[10px] text-gray-400 font-bold block">Usia & Hamil</span>
              <span className="text-xs sm:text-sm font-extrabold text-gray-800 block">
                {resultData.usiaIbu} th • {resultData.usiaKehamilanMinggu} mgg
              </span>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-pink-100">
              <span className="text-[10px] text-gray-400 font-bold block">Skor Risiko</span>
              <span className={`text-xs sm:text-sm font-black block ${isDanger ? 'text-rose-600' : isRisk ? 'text-amber-700' : 'text-emerald-600'}`}>
                {resultData.skorTotal} Poin
              </span>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-pink-100">
              <span className="text-[10px] text-gray-400 font-bold block">ID Skrining</span>
              <span className="text-xs font-mono font-bold text-bumil-pink-600 block">
                {resultData.id}
              </span>
            </div>
          </div>

          {/* Keluhan Khusus Section Highlighted */}
          {resultData.keluhanKhusus && (
            <div className="mt-3 p-3 bg-white rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold mb-1">
                <span>📝 Keluhan Khusus Bunda:</span>
              </div>
              <p className="text-xs text-gray-700 font-medium italic">
                "{resultData.keluhanKhusus}"
              </p>
              <span className="text-[10px] text-purple-600 font-semibold block mt-1">
                *Keluhan ini sudah otomatis tercatat di Portal & Google Sheet Bidan
              </span>
            </div>
          )}
        </div>

        {/* Action Recommendations Box */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-bumil-pink-500 fill-bumil-pink-400" />
            Langkah & Rekomendasi Medis untuk Bunda:
          </h4>
          <div className="space-y-2">
            {resultData.rekomendasiTindakan.map((rec, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 border ${
                  isDanger
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : isRisk
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                <span className="shrink-0 font-bold mt-0.5">•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs: WA Bidan, Emergency Call, Print */}
        <div className="space-y-2.5 pt-2 border-t border-pink-100 print:hidden">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* If danger, prominent emergency button */}
            {isDanger && (
              <a
                href="tel:119"
                className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-cute transition-colors"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Telepon IGD / Ambulans 119</span>
              </a>
            )}

            {/* WhatsApp to Midwife */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp ke Bidan ({midwifeSettings.midwifeName})</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" /> Cetak Ringkasan Skrining
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBidanPortal();
              }}
              className="py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs transition-colors"
            >
              Cek di Sisi Bidan ➔
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer required by Workflow */}
        <div className="mt-5 pt-3 border-t border-dashed border-gray-200 text-center">
          <p className="text-[11px] text-gray-400 font-medium italic">
            *Hasil adalah skrining awal, bukan diagnosis. Aturan skor dari pedoman bidan.
          </p>
        </div>

      </div>
    </div>
  );
};
