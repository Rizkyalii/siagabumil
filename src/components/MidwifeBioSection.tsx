import React from 'react';
import { MIDWIFE_DATA } from '../data/midwifeBio';
import { GraduationCap, Heart, Stethoscope, Sparkles, BookOpen, Award, CheckCircle2, MessageCircle, MapPin, Building2, User } from 'lucide-react';

interface MidwifeBioSectionProps {
  onStartScreening?: () => void;
  onGoToBidanPortal?: () => void;
}

export const MidwifeBioSection: React.FC<MidwifeBioSectionProps> = ({
  onStartScreening,
  onGoToBidanPortal,
}) => {
  return (
    <section id="profil-bidan" className="py-16 bg-gradient-to-b from-pink-50/40 via-white to-purple-50/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bumil-pink-100 text-bumil-pink-700 text-xs sm:text-sm font-bold mb-3 border border-bumil-pink-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-bumil-pink-500 fill-bumil-pink-400" />
            <span>Profil Inovator & Pengembang Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800">
            Biografi Bidan Penggagas <span className="text-bumil-pink-600">SIAGA BUMIL</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Dedikasi akademik dan kepedulian tulus untuk menghadirkan pelayanan kesehatan ibu dan anak yang hangat, modern, serta ramah calon ibu.
          </p>
        </div>

        {/* Main Bio Card */}
        <div className="bg-white rounded-[36px] p-6 sm:p-10 border-4 border-pink-100 shadow-cute-lg relative overflow-hidden">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-100/50 via-purple-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-peach-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Avatar & Quick Academic Badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              
              <div className="relative mb-5">
                {/* Cute Profile Frame */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-bumil-pink-400 via-pink-300 to-bumil-peach-300 p-2 shadow-cute flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                    <span className="text-6xl sm:text-7xl select-none transform hover:scale-105 transition-transform">
                      👩‍⚕️
                    </span>
                    <span className="text-[10px] font-black uppercase text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full mt-1 border border-pink-200">
                      Calon Bidan Indonesia
                    </span>
                  </div>
                </div>

                {/* Floating Heart & Stethoscope Badges */}
                <div className="absolute -top-1 -right-1 bg-white p-2.5 rounded-full shadow-md animate-float-slow">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div className="absolute -bottom-1 -left-1 bg-white p-2.5 rounded-full shadow-md">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              {/* Identity Header */}
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">
                {MIDWIFE_DATA.nama}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-bumil-pink-600 mt-0.5">
                {MIDWIFE_DATA.role}
              </p>

              {/* Academic Highlights Pill Card */}
              <div className="w-full mt-5 p-4 rounded-2xl bg-gradient-to-r from-pink-50/80 via-white to-purple-50/80 border border-pink-200 shadow-inner space-y-2 text-left">
                
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Nomor Induk Mahasiswa (NIM)</span>
                    <span className="font-extrabold text-gray-800 font-mono text-sm">{MIDWIFE_DATA.nim}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Program Studi & Semester</span>
                    <span className="font-extrabold text-gray-800">{MIDWIFE_DATA.prodi} • {MIDWIFE_DATA.semester}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Perguruan Tinggi</span>
                    <span className="font-extrabold text-gray-800">{MIDWIFE_DATA.universitas}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Bio Details, Greeting, Mission, & Competencies */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Cute Speech Bubble / Personal Greeting */}
              <div className="relative bg-gradient-to-r from-bumil-pink-500 via-pink-500 to-rose-400 text-white p-5 rounded-3xl rounded-tl-sm shadow-md">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 fill-white shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-pink-100">
                      Sepatah Kata dari Nadia Safitri
                    </p>
                    <p className="text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                      "{MIDWIFE_DATA.salamPembuka}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Visi Inovasi */}
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200">
                <h4 className="text-xs font-black uppercase text-pink-700 flex items-center gap-1.5 mb-1.5">
                  <Award className="w-4 h-4 text-pink-500" />
                  Visi Inovasi SIAGA BUMIL:
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  {MIDWIFE_DATA.visiMisi}
                </p>
              </div>

              {/* Fokus & Keahlian Kebidanan */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Fokus Pembelajaran & Kompetensi Kebidanan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MIDWIFE_DATA.kompetensi.map((komp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-pink-100 shadow-sm flex items-center gap-2 hover:border-pink-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-bumil-pink-500 shrink-0" />
                      <span className="text-xs font-bold text-gray-700">{komp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${MIDWIFE_DATA.kontak.whatsapp}?text=${encodeURIComponent(
                    `Halo Nadia Safitri (Bidan Pengembang SIAGA BUMIL), saya ingin berkonsultasi mengenai platform kebidanan ini 💕`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi WhatsApp dengan Nadia</span>
                </a>

                {onStartScreening && (
                  <button
                    onClick={onStartScreening}
                    className="py-3 px-5 rounded-2xl bg-bumil-pink-500 hover:bg-bumil-pink-600 text-white font-extrabold text-xs sm:text-sm shadow-cute flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>Mulai Skrining Mandiri</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
