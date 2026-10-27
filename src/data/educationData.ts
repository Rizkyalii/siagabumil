import { EducationArticle } from '../types';

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'trimester-1',
    trimester: 'Trimester 1',
    title: 'Trimester Pertama (Minggu 1 - 12): Fondasi Awal Si Kecil',
    summary: 'Masa pembentukan organ vital janin (organogenesis). Bunda mungkin mengalami morning sickness dan perubahan hormon.',
    badge: 'Minggu 1-12',
    icon: '🌱',
    tips: [
      'Konsumsi Asam Folat minimal 400 mcg setiap hari untuk mencegah cacat tabung saraf janin.',
      'Makan porsi kecil tapi sering (small frequent feeding) untuk mengatasi mual.',
      'Hindari makanan mentah/setengah matang dan minuman berkafein berlebih.',
      'Jadwalkan pemeriksaan ANC pertama (K1) ke dokter/bidan termasuk tes laboratorium dasar.'
    ]
  },
  {
    id: 'trimester-2',
    trimester: 'Trimester 2',
    title: 'Trimester Kedua (Minggu 13 - 27): Masa Keemasan Kehamilan',
    summary: 'Mual mulai berkurang, energi mulai pulih, dan Bunda akan mulai merasakan gerakan tendangan kecil pertama si buah hati (quickening).',
    badge: 'Minggu 13-27',
    icon: '🌸',
    tips: [
      'Rutin minum Tablet Tambah Darah (TTD) 1 tablet per hari dengan air putih / jus jeruk, bukan teh/kopi.',
      'Mulai tidur dengan posisi miring ke kiri untuk melancarkan sirkulasi darah ke plasenta.',
      'Senam hamil ringan atau jalan pagi santai 20-30 menit.',
      'USG skrining anatomi janin di faskes pada usia kehamilan 18-22 minggu.'
    ]
  },
  {
    id: 'trimester-3',
    trimester: 'Trimester 3',
    title: 'Trimester Ketiga (Minggu 28 - 40): Menanti Sang Buah Hati',
    summary: 'Janin bertumbuh pesat dan bersiap untuk posisi lahir. Bunda perlu waspada tanda bahaya dan menyiapkan persalinan.',
    badge: 'Minggu 28-40',
    icon: '🧸',
    tips: [
      'Hitung gerakan janin setiap hari (Kick Counter): minimal 10 kali gerakan dalam 12 jam.',
      'Siapkan perlengkapan persalinan (Tas Siaga Melahirkan / Hospital Bag).',
      'Tentukan penolong persalinan (Bidan / Dokter), tempat bersalin, dan calon pendonor darah siaga.',
      'Kenali tanda awal persalinan: kontraksi teratur makin sering dan kuat disertai lendir darah.'
    ]
  },
  {
    id: 'anc-schedule',
    trimester: 'Semua',
    title: 'Jadwal 6x Pemeriksaan Kehamilan (Standar Kemenkes RI)',
    summary: 'Pemeriksaan antenatal care (ANC) berkualitas minimal 6 kali selama masa kehamilan untuk keselamatan ibu dan bayi.',
    badge: 'Standar Kemenkes',
    icon: '🩺',
    tips: [
      'K1 (Trimester 1 - sebelum 12 minggu): 1x periksa oleh Dokter SpOG/Dokter Umum untuk USG & cek lab lengkap.',
      'K2 (Trimester 2 - minggu 13-27): 1x periksa oleh Bidan / Dokter.',
      'K3 & K4 (Trimester 3 - minggu 28-36): 2x periksa oleh Bidan / Dokter.',
      'K5 & K6 (Trimester 3 - minggu 37-40): 2x periksa, minimal 1x oleh Dokter untuk skrining rencana persalinan.'
    ]
  }
];

export const NUTRITION_TIPS = [
  {
    title: 'Zat Besi & Asam Folat',
    desc: 'Bayam, hati ayam, telur, kacang-kacangan, dan TTD untuk mencegah anemia & BBLR.',
    icon: '🥬'
  },
  {
    title: 'Kalsium & Vitamin D',
    desc: 'Susu ibu hamil, yogurt, keju, ikan teri, dan tahu tempe untuk pembentukan tulang & gigi janin.',
    icon: '🥛'
  },
  {
    title: 'Protein Berkualitas',
    desc: 'Ikan kembung, ayam tanpa lemak, telur rebus, dan kacang edamame untuk perkembangan otak janin.',
    icon: '🥚'
  },
  {
    title: 'Hidrasi Cukup',
    desc: 'Minum air putih minimal 2.5 - 3 liter per hari untuk menjaga volume cairan ketuban tetap optimal.',
    icon: '💧'
  }
];
