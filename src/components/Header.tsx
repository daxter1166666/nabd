import React from 'react';
import { Heart, ShieldCheck, User as UserIcon, Smartphone, Monitor, Globe } from 'lucide-react';
import { User } from '../types';
import { Language, LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import appLogoIcon from '../assets/images/app_icon_logo_1786478368678.jpg';

interface HeaderProps {
  user: User | null;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenNewCampaign?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentLang,
  onLanguageChange,
  onOpenLogin,
  onOpenProfile,
  isMobileFrame,
  onToggleFrame,
  onOpenNewCampaign,
  onOpenAdmin
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-2.5 transition-all">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* App Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
            <img
              src={appLogoIcon}
              alt={t.appTitle}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-stone-900 flex items-center gap-1.5">
              {t.appTitle}
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded-full font-bold border border-rose-200/80">
                <Heart className="w-2.5 h-2.5 fill-rose-800" />
                {t.navRecord}
              </span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate max-w-[170px] sm:max-w-none">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* User Account & Frame Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Frame Toggle Button */}
          <button
            onClick={onToggleFrame}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-200"
            title={isMobileFrame ? 'Full screen' : 'Mobile frame'}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Admin Dashboard Button if Founder */}
          {user?.isFounder && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-amber-300 transition-all flex items-center gap-1 shrink-0"
              title={t.navAdmin}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="hidden xs:inline">{t.navAdmin}</span>
            </button>
          )}

          {/* User Profile / Login Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 p-1 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition-all shrink-0"
              title={user.name}
            >
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-stone-300"
              />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold px-2.5 py-1.5 sm:px-3 rounded-xl transition-all flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <UserIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.login}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

