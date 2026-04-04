import { useCallback } from 'react';
import confetti from 'canvas-confetti';

/* === Tea-themed confetti using canvas-confetti === */
/* Brown/green particles for tea brews, red for espresso rage */

export function useConfetti() {
  /* Tea brew celebration — green and brown particles */
  const fireTeaConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4ade80', '#22c55e', '#92400e', '#a16207', '#d97706'],
      shapes: ['circle'],
      gravity: 1.2,
      ticks: 150,
    });
  }, []);

  /* Espresso rage — dramatic red/orange explosion */
  const fireRageConfetti = useCallback(() => {
    /* Double burst for drama */
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff0000', '#ff4444', '#ff6600', '#ff9900'],
      shapes: ['circle'],
      gravity: 0.8,
      ticks: 200,
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.4, x: 0.3 },
        colors: ['#ff0000', '#ff4444'],
        shapes: ['circle'],
        ticks: 150,
      });
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.4, x: 0.7 },
        colors: ['#ff0000', '#ff4444'],
        shapes: ['circle'],
        ticks: 150,
      });
    }, 200);
  }, []);

  /* Achievement unlock — gold burst */
  const fireAchievementConfetti = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff'],
      shapes: ['circle'],
      gravity: 1.5,
      ticks: 100,
    });
  }, []);

  return { fireTeaConfetti, fireRageConfetti, fireAchievementConfetti };
}
