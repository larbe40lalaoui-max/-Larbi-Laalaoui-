import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { RECITERS, Reciter, getAyahAudioUrl, SURAHS_LIST, PRELOADED_SURAHS, Ayah } from '../data/quranData';

interface AudioState {
  isPlaying: boolean;
  currentSurahNumber: number | null;
  currentAyahNumber: number; // number in surah
  totalVersesInSurah: number;
  selectedReciter: Reciter;
  progress: number;
  duration: number;
  isBuffering: boolean;
}

interface AudioContextType extends AudioState {
  playSurah: (surahNumber: number, startAyah?: number) => void;
  playAyah: (surahNumber: number, ayahNumber: number) => void;
  togglePlayPause: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  seekTo: (progressRatio: number) => void;
  setReciter: (reciter: Reciter) => void;
  stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number>(1);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const surahMeta = currentSurahNumber ? SURAHS_LIST[currentSurahNumber - 1] : null;
  const totalVerses = surahMeta?.totalVerses || 7;

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
        setDuration(audio.duration);
      }
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      // Auto advance to next ayah
      setCurrentAyahNumber((prev) => {
        if (currentSurahNumber && prev < (SURAHS_LIST[currentSurahNumber - 1]?.totalVerses || 0)) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    };

    const handleError = () => {
      setIsBuffering(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // When current surah, ayah, or reciter changes, load audio if active
  useEffect(() => {
    if (!currentSurahNumber || !audioRef.current) return;

    const audioUrl = getAyahAudioUrl(currentSurahNumber, currentAyahNumber, selectedReciter.server);
    audioRef.current.src = audioUrl;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback error or blocked:', err);
        setIsPlaying(false);
      });
    }
  }, [currentSurahNumber, currentAyahNumber, selectedReciter]);

  const playSurah = (surahNumber: number, startAyah: number = 1) => {
    setCurrentSurahNumber(surahNumber);
    setCurrentAyahNumber(startAyah);
    setIsPlaying(true);

    if (audioRef.current) {
      const audioUrl = getAyahAudioUrl(surahNumber, startAyah, selectedReciter.server);
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.warn);
    }
  };

  const playAyah = (surahNumber: number, ayahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
    setCurrentAyahNumber(ayahNumber);
    setIsPlaying(true);

    if (audioRef.current) {
      const audioUrl = getAyahAudioUrl(surahNumber, ayahNumber, selectedReciter.server);
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.warn);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!currentSurahNumber) {
        playSurah(1, 1);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
    }
  };

  const nextAyah = () => {
    if (!currentSurahNumber) return;
    if (currentAyahNumber < totalVerses) {
      setCurrentAyahNumber((prev) => prev + 1);
    } else if (currentSurahNumber < 114) {
      setCurrentSurahNumber((prev) => (prev ? prev + 1 : 1));
      setCurrentAyahNumber(1);
    }
  };

  const prevAyah = () => {
    if (currentAyahNumber > 1) {
      setCurrentAyahNumber((prev) => prev - 1);
    } else if (currentSurahNumber && currentSurahNumber > 1) {
      const prevSurah = currentSurahNumber - 1;
      setCurrentSurahNumber(prevSurah);
      setCurrentAyahNumber(1);
    }
  };

  const seekTo = (progressRatio: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = progressRatio * audioRef.current.duration;
      setProgress(progressRatio);
    }
  };

  const setReciter = (reciter: Reciter) => {
    setSelectedReciter(reciter);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentSurahNumber(null);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSurahNumber,
        currentAyahNumber,
        totalVersesInSurah: totalVerses,
        selectedReciter,
        progress,
        duration,
        isBuffering,
        playSurah,
        playAyah,
        togglePlayPause,
        nextAyah,
        prevAyah,
        seekTo,
        setReciter,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useQuranAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useQuranAudio must be used within an AudioProvider');
  }
  return context;
};
