interface BrewLogProps {
  entries: string[];
}

function getLineColor(line: string): string {
  if (line.includes('ERROR') || line.includes('418')) return 'brew-log__line--error';
  if (line.includes('Confirmed') || line.includes('terminated')) return 'brew-log__line--warning';
  return '';
}

export function BrewLog({ entries }: BrewLogProps) {
  if (entries.length === 0) return null;

  return (
    <div className="brew-log" role="log" aria-label="Brew process log">
      {entries.map((line, i) => (
        <div key={i} className={`brew-log__line ${getLineColor(line)}`}>
          <span className="brew-log__prefix">{'>'}</span> {line}
        </div>
      ))}
      <span className="brew-log__cursor">_</span>
    </div>
  );
}
