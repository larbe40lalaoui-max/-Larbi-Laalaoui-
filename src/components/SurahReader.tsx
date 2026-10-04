import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Play, Pause, Bookmark, Info, Copy, 
  Share2, Type, Check, BookOpen, Volume2, ChevronRight, 
  ChevronLeft, Sparkles, X, Settings2
} from 'lucide-react';
import { SURAHS_LIST, fetchSurahVerses, Ayah } from '../data/quranData';
import { useQuranState } from '../context/QuranStateContext';
import { useQuranAudio } from '../context/AudioContext';

interface Props {
  surahNumber: number;
  onBack: () => void;
  onNavigateSurah: (num: number) => void;
}

export const SurahReader: React.FC<Props> = ({
  surahNumber,
  onBack,
  onNavigateSurah,
}) => {
  const [verses, setVerses] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);

  const { 
    fontSize, setFontSize, 
    readingMode, setReadingMode, 
    addBookmark, removeBookmark, isBookmarked,
    updateLastRead 
  } = useQuranState();

  const { 
    playAyah, playSurah, isPlaying, 
    currentSurahNumber, currentAyahNumber, togglePlayPause 
  } = useQuranAudio();

  const surahMeta = SURAHS_LIST[surahNumber - 1];

  // Fetch verses
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchSurahVerses(surahNumber).then((data) => {
      if (isMounted) {
        setVerses(data);
        setIsLoading(false);
      }
    });

    // Record last read
    updateLastRead(surahNumber, 1, surahMeta?.page);

    return () => {
      isMounted = false;
    };
  }, [surahNumber]);

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `﴿ ${ayah.text} ﴾ [سورة ${surahMeta.name}: ${ayah.numberInSurah}] - تطبيق نور القرآن`;
    navigator.clipboard.writeText(text);
    setCopiedAyahNum(ayah.numberInSurah);
    setTimeout(() => setCopiedAyahNum(null), 2000);
  };

  const handleToggleBookmark = (ayah: Ayah) => {
    if (isBookmarked(surahNumber, ayah.numberInSurah)) {
      // Find and remove
      // Note: we can remove bookmark by filtering or re-toggling
      addBookmark(surahNumber, ayah.numberInSurah, ayah.text);
    } else {
      addBookmark(surahNumber, ayah.numberInSurah, ayah.text);
    }
  };

  return (
    <div className="pb-28" dir="rtl">
      
      {/* Sticky Reader Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-emerald-900/40 px-3 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="رجوع للقائمة"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white font-cairo">
              سُورَةُ {surahMeta?.name}
            </h1>
            <p className="text-[11px] text-amber-400 font-mono">
              {surahMeta?.revelationType} • {surahMeta?.totalVerses} آيات • صفحة {surahMeta?.page}
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5">
          {/* Reading mode switch */}
          <div className="flex bg-slate-900 p-0.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setReadingMode('ayahs')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                readingMode === 'ayahs' 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              آيات
            </button>
            <button
              onClick={() => setReadingMode('mushaf')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                readingMode === 'mushaf' 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              مصحف
            </button>
          </div>

          {/* Font size adjust */}
          <button
            onClick={() => setFontSize(Math.min(36, fontSize + 2))}
            title="تكبير الخط"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-800 cursor-pointer"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize(Math.max(18, fontSize - 2))}
            title="تصغير الخط"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-800 cursor-pointer"
          >
            A-
          </button>

          {/* Play surah button */}
          <button
            onClick={() => playSurah(surahNumber, 1)}
            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 flex items-center justify-center cursor-pointer shadow-md font-bold"
            title="تشغيل السورة"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
          </button>
        </div>
      </div>

      {/* Surah Header Ornament */}
      <div className="p-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/80 to-slate-900 border border-emerald-600/40 p-6 text-center shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-xs text-amber-400/90 font-mono tracking-widest uppercase">
              الجزء {surahMeta?.juz} • الحزب {Math.ceil((surahMeta?.page || 1) / 10)}
            </span>
            <h2 className="text-3xl font-black text-amber-300 font-quran py-1">
              سُورَةُ {surahMeta?.name}
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-300 font-cairo">
              <span>مكان النزول: <strong className="text-emerald-400">{surahMeta?.revelationType}</strong></span>
              <span>•</span>
              <span>عدد الآيات: <strong className="text-emerald-400">{surahMeta?.totalVerses}</strong></span>
              <span>•</span>
              <span>الصفحة: <strong className="text-emerald-400">{surahMeta?.page}</strong></span>
            </div>
          </div>
        </div>

        {/* Bismillah (all surahs except Surah 9 At-Tawbah and Surah 1 Al-Fatihah where it is verse 1) */}
        {surahNumber !== 9 && surahNumber !== 1 && (
          <div className="my-6 text-center">
            <p className="font-quran text-2xl md:text-3xl text-amber-300/90 tracking-wide select-none drop-shadow-sm">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-3" />
          </div>
        )}
      </div>

      {/* Verses Content */}
      <div className="px-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-20 space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-400 font-cairo">جاري تحميل الآيات الكريمة برسم المصحف...</p>
          </div>
        ) : readingMode === 'mushaf' ? (
          /* Continuous Mushaf Mode */
          <div className="bg-slate-900/90 border border-emerald-600/30 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div 
              className="font-quran text-slate-100 leading-loose text-justify text-balance"
              style={{ fontSize: `${fontSize}px`, lineHeight: 2.3 }}
            >
              {verses.map((ayah) => {
                const isCurrentAudio = isPlaying && currentSurahNumber === surahNumber && currentAyahNumber === ayah.numberInSurah;
                const saved = isBookmarked(surahNumber, ayah.numberInSurah);
                return (
                  <span 
                    key={ayah.numberInSurah}
                    className={`inline transition-colors rounded px-1 cursor-pointer hover:bg-emerald-950/60 ${
                      isCurrentAudio ? 'bg-emerald-500/25 text-amber-300 font-bold' : ''
                    } ${saved ? 'text-amber-300' : ''}`}
                    onClick={() => setSelectedTafsirAyah(ayah)}
                    title={`انقر لعرض تفسير الآية ${ayah.numberInSurah}`}
                  >
                    {ayah.text}
                    <span className="inline-flex items-center justify-center px-1.5 mx-1 font-sans text-xs text-amber-400 select-none">
                      ۝{ayah.numberInSurah}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          /* Verse By Verse Mode */
          <div className="space-y-3">
            {verses.map((ayah) => {
              const isCurrentAudio = isPlaying && currentSurahNumber === surahNumber && currentAyahNumber === ayah.numberInSurah;
              const saved = isBookmarked(surahNumber, ayah.numberInSurah);

              return (
                <div
                  key={ayah.numberInSurah}
                  id={`ayah-${ayah.numberInSurah}`}
                  className={`bg-slate-900/80 border rounded-2xl p-4 transition-all ${
                    isCurrentAudio 
                      ? 'border-emerald-500/80 bg-slate-850 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40' 
                      : 'border-slate-800/80 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Ayah Top Action Bar */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-950 border border-emerald-500/30 text-amber-400 font-bold flex items-center justify-center font-mono">
                        {ayah.numberInSurah}
                      </span>
                      <span className="text-[11px] text-slate-400 font-cairo">
                        سورة {surahMeta.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Play Ayah */}
                      <button
                        onClick={() => playAyah(surahNumber, ayah.numberInSurah)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isCurrentAudio 
                            ? 'bg-emerald-500 text-slate-950' 
                            : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                        }`}
                        title="استماع لهذه الآية"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Tafsir button */}
                      <button
                        onClick={() => setSelectedTafsirAyah(ayah)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="التفسير الميسر"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      {/* Bookmark button */}
                      <button
                        onClick={() => handleToggleBookmark(ayah)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          saved ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="حفظ علامة مرجعية"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                      </button>

                      {/* Copy button */}
                      <button
                        onClick={() => handleCopyAyah(ayah)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        title="نسخ نص الآية"
                      >
                        {copiedAyahNum === ayah.numberInSurah ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quranic Text */}
                  <div 
                    className="font-quran text-slate-100 leading-relaxed text-right py-1 select-text"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {ayah.text}
                    <span className="inline-block mr-2 text-amber-400 text-sm font-sans select-none">
                      ۝{ayah.numberInSurah}
                    </span>
                  </div>

                  {/* Tafsir excerpt */}
                  {ayah.tafsir && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/40 text-xs text-slate-400 font-cairo leading-relaxed">
                      <span className="text-amber-400/90 font-semibold ml-1">التفسير:</span>
                      {ayah.tafsir}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation between Surahs */}
        <div className="pt-6 flex items-center justify-between gap-3">
          {surahNumber > 1 ? (
            <button
              onClick={() => onNavigateSurah(surahNumber - 1)}
              className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer font-cairo"
            >
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span>السورة السابقة: {SURAHS_LIST[surahNumber - 2]?.name}</span>
            </button>
          ) : <div className="flex-1" />}

          {surahNumber < 114 ? (
            <button
              onClick={() => onNavigateSurah(surahNumber + 1)}
              className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer font-cairo"
            >
              <span>السورة التالية: {SURAHS_LIST[surahNumber]?.name}</span>
              <ChevronLeft className="w-4 h-4 text-emerald-400" />
            </button>
          ) : <div className="flex-1" />}
        </div>
      </div>

      {/* Tafsir Modal / Bottom Sheet */}
      {selectedTafsirAyah && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs font-mono">
                  {selectedTafsirAyah.numberInSurah}
                </span>
                <h3 className="font-bold text-white text-sm font-cairo">
                  التفسير الميسر - سورة {surahMeta.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTafsirAyah(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-600/20">
                <p className="font-quran text-lg text-amber-200 text-right leading-loose">
                  ﴿ {selectedTafsirAyah.text} ﴾
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-400 font-cairo">تفسير الآية:</h4>
                <p className="text-sm text-slate-200 font-cairo leading-relaxed">
                  {selectedTafsirAyah.tafsir || 'التفسير الميسر لهذه الآية المباركة.'}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
              <button
                onClick={() => handleCopyAyah(selectedTafsirAyah)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ التفسير والآية</span>
              </button>

              <button
                onClick={() => playAyah(surahNumber, selectedTafsirAyah.numberInSurah)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>استماع للآية</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
