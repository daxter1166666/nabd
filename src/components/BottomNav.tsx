import React from 'react';
import { Home, Hash, Mic, User as UserIcon, ShieldCheck } from 'lucide-react';
import { NavTab, User } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface BottomNavProps {
  user?: User | null;
  activeTab: NavTab;
  currentLang?: Language;
  onSelectTab: (tab: NavTab) => void;
  onOpenRecordModal: () => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  user,
  activeTab,
  currentLang = 'ar',
  onSelectTab,
  onOpenRecordModal
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 px-3 py-2 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1.5 sm:px-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'feed'
              ? 'text-rose-900 font-bold bg-rose-50/80'
              : 'text-stone-400 hover:text-stone-600 font-medium'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap">{t.navHome}</span>
        </button>

        {/* Tab 2: Search */}
        <button
          onClick={() => onSelectTab('search')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1.5 sm:px-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'search'
              ? 'text-rose-900 font-bold bg-rose-50/80'
              : 'text-stone-400 hover:text-stone-600 font-medium'
          }`}
        >
          <Hash className="w-5 h-5 shrink-0" />
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap">{t.navSearch}</span>
        </button>

        {/* Tab 3: Central Highlighted Record Voice Button */}
        <div className="relative -top-3 sm:-top-4 shrink-0 mx-1">
          <button
            onClick={onOpenRecordModal}
            id="center-record-btn"
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white shadow-md transition-all active:scale-95"
            title={t.navRecord}
          >
            <Mic className="w-5 h-5" />
          </button>
          <span className="block text-center text-[8px] sm:text-[9px] font-bold text-rose-900 mt-0.5 whitespace-nowrap">
            {t.navRecord}
          </span>
        </div>

        {/* Tab 4: Admin Panel (If Admin/Founder) */}
        {user?.isFounder && (
          <button
            onClick={() => onSelectTab('admin')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 sm:px-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'admin'
                ? 'text-amber-900 font-bold bg-amber-50'
                : 'text-amber-700 hover:text-amber-900 font-medium'
            }`}
            title={t.navAdmin}
          >
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-[9px] sm:text-[10px] whitespace-nowrap">{t.navAdmin}</span>
          </button>
        )}

        {/* Tab 5: Profile */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1.5 sm:px-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'profile'
              ? 'text-rose-900 font-bold bg-rose-50/80'
              : 'text-stone-400 hover:text-stone-600 font-medium'
          }`}
        >
          <UserIcon className="w-5 h-5 shrink-0" />
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap">{t.navProfile}</span>
        </button>
      </div>
    </div>
  );
};


