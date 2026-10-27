export type RiskCategory = 'danger' | 'risk' | 'low';

export interface ScreeningData {
  id: string;
  createdAt: string;
  // Step 1: Consent
  consentGiven: boolean;

  // Step 2: Biodata Bumil
  namaIbu: string;
  usiaIbu: number;
  noHp: string;
  namaSuami: string;
  alamatFaskes: string;

  // Step 3: Riwayat Kehamilan
  usiaKehamilanMinggu: number;
  hpht?: string;
  kehamilanKe: number; // Gravida
  jumlahPersalinan: number; // Para
  jumlahKeguguran: number; // Abortus
  jarakKehamilanTerakhir: string; // e.g. '< 2 tahun', '2-5 tahun', '> 5 tahun', 'Hamil Pertama'
  tinggiBadan?: number; // cm (< 145 cm is risk)
  lilaKurang235: boolean; // Lingkar lengan atas < 23.5 cm (KEK)
  riwayatSc: boolean; // Riwayat operasi sesar
  riwayatPenyakitKronis: string[]; // Hipertensi, DM, Asma, Jantung, TBC

  // Step 4: Checklist Tanda Bahaya & Gejala
  tandaBahayaAkut: string[];
  faktorRisikoLain: string[];

  // Step 5: Keluhan Khusus (highlighted for Midwife)
  keluhanKhusus: string;

  // Computed Risk Result
  kategoriRisiko: RiskCategory;
  skorTotal: number;
  rekomendasiTindakan: string[];
  catatanBidan?: string;
  statusFollowUp?: 'Belum Dihubungi' | 'Sudah Konsultasi WA' | 'Dirujuk ke Faskes' | 'Selesai';
}

export interface DangerSignInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  urgency: 'high' | 'medium';
  action: string;
}

export interface EducationArticle {
  id: string;
  trimester: 'Semua' | 'Trimester 1' | 'Trimester 2' | 'Trimester 3';
  title: string;
  summary: string;
  tips: string[];
  icon: string;
  badge: string;
}
