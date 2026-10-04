import React, { createContext, useContext, useState, useEffect } from 'react';
import { SURAHS_LIST } from '../data/quranData';

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  date: string;
}

export interface LastRead {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  page: number;
  timestamp: number;
}

interface QuranStateContextType {
  bookmarks: Bookmark[];
  addBookmark: (surahNumber: number, ayahNumber: number, text: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  lastRead: LastRead;
  updateLastRead: (surahNumber: number, ayahNumber: number, page?: number) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  readingMode: 'ayahs' | 'mushaf';
  setReadingMode: (mode: 'ayahs' | 'mushaf') => void;
  khatmahPage: number;
  setKhatmahPage: (page: number) => void;
}

const QuranStateContext = createContext<QuranStateContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = 'noor_quran_bookmarks_v1';
const LAST_READ_STORAGE_KEY = 'noor_quran_last_read_v1';
const FONT_SIZE_STORAGE_KEY = 'noor_quran_font_size_v1';
const KHATMAH_PAGE_STORAGE_KEY = 'noor_quran_khatmah_page_v1';

export const QuranStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'default-1',
          surahNumber: 1,
          surahName: 'الفاتحة',
          ayahNumber: 1,
          text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          date: 'اليوم'
        },
        {
          id: 'default-2',
          surahNumber: 18,
          surahName: 'الكهف',
          ayahNumber: 1,
          text: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',
          date: 'اليوم'
        }
      ];
    } catch {
      return [];
    }
  });

  const [lastRead, setLastRead] = useState<LastRead>(() => {
    try {
      const saved = localStorage.getItem(LAST_READ_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        surahNumber: 18,
        surahName: 'الكهف',
        ayahNumber: 1,
        page: 293,
        timestamp: Date.now()
      };
    } catch {
      return { surahNumber: 18, surahName: 'الكهف', ayahNumber: 1, page: 293, timestamp: Date.now() };
    }
  });

  const [fontSize, setFontSizeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
      return saved ? Number(saved) : 25;
    } catch {
      return 25;
    }
  });

  const [readingMode, setReadingMode] = useState<'ayahs' | 'mushaf'>('ayahs');

  const [khatmahPage, setKhatmahPageState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(KHATMAH_PAGE_STORAGE_KEY);
      return saved ? Number(saved) : 45;
    } catch {
      return 45;
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(LAST_READ_STORAGE_KEY, JSON.stringify(lastRead));
  }, [lastRead]);

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, String(size));
  };

  const setKhatmahPage = (page: number) => {
    setKhatmahPageState(page);
    localStorage.setItem(KHATMAH_PAGE_STORAGE_KEY, String(page));
  };

  const updateLastRead = (surahNumber: number, ayahNumber: number, page?: number) => {
    const meta = SURAHS_LIST[surahNumber - 1];
    const surahName = meta ? meta.name : `سورة ${surahNumber}`;
    const p = page || (meta ? meta.page : 1);

    const newLastRead: LastRead = {
      surahNumber,
      surahName,
      ayahNumber,
      page: p,
      timestamp: Date.now()
    };
    setLastRead(newLastRead);
    setKhatmahPage(p);
  };

  const addBookmark = (surahNumber: number, ayahNumber: number, text: string) => {
    const meta = SURAHS_LIST[surahNumber - 1];
    const surahName = meta ? meta.name : `سورة ${surahNumber}`;
    const newBookmark: Bookmark = {
      id: `${surahNumber}-${ayahNumber}-${Date.now()}`,
      surahNumber,
      surahName,
      ayahNumber,
      text,
      date: new Date().toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number) => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  return (
    <QuranStateContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        lastRead,
        updateLastRead,
        fontSize,
        setFontSize,
        readingMode,
        setReadingMode,
        khatmahPage,
        setKhatmahPage,
      }}
    >
      {children}
    </QuranStateContext.Provider>
  );
};

export const useQuranState = () => {
  const context = useContext(QuranStateContext);
  if (!context) {
    throw new Error('useQuranState must be used within a QuranStateProvider');
  }
  return context;
};
