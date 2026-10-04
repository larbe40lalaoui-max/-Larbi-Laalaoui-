import React, { useState } from 'react';
import { 
  Sun, Moon, CheckCircle2, RotateCcw, Volume2, 
  Sparkles, Check, ArrowRight, Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AZKAR_CATEGORIES, AZKAR_LIST, TASBIH_PHRASES, ZikrItem } from '../data/azkarData';

export const AzkarScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('morning');
  const [azkarCounters, setAzkarCounters] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    AZKAR_LIST.forEach((z) => {
      initial[z.id] = z.count;
    });
    return initial;
  });

  // Digital Tasbih state
  const [selectedTasbih, setSelectedTasbih] = useState(TASBIH_PHRASES[0]);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTotal, setTasbihTotal] = useState(0);

  const handleDecrementZikr = (id: string, initialCount: number) => {
    // Haptic vibration
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }

    setAzkarCounters((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialCount;
      if (current <= 1) {
        // Trigger small celebration for finishing this zikr
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#10b981', '#fbbf24', '#059669']
        });
        return { ...prev, [id]: 0 };
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const handleResetCategory = () => {
    const next = { ...azkarCounters };
    AZKAR_LIST.filter((z) => z.category === activeCategory).forEach((z) => {
      next[z.id] = z.count;
    });
    setAzkarCounters(next);
  };

  const handleTasbihClick = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }

    const nextCount = tasbihCount + 1;
    setTasbihCount(nextCount);
    setTasbihTotal((t) => t + 1);

    if (nextCount === selectedTasbih.target) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#10b981', '#34d399']
      });
    }
  };

  const currentCategoryAzkar = AZKAR_LIST.filter((z) => z.category === activeCategory);

  return (
    <div className="space-y-4 pb-28" dir="rtl">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-600/30 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white font-cairo flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>حصن المسلم والأذكار</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-cairo">
              ألا بذكر الله تطمئن القلوب • تسابيح وأذكار مأثورة
            </p>
          </div>

          {activeCategory !== 'tasbih' && (
            <button
              onClick={handleResetCategory}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors cursor-pointer"
              title="إعادة تعيين عداد أذكار هذا القسم"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة العداد</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto mt-4 pb-1 text-xs">
          {AZKAR_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950'
                    : 'bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content depending on tab */}
      {activeCategory === 'tasbih' ? (
        /* Digital Tasbih Screen */
        <div className="space-y-4">
          {/* Select phrase */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <label className="text-xs font-bold text-amber-400 block mb-2 font-cairo">اختر صيغة التسبيح:</label>
            <div className="grid grid-cols-2 gap-2">
              {TASBIH_PHRASES.map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => {
                    setSelectedTasbih(tp);
                    setTasbihCount(0);
                  }}
                  className={`p-2.5 rounded-xl text-xs text-right transition-all cursor-pointer font-quran ${
                    selectedTasbih.id === tp.id
                      ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40 shadow-inner'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <div className="truncate">{tp.text}</div>
                  <div className="text-[10px] text-amber-400/80 font-sans mt-0.5">الهدف: {tp.target} مرة</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Tasbih Dial */}
          <div className="bg-slate-900/80 border border-emerald-600/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="text-sm font-semibold text-amber-300 font-quran mb-3">
              {selectedTasbih.text}
            </div>

            {/* Huge Tap Button */}
            <button
              onClick={handleTasbihClick}
              className="w-48 h-48 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:to-teal-400 text-white flex flex-col items-center justify-center shadow-2xl shadow-emerald-950/80 border-4 border-amber-400/30 active:scale-95 transition-transform cursor-pointer relative group my-4"
            >
              <span className="text-5xl font-black font-mono tracking-tight drop-shadow-md">
                {tasbihCount}
              </span>
              <span className="text-xs text-emerald-100 font-cairo mt-1 opacity-90">
                من أصل {selectedTasbih.target}
              </span>
              <span className="text-[10px] text-amber-200 mt-2 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                اضغط للتسبيح
              </span>
            </button>

            {/* Total count and reset */}
            <div className="flex items-center gap-4 mt-2">
              <div className="text-xs text-slate-400 font-cairo">
                إجمالي التسابيح اليوم: <strong className="text-amber-400 font-mono">{tasbihTotal}</strong>
              </div>
              <button
                onClick={() => setTasbihCount(0)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>تصفير الدورة</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Azkar List */
        <div className="space-y-3">
          {currentCategoryAzkar.map((zikr) => {
            const currentCount = azkarCounters[zikr.id] !== undefined ? azkarCounters[zikr.id] : zikr.count;
            const isCompleted = currentCount === 0;

            return (
              <div
                key={zikr.id}
                onClick={() => !isCompleted && handleDecrementZikr(zikr.id, zikr.count)}
                className={`border rounded-2xl p-4 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-slate-950/60 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 shadow-md active:scale-[0.99]'
                }`}
              >
                {/* Text */}
                <p className="font-quran text-slate-100 text-base leading-relaxed text-right select-text">
                  {zikr.text}
                </p>

                {/* Virtue */}
                {zikr.virtue && (
                  <p className="text-xs text-amber-400/90 mt-2.5 pt-2 border-t border-slate-800 font-cairo">
                    <span className="font-bold">الفضل:</span> {zikr.virtue}
                  </p>
                )}

                {/* Bottom Bar with Counter */}
                <div className="flex items-center justify-between mt-3 pt-2 text-xs">
                  <span className="text-[11px] text-slate-500 font-cairo">{zikr.reference}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrementZikr(zikr.id, zikr.count);
                    }}
                    className={`px-4 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-transform ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40 active:scale-90'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت القراءة</span>
                      </>
                    ) : (
                      <>
                        <span>تبقى:</span>
                        <span className="font-mono text-sm">{currentCount}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
