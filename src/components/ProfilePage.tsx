import React from 'react';
import { ShieldCheck, Heart, Mic, Award, LogOut, Calendar, Layers } from 'lucide-react';
import { User, AudioMessage } from '../types';
import { Language } from '../i18n/translations';
import { AudioCard } from './AudioCard';

interface ProfilePageProps {
  user: User;
  userMessages: AudioMessage[];
  currentLang?: Language;
  onLikeToggle: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onLogout: () => void;
  onOpenRecordModal: () => void;
  onSelectHashtag?: (tag: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  userMessages,
  currentLang = 'ar',
  onLikeToggle,
  onDeleteMessage,
  onLogout,
  onOpenRecordModal,
  onSelectHashtag
}) => {
  const totalLikes = userMessages.reduce((sum, msg) => sum + msg.likesCount, 0);
  const uniqueCampaigns = new Set(userMessages.map((msg) => msg.campaignId)).size;

  const labels = {
    founderBadge: currentLang === 'ar' ? 'مؤسس ومدير المنصة' : currentLang === 'fr' ? 'Fondateur et Admin' : currentLang === 'tr' ? 'Kurucu ve Yönetici' : currentLang === 'es' ? 'Fundador y Admin' : currentLang === 'de' ? 'Gründer und Admin' : 'Founder & Admin',
    donorBadge: currentLang === 'ar' ? 'متبرع صانع أمل' : currentLang === 'fr' ? 'Donateur d’Espoir' : currentLang === 'tr' ? 'Umut Bağışçısı' : currentLang === 'es' ? 'Donante de Esperanza' : currentLang === 'de' ? 'Hoffnungs-Spender' : 'Hope Donor',
    emailLabel: currentLang === 'ar' ? 'البريد الإلكتروني:' : currentLang === 'fr' ? 'E-mail :' : currentLang === 'tr' ? 'E-posta:' : currentLang === 'es' ? 'Correo:' : currentLang === 'de' ? 'E-Mail:' : 'Email:',
    memberSince: currentLang === 'ar' ? 'عضو منذ' : currentLang === 'fr' ? 'Membre depuis' : currentLang === 'tr' ? 'Üyelik tarihi' : currentLang === 'es' ? 'Miembro desde' : currentLang === 'de' ? 'Mitglied seit' : 'Member since',
    logout: currentLang === 'ar' ? 'تسجيل الخروج' : currentLang === 'fr' ? 'Se déconnecter' : currentLang === 'tr' ? 'Çıkış Yap' : currentLang === 'es' ? 'Cerrar Sesión' : currentLang === 'de' ? 'Abmelden' : 'Log Out',
    voiceDonations: currentLang === 'ar' ? 'تبرع صوتي' : currentLang === 'fr' ? 'Dons Vocaux' : currentLang === 'tr' ? 'Ses Bağışı' : currentLang === 'es' ? 'Donaciones de Voz' : currentLang === 'de' ? 'Sprachspenden' : 'Voice Donations',
    likesReceived: currentLang === 'ar' ? 'إعجابات مستلمة' : currentLang === 'fr' ? 'J’aime Reçus' : currentLang === 'tr' ? 'Alınan Beğeni' : currentLang === 'es' ? 'Me Gusta Recibidos' : currentLang === 'de' ? 'Erhaltene Likes' : 'Likes Received',
    campaignsJoined: currentLang === 'ar' ? 'فعاليات شاركت بها' : currentLang === 'fr' ? 'Campagnes Rejointes' : currentLang === 'tr' ? 'Katıldığı Kampanyalar' : currentLang === 'es' ? 'Campañas Unid@s' : currentLang === 'de' ? 'Teilgenommene Aktionen' : 'Campaigns Joined',
    archiveTitle: currentLang === 'ar' ? `أرشيف تبرعاتك الصوتية (${userMessages.length})` : currentLang === 'fr' ? `Vos Dons Vocaux (${userMessages.length})` : currentLang === 'tr' ? `Ses Bağışı Arşiviniz (${userMessages.length})` : currentLang === 'es' ? `Tus Donaciones de Voz (${userMessages.length})` : currentLang === 'de' ? `Ihre Sprachspenden (${userMessages.length})` : `Your Audio Donations (${userMessages.length})`,
    donateNewBtn: currentLang === 'ar' ? '+ تبرّع بصوتية جديدة' : currentLang === 'fr' ? '+ Nouveau Don Vocal' : currentLang === 'tr' ? '+ Yeni Ses Bağışla' : currentLang === 'es' ? '+ Nueva Donación de Voz' : currentLang === 'de' ? '+ Neue Sprachspende' : '+ Donate New Voice',
    noMessagesTitle: currentLang === 'ar' ? 'لم تنشر أي تبرع صوتي بعد!' : currentLang === 'fr' ? 'Aucun don vocal pour le moment !' : currentLang === 'tr' ? 'Henüz ses bağışında bulunmadınız!' : currentLang === 'es' ? '¡Aún no has publicado donaciones de voz!' : currentLang === 'de' ? 'Noch keine Sprachspende veröffentlicht!' : 'No voice donations published yet!',
    noMessagesDesc: currentLang === 'ar' ? 'صوتك يحمل طاقة أمل عظيمة. سجل أول رسالة صوتية ودع كلماتك تلامس القلوب.' : currentLang === 'fr' ? 'Votre voix porte un message d’espoir. Enregistrez votre premier message.' : currentLang === 'tr' ? 'Sesiniz büyük bir umut gücü taşıyor. İlk mesajınızı kaydedin.' : currentLang === 'es' ? 'Tu voz transmite gran esperanza. Graba tu primer mensaje.' : currentLang === 'de' ? 'Deine Stimme bringt Hoffnung. Nimm deine erste Nachricht auf.' : 'Your voice carries great hope. Record your first message.',
    recordFirstBtn: currentLang === 'ar' ? 'سجل أول تبرع صوتي لك' : currentLang === 'fr' ? 'Enregistrer votre premier don' : currentLang === 'tr' ? 'İlk Sesinizi Bağışlayın' : currentLang === 'es' ? 'Grabar Tu Primera Donación' : currentLang === 'de' ? 'Erste Sprachspende aufnehmen' : 'Record Your First Donation'
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Profile Card Header */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-20 bg-stone-900" />

        <div className="relative z-10 pt-6 text-center sm:text-right flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-xs bg-white"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
                {user.isFounder ? (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>{labels.founderBadge}</span>
                  </span>
                ) : (
                  <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-stone-200">
                    <ShieldCheck className="w-3 h-3 text-rose-800 shrink-0" />
                    <span>{labels.donorBadge}</span>
                  </span>
                )}
              </div>

              {/* Email Display */}
              <div className="mt-1.5 inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-1 rounded-lg text-xs text-stone-700 font-medium">
                <span>{labels.emailLabel} <strong className="font-mono">{user.email}</strong></span>
              </div>

              <p className="text-xs text-stone-600 mt-2 max-w-md leading-relaxed">{user.bio}</p>

              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-[11px] text-stone-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-800 shrink-0" />
                  {labels.memberSince} {user.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>{labels.logout}</span>
          </button>
        </div>
      </div>

      {/* Professional Compact Light Impact Micro-Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Card 1: Voice Donations */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 text-center border border-rose-100 shadow-2xs hover:shadow-md transition-all hover:border-rose-300 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-1.5 shrink-0">
            <Mic className="w-4 h-4 text-rose-800" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none">{userMessages.length}</span>
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-600 mt-1 line-clamp-1">{labels.voiceDonations}</span>
        </div>

        {/* Card 2: Likes Received */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 text-center border border-rose-100 shadow-2xs hover:shadow-md transition-all hover:border-rose-300 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-1.5 shrink-0">
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none">{totalLikes}</span>
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-600 mt-1 line-clamp-1">{labels.likesReceived}</span>
        </div>

        {/* Card 3: Campaigns Joined */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 text-center border border-amber-100 shadow-2xs hover:shadow-md transition-all hover:border-amber-300 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-1.5 shrink-0">
            <Award className="w-4 h-4 text-amber-700" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none">{uniqueCampaigns}</span>
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-600 mt-1 line-clamp-1">{labels.campaignsJoined}</span>
        </div>
      </div>

      {/* User's Audio Donations Collection Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-rose-800 shrink-0" />
          <span>{labels.archiveTitle}</span>
        </h3>

        <button
          onClick={onOpenRecordModal}
          className="text-xs font-bold text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl border border-stone-200 shrink-0"
        >
          {labels.donateNewBtn}
        </button>
      </div>

      {/* List of User Messages */}
      {userMessages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto">
            <Mic className="w-7 h-7 text-rose-800" />
          </div>
          <h4 className="font-bold text-stone-800 text-base">{labels.noMessagesTitle}</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {labels.noMessagesDesc}
          </p>
          <button
            onClick={onOpenRecordModal}
            className="bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
          >
            {labels.recordFirstBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {userMessages.map((msg) => (
            <AudioCard
              key={msg.id}
              message={msg}
              currentUserId={user.id}
              currentLang={currentLang}
              onLikeToggle={onLikeToggle}
              onDeleteMessage={onDeleteMessage}
              onSelectHashtag={onSelectHashtag}
            />
          ))}
        </div>
      )}
    </div>
  );
};

