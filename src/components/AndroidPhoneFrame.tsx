import React, { useState } from 'react';
import { 
  Wifi, Battery, Signal, BookOpen, Bookmark, 
  Sun, Code, Smartphone, Monitor, Download, 
  ArrowLeft, Circle, Square 
} from 'lucide-react';
import { ANDROID_PACKAGE_NAME } from '../data/androidProjectFiles';

interface Props {
  children: React.ReactNode;
  currentTab: 'home' | 'azkar' | 'bookmarks';
  onTabChange: (tab: 'home' | 'azkar' | 'bookmarks') => void;
  onOpenCodeExport: () => void;
}

export const AndroidPhoneFrame: React.FC<Props> = ({
  children,
  currentTab,
  onTabChange,
  onOpenCodeExport,
}) => {
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Current formatted time for Android status bar
  const currentTime = new Date().toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 md:p-6 select-none font-cairo">
      
      {/* Top Bar for Desktop Preview */}
      <div className="w-full max-w-md hidden md:flex items-center justify-between pb-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">محاكي Android Native (Kotlin & Compose)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDeviceFrame(!isDeviceFrame)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 cursor-pointer transition-colors"
          >
            {isDeviceFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>شاشة كاملة</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>إطار الهاتف</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCodeExport}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer transition-all shadow-sm"
          >
            <Code className="w-3.5 h-3.5" />
            <span>كود AAB</span>
          </button>
        </div>
      </div>

      {/* Main Container / Phone Chassis */}
      <div className={`w-full transition-all duration-300 ${
        isDeviceFrame 
          ? 'max-w-[440px] md:border-[10px] md:border-slate-800 md:rounded-[44px] shadow-2xl md:shadow-emerald-950/40 relative bg-slate-950 overflow-hidden min-h-screen md:min-h-[880px] md:max-h-[920px] flex flex-col' 
          : 'max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 min-h-screen flex flex-col shadow-2xl'
      }`}>

        {/* Android Punch Hole & Status Bar */}
        <div className="h-10 bg-slate-950 px-5 flex items-center justify-between text-xs text-slate-400 border-b border-slate-900/80 shrink-0 z-30" dir="ltr">
          {/* Time */}
          <span className="font-mono font-semibold text-slate-300 text-[11px]">{currentTime}</span>

          {/* Front Camera Hole (visible in phone mode) */}
          {isDeviceFrame && (
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
            </div>
          )}

          {/* System Icons */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Signal className="w-3 h-3 text-slate-300" />
            <span className="text-[10px] font-mono font-bold text-emerald-400">5G</span>
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2.5">
          {children}
        </div>

        {/* Android Material 3 Bottom Navigation Bar */}
        <div className="bg-slate-950/95 border-t border-slate-800/90 py-2 px-3 shrink-0 z-30">
          <div className="grid grid-cols-4 gap-1 text-center" dir="rtl">
            <button
              onClick={() => onTabChange('home')}
              className={`py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center ${currentTab === 'home' ? 'scale-110' : ''}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[11px]">المصحف</span>
            </button>

            <button
              onClick={() => onTabChange('azkar')}
              className={`py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                currentTab === 'azkar'
                  ? 'bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center ${currentTab === 'azkar' ? 'scale-110' : ''}`}>
                <Sun className="w-4 h-4" />
              </div>
              <span className="text-[11px]">الأذكار</span>
            </button>

            <button
              onClick={() => onTabChange('bookmarks')}
              className={`py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                currentTab === 'bookmarks'
                  ? 'bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center ${currentTab === 'bookmarks' ? 'scale-110' : ''}`}>
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="text-[11px]">العلامات</span>
            </button>

            <button
              onClick={onOpenCodeExport}
              className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Code className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">كود AAB</span>
            </button>
          </div>

          {/* Android Home Gesture Pill */}
          <div className="flex justify-center pt-2 pb-0.5">
            <div className="w-28 h-1 bg-slate-700/80 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};
