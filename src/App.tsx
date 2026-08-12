import React, { useState, useEffect } from 'react';
import { User, Campaign, AudioMessage, AdBanner, NavTab } from './types';
import { INITIAL_USER, INITIAL_CAMPAIGNS, INITIAL_MESSAGES, INITIAL_ADS } from './data/mockData';
import { Language, TRANSLATIONS, LANGUAGES } from './i18n/translations';
import { translateCampaign, translateAudioMessage } from './i18n/autoTranslate';
import { Header } from './components/Header';
import { LanguageSelectorBar } from './components/LanguageSelectorBar';
import { BottomNav } from './components/BottomNav';
import { CampaignBanner } from './components/CampaignBanner';
import { AudioCard } from './components/AudioCard';
import { AudioRecorderModal } from './components/AudioRecorderModal';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { SearchPage } from './components/SearchPage';
import { NewCampaignModal } from './components/NewCampaignModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdCard } from './components/AdCard';
import { GuestLoginModal } from './components/GuestLoginModal';
import { Mic, Heart, Tag, Sparkles, Filter, CheckCircle, Volume2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USER);
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavTab>('feed');
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [messages, setMessages] = useState<AudioMessage[]>(INITIAL_MESSAGES);
  const [ads, setAds] = useState<AdBanner[]>(INITIAL_ADS);

  // Modals
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGuestLoginModalOpen, setIsGuestLoginModalOpen] = useState(false);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [selectedRecordCampaign, setSelectedRecordCampaign] = useState<Campaign | undefined>(undefined);

  // Filters & Frames
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [selectedHashtagFilter, setSelectedHashtagFilter] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang];

  // Dynamically Translate Campaigns & Audio Messages based on active language
  const translatedCampaigns = campaigns.map((c) => translateCampaign(c, currentLang));
  const translatedMessages = messages.map((m) => translateAudioMessage(m, currentLang, campaigns));

  // Update HTML text direction according to chosen language
  useEffect(() => {
    const dir = TRANSLATIONS[currentLang].dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  const activeCampaign = translatedCampaigns.find((c) => c.isActive) || translatedCampaigns[0];

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    const langObj = LANGUAGES[lang];
    const msg = lang === 'ar' ? `تم تحويل لغة التطبيق والفعاليات إلى ${langObj.name} بنجاح!` : `App and campaign content translated to ${langObj.name}!`;
    showToast(msg);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin Campaign Handlers
  const handleToggleCampaignActive = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId) {
          const nextStatus = !c.isActive;
          showToast(nextStatus ? `تم فتح وتفعيل الفعالية: ${c.title}` : `تم إغلاق الفعالية: ${c.title}`);
          return { ...c, isActive: nextStatus };
        }
        return c;
      })
    );
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
    showToast('تم حذف الفعالية من النظام.');
  };

  const handleEditCampaign = (updatedCampaign: Campaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c)));
    showToast('تم حفظ تعديلات الفعالية بنجاح.');
  };

  // Admin Ads Handlers
  const handleToggleAdActive = (adId: string) => {
    setAds((prev) =>
      prev.map((a) => {
        if (a.id === adId) {
          const nextActive = !a.isActive;
          showToast(nextActive ? 'تم تفعيل ظهور الإعلان.' : 'تم إيقاف الإعلان.');
          return { ...a, isActive: nextActive };
        }
        return a;
      })
    );
  };

  const handleDeleteAd = (adId: string) => {
    setAds((prev) => prev.filter((a) => a.id !== adId));
    showToast('تم حذف الإعلان.');
  };

  const handleAddAd = (newAdData: Omit<AdBanner, 'id' | 'clicksCount' | 'viewsCount'>) => {
    const newAd: AdBanner = {
      ...newAdData,
      id: `ad_${Date.now()}`,
      clicksCount: 0,
      viewsCount: 10
    };
    setAds([newAd, ...ads]);
    showToast('🎉 تم نشر الإعلان الجديد بنجاح!');
  };

  const handleAdClick = (adId: string) => {
    setAds((prev) =>
      prev.map((a) => (a.id === adId ? { ...a, clicksCount: a.clicksCount + 1 } : a))
    );
  };

  // Toggle Like Handler ("لا توجد تعليقات على صوتية توجد فقط اعجابات")
  const handleLikeToggle = (messageId: string) => {
    if (!currentUser) {
      setIsGuestLoginModalOpen(true);
      return;
    }

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const isLiked = !msg.isLikedByCurrentUser;
          const newLikesCount = isLiked ? msg.likesCount + 1 : Math.max(0, msg.likesCount - 1);

          // Update total likes count in associated campaign
          setCampaigns((camps) =>
            camps.map((c) =>
              c.id === msg.campaignId
                ? { ...c, totalLikesCount: isLiked ? c.totalLikesCount + 1 : Math.max(0, c.totalLikesCount - 1) }
                : c
            )
          );

          return {
            ...msg,
            likesCount: newLikesCount,
            isLikedByCurrentUser: isLiked
          };
        }
        return msg;
      })
    );
  };

  // Submit Audio Message Handler
  const handleSubmitAudio = (data: {
    campaignId: string;
    campaignTitle: string;
    hashtag: string;
    category: string;
    durationSeconds: number;
    transcriptText: string;
    audioBlob?: Blob;
  }) => {
    if (!currentUser) return;

    const newMessage: AudioMessage = {
      id: `msg_${Date.now()}`,
      campaignId: data.campaignId,
      campaignTitle: data.campaignTitle,
      hashtag: data.hashtag,
      donorId: currentUser.id,
      donorName: currentUser.name,
      donorAvatar: currentUser.avatar,
      durationSeconds: data.durationSeconds,
      likesCount: 1, // Auto like by author
      isLikedByCurrentUser: true,
      createdAt: 'الآن',
      transcriptText: data.transcriptText,
      category: data.category,
      audioBlob: data.audioBlob
    };

    setMessages([newMessage, ...messages]);

    // Increment donations count for campaign
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === data.campaignId
          ? { ...c, donationsCount: c.donationsCount + 1, totalLikesCount: c.totalLikesCount + 1 }
          : c
      )
    );

    showToast('🎉 تم نشر تبرعك الصوتي بنجاح! شكراً لكلماتك الملهمة.');
  };

  // Delete Audio Message Handler
  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    showToast('تم حذف الرسالة الصوتية.');
  };

  // Add New Campaign Handler
  const handleAddCampaign = (newCamp: Campaign) => {
    setCampaigns([newCamp, ...campaigns]);
    showToast('👑 تم إطلاق الفعالية الجديدة بنجاح!');
  };

  const handleOpenRecordForCampaign = (camp: Campaign) => {
    if (!currentUser) {
      setIsGuestLoginModalOpen(true);
      return;
    }
    setSelectedRecordCampaign(camp);
    setIsRecordModalOpen(true);
  };

  // Filter translated messages for main feed
  const feedMessages = translatedMessages.filter((msg) => {
    if (selectedCategoryFilter !== 'all' && msg.category !== selectedCategoryFilter) {
      return false;
    }
    if (selectedHashtagFilter && msg.hashtag !== selectedHashtagFilter) {
      return false;
    }
    return true;
  });

  const categoryLabels = {
    all: currentLang === 'ar' ? 'الجميع' : currentLang === 'fr' ? 'Tous' : currentLang === 'tr' ? 'Tümü' : currentLang === 'es' ? 'Todos' : currentLang === 'de' ? 'Alle' : 'All',
    cancer: currentLang === 'ar' ? '🎀 مرضى السرطان' : currentLang === 'fr' ? '🎀 Cancer' : currentLang === 'tr' ? '🎀 Kanser' : currentLang === 'es' ? '🎀 Cáncer' : currentLang === 'de' ? '🎀 Krebs' : '🎀 Cancer',
    elderly: currentLang === 'ar' ? '👵 كبار السن' : currentLang === 'fr' ? '👵 Aînés' : currentLang === 'tr' ? '👵 Yaşlılar' : currentLang === 'es' ? '👵 Adultos Mayores' : currentLang === 'de' ? '👵 Senioren' : '👵 Elderly',
    autism: currentLang === 'ar' ? '🧩 أبطال التوحد' : currentLang === 'fr' ? '🧩 Autisme' : currentLang === 'tr' ? '🧩 Otizm' : currentLang === 'es' ? '🧩 Autismo' : currentLang === 'de' ? '🧩 Autismus' : '🧩 Autism',
    hospitals: currentLang === 'ar' ? '👶 أطفال المستشفيات' : currentLang === 'fr' ? '👶 Enfants Hôpital' : currentLang === 'tr' ? '👶 Hastane Çocukları' : currentLang === 'es' ? '👶 Niños Hospital' : currentLang === 'de' ? '👶 Krankenhause-Kinder' : '👶 Hospitalized Kids'
  };

  const feedHeaderTitle = currentLang === 'ar' ? `الرسائل الصوتية المتبرع بها (${feedMessages.length})` : currentLang === 'fr' ? `Dons Vocaux (${feedMessages.length})` : currentLang === 'tr' ? `Ses Bağışları (${feedMessages.length})` : currentLang === 'es' ? `Donaciones de Voz (${feedMessages.length})` : currentLang === 'de' ? `Sprachspenden (${feedMessages.length})` : `Voice Donations (${feedMessages.length})`;
  const feedHeaderSubtitle = currentLang === 'ar' ? 'تفاعلات بالإعجاب فقط' : currentLang === 'fr' ? 'Interactions par J\'aime uniquement' : currentLang === 'tr' ? 'Sadece Beğeni İle Etkileşim' : currentLang === 'es' ? 'Solo Me Gusta' : currentLang === 'de' ? 'Nur Gefällt-mir Reaktionen' : 'Likes interactions only';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-900 font-sans antialiased dir-rtl flex justify-center items-center p-0 sm:p-4">
      {/* Container Box (Mobile Frame or Full Screen) */}
      <div
        className={`w-full transition-all duration-300 bg-stone-50 min-h-screen relative overflow-x-hidden ${
          isMobileFrame
            ? 'max-w-md sm:rounded-[36px] sm:shadow-2xl sm:border-[8px] sm:border-stone-800 sm:min-h-[840px] sm:max-h-[92vh] sm:overflow-y-auto'
            : 'max-w-3xl min-h-screen shadow-xl'
        }`}
      >
        {/* Top Header */}
        <Header
          user={currentUser}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
          onOpenAdmin={() => setActiveTab('admin')}
        />

        {/* Dedicated Language Selector Bar */}
        <LanguageSelectorBar
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
        />

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-stone-800 flex items-center gap-2 shadow-2xl animate-fade-in">
            <CheckCircle className="w-4 h-4 text-rose-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main View Area */}
        <main className="p-4 sm:p-5">
          {/* TAB 1: HOME FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-5 pb-20">
              {/* Active Campaign Banner */}
              <CampaignBanner
                campaign={activeCampaign}
                currentLang={currentLang}
                onRecordForCampaign={handleOpenRecordForCampaign}
              />

              {/* Sponsor Top Ad Banner if active */}
              {ads.find((a) => a.position === 'top' && a.isActive) && (
                <AdCard
                  ad={ads.find((a) => a.position === 'top' && a.isActive)!}
                  onAdClick={handleAdClick}
                />
              )}

              {/* Category Quick Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('all');
                    setSelectedHashtagFilter(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'all' && !selectedHashtagFilter
                      ? 'bg-rose-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {categoryLabels.all}
                </button>
                <button
                  onClick={() => setSelectedCategoryFilter('cancer')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'cancer'
                      ? 'bg-rose-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {categoryLabels.cancer}
                </button>
                <button
                  onClick={() => setSelectedCategoryFilter('elderly')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'elderly'
                      ? 'bg-rose-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {categoryLabels.elderly}
                </button>
                <button
                  onClick={() => setSelectedCategoryFilter('autism')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'autism'
                      ? 'bg-rose-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {categoryLabels.autism}
                </button>
                <button
                  onClick={() => setSelectedCategoryFilter('hospitals')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'hospitals'
                      ? 'bg-rose-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {categoryLabels.hospitals}
                </button>
              </div>

              {/* Feed Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-rose-800" />
                  {feedHeaderTitle}
                </h3>
                <span className="text-[11px] text-stone-400 font-medium">{feedHeaderSubtitle}</span>
              </div>

              {/* Messages Feed */}
              {feedMessages.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
                  <Filter className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-bold text-stone-800 text-sm">
                    {currentLang === 'ar' ? 'لا توجد صوتيات في هذه الفئة حالياً' : 'No voice messages in this category currently'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      setSelectedHashtagFilter(null);
                    }}
                    className="text-xs text-rose-800 font-bold underline"
                  >
                    {currentLang === 'ar' ? 'عرض كل التبرعات الصوتية' : 'Show all voice donations'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {feedMessages.map((msg, index) => (
                    <React.Fragment key={msg.id}>
                      <AudioCard
                        message={msg}
                        currentUserId={currentUser?.id || ''}
                        currentLang={currentLang}
                        onLikeToggle={handleLikeToggle}
                        onDeleteMessage={handleDeleteMessage}
                        onSelectHashtag={(tag) => {
                          setSelectedHashtagFilter(tag);
                          setActiveTab('search');
                        }}
                      />
                      {/* Inject Feed Sponsor Ad after second message */}
                      {index === 1 && ads.find((a) => a.position === 'feed' && a.isActive) && (
                        <AdCard
                          ad={ads.find((a) => a.position === 'feed' && a.isActive)!}
                          onAdClick={handleAdClick}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SEARCH & HASHTAGS */}
          {activeTab === 'search' && (
            <SearchPage
              messages={translatedMessages}
              campaigns={translatedCampaigns}
              currentUserId={currentUser?.id || ''}
              currentLang={currentLang}
              onLikeToggle={handleLikeToggle}
              selectedHashtagFilter={selectedHashtagFilter}
              onSelectHashtagFilter={(tag) => setSelectedHashtagFilter(tag)}
              onRecordForCampaign={handleOpenRecordForCampaign}
              ads={ads}
              onAdClick={handleAdClick}
            />
          )}

          {/* TAB 3: ADMIN DASHBOARD */}
          {activeTab === 'admin' && (
            currentUser?.isFounder ? (
              <AdminDashboard
                user={currentUser}
                campaigns={campaigns}
                messages={messages}
                ads={ads}
                onToggleCampaignActive={handleToggleCampaignActive}
                onDeleteCampaign={handleDeleteCampaign}
                onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)}
                onEditCampaign={handleEditCampaign}
                onDeleteMessage={handleDeleteMessage}
                onToggleAdActive={handleToggleAdActive}
                onDeleteAd={handleDeleteAd}
                onAddAd={handleAddAd}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
                <p className="font-bold text-stone-800 text-sm">هذه الصفحة خاصة بمدير التطبيق والمؤسس فقط.</p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-rose-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  تسجيل الدخول بحساب المدير
                </button>
              </div>
            )
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            currentUser ? (
              <div className="space-y-4">
                <ProfilePage
                  user={currentUser}
                  userMessages={translatedMessages.filter((m) => m.donorId === currentUser.id)}
                  currentLang={currentLang}
                  onLikeToggle={handleLikeToggle}
                  onDeleteMessage={handleDeleteMessage}
                  onLogout={() => {
                    setCurrentUser(null);
                    setIsLoginModalOpen(true);
                  }}
                  onOpenRecordModal={() => setIsRecordModalOpen(true)}
                  onSelectHashtag={(tag) => {
                    setSelectedHashtagFilter(tag);
                    setActiveTab('search');
                  }}
                />

                {/* Profile Sponsor Ad Banner */}
                {ads.find((a) => a.position === 'profile' && a.isActive) && (
                  <AdCard
                    ad={ads.find((a) => a.position === 'profile' && a.isActive)!}
                    onAdClick={handleAdClick}
                  />
                )}
              </div>
            ) : (
              <LoginPage
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                onLoginSuccess={(u) => setCurrentUser(u)}
              />
            )
          )}
        </main>

        {/* Sticky Bottom AdMob Banner Slot */}
        {ads.find((a) => a.position === 'bottom_sticky' && a.isActive) && (
          <div className="fixed bottom-14 left-0 right-0 z-20 px-3 py-1.5 bg-stone-900 text-white border-t border-stone-800 flex items-center justify-between shadow-lg text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="bg-amber-500 text-stone-950 font-black text-[9px] px-1.5 py-0.5 rounded-sm">
                AdMob
              </span>
              <span className="font-bold truncate">{ads.find((a) => a.position === 'bottom_sticky' && a.isActive)!.title}</span>
            </div>
            <button
              onClick={() => handleAdClick(ads.find((a) => a.position === 'bottom_sticky' && a.isActive)!.id)}
              className="bg-amber-400 text-stone-950 font-bold text-[10px] px-2.5 py-1 rounded-md shrink-0"
            >
              زيارة الإعلان
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav
          user={currentUser}
          activeTab={activeTab}
          currentLang={currentLang}
          onSelectTab={(tab) => {
            if (tab === 'record') {
              if (!currentUser) {
                setIsGuestLoginModalOpen(true);
                return;
              }
              setIsRecordModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          onOpenRecordModal={() => {
            if (!currentUser) {
              setIsGuestLoginModalOpen(true);
              return;
            }
            setIsRecordModalOpen(true);
          }}
        />

        {/* Guest Login Prompt Modal */}
        <GuestLoginModal
          isOpen={isGuestLoginModalOpen}
          currentLang={currentLang}
          onClose={() => setIsGuestLoginModalOpen(false)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />

        {/* Audio Recorder Studio Modal */}
        {currentUser && (
          <AudioRecorderModal
            isOpen={isRecordModalOpen}
            onClose={() => setIsRecordModalOpen(false)}
            user={currentUser}
            campaigns={campaigns}
            selectedCampaign={selectedRecordCampaign}
            onSubmitAudio={handleSubmitAudio}
          />
        )}

        {/* Login / Auth Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <LoginPage
              currentLang={currentLang}
              onLanguageChange={handleLanguageChange}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setIsLoginModalOpen(false);
                const msg = currentLang === 'ar' ? `مرحباً بك ${user.name}! يمكنك الآن التبرع بصوتك.` : `Welcome ${user.name}! You can now donate your voice.`;
                showToast(msg);
              }}
              onCancel={() => setIsLoginModalOpen(false)}
            />
          </div>
        )}

        {/* Founder New Campaign Modal */}
        <NewCampaignModal
          isOpen={isNewCampaignModalOpen}
          onClose={() => setIsNewCampaignModalOpen(false)}
          onAddCampaign={handleAddCampaign}
        />
      </div>
    </div>
  );
}
