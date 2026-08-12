import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const HopePulseApp());
}

class HopePulseApp extends StatefulWidget {
  const HopePulseApp({Key? key}) : super(key: key);

  @override
  State<HopePulseApp> createState() => _HopePulseAppState();
}

class _HopePulseAppState extends State<HopePulseApp> {
  Locale _currentLocale = const Locale('ar');

  void _changeLanguage(String langCode) {
    setState(() {
      _currentLocale = Locale(langCode);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'نبض الأمل - HopePulse',
      debugShowCheckedModeBanner: false,
      locale: _currentLocale,
      supportedLocales: const [
        Locale('ar'),
        Locale('en'),
        Locale('fr'),
        Locale('tr'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0C0A09),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF9F1239),
          secondary: Color(0xFFD97706),
          surface: Color(0xFF1C1917),
        ),
        textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      ),
      home: HomeScreen(onChangeLanguage: _changeLanguage),
    );
  }
}
