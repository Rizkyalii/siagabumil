import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkflowGuide } from './components/WorkflowGuide';
import { DangerSignsSection } from './components/DangerSignsSection';
import { EducationSection } from './components/EducationSection';
import { CalculatorHPL } from './components/CalculatorHPL';
import { MidwifeBioSection } from './components/MidwifeBioSection';
import { ScreeningModal } from './components/ScreeningModal';
import { ResultModal } from './components/ResultModal';
import { BidanDashboard } from './components/BidanDashboard';
import { QrCodeModal } from './components/QrCodeModal';
import { Footer } from './components/Footer';
import { ScreeningData } from './types';
import { getStoredRecords } from './utils/storage';
import { Sparkles, MessageCircle, Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'edukasi' | 'bahaya' | 'kalkulator' | 'bidan' | 'bio'>('home');
  const [isScreeningOpen, setIsScreeningOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScreeningData | null>(null);
  const [selectedGestationalWeeks, setSelectedGestationalWeeks] = useState<number>(16);

  // Danger count for midwife badge
  const [dangerCount, setDangerCount] = useState(0);

  useEffect(() => {
    const records = getStoredRecords();
    const count = records.filter((r) => r.kategoriRisiko === 'danger').length;
    setDangerCount(count);
  }, [isScreeningOpen, isResultOpen]);

  const handleScreeningComplete = (result: ScreeningData) => {
    setCurrentResult(result);
    setIsResultOpen(true);
  };

  const handleApplyGestationalAge = (weeks: number) => {
    setSelectedGestationalWeeks(weeks);
  };

  return (
    <div className="min-h-screen flex flex-col font-cute selection:bg-pink-200 selection:text-pink-900 bg-gradient-to-br from-[#FFF5F8] via-[#FFF9F6] to-[#F8F5FF]">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenScreening={() => setIsScreeningOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        unreadDangerCount={dangerCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'bidan' ? (
          <BidanDashboard onBackToHome={() => setActiveTab('home')} />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <Hero
                  onStartScreening={() => setIsScreeningOpen(true)}
                  onExploreDangerSigns={() => {
                    const el = document.getElementById('tanda-bahaya');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenCalculator={() => {
                    const el = document.getElementById('kalkulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Workflow Guide: directly represents workflowsiagabumil.jpeg */}
                <WorkflowGuide
                  onStartScreening={() => setIsScreeningOpen(true)}
                  onOpenQr={() => setIsQrOpen(true)}
                  onGoToBidan={() => {
                    setActiveTab('bidan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <DangerSignsSection onStartScreening={() => setIsScreeningOpen(true)} />
                <EducationSection />
                <CalculatorHPL
                  onApplyGestationalAge={handleApplyGestationalAge}
                  onOpenScreening={() => setIsScreeningOpen(true)}
                />
                <MidwifeBioSection
                  onStartScreening={() => setIsScreeningOpen(true)}
                  onGoToBidanPortal={() => {
                    setActiveTab('bidan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}

            {activeTab === 'bahaya' && (
              <div className="pt-4">
                <DangerSignsSection onStartScreening={() => setIsScreeningOpen(true)} />
              </div>
            )}

            {activeTab === 'edukasi' && (
              <div className="pt-4">
                <EducationSection />
              </div>
            )}

            {activeTab === 'kalkulator' && (
              <div className="pt-4">
                <CalculatorHPL
                  onApplyGestationalAge={handleApplyGestationalAge}
                  onOpenScreening={() => setIsScreeningOpen(true)}
                />
              </div>
            )}

            {activeTab === 'bio' && (
              <div className="pt-4">
                <MidwifeBioSection
                  onStartScreening={() => setIsScreeningOpen(true)}
                  onGoToBidanPortal={() => {
                    setActiveTab('bidan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenScreening={() => setIsScreeningOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating CTA for Quick Screening */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsScreeningOpen(true)}
          className="group flex items-center gap-2.5 py-3.5 px-5 rounded-full bg-gradient-to-r from-bumil-pink-500 via-pink-500 to-rose-400 hover:from-bumil-pink-600 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-cute-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all border-2 border-white"
          title="Mulai Skrining Mandiri"
        >
          <Sparkles className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">🌸 Skrining Mandiri</span>
          <span className="sm:hidden font-bold">Skrining</span>
        </button>
      </div>

      {/* Modals */}
      <ScreeningModal
        isOpen={isScreeningOpen}
        onClose={() => setIsScreeningOpen(false)}
        onComplete={handleScreeningComplete}
        initialGestationalWeeks={selectedGestationalWeeks}
      />

      <ResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        resultData={currentResult}
        onOpenBidanPortal={() => {
          setIsResultOpen(false);
          setActiveTab('bidan');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

    </div>
  );
}

export default App;
