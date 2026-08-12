import React from 'react';
import { Mic, Heart, UserCheck, X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import appLogoIcon from '../assets/images/app_icon_logo_1786478368678.jpg';

interface GuestLoginModalProps {
  isOpen: boolean;
  currentLang: Language;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const GuestLoginModal: React.FC<GuestLoginModalProps> = ({
  isOpen,
  currentLang,
  onClose,
  onOpenLogin
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Visual */}
        <div className="bg-rose-950 text-white p-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-rose-300/40 mx-auto mb-3 shadow-lg bg-stone-900">
            <img src={appLogoIcon} alt="Voice of Hope" className="w-full h-full object-cover" />
          </div>

          <h3 className="font-black text-base text-white mb-1">{t.loginRequiredTitle}</h3>
          <p className="text-xs text-rose-200/90 leading-relaxed font-medium max-w-xs mx-auto">
            {t.loginRequiredDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-5 space-y-3">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600 space-y-2 font-medium">
            <div className="flex items-center gap-2 text-stone-800 font-bold">
              <Mic className="w-4 h-4 text-rose-800" />
              <span>{t.donateVoice}</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-snug">
              {currentLang === 'ar'
                ? 'تصفح الفعاليات والصوتيات متاح مجاناً للجميع كزائر. لتسجيل صوتيتك ورسالتك الإنسانية، يستغرق التسجيل بضع ثوانٍ فقط!'
                : 'Browsing campaigns & listening is free for all guests. To donate your voice message, registration takes just a few seconds!'}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="w-full py-3 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.loginToDonateBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
