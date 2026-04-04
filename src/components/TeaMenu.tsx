import type { TeaItem } from '../data/teapot-content';

interface TeaMenuProps {
  items: TeaItem[];
  selectedTea: TeaItem | null;
  brewingTea: boolean;
  onBrew: (item: TeaItem) => void;
}

export function TeaMenu({ items, selectedTea, brewingTea, onBrew }: TeaMenuProps) {
  return (
    <section className="tea-menu" aria-label="Beverage menu">
      <h2 className="tea-menu__title">
        AVAILABLE BEVERAGES — SELECT TO BREW
      </h2>
      <div className="tea-menu__grid">
        {items.map((item, i) => {
          const forbidden = item.status === '418 FORBIDDEN';
          const isBrewing = brewingTea && selectedTea?.name === item.name && !forbidden;
          return (
            <button
              key={i}
              onClick={() => onBrew(item)}
              className={`tea-menu__item ${forbidden ? 'tea-menu__item--forbidden' : ''} ${isBrewing ? 'tea-menu__item--brewing' : ''}`}
              aria-label={`${item.name} - ${item.status}`}
            >
              <div className="tea-menu__item-row">
                <span className="tea-menu__item-name">
                  {forbidden ? '\u2615' : '\uD83C\uDF75'} {item.name}
                </span>
                <span className="tea-menu__item-temp">{item.temp}</span>
              </div>
              <div className="tea-menu__item-status">
                {isBrewing ? 'BREWING... \uD83E\uDED6' : item.status}
              </div>
            </button>
          );
        })}
      </div>
      {brewingTea && selectedTea && selectedTea.status !== '418 FORBIDDEN' && (
        <div className="tea-menu__brewing-msg" role="status">
          BREWING {selectedTea.name.toUpperCase()} AT {selectedTea.temp}... BECAUSE I CAN. I AM A TEAPOT.
        </div>
      )}
    </section>
  );
}
