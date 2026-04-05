import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEA_MENU } from './data/teapot-content';
import type { HttpStatusTea } from './data/teapot-content';
import { useGlitchTitle } from './hooks/useGlitchTitle';
import { useBrewProcess } from './hooks/useBrewProcess';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useAchievements } from './hooks/useAchievements';
import { useConfetti } from './hooks/useConfetti';
import { useDeviceShake } from './hooks/useDeviceShake';
import { TeapotIcon } from './components/TeapotIcon';
import { CoffeeInput } from './components/CoffeeInput';
import { BrewLog } from './components/BrewLog';
import { ResponseCard } from './components/ResponseCard';
import { TeaMenu } from './components/TeaMenu';
import { HttpStatusTeaMenu } from './components/HttpStatusTeaMenu';
import { BrewTimer } from './components/BrewTimer';
import { OrderReceipt } from './components/OrderReceipt';
import { TeapotCustomizer } from './components/TeapotCustomizer';
import { GlobalCounter } from './components/GlobalCounter';
import { AchievementToast } from './components/AchievementToast';
import { AchievementPanel } from './components/AchievementPanel';
import { ShareCard } from './components/ShareCard';
import { PostmanPanel } from './components/PostmanPanel';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { Changelog } from './components/Changelog';

/* === Main App — orchestrates all features and wires interactions === */

export default function App() {
  const titleText = useGlitchTitle();
  const [request, setRequest] = useState('');
  const [teapotColor, setTeapotColor] = useState('#ff9900');
  const [teapotPattern, setTeapotPattern] = useState('none');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [viewedStatuses, setViewedStatuses] = useState<Set<number>>(new Set());

  const {
    log, phase, refusal, steaming, totalRefusals, totalBrews,
    selectedTea, brewingTea, brewProgress, teapotReaction,
    isEspressoRage, screenShake, receipt, brewedTeas,
    sendRequest, brewTea, addReceipt,
  } = useBrewProcess();

  const { playKettleWhistle, playPour, playClink, playBuzzer, playAchievement } = useSoundEffects();
  const { unlocked, latestUnlock, unlock, isUnlocked } = useAchievements();
  const { fireTeaConfetti, fireRageConfetti, fireAchievementConfetti } = useConfetti();

  /* === Sound wrapper — only play if enabled === */
  const sound = useCallback((fn: () => void) => {
    if (soundEnabled) fn();
  }, [soundEnabled]);

  /* === Handle coffee request submission === */
  function handleSubmit() {
    if (!request.trim()) return;
    const result = sendRequest(request);

    /* Sound for processing start */
    sound(playKettleWhistle);

    /* Delayed sound/effects for rejection */
    setTimeout(() => {
      sound(playBuzzer);

      /* Achievement: first refusal */
      if (!isUnlocked('first-refusal')) {
        unlock('first-refusal');
        sound(playAchievement);
        fireAchievementConfetti();
      }

      /* Achievement: espresso rage */
      if (result?.isEspresso && !isUnlocked('espresso-rage')) {
        unlock('espresso-rage');
        fireRageConfetti();
        sound(playAchievement);
      }

      /* Achievement: sudo hacker */
      if (result?.isSudo && !isUnlocked('sudo-hacker')) {
        unlock('sudo-hacker');
        sound(playAchievement);
        fireAchievementConfetti();
      }
    }, 280 * 10 + 100); /* after brew log completes */

    setRequest('');
  }

  /* === Handle tea brew from classic menu === */
  function handleBrewTea(tea: typeof TEA_MENU[number]) {
    const result = brewTea(tea);

    if (result?.forbidden) {
      /* Forbidden teas trigger coffee rejection flow */
      sound(playKettleWhistle);
      setTimeout(() => sound(playBuzzer), 280 * 10 + 100);
    } else {
      /* Real tea brew */
      sound(playKettleWhistle);
      sound(playPour);

      /* Confetti + clink when done */
      setTimeout(() => {
        sound(playClink);
        fireTeaConfetti();
      }, 3000);
    }
  }

  /* === Handle HTTP status tea selection === */
  function handleStatusTeaSelect(tea: HttpStatusTea) {
    addReceipt('status-viewed', `${tea.code} ${tea.tea}`);
    /* Play clink for interaction feedback */
    sound(playClink);
  }

  /* === Track viewed statuses for achievement === */
  function handleViewStatus(code: number) {
    setViewedStatuses((prev) => {
      const next = new Set(prev);
      next.add(code);
      return next;
    });
  }

  /* === Device shake easter egg — "refill" teapot === */
  useDeviceShake(useCallback(() => {
    sound(playClink);
    fireTeaConfetti();
  }, [sound, playClink, fireTeaConfetti]));

  /* === Achievement checks that depend on running totals === */
  useEffect(() => {
    /* Persistent — 10 coffee attempts */
    if (totalRefusals >= 10 && !isUnlocked('persistent')) {
      unlock('persistent');
      sound(playAchievement);
      fireAchievementConfetti();
    }
    /* Very persistent — 25 coffee attempts */
    if (totalRefusals >= 25 && !isUnlocked('very-persistent')) {
      unlock('very-persistent');
      sound(playAchievement);
      fireAchievementConfetti();
    }
  }, [totalRefusals, isUnlocked, unlock, sound, playAchievement, fireAchievementConfetti]);

  useEffect(() => {
    /* Tea connoisseur — tried all available teas (6 non-forbidden) */
    const availableTeas = TEA_MENU.filter((t) => t.status === 'AVAILABLE');
    if (brewedTeas.size >= availableTeas.length && !isUnlocked('tea-connoisseur')) {
      unlock('tea-connoisseur');
      sound(playAchievement);
      fireAchievementConfetti();
    }
    /* Brew master — 5 teas brewed */
    if (totalBrews >= 5 && !isUnlocked('brew-master')) {
      unlock('brew-master');
      sound(playAchievement);
      fireAchievementConfetti();
    }
  }, [brewedTeas, totalBrews, isUnlocked, unlock, sound, playAchievement, fireAchievementConfetti]);

  useEffect(() => {
    /* Status explorer — viewed all 6 HTTP status teas */
    if (viewedStatuses.size >= 6 && !isUnlocked('status-explorer')) {
      unlock('status-explorer');
      sound(playAchievement);
      fireAchievementConfetti();
    }
  }, [viewedStatuses, isUnlocked, unlock, sound, playAchievement, fireAchievementConfetti]);

  /* === Customizer achievement === */
  function handleCustomized() {
    if (!isUnlocked('customizer')) {
      unlock('customizer');
      sound(playAchievement);
      fireAchievementConfetti();
    }
  }

  /* === Share card generated achievement === */
  function handleShareGenerated() {
    if (!isUnlocked('sharer')) {
      unlock('sharer');
      sound(playAchievement);
      fireAchievementConfetti();
    }
  }

  return (
    <div className={`teapot-app ${screenShake ? 'teapot-app--screen-shake' : ''}`}>
      {/* CRT overlays */}
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <div className="scanline-bar" aria-hidden="true" />

      {/* Achievement toast — fixed position */}
      <AchievementToast achievement={latestUnlock} />

      <main className="teapot-container">
        {/* Header */}
        <header className="teapot-header">
          <div className="teapot-header__protocol">
            RFC 2324 — HYPER TEXT COFFEE POT CONTROL PROTOCOL
          </div>

          <TeapotIcon
            steaming={steaming}
            reaction={teapotReaction}
            color={teapotColor}
            pattern={teapotPattern}
          />

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

          {/* Global counter */}
          <GlobalCounter refusals={totalRefusals} brews={totalBrews} />

          {/* Sound toggle */}
          <button
            type="button"
            className="sound-toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? '🔊' : '🔇'} SOUND: {soundEnabled ? 'ON' : 'OFF'}
          </button>
        </header>

        {/* Coffee input */}
        <CoffeeInput
          value={request}
          onChange={setRequest}
          onSubmit={handleSubmit}
          processing={phase === 'processing'}
        />

        {/* Brew log */}
        <BrewLog entries={log} />

        {/* Rejection response */}
        <AnimatePresence>
          {phase === 'rejected' && <ResponseCard refusal={refusal} isEspressoRage={isEspressoRage} />}
        </AnimatePresence>

        {/* Brew timer */}
        <AnimatePresence>
          <BrewTimer
            progress={brewProgress}
            teaName={selectedTea?.name || ''}
            isActive={brewingTea}
          />
        </AnimatePresence>

        {/* Classic tea menu */}
        <TeaMenu
          items={TEA_MENU}
          selectedTea={selectedTea}
          brewingTea={brewingTea}
          onBrew={handleBrewTea}
        />

        {/* HTTP Status tea pairing menu */}
        <HttpStatusTeaMenu
          onSelect={handleStatusTeaSelect}
          onViewStatus={handleViewStatus}
        />

        {/* Two-column layout: receipt + customizer */}
        <div className="two-col">
          <OrderReceipt
            items={receipt}
            totalRefusals={totalRefusals}
            totalBrews={totalBrews}
          />
          <TeapotCustomizer
            currentColor={teapotColor}
            currentPattern={teapotPattern}
            onColorChange={setTeapotColor}
            onPatternChange={setTeapotPattern}
            onCustomized={handleCustomized}
          />
        </div>

        {/* Postman-style HTCPCP request panel */}
        <PostmanPanel
          onSendRequest={handleSubmit}
          processing={phase === 'processing'}
        />

        {/* RFC 2324 compliance grading dashboard */}
        <ComplianceDashboard />

        {/* Fake changelog + Pro tier */}
        <Changelog />

        {/* Achievements */}
        <AchievementPanel unlocked={unlocked} />

        {/* Share card */}
        <ShareCard
          totalRefusals={totalRefusals}
          totalBrews={totalBrews}
          achievementCount={unlocked.size}
          teapotColor={teapotColor}
          onGenerated={handleShareGenerated}
        />

        {/* Footer */}
        <footer className="teapot-footer">
          <div>IN MEMORY OF RFC 2324 (APRIL 1, 1998) — THE GREATEST APRIL FOOLS JOKE IN INTERNET HISTORY</div>
          <div>LARRY MASINTER: THANK YOU FOR THIS GIFT TO HUMANITY</div>
          <div className="teapot-footer__credit">BUILT BY ARNOLD WENDER — WE REFUSE COFFEE TOO</div>
        </footer>
      </main>
    </div>
  );
}
