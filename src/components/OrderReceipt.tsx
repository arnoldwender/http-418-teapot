import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReceiptItem } from '../data/teapot-content';

/* === Order Receipt — thermal printer aesthetic scrollable tape === */

interface OrderReceiptProps {
  items: ReceiptItem[];
  totalRefusals: number;
  totalBrews: number;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function getItemSymbol(type: ReceiptItem['type']): string {
  switch (type) {
    case 'coffee-refused': return '✗';
    case 'tea-brewed': return '✓';
    case 'status-viewed': return '◉';
  }
}

export function OrderReceipt({ items, totalRefusals, totalBrews }: OrderReceiptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to top when new items arrive */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [items.length]);

  const totalCredits = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="receipt" aria-label="Order receipt">
      <div className="receipt__header">
        <div className="receipt__logo">THE TEAPOT CAFE</div>
        <div className="receipt__tagline">EST. 1998 — RFC 2324 COMPLIANT</div>
        <div className="receipt__divider">{'═'.repeat(36)}</div>
        <div className="receipt__session">SESSION #{Date.now().toString(36).toUpperCase().slice(-6)}</div>
      </div>

      <div className="receipt__body" ref={scrollRef}>
        {items.length === 0 ? (
          <div className="receipt__empty">
            NO ORDERS YET
            <br />
            TRY REQUESTING COFFEE (IT WILL FAIL)
          </div>
        ) : (
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={`${item.timestamp.getTime()}-${i}`}
                className={`receipt__item receipt__item--${item.type}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="receipt__item-row">
                  <span className="receipt__item-symbol">{getItemSymbol(item.type)}</span>
                  <span className="receipt__item-name">{item.name}</span>
                  <span className="receipt__item-dots">{'·'.repeat(10)}</span>
                  <span className="receipt__item-price">
                    {item.price === 0 ? 'FREE*' : `${item.price} HC`}
                  </span>
                </div>
                <div className="receipt__item-time">{formatTime(item.timestamp)}</div>
                {item.type === 'coffee-refused' && (
                  <div className="receipt__item-note">*REJECTED — NO CHARGE</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="receipt__footer">
        <div className="receipt__divider">{'─'.repeat(36)}</div>
        <div className="receipt__totals">
          <div className="receipt__total-row">
            <span>COFFEE REFUSED:</span>
            <span>{totalRefusals}</span>
          </div>
          <div className="receipt__total-row">
            <span>TEAS BREWED:</span>
            <span>{totalBrews}</span>
          </div>
          <div className="receipt__divider">{'─'.repeat(36)}</div>
          <div className="receipt__total-row receipt__total-row--grand">
            <span>TOTAL:</span>
            <span>{totalCredits} HTTP CREDITS</span>
          </div>
        </div>
        <div className="receipt__barcode" aria-hidden="true">
          ||||| |||| ||||| || |||| ||||| ||
        </div>
        <div className="receipt__thank-you">THANK YOU FOR CHOOSING TEA</div>
      </div>
    </section>
  );
}
