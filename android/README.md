# تطبيق نور القرآن (Noor Al-Quran) - Android Native Project

تطبيق قرآن كريم نيتف 100% مكتوب بلغة **Kotlin** وأحدث مكتبات **Jetpack Compose** و **Material 3**، مصمم بدقة فائقة وبمعمارية حديثة مع دعم كامل للـ RTL، وبدون أي WebView، مجهز للبناء كـ Android App Bundle (AAB) ورفعه فورًا على Google Play Console.

## معلومات الحزمة
- **اسم التطبيق**: نور القرآن
- **اسم الحزمة (Package ID)**: `com.noorquran.app`
- **Target SDK**: 35 (Android 15)
- **Min SDK**: 24 (Android 7.0 Nougat فما فوق)
- **معمارية الصوت**: AndroidX Media3 ExoPlayer (تشغيل التلاوات في الخلفية وشاشة القفل)

## خطوات بناء حزمة AAB للنشر على Google Play

### 1. توليد مفتاح التوقيع الرقمي (Keystore):
```bash
keytool -genkey -v -keystore app/release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias noorquran
```

### 2. بناء الـ Android App Bundle (AAB):
```bash
./gradlew bundleRelease
```

### 3. مسار الملف الناتج الجاهز للرفع:
```
app/build/outputs/bundle/release/app-release.aab
```

### 4. الرفع على Google Play Console:
1. أنشئ تطبيقًا جديدًا في [Google Play Console](https://play.google.com/console) باسم "نور القرآن".
2. اختر اللغة العربية (ar) وفئة "كتب ومراجع" (Books & Reference).
3. اسحب ملف `app-release.aab` وأفلته في قسم الإصدار (Release).
4. أضف وصف التطبيق واللقطات واضغط نشر!
