import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data/teapot-content';

/* === Achievement Panel — shows all achievements with lock/unlock state === */

interface AchievementPanelProps {
  unlocked: Set<string>;
}

export function AchievementPanel({ unlocked }: AchievementPanelProps) {
  return (
    <section className="achievements" aria-label="Achievements">
      <h2 className="achievements__title">
        ACHIEVEMENTS — {unlocked.size}/{ACHIEVEMENTS.length}
      </h2>

      <div className="achievements__grid">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <motion.div
              key={a.id}
              className={`achievements__item ${isUnlocked ? 'achievements__item--unlocked' : 'achievements__item--locked'}`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="achievements__icon">
                {isUnlocked ? a.icon : '🔒'}
              </div>
              <div className="achievements__info">
                <div className="achievements__name">
                  {isUnlocked ? a.name : '???'}
                </div>
                <div className="achievements__desc">
                  {isUnlocked ? a.description : 'Keep trying...'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
