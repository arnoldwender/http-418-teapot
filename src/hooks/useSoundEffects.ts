import { useCallback, useRef } from 'react';

/* === Web Audio API sound effects === */
/* Generates sounds procedurally — no audio files needed */

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);

  /* Lazy-init AudioContext (requires user gesture) */
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  /* Kettle whistling — rising sine wave with vibrato */
  const playKettleWhistle = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();

      /* Vibrato modulation for realism */
      vibrato.frequency.value = 8;
      vibratoGain.gain.value = 30;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.2);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.6);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      vibrato.start(ctx.currentTime);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.0);
      vibrato.stop(ctx.currentTime + 1.0);
    } catch {
      /* Audio not supported or blocked — fail silently */
    }
  }, [getCtx]);

  /* Pouring liquid — filtered noise */
  const playPour = useCallback(() => {
    try {
      const ctx = getCtx();
      const bufferSize = ctx.sampleRate * 1.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      /* Generate brown noise (low-frequency emphasis for liquid sound) */
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 0.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.8);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    } catch {
      /* fail silently */
    }
  }, [getCtx]);

  /* Clink — short high-frequency tap */
  const playClink = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.value = 3200;
      osc2.type = 'sine';
      osc2.frequency.value = 4800;

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch {
      /* fail silently */
    }
  }, [getCtx]);

  /* Buzzer — harsh rejection sound */
  const playBuzzer = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = 150;

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.15);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      /* fail silently */
    }
  }, [getCtx]);

  /* Achievement unlock — pleasant ascending arpeggio */
  const playAchievement = useCallback(() => {
    try {
      const ctx = getCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; /* C5, E5, G5, C6 */

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.1 + 0.05);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    } catch {
      /* fail silently */
    }
  }, [getCtx]);

  return { playKettleWhistle, playPour, playClink, playBuzzer, playAchievement };
}
