import React from 'react';
import { Mic, Heart, Tag, Sparkles } from 'lucide-react';
import { Campaign } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface CampaignBannerProps {
  campaign: Campaign;
  currentLang?: Language;
  onRecordForCampaign: (campaign: Campaign) => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  campaign,
  currentLang = 'ar',
  onRecordForCampaign
}) => {
  const t = TRANSLATIONS[currentLang];

  const labels = {
    weeklyFeatured: currentLang === 'ar' ? 'فعالية الأسبوع' : currentLang === 'fr' ? 'Action de la Semaine' : currentLang === 'tr' ? 'Haftanın Etkinliği' : currentLang === 'es' ? 'Campaña Destacada' : currentLang === 'de' ? 'Aktion der Woche' : 'Featured Campaign',
    founderQuestion: currentLang === 'ar' ? 'سؤال الفعالية من المؤسس:' : currentLang === 'fr' ? 'Question du Fondateur :' : currentLang === 'tr' ? 'Kurucunun Kampanya Sorusu:' : currentLang === 'es' ? 'Pregunta del Fundador:' : currentLang === 'de' ? 'Frage des Gründers:' : 'Campaign Question from Founder:',
    audioMessages: currentLang === 'ar' ? 'رسالة صوتية' : currentLang === 'fr' ? 'messages vocaux' : currentLang === 'tr' ? 'ses mesajı' : currentLang === 'es' ? 'mensajes de voz' : currentLang === 'de' ? 'Sprachnachrichten' : 'voice messages',
    likesCountLabel: t.likes,
    donateBtn: t.donateVoice
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white mb-6 border border-stone-800">
      {/* Background Image with Clean Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-stone-900/80 z-0" />

      {/* Campaign Content */}
      <div className="relative z-10 p-5 sm:p-6">
        {/* Top Tag Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 font-bold text-[11px] px-3 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            {labels.weeklyFeatured}
          </span>

          <span className="inline-flex items-center gap-1 bg-stone-800/90 text-stone-200 font-bold text-xs px-3 py-1 rounded-md border border-stone-700">
            <Tag className="w-3 h-3 text-rose-400" />
            {campaign.hashtag}
          </span>
        </div>

        {/* Campaign Title & Founder Question Prompt */}
        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
          {campaign.title}
        </h2>

        <div className="bg-stone-800/80 rounded-xl p-3.5 border border-stone-700 mb-4">
          <p className="text-xs text-amber-400 font-bold mb-1 flex items-center gap-1">
            💬 {labels.founderQuestion}
          </p>
          <p className="text-sm text-stone-100 font-semibold leading-relaxed">
            "{campaign.questionPrompt}"
          </p>
        </div>

        {/* Stats & Direct Voice Donation CTA */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-2 border-t border-stone-800">
          <div className="flex items-center gap-4 text-xs font-semibold text-stone-300">
            <div className="flex items-center gap-1">
              <Mic className="w-4 h-4 text-rose-400" />
              <span>{campaign.donationsCount} {labels.audioMessages}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>{campaign.totalLikesCount} {labels.likesCountLabel}</span>
            </div>
          </div>

          <button
            onClick={() => onRecordForCampaign(campaign)}
            className="bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Mic className="w-4 h-4" />
            <span>{labels.donateBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
