import { motion } from 'framer-motion';
import type { TeapotReaction } from '../hooks/useBrewProcess';

/* === Animated teapot — CSS + framer-motion, reacts to interactions === */

interface AnimatedTeapotProps {
  reaction: TeapotReaction;
  color: string;
  pattern: string;
}

/* Steam particle component */
function SteamParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="steam-particle"
      initial={{ opacity: 0, y: 0, x }}
      animate={{
        opacity: [0, 0.8, 0.6, 0],
        y: [-5, -20, -35, -50],
        x: [x, x + (Math.random() * 10 - 5), x + (Math.random() * 16 - 8)],
        scale: [0.5, 1, 1.3, 1.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        top: '-10px',
        left: '50%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'currentColor',
        filter: 'blur(2px)',
      }}
    />
  );
}

/* Rotation variants for different teapot states */
const teapotVariants = {
  idle: {
    rotate: 0,
    scale: 1,
    x: 0,
  },
  shaking: {
    rotate: [0, -8, 8, -6, 6, -3, 3, 0],
    scale: 1,
    x: [0, -4, 4, -3, 3, -1, 1, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  pouring: {
    rotate: -35,
    scale: 1.05,
    x: 10,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  steaming: {
    rotate: 0,
    scale: [1, 1.03, 1],
    x: 0,
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* Pattern overlay based on selected pattern */
function PatternOverlay({ pattern }: { pattern: string }) {
  if (pattern === 'none') return null;

  const patternStyles: Record<string, React.CSSProperties> = {
    dots: {
      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      backgroundSize: '6px 6px',
    },
    stripes: {
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, currentColor 3px, currentColor 4px)',
    },
    waves: {
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, currentColor 4px, currentColor 5px)',
      borderRadius: '50%',
    },
    stars: {
      backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
      backgroundSize: '10px 10px',
    },
  };

  return (
    <div
      className="teapot-pattern-overlay"
      style={{
        position: 'absolute',
        inset: '15%',
        opacity: 0.15,
        pointerEvents: 'none',
        ...patternStyles[pattern],
      }}
    />
  );
}

export function AnimatedTeapot({ reaction, color, pattern }: AnimatedTeapotProps) {
  const showSteam = reaction === 'steaming' || reaction === 'pouring';

  return (
    <div className="animated-teapot" style={{ '--teapot-color': color } as React.CSSProperties}>
      <motion.div
        className="animated-teapot__body"
        variants={teapotVariants}
        animate={reaction}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {/* Steam particles */}
        {showSteam && (
          <div className="animated-teapot__steam" style={{ position: 'absolute', top: 0, left: '50%', color }}>
            <SteamParticle delay={0} x={-8} />
            <SteamParticle delay={0.3} x={0} />
            <SteamParticle delay={0.6} x={8} />
            <SteamParticle delay={0.9} x={-4} />
            <SteamParticle delay={1.2} x={4} />
          </div>
        )}

        {/* Teapot SVG */}
        <svg
          viewBox="0 0 120 100"
          className="animated-teapot__svg"
          width="140"
          height="120"
          style={{ filter: `drop-shadow(0 0 12px ${color}44)` }}
        >
          {/* Lid */}
          <ellipse cx="55" cy="18" rx="6" ry="4" fill={color} opacity="0.9" />
          <rect x="30" y="20" width="50" height="6" rx="3" fill={color} opacity="0.8" />

          {/* Body */}
          <ellipse cx="55" cy="55" rx="35" ry="30" fill="none" stroke={color} strokeWidth="2.5" />
          <ellipse cx="55" cy="55" rx="35" ry="30" fill={color} opacity="0.08" />

          {/* Handle — right side arc */}
          <path d="M 88 40 Q 108 55 88 70" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />

          {/* Spout — left side */}
          <path d="M 22 45 L 6 32 Q 4 30 6 28" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

          {/* Base */}
          <ellipse cx="55" cy="84" rx="25" ry="5" fill={color} opacity="0.3" />

          {/* Pour stream when pouring */}
          {reaction === 'pouring' && (
            <motion.path
              d="M 6 28 Q 0 40 -5 60 Q -8 75 -2 85"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.7, 0.5] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </svg>

        <PatternOverlay pattern={pattern} />
      </motion.div>

      {/* Glow ring when brewing "The Special" */}
      {reaction === 'steaming' && (
        <motion.div
          className="animated-teapot__glow-ring"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            border: `2px solid ${color}`,
            filter: `blur(4px)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
