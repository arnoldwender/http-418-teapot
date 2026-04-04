import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* === Brew Log — terminal-style log with animated line entries === */

interface BrewLogProps {
  entries: string[];
}

function getLineColor(line: string): string {
  if (line.includes('ERROR') || line.includes('418')) return 'brew-log__line--error';
  if (line.includes('Confirmed') || line.includes('terminated')) return 'brew-log__line--warning';
  return '';
}

export function BrewLog({ entries }: BrewLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom as new lines arrive */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length]);

  if (entries.length === 0) return null;

  return (
    <div className="brew-log" role="log" aria-label="Brew process log" ref={scrollRef}>
      <AnimatePresence>
        {entries.map((line, i) => (
          <motion.div
            key={i}
            className={`brew-log__line ${getLineColor(line)}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span className="brew-log__prefix">{'>'}</span> {line}
          </motion.div>
        ))}
      </AnimatePresence>
      <span className="brew-log__cursor">_</span>
    </div>
  );
}
