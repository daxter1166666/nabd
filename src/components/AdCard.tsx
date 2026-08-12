import React from 'react';
import { ExternalLink, Megaphone, CheckCircle2 } from 'lucide-react';
import { AdBanner } from '../types';

interface AdCardProps {
  ad: AdBanner;
  onAdClick: (adId: string) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onAdClick }) => {
  if (!ad.isActive) return null;

  const handleClick = () => {
    onAdClick(ad.id);
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all hover:border-stone-300 my-4">
      {/* Top Banner Tag */}
      <div className="bg-stone-100 border-b border-stone-200 px-3 py-1.5 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-stone-700">
          <Megaphone className="w-3.5 h-3.5 text-rose-800" />
          {ad.badgeText || 'إعلان برعاية'}
        </span>
        <span className="text-[10px] text-stone-400 font-medium">{ad.sponsorName}</span>
      </div>

      {/* Ad Image & Content */}
      <div className="p-3.5 flex flex-col sm:flex-row gap-3 items-center">
        <div className="w-full sm:w-28 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-right space-y-1.5">
          <h4 className="font-bold text-stone-900 text-sm leading-snug">{ad.title}</h4>
          <p className="text-xs text-stone-500 line-clamp-2 font-medium">
            دعم شركاء الأمل والمسؤولية المجتمعية. انقر للتفاصيل والتواصل المباشر.
          </p>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              محتوى موثوق
            </span>

            <button
              onClick={handleClick}
              className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>زيارة الإعلان</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
