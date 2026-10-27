import React from 'react';
import { QrCode, BookOpen, ClipboardList, CheckCircle2, Calculator, Database, AlertTriangle, ShieldCheck, Siren } from 'lucide-react';

interface WorkflowGuideProps {
  onStartScreening: () => void;
  onOpenQr: () => void;
  onGoToBidan: () => void;
}

export const WorkflowGuide: React.FC<WorkflowGuideProps> = ({
  onStartScreening,
  onOpenQr,
  onGoToBidan,
}) => {
  return (
    <section className="py-12 bg-gradient-to-b from-white via-pink-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bumil-pink-100 text-bumil-pink-700 text-xs sm:text-sm font-bold mb-3 border border-bumil-pink-200 shadow-sm">
            <span>✨ Alur Pelayanan Standar Bidan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">
            Alur Kerja Sistem <span className="text-bumil-pink-500">SIAGA BUMIL</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Dirancang secara terpadu sesuai bagan operasional resmi untuk memudahkan ibu hamil mendeteksi risiko dini dan terhubung langsung ke bidan wilayah.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-cute hover:shadow-cute-lg transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-bumil-pink-100 text-bumil-pink-600 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-bumil-pink-500 group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Buka SIAGA BUMIL</h3>
              <p className="text-xs text-gray-500 mb-3">Lewat link browser HP atau scan poster QR di Posyandu / Klinik Bidan.</p>
            </div>
            <button
              onClick={onOpenQr}
              className="text-xs font-bold text-bumil-pink-600 bg-bumil-pink-50 hover:bg-bumil-pink-100 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" /> Buka QR Link
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-cute hover:shadow-cute-lg transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-bumil-peach-100 text-bumil-peach-500 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-bumil-peach-400 group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Baca Info Edukasi</h3>
              <p className="text-xs text-gray-500 mb-3">Pahami panduan trimester, tips nutrisi sehat, dan 10 tanda bahaya kehamilan.</p>
            </div>
            <a
              href="#tanda-bahaya"
              className="text-xs font-bold text-bumil-peach-500 bg-bumil-peach-50 hover:bg-bumil-peach-100 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Lihat Bahaya
            </a>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-cute hover:shadow-cute-lg transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-bumil-lavender-100 text-bumil-lavender-500 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-bumil-lavender-400 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Klik Mulai Skrining</h3>
              <p className="text-xs text-gray-500 mb-3">Formulir interaktif di dialog pop-up yang ramah, cepat, dan mudah diisi.</p>
            </div>
            <button
              onClick={onStartScreening}
              className="text-xs font-bold text-bumil-lavender-500 bg-bumil-lavender-50 hover:bg-bumil-lavender-100 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ClipboardList className="w-3.5 h-3.5" /> Buka Formulir
            </button>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-cute hover:shadow-cute-lg transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Isi Formulir Lengkap</h3>
              <p className="text-xs text-gray-500 mb-3">Berikan persetujuan, isi biodata, gejala, serta cantumkan <b>Keluhan Khusus</b> Bunda.</p>
            </div>
            <div className="text-[11px] font-bold text-purple-600 bg-purple-50 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ada Informed Consent
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-bumil-pink-200 shadow-cute hover:shadow-cute-lg transition-all flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                5
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Hitung Risiko Otomatis</h3>
              <p className="text-xs text-gray-500 mb-3">Aturan skor klinis dihitung instan di browser & langsung terhubung ke Sisi Bidan.</p>
            </div>
            <button
              onClick={onGoToBidan}
              className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5" /> Sisi Bidan (Sheet)
            </button>
          </div>

        </div>

        {/* 3 Output Categories Visual Banner */}
        <div className="mt-8 bg-gradient-to-r from-pink-50 via-rose-50/50 to-purple-50 p-6 rounded-3xl border border-pink-200">
          <div className="text-center mb-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-700">
              3 Kategori Hasil Skrining & Rekomendasi Tindakan
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Red Result */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-rose-200 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Siren className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Ada Tanda Bahaya
                </span>
                <p className="text-sm font-black text-rose-700 mt-1">Segera ke Faskes / IGD!</p>
                <p className="text-xs text-gray-500 mt-0.5">Penanganan medis segera di Puskesmas / Rumah Sakit.</p>
              </div>
            </div>

            {/* Yellow Result */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-amber-200 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Ada Faktor Risiko
                </span>
                <p className="text-sm font-black text-amber-700 mt-1">Konsultasi ke Bidan</p>
                <p className="text-xs text-gray-500 mt-0.5">Hubungi Bidan via WhatsApp untuk pemeriksaan komprehensif.</p>
              </div>
            </div>

            {/* Green Result */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-emerald-200 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Risiko Rendah
                </span>
                <p className="text-sm font-black text-emerald-700 mt-1">Tetap ANC Rutin (6x)</p>
                <p className="text-xs text-gray-500 mt-0.5">Pertahankan pola hidup sehat dan periksa berkala sesuai jadwal Kemenkes.</p>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-gray-400 mt-4 italic font-medium">
            *Hasil adalah skrining awal, bukan diagnosis definitif. Aturan skor bersumber dari pedoman teknis Bidan & Kemenkes RI.
          </p>
        </div>

      </div>
    </section>
  );
};
