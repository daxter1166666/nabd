# مشروع نبض الأمل (HopePulse) - Flutter App

هذا مجلد مشروع **Flutter** الكامل والمنظم لتطبيق "نبض الأمل".

## 📂 هيكل المجلد البرمجي:

```
flutter_app/
├── pubspec.yaml
└── lib/
    ├── main.dart
    ├── models/
    │   └── voice_donation.dart
    ├── screens/
    │   ├── home_screen.dart
    │   ├── campaigns_screen.dart
    │   └── profile_screen.dart
    └── widgets/
        └── audio_card.dart
```

## 🚀 كيفية الاستخراج والتشغيل:

1. **تنزيل الكود**:
   قم بتنزيل المشروع كملف ZIP من القائمة العلويّة للتطبيق (Export to ZIP) أو ربطه بـ GitHub.

2. **فتح المجلد**:
   افتح مجلد `flutter_app` في محرر الكود المفضل لديك (**VS Code** أو **Android Studio**).

3. **تثبيت الحزم**:
   افتح التيرمينال واكتب:
   ```bash
   flutter pub get
   ```

4. **تشغيل التطبيق**:
   اربط هاتف أندرويد أو شغّل محاكي Android Emulator واكتب:
   ```bash
   flutter run
   ```

5. **استخراج ملف APK الجاهز**:
   ```bash
   flutter build apk --release
   ```
   ستجد ملف APK في المسار: `build/app/outputs/flutter-apk/app-release.apk`
