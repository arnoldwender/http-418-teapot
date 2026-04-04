import { motion } from 'framer-motion';

/* === Response Card — displays the 418 rejection with animation === */

interface ResponseCardProps {
  refusal: string;
  isEspressoRage: boolean;
}

export function ResponseCard({ refusal, isEspressoRage }: ResponseCardProps) {
  return (
    <motion.div
      className={`response-card ${isEspressoRage ? 'response-card--rage' : ''}`}
      role="alert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="response-card__header">
        <div className="response-card__status">
          <motion.div
            className="response-card__code"
            animate={isEspressoRage ? { scale: [1, 1.3, 1], color: ['#ff0000', '#ff4444', '#ff0000'] } : {}}
            transition={{ duration: 0.5, repeat: isEspressoRage ? 3 : 0 }}
          >
            418
          </motion.div>
          <div className="response-card__label">I'M A TEAPOT</div>
        </div>
        <div className="response-card__headers">
          <div>Content-Type: text/teapot</div>
          <div>I-Am-A-Teapot: true</div>
          <div>Will-Brew-Coffee: false</div>
          <div>Porcelain: yes</div>
          <div>X-Caffeine-Level: 0</div>
          {isEspressoRage && <div className="response-card__rage-header">X-Rage-Level: MAXIMUM</div>}
        </div>
      </div>
      <div className="response-card__body">
        {refusal}
      </div>
    </motion.div>
  );
}
