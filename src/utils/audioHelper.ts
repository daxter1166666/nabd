// Web Audio API Synthesizer & Speech Helper for "صوت الأمل"

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private currentOscillators: OscillatorNode[] = [];
  private isPlayingSynth = false;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  // Play a gentle warm acoustic harmonic sound representing voice/hope
  public playSynthesizedAudio(duration = 5, onEnd?: () => void) {
    this.stopAudio();
    const ctx = this.getContext();
    this.isPlayingSynth = true;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Warm pentatonic hope chord sequence
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C4, E4, G4, C5, A4, F4
    const interval = duration / notes.length;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * interval);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * interval);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + index * interval + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (index + 1) * interval);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(ctx.currentTime + index * interval);
      osc.stop(ctx.currentTime + (index + 1) * interval);

      this.currentOscillators.push(osc);
    });

    setTimeout(() => {
      this.isPlayingSynth = false;
      if (onEnd) onEnd();
    }, duration * 1000);
  }

  // Text To Speech helper for reading Arabic audio messages if available
  public speakArabicText(text: string, onEnd?: () => void): SpeechSynthesisUtterance | null {
    if (!('speechSynthesis' in window)) {
      this.playSynthesizedAudio(4, onEnd);
      return null;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95; // Natural speed
    utterance.pitch = 1.0;

    // Try to find Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.playSynthesizedAudio(4, onEnd);
    };

    window.speechSynthesis.speak(utterance);
    return utterance;
  }

  public stopAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentOscillators.forEach(osc => {
      try { osc.stop(); } catch { /* ignore */ }
    });
    this.currentOscillators = [];
    if (this.currentSource) {
      try { this.currentSource.stop(); } catch { /* ignore */ }
      this.currentSource = null;
    }
    this.isPlayingSynth = false;
  }
}

export const audioEngine = new AudioEngine();

// Format time utility (e.g. 0:45)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Generate realistic waveform bars (height percentages 10-100)
export function generateWaveformData(seed: string, count = 32): number[] {
  const bars: number[] = [];
  let numSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    numSeed += seed.charCodeAt(i);
  }

  for (let i = 0; i < count; i++) {
    const val = Math.sin((i + numSeed) * 0.4) * 35 + Math.cos((i * 1.5) + numSeed) * 25 + 45;
    bars.push(Math.max(15, Math.min(95, Math.round(val))));
  }
  return bars;
}
