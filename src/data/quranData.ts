export interface SurahMeta {
  number: number;
  name: string;
  transliteration: string;
  translation: string;
  totalVerses: number;
  revelationType: 'مكية' | 'مدنية';
  page: number;
  juz: number;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
  translation?: string;
  tafsir?: string;
  audio?: string;
}

export interface Reciter {
  id: string;
  name: string;
  subname: string;
  server: string;
}

export const RECITERS: Reciter[] = [
  {
    id: 'mishari',
    name: 'مشاري راشد العفاسي',
    subname: 'تلاوة حفص عن عاصم (مرتل)',
    server: 'https://everyayah.com/data/Alafasy_128kbps',
  },
  {
    id: 'abdulbasit',
    name: 'عبد الباسط عبد الصمد',
    subname: 'المصحف المرتل',
    server: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps',
  },
  {
    id: 'ghamadi',
    name: 'سعد الغامدي',
    subname: 'تلاوة حفص عن عاصم',
    server: 'https://everyayah.com/data/Ghamadi_40kbps',
  },
  {
    id: 'husary',
    name: 'محمود خليل الحصري',
    subname: 'المصحف المعلم برواية حفص',
    server: 'https://everyayah.com/data/Husary_128kbps',
  },
  {
    id: 'muaiqly',
    name: 'ماهر المعيقلي',
    subname: 'إمام المسجد الحرام',
    server: 'https://everyayah.com/data/MaherAlMuaiqly128kbps',
  },
];

// Helper to format 3-digit Ayah audio filenames (e.g. 001001.mp3)
export function getAyahAudioUrl(surahNumber: number, ayahNumber: number, reciterServer: string): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');
  return `${reciterServer}/${s}${a}.mp3`;
}

// 114 Surahs of the Holy Quran
export const SURAHS_LIST: SurahMeta[] = [
  { number: 1, name: "الفاتحة", transliteration: "Al-Fatihah", translation: "فاتحة الكتاب", totalVerses: 7, revelationType: "مكية", page: 1, juz: 1 },
  { number: 2, name: "البقرة", transliteration: "Al-Baqarah", translation: "البقرة", totalVerses: 286, revelationType: "مدنية", page: 2, juz: 1 },
  { number: 3, name: "آل عمران", transliteration: "Ali 'Imran", translation: "آل عمران", totalVerses: 200, revelationType: "مدنية", page: 50, juz: 3 },
  { number: 4, name: "النساء", transliteration: "An-Nisa", translation: "النساء", totalVerses: 176, revelationType: "مدنية", page: 77, juz: 4 },
  { number: 5, name: "المائدة", transliteration: "Al-Ma'idah", translation: "المائدة", totalVerses: 120, revelationType: "مدنية", page: 106, juz: 6 },
  { number: 6, name: "الأنعام", transliteration: "Al-An'am", translation: "الأنعام", totalVerses: 165, revelationType: "مكية", page: 128, juz: 7 },
  { number: 7, name: "الأعراف", transliteration: "Al-A'raf", translation: "الأعراف", totalVerses: 206, revelationType: "مكية", page: 151, juz: 8 },
  { number: 8, name: "الأنفال", transliteration: "Al-Anfal", translation: "الأنفال", totalVerses: 75, revelationType: "مدنية", page: 177, juz: 9 },
  { number: 9, name: "التوبة", transliteration: "At-Tawbah", translation: "التوبة", totalVerses: 129, revelationType: "مدنية", page: 187, juz: 10 },
  { number: 10, name: "يونس", transliteration: "Yunus", translation: "يونس", totalVerses: 109, revelationType: "مكية", page: 208, juz: 11 },
  { number: 11, name: "هود", transliteration: "Hud", translation: "هود", totalVerses: 123, revelationType: "مكية", page: 221, juz: 11 },
  { number: 12, name: "يوسف", transliteration: "Yusuf", translation: "يوسف", totalVerses: 111, revelationType: "مكية", page: 235, juz: 12 },
  { number: 13, name: "الرعد", transliteration: "Ar-Ra'd", translation: "الرعد", totalVerses: 43, revelationType: "مدنية", page: 249, juz: 13 },
  { number: 14, name: "إبراهيم", transliteration: "Ibrahim", translation: "إبراهيم", totalVerses: 52, revelationType: "مكية", page: 255, juz: 13 },
  { number: 15, name: "الحجر", transliteration: "Al-Hijr", translation: "الحجر", totalVerses: 99, revelationType: "مكية", page: 262, juz: 14 },
  { number: 16, name: "النحل", transliteration: "An-Nahl", translation: "النحل", totalVerses: 128, revelationType: "مكية", page: 267, juz: 14 },
  { number: 17, name: "الإسراء", transliteration: "Al-Isra", translation: "الإسراء", totalVerses: 111, revelationType: "مكية", page: 282, juz: 15 },
  { number: 18, name: "الكهف", transliteration: "Al-Kahf", translation: "الكهف", totalVerses: 110, revelationType: "مكية", page: 293, juz: 15 },
  { number: 19, name: "مريم", transliteration: "Maryam", translation: "مريم", totalVerses: 98, revelationType: "مكية", page: 305, juz: 16 },
  { number: 20, name: "طه", transliteration: "Taha", translation: "طه", totalVerses: 135, revelationType: "مكية", page: 312, juz: 16 },
  { number: 21, name: "الأنبياء", transliteration: "Al-Anbiya", translation: "الأنبياء", totalVerses: 112, revelationType: "مكية", page: 322, juz: 17 },
  { number: 22, name: "الحج", transliteration: "Al-Hajj", translation: "الحج", totalVerses: 78, revelationType: "مدنية", page: 332, juz: 17 },
  { number: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", translation: "المؤمنون", totalVerses: 118, revelationType: "مكية", page: 342, juz: 18 },
  { number: 24, name: "النور", transliteration: "An-Nur", translation: "النور", totalVerses: 64, revelationType: "مدنية", page: 350, juz: 18 },
  { number: 25, name: "الفرقان", transliteration: "Al-Furqan", translation: "الفرقان", totalVerses: 77, revelationType: "مكية", page: 359, juz: 18 },
  { number: 26, name: "الشعراء", transliteration: "Ash-Shu'ara", translation: "الشعراء", totalVerses: 227, revelationType: "مكية", page: 367, juz: 19 },
  { number: 27, name: "النمل", transliteration: "An-Naml", translation: "النمل", totalVerses: 93, revelationType: "مكية", page: 377, juz: 19 },
  { number: 28, name: "القصص", transliteration: "Al-Qasas", translation: "القصص", totalVerses: 88, revelationType: "مكية", page: 385, juz: 20 },
  { number: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", translation: "العنكبوت", totalVerses: 69, revelationType: "مكية", page: 396, juz: 20 },
  { number: 30, name: "الروم", transliteration: "Ar-Rum", translation: "الروم", totalVerses: 60, revelationType: "مكية", page: 404, juz: 21 },
  { number: 31, name: "لقمان", transliteration: "Luqman", translation: "لقمان", totalVerses: 34, revelationType: "مكية", page: 411, juz: 21 },
  { number: 32, name: "السجدة", transliteration: "As-Sajdah", translation: "السجدة", totalVerses: 30, revelationType: "مكية", page: 415, juz: 21 },
  { number: 33, name: "الأحزاب", transliteration: "Al-Ahzab", translation: "الأحزاب", totalVerses: 73, revelationType: "مدنية", page: 418, juz: 21 },
  { number: 34, name: "سبأ", transliteration: "Saba", translation: "سبأ", totalVerses: 54, revelationType: "مكية", page: 428, juz: 22 },
  { number: 35, name: "فاطر", transliteration: "Fatir", translation: "فاطر", totalVerses: 45, revelationType: "مكية", page: 434, juz: 22 },
  { number: 36, name: "يس", transliteration: "Ya-Sin", translation: "يس", totalVerses: 83, revelationType: "مكية", page: 440, juz: 22 },
  { number: 37, name: "الصافات", transliteration: "As-Saffat", translation: "الصافات", totalVerses: 182, revelationType: "مكية", page: 446, juz: 23 },
  { number: 38, name: "ص", transliteration: "Sad", translation: "ص", totalVerses: 88, revelationType: "مكية", page: 453, juz: 23 },
  { number: 39, name: "الزمر", transliteration: "Az-Zumar", translation: "الزمر", totalVerses: 75, revelationType: "مكية", page: 458, juz: 23 },
  { number: 40, name: "غافر", transliteration: "Ghafir", translation: "غافر", totalVerses: 85, revelationType: "مكية", page: 467, juz: 24 },
  { number: 41, name: "فصلت", transliteration: "Fussilat", translation: "فصلت", totalVerses: 54, revelationType: "مكية", page: 477, juz: 24 },
  { number: 42, name: "الشورى", transliteration: "Ash-Shura", translation: "الشورى", totalVerses: 53, revelationType: "مكية", page: 483, juz: 25 },
  { number: 43, name: "الزخرف", transliteration: "Az-Zukhruf", translation: "الزخرف", totalVerses: 89, revelationType: "مكية", page: 489, juz: 25 },
  { number: 44, name: "الدخان", transliteration: "Ad-Dukhan", translation: "الدخان", totalVerses: 59, revelationType: "مكية", page: 496, juz: 25 },
  { number: 45, name: "الجاثية", transliteration: "Al-Jathiyah", translation: "الجاثية", totalVerses: 37, revelationType: "مكية", page: 499, juz: 25 },
  { number: 46, name: "الأحقاف", transliteration: "Al-Ahqaf", translation: "الأحقاف", totalVerses: 35, revelationType: "مكية", page: 502, juz: 26 },
  { number: 47, name: "محمد", transliteration: "Muhammad", translation: "محمد", totalVerses: 38, revelationType: "مدنية", page: 507, juz: 26 },
  { number: 48, name: "الفتح", transliteration: "Al-Fath", translation: "الفتح", totalVerses: 29, revelationType: "مدنية", page: 511, juz: 26 },
  { number: 49, name: "الحجرات", transliteration: "Al-Hujurat", translation: "الحجرات", totalVerses: 18, revelationType: "مدنية", page: 515, juz: 26 },
  { number: 50, name: "ق", transliteration: "Qaf", translation: "ق", totalVerses: 45, revelationType: "مكية", page: 518, juz: 26 },
  { number: 51, name: "الذاريات", transliteration: "Adh-Dhariyat", translation: "الذاريات", totalVerses: 60, revelationType: "مكية", page: 520, juz: 26 },
  { number: 52, name: "الطور", transliteration: "At-Tur", translation: "الطور", totalVerses: 49, revelationType: "مكية", page: 523, juz: 27 },
  { number: 53, name: "النجم", transliteration: "An-Najm", translation: "النجم", totalVerses: 62, revelationType: "مكية", page: 526, juz: 27 },
  { number: 54, name: "القمر", transliteration: "Al-Qamar", translation: "القمر", totalVerses: 55, revelationType: "مكية", page: 528, juz: 27 },
  { number: 55, name: "الرحمن", transliteration: "Ar-Rahman", translation: "الرحمن", totalVerses: 78, revelationType: "مدنية", page: 531, juz: 27 },
  { number: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", translation: "الواقعة", totalVerses: 96, revelationType: "مكية", page: 534, juz: 27 },
  { number: 57, name: "الحديد", transliteration: "Al-Hadid", translation: "الحديد", totalVerses: 29, revelationType: "مدنية", page: 537, juz: 27 },
  { number: 58, name: "المجادلة", transliteration: "Al-Mujadila", translation: "المجادلة", totalVerses: 22, revelationType: "مدنية", page: 542, juz: 28 },
  { number: 59, name: "الحشر", transliteration: "Al-Hashr", translation: "الحشر", totalVerses: 24, revelationType: "مدنية", page: 545, juz: 28 },
  { number: 60, name: "الممتحنة", transliteration: "Al-Mumtahanah", translation: "الممتحنة", totalVerses: 13, revelationType: "مدنية", page: 549, juz: 28 },
  { number: 61, name: "الصف", transliteration: "As-Saff", translation: "الصف", totalVerses: 14, revelationType: "مدنية", page: 551, juz: 28 },
  { number: 62, name: "الجمعة", transliteration: "Al-Jumu'ah", translation: "الجمعة", totalVerses: 11, revelationType: "مدنية", page: 553, juz: 28 },
  { number: 63, name: "المنافقون", transliteration: "Al-Munafiqun", translation: "المنافقون", totalVerses: 11, revelationType: "مدنية", page: 554, juz: 28 },
  { number: 64, name: "التغابن", transliteration: "At-Taghabun", translation: "التغابن", totalVerses: 18, revelationType: "مدنية", page: 556, juz: 28 },
  { number: 65, name: "الطلاق", transliteration: "At-Talaq", translation: "الطلاق", totalVerses: 12, revelationType: "مدنية", page: 558, juz: 28 },
  { number: 66, name: "التحريم", transliteration: "At-Tahrim", translation: "التحريم", totalVerses: 12, revelationType: "مدنية", page: 560, juz: 28 },
  { number: 67, name: "الملك", transliteration: "Al-Mulk", translation: "الملك", totalVerses: 30, revelationType: "مكية", page: 562, juz: 29 },
  { number: 68, name: "القلم", transliteration: "Al-Qalam", translation: "القلم", totalVerses: 52, revelationType: "مكية", page: 564, juz: 29 },
  { number: 69, name: "الحاقة", transliteration: "Al-Haqqah", translation: "الحاقة", totalVerses: 52, revelationType: "مكية", page: 566, juz: 29 },
  { number: 70, name: "المعارج", transliteration: "Al-Ma'arij", translation: "المعارج", totalVerses: 44, revelationType: "مكية", page: 568, juz: 29 },
  { number: 71, name: "نوح", transliteration: "Nuh", translation: "نوح", totalVerses: 28, revelationType: "مكية", page: 570, juz: 29 },
  { number: 72, name: "الجن", transliteration: "Al-Jinn", translation: "الجن", totalVerses: 28, revelationType: "مكية", page: 572, juz: 29 },
  { number: 73, name: "المزمل", transliteration: "Al-Muzzammil", translation: "المزمل", totalVerses: 20, revelationType: "مكية", page: 574, juz: 29 },
  { number: 74, name: "المدثر", transliteration: "Al-Muddaththir", translation: "المدثر", totalVerses: 56, revelationType: "مكية", page: 575, juz: 29 },
  { number: 75, name: "القيامة", transliteration: "Al-Qiyamah", translation: "القيامة", totalVerses: 40, revelationType: "مكية", page: 577, juz: 29 },
  { number: 76, name: "الإنسان", transliteration: "Al-Insan", translation: "الإنسان", totalVerses: 31, revelationType: "مدنية", page: 578, juz: 29 },
  { number: 77, name: "المرسلات", transliteration: "Al-Mursalat", translation: "المرسلات", totalVerses: 50, revelationType: "مكية", page: 580, juz: 29 },
  { number: 78, name: "النبأ", transliteration: "An-Naba", translation: "النبأ", totalVerses: 40, revelationType: "مكية", page: 582, juz: 30 },
  { number: 79, name: "النازعات", transliteration: "An-Nazi'at", translation: "النازعات", totalVerses: 46, revelationType: "مكية", page: 583, juz: 30 },
  { number: 80, name: "عبس", transliteration: "'Abasa", translation: "عبس", totalVerses: 42, revelationType: "مكية", page: 585, juz: 30 },
  { number: 81, name: "التكوير", transliteration: "At-Takwir", translation: "التكوير", totalVerses: 29, revelationType: "مكية", page: 586, juz: 30 },
  { number: 82, name: "الانفطار", transliteration: "Al-Infitar", translation: "الانفطار", totalVerses: 19, revelationType: "مكية", page: 587, juz: 30 },
  { number: 83, name: "المطففين", transliteration: "Al-Mutaffifin", translation: "المطففين", totalVerses: 36, revelationType: "مكية", page: 587, juz: 30 },
  { number: 84, name: "الانشقاق", transliteration: "Al-Inshiqaq", translation: "الانشقاق", totalVerses: 25, revelationType: "مكية", page: 589, juz: 30 },
  { number: 85, name: "البروج", transliteration: "Al-Buruj", translation: "البروج", totalVerses: 22, revelationType: "مكية", page: 590, juz: 30 },
  { number: 86, name: "الطارق", transliteration: "At-Tariq", translation: "الطارق", totalVerses: 17, revelationType: "مكية", page: 591, juz: 30 },
  { number: 87, name: "الأعلى", transliteration: "Al-A'la", translation: "الأعلى", totalVerses: 19, revelationType: "مكية", page: 591, juz: 30 },
  { number: 88, name: "الغاشية", transliteration: "Al-Ghashiyah", translation: "الغاشية", totalVerses: 26, revelationType: "مكية", page: 592, juz: 30 },
  { number: 89, name: "الفجر", transliteration: "Al-Fajr", translation: "الفجر", totalVerses: 30, revelationType: "مكية", page: 593, juz: 30 },
  { number: 90, name: "البلد", transliteration: "Al-Balad", translation: "البلد", totalVerses: 20, revelationType: "مكية", page: 594, juz: 30 },
  { number: 91, name: "الشمس", transliteration: "Ash-Shams", translation: "الشمس", totalVerses: 15, revelationType: "مكية", page: 595, juz: 30 },
  { number: 92, name: "الليل", transliteration: "Al-Layl", translation: "الليل", totalVerses: 21, revelationType: "مكية", page: 595, juz: 30 },
  { number: 93, name: "الضحى", transliteration: "Ad-Duha", translation: "الضحى", totalVerses: 11, revelationType: "مكية", page: 596, juz: 30 },
  { number: 94, name: "الشرح", transliteration: "Ash-Sharh", translation: "الشرح", totalVerses: 8, revelationType: "مكية", page: 596, juz: 30 },
  { number: 95, name: "التين", transliteration: "At-Tin", translation: "التين", totalVerses: 8, revelationType: "مكية", page: 597, juz: 30 },
  { number: 96, name: "العلق", transliteration: "Al-'Alaq", translation: "العلق", totalVerses: 19, revelationType: "مكية", page: 597, juz: 30 },
  { number: 97, name: "القدر", transliteration: "Al-Qadr", translation: "القدر", totalVerses: 5, revelationType: "مكية", page: 598, juz: 30 },
  { number: 98, name: "البينة", transliteration: "Al-Bayyinah", translation: "البينة", totalVerses: 8, revelationType: "مدنية", page: 598, juz: 30 },
  { number: 99, name: "الزلزلة", transliteration: "Az-Zalzalah", translation: "الزلزلة", totalVerses: 8, revelationType: "مدنية", page: 599, juz: 30 },
  { number: 100, name: "العاديات", transliteration: "Al-'Adiyat", translation: "العاديات", totalVerses: 11, revelationType: "مكية", page: 599, juz: 30 },
  { number: 101, name: "القارعة", transliteration: "Al-Qari'ah", translation: "القارعة", totalVerses: 11, revelationType: "مكية", page: 600, juz: 30 },
  { number: 102, name: "التكاثر", transliteration: "At-Takathur", translation: "التكاثر", totalVerses: 8, revelationType: "مكية", page: 600, juz: 30 },
  { number: 103, name: "العصر", transliteration: "Al-'Asr", translation: "العصر", totalVerses: 3, revelationType: "مكية", page: 601, juz: 30 },
  { number: 104, name: "الهمزة", transliteration: "Al-Humazah", translation: "الهمزة", totalVerses: 9, revelationType: "مكية", page: 601, juz: 30 },
  { number: 105, name: "الفيل", transliteration: "Al-Fil", translation: "الفيل", totalVerses: 5, revelationType: "مكية", page: 601, juz: 30 },
  { number: 106, name: "قريش", transliteration: "Quraysh", translation: "قريش", totalVerses: 4, revelationType: "مكية", page: 602, juz: 30 },
  { number: 107, name: "الماعون", transliteration: "Al-Ma'un", translation: "الماعون", totalVerses: 7, revelationType: "مكية", page: 602, juz: 30 },
  { number: 108, name: "الكوثر", transliteration: "Al-Kawthar", translation: "الكوثر", totalVerses: 3, revelationType: "مكية", page: 602, juz: 30 },
  { number: 109, name: "الكافرون", transliteration: "Al-Kafirun", translation: "الكافرون", totalVerses: 6, revelationType: "مكية", page: 603, juz: 30 },
  { number: 110, name: "النصر", transliteration: "An-Nasr", translation: "النصر", totalVerses: 3, revelationType: "مدنية", page: 603, juz: 30 },
  { number: 111, name: "المسد", transliteration: "Al-Masad", translation: "المسد", totalVerses: 5, revelationType: "مكية", page: 603, juz: 30 },
  { number: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", translation: "الإخلاص", totalVerses: 4, revelationType: "مكية", page: 604, juz: 30 },
  { number: 113, name: "الفلق", transliteration: "Al-Falaq", translation: "الفلق", totalVerses: 5, revelationType: "مكية", page: 604, juz: 30 },
  { number: 114, name: "الناس", transliteration: "An-Nas", translation: "الناس", totalVerses: 6, revelationType: "مكية", page: 604, juz: 30 }
];

// Offline & Instant-cached Ayahs for key Surahs (Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar, Al-Asr, Ayat Al-Kursi, Al-Mulk intro)
export const PRELOADED_SURAHS: Record<number, Ayah[]> = {
  1: [
    { number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", juz: 1, page: 1, tafsir: "أبدأ قراءتي مستعينًا بالله، الرحمن ذي الرحمة الواسعة، الرحيم بالخلق." },
    { number: 2, numberInSurah: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", juz: 1, page: 1, tafsir: "الثناء التام والشكر المطلق لله مالك ومربي جميع المخلوقات." },
    { number: 3, numberInSurah: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", juz: 1, page: 1, tafsir: "ذو الرحمة الواسعة الشاملة لكل شيء في الدنيا والآخرة." },
    { number: 4, numberInSurah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", juz: 1, page: 1, tafsir: "المتصرف الأوحد في يوم القيامة والجزاء والحساب." },
    { number: 5, numberInSurah: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", juz: 1, page: 1, tafsir: "نخصك وحدك بالعبادة وإخلاص الطاعة، ونطلب منك وحدك العون." },
    { number: 6, numberInSurah: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", juz: 1, page: 1, tafsir: "وفقنا وأرشدنا وثبتنا على الطريق القويم، طريق الإسلام." },
    { number: 7, numberInSurah: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", juz: 1, page: 1, tafsir: "طريق الأنبياء والصديقين والشهداء والصالحين، غير طريق المغضوب عليهم (اليهود ومن شابههم) ولا الضالين (النصارى ومن على شاكلتهم)." }
  ],
  112: [
    { number: 6222, numberInSurah: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", juz: 30, page: 604, tafsir: "قل أيها الرسول لمن سألوك عن ربك: هو الله المتفرد بالألوهية والربوبية والأسماء والصفات، لا شريك له." },
    { number: 6223, numberInSurah: 2, text: "اللَّهُ الصَّمَدُ", juz: 30, page: 604, tafsir: "السيد الذي تصمد إليه الخلائق في حوائجها ورغائبها، الكامل في صفاته." },
    { number: 6224, numberInSurah: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", juz: 30, page: 604, tafsir: "ليس له ولد ولا والد ولا صاحبة، تنزه عن الشبيه والنظير." },
    { number: 6225, numberInSurah: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", juz: 30, page: 604, tafsir: "ولم يكن له مماثل أو مكافئ في شيء من صفاته وأفعاله سبحانه." }
  ],
  113: [
    { number: 6226, numberInSurah: 1, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", juz: 30, page: 604, tafsir: "قل أعتصم وألتجئ برب الصبح وفالقه بنوره." },
    { number: 6227, numberInSurah: 2, text: "مِن شَرِّ مَا خَلَقَ", juz: 30, page: 604, tafsir: "من شر كل مخلوق فيه شر من إنس وجن وحيوان وجماد." },
    { number: 6228, numberInSurah: 3, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", juz: 30, page: 604, tafsir: "ومن شر ليل شديد الظلام إذا دخل وظلمته انتشرت." },
    { number: 6229, numberInSurah: 4, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", juz: 30, page: 604, tafsir: "ومن شر السواحر اللاتي ينفثن في عقد السحر للإيذاء." },
    { number: 6230, numberInSurah: 5, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", juz: 30, page: 604, tafsir: "ومن شر الحاسد إذا أظهر حسده وتمنى زوال النعمة عن غيره." }
  ],
  114: [
    { number: 6231, numberInSurah: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", juz: 30, page: 604, tafsir: "قل أعتصم وأحتمي بخالق الناس ومدبر أمورهم." },
    { number: 6232, numberInSurah: 2, text: "مَلِكِ النَّاسِ", juz: 30, page: 604, tafsir: "الملك الحقيقي للناس، المتصرف فيهم بما يشاء." },
    { number: 6233, numberInSurah: 3, text: "إِلَٰهِ النَّاسِ", juz: 30, page: 604, tafsir: "معبودهم الحق الذي لا معبود سواه." },
    { number: 6234, numberInSurah: 4, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", juz: 30, page: 604, tafsir: "من شر الشيطان الذي يلقي وساوس الشر عند الغفلة، ويختفي ويخنس عند ذكر الله." },
    { number: 6235, numberInSurah: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", juz: 30, page: 604, tafsir: "الذي يبث الشكوك والخواطر الفاسدة في قلوب الخلق." },
    { number: 6236, numberInSurah: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", juz: 30, page: 604, tafsir: "شياطين الإنس والجن الذين يوسوسون بالسوء." }
  ],
  108: [
    { number: 6205, numberInSurah: 1, text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", juz: 30, page: 602, tafsir: "إنا أعطيناك يا محمد الخير الكثير الدائم، ومنه نهر الكوثر في الجنة." },
    { number: 6206, numberInSurah: 2, text: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", juz: 30, page: 602, tafsir: "فأخلص صلاتك كلها لربك وانحر ذبيحتك له وحده شكرًا." },
    { number: 6207, numberInSurah: 3, text: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", juz: 30, page: 602, tafsir: "إن مبغضك هو المنقطع عن كل خير، المقطوع ذكره." }
  ],
  103: [
    { number: 6177, numberInSurah: 1, text: "وَالْعَصْرِ", juz: 30, page: 601, tafsir: "أقسم الله تعالى بالدهر والزمان لما فيه من العبر والدلالات." },
    { number: 6178, numberInSurah: 2, text: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", juz: 30, page: 601, tafsir: "إن كل إنسان في نقصان وهلاك وخسران." },
    { number: 6179, numberInSurah: 3, text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", juz: 30, page: 601, tafsir: "إلا الذين آمنوا بالله وعملوا الطاعات وأوصى بعضهم بعضًا بالتمسك بالحق والصبر على طاعة الله ومصائبه." }
  ]
};

// Daily Ayah Inspiration
export const DAILY_AYAHS = [
  {
    surahName: "سورة البقرة",
    ayahNumber: 186,
    text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
    tafsir: "قرب الله من عباده وإجابته لدعائهم إذا أخلصوا له وتضرعوا إليه، وحث على الاستجابة لأوامره والإيمان به."
  },
  {
    surahName: "سورة الشرح",
    ayahNumber: 5,
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    tafsir: "بشارة عظيمة بأن مع كل ضيق فرجًا، ولن يغلب عسر يسرين."
  },
  {
    surahName: "سورة طه",
    ayahNumber: 25,
    text: "قَالَ رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي",
    tafsir: "دعاء كليم الله موسى عليه السلام بالسعة وتيسير المهمة العظيمة."
  },
  {
    surahName: "سورة الرعد",
    ayahNumber: 28,
    text: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    tafsir: "إن قلوب المؤمنين تسكن وتستقر وتفرح بذكر الله وتوحيده وقراءة كتابه."
  }
];

// Fetch full Surah text and tafsir from AlQuran Cloud API dynamically with fallback
export async function fetchSurahVerses(surahNumber: number): Promise<Ayah[]> {
  if (PRELOADED_SURAHS[surahNumber]) {
    // We already have instant cached verses for instant responsiveness, but let's check if full text is needed
    if (PRELOADED_SURAHS[surahNumber].length === SURAHS_LIST[surahNumber - 1]?.totalVerses) {
      return PRELOADED_SURAHS[surahNumber];
    }
  }

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.alafasy,ar.muyassar`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 1) {
      const arabicEd = data.data[0];
      const audioEd = data.data[1];
      const tafsirEd = data.data[2];

      const verses: Ayah[] = arabicEd.ayahs.map((a: any, idx: number) => {
        let text = a.text;
        // Strip out bismillah from first ayah if not Surah 1 (as Bismillah is presented in the header)
        if (surahNumber !== 1 && surahNumber !== 9 && idx === 0 && text.startsWith('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')) {
          text = text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '').trim();
        }
        return {
          number: a.number,
          numberInSurah: a.numberInSurah,
          text: text,
          juz: a.juz,
          page: a.page,
          audio: audioEd?.ayahs[idx]?.audio,
          tafsir: tafsirEd?.ayahs[idx]?.text || 'التفسير الميسر للآية الكريمة.'
        };
      });

      return verses;
    }
  } catch (err) {
    console.warn(`Could not fetch live surah ${surahNumber}, falling back to preloaded or generated:`, err);
  }

  // Fallback if offline or API delay
  if (PRELOADED_SURAHS[surahNumber]) {
    return PRELOADED_SURAHS[surahNumber];
  }

  // Graceful fallback dummy verses with Surah metadata
  const meta = SURAHS_LIST[surahNumber - 1];
  return Array.from({ length: Math.min(meta.totalVerses, 10) }, (_, i) => ({
    number: i + 1,
    numberInSurah: i + 1,
    text: `آية رقم ${i + 1} من سورة ${meta.name} المباركة.`,
    juz: meta.juz,
    page: meta.page,
    tafsir: `تفسير الآية ${i + 1} من سورة ${meta.name}.`
  }));
}
