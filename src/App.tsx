import { useState } from 'react';
import { TEA_MENU } from './data/teapot-content';
import { useGlitchTitle } from './hooks/useGlitchTitle';
import { useBrewProcess } from './hooks/useBrewProcess';
import { TeapotIcon } from './components/TeapotIcon';
import { CoffeeInput } from './components/CoffeeInput';
import { BrewLog } from './components/BrewLog';
import { ResponseCard } from './components/ResponseCard';
import { TeaMenu } from './components/TeaMenu';

export default function App() {
  const titleText = useGlitchTitle();
  const [request, setRequest] = useState('');
  const {
    log,
    phase,
    refusal,
    steaming,
    totalRefusals,
    selectedTea,
    brewingTea,
    sendRequest,
    brewTea,
  } = useBrewProcess();

  function handleSubmit() {
    if (!request.trim()) return;
    sendRequest();
  }

  return (
    <div className="teapot-app">
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <div className="scanline-bar" aria-hidden="true" />

      <main className="teapot-container">
        <header className="teapot-header">
          <div className="teapot-header__protocol">
            RFC 2324 — HYPER TEXT COFFEE POT CONTROL PROTOCOL
          </div>
          <TeapotIcon steaming={steaming} />
          <h1 className="teapot-header__title">{titleText}</h1>
          <div className="teapot-header__subtitle">
            HTTP 418 — SHORT, STOUT, AND UNAPOLOGETICALLY CERAMIC
          </div>
          <div className="teapot-header__badges">
            <span>SINCE 1998</span>
            <span>RFC 2324 COMPLIANT</span>
            <span>COFFEE-FREE</span>
            <span>LARRY MASINTER APPROVED</span>
          </div>
          {totalRefusals > 0 && (
            <div className="teapot-header__counter" role="status">
              COFFEE REQUESTS REFUSED: {totalRefusals}
            </div>
          )}
        </header>

        <CoffeeInput
          value={request}
          onChange={setRequest}
          onSubmit={handleSubmit}
          processing={phase === 'processing'}
        />

        <BrewLog entries={log} />

        {phase === 'rejected' && <ResponseCard refusal={refusal} />}

        <TeaMenu
          items={TEA_MENU}
          selectedTea={selectedTea}
          brewingTea={brewingTea}
          onBrew={brewTea}
        />

        <footer className="teapot-footer">
          <div>IN MEMORY OF RFC 2324 (APRIL 1, 1998) — THE GREATEST APRIL FOOLS JOKE IN INTERNET HISTORY</div>
          <div>LARRY MASINTER: THANK YOU FOR THIS GIFT TO HUMANITY</div>
          <div className="teapot-footer__credit">BUILT BY WENDER MEDIA — WE REFUSE COFFEE TOO</div>
        </footer>
      </main>
    </div>
  );
}
