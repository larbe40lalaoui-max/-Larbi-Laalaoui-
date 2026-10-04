import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  ChevronUp, ChevronDown, User, Disc, X 
} from 'lucide-react';
import { useQuranAudio } from '../context/AudioContext';
import { SURAHS_LIST, RECITERS } from '../data/quranData';

export const AudioPlayerBottomBar: React.FC = () => {
  const {
    isPlaying,
    currentSurahNumber,
    currentAyahNumber,
    totalVersesInSurah,
    selectedReciter,
    progress,
    isBuffering,
    togglePlayPause,
    nextAyah,
    prevAyah,
    seekTo,
    setReciter,
    stopAudio
  } = useQuranAudio();

  const [isReciterMenuOpen, setIsReciterMenuOpen] = useState(false);

  if (!currentSurahNumber) return null;

  const surahMeta = SURAHS_LIST[currentSurahNumber - 1];

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio);
  };

  return (
    <div className="relative z-40" dir="rtl">
      {/* Reciters Picker Modal */}
      {isReciterMenuOpen && (
        <div className="absolute bottom-full right-4 left-4 mb-2 p-3 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl backdrop-blur-xl z-50 animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-400 font-cairo">اختر القارئ المفضل</span>
            <button 
              onClick={() => setIsReciterMenuOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {RECITERS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setReciter(r);
                  setIsReciterMenuOpen(false);
                }}
                className={`w-full text-right p-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedReciter.id === r.id 
                    ? 'bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/30' 
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="font-cairo">{r.name}</div>
                  <div className="text-[10px] text-slate-500">{r.subname}</div>
                </div>
                {selectedReciter.id === r.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="bg-slate-900/95 border-t border-emerald-600/30 backdrop-blur-lg px-4 py-2.5 shadow-xl">
        {/* Progress Bar */}
        <div 
          onClick={handleProgressBarClick}
          className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer mb-2.5 group relative"
        >
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-150 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Surah info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-800 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-sm">
              <Disc className={`w-5 h-5 text-amber-300 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white truncate font-cairo">
                  سورة {surahMeta?.name}
                </span>
                <span className="text-[11px] text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                  آية {currentAyahNumber} / {totalVersesInSurah}
                </span>
              </div>
              <button 
                onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)}
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer truncate"
              >
                <User className="w-3 h-3 text-emerald-400" />
                <span className="truncate">{selectedReciter.name}</span>
                <ChevronUp className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={prevAyah}
              title="الآية السابقة"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              disabled={isBuffering}
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform active:scale-95 cursor-pointer font-bold"
            >
              {isBuffering ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              ) : isPlaying ? (
                <Pause className="w-5 h-5 fill-slate-950" />
              ) : (
                <Play className="w-5 h-5 fill-slate-950 translate-x-[-1px]" />
              )}
            </button>

            <button
              onClick={nextAyah}
              title="الآية التالية"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={stopAudio}
              title="إغلاق المشغل"
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-colors cursor-pointer mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
