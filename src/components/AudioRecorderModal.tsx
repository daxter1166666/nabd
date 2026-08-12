import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Square, Play, Pause, RefreshCw, Send, Sparkles, Tag, ShieldCheck, AlertCircle } from 'lucide-react';
import { Campaign, User } from '../types';
import { formatTime } from '../utils/audioHelper';

interface AudioRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  campaigns: Campaign[];
  selectedCampaign?: Campaign;
  onSubmitAudio: (data: {
    campaignId: string;
    campaignTitle: string;
    hashtag: string;
    category: string;
    durationSeconds: number;
    transcriptText: string;
    audioBlob?: Blob;
  }) => void;
}

export const AudioRecorderModal: React.FC<AudioRecorderModalProps> = ({
  isOpen,
  onClose,
  user,
  campaigns,
  selectedCampaign,
  onSubmitAudio
}) => {
  const [activeCampaign, setActiveCampaign] = useState<Campaign>(
    selectedCampaign || campaigns[0]
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [isGeneratingAIText, setIsGeneratingAIText] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedCampaign) {
      setActiveCampaign(selectedCampaign);
    } else if (campaigns.length > 0) {
      setActiveCampaign(campaigns[0]);
    }
  }, [selectedCampaign, campaigns]);

  useEffect(() => {
    if (!isOpen) {
      handleResetRecording();
    }
  }, [isOpen]);

  const handleStartRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          // Stop mic tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(100);
        setIsRecording(true);

        timerIntervalRef.current = setInterval(() => {
          setRecordingTime((prev) => {
            if (prev >= 60) {
              handleStopRecording();
              return 60;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        throw new Error('المايكروفون غير مدعوم في هذا المتصفح');
      }
    } catch {
      // Fallback simulated voice recorder if mic permission is blocked or unavailable
      console.warn('Microphone access unavailable, using simulated studio recorder');
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            handleStopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // If simulated
      const dummyBlob = new Blob(['simulated-audio-data'], { type: 'audio/webm' });
      setAudioBlob(dummyBlob);
    }
  };

  const handleResetRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    setIsPlayingPreview(false);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const handleTogglePreviewPlay = () => {
    if (!audioUrl) {
      // Toggle play preview timer animation
      setIsPlayingPreview(!isPlayingPreview);
      return;
    }

    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio(audioUrl);
      previewAudioRef.current.onended = () => setIsPlayingPreview(false);
    }

    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const handleGenerateAIText = async () => {
    setIsGeneratingAIText(true);
    try {
      const res = await fetch('/api/generate-speech-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeCampaign.category,
          topicPrompt: activeCampaign.questionPrompt
        })
      });

      const data = await res.json();
      if (data.text) {
        setTranscriptText(data.text);
      }
    } catch (err) {
      console.error('Error getting AI text prompt:', err);
      setTranscriptText(
        `إلى أبطالنا الغاليين، كل كلمة دعم من القلب هي أمل جديد. شفاكم الله ورعاكم ونحن معكم دائماً!`
      );
    } finally {
      setIsGeneratingAIText(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDuration = recordingTime > 0 ? recordingTime : 25;

    onSubmitAudio({
      campaignId: activeCampaign.id,
      campaignTitle: activeCampaign.title,
      hashtag: activeCampaign.hashtag,
      category: activeCampaign.category,
      durationSeconds: finalDuration,
      transcriptText: transcriptText.trim(),
      audioBlob: audioBlob || undefined
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl overflow-hidden border border-stone-200 my-auto">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center">
              <Mic className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">استوديو التبرع الصوتي</h3>
              <p className="text-[11px] text-stone-300">سجل رسالتك الملهمة وانشر الأمل</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Campaign Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-rose-800" />
              اختر الفعالية والهاشتاغ:
            </label>
            <select
              value={activeCampaign.id}
              onChange={(e) => {
                const found = campaigns.find((c) => c.id === e.target.value);
                if (found) setActiveCampaign(found);
              }}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-800"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.hashtag} - {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Campaign Prompt Hint */}
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 text-xs text-rose-950">
            <span className="font-bold block mb-0.5">💬 سؤال الفعالية:</span>
            <span>"{activeCampaign.questionPrompt}"</span>
          </div>

          {/* Voice Recording Box */}
          <div className="bg-stone-900 rounded-xl p-6 text-center text-white relative overflow-hidden border border-stone-800">
            {/* Animated Sound Equalizer Visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-16 mb-4">
              {[...Array(16)].map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isRecording
                      ? 'bg-rose-500'
                      : audioBlob
                      ? 'bg-amber-400'
                      : 'bg-stone-700'
                  }`}
                  style={{
                    height: isRecording
                      ? `${Math.max(15, Math.sin(Date.now() / 100 + idx) * 100)}%`
                      : audioBlob
                      ? `${(idx % 5 + 3) * 15}%`
                      : '20%'
                  }}
                />
              ))}
            </div>

            {/* Timer Counter */}
            <div className="text-2xl font-mono font-bold text-amber-400 mb-4 dir-ltr">
              {formatTime(recordingTime)} / 01:00
            </div>

            {/* Recording Controls */}
            {!isRecording && !audioBlob && (
              <button
                type="button"
                onClick={handleStartRecording}
                className="mx-auto flex items-center justify-center gap-2 bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all active:scale-95"
              >
                <Mic className="w-5 h-5" />
                <span>ابدأ تسجيل الصوت الآن</span>
              </button>
            )}

            {isRecording && (
              <button
                type="button"
                onClick={handleStopRecording}
                className="mx-auto flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-rose-400 border border-stone-700 font-bold text-sm px-6 py-3 rounded-xl transition-all active:scale-95"
              >
                <Square className="w-5 h-5 fill-rose-500" />
                <span>إيقاف التسجيل</span>
              </button>
            )}

            {!isRecording && audioBlob && (
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePreviewPlay}
                  className="flex items-center gap-1.5 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlayingPreview ? 'إيقاف الاستماع' : 'استمع لتسجيلك'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetRecording}
                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs px-3 py-2 rounded-xl transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة التسجيل</span>
                </button>
              </div>
            )}
          </div>

          {micError && (
            <p className="text-xs text-rose-800 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              {micError}
            </p>
          )}

          {/* AI Helper & Optional Text Transcript */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-800">
                النص المكتوب للرسالة (اختياري):
              </label>
              <button
                type="button"
                onClick={handleGenerateAIText}
                disabled={isGeneratingAIText}
                className="text-[11px] text-stone-800 hover:text-stone-950 font-bold flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                {isGeneratingAIText ? 'جاري الصياغة...' : 'مقترح نصي بالذكاء الاصطناعي'}
              </button>
            </div>

            <textarea
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="اكتب تفاصيل أو نص كلماتك ليسهل قراءتها وسماعها من قبل المتبرع لهم..."
              rows={3}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-800"
            />
          </div>

          {/* User Privacy Guarantee Notice */}
          <div className="flex items-center gap-2 bg-stone-100 p-3 rounded-xl text-[11px] text-stone-700 border border-stone-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-rose-800 shrink-0" />
            <span>
              سيُنسب التبرع الصوتي باسمك المعلن (<strong>{user.name}</strong>)، بينما بريدك الإلكتروني (<strong>{user.email}</strong>) محمي وسري تماماً.
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={recordingTime === 0 && !audioBlob}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              recordingTime > 0 || audioBlob
                ? 'bg-rose-900 hover:bg-rose-950 text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>نشر التبرع الصوتي الآن</span>
          </button>
        </form>
      </div>
    </div>
  );
};
