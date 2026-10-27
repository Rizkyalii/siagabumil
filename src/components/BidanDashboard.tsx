import React, { useState, useEffect } from 'react';
import { Stethoscope, FileSpreadsheet, Search, Filter, MessageCircle, AlertCircle, ShieldAlert, CheckCircle, ExternalLink, Settings, Download, RefreshCw, Trash2, Edit3, X, Copy, Check } from 'lucide-react';
import { ScreeningData } from '../types';
import {
  getStoredRecords,
  updateRecordFollowUp,
  deleteRecord,
  getMidwifeSettings,
  saveMidwifeSettings,
  exportRecordsToCSV,
  MidwifeSettings,
} from '../utils/storage';
import { syncToGoogleSheet, GOOGLE_APPS_SCRIPT_TEMPLATE } from '../utils/googleSheets';

interface BidanDashboardProps {
  onBackToHome: () => void;
}

export const BidanDashboard: React.FC<BidanDashboardProps> = ({ onBackToHome }) => {
  const [records, setRecords] = useState<ScreeningData[]>([]);
  const [settings, setSettings] = useState<MidwifeSettings>(getMidwifeSettings());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'danger' | 'risk' | 'low'>('all');
  const [onlySpecialComplaints, setOnlySpecialComplaints] = useState(false);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScriptGuideOpen, setIsScriptGuideOpen] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState<string>('');

  useEffect(() => {
    loadRecords();
    setSettings(getMidwifeSettings());
  }, []);

  const loadRecords = () => {
    setRecords(getStoredRecords());
  };

  const handleStatusChange = (id: string, newStatus: ScreeningData['statusFollowUp']) => {
    updateRecordFollowUp(id, newStatus);
    loadRecords();
  };

  const handleSaveNote = (id: string) => {
    updateRecordFollowUp(id, undefined, tempNote);
    setEditingNoteId(null);
    setTempNote('');
    loadRecords();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus data skrining ini?')) {
      deleteRecord(id);
      loadRecords();
    }
  };

  const handleSyncRecordToSheet = async (record: ScreeningData) => {
    if (!settings.googleSheetWebhookUrl) {
      alert('Silakan isi Webhook URL Google Sheet di menu Pengaturan Bidan terlebih dahulu.');
      setIsSettingsOpen(true);
      return;
    }
    setSyncStatus(`Mengirim ID ${record.id}...`);
    const res = await syncToGoogleSheet(record, settings.googleSheetWebhookUrl);
    setSyncStatus(res.message);
    setTimeout(() => setSyncStatus(''), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveMidwifeSettings(settings);
    setIsSettingsOpen(false);
    alert('Pengaturan Bidan berhasil disimpan!');
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Filtered list
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.namaIbu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.noHp.includes(searchQuery) ||
      r.alamatFaskes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || r.kategoriRisiko === filterCategory;

    const matchesComplaints = !onlySpecialComplaints || (r.keluhanKhusus && r.keluhanKhusus.length > 5);

    return matchesSearch && matchesCategory && matchesComplaints;
  });

  const countDanger = records.filter((r) => r.kategoriRisiko === 'danger').length;
  const countRisk = records.filter((r) => r.kategoriRisiko === 'risk').length;
  const countLow = records.filter((r) => r.kategoriRisiko === 'low').length;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Midwife Portal Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-bumil-pink-600 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-cute-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-pink-100 mb-3 border border-white/20">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Sisi Bidan • Modul Integrasi Google Sheet & Cek Keluhan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {settings.clinicName}
            </h1>
            <p className="text-sm text-pink-100 mt-1 font-medium">
              Bidan Pembina: <b>{settings.midwifeName}</b> • WhatsApp: <b>{settings.midwifePhone}</b>
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/30 transition-colors"
            >
              <Settings className="w-4 h-4" /> Pengaturan Bidan
            </button>
            <button
              onClick={() => setIsScriptGuideOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-white text-purple-800 hover:bg-pink-50 text-xs font-extrabold flex items-center gap-2 shadow-sm transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Script Google Sheet
            </button>
            <button
              onClick={() => exportRecordsToCSV(records)}
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {syncStatus && (
          <div className="mt-4 p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/30 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{syncStatus}</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => setFilterCategory('all')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            filterCategory === 'all'
              ? 'bg-purple-50 border-purple-400 shadow-sm'
              : 'bg-white border-pink-100 hover:border-purple-200'
          }`}
        >
          <span className="text-xs font-bold text-gray-500 block">Total Pasien Terdaftar</span>
          <span className="text-2xl font-black text-gray-800 mt-1 block">{records.length}</span>
          <span className="text-[10px] text-purple-600 font-semibold">Semua Riwayat Skrining</span>
        </div>

        <div
          onClick={() => setFilterCategory('danger')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            filterCategory === 'danger'
              ? 'bg-rose-50 border-rose-400 shadow-sm'
              : 'bg-white border-pink-100 hover:border-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 block">Ada Tanda Bahaya</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl font-black text-rose-700 mt-1 block">{countDanger}</span>
          <span className="text-[10px] text-rose-600 font-semibold">Perlu Segera ke Faskes / IGD</span>
        </div>

        <div
          onClick={() => setFilterCategory('risk')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            filterCategory === 'risk'
              ? 'bg-amber-50 border-amber-400 shadow-sm'
              : 'bg-white border-pink-100 hover:border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 block">Ada Faktor Risiko</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-800 mt-1 block">{countRisk}</span>
          <span className="text-[10px] text-amber-700 font-semibold">Konsultasikan ke Bidan</span>
        </div>

        <div
          onClick={() => setFilterCategory('low')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            filterCategory === 'low'
              ? 'bg-emerald-50 border-emerald-400 shadow-sm'
              : 'bg-white border-pink-100 hover:border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 block">Risiko Rendah</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-800 mt-1 block">{countLow}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Pantau ANC Rutin 6x</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama ibu, nomor WA, faskes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:border-bumil-pink-500 focus:outline-none text-xs font-semibold"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-2 p-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 cursor-pointer">
            <input
              type="checkbox"
              checked={onlySpecialComplaints}
              onChange={(e) => setOnlySpecialComplaints(e.target.checked)}
              className="accent-purple-600 rounded"
            />
            <span>Sorot Keluhan Khusus Pasien</span>
          </label>

          <button
            onClick={loadRecords}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-bold flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Patient Cards / Table List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-pink-200">
            <Stethoscope className="w-12 h-12 mx-auto text-pink-300 mb-2" />
            <p className="text-sm font-bold text-gray-700">Tidak ada data pasien yang sesuai filter</p>
            <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian atau ubah filter.</p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isDanger = record.kategoriRisiko === 'danger';
            const isRisk = record.kategoriRisiko === 'risk';

            const cleanPhone = record.noHp.replace(/\D/g, '').replace(/^0/, '62');
            const waChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Halo Bunda ${record.namaIbu}, saya ${settings.midwifeName} dari ${settings.clinicName}. ` +
              `Saya membaca data skrining mandiri SIAGA BUMIL Bunda dengan hasil *${
                isDanger ? 'Ada Tanda Bahaya' : isRisk ? 'Ada Faktor Risiko' : 'Risiko Rendah'
              }*. ` +
              `Bagaimana kondisi Bunda saat ini? Terkait keluhan khusus: "${record.keluhanKhusus}", mari kita jadwalkan konsultasi ya Bunda.`
            )}`;

            return (
              <div
                key={record.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-sm hover:shadow-cute ${
                  isDanger
                    ? 'border-rose-300 bg-gradient-to-r from-rose-50/40 via-white to-white'
                    : isRisk
                    ? 'border-amber-300 bg-gradient-to-r from-amber-50/30 via-white to-white'
                    : 'border-pink-100'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  {/* Left: Patient Primary Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                        {record.id}
                      </span>
                      
                      <span
                        className={`text-xs font-black uppercase px-3 py-0.5 rounded-full ${
                          isDanger
                            ? 'bg-rose-100 text-rose-700 border border-rose-300'
                            : isRisk
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {isDanger ? 'Ada Tanda Bahaya (Segera ke Faskes)' : isRisk ? 'Ada Faktor Risiko (Konsultasi)' : 'Risiko Rendah'}
                      </span>

                      <span className="text-[11px] text-gray-400">
                        {new Date(record.createdAt).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                        {record.namaIbu}
                        <span className="text-xs font-semibold text-gray-500">
                          ({record.usiaIbu} tahun)
                        </span>
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">
                        Suami: <b>{record.namaSuami}</b> • WhatsApp: <b>{record.noHp}</b> • Alamat: <b>{record.alamatFaskes}</b>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-600">
                      <span className="bg-pink-50 text-pink-700 px-2.5 py-1 rounded-xl">
                        Usia Hamil: {record.usiaKehamilanMinggu} Minggu
                      </span>
                      <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-xl">
                        Gravida: Hamil ke-{record.kehamilanKe}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-xl">
                        Skor: {record.skorTotal} Poin
                      </span>
                    </div>

                    {/* Sisi Bidan - Sorot Keluhan Khusus (PENTING SESUAI WORKFLOW) */}
                    <div className="mt-3 p-3.5 bg-gradient-to-r from-purple-50/80 to-pink-50/50 rounded-2xl border-2 border-purple-200">
                      <span className="text-[11px] font-black uppercase text-purple-800 flex items-center gap-1.5 mb-1">
                        <span>🔍 Bidan Cek Keluhan Khusus Pasien:</span>
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-purple-950 italic">
                        "{record.keluhanKhusus || 'Tidak ada keluhan khusus'}"
                      </p>
                    </div>

                    {/* Specific Flags */}
                    {record.tandaBahayaAkut && record.tandaBahayaAkut.length > 0 && (
                      <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800 font-semibold space-y-1">
                        <span className="font-bold text-rose-700 block">🚨 Tanda Bahaya Akut Terdeteksi:</span>
                        {record.tandaBahayaAkut.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span>•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {record.faktorRisikoLain && record.faktorRisikoLain.length > 0 && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-semibold space-y-1">
                        <span className="font-bold text-amber-700 block">⚠️ Faktor Risiko:</span>
                        {record.faktorRisikoLain.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span>•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Midwife Notes Box */}
                    <div className="pt-2">
                      {editingNoteId === record.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            placeholder="Tulis catatan tindak lanjut bidan..."
                            className="flex-1 px-3 py-1.5 rounded-xl border border-purple-300 text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveNote(record.id)}
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-1.5 text-gray-400 text-xs"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2 rounded-xl">
                          <span>
                            <b>Catatan Bidan:</b> {record.catatanBidan || 'Belum ada catatan internal.'}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNoteId(record.id);
                              setTempNote(record.catatanBidan || '');
                            }}
                            className="text-purple-600 font-bold hover:underline ml-2"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right: Follow-up & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
                    
                    {/* Status Select */}
                    <div className="w-full sm:w-auto">
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Status Tindak Lanjut:
                      </label>
                      <select
                        value={record.statusFollowUp || 'Belum Dihubungi'}
                        onChange={(e) =>
                          handleStatusChange(
                            record.id,
                            e.target.value as ScreeningData['statusFollowUp']
                          )
                        }
                        className="w-full text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-400"
                      >
                        <option value="Belum Dihubungi">🔴 Belum Dihubungi</option>
                        <option value="Sudah Konsultasi WA">💬 Sudah Konsultasi WA</option>
                        <option value="Dirujuk ke Faskes">🏥 Dirujuk ke Faskes/RS</option>
                        <option value="Selesai">✅ Selesai</option>
                      </select>
                    </div>

                    {/* WhatsApp Action */}
                    <a
                      href={waChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Hubungi WhatsApp Ibu
                    </a>

                    {/* Sync to Google Sheet */}
                    <button
                      onClick={() => handleSyncRecordToSheet(record)}
                      className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      title="Kirim ke Google Sheet"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sync ke Google Sheet</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="py-1.5 px-3 rounded-xl hover:bg-rose-50 text-rose-500 text-xs font-bold flex items-center justify-center gap-1 transition-colors self-end"
                      title="Hapus riwayat"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL PENGATURAN BIDAN */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-purple-100">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-1">
              <Settings className="w-5 h-5 text-purple-600" />
              Pengaturan Bidan & Google Sheet
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Sesuaikan identitas klinik dan sambungkan Google Sheet untuk sinkronisasi otomatis.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Bidan Pembina
                </label>
                <input
                  type="text"
                  value={settings.midwifeName}
                  onChange={(e) => setSettings({ ...settings, midwifeName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nomor WhatsApp Bidan (untuk Konsultasi Bumil)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 6281234567890"
                  value={settings.midwifePhone}
                  onChange={(e) => setSettings({ ...settings, midwifePhone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Fasilitas Kesehatan / Posyandu
                </label>
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    URL Webhook Google Apps Script
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingsOpen(false);
                      setIsScriptGuideOpen(true);
                    }}
                    className="text-[11px] font-bold text-purple-600 hover:underline"
                  >
                    Cara Buat URL ➔
                  </button>
                </div>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={settings.googleSheetWebhookUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, googleSheetWebhookUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Jika diisi, setiap kali bumil submit skrining, data langsung tersimpan ke Google Sheet Bidan!
                </p>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SCRIPT GOOGLE APPS SCRIPT GUIDE */}
      {isScriptGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-purple-100 my-8">
            <button
              onClick={() => setIsScriptGuideOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800">
                  Integrasi Google Sheet Sisi Bidan
                </h3>
                <p className="text-xs text-gray-500">
                  Panduan 1 menit untuk menghubungkan website dengan Google Sheets milik Bidan.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-5 text-xs text-gray-700 leading-relaxed bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
              <p className="font-bold text-purple-900">Langkah Pemasangan Mudah:</p>
              <ol className="list-decimal list-inside space-y-1.5 pl-1">
                <li>Buka Google Sheet baru di browser (ketik <b>sheet.new</b>).</li>
                <li>Klik menu <b>Ekstensi (Extensions) &gt; Apps Script</b>.</li>
                <li>Hapus kode bawaan, lalu paste seluruh script di bawah ini.</li>
                <li>Klik tombol <b>Simpan</b> (ikon disket).</li>
                <li>Klik tombol <b>Terapkan (Deploy) &gt; Penerapan baru (New deployment)</b>.</li>
                <li>Pilih jenis <b>Aplikasi Web (Web App)</b>, atur akses ke: <b>Siapa saja (Anyone)</b>.</li>
                <li>Salin link URL Webhook yang dihasilkan (berakhiran <code className="bg-white px-1 rounded">/exec</code>).</li>
                <li>Masukkan link tersebut ke menu <b>Pengaturan Bidan</b> di website ini. Selesai!</li>
              </ol>
            </div>

            {/* Code Snippet Box */}
            <div className="relative mb-5">
              <pre className="p-4 bg-slate-900 text-pink-300 rounded-2xl text-[11px] font-mono h-48 overflow-y-auto leading-normal">
                {GOOGLE_APPS_SCRIPT_TEMPLATE}
              </pre>
              <button
                onClick={handleCopyScript}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Salin Seluruh Script
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsScriptGuideOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
              >
                Buka Pengaturan & Tempel Link Webhook
              </button>
              <button
                onClick={() => setIsScriptGuideOpen(false)}
                className="py-2.5 px-5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
