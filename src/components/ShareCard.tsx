import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

/* === Share Card — "My Teapot Session" exportable image === */

interface ShareCardProps {
  totalRefusals: number;
  totalBrews: number;
  achievementCount: number;
  teapotColor: string;
  onGenerated: () => void;
}

export function ShareCard({ totalRefusals, totalBrews, achievementCount, teapotColor, onGenerated }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = useCallback(async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: 2,
      });

      /* Create download link */
      const link = document.createElement('a');
      link.download = 'my-teapot-session.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      onGenerated();
    } catch (err) {
      console.error('Failed to generate share card:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, onGenerated]);

  return (
    <section className="share-card" aria-label="Share card">
      <h2 className="share-card__heading">MY TEAPOT SESSION</h2>

      {/* The card that gets captured as an image */}
      <div className="share-card__preview" ref={cardRef}>
        <div className="share-card__inner" style={{ borderColor: teapotColor }}>
          <div className="share-card__logo" style={{ color: teapotColor }}>
            🫖 HTTP 418
          </div>
          <div className="share-card__subtitle">I AM A TEAPOT</div>

          <div className="share-card__stats">
            <div className="share-card__stat">
              <span className="share-card__stat-number" style={{ color: '#ff4444' }}>{totalRefusals}</span>
              <span className="share-card__stat-label">COFFEE REFUSED</span>
            </div>
            <div className="share-card__stat">
              <span className="share-card__stat-number" style={{ color: '#4ade80' }}>{totalBrews}</span>
              <span className="share-card__stat-label">TEAS BREWED</span>
            </div>
            <div className="share-card__stat">
              <span className="share-card__stat-number" style={{ color: '#fbbf24' }}>{achievementCount}</span>
              <span className="share-card__stat-label">ACHIEVEMENTS</span>
            </div>
          </div>

          <div className="share-card__tagline">
            RFC 2324 COMPLIANT SINCE 1998
          </div>
          <div className="share-card__url">http-418-teapot.netlify.app</div>
        </div>
      </div>

      <motion.button
        className="share-card__btn"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={generateImage}
        disabled={isGenerating}
      >
        {isGenerating ? 'GENERATING...' : 'DOWNLOAD SHARE CARD'}
      </motion.button>
    </section>
  );
}
