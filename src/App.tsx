import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { QuranStateProvider } from './context/QuranStateContext';
import { AndroidPhoneFrame } from './components/AndroidPhoneFrame';
import { HomeScreen } from './components/HomeScreen';
import { SurahReader } from './components/SurahReader';
import { AzkarScreen } from './components/AzkarScreen';
import { BookmarksScreen } from './components/BookmarksScreen';
import { AudioPlayerBottomBar } from './components/AudioPlayerBottomBar';
import { AndroidCodeExportModal } from './components/AndroidCodeExportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'azkar' | 'bookmarks'>('home');
  const [activeSurahNumber, setActiveSurahNumber] = useState<number | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const handleSelectSurah = (surahNumber: number) => {
    setActiveSurahNumber(surahNumber);
  };

  const handleBackToHome = () => {
    setActiveSurahNumber(null);
  };

  return (
    <QuranStateProvider>
      <AudioProvider>
        <AndroidPhoneFrame
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setActiveSurahNumber(null); // Return to main view of the tab
          }}
          onOpenCodeExport={() => setIsCodeModalOpen(true)}
        >
          {/* Main Display Logic */}
          {activeSurahNumber !== null ? (
            <SurahReader
              surahNumber={activeSurahNumber}
              onBack={handleBackToHome}
              onNavigateSurah={(num) => setActiveSurahNumber(num)}
            />
          ) : currentTab === 'home' ? (
            <HomeScreen
              onSelectSurah={handleSelectSurah}
              onOpenAzkar={() => setCurrentTab('azkar')}
              onOpenBookmarks={() => setCurrentTab('bookmarks')}
              onOpenCodeExport={() => setIsCodeModalOpen(true)}
            />
          ) : currentTab === 'azkar' ? (
            <AzkarScreen />
          ) : (
            <BookmarksScreen onSelectSurah={handleSelectSurah} />
          )}

          {/* Persistent Android Audio Recitation Player */}
          <AudioPlayerBottomBar />
        </AndroidPhoneFrame>

        {/* Complete Android Native Project Inspector & AAB Exporter */}
        <AndroidCodeExportModal
          isOpen={isCodeModalOpen}
          onClose={() => setIsCodeModalOpen(false)}
        />
      </AudioProvider>
    </QuranStateProvider>
  );
}
