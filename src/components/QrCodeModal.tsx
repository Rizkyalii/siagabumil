import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Printer, QrCode, Heart, Sparkles } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://siagabumil.id';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-pink-100 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-400 to-rose-300 text-white rounded-2xl shadow-md mb-3">
            <QrCode className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-1.5">
            Buka SIAGA BUMIL <Sparkles className="w-4 h-4 text-pink-500 fill-pink-400" />
          </h3>
          <p className="text-xs sm:text-sm text-pink-600 font-medium mt-1">
            Lewat Link atau Scan QR Code
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Tampilkan di Posyandu / Meja Bidan agar Bunda mudah mengakses skrining mandiri
          </p>
        </div>

        {/* QR Code Container with Cute Border */}
        <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-pink-50 to-white rounded-2xl border-2 border-dashed border-pink-200 mb-5 shadow-inner">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-pink-100">
            <QRCodeSVG
              value={currentUrl}
              size={180}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e84583'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
                x: undefined,
                y: undefined,
                height: 32,
                width: 32,
                excavate: true,
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-pink-600">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>Scan dengan Kamera HP Bunda</span>
          </div>
        </div>

        {/* Link Field with Copy */}
        <div className="flex items-center gap-2 bg-pink-50/60 p-2 rounded-xl border border-pink-200 mb-5">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-gray-700 outline-none px-2 font-mono truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Disalin!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Salin Link
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-pink-300 text-pink-600 font-bold text-xs sm:text-sm hover:bg-pink-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> Cetak Lembar QR
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
