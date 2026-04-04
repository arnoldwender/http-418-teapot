import { useState, useCallback, useRef } from 'react';
import { BREW_LOG, randomRefusal } from '../data/teapot-content';
import type { TeaItem } from '../data/teapot-content';

export type Phase = 'idle' | 'processing' | 'rejected';

export function useBrewProcess() {
  const [log, setLog] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [refusal, setRefusal] = useState('');
  const [steaming, setSteaming] = useState(false);
  const [totalRefusals, setTotalRefusals] = useState(0);
  const [selectedTea, setSelectedTea] = useState<TeaItem | null>(null);
  const [brewingTea, setBrewingTea] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendRequest = useCallback(() => {
    if (phase === 'processing') return;
    setPhase('processing');
    setLog([]);
    setSteaming(false);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < BREW_LOG.length) {
        setLog((prev) => [...prev, BREW_LOG[i]]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setRefusal(randomRefusal());
        setSteaming(true);
        setTotalRefusals((r) => r + 1);
        setPhase('rejected');
        setTimeout(() => setSteaming(false), 3000);
      }
    }, 280);
  }, [phase]);

  const brewTea = useCallback((tea: TeaItem) => {
    if (tea.status === '418 FORBIDDEN') {
      sendRequest();
      return;
    }
    setSelectedTea(tea);
    setBrewingTea(true);
    setTimeout(() => setBrewingTea(false), 2500);
  }, [sendRequest]);

  return {
    log,
    phase,
    refusal,
    steaming,
    totalRefusals,
    selectedTea,
    brewingTea,
    sendRequest,
    brewTea,
  };
}
