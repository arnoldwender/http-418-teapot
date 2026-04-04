import { motion } from 'framer-motion';

/* === Global Counter — displays coffee refusals and teas brewed === */

interface GlobalCounterProps {
  refusals: number;
  brews: number;
}

export function GlobalCounter({ refusals, brews }: GlobalCounterProps) {
  return (
    <div className="global-counter" role="status" aria-label="Session statistics">
      <motion.div
        className="global-counter__item global-counter__item--refusals"
        key={`r-${refusals}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.3 }}
      >
        <span className="global-counter__number">{refusals}</span>
        <span className="global-counter__label">COFFEE REFUSED</span>
      </motion.div>

      <div className="global-counter__divider">|</div>

      <motion.div
        className="global-counter__item global-counter__item--brews"
        key={`b-${brews}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.3 }}
      >
        <span className="global-counter__number">{brews}</span>
        <span className="global-counter__label">TEAS BREWED</span>
      </motion.div>
    </div>
  );
}
