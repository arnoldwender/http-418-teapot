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
        <button
          onClick={onSubmit}
          disabled={processing}
          className="coffee-input__btn"
          aria-busy={processing}
        >
          {processing ? 'PROCESSING...' : 'BREW COFFEE'}
        </button>
      </div>
    </div>
  );
}
