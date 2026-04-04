import { motion } from 'framer-motion';
import { TEAPOT_COLORS, TEAPOT_PATTERNS } from '../data/teapot-content';

/* === Teapot Customizer — color/pattern selection + shareable card === */

interface TeapotCustomizerProps {
  currentColor: string;
  currentPattern: string;
  onColorChange: (color: string) => void;
  onPatternChange: (pattern: string) => void;
  onCustomized: () => void;
}

export function TeapotCustomizer({
  currentColor,
  currentPattern,
  onColorChange,
  onPatternChange,
  onCustomized,
}: TeapotCustomizerProps) {
  return (
    <section className="customizer" aria-label="Teapot customizer">
      <h2 className="customizer__title">CUSTOMIZE YOUR TEAPOT</h2>

      {/* Color selector */}
      <div className="customizer__section">
        <h3 className="customizer__label">COLOR</h3>
        <div className="customizer__colors">
          {TEAPOT_COLORS.map((c) => (
            <motion.button
              key={c.value}
              className={`customizer__color-btn ${currentColor === c.value ? 'customizer__color-btn--active' : ''}`}
              style={{
                backgroundColor: c.value,
                boxShadow: currentColor === c.value ? `0 0 12px ${c.glow}` : 'none',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onColorChange(c.value);
                onCustomized();
              }}
              aria-label={c.name}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Pattern selector */}
      <div className="customizer__section">
        <h3 className="customizer__label">PATTERN</h3>
        <div className="customizer__patterns">
          {TEAPOT_PATTERNS.map((p) => (
            <motion.button
              key={p.value}
              className={`customizer__pattern-btn ${currentPattern === p.value ? 'customizer__pattern-btn--active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPatternChange(p.value);
                onCustomized();
              }}
            >
              {p.name.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
