import { useState, useCallback } from 'react';
import { ACHIEVEMENTS } from '../data/teapot-content';
import type { Achievement } from '../data/teapot-content';

/* === Achievement tracking system === */
/* Tracks unlocked achievements and provides unlock callback */

export function useAchievements() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [latestUnlock, setLatestUnlock] = useState<Achievement | null>(null);

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      /* Show the achievement toast */
      const achievement = ACHIEVEMENTS.find((a) => a.id === id);
      if (achievement) {
        setLatestUnlock(achievement);
        /* Auto-dismiss after 3 seconds */
        setTimeout(() => setLatestUnlock(null), 3000);
      }
      return next;
    });
  }, []);

  const isUnlocked = useCallback((id: string) => unlocked.has(id), [unlocked]);

  return { unlocked, latestUnlock, unlock, isUnlocked, allAchievements: ACHIEVEMENTS };
}
