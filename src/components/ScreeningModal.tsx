import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, AlertCircle, Heart, Sparkles, User, FileText, Activity, ShieldCheck, Stethoscope } from 'lucide-react';
import { ScreeningData } from '../types';
import { ACUTE_DANGER_OPTIONS, RISK_FACTOR_OPTIONS } from '../data/dangerSigns';
import { calculatePregnancyRisk } from '../utils/scoring';
import { saveScreeningRecord, getMidwifeSettings } from '../utils/storage';
import { syncToGoogleSheet } from '../utils/googleSheets';

interface ScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: ScreeningData) => void;
  initialGestationalWeeks?: number;
}

export const ScreeningModal: React.FC<ScreeningModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialGestationalWeeks = 16,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [consentGiven, setConsentGiven] = useState(false);
  const [namaIbu, setNamaIbu] = useState('');
  const [usiaIbu, setUsiaIbu] = useState<number | ''>('');
  const [noHp, setNoHp] = useState('');
  const [namaSuami, setNamaSuami] = useState('');
  const [alamatFaskes, setAlamatFaskes] = useState('');

  const [usiaKehamilanMinggu, setUsiaKehamilanMinggu] = useState<number>(initialGestationalWeeks);
  const [kehamilanKe, setKehamilanKe] = useState<number>(1);
  const [jumlahPersalinan, setJumlahPersalinan] = useState<number>(0);
  const [jumlahKeguguran, setJumlahKeguguran] = useState<number>(0);
  const [jarakKehamilanTerakhir, setJarakKehamilanTerakhir] = useState<string>('Hamil Pertama');
  const [tinggiBadan, setTinggiBadan] = useState<number | ''>(155);
  const [lilaKurang235, setLilaKurang235] = useState<boolean>(false);
  const [riwayatSc, setRiwayatSc] = useState<boolean>(false);
  const [riwayatPenyakitKronis, setRiwayatPenyakitKronis] = useState<string[]>([]);

  const [tandaBahayaAkut, setTandaBahayaAkut] = useState<string[]>([]);
  const [faktorRisikoLain, setFaktorRisikoLain] = useState<string[]>([]);
  const [keluhanKhusus, setKeluhanKhusus] = useState<string>('');

  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialGestationalWeeks) {
      setUsiaKehamilanMinggu(initialGestationalWeeks);
    }
  }, [initialGestationalWeeks]);

  if (!isOpen) return null;

  const toggleDangerSign = (label: string) => {
    setTandaBahayaAkut((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const toggleRiskFactor = (label: string) => {
    setFaktorRisikoLain((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const toggleChronicDisease = (item: string) => {
    setRiwayatPenyakitKronis((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const validateStep = (currentStep: number): boolean => {
    setFormError('');
    if (currentStep === 1) {
      if (!consentGiven) {
        setFormError('Bunda perlu menyetujui persetujuan skrining untuk melanjutkan.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!namaIbu.trim()) {
        setFormError('Nama lengkap Bunda wajib diisi.');
        return false;
      }
      if (!usiaIbu || Number(usiaIbu) < 12 || Number(usiaIbu) > 55) {
        setFormError('Usia Bunda harus diisi dengan benar (12 - 55 tahun).');
        return false;
      }
      if (!noHp.trim() || noHp.length < 9) {
        setFormError('Nomor WhatsApp Bunda wajib diisi untuk koordinasi Bidan.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setFormError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFormError('');

    try {
      // 1. Hitung Risiko di browser dengan pedoman bidan
      const preliminaryData = {
        usiaIbu: Number(usiaIbu),
        usiaKehamilanMinggu,
        kehamilanKe,
        jumlahKeguguran,
        jarakKehamilanTerakhir,
        tinggiBadan: tinggiBadan ? Number(tinggiBadan) : 155,
        lilaKurang235,
        riwayatSc,
        riwayatPenyakitKronis,
        tandaBahayaAkut,
        faktorRisikoLain,
      };

      const scoreResult = calculatePregnancyRisk(preliminaryData);

      const newRecord: ScreeningData = {
        id: `BUMIL-${Date.now().toString().slice(-5)}`,
        createdAt: new Date().toISOString(),
        consentGiven,
        namaIbu,
        usiaIbu: Number(usiaIbu),
        noHp,
        namaSuami: namaSuami || '-',
        alamatFaskes: alamatFaskes || '-',
        usiaKehamilanMinggu,
        kehamilanKe,
        jumlahPersalinan,
        jumlahKeguguran,
        jarakKehamilanTerakhir,
        tinggiBadan: tinggiBadan ? Number(tinggiBadan) : 155,
        lilaKurang235,
        riwayatSc,
        riwayatPenyakitKronis,
        tandaBahayaAkut,
        faktorRisikoLain,
        keluhanKhusus: keluhanKhusus.trim() || 'Tidak ada keluhan khusus tambahan.',
        kategoriRisiko: scoreResult.category,
        skorTotal: scoreResult.score,
        rekomendasiTindakan: scoreResult.recommendations,
        statusFollowUp: 'Belum Dihubungi',
      };

      // 2. Simpan di Sisi Bidan (Local Storage)
      saveScreeningRecord(newRecord);

      // 3. Simpan ke Google Sheet Bidan jika webhook dikonfigurasi
      const midwifeSettings = getMidwifeSettings();
      if (midwifeSettings.googleSheetWebhookUrl) {
        await syncToGoogleSheet(newRecord, midwifeSettings.googleSheetWebhookUrl);
      }

      // 4. Kirim hasil untuk ditampilkan ke bumil
      onComplete(newRecord);
      onClose();
    } catch (e) {
      console.error(e);
      setFormError('Terjadi kesalahan dalam memproses data. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-pink-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-pink-50 rounded-full transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Progress Wizard */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-pink-100 text-bumil-pink-600 rounded-lg">
              <Stethoscope className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              Formulir Skrining Mandiri SIAGA BUMIL
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Langkah {step} dari 5</span>
            <span className="text-pink-600">{Math.round((step / 5) * 100)}% Selesai</span>
          </div>

          {/* Cute Progress Bar */}
          <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-bumil-pink-500 to-rose-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {formError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP CONTENT */}
        <div className="min-h-[300px]">
          
          {/* STEP 1: Persetujuan / Informed Consent */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center p-4 bg-gradient-to-b from-pink-50 to-white rounded-2xl border border-pink-100">
                <span className="text-4xl select-none">🌸</span>
                <h3 className="text-lg font-bold text-gray-800 mt-2">
                  Persetujuan Skrining Kehamilan
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Kerahasiaan dan keselamatan Bunda adalah prioritas utama Bidan.
                </p>
              </div>

              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 text-xs text-gray-700 space-y-2 leading-relaxed">
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-bumil-pink-500 shrink-0 mt-0.5" />
                  <span>Formulir ini adalah <b>skrining awal</b> berdasarkan pedoman skrining kebidanan untuk mendeteksi faktor risiko sedini mungkin.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-bumil-pink-500 shrink-0 mt-0.5" />
                  <span>Data jawaban dan keluhan khusus Bunda akan dicatat di <b>Sisi Bidan (Google Sheet)</b> agar Bidan dapat memberikan tindak lanjut dan pendampingan.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-bumil-pink-500 shrink-0 mt-0.5" />
                  <span>Hasil skrining bukan merupakan vonis/diagnosis mutlak. Konsultasikan selalu dengan Bidan atau Dokter Spesialis Obstetri & Ginekologi.</span>
                </p>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border-2 border-pink-200 hover:border-bumil-pink-500 transition-colors cursor-pointer shadow-sm">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-bumil-pink-600 focus:ring-bumil-pink-500 accent-bumil-pink-500"
                />
                <span className="text-xs font-bold text-gray-800 leading-snug">
                  Saya memahami dan menyetujui data kehamilan saya disimpan dan diperiksa oleh Bidan untuk pemantauan kesehatan ibu dan janin.
                </span>
              </label>
            </div>
          )}

          {/* STEP 2: Biodata Bumil */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <User className="w-4 h-4 text-bumil-pink-500" />
                Data Diri Bunda
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Lengkap Bunda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Bunda Siti Rahmawati"
                    value={namaIbu}
                    onChange={(e) => setNamaIbu(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Usia Bunda (Tahun) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 26"
                    value={usiaIbu}
                    onChange={(e) => setUsiaIbu(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold"
                  />
                  {usiaIbu && (Number(usiaIbu) < 20 || Number(usiaIbu) >= 35) && (
                    <span className="text-[10px] text-amber-600 font-bold mt-1 block">
                      ⚠️ Usia &lt;20 th atau ≥35 th tergolong kehamilan berisiko.
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nomor WhatsApp Bunda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold"
                  />
                  <p className="text-[10px] text-gray-400 mt-0.5">Bidan akan membalas atau memantau via WA.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Suami / Pendamping
                  </label>
                  <input
                    type="text"
                    placeholder="Nama suami Bunda"
                    value={namaSuami}
                    onChange={(e) => setNamaSuami(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alamat / Wilayah Puskesmas Terdekat
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kel. Sukamaju, RT 02/03 (Puskesmas Melati)"
                  value={alamatFaskes}
                  onChange={(e) => setAlamatFaskes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Riwayat Kehamilan & Fisik */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-bumil-pink-500" />
                Riwayat & Usia Kehamilan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Usia Kehamilan Saat Ini (Minggu)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="44"
                      value={usiaKehamilanMinggu}
                      onChange={(e) => setUsiaKehamilanMinggu(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-bold"
                    />
                    <span className="text-xs font-bold text-gray-500 shrink-0">Minggu</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kehamilan Ke- (Gravida)
                  </label>
                  <select
                    value={kehamilanKe}
                    onChange={(e) => setKehamilanKe(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-bold"
                  >
                    <option value={1}>1 (Kehamilan Pertama)</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5 atau lebih (Grande Multipara)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Pernah Melahirkan (Para)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={jumlahPersalinan}
                    onChange={(e) => setJumlahPersalinan(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-bumil-pink-500 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Pernah Keguguran (Abortus)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={jumlahKeguguran}
                    onChange={(e) => setJumlahKeguguran(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-bumil-pink-500 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Jarak Kehamilan Terakhir
                  </label>
                  <select
                    value={jarakKehamilanTerakhir}
                    onChange={(e) => setJarakKehamilanTerakhir(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-gray-200 focus:border-bumil-pink-500 text-xs font-bold"
                  >
                    <option value="Hamil Pertama">Hamil Pertama</option>
                    <option value="< 2 tahun">&lt; 2 tahun (Terlalu Dekat)</option>
                    <option value="2-5 tahun">2 - 5 tahun (Ideal)</option>
                    <option value="> 5 tahun">&gt; 5 tahun</option>
                    <option value="> 10 tahun">&gt; 10 tahun (Terlalu Lama)</option>
                  </select>
                </div>
              </div>

              {/* Status Fisik & SC */}
              <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-2">
                <span className="text-xs font-extrabold text-pink-700 block">Riwayat Khusus:</span>
                
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={riwayatSc}
                    onChange={(e) => setRiwayatSc(e.target.checked)}
                    className="accent-bumil-pink-500 w-4 h-4 rounded"
                  />
                  <span>Pernah Melahirkan dengan Operasi Sesar (SC) sebelumnya</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={lilaKurang235}
                    onChange={(e) => setLilaKurang235(e.target.checked)}
                    className="accent-bumil-pink-500 w-4 h-4 rounded"
                  />
                  <span>Lingkar Lengan Atas (LILA) &lt; 23.5 cm (Ibu Hamil KEK / Kurang Gizi)</span>
                </label>
              </div>

              {/* Riwayat Penyakit Kronis */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Apakah Bunda memiliki riwayat penyakit berikut?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Hipertensi', 'Diabetes', 'Asma', 'Jantung', 'TBC / Paru', 'Alergi Obat'].map((dis) => (
                    <button
                      type="button"
                      key={dis}
                      onClick={() => toggleChronicDisease(dis)}
                      className={`p-2 rounded-xl text-[11px] font-bold border transition-colors ${
                        riwayatPenyakitKronis.includes(dis)
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {riwayatPenyakitKronis.includes(dis) ? `✓ ${dis}` : `+ ${dis}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Cek Tanda Bahaya & Gejala */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                <h3 className="text-xs font-extrabold uppercase text-rose-700 flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  Bagian 1: Tanda Bahaya Akut (Paling Kritis)
                </h3>
                <p className="text-[11px] text-rose-600">
                  Centang jika Bunda sedang merasakan tanda berikut saat ini:
                </p>
              </div>

              <div className="space-y-2">
                {ACUTE_DANGER_OPTIONS.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                      tandaBahayaAkut.includes(item.label)
                        ? 'bg-rose-100/70 border-rose-400 text-rose-900 font-bold'
                        : 'bg-white border-gray-200 hover:border-rose-200 text-gray-700 font-medium'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tandaBahayaAkut.includes(item.label)}
                      onChange={() => toggleDangerSign(item.label)}
                      className="mt-0.5 accent-rose-600 w-4 h-4 rounded shrink-0"
                    />
                    <span className="text-xs leading-snug">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-extrabold uppercase text-amber-800 mb-2">
                  Bagian 2: Faktor Risiko / Keluhan Lainnya
                </h4>
                <div className="space-y-2">
                  {RISK_FACTOR_OPTIONS.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                        faktorRisikoLain.includes(item.label)
                          ? 'bg-amber-100/70 border-amber-400 text-amber-900 font-bold'
                          : 'bg-white border-gray-200 hover:border-amber-200 text-gray-700 font-medium'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={faktorRisikoLain.includes(item.label)}
                        onChange={() => toggleRiskFactor(item.label)}
                        className="mt-0.5 accent-amber-600 w-4 h-4 rounded shrink-0"
                      />
                      <span className="text-xs leading-snug">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Keluhan Khusus (Sesuai Diagram Workflow Bidan) */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-white rounded-2xl border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">📝</span>
                  <h3 className="text-sm font-black text-purple-900">
                    Keluhan Khusus Bunda (Penting untuk Bidan)
                  </h3>
                </div>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Sesuai alur pelayanan bidan, ceritakan apa pun yang Bunda rasakan saat ini. Keluhan ini akan <b>disorot secara khusus di Dashboard Bidan & Google Sheet</b> untuk dicek langsung.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Tuliskan keluhan atau pertanyaan Bunda secara bebas:
                </label>
                <textarea
                  rows={4}
                  value={keluhanKhusus}
                  onChange={(e) => setKeluhanKhusus(e.target.value)}
                  placeholder="Contoh: Sering kencang di perut bawah saat malam, pusing kalau berdiri lama, dan nafsu makan agak turun..."
                  className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-bumil-pink-500 focus:outline-none text-xs sm:text-sm font-semibold bg-pink-50/20 shadow-inner"
                />
              </div>

              {/* Live Preview Summary of Flags */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
                <span className="font-extrabold text-gray-700 block">Ringkasan Jawaban:</span>
                <p className="text-gray-600">
                  Nama: <b>{namaIbu}</b> ({usiaIbu} th) • Hamil: <b>{usiaKehamilanMinggu} mgg</b> (Anak ke-{kehamilanKe})
                </p>
                <p className="text-gray-600">
                  Tanda Bahaya: <b>{tandaBahayaAkut.length} terdeteksi</b> • Faktor Risiko: <b>{faktorRisikoLain.length} terdeteksi</b>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="mt-8 pt-4 border-t border-pink-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              disabled={isSubmitting}
              className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="py-3 px-6 rounded-xl bg-bumil-pink-500 hover:bg-bumil-pink-600 text-white font-bold text-xs sm:text-sm shadow-cute flex items-center gap-1.5 transition-all"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-bumil-pink-500 to-rose-400 hover:from-bumil-pink-600 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-cute flex items-center gap-2 transform active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menghitung Risiko...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Selesai & Hitung Risiko</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
