import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Power,
  Trash2,
  Edit2,
  Megaphone,
  FolderKanban,
  Volume2,
  BarChart2,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Tag,
  Check,
  X,
  Code2,
  Info
} from 'lucide-react';
import { Campaign, AudioMessage, AdBanner, User } from '../types';

interface AdminDashboardProps {
  user: User;
  campaigns: Campaign[];
  messages: AudioMessage[];
  ads: AdBanner[];
  onToggleCampaignActive: (campaignId: string) => void;
  onDeleteCampaign: (campaignId: string) => void;
  onOpenNewCampaignModal: () => void;
  onEditCampaign: (campaign: Campaign) => void;
  onDeleteMessage: (messageId: string) => void;
  onToggleAdActive: (adId: string) => void;
  onDeleteAd: (adId: string) => void;
  onAddAd: (newAd: Omit<AdBanner, 'id' | 'clicksCount' | 'viewsCount'>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  campaigns,
  messages,
  ads,
  onToggleCampaignActive,
  onDeleteCampaign,
  onOpenNewCampaignModal,
  onEditCampaign,
  onDeleteMessage,
  onToggleAdActive,
  onDeleteAd,
  onAddAd
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'campaigns' | 'ads' | 'moderation' | 'ads_guide'>('campaigns');

  // Ad Form State
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [adTitle, setAdTitle] = useState('');
  const [adSponsor, setAdSponsor] = useState('');
  const [adImage, setAdImage] = useState('https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800');
  const [adTargetUrl, setAdTargetUrl] = useState('https://example.com');
  const [adBadge, setAdBadge] = useState('إعلان راعي إنساني');
  const [adPosition, setAdPosition] = useState<'top' | 'feed' | 'search' | 'profile' | 'bottom_sticky'>('feed');

  // Google AdSense code state
  const [googleAdScript, setGoogleAdScript] = useState<string>(
    '<!-- Google AdSense Placeholder Code -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
  );
  const [isAdSenseEnabled, setIsAdSenseEnabled] = useState(false);
  const [savedScriptToast, setSavedScriptToast] = useState(false);

  // Edit Campaign Modal State
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle || !adSponsor) return;

    onAddAd({
      title: adTitle,
      sponsorName: adSponsor,
      imageUrl: adImage || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800',
      targetUrl: adTargetUrl || '#',
      position: adPosition,
      isActive: true,
      badgeText: adBadge
    });

    setAdTitle('');
    setAdSponsor('');
    setShowAddAdModal(false);
  };

  const handleSaveCampaignEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign) {
      onEditCampaign(editingCampaign);
      setEditingCampaign(null);
    }
  };

  const handleSaveAdSense = () => {
    setSavedScriptToast(true);
    setTimeout(() => setSavedScriptToast(false), 2500);
  };

  const activeCampaignsCount = campaigns.filter((c) => c.isActive).length;
  const activeAdsCount = ads.filter((a) => a.isActive).length;

  return (
    <div className="space-y-6 pb-24">
      {/* Admin Dashboard Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">لوحة تحكّم الإدارة العليا</h2>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                  صلاحيات كاملة
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                مرحباً {user.name}، يمكنك هنا فتح وإغلاق الفعاليات، إضافة الإعلانات، وإشراف المحتوى.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenNewCampaignModal}
            className="bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ فتح فعالية جديدة</span>
          </button>
        </div>

        {/* Quick KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800">
          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
            <span className="text-[11px] text-stone-400 font-medium block">الفعاليات النشطة</span>
            <div className="text-xl font-extrabold text-white mt-1">
              {activeCampaignsCount} <span className="text-xs text-stone-400 font-normal">من أصل {campaigns.length}</span>
            </div>
          </div>

          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
            <span className="text-[11px] text-stone-400 font-medium block">التبرعات الصوتية</span>
            <div className="text-xl font-extrabold text-rose-400 mt-1">{messages.length}</div>
          </div>

          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
            <span className="text-[11px] text-stone-400 font-medium block">الإعلانات النشطة</span>
            <div className="text-xl font-extrabold text-amber-400 mt-1">{activeAdsCount}</div>
          </div>

          <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
            <span className="text-[11px] text-stone-400 font-medium block">نقرات الإعلانات</span>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">
              {ads.reduce((acc, curr) => acc + curr.clicksCount, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tab Switching Navigation */}
      <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold gap-1">
        <button
          onClick={() => setActiveAdminTab('campaigns')}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeAdminTab === 'campaigns' ? 'bg-rose-900 text-white' : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>إدارة الفعاليات ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('ads')}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeAdminTab === 'ads' ? 'bg-rose-900 text-white' : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>إدارة الإعلانات ({ads.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('ads_guide')}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeAdminTab === 'ads_guide' ? 'bg-rose-900 text-white' : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>طريقة إعلانات Google</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeAdminTab === 'moderation' ? 'bg-rose-900 text-white' : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>إشراف الصوتيات</span>
        </button>
      </div>

      {/* TAB 1: MANAGING CAMPAIGNS */}
      {activeAdminTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-rose-800" />
              التحكم في الفعاليات والهاشتاغات الرسمية:
            </h3>
            <button
              onClick={onOpenNewCampaignModal}
              className="text-xs font-bold text-rose-900 hover:underline flex items-center gap-1"
            >
              + إضافة فعالية جديدة
            </button>
          </div>

          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className={`bg-white rounded-xl border p-4 transition-all ${
                  camp.isActive ? 'border-stone-300 shadow-2xs' : 'border-stone-200 bg-stone-50/60 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                          {camp.hashtag}
                        </span>
                        {camp.isActive ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            مفتوحة ونشطة
                          </span>
                        ) : (
                          <span className="bg-stone-200 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-300">
                            مغلقة ومؤرشفة
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">{camp.title}</h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">"{camp.questionPrompt}"</p>
                    </div>
                  </div>

                  {/* Campaign Action Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                    {/* Toggle Active / Inactive Status */}
                    <button
                      onClick={() => onToggleCampaignActive(camp.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                        camp.isActive
                          ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      }`}
                      title={camp.isActive ? 'إغلاق الفعالية' : 'فتح وإعادة تفعيل الفعالية'}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{camp.isActive ? 'إغلاق الفعالية' : 'فتح الفعالية'}</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => setEditingCampaign(camp)}
                      className="text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors flex items-center gap-1"
                      title="تعديل تفاصيل الفعالية"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteCampaign(camp.id)}
                      className="text-xs font-bold text-rose-800 hover:bg-rose-50 p-1.5 rounded-lg border border-stone-200 transition-colors"
                      title="حذف الفعالية"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MANAGING ADS & SPONSORSHIPS */}
      {activeAdminTab === 'ads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-rose-800" />
                إدارة الإعلانات وبنرات الرعاة والشركاء:
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                يمكنك إضافة إعلانات بنر للشركاء والرعاة بأسلوب يتماشى مع المظهر المريح للمنصة.
              </p>
            </div>
            <button
              onClick={() => setShowAddAdModal(true)}
              className="bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة إعلان راعي</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                        {ad.badgeText || 'إعلان برعاية'}
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold">الراعي: {ad.sponsorName}</span>
                      {ad.isActive ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                          ظاهر للمستخدمين
                        </span>
                      ) : (
                        <span className="bg-stone-200 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-300">
                          معطل
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{ad.title}</h4>
                    <a
                      href={ad.targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-rose-800 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{ad.targetUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                  <div className="text-right text-[11px] text-stone-500 font-medium">
                    <div>نقرات: <strong className="text-stone-900">{ad.clicksCount}</strong></div>
                    <div>مشاهدات: <strong className="text-stone-900">{ad.viewsCount}</strong></div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleAdActive(ad.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        ad.isActive
                          ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {ad.isActive ? 'إيقاف الإعلان' : 'تفعيل الإعلان'}
                    </button>

                    <button
                      onClick={() => onDeleteAd(ad.id)}
                      className="text-xs font-bold text-rose-800 hover:bg-rose-50 p-1.5 rounded-lg border border-stone-200 transition-colors"
                      title="حذف الإعلان"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE ADSENSE & ADMONETIZATION GUIDE */}
      {activeAdminTab === 'ads_guide' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-start gap-3 border-b border-stone-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-rose-800" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">إجابة سؤالك: كيف تضيف إعلانات للتطبيق وما الطرق المتاحة؟</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                تتوفر طريقتان رئيسيتان لإضافة الإعلانات وتحقيق الدخل لدعم تشغيل التطبيق:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Method 1 */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
              <span className="inline-block bg-rose-900 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-md">
                الطريقة 1 (الموصى بها للتطبيقات الخيرية): الرعاة المباشرين
              </span>
              <h4 className="font-bold text-stone-900 text-sm">إعلانات بنرات الرعاة والشركاء (Sponsor Banners)</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تتيح لك التعاقد المباشر مع جمعيات، مستشفيات، أو شركات راعية للتطبيق، وتضع بنر الإعلان مباشرة من تبويب "إدارة الإعلانات" أعلاه بوضع رابط الصورة والرابط المستهدف.
              </p>
              <ul className="text-[11px] text-stone-500 space-y-1 list-disc list-inside pt-1">
                <li>تحكم كامل في مظهر ومحتوى الإعلانات بما يناسب بيئة التطبيق.</li>
                <li>لا تعتمد على شبكات خارجية ولا تتأثر بحظر الإعلانات.</li>
              </ul>
            </div>

            {/* Method 2 */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
              <span className="inline-block bg-stone-900 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-md">
                الطريقة 2: شبكات الإعلانات البرمجية (Google AdSense / AdMob)
              </span>
              <h4 className="font-bold text-stone-900 text-sm">جوجل أدسينس (للويب) أو جوجل أدموب (للتطبيقات)</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                عند رفع التطبيق على دومين خاص بك أو متجر تطبيقات (App Store / Google Play)، تنشئ حساباً في Google AdSense أو Google AdMob وتحصل على كود وحدة إعلانية (Ad Unit Code) وتلصقه في مكان الإعلان.
              </p>
              <ul className="text-[11px] text-stone-500 space-y-1 list-disc list-inside pt-1">
                <li>إعلانات تلقائية تتغير حسب اهتمام الزائر.</li>
                <li>أرباح تلقائية تحول لحسابك البنكي بناءً على المشاهدات والنقرات.</li>
              </ul>
            </div>
          </div>

          {/* AdSense Code Slot Integration */}
          <div className="bg-stone-900 text-white rounded-xl p-4 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                مُدخل كود إعلانات Google AdSense لتطبيق الويب:
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 font-bold">
                <input
                  type="checkbox"
                  checked={isAdSenseEnabled}
                  onChange={(e) => setIsAdSenseEnabled(e.target.checked)}
                  className="w-4 h-4 text-rose-800 rounded-md focus:ring-rose-800"
                />
                <span>تفعيل كود AdSense الخارجي</span>
              </label>
            </div>

            <textarea
              value={googleAdScript}
              onChange={(e) => setGoogleAdScript(e.target.value)}
              rows={3}
              placeholder="ضع كود وحدة إعلانات AdSense الخاصة بك هنا..."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                سيتم تفعيل وعرض كود الإعلانات تلقائياً في خانات الإعلانات المحددة.
              </span>

              <button
                type="button"
                onClick={handleSaveAdSense}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
              >
                {savedScriptToast ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{savedScriptToast ? 'تم حفظ الإعدادات' : 'حفظ كود الإعلانات'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VOICE MODERATION */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 mb-2">
            <Volume2 className="w-4 h-4 text-rose-800" />
            إشراف وحذف الرسائل الصوتية المنشورة:
          </h3>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={msg.donorAvatar}
                  alt={msg.donorName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-xs">{msg.donorName}</span>
                    <span className="text-[10px] text-stone-400">{msg.createdAt}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-semibold">
                      {msg.hashtag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">"{msg.transcriptText}"</p>
                </div>
              </div>

              <button
                onClick={() => onDeleteMessage(msg.id)}
                className="text-xs font-bold text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors flex items-center gap-1 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف الرسالة</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal to Add Custom Sponsor Ad */}
      {showAddAdModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-stone-200 overflow-hidden my-auto">
            <div className="bg-stone-900 p-4 text-white flex items-center justify-between border-b border-stone-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-amber-400" />
                إضافة إعلان راعي / شريك جديد
              </h3>
              <button
                onClick={() => setShowAddAdModal(false)}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">عنوان الإعلان الرئيسي:</label>
                <input
                  type="text"
                  required
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="مثال: مبادرة مستشفى الأمل للرعاية الطبية"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-bold focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">اسم الجهه الراعية:</label>
                <input
                  type="text"
                  required
                  value={adSponsor}
                  onChange={(e) => setAdSponsor(e.target.value)}
                  placeholder="مثال: جمعية الشفاء الخيرية"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-semibold focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">نص الشارة العلوية:</label>
                <input
                  type="text"
                  value={adBadge}
                  onChange={(e) => setAdBadge(e.target.value)}
                  placeholder="مثال: إعلان برعاية إنسانية"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">رابط صورة البنر الإعلاني:</label>
                <input
                  type="text"
                  value={adImage}
                  onChange={(e) => setAdImage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">مكان عرض الإعلان داخل التطبيق:</label>
                <select
                  value={adPosition}
                  onChange={(e) => setAdPosition(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-bold focus:ring-2 focus:ring-rose-800"
                >
                  <option value="top">أعلى القائمة الرئيسية (تحت الهيدر)</option>
                  <option value="feed">بين بطاقات التبرع الصوتي في الرئيسية</option>
                  <option value="search">في صفحة البحث والهاشتاغات</option>
                  <option value="profile">في صفحة حسابي / الملف الشخصي</option>
                  <option value="bottom_sticky">شريط تثبيتي سفلي (مثل AdMob)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">رابط التحويل عند النقر:</label>
                <input
                  type="text"
                  value={adTargetUrl}
                  onChange={(e) => setAdTargetUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs rounded-xl transition-all"
              >
                حفظ ونشر الإعلان فوراً
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal to Edit Existing Campaign */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-stone-200 overflow-hidden my-auto">
            <div className="bg-stone-900 p-4 text-white flex items-center justify-between border-b border-stone-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <Edit2 className="w-4 h-4 text-amber-400" />
                تعديل بيانات الفعالية
              </h3>
              <button
                onClick={() => setEditingCampaign(null)}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCampaignEdit} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">عنوان الفعالية:</label>
                <input
                  type="text"
                  value={editingCampaign.title}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">سؤال الفعالية للمتبرعين:</label>
                <input
                  type="text"
                  value={editingCampaign.questionPrompt}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, questionPrompt: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">الهاشتاغ المخصص:</label>
                <input
                  type="text"
                  value={editingCampaign.hashtag}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, hashtag: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">الوصف الكامل:</label>
                <textarea
                  value={editingCampaign.description}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, description: e.target.value })}
                  rows={2}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">رابط صورة الغلاف:</label>
                <input
                  type="text"
                  value={editingCampaign.coverImage}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, coverImage: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs rounded-xl"
                >
                  حفظ التغيرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
