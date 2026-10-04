import React, { useState } from 'react';
import { 
  X, Download, Copy, Check, FileCode, Folder, Terminal, 
  ExternalLink, Sparkles, ShieldCheck, PlayCircle, Smartphone 
} from 'lucide-react';
import { ANDROID_PROJECT_FILES, ANDROID_PACKAGE_NAME, AndroidFile } from '../data/androidProjectFiles';
import { downloadAndroidProjectZip } from '../utils/zipGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_PROJECT_FILES[3]); // app/build.gradle.kts default
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'guide'>('files');
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadAndroidProjectZip();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
      <div className="bg-slate-900 border border-emerald-600/40 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-cairo">مشروع Android Native (Kotlin & Compose)</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                  {ANDROID_PACKAGE_NAME}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-cairo">جاهز للبناء كـ AAB والنشر مباشرة على Google Play بدون WebView</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-950/50 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'جاري تجهيز الـ ZIP...' : 'تحميل مشروع أندرويد كامل (.ZIP)'}</span>
            </button>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 border-b border-slate-800 text-sm">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'files' 
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>مستعرض ملفات الكود ({ANDROID_PROJECT_FILES.length} ملف)</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide' 
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>خطوات بناء AAB والرفع على Google Play</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'files' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
              {/* Sidebar file tree */}
              <div className="md:col-span-4 bg-slate-950/60 border-l border-slate-800 overflow-y-auto p-3 space-y-1">
                <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span>شجرة ملفات المشروع الأصلي</span>
                </div>
                {ANDROID_PROJECT_FILES.map((file) => {
                  const isSelected = selectedFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-600/25 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm' 
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div className="truncate">
                        <div className="truncate font-mono">{file.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{file.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Code Viewer */}
              <div className="md:col-span-8 flex flex-col h-full bg-slate-950">
                <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">{selectedFile.path}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {selectedFile.description}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-xs font-mono text-emerald-300/90 whitespace-pre leading-relaxed select-text" dir="ltr">
                    {selectedFile.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            /* Guide Tab */
            <div className="h-full overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-600/30 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-cairo">تطبيق أندرويد نيتف 100% مجهز لمعايير Google Play 2025</h3>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                      هذا المشروع مبني باستخدام <strong>Kotlin 2.0</strong> و <strong>Jetpack Compose</strong> مع معمارية حديثة ومكتبة <strong>Media3 ExoPlayer</strong> لتشغيل تلاوات القرآن في الخلفية وشاشة القفل، وبدون أي WebView، مما يمنحه سرعة فائقة وقبولاً فورياً على متجر Google Play.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">1</span>
                  <h4 className="font-bold text-white text-base">استيراد المشروع في Android Studio</h4>
                </div>
                <p className="text-sm text-slate-300 pr-10">
                  قم بتحميل ملف المشروع بصيغة ZIP من الزر العلوي، وفك الضغط عنه، ثم في <strong>Android Studio Ladybug / Koala</strong> اختر <strong>Open Existing Project</strong> وحدد المجلد.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">2</span>
                  <h4 className="font-bold text-white text-base">توليد مفتاح التوقيع (Release Keystore)</h4>
                </div>
                <p className="text-sm text-slate-300 pr-10">
                  في تبويب Terminal داخل المجلد، نفذ الأمر التالي لتوليد مفتاح التوقيع الرقمي للتطبيق:
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 mr-10" dir="ltr">
                  keytool -genkey -v -keystore app/release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias noorquran
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">3</span>
                  <h4 className="font-bold text-white text-base">أمر بناء حزمة Android App Bundle (.AAB)</h4>
                </div>
                <p className="text-sm text-slate-300 pr-10">
                  لبناء حزمة AAB المدمجة والمضغوطة تلقائياً بواسطة Gradle:
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 mr-10 flex items-center justify-between" dir="ltr">
                  <span>./gradlew bundleRelease</span>
                  <span className="text-slate-500 text-[11px] font-sans">أو Build &gt; Generate Signed Bundle / APK</span>
                </div>
                <p className="text-xs text-slate-400 pr-10">
                  ستجد ملف الحزمة الناتج في: <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded" dir="ltr">app/build/outputs/bundle/release/app-release.aab</code>
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">4</span>
                  <h4 className="font-bold text-white text-base">الرفع إلى Google Play Console</h4>
                </div>
                <ul className="text-sm text-slate-300 pr-10 space-y-1.5 list-disc list-inside">
                  <li>افتح منصة <span className="text-emerald-400 font-semibold">Google Play Console</span> وسجّل الدخول.</li>
                  <li>انقر على <strong>Create App</strong> باسم: <strong>نور القرآن</strong> مع الحزمة: <span className="font-mono text-amber-300">com.noorquran.app</span>.</li>
                  <li>ارفع أيقونة التطبيق (مرفقة في المشروع بدقة 512x512).</li>
                  <li>في قسم <strong>App Bundle</strong>، اسحب وأفلت ملف <code className="text-emerald-300 font-mono">app-release.aab</code>.</li>
                  <li>اضغط <strong>Review & Rollout to Production</strong> لنشر التطبيق لملايين المسلمين حول العالم!</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950/80 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>نور القرآن - مبني بـ Jetpack Compose & Material 3 مع دعم كامل للـ RTL</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            إغلاق العارض
          </button>
        </div>

      </div>
    </div>
  );
};
