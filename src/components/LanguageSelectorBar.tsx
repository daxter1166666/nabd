import React from 'react';
import { Globe, Check, Sparkles } from 'lucide-react';
import { Language, LANGUAGES, TRANSLATIONS } from '../i18n/translations';

interface LanguageSelectorBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelectorBar: React.FC<LanguageSelectorBarProps> = ({
  currentLang,
  onLanguageChange
}) => {
  const languagesList = Object.keys(LANGUAGES) as Language[];

  return (
    <div className="bg-stone-900 text-white px-3 py-2 border-b border-stone-800 shadow-sm relative z-20">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Label & Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-6 h-6 rounded-lg bg-rose-900/80 text-rose-300 flex items-center justify-center border border-rose-700/50">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <div className="hidden xs:block">
            <span className="text-[10px] text-amber-400 font-bold block leading-none flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              {currentLang === 'ar' ? 'الترجمة الفورية' : 'Instant Translation'}
            </span>
            <span className="text-[9px] text-stone-400 font-medium">
              {currentLang === 'ar' ? 'اختر لغة التطبيق والفعاليات' : 'Select language'}
            </span>
          </div>
        </div>

        {/* Scrollable Language Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {languagesList.map((langKey) => {
            const lang = LANGUAGES[langKey];
            const isActive = currentLang === langKey;

            return (
              <button
                key={langKey}
                onClick={() => onLanguageChange(langKey)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all duration-200 border ${
                  isActive
                    ? 'bg-rose-900 text-white border-rose-500/80 shadow-md ring-1 ring-rose-400/30 scale-105'
                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700/80 hover:text-white'
                }`}
              >
                <span className="text-xs">{lang.flag}</span>
                <span>{lang.name}</span>
                {isActive && <Check className="w-3 h-3 text-amber-400 ms-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
