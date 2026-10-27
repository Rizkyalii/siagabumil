import { RiskCategory, ScreeningData } from '../types';

export interface ScoreCalculationResult {
  category: RiskCategory;
  score: number;
  dangerFlags: string[];
  riskFlags: string[];
  recommendations: string[];
  headline: string;
  badgeClass: string;
}

export function calculatePregnancyRisk(data: Partial<ScreeningData>): ScoreCalculationResult {
  let score = 2; // Nilai dasar kehamilan normal (Sistem Skrining Bidan Poedji Rochjati)
  const dangerFlags: string[] = [];
  const riskFlags: string[] = [];
  const recommendations: string[] = [];

  // 1. EVALUASI TANDA BAHAYA AKUT (Emergency Red Flags)
  if (data.tandaBahayaAkut && data.tandaBahayaAkut.length > 0) {
    dangerFlags.push(...data.tandaBahayaAkut);
    score += data.tandaBahayaAkut.length * 8; // Bobot bahaya darurat
  }

  // 2. EVALUASI FAKTOR RISIKO KLINIS (Yellow Flags)
  // Usia Ibu
  if (data.usiaIbu !== undefined) {
    if (data.usiaIbu < 20) {
      riskFlags.push('Usia ibu < 20 tahun (Terlalu Muda / Risiko Panggul Sempit)');
      score += 4;
    } else if (data.usiaIbu >= 35) {
      riskFlags.push('Usia ibu ≥ 35 tahun (Terlalu Tua / Risiko Preeklampsia & Kelainan)');
      score += 4;
    }
  }

  // Paritas / Jumlah Kehamilan
  if (data.kehamilanKe !== undefined && data.kehamilanKe >= 5) {
    riskFlags.push('Hamil ke-5 atau lebih (Grande Multipara / Risiko Perdarahan)');
    score += 4;
  }

  // Riwayat Keguguran
  if (data.jumlahKeguguran !== undefined && data.jumlahKeguguran > 0) {
    riskFlags.push(`Pernah mengalami keguguran (${data.jumlahKeguguran}x)`);
    score += 4;
  }

  // Riwayat Caesar
  if (data.riwayatSc) {
    riskFlags.push('Pernah melahirkan secara Operasi Sesar (Bekas SC)');
    score += 8;
  }

  // Jarak Kehamilan
  if (data.jarakKehamilanTerakhir === '< 2 tahun') {
    riskFlags.push('Jarak kehamilan terlalu dekat (< 2 tahun)');
    score += 4;
  } else if (data.jarakKehamilanTerakhir === '> 10 tahun') {
    riskFlags.push('Jarak kehamilan terlalu lama (> 10 tahun)');
    score += 4;
  }

  // Status Gizi (LILA < 23.5 cm)
  if (data.lilaKurang235) {
    riskFlags.push('Lingkar Lengan Atas (LILA) < 23.5 cm (Kurang Energi Kronis / KEK)');
    score += 4;
  }

  // Tinggi Badan
  if (data.tinggiBadan !== undefined && data.tinggiBadan > 0 && data.tinggiBadan < 145) {
    riskFlags.push('Tinggi badan < 145 cm (Risiko Panggul Sempit)');
    score += 4;
  }

  // Penyakit Kronis
  if (data.riwayatPenyakitKronis && data.riwayatPenyakitKronis.length > 0) {
    riskFlags.push(`Riwayat penyakit: ${data.riwayatPenyakitKronis.join(', ')}`);
    score += data.riwayatPenyakitKronis.length * 4;
  }

  // Gejala Risiko Lain
  if (data.faktorRisikoLain && data.faktorRisikoLain.length > 0) {
    riskFlags.push(...data.faktorRisikoLain);
    score += data.faktorRisikoLain.length * 2;
  }

  // 3. PENENTUAN KATEGORI SESUAI WORKFLOW SIAGA BUMIL
  if (dangerFlags.length > 0) {
    recommendations.push(
      '🚨 SEGERA pergi ke Unit Gawat Darurat (IGD) Rumah Sakit atau Puskesmas 24 Jam terdekat!',
      'Hubungi Bidan Siaga atau keluarga untuk segera mendampingi Bunda.',
      'Bawa Buku KIA (buku pink), KTP, dan kartu BPJS/asuransi.',
      'Posisi berbaring miring ke kiri selama perjalanan untuk menjaga pasokan oksigen ke janin.'
    );

    return {
      category: 'danger',
      score,
      dangerFlags,
      riskFlags,
      recommendations,
      headline: 'Ada Tanda Bahaya (Segera ke Faskes)',
      badgeClass: 'bg-rose-100 text-rose-700 border-rose-300'
    };
  }

  if (riskFlags.length > 0 || score > 4) {
    recommendations.push(
      '🌸 Jadwalkan konsultasi langsung dengan Bidan atau Dokter Kandungan dalam 1-2 hari.',
      'Sampaikan keluhan dan faktor risiko yang terdeteksi saat pemeriksaan.',
      'Rutin periksa tekanan darah dan timbang berat badan berkala.',
      'Hindari aktivitas berat, perbanyak istirahat cukup, dan konsumsi gizi seimbang.'
    );

    return {
      category: 'risk',
      score,
      dangerFlags: [],
      riskFlags,
      recommendations,
      headline: 'Ada Faktor Risiko (Konsultasi ke Bidan)',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
    };
  }

  // Risiko Rendah
  recommendations.push(
    '✨ Alhamdulillah! Kondisi kehamilan Bunda saat ini dalam batas normal.',
    'Tetap lakukan Pemeriksaan Kehamilan (ANC) rutin minimal 6x sesuai pedoman Kemenkes.',
    'Konsumsi 1 Tablet Tambah Darah (TTD) setiap malam sebelum tidur dan cukupi asam folat.',
    'Pantau gerakan si kecil setiap hari (minimal 10 gerakan dalam 12 jam pada trimester 3).'
  );

  return {
    category: 'low',
    score,
    dangerFlags: [],
    riskFlags: [],
    recommendations,
    headline: 'Risiko Rendah (Tetap ANC Rutin)',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  };
}
