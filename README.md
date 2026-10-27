# 🌸 SIAGA BUMIL - Sahabat Ibu Hamil & Bidan Pintar

Website interaktif dan edukatif berbasis web untuk **deteksi dini risiko kehamilan**, edukasi tanda bahaya, dan integrasi pemantauan langsung dengan Bidan dan Google Sheet. Dibuat dengan tema **Bidan**, desain **lucu, pastel, dan girl-friendly** yang hangat dan menenangkan bagi calon ibu.

---

## 👩‍⚕️ Profil Inovator & Pengembang Platform

* **Nama:** Nadia Safitri
* **NIM:** 24101005
* **Program Studi:** S1 Kebidanan
* **Semester:** Semester 5
* **Perguruan Tinggi:** Universitas Hang Tuah Pekanbaru
* **Visi & Dedikasi:** Mengintegrasikan ilmu asuhan kebidanan modern dengan teknologi digital yang ramah calon ibu (*girl-friendly*) untuk mempercepat deteksi dini faktor risiko kehamilan dan menurunkan angka morbiditas/mortalitas ibu dan bayi.

---

## 📋 Kesesuaian Alur Sistem dengan Workflow (`workflowsiagabumil.jpeg`)

Aplikasi ini mengimplementasikan 100% alur kerja resmi pada bagan:

1. **Buka SIAGA BUMIL (Lewat link atau QR)**
   - Fitur Generator & Modal QR Code interaktif (`QrCodeModal.tsx`).
   - Dapat dicetak langsung sebagai lembar poster QR untuk meja Bidan / Posyandu.
   - Responsif di layar HP (Mobile-First) dan Desktop.

2. **Baca Info (Edukasi, tanda bahaya)**
   - **10 Tanda Bahaya Kehamilan** lengkap dengan tingkat urgensi (Darurat Kritis vs Waspada Tinggi) dan panduan langkah darurat.
   - **Panduan Trimester 1, 2, 3**: Perubahan tubuh, tips nutrisi janin, aturan minum Tablet Tambah Darah (TTD).
   - **Jadwal 6x ANC Kemenkes RI** (K1-K6).
   - **Kalkulator HPL & Usia Kehamilan**: Perhitungan Rumus Naegele otomatis dengan perumpamaan ukuran buah lucu si kecil.

3. **Klik Mulai Skrining (Formulir di dialog)**
   - Dialog modal multi-step wizard yang mudah digunakan.
   - Dilengkapi progress bar visual persentase penyelesaian.

4. **Isi Formulir (Jawaban dan persetujuan)**
   - **Langkah 1:** Lembar Persetujuan (*Informed Consent*) untuk privasi dan pemantauan medis.
   - **Langkah 2:** Biodata Bunda (Nama, Usia, No. WhatsApp, Nama Suami, Alamat Faskes).
   - **Langkah 3:** Riwayat Kehamilan & Fisik (Usia kehamilan, Gravida, Paritas, Abortus, Riwayat SC, LILA KEK < 23.5 cm, Penyakit Kronis).
   - **Langkah 4:** Checklist Tanda Bahaya Akut & Gejala Risiko.
   - **Langkah 5 (PENTING):** Form **Keluhan Khusus** untuk menuangkan keluhan yang dirasakan saat ini.

5. **Hitung Risiko (Aturan skor di browser)**
   - Algoritma penilaian berbasis standar Bidan Poedji Rochjati & Buku KIA Kemenkes.
   - Dihitung secara instan di sisi browser tanpa delay.
   - Mengelompokkan hasil ke dalam **3 Kategori Resmi**:
     - 🔴 **Ada tanda bahaya** ➔ Rekomendasi: *Segera ke Faskes / IGD* (Tombol Panggilan 119 & WhatsApp Darurat).
     - 🟡 **Ada faktor risiko** ➔ Rekomendasi: *Konsultasi ke Bidan* (Tombol WhatsApp terhubung ke Bidan).
     - 🟢 **Risiko rendah** ➔ Rekomendasi: *Tetap ANC Rutin 6x* (Animasi Confetti perayaan 🎉 & checklist nutrisi).

6. **Sisi Bidan (Google Sheet & Cek Keluhan Khusus)**
   - **Dashboard Portal Bidan**:
     - Rekap statistik pasien hari ini.
     - Filter tingkat risiko & pencarian nama/telepon.
     - **Sorot Keluhan Khusus Pasien**: Bidan dapat langsung membaca keluhan khusus bumil sesuai workflow ("*Bidan cek: Keluhan khusus*").
     - Tombol 1-klik WhatsApp ke ibu hamil dengan template pesan ramah.
     - Pengelolaan status tindak lanjut (*Belum dihubungi*, *Sudah konsultasi WA*, *Dirujuk ke RS*, *Selesai*).
   - **Integrasi Google Sheet**:
     - Webhook otomatis (Google Apps Script).
     - Fitur **Export to CSV / Excel** siap buka di Google Sheets.
     - Template script Google Apps Script siap copy-paste lengkap dengan pewarnaan otomatis (Merah/Kuning/Hijau).

> 📌 **Catatan Disclaimer Medis:**
> *"Hasil adalah skrining awal, bukan diagnosis. Aturan skor dari pedoman bidan."*

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React 18, TypeScript, Vite
- **Styling & Theme:** Tailwind CSS (Custom pastel palette: *bumil-pink*, *bumil-peach*, *bumil-lavender*, *bumil-mint*)
- **Typography:** Quicksand & Nunito (Cute, rounded, readable)
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti, Tailwind keyframes
- **QR Code:** QRCodeSVG
- **Data Persistence:** LocalStorage & Google Sheets Webhook

---

## 🚀 Cara Menjalankan Project

1. Pastikan Node.js sudah terinstal.
2. Buka terminal di folder project ini:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka browser pada URL yang muncul (biasanya `http://localhost:5173`).
