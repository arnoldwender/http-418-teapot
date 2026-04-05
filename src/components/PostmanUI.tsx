import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* === Postman-Style Request UI — looks like a real HTTP debugging tool === */

/* Available HTTP methods (with tea-specific additions) */
const METHODS = ['GET', 'POST', 'BREW', 'STEEP'] as const;
type Method = typeof METHODS[number];

/* Method color mapping for the dropdown badge */
const METHOD_COLORS: Record<Method, string> = {
  GET: '#4ade80',
  POST: '#60a5fa',
  BREW: '#ff9900',
  STEEP: '#c084fc',
};

/* Predefined headers for the headers tab */
const MOCK_HEADERS = [
  { key: 'X-Teapot-Status', value: 'Brewing', editable: false },
  { key: 'Content-Type', value: 'application/tea+json', editable: false },
  { key: 'X-Brew-Protocol', value: 'HTCPCP/1.0', editable: false },
  { key: 'Accept', value: 'text/tea, application/teapot+xml', editable: false },
  { key: 'X-Ceramic-Grade', value: 'Premium Porcelain', editable: false },
  { key: 'Cache-Control', value: 'no-store (tea must be fresh)', editable: false },
  { key: 'X-Caffeine-Source', value: 'Camellia sinensis ONLY', editable: false },
  { key: 'Authorization', value: 'Bearer teapot-jwt-418-🫖', editable: false },
];

/* Cookie/biscuit tab entries */
const TEA_BISCUITS = [
  { name: 'Digestive', value: 'McVitie\'s Original; Path=/tea; Secure; SameSite=Strict', domain: 'teapot.local' },
  { name: 'Hobnob', value: 'Oaty Goodness; Path=/dunk; Max-Age=300', domain: 'teapot.local' },
  { name: 'Rich Tea', value: 'Delicate; Path=/careful; SameSite=Lax', domain: 'teapot.local' },
  { name: 'Custard Cream', value: 'Classic; Path=/nostalgic; Secure', domain: 'teapot.local' },
  { name: 'Bourbon', value: 'Chocolate; Path=/indulgent; HttpOnly', domain: 'teapot.local' },
  { name: 'Shortbread', value: 'Scottish Premium; Path=/butter; Secure; SameSite=Strict', domain: 'teapot.local' },
];

/* Tab identifiers */
type Tab = 'headers' | 'body' | 'cookies' | 'response';

interface PostmanUIProps {
  onSendRequest: () => void;
  processing: boolean;
}

export function PostmanUI({ onSendRequest, processing }: PostmanUIProps) {
  const [method, setMethod] = useState<Method>('BREW');
  const [url, setUrl] = useState('https://teapot.local/api/brew');
  const [activeTab, setActiveTab] = useState<Tab>('response');
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [responseTime, setResponseTime] = useState(0);
  const [brewTime] = useState('3m 42s');

  /* Generate random response time between 18-42ms */
  const generateResponseTime = useCallback(() => {
    return Math.floor(Math.random() * 25) + 18;
  }, []);

  /* Handle "Send" button click */
  function handleSend() {
    setHasResponse(false);
    setResponseTime(generateResponseTime());
    onSendRequest();

    /* Simulate response delay */
    setTimeout(() => {
      setHasResponse(true);
      setActiveTab('response');
    }, 800);
  }

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClick() {
      setShowMethodDropdown(false);
    }
    if (showMethodDropdown) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showMethodDropdown]);

  /* JSON response body */
  const responseJson = JSON.stringify({
    status: 418,
    message: "I'm a teapot",
    brewTime: brewTime,
    temperature: "96\u00B0C",
    protocol: "HTCPCP/1.0",
    teapotId: "RFC-2324-OG",
    ceramic: true,
    willBrewCoffee: false,
    headers: {
      "I-Am-A-Teapot": "true",
      "X-Porcelain": "yes",
      "X-Spout-Direction": "left"
    }
  }, null, 2);

  /* Request body for body tab */
  const requestBody = JSON.stringify({
    beverage: "tea",
    type: "Earl Grey",
    additions: ["milk (optional)", "lemon (heresy with Earl Grey)"],
    temperature: "96\u00B0C",
    steepTime: "3-5 minutes",
    cup: {
      material: "bone china",
      size: "standard",
      saucer: true
    }
  }, null, 2);

  return (
    <section className="postman" aria-label="Postman-Style Request UI">
      <h2 className="postman__title">HTCPCP REQUEST BUILDER</h2>
      <p className="postman__subtitle">Hyper Text Coffee Pot Control Protocol — RFC 2324</p>

      {/* URL Bar with method dropdown */}
      <div className="postman__url-bar">
        {/* Method dropdown */}
        <div className="postman__method-wrapper">
          <button
            type="button"
            className="postman__method-btn"
            style={{ color: METHOD_COLORS[method] }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMethodDropdown(!showMethodDropdown);
            }}
          >
            {method} <span className="postman__method-arrow">▼</span>
          </button>
          <AnimatePresence>
            {showMethodDropdown && (
              <motion.div
                className="postman__method-dropdown"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                {METHODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`postman__method-option ${m === method ? 'postman__method-option--active' : ''}`}
                    style={{ color: METHOD_COLORS[m] }}
                    onClick={() => {
                      setMethod(m);
                      setShowMethodDropdown(false);
                    }}
                  >
                    {m}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* URL input */}
        <input
          type="text"
          className="postman__url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          spellCheck={false}
        />

        {/* Send button */}
        <motion.button
          type="button"
          className="postman__send-btn"
          onClick={handleSend}
          disabled={processing}
          whileHover={{ scale: processing ? 1 : 1.02 }}
          whileTap={{ scale: processing ? 1 : 0.97 }}
        >
          {processing ? 'BREWING...' : 'SEND'}
        </motion.button>
      </div>

      {/* Status badge row */}
      <div className="postman__status-row">
        {hasResponse && (
          <motion.div
            className="postman__status-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="postman__badge postman__badge--status">418 I'm a Teapot</span>
            <span className="postman__badge postman__badge--time">{responseTime}ms</span>
            <span className="postman__badge postman__badge--size">418 B</span>
          </motion.div>
        )}
      </div>

      {/* Tab navigation */}
      <div className="postman__tabs">
        <button
          type="button"
          className={`postman__tab ${activeTab === 'headers' ? 'postman__tab--active' : ''}`}
          onClick={() => setActiveTab('headers')}
        >
          Headers <span className="postman__tab-count">({MOCK_HEADERS.length})</span>
        </button>
        <button
          type="button"
          className={`postman__tab ${activeTab === 'body' ? 'postman__tab--active' : ''}`}
          onClick={() => setActiveTab('body')}
        >
          Body
        </button>
        <button
          type="button"
          className={`postman__tab ${activeTab === 'cookies' ? 'postman__tab--active' : ''}`}
          onClick={() => setActiveTab('cookies')}
        >
          Cookies <span className="postman__tab-count">({TEA_BISCUITS.length})</span>
        </button>
        <button
          type="button"
          className={`postman__tab ${activeTab === 'response' ? 'postman__tab--active' : ''}`}
          onClick={() => setActiveTab('response')}
        >
          Response
        </button>
      </div>

      {/* Tab content */}
      <div className="postman__panel">
        {/* Headers tab */}
        {activeTab === 'headers' && (
          <div className="postman__headers">
            <div className="postman__header-row postman__header-row--head">
              <span className="postman__header-check">✓</span>
              <span className="postman__header-key">KEY</span>
              <span className="postman__header-val">VALUE</span>
            </div>
            {MOCK_HEADERS.map((h, i) => (
              <div key={i} className="postman__header-row">
                <span className="postman__header-check">✓</span>
                <span className="postman__header-key">{h.key}</span>
                <span className="postman__header-val">{h.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Body tab */}
        {activeTab === 'body' && (
          <div className="postman__body-content">
            <div className="postman__body-toolbar">
              <span className="postman__body-format postman__body-format--active">JSON</span>
              <span className="postman__body-format">XML</span>
              <span className="postman__body-format">Text</span>
              <span className="postman__body-format">Binary</span>
            </div>
            <pre className="postman__code">{requestBody}</pre>
          </div>
        )}

        {/* Cookies tab — tea biscuit varieties */}
        {activeTab === 'cookies' && (
          <div className="postman__cookies">
            <div className="postman__cookie-row postman__cookie-row--head">
              <span className="postman__cookie-name">BISCUIT</span>
              <span className="postman__cookie-value">SET-COOKIE</span>
              <span className="postman__cookie-domain">DOMAIN</span>
            </div>
            {TEA_BISCUITS.map((b, i) => (
              <div key={i} className="postman__cookie-row">
                <span className="postman__cookie-name">{b.name}</span>
                <span className="postman__cookie-value">{b.value}</span>
                <span className="postman__cookie-domain">{b.domain}</span>
              </div>
            ))}
          </div>
        )}

        {/* Response tab */}
        {activeTab === 'response' && (
          <div className="postman__response">
            {hasResponse ? (
              <pre className="postman__code postman__code--response">{responseJson}</pre>
            ) : (
              <div className="postman__response-empty">
                {processing ? (
                  <span className="postman__response-loading">Brewing response...</span>
                ) : (
                  <span>Hit SEND to brew a request</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
