import React, { useState } from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen, Copy, Check, ChevronLeft, Plus, Minus } from 'lucide-react';
import { useQuranState, Bookmark as BookmarkItem } from '../context/QuranStateContext';

interface Props {
  onSelectSurah: (surahNumber: number) => void;
}

export const BookmarksScreen: React.FC<Props> = ({ onSelectSurah }) => {
  const { bookmarks, removeBookmark, khatmahPage, setKhatmahPage } = useQuranState();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (b: BookmarkItem) => {
    const text = `﴿ ${b.text} ﴾ [سورة ${b.surahName}: ${b.ayahNumber}] - تطبيق نور القرآن`;
    navigator.clipboard.writeText(text);
    setCopiedId(b.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const khatmahPercentage = Math.min(100, Math.round((khatmahPage / 604) * 100));

  return (
    <div className="space-y-4 pb-28" dir="rtl">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-600/30 p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Bookmark className="w-5 h-5 fill-amber-400/20" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white font-cairo">الإشارات المرجعية والختمة</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-cairo">
              الآيات المحفوظة ومتابعة تقدمك في تلاوة المصحف
            </p>
          </div>
        </div>

        {/* Khatmah Interactive Tracker */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white font-cairo">معدل إنجاز الختمة المباركة</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{khatmahPercentage}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${khatmahPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-300 font-cairo">
              الصفحة الحالية: <strong className="text-amber-400 font-mono text-sm">{khatmahPage}</strong> / 604
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setKhatmahPage(Math.max(1, khatmahPage - 1))}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                title="إنقاص صفحة"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setKhatmahPage(Math.min(604, khatmahPage + 1))}
                className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center cursor-pointer font-bold"
                title="إتمام صفحة"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-300 font-cairo">
            الآيات المحفوظة ({bookmarks.length})
          </h2>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-60" />
            <p className="text-sm font-bold text-slate-300 font-cairo">لا توجد علامات مرجعية حتى الآن</p>
            <p className="text-xs text-slate-500 mt-1 font-cairo">
              يمكنك حفظ أي آية أثناء القراءة بالنقر على رمز الإشارة المرجعية
            </p>
          </div>
        ) : (
          bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300 font-cairo">
                    سورة {b.surahName}
                  </span>
                  <span className="text-[11px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 font-mono">
                    الآية {b.ayahNumber}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(b)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="نسخ الآية"
                  >
                    {copiedId === b.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => removeBookmark(b.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="حذف من المحفوظات"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Text */}
              <p className="font-quran text-slate-100 text-sm leading-relaxed text-right py-1">
                {b.text}
              </p>

              {/* Action to Jump */}
              <div className="mt-3 pt-2 border-t border-slate-800/40 flex justify-end">
                <button
                  onClick={() => onSelectSurah(b.surahNumber)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-cairo"
                >
                  <span>الذهاب إلى السورة</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
