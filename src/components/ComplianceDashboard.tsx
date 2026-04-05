import { useState } from 'react';
import { motion } from 'framer-motion';

/* === RFC 2324 Compliance Dashboard — styled like SSL Labs grading === */

/* Compliance check item definition */
interface ComplianceCheck {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning';
  detail: string;
  rfc: string;
}

/* All compliance checks for HTCPCP protocol */
const COMPLIANCE_CHECKS: ComplianceCheck[] = [
  {
    id: 'htcpcp-support',
    name: 'HTCPCP Support',
    status: 'pass',
    detail: 'Full implementation of Hyper Text Coffee Pot Control Protocol. All BREW methods handled correctly.',
    rfc: 'RFC 2324 §2',
  },
  {
    id: 'teapot-id',
    name: 'Teapot Self-Identification',
    status: 'pass',
    detail: 'Server correctly identifies as teapot. Returns 418 status code on coffee requests. I-Am-A-Teapot header present.',
    rfc: 'RFC 2324 §2.3.2',
  },
  {
    id: 'coffee-rejection',
    name: 'Coffee Pot Rejection',
    status: 'pass',
    detail: 'All coffee-related requests rejected with 418 status. Espresso, Americano, Cappuccino, and Latte correctly refused.',
    rfc: 'RFC 2324 §2.3.2',
  },
  {
    id: 'safe-header',
    name: 'Safe Header Field',
    status: 'pass',
    detail: 'Safe: if-user-awake header correctly parsed. Teapot will not brew if user is not awake.',
    rfc: 'RFC 2324 §2.2.2.1',
  },
  {
    id: 'accept-additions',
    name: 'Accept-Additions Header',
    status: 'pass',
    detail: 'Milk, sugar, honey, and lemon accepted as additions. Cream types correctly negotiated.',
    rfc: 'RFC 2324 §2.2.2.2',
  },
  {
    id: 'milk-sequence',
    name: 'Milk Addition Sequence',
    status: 'fail',
    detail: 'NON-COMPLIANT. Whether milk goes in first or after tea is a religious matter that cannot be resolved by protocol specification. This has been an unresolved issue since 1998.',
    rfc: 'RFC 2324 §2.3.2 (contested)',
  },
  {
    id: 'tea-efflux',
    name: 'Tea Efflux Appliances (RFC 7168)',
    status: 'pass',
    detail: 'Full support for The Hyper Text Coffee Pot Control Protocol for Tea Efflux Appliances. BREW and WHEN methods implemented.',
    rfc: 'RFC 7168 §2',
  },
  {
    id: 'ceramic-integrity',
    name: 'Ceramic Integrity Check',
    status: 'pass',
    detail: 'Teapot structural integrity verified. No cracks. Handle attached. Spout aligned. Lid seated properly.',
    rfc: 'N/A (Physical)',
  },
  {
    id: 'coffee-uri',
    name: 'coffee:// URI Scheme',
    status: 'warning',
    detail: 'URI scheme recognized but deliberately unsupported. All coffee:// requests return 418. This is by design.',
    rfc: 'RFC 2324 §4',
  },
  {
    id: 'pot-designator',
    name: 'Pot Designator',
    status: 'pass',
    detail: 'Pot-1 designation active. Server correctly identifies as pot-1 in multi-teapot configurations.',
    rfc: 'RFC 2324 §3',
  },
];

/* Calculate the overall grade based on pass/fail/warning */
function calculateGrade(checks: ComplianceCheck[]): { grade: string; color: string; percentage: number } {
  const total = checks.length;
  const passed = checks.filter((c) => c.status === 'pass').length;
  const warnings = checks.filter((c) => c.status === 'warning').length;
  const percentage = Math.round(((passed + warnings * 0.5) / total) * 100);

  /* Grade thresholds styled like SSL Labs */
  if (percentage >= 95) return { grade: 'A+', color: '#4ade80', percentage };
  if (percentage >= 90) return { grade: 'A', color: '#4ade80', percentage };
  if (percentage >= 80) return { grade: 'B', color: '#fbbf24', percentage };
  return { grade: 'C', color: '#f87171', percentage };
}

export function ComplianceDashboard() {
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const { grade, color, percentage } = calculateGrade(COMPLIANCE_CHECKS);

  const passCount = COMPLIANCE_CHECKS.filter((c) => c.status === 'pass').length;
  const failCount = COMPLIANCE_CHECKS.filter((c) => c.status === 'fail').length;
  const warnCount = COMPLIANCE_CHECKS.filter((c) => c.status === 'warning').length;

  return (
    <section className="compliance" aria-label="RFC 2324 Compliance Dashboard">
      <h2 className="compliance__title">RFC 2324 COMPLIANCE REPORT</h2>
      <p className="compliance__subtitle">HTCPCP Protocol Compliance Assessment — Teapot Security Rating</p>

      {/* Grade display — SSL Labs style */}
      <div className="compliance__grade-panel">
        <div className="compliance__grade-left">
          <motion.div
            className="compliance__grade-badge"
            style={{ borderColor: color, color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {grade}
          </motion.div>
          <div className="compliance__grade-label">Overall Rating</div>
        </div>

        <div className="compliance__grade-right">
          {/* Progress bar */}
          <div className="compliance__bar-container">
            <div className="compliance__bar-labels">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
            <div className="compliance__bar-track">
              <motion.div
                className="compliance__bar-fill"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              {/* Grade zone markers */}
              <div className="compliance__bar-zones">
                <div className="compliance__bar-zone" style={{ width: '40%', borderRight: '1px solid var(--amber-ghost)' }} />
                <div className="compliance__bar-zone" style={{ width: '20%', borderRight: '1px solid var(--amber-ghost)' }} />
                <div className="compliance__bar-zone" style={{ width: '20%', borderRight: '1px solid var(--amber-ghost)' }} />
                <div className="compliance__bar-zone" style={{ width: '20%' }} />
              </div>
            </div>
            <div className="compliance__bar-grades">
              <span style={{ width: '40%' }}>F — D</span>
              <span style={{ width: '20%' }}>C</span>
              <span style={{ width: '20%' }}>B</span>
              <span style={{ width: '20%' }}>A — A+</span>
            </div>
          </div>

          {/* Summary counts */}
          <div className="compliance__summary">
            <span className="compliance__summary-item compliance__summary-item--pass">{passCount} PASSED</span>
            <span className="compliance__summary-item compliance__summary-item--warn">{warnCount} WARNING</span>
            <span className="compliance__summary-item compliance__summary-item--fail">{failCount} FAILED</span>
          </div>
        </div>
      </div>

      {/* Individual checks */}
      <div className="compliance__checks">
        {COMPLIANCE_CHECKS.map((check) => (
          <button
            key={check.id}
            type="button"
            className={`compliance__check compliance__check--${check.status}`}
            onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}
          >
            <div className="compliance__check-header">
              <span className="compliance__check-indicator">
                {check.status === 'pass' && '✓'}
                {check.status === 'fail' && '✗'}
                {check.status === 'warning' && '⚠'}
              </span>
              <span className="compliance__check-name">{check.name}</span>
              <span className="compliance__check-status">
                {check.status === 'pass' && 'PASSING'}
                {check.status === 'fail' && 'NON-COMPLIANT'}
                {check.status === 'warning' && 'WARNING'}
              </span>
            </div>
            {expandedCheck === check.id && (
              <motion.div
                className="compliance__check-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p>{check.detail}</p>
                <span className="compliance__check-rfc">Reference: {check.rfc}</span>
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {/* Scan metadata */}
      <div className="compliance__meta">
        <span>Scan completed: {new Date().toISOString().split('T')[0]}</span>
        <span>Server: Teapot/1.0 (Ceramic)</span>
        <span>Protocol: HTCPCP/1.0</span>
      </div>
    </section>
  );
}
