import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Bookmark, Sparkles, Sun, 
  Clock, Play, Heart, CheckCircle2, ChevronLeft, 
  SlidersHorizontal, Code, ArrowUpRight, Flame, Volume2
} from 'lucide-react';
import { SURAHS_LIST, DAILY_AYAHS, SurahMeta } from '../data/quranData';
import { useQuranState } from '../context/QuranStateContext';
import { useQuranAudio } from '../context/AudioContext';

interface Props {
  onSelectSurah: (surahNumber: number) => void;
  onOpenAzkar: () => void;
  onOpenBookmarks: () => void;
  onOpenCodeExport: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  onSelectSurah,
  onOpenAzkar,
  onOpenBookmarks,
  onOpenCodeExport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan' | 'saved'>('all');
  const [currentDailyAyahIndex, setCurrentDailyAyahIndex] = useState(0);

  const { lastRead, khatmahPage, bookmarks } = useQuranState();
  const { playSurah, isPlaying, currentSurahNumber } = useQuranAudio();

  // Islamic prayer times
  const prayerTimes = [
    { name: 'الفجر', time: '04:42 ص', active: false },
    { name: 'الشروق', time: '06:05 ص', active: false },
    { name: 'الظهر', time: '12:15 م', active: false },
    { name: 'العصر', time: '03:40 م', active: true }, // Current prayer indicator
    { name: 'المغرب', time: '06:22 م', active: false },
    { name: 'العشاء', time: '07:45 م', active: false },
  ];

  // Filter surahs
  const filteredSurahs = useMemo(() => {
    return SURAHS_LIST.filter((s) => {
      // Type filter
      if (filterType === 'meccan' && s.revelationType !== 'مكية') return false;
      if (filterType === 'medinan' && s.revelationType !== 'مدنية') return false;
      if (filterType === 'saved') {
        const isSaved = bookmarks.some((b) => b.surahNumber === s.number);
        if (!isSaved) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        s.name.includes(q) ||
        s.transliteration.toLowerCase().includes(q) ||
        String(s.number) === q ||
        String(s.juz) === q ||
        String(s.page) === q
      );
    });
  }, [searchQuery, filterType, bookmarks]);

  const dailyAyah = DAILY_AYAHS[currentDailyAyahIndex % DAILY_AYAHS.length];
  const khatmahPercentage = Math.min(100, Math.round((khatmahPage / 604) * 100));

  return (
    <div className="space-y-4 pb-24" dir="rtl">
      
      {/* Top Islamic Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-600/30 p-5 shadow-2xl">
        <div className="absolute top-0 left-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-lg shadow-emerald-950">
                <img 
                  src="/src/assets/images/quran_app_icon_1790559290294.jpg" 
                  alt="نور القرآن" 
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white font-cairo flex items-center gap-2">
                  <span>نُورُ القُرْآنِ</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans">
                    Android Native
                  </span>
                </h1>
                <p className="text-xs text-amber-300/80 font-cairo">
                  المصحف الشريف وتلاوات عطرة خالية من WebView
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCodeExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              title="مشروع أندرويد نيتف كامل جاهز للبناء والنشر على Google Play"
            >
              <Code className="w-3.5 h-3.5" />
              <span>كود AAB</span>
            </button>
          </div>

          {/* Prayer Times Ribbon */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-6 gap-1 text-center">
            {prayerTimes.map((p) => (
              <div 
                key={p.name}
                className={`py-1.5 px-1 rounded-xl transition-all ${
                  p.active 
                    ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] opacity-80">{p.name}</div>
                <div className="text-[11px] font-mono mt-0.5 font-semibold">{p.time}</div>
              </div>
            ))}
          </div>

          {/* Continue Reading Card */}
          <div 
            onClick={() => onSelectSurah(lastRead.surahNumber)}
            className="mt-4 bg-slate-950/70 border border-emerald-500/20 rounded-2xl p-3.5 flex items-center justify-between hover:border-emerald-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              </div>
              <div>
                <span className="text-[11px] text-amber-300/80 block font-cairo">متابعة القراءة</span>
                <span className="text-sm font-bold text-white font-cairo">
                  سورة {lastRead.surahName} • الآية {lastRead.ayahNumber} (صفحة {lastRead.page})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:translate-x-[-4px] transition-transform">
              <span>متابعة</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Khatmah & Daily Ayah Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Khatmah Progress Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-cairo">ختمة القرآن الكريم</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{khatmahPercentage}%</span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-2">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500" 
              style={{ width: `${khatmahPercentage}%` }} 
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>صفحة {khatmahPage} من 604</span>
            <span>باقي {604 - khatmahPage} صفحة لإتمام الختمة</span>
          </div>
        </div>

        {/* Daily Inspiration Ayah Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 font-cairo">آية اليوم المباركة</span>
            </div>
            <span className="text-[10px] text-slate-400 font-cairo">{dailyAyah.surahName} (آية {dailyAyah.ayahNumber})</span>
          </div>

          <p className="text-sm font-quran text-slate-200 line-clamp-2 my-1 leading-relaxed">
            "{dailyAyah.text}"
          </p>

          <p className="text-[11px] text-slate-400 line-clamp-1 italic">
            {dailyAyah.tafsir}
          </p>
        </div>
      </div>

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => {
            const el = document.getElementById('surah-list-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 font-cairo">المصحف</span>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bookmark className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 font-cairo">العلامات</span>
        </button>

        <button
          onClick={onOpenAzkar}
          className="bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 font-cairo">الأذكار</span>
        </button>

        <button
          onClick={onOpenCodeExport}
          className="bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 font-cairo">كود AAB</span>
        </button>
      </div>

      {/* Surahs Section */}
      <div id="surah-list-section" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-cairo flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>فهرس السور المباركة ({filteredSurahs.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-cairo">114 سورة كاملة</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن اسم السورة، رقمها، أو الجزء..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-2xl py-3 pr-11 pl-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-cairo"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-3.5 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 cursor-pointer"
            >
              مسح
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 cursor-pointer ${
              filterType === 'all'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            الكل (114)
          </button>
          <button
            onClick={() => setFilterType('meccan')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 cursor-pointer ${
              filterType === 'meccan'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            مكية (86)
          </button>
          <button
            onClick={() => setFilterType('medinan')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 cursor-pointer ${
              filterType === 'medinan'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            مدنية (28)
          </button>
          <button
            onClick={() => setFilterType('saved')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
              filterType === 'saved'
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>السور المحفوظة ({bookmarks.length})</span>
          </button>
        </div>

        {/* Surahs List */}
        <div className="space-y-2">
          {filteredSurahs.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-cairo">لم يتم العثور على أي سورة مطابقة للبحث</p>
            </div>
          ) : (
            filteredSurahs.map((surah) => {
              const isCurrentlyPlaying = isPlaying && currentSurahNumber === surah.number;
              return (
                <div
                  key={surah.number}
                  className={`bg-slate-900/80 hover:bg-slate-800/90 border rounded-2xl p-3.5 flex items-center justify-between transition-all group cursor-pointer ${
                    isCurrentlyPlaying 
                      ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/40 bg-slate-850' 
                      : 'border-slate-800/80 hover:border-emerald-500/40'
                  }`}
                  onClick={() => onSelectSurah(surah.number)}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Surah Number Icon */}
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-amber-400/50 transition-colors">
                      <span className="text-sm font-bold text-amber-400 font-mono">
                        {surah.number}
                      </span>
                    </div>

                    {/* Surah Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-cairo">
                          سُورَةُ {surah.name}
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          surah.revelationType === 'مكية' 
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' 
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                        }`}>
                          {surah.revelationType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{surah.totalVerses} آيات</span>
                        <span>•</span>
                        <span>صفحة {surah.page}</span>
                        <span>•</span>
                        <span>الجزء {surah.juz}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSurah(surah.number, 1);
                      }}
                      title="استماع للسورة"
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isCurrentlyPlaying
                          ? 'bg-emerald-500 text-slate-950 font-bold animate-pulse'
                          : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-[-2px] transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
