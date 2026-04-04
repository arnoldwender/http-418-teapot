import { useState, useCallback, useRef } from 'react';
import { BREW_LOG, randomRefusal, randomEspressoRefusal, SUDO_RESPONSE, generatePrice } from '../data/teapot-content';
import type { TeaItem, ReceiptItem } from '../data/teapot-content';

export type Phase = 'idle' | 'processing' | 'rejected';
export type TeapotReaction = 'idle' | 'shaking' | 'pouring' | 'steaming';

/* === Core brew process — handles coffee requests, tea brewing, and easter eggs === */
export function useBrewProcess() {
  const [log, setLog] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [refusal, setRefusal] = useState('');
  const [steaming, setSteaming] = useState(false);
  const [totalRefusals, setTotalRefusals] = useState(0);
  const [totalBrews, setTotalBrews] = useState(0);
  const [selectedTea, setSelectedTea] = useState<TeaItem | null>(null);
  const [brewingTea, setBrewingTea] = useState(false);
  const [brewProgress, setBrewProgress] = useState(0);
  const [teapotReaction, setTeapotReaction] = useState<TeapotReaction>('idle');
  const [isEspressoRage, setIsEspressoRage] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptItem[]>([]);
  const [brewedTeas, setBrewedTeas] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const brewTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Add item to receipt tape */
  const addReceipt = useCallback((type: ReceiptItem['type'], name: string) => {
    const item: ReceiptItem = {
      timestamp: new Date(),
      type,
      name,
      price: generatePrice(type),
    };
    setReceipt((prev) => [item, ...prev]);
  }, []);

  /* Standard coffee request rejection */
  const sendRequest = useCallback((inputText?: string) => {
    if (phase === 'processing') return;

    /* Easter egg: sudo brew coffee */
    const isSudo = inputText?.toLowerCase().includes('sudo') && inputText?.toLowerCase().includes('coffee');
    /* Easter egg: espresso */
    const isEspresso = inputText?.toLowerCase().includes('espresso');

    setPhase('processing');
    setLog([]);
    setSteaming(false);
    setIsEspressoRage(false);
    setScreenShake(false);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < BREW_LOG.length) {
        setLog((prev) => [...prev, BREW_LOG[i]]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);

        /* Pick appropriate refusal based on easter eggs */
        if (isSudo) {
          setRefusal(SUDO_RESPONSE);
        } else if (isEspresso) {
          setRefusal(randomEspressoRefusal());
          setIsEspressoRage(true);
          setScreenShake(true);
          setTimeout(() => setScreenShake(false), 600);
        } else {
          setRefusal(randomRefusal());
        }

        setSteaming(true);
        setTeapotReaction('shaking');
        setTotalRefusals((r) => r + 1);
        setPhase('rejected');
        addReceipt('coffee-refused', inputText || 'BREW /coffee');

        setTimeout(() => {
          setSteaming(false);
          setTeapotReaction('idle');
          setIsEspressoRage(false);
        }, 3000);
      }
    }, 280);

    /* Return flags for achievement checking */
    return { isSudo, isEspresso };
  }, [phase, addReceipt]);

  /* Brew tea with progress timer */
  const brewTea = useCallback((tea: TeaItem) => {
    if (tea.status === '418 FORBIDDEN') {
      sendRequest(tea.name);
      return { forbidden: true };
    }

    setSelectedTea(tea);
    setBrewingTea(true);
    setBrewProgress(0);
    setTeapotReaction('pouring');

    /* Animate progress over brew time (scaled to ~3 seconds for UX) */
    const duration = 3000;
    const startTime = Date.now();

    brewTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setBrewProgress(progress);

      if (progress >= 1) {
        if (brewTimerRef.current) clearInterval(brewTimerRef.current);
        setBrewingTea(false);
        setTeapotReaction('steaming');
        setTotalBrews((b) => b + 1);
        setBrewedTeas((prev) => {
          const next = new Set(prev);
          next.add(tea.name);
          return next;
        });
        addReceipt('tea-brewed', tea.name);
        setTimeout(() => setTeapotReaction('idle'), 2000);
      }
    }, 50);

    return { forbidden: false };
  }, [sendRequest, addReceipt]);

  return {
    log,
    phase,
    refusal,
    steaming,
    totalRefusals,
    totalBrews,
    selectedTea,
    brewingTea,
    brewProgress,
    teapotReaction,
    isEspressoRage,
    screenShake,
    receipt,
    brewedTeas,
    sendRequest,
    brewTea,
    addReceipt,
  };
}
