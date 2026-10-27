import { ScreeningData } from '../types';

const STORAGE_KEY = 'siaga_bumil_records_v1';
const MIDWIFE_SETTINGS_KEY = 'siaga_bumil_midwife_settings';

export interface MidwifeSettings {
  midwifeName: string;
  midwifePhone: string; // WhatsApp number
  clinicName: string;
  googleSheetWebhookUrl: string;
}

const DEFAULT_SETTINGS: MidwifeSettings = {
  midwifeName: 'Bidan Nadia Safitri',
  midwifePhone: '6281234567890',
  clinicName: 'Klinik Bidan Nadia Safitri • Univ. Hang Tuah Pekanbaru',
  googleSheetWebhookUrl: '',
};

const SAMPLE_RECORDS: ScreeningData[] = [
  {
    id: 'BUMIL-001',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    consentGiven: true,
    namaIbu: 'Siti Rahmawati',
    usiaIbu: 26,
    noHp: '081298765432',
    namaSuami: 'Ahmad Fauzi',
    alamatFaskes: 'Kel. Sukamaju, RT 02/04',
    usiaKehamilanMinggu: 32,
    kehamilanKe: 2,
    jumlahPersalinan: 1,
    jumlahKeguguran: 0,
    jarakKehamilanTerakhir: '2-5 tahun',
    tinggiBadan: 155,
    lilaKurang235: false,
    riwayatSc: false,
    riwayatPenyakitKronis: [],
    tandaBahayaAkut: ['Perdarahan atau flek merah segar dari jalan lahir'],
    faktorRisikoLain: [],
    keluhanKhusus: 'Keluar flek merah segar sejak tadi pagi setelah menyapu, perut bagian bawah kencang-kencang.',
    kategoriRisiko: 'danger',
    skorTotal: 10,
    rekomendasiTindakan: [
      'Segera ke IGD Rumah Sakit / Puskesmas PONED!',
      'Hubungi Bidan Siaga segera.'
    ],
    statusFollowUp: 'Belum Dihubungi',
    catatanBidan: 'Perlu segera ditelepon dan disarankan ke IGD terdekat.'
  },
  {
    id: 'BUMIL-002',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    consentGiven: true,
    namaIbu: 'Dewi Anggraini',
    usiaIbu: 36,
    noHp: '085712348899',
    namaSuami: 'Budi Santoso',
    alamatFaskes: 'Komplek Harapan Indah No. 12',
    usiaKehamilanMinggu: 24,
    kehamilanKe: 3,
    jumlahPersalinan: 2,
    jumlahKeguguran: 0,
    jarakKehamilanTerakhir: '> 5 tahun',
    tinggiBadan: 150,
    lilaKurang235: true,
    riwayatSc: false,
    riwayatPenyakitKronis: ['Hipertensi'],
    tandaBahayaAkut: [],
    faktorRisikoLain: ['Bengkak pada wajah dan kedua tangan di pagi hari', 'Sering pusing berputar, muka pucat, bibir pucat (gejala anemia)'],
    keluhanKhusus: 'Sering pusing kalau bangun tidur, kaki dan jari tangan agak bengkak cincin jadi sempit.',
    kategoriRisiko: 'risk',
    skorTotal: 14,
    rekomendasiTindakan: [
      'Jadwalkan konsultasi dengan Bidan atau Dokter dalam 1-2 hari.',
      'Cek tensi dan tes protein urin.'
    ],
    statusFollowUp: 'Sudah Konsultasi WA',
    catatanBidan: 'Sudah di-chat via WA, disarankan cek tensi besok pagi di klinik.'
  },
  {
    id: 'BUMIL-003',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    consentGiven: true,
    namaIbu: 'Anisa Putri',
    usiaIbu: 25,
    noHp: '087855443322',
    namaSuami: 'Rian Pratama',
    alamatFaskes: 'Jl. Mawar No. 8',
    usiaKehamilanMinggu: 16,
    kehamilanKe: 1,
    jumlahPersalinan: 0,
    jumlahKeguguran: 0,
    jarakKehamilanTerakhir: 'Hamil Pertama',
    tinggiBadan: 160,
    lilaKurang235: false,
    riwayatSc: false,
    riwayatPenyakitKronis: [],
    tandaBahayaAkut: [],
    faktorRisikoLain: [],
    keluhanKhusus: 'Nafsu makan sudah membaik, kadang pegal di pinggang ringan setelah beraktivitas.',
    kategoriRisiko: 'low',
    skorTotal: 2,
    rekomendasiTindakan: [
      'Tetap ANC rutin minimal 6x sesuai pedoman Kemenkes.',
      'Rutin konsumsi TTD dan asam folat.'
    ],
    statusFollowUp: 'Selesai',
    catatanBidan: 'Kondisi stabil, jadwal ANC berikutnya tanggal 15 bulan depan.'
  }
];

export function getStoredRecords(): ScreeningData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RECORDS));
      return SAMPLE_RECORDS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading records:', e);
    return SAMPLE_RECORDS;
  }
}

export function saveScreeningRecord(record: ScreeningData): void {
  try {
    const existing = getStoredRecords();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving record:', e);
  }
}

export function updateRecordFollowUp(
  id: string,
  status: ScreeningData['statusFollowUp'],
  note?: string
): void {
  try {
    const existing = getStoredRecords();
    const updated = existing.map((rec) => {
      if (rec.id === id) {
        return {
          ...rec,
          statusFollowUp: status,
          catatanBidan: note !== undefined ? note : rec.catatanBidan,
        };
      }
      return rec;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating record:', e);
  }
}

export function deleteRecord(id: string): void {
  try {
    const existing = getStoredRecords();
    const filtered = existing.filter((rec) => rec.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting record:', e);
  }
}

export function getMidwifeSettings(): MidwifeSettings {
  try {
    const raw = localStorage.getItem(MIDWIFE_SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(MIDWIFE_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveMidwifeSettings(settings: MidwifeSettings): void {
  try {
    localStorage.setItem(MIDWIFE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving midwife settings:', e);
  }
}

export function exportRecordsToCSV(records: ScreeningData[]): void {
  const headers = [
    'ID Skrining',
    'Tanggal & Waktu',
    'Nama Ibu',
    'Usia Ibu (th)',
    'No WhatsApp',
    'Nama Suami',
    'Alamat / Faskes',
    'Usia Kehamilan (mgg)',
    'Gravida (Hamil Ke)',
    'Kategori Risiko',
    'Skor',
    'Keluhan Khusus',
    'Tanda Bahaya',
    'Faktor Risiko',
    'Status Follow-Up',
    'Catatan Bidan'
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${new Date(r.createdAt).toLocaleString('id-ID')}"`,
    `"${r.namaIbu}"`,
    r.usiaIbu,
    `"${r.noHp}"`,
    `"${r.namaSuami}"`,
    `"${r.alamatFaskes.replace(/"/g, '""')}"`,
    r.usiaKehamilanMinggu,
    r.kehamilanKe,
    `"${r.kategoriRisiko === 'danger' ? 'Ada Tanda Bahaya' : r.kategoriRisiko === 'risk' ? 'Ada Faktor Risiko' : 'Risiko Rendah'}"`,
    r.skorTotal,
    `"${(r.keluhanKhusus || '').replace(/"/g, '""')}"`,
    `"${(r.tandaBahayaAkut || []).join('; ').replace(/"/g, '""')}"`,
    `"${(r.faktorRisikoLain || []).join('; ').replace(/"/g, '""')}"`,
    `"${r.statusFollowUp || 'Belum Dihubungi'}"`,
    `"${(r.catatanBidan || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Skrining_SiagaBumil_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
