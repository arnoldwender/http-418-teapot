import { motion } from 'framer-motion';

/* === Brew Timer — real-time progress ring with steam particles === */

interface BrewTimerProps {
  progress: number; /* 0 to 1 */
  teaName: string;
  isActive: boolean;
}

export function BrewTimer({ progress, teaName, isActive }: BrewTimerProps) {
  if (!isActive) return null;

  /* SVG progress ring dimensions */
  const size = 160;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const percentage = Math.round(progress * 100);

  return (
    <motion.div
      className="brew-timer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="brew-timer__ring-container">
        <svg width={size} height={size} className="brew-timer__ring">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--amber-ghost)"
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--amber)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              filter: 'drop-shadow(0 0 6px var(--amber-faint))',
            }}
          />
        </svg>

        {/* Center content */}
        <div className="brew-timer__center">
          <div className="brew-timer__percentage">{percentage}%</div>
          <div className="brew-timer__label">BREWING</div>
        </div>

        {/* Steam particles around the ring */}
        {progress > 0.3 && (
          <div className="brew-timer__steam-particles">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="brew-timer__particle"
                animate={{
                  y: [-5, -25 - i * 5],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (5 + i * 2)],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="brew-timer__tea-name">{teaName.toUpperCase()}</div>
      {progress >= 1 && (
        <motion.div
          className="brew-timer__complete"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          READY TO SERVE
        </motion.div>
      )}
    </motion.div>
  );
}
