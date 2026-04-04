import { motion } from 'framer-motion';

/* === Coffee Input — request field with submit button === */

interface CoffeeInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  processing: boolean;
}

export function CoffeeInput({ value, onChange, onSubmit, processing }: CoffeeInputProps) {
  return (
    <div className="coffee-input">
      <label className="coffee-input__label" htmlFor="coffee-request">
        SEND COFFEE REQUEST (will be rejected):
      </label>
      <div className="coffee-input__row">
        <div className="coffee-input__field-wrap">
          <span className="coffee-input__prompt" aria-hidden="true">{'>'}</span>
          <input
            id="coffee-request"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="BREW /coffee HTTP/1.1"
            className="coffee-input__field"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <motion.button
          onClick={onSubmit}
          disabled={processing}
          className="coffee-input__btn"
          aria-busy={processing}
          whileHover={{ scale: processing ? 1 : 1.03 }}
          whileTap={{ scale: processing ? 1 : 0.97 }}
        >
          {processing ? 'PROCESSING...' : 'BREW COFFEE'}
        </motion.button>
      </div>
      <div className="coffee-input__hints">
        <span className="coffee-input__hint">TIP: try "espresso" or "sudo brew coffee"</span>
      </div>
    </div>
  );
}
