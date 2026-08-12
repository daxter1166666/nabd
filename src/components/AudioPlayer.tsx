import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioEngine, formatTime, generateWaveformData } from '../utils/audioHelper';

interface AudioPlayerProps {
  id: string;
  durationSeconds: number;
  transcriptText?: string;
  donorName: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  id,
  durationSeconds,
  transcriptText,
  donorName
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate static waveform bars based on ID
    setWaveform(generateWaveformData(id, 28));
  }, [id]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            audioEngine.stopAudio();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, durationSeconds]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioEngine.stopAudio();
    } else {
      setIsPlaying(true);
      if (currentTime >= durationSeconds) {
        setCurrentTime(0);
      }
      
      // Play audio: either speech synthesis or warm musical sound wave
      if (transcriptText) {
        audioEngine.speakArabicText(transcriptText, () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });
      } else {
        audioEngine.playSynthesizedAudio(durationSeconds, () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });
      }
    }
  };

  const handleSeek = (index: number) => {
    const targetTime = Math.round((index / waveform.length) * durationSeconds);
    setCurrentTime(targetTime);
  };

  const progressPercent = (currentTime / durationSeconds) * 100;

  return (
    <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 transition-all duration-200 hover:border-stone-300">
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          id={`play-btn-${id}`}
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 transform active:scale-95 shrink-0 ${
            isPlaying
              ? 'bg-rose-950 text-white'
              : 'bg-rose-900 hover:bg-rose-950 text-white'
          }`}
          title={isPlaying ? 'إيقاف مؤقت' : 'استماع للرسالة الصوتية'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-[-1px]" />
          )}
        </button>

        {/* Waveform & Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 text-xs font-medium text-stone-600">
            <span className="flex items-center gap-1 text-stone-900 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              رسالة صوتية من {donorName}
            </span>
            <span className="font-mono text-stone-500 text-[11px] dir-ltr">
              {formatTime(currentTime)} / {formatTime(durationSeconds)}
            </span>
          </div>

          {/* Dynamic Interactive Waveform Bars */}
          <div className="flex items-center gap-[3px] h-8 py-1 px-1.5 bg-white rounded-lg border border-stone-200/80 cursor-pointer overflow-hidden">
            {waveform.map((height, idx) => {
              const barProgress = (idx / waveform.length) * 100;
              const isPassed = barProgress <= progressPercent;

              return (
                <button
                  key={idx}
                  onClick={() => handleSeek(idx)}
                  className="flex-1 h-full flex items-center justify-center group focus:outline-hidden"
                  title={`الانتقال إلى ${Math.round((idx / waveform.length) * durationSeconds)} ثانية`}
                >
                  <span
                    className={`w-full rounded-sm transition-all duration-150 ${
                      isPassed
                        ? 'bg-rose-900'
                        : 'bg-stone-200 group-hover:bg-stone-300'
                    }`}
                    style={{
                      height: isPlaying && isPassed
                        ? `${Math.max(20, Math.min(100, height + Math.sin(Date.now() / 150 + idx) * 20))}%`
                        : `${height}%`
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Volume Mute Toggle */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) audioEngine.stopAudio();
          }}
          className="p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-800" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
