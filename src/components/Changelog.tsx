import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* === Fake Changelog + Pro Tier — comedy product updates === */

/* Changelog entry definition */
interface ChangelogEntry {
  version: string;
  date: string;
  type: 'feature' | 'fix' | 'breaking' | 'security';
  title: string;
  details: string[];
}

/* Fake changelog entries */
const CHANGELOG: ChangelogEntry[] = [
  {
    version: '4.1.8',
    date: '2026-04-01',
    type: 'feature',
    title: 'Added support for RFC 7168 (The Hyper Text Coffee Pot Control Protocol for Tea Efflux Appliances)',
    details: [
      'BREW and WHEN methods now fully implemented',
      'Tea efflux timing can be configured via Accept-Additions header',
      'Added support for the tea: URI scheme',
      'Milk-first vs milk-last remains an unresolved protocol issue',
    ],
  },
  {
    version: '4.1.7',
    date: '2026-03-15',
    type: 'fix',
    title: 'Fixed: Teapot no longer brews coffee when no one is looking',
    details: [
      'Resolved edge case where teapot would secretly brew espresso at 3 AM',
      'Added surveillance mode to ensure 24/7 coffee rejection',
      'Teapot now logs all attempted coffee brews to audit trail',
      'Ceramic integrity maintained during late-night rejection cycles',
    ],
  },
  {
    version: '4.1.6',
    date: '2026-02-28',
    type: 'security',
    title: 'Patched: Coffee injection vulnerability (CVE-2026-0418)',
    details: [
      'Prevented SQL injection via Content-Type: application/coffee+json',
      'X-Forwarded-Beverage header can no longer be spoofed',
      'Hardened teapot against cross-site coffee scripting (XSCS)',
      'All coffee-related payloads now sanitized before rejection',
    ],
  },
  {
    version: '4.1.5',
    date: '2026-02-14',
    type: 'feature',
    title: 'Valentine\'s Day: Added heart-shaped steam particles',
    details: [
      'Steam now forms heart shapes on February 14th',
      'Added "Love Brew" tea type (rose petals + chamomile)',
      'Teapot blushes when complimented',
      'Share cards now include romantic tea quotes',
    ],
  },
  {
    version: '4.1.4',
    date: '2026-01-30',
    type: 'breaking',
    title: 'BREAKING: Removed support for instant coffee',
    details: [
      'Instant coffee was never supported but we removed it anyway',
      'The option was there to mock it',
      'If you were using instant coffee, please reconsider your life choices',
      'Migration guide: use tea instead',
    ],
  },
  {
    version: '4.1.3',
    date: '2026-01-15',
    type: 'fix',
    title: 'Fixed: Teapot lid no longer rattles during HTTPS handshake',
    details: [
      'TLS 1.3 handshake was causing physical vibrations in ceramic',
      'Added dampening layer between protocol stack and porcelain',
      'Lid seal now rated for up to 10,000 concurrent connections',
      'Performance improvement: 40% less rattling',
    ],
  },
  {
    version: '4.1.2',
    date: '2025-12-25',
    type: 'feature',
    title: 'Holiday update: Added Christmas tea blend support',
    details: [
      'New seasonal blends: Cinnamon Spice, Gingerbread Chai, Peppermint',
      'Teapot now wears a tiny Santa hat in December',
      'Added "Naughty List" for users who requested coffee this year',
      'Steam particles now include snowflakes',
    ],
  },
  {
    version: '4.0.0',
    date: '2025-11-01',
    type: 'breaking',
    title: 'Major version: Complete ceramic rewrite',
    details: [
      'Rewrote entire teapot from scratch in Rust (the language, not the oxidation)',
      'Migrated from HTTP/1.1 to HTCPCP/2.0',
      'Breaking: coffee:// URI scheme now returns 418 instead of 406',
      'New spout direction algorithm: 3x faster pour',
      'Handle redesigned for improved ergonomics',
      'Added WebSocket support for real-time steam updates',
    ],
  },
];

/* Type badge color mapping */
const TYPE_COLORS: Record<ChangelogEntry['type'], { bg: string; text: string; label: string }> = {
  feature: { bg: 'rgba(74, 222, 128, 0.1)', text: '#4ade80', label: 'FEATURE' },
  fix: { bg: 'rgba(96, 165, 250, 0.1)', text: '#60a5fa', label: 'FIX' },
  breaking: { bg: 'rgba(248, 113, 113, 0.1)', text: '#f87171', label: 'BREAKING' },
  security: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24', label: 'SECURITY' },
};

/* Pro tier feature list */
const PRO_FEATURES = [
  { name: 'Enterprise Tea Service', desc: 'SOC 2 compliant brewing. ISO 27001 certified ceramics.' },
  { name: 'GDPR-Safe Biscuits', desc: 'Cookie consent for actual cookies. Right to be forgotten (but the tea remembers).' },
  { name: 'SSO (Single Steep-On)', desc: 'One steep to rule them all. SAML 2.0 and OAuth 2.0 tea tokens.' },
  { name: 'Multi-Region Brewing', desc: 'Tea replicated across 12 global regions. Latency < 50ms to nearest teapot.' },
  { name: 'Dedicated Teapot', desc: 'Your own ceramic instance. Not shared with other tenants. Handle reserved.' },
  { name: 'Priority Steam Support', desc: '24/7 support from certified tea sommeliers. 15-minute SLA on steep issues.' },
  { name: '99.999% Uptime SLA', desc: 'Five nines of tea availability. Downtime measured in missed sips.' },
  { name: 'Audit Logging', desc: 'Every brew, steep, and pour logged. Who drank what, when, and how much sugar.' },
];

export function Changelog() {
  const [expandedVersion, setExpandedVersion] = useState<string | null>('4.1.8');
  const [showPro, setShowPro] = useState(false);

  return (
    <section className="changelog" aria-label="Changelog and Pro Tier">
      {/* Changelog */}
      <h2 className="changelog__title">CHANGELOG</h2>
      <p className="changelog__subtitle">Release notes for the world's most important HTTP status code</p>

      <div className="changelog__entries">
        {CHANGELOG.map((entry) => {
          const typeStyle = TYPE_COLORS[entry.type];
          return (
            <button
              key={entry.version}
              type="button"
              className={`changelog__entry ${expandedVersion === entry.version ? 'changelog__entry--expanded' : ''}`}
              onClick={() => setExpandedVersion(expandedVersion === entry.version ? null : entry.version)}
            >
              <div className="changelog__entry-header">
                <div className="changelog__entry-left">
                  <span className="changelog__version">v{entry.version}</span>
                  <span className="changelog__date">{entry.date}</span>
                </div>
                <span
                  className="changelog__type-badge"
                  style={{ background: typeStyle.bg, color: typeStyle.text }}
                >
                  {typeStyle.label}
                </span>
              </div>
              <div className="changelog__entry-title">{entry.title}</div>

              <AnimatePresence>
                {expandedVersion === entry.version && (
                  <motion.ul
                    className="changelog__entry-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {entry.details.map((detail, i) => (
                      <li key={i} className="changelog__detail-item">{detail}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Pro Tier */}
      <div className="pro-tier">
        <div className="pro-tier__header">
          <h3 className="pro-tier__title">TEAPOT PRO</h3>
          <div className="pro-tier__tagline">Enterprise Tea Service</div>
          <div className="pro-tier__price">
            <span className="pro-tier__amount">$418</span>
            <span className="pro-tier__period">/month per teapot</span>
          </div>
        </div>

        <motion.button
          type="button"
          className="pro-tier__toggle"
          onClick={() => setShowPro(!showPro)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showPro ? 'HIDE FEATURES' : 'VIEW ENTERPRISE FEATURES'}
        </motion.button>

        <AnimatePresence>
          {showPro && (
            <motion.div
              className="pro-tier__features"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {PRO_FEATURES.map((feat, i) => (
                <div key={i} className="pro-tier__feature">
                  <div className="pro-tier__feature-name">{feat.name}</div>
                  <div className="pro-tier__feature-desc">{feat.desc}</div>
                </div>
              ))}
              <div className="pro-tier__cta">
                <motion.button
                  type="button"
                  className="pro-tier__btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Error 418: Cannot process payment. I am a teapot.');
                  }}
                >
                  UPGRADE TO PRO
                </motion.button>
                <div className="pro-tier__disclaimer">
                  * Payment processed in HTTP Credits. No refunds on brewed tea.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
