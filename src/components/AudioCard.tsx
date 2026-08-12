import React, { useState } from 'react';
import { Heart, Tag, Share2, MessageSquareOff, ChevronDown, ChevronUp, Trash2, Check, ShieldCheck } from 'lucide-react';
import { AudioMessage } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AudioCardProps {
  message: AudioMessage;
  currentUserId: string;
  currentLang?: Language;
  onLikeToggle: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onSelectHashtag?: (tag: string) => void;
}

export const AudioCard: React.FC<AudioCardProps> = ({
  message,
  currentUserId,
  currentLang = 'ar',
  onLikeToggle,
  onDeleteMessage,
  onSelectHashtag
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [copied, setCopied] = useState(false);
  const isOwner = message.donorId === currentUserId;
  const t = TRANSLATIONS[currentLang];

  const labels = {
    donorBadge: currentLang === 'ar' ? 'متبرع' : currentLang === 'fr' ? 'Donateur' : currentLang === 'tr' ? 'Bağışçı' : currentLang === 'es' ? 'Donante' : currentLang === 'de' ? 'Spender' : 'Donor',
    transcriptTitle: currentLang === 'ar' ? '📝 النص المكتوب للرسالة' : currentLang === 'fr' ? '📝 Transcription du message' : currentLang === 'tr' ? '📝 Yazılı Metin' : currentLang === 'es' ? '📝 Transcripción del mensaje' : currentLang === 'de' ? '📝 Geschriebener Text' : '📝 Message Transcript',
    noComments: currentLang === 'ar' ? 'بدون تعليقات' : currentLang === 'fr' ? 'Sans commentaires' : currentLang === 'tr' ? 'Yorumsuz' : currentLang === 'es' ? 'Sin comentarios' : currentLang === 'de' ? 'Keine Kommentare' : 'No comments',
    copiedText: currentLang === 'ar' ? 'تم النسخ' : 'Copied!',
    shareBtn: t.share,
    likesLabel: t.likes
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Voice donation by ${message.donorName} on Voice of Hope:\n"${message.transcriptText || message.campaignTitle}"\n${message.hashtag}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-4 relative overflow-hidden transition-all duration-200 hover:border-stone-300">
      {/* Top Bar: Donor Info & Tag */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={message.donorAvatar}
            alt={message.donorName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-stone-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-stone-900 text-sm">{message.donorName}</h4>
              <span className="inline-flex items-center text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-semibold border border-stone-200/80">
                <ShieldCheck className="w-3 h-3 text-rose-800 me-0.5" />
                {labels.donorBadge}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-medium mt-0.5">{message.createdAt}</p>
          </div>
        </div>

        {/* Delete button for message owner */}
        {isOwner && onDeleteMessage && (
          <button
            onClick={() => onDeleteMessage(message.id)}
            className="text-stone-300 hover:text-rose-800 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Campaign Context Title & Hashtag */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSelectHashtag && onSelectHashtag(message.hashtag)}
          className="inline-flex items-center gap-1 bg-rose-50/80 text-rose-900 hover:bg-rose-100 border border-rose-200/70 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
        >
          <Tag className="w-3 h-3 text-rose-800" />
          {message.hashtag}
        </button>
        <span className="text-xs text-stone-500 font-medium truncate max-w-[200px]" title={message.campaignTitle}>
          {message.campaignTitle}
        </span>
      </div>

      {/* Playable Voice Waveform Engine */}
      <AudioPlayer
        id={message.id}
        durationSeconds={message.durationSeconds}
        transcriptText={message.transcriptText}
        donorName={message.donorName}
      />

      {/* Transcript Accordion (Optional) */}
      {message.transcriptText && (
        <div className="mt-2.5">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center justify-between w-full text-xs font-bold text-stone-700 hover:text-stone-900 py-1 transition-colors"
          >
            <span className="flex items-center gap-1">
              {labels.transcriptTitle}
            </span>
            {showTranscript ? <ChevronUp className="w-3.5 h-3.5 text-stone-400" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
          </button>

          {showTranscript && (
            <div className="mt-1.5 p-3 bg-stone-50 rounded-xl text-xs text-stone-800 leading-relaxed border border-stone-200/80 font-normal">
              "{message.transcriptText}"
            </div>
          )}
        </div>
      )}

      {/* Footer Actions: Likes & No-Comment Note */}
      <div className="mt-3.5 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
        {/* Like Button */}
        <button
          onClick={() => onLikeToggle(message.id)}
          id={`like-btn-${message.id}`}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all transform active:scale-95 ${
            message.isLikedByCurrentUser
              ? 'bg-rose-900 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/80'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              message.isLikedByCurrentUser ? 'fill-white text-white' : 'fill-rose-800 text-rose-800'
            }`}
          />
          <span>{message.likesCount} {labels.likesLabel}</span>
        </button>

        {/* Info & Share */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-stone-400 flex items-center gap-1">
            <MessageSquareOff className="w-3.5 h-3.5" />
            {labels.noComments}
          </span>

          <button
            onClick={handleShare}
            className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1 text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-rose-800" />
                <span className="text-rose-800 font-bold">{labels.copiedText}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>{labels.shareBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
