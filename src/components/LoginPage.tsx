import React, { useState } from 'react';
import { User, Mail, UserCheck, Globe } from 'lucide-react';
import { User as UserType } from '../types';
import { Language, LANGUAGES } from '../i18n/translations';
import appLogoIcon from '../assets/images/app_icon_logo_1786478368678.jpg';

interface LoginPageProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onLoginSuccess: (user: UserType) => void;
  onCancel?: () => void;
}

const KNOWN_ADMIN_EMAILS = [
  'kinaniayman86@gmail.com',
  'admin@soat-alamal.com',
  'founder@soat-alamal.com',
  'drsara@soat-alamal.com'
];

export const LoginPage: React.FC<LoginPageProps> = ({
  currentLang = 'ar',
  onLanguageChange,
  onLoginSuccess,
  onCancel
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const labels = {
    title: currentLang === 'ar' ? 'تسجيل الدخول إلى صوت الأمل' : currentLang === 'fr' ? "Connexion à Voix de l'Espoir" : currentLang === 'tr' ? "Umut Sesi'ne Giriş Yap" : currentLang === 'es' ? 'Iniciar sesión en Voz de Esperanza' : currentLang === 'de' ? 'Anmelden bei Stimme der Hoffnung' : 'Log In to Voice of Hope',
    subtitle: currentLang === 'ar' ? 'سجل باسمك للمشاركة والتبرع بالرسائل الصوتية الملهمة' : currentLang === 'fr' ? 'Entrez votre nom pour partager et donner des messages vocaux inspirants' : currentLang === 'tr' ? 'İlham verici sesli mesajlar paylaşmak ve bağışlamak için adınızı girin' : currentLang === 'es' ? 'Ingresa tu nombre para compartir y donar mensajes de voz inspiradores' : currentLang === 'de' ? 'Geben Sie Ihren Namen ein, um inspirierende Sprachnachrichten zu teilen und zu spenden' : 'Enter your name to share and donate inspiring voice messages',
    nameLabel: currentLang === 'ar' ? 'الاسم (سيظهر في ملفك وتبرعاتك):' : currentLang === 'fr' ? 'Nom (apparaîtra sur votre profil et vos dons) :' : currentLang === 'tr' ? 'Adınız (profilinizde ve bağışlarınızda görünecektir):' : currentLang === 'es' ? 'Nombre (aparecerá en tu perfil y donaciones):' : currentLang === 'de' ? 'Name (wird in Ihrem Profil und bei Spenden angezeigt):' : 'Name (will appear on your profile & donations):',
    namePlaceholder: currentLang === 'ar' ? 'مثال: محمد الغامدي' : currentLang === 'fr' ? 'ex. : Thomas Martin' : currentLang === 'tr' ? 'örn: Ahmet Yılmaz' : currentLang === 'es' ? 'ej.: Carlos Rodríguez' : currentLang === 'de' ? 'z. B. Max Mustermann' : 'e.g., John Smith',
    emailLabel: currentLang === 'ar' ? 'البريد الإلكتروني:' : currentLang === 'fr' ? 'Adresse e-mail :' : currentLang === 'tr' ? 'E-posta adresi:' : currentLang === 'es' ? 'Correo electrónico:' : currentLang === 'de' ? 'E-Mail-Adresse:' : 'Email address:',
    emailPlaceholder: currentLang === 'ar' ? 'مثال: name@example.com' : currentLang === 'fr' ? 'ex. : nom@example.com' : currentLang === 'tr' ? 'örn: name@example.com' : currentLang === 'es' ? 'ej.: nombre@example.com' : currentLang === 'de' ? 'z. B. name@example.com' : 'e.g. name@example.com',
    loginBtn: currentLang === 'ar' ? 'الدخول إلى الحساب' : currentLang === 'fr' ? 'Se connecter au compte' : currentLang === 'tr' ? 'Hesaba Giriş Yap' : currentLang === 'es' ? 'Iniciar Sesión' : currentLang === 'de' ? 'Anmelden' : 'Log In to Account',
    demoBtn: currentLang === 'ar' ? 'الدخول فوراً بحساب تجريبي' : currentLang === 'fr' ? 'Connexion rapide avec un compte démo' : currentLang === 'tr' ? 'Hızlı Demo Hesap ile Giriş' : currentLang === 'es' ? 'Entrar inmediatamente con cuenta demo' : currentLang === 'de' ? 'Sofort mit Demo-Konto anmelden' : 'Quick Demo Account Login',
    cancelBtn: currentLang === 'ar' ? 'إلغاء والعودة للرئيسية' : currentLang === 'fr' ? 'Annuler et revenir à l’accueil' : currentLang === 'tr' ? 'İptal ve Ana Sayfaya Dön' : currentLang === 'es' ? 'Cancelar y Volver al Inicio' : currentLang === 'de' ? 'Abbrechen und zurück zur Startseite' : 'Cancel & Return Home',
    selectLanguage: currentLang === 'ar' ? 'اختر لغتك:' : currentLang === 'fr' ? 'Langue :' : currentLang === 'tr' ? 'Dil:' : currentLang === 'es' ? 'Idioma:' : currentLang === 'de' ? 'Sprache:' : 'Language:'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const trimmedEmail = email.trim().toLowerCase();
    const isFounder =
      KNOWN_ADMIN_EMAILS.includes(trimmedEmail) ||
      trimmedEmail.startsWith('admin@') ||
      trimmedEmail.startsWith('founder@');

    const newUser: UserType = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      bio: isFounder
        ? 'مؤسس ومدير منصة صوت الأمل لتنظيم الفعاليات الصوتية الخيرية.'
        : 'متبرع بالصوت والمشاعر الملهمة عبر منصة صوت الأمل.',
      joinedDate: 'أغسطس 2026',
      isFounder
    };

    onLoginSuccess(newUser);
  };

  const handleDemoDonor = () => {
    onLoginSuccess({
      id: 'demo_donor_1',
      name: 'عبدالله السعيد',
      email: 'abdullah.private@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      bio: 'أشعر بسعادة عارمة عند إرسال كلمات الأمل للمحتاجين.',
      joinedDate: 'أغسطس 2026',
      isFounder: false
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-lg border border-stone-200 overflow-hidden">
        {/* Interactive Language Selector Bar in Login Page */}
        <div className="bg-stone-950 p-2 border-b border-stone-800 flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none">
          <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0 me-1" />
          {(Object.keys(LANGUAGES) as Language[]).map((langKey) => {
            const isSelected = currentLang === langKey;
            return (
              <button
                key={langKey}
                type="button"
                onClick={() => onLanguageChange && onLanguageChange(langKey)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-rose-900 text-white shadow-xs border border-rose-700'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/50'
                }`}
              >
                <span>{LANGUAGES[langKey].flag}</span>
                <span>{LANGUAGES[langKey].name}</span>
              </button>
            );
          })}
        </div>

        {/* Banner Top */}
        <div className="bg-stone-900 p-6 text-white text-center relative border-b border-stone-800">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-700 bg-stone-800 mx-auto mb-3">
            <img
              src={appLogoIcon}
              alt="صوت الأمل"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-1 text-white">{labels.title}</h2>
          <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">{labels.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-rose-800 shrink-0" />
              <span>{labels.nameLabel}</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={labels.namePlaceholder}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-rose-800"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-800 shrink-0" />
              <span>{labels.emailLabel}</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={labels.emailPlaceholder}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>{labels.loginBtn}</span>
          </button>

          {/* Quick Demo Options */}
          <div className="pt-3 border-t border-stone-200 text-center">
            <button
              type="button"
              onClick={handleDemoDonor}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors border border-stone-200"
            >
              {labels.demoBtn}
            </button>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-center text-xs text-stone-400 hover:text-stone-600 py-1"
            >
              {labels.cancelBtn}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};


