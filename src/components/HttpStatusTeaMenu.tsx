import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HTTP_STATUS_TEAS } from '../data/teapot-content';
import type { HttpStatusTea } from '../data/teapot-content';

/* === HTTP Status Tea Menu — interactive menu mapping status codes to teas === */

interface HttpStatusTeaMenuProps {
  onSelect: (tea: HttpStatusTea) => void;
  onViewStatus: (code: number) => void;
}

/* Animation component for each status type */
function StatusAnimation({ tea }: { tea: HttpStatusTea }) {
  switch (tea.animation) {
    case 'calm':
      return (
        <motion.div
          className="status-anim status-anim--calm"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="status-anim__icon">🍵</span>
        </motion.div>
      );
    case 'slide':
      return (
        <motion.div
          className="status-anim status-anim--slide"
          animate={{ x: [0, 30, -30, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="status-anim__icon">🍵</span>
          <span className="status-anim__arrow">→</span>
        </motion.div>
      );
    case 'empty':
      return (
        <motion.div
          className="status-anim status-anim--empty"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="status-anim__icon" style={{ filter: 'grayscale(100%)' }}>☕</span>
          <span className="status-anim__sad">:(</span>
        </motion.div>
      );
    case 'glow':
      return (
        <motion.div
          className="status-anim status-anim--glow"
          animate={{
            textShadow: [
              '0 0 10px #ff9900, 0 0 20px #ff9900',
              '0 0 20px #ff9900, 0 0 40px #ff9900, 0 0 60px #ff660044',
              '0 0 10px #ff9900, 0 0 20px #ff9900',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="status-anim__icon">🫖</span>
          <span className="status-anim__sparkle">✨</span>
        </motion.div>
      );
    case 'spill':
      return (
        <motion.div className="status-anim status-anim--spill">
          <motion.span
            className="status-anim__icon"
            animate={{ rotate: [0, -45, -90] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            🍵
          </motion.span>
          <motion.div
            className="status-anim__drops"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, 20] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            💧💧💧
          </motion.div>
        </motion.div>
      );
    case 'unavailable':
      return (
        <motion.div
          className="status-anim status-anim--unavailable"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="status-anim__icon">🚫</span>
          <span className="status-anim__retry">RETRY?</span>
        </motion.div>
      );
  }
}

export function HttpStatusTeaMenu({ onSelect, onViewStatus }: HttpStatusTeaMenuProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="http-menu" aria-label="HTTP Status Tea Menu">
      <h2 className="http-menu__title">
        HTTP STATUS TEA PAIRING
      </h2>
      <p className="http-menu__subtitle">Every HTTP status deserves a tea. Select to brew.</p>

      <div className="http-menu__grid">
        {HTTP_STATUS_TEAS.map((tea) => (
          <motion.button
            key={tea.code}
            className={`http-menu__card ${expanded === tea.code ? 'http-menu__card--expanded' : ''}`}
            onClick={() => {
              setExpanded(expanded === tea.code ? null : tea.code);
              onViewStatus(tea.code);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            <div className="http-menu__card-header">
              <span className="http-menu__code">{tea.code}</span>
              <span className="http-menu__status-text">{tea.statusText}</span>
            </div>
            <div className="http-menu__tea-name">{tea.tea}</div>

            <AnimatePresence>
              {expanded === tea.code && (
                <motion.div
                  className="http-menu__card-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatusAnimation tea={tea} />
                  <p className="http-menu__description">{tea.description}</p>
                  <div className="http-menu__meta">
                    <span>TEMP: {tea.temp}</span>
                    {tea.brewTime > 0 && <span>BREW: {tea.brewTime}s</span>}
                  </div>
                  {tea.animation !== 'unavailable' && tea.animation !== 'empty' && (
                    <motion.button
                      className="http-menu__brew-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(tea);
                      }}
                    >
                      BREW THIS TEA
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
