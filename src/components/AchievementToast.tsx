import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../data/teapot-content';

/* === Achievement Toast — slides in when achievement unlocked === */

interface AchievementToastProps {
  achievement: Achievement | null;
}

export function AchievementToast({ achievement }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="achievement-toast"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          role="alert"
        >
          <div className="achievement-toast__icon">{achievement.icon}</div>
          <div className="achievement-toast__content">
            <div className="achievement-toast__title">ACHIEVEMENT UNLOCKED</div>
            <div className="achievement-toast__name">{achievement.name}</div>
            <div className="achievement-toast__desc">{achievement.description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
