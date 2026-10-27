export interface MidwifeBiography {
  nama: string;
  nim: string;
  prodi: string;
  semester: string;
  universitas: string;
  role: string;
  salamPembuka: string;
  visiMisi: string;
  kompetensi: string[];
  kontak: {
    email: string;
    whatsapp: string;
    kampus: string;
  };
}

export const MIDWIFE_DATA: MidwifeBiography = {
  nama: 'Nadia Safitri',
  nim: '24101005',
  prodi: 'S1 Kebidanan',
  semester: 'Semester 5',
  universitas: 'Universitas Hang Tuah Pekanbaru',
  role: 'Inovator & Pengembang Konsep SIAGA BUMIL',
  salamPembuka:
    'Halo Bunda Cantik dan Rekan Sejawat! Saya Nadia Safitri, mahasiswi S1 Kebidanan Universitas Hang Tuah Pekanbaru. Platform SIAGA BUMIL ini saya gagas dan kembangkan dengan sepenuh hati sebagai wujud nyata dedikasi ilmu kebidanan modern untuk mendampingi setiap langkah kehamilan Bunda agar sehat, tenang, dan bahagia.',
  visiMisi:
    'Mewujudkan layanan skrining dini kehamilan yang mudah diakses, ramah calon ibu (girl-friendly), dan terintegrasi langsung dengan pemantauan Bidan demi keselamatan ibu dan buah hati tercinta.',
  kompetensi: [
    'Asuhan Kebidanan Antenatal (ANC Terpadu)',
    'Deteksi Dini & Skrining Kehamilan Risiko Tinggi',
    'Konseling & Komunikasi Terapeutik Kebidanan',
    'Pemberdayaan Ibu Hamil & Edukasi Nutrisi Janin',
    'Digitalisasi Layanan Rekam Medis Bidan'
  ],
  kontak: {
    email: 'nadiasafitri@student.hangtuahpekanbaru.ac.id',
    whatsapp: '6285263035461',
    kampus: 'Fakultas Kesehatan, Universitas Hang Tuah Pekanbaru'
  }
};
