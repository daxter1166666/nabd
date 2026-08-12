import React, { useState } from 'react';
import { Search, Tag, Filter, Volume2, Music2, Target } from 'lucide-react';
import { HashtagCategory, AudioMessage, Campaign, AdBanner } from '../types';
import { HASHTAG_CATEGORIES } from '../data/mockData';
import { AudioCard } from './AudioCard';
import { AdCard } from './AdCard';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SearchPageProps {
  messages: AudioMessage[];
  campaigns: Campaign[];
  currentUserId: string;
  currentLang?: Language;
  onLikeToggle: (messageId: string) => void;
  selectedHashtagFilter?: string | null;
  onSelectHashtagFilter: (tag: string | null) => void;
  onRecordForCampaign: (campaign: Campaign) => void;
  ads?: AdBanner[];
  onAdClick?: (adId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  messages,
  campaigns,
  currentUserId,
  currentLang = 'ar',
  onLikeToggle,
  selectedHashtagFilter,
  onSelectHashtagFilter,
  onRecordForCampaign,
  ads = [],
  onAdClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'campaigns'>('messages');
  const t = TRANSLATIONS[currentLang];

  const searchAd = ads.find((a) => a.position === 'search' && a.isActive);

  // Filter messages based on search query or selected hashtag
  const filteredMessages = messages.filter((msg) => {
    const matchesHashtag = selectedHashtagFilter
      ? msg.hashtag === selectedHashtagFilter
      : true;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ||
      msg.hashtag.toLowerCase().includes(query) ||
      msg.campaignTitle.toLowerCase().includes(query) ||
      msg.donorName.toLowerCase().includes(query) ||
      (msg.transcriptText && msg.transcriptText.toLowerCase().includes(query));

    return matchesHashtag && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute right-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث بالهاشتاغ، اسم المتبرع، أو فئة الفعالية..."
          className="w-full bg-white border border-stone-300 rounded-xl py-3 pr-11 pl-4 text-xs font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-800"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-3 text-xs text-rose-800 hover:text-stone-900 font-bold"
          >
            مسح
          </button>
        )}
      </div>

      {/* Ad Placement for Search Page if active */}
      {searchAd && onAdClick && (
        <AdCard ad={searchAd} onAdClick={onAdClick} />
      )}

      {/* Popular Hashtags Pills Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-stone-800 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-rose-800" />
            الهاشتاغات الأكثر مشاركة:
          </h3>
          {selectedHashtagFilter && (
            <button
              onClick={() => onSelectHashtagFilter(null)}
              className="text-[11px] text-rose-800 hover:underline font-bold"
            >
              إلغاء تصفية الهاشتاغ
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {HASHTAG_CATEGORIES.map((cat: HashtagCategory) => {
            const isSelected = selectedHashtagFilter === cat.tag;
            return (
              <button
                key={cat.tag}
                onClick={() =>
                  onSelectHashtagFilter(isSelected ? null : cat.tag)
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-rose-900 text-white'
                    : 'bg-stone-100 border border-stone-200 text-stone-800 hover:bg-stone-200'
                }`}
              >
                <span>{cat.tag}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle View Tabs: Messages vs Campaigns */}
      <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'messages' ? 'bg-rose-900 text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Music2 className="w-4 h-4" />
          <span>الصوتيات المنشورة ({filteredMessages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'campaigns' ? 'bg-rose-900 text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>أرشيف الفعاليات ({campaigns.length})</span>
        </button>
      </div>

      {/* Tab 1: Audio Messages Search Results */}
      {activeTab === 'messages' && (
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-2">
              <Filter className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-bold text-stone-800 text-sm">لم يتم العثور على صوتيات مطابقة للبحث!</p>
              <p className="text-xs text-stone-400">جرب البحث بكلمات أخرى أو اختر هاشتاغ مختلف.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <AudioCard
                key={msg.id}
                message={msg}
                currentUserId={currentUserId}
                currentLang={currentLang}
                onLikeToggle={onLikeToggle}
                onSelectHashtag={(tag) => onSelectHashtagFilter(tag)}
              />
            ))
          )}
        </div>
      )}

      {/* Tab 2: Campaigns & Activities Archive */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 h-32 sm:h-auto relative bg-stone-800 shrink-0">
                <img
                  src={camp.coverImage}
                  alt={camp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {camp.isActive && (
                  <span className="absolute top-2 right-2 bg-rose-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    نشط الآن
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-rose-900 bg-rose-50/80 px-2 py-0.5 rounded-md border border-rose-200/80">
                      {camp.hashtag}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">منظمة: {camp.organizerName}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">{camp.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2">{camp.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-rose-800" />
                    {camp.donationsCount} رسالة صوتية
                  </span>

                  <button
                    onClick={() => onRecordForCampaign(camp)}
                    className="bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    شارك بصوتك
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
