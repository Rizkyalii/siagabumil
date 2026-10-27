import { ScreeningData } from '../types';

export async function syncToGoogleSheet(
  record: ScreeningData,
  webhookUrl: string
): Promise<{ success: boolean; message: string }> {
  if (!webhookUrl || !webhookUrl.trim().startsWith('http')) {
    return {
      success: false,
      message: 'URL Google Sheet webhook belum dikonfigurasi di Pengaturan Bidan.',
    };
  }

  try {
    const payload = {
      id: record.id,
      timestamp: new Date(record.createdAt).toLocaleString('id-ID'),
      namaIbu: record.namaIbu,
      usiaIbu: record.usiaIbu,
      noHp: record.noHp,
      namaSuami: record.namaSuami,
      alamatFaskes: record.alamatFaskes,
      usiaKehamilanMinggu: record.usiaKehamilanMinggu,
      kehamilanKe: record.kehamilanKe,
      kategoriRisiko:
        record.kategoriRisiko === 'danger'
          ? 'Ada Tanda Bahaya'
          : record.kategoriRisiko === 'risk'
          ? 'Ada Faktor Risiko'
          : 'Risiko Rendah',
      skorTotal: record.skorTotal,
      keluhanKhusus: record.keluhanKhusus || '-',
      tandaBahaya: (record.tandaBahayaAkut || []).join('; ') || '-',
      faktorRisiko: (record.faktorRisikoLain || []).join('; ') || '-',
    };

    // Google Apps Script requires text/plain or no-cors mode for cross-origin POST
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Berhasil dikirim ke Google Sheet Bidan!',
    };
  } catch (error) {
    console.warn('Google Sheet sync error:', error);
    return {
      success: false,
      message: 'Gagal mengirim data ke Google Sheet. Periksa koneksi atau URL Webhook.',
    };
  }
}

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * ===================================================
 * SCRIPT GOOGLE APPS SCRIPT - SIAGA BUMIL SISI BIDAN
 * ===================================================
 * CARA PEMASANGAN:
 * 1. Buka Google Sheets baru di browser Bunda/Bidan (sheet.new)
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script"
 * 3. Hapus semua kode yang ada, lalu paste seluruh kode di bawah ini
 * 4. Klik tombol "Simpan" (ikon disket)
 * 5. Klik tombol "Terapkan" (Deploy) di kanan atas > "Penerapan Baru" (New deployment)
 * 6. Pilih jenis: "Aplikasi Web" (Web app)
 * 7. Konfigurasi:
 *    - Deskripsi: Siaga Bumil Webhook
 *    - Jalankan sebagai: "Saya" (Me)
 *    - Siapa yang memiliki akses: "Siapa saja" (Anyone)
 * 8. Klik "Terapkan" (Deploy) & Izinkan akses (Authorize Access)
 * 9. Salin URL Aplikasi Web yang dihasilkan (berakhiran /exec)
 * 10. Buka website Siaga Bumil > Portal Bidan > Pengaturan Bidan > Paste URL tersebut!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Siapkan Header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Skrining",
        "Waktu Submit",
        "Nama Ibu",
        "Usia (th)",
        "No WhatsApp",
        "Nama Suami",
        "Alamat / Faskes",
        "Usia Hamil (mgg)",
        "Hamil Ke-",
        "Kategori Risiko",
        "Skor",
        "KELUHAN KHUSUS (PENTING)",
        "Tanda Bahaya Akut",
        "Faktor Risiko Lain"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setBackground("#FCE4EC"); // Pink pastel
      headerRange.setFontWeight("bold");
      headerRange.setFontColor("#C2185B");
    }
    
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    sheet.appendRow([
      data.id || "",
      data.timestamp || new Date().toLocaleString("id-ID"),
      data.namaIbu || "",
      data.usiaIbu || "",
      data.noHp || "",
      data.namaSuami || "",
      data.alamatFaskes || "",
      data.usiaKehamilanMinggu || "",
      data.kehamilanKe || "",
      data.kategoriRisiko || "",
      data.skorTotal || 0,
      data.keluhanKhusus || "-",
      data.tandaBahaya || "-",
      data.faktorRisiko || "-"
    ]);
    
    var lastRow = sheet.getLastRow();
    
    // Beri warna baris berdasarkan risiko
    var rowRange = sheet.getRange(lastRow, 1, 1, 14);
    if (data.kategoriRisiko === "Ada Tanda Bahaya") {
      rowRange.setBackground("#FFEBEE"); // Merah lembut
    } else if (data.kategoriRisiko === "Ada Faktor Risiko") {
      rowRange.setBackground("#FFF8E1"); // Kuning lembut
    } else {
      rowRange.setBackground("#E8F5E9"); // Hijau lembut
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
