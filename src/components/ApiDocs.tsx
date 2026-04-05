import { useState } from 'react';
import { motion } from 'framer-motion';

/* === Status Code Tea Pairing API Docs — styled like Stripe/Twilio === */

/* Language options for code examples */
const LANGUAGES = ['curl', 'python', 'javascript', 'british'] as const;
type Language = typeof LANGUAGES[number];

/* Tea pairing definition */
interface TeaPairing {
  code: number;
  status: string;
  tea: string;
  flavor: string;
  color: string;
  description: string;
  examples: Record<Language, string>;
}

/* Complete status code to tea mapping with code examples */
const TEA_PAIRINGS: TeaPairing[] = [
  {
    code: 200,
    status: 'OK',
    tea: 'Green Tea',
    flavor: 'Clean, refreshing, everything works',
    color: '#4ade80',
    description: 'The request succeeded. Like a perfect cup of green tea — calming, expected, and exactly what you needed.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew \\
  -H "Content-Type: application/tea+json" \\
  -d '{"type": "green", "temp": "80°C"}'

# 200 OK
# {"tea": "Green Tea", "status": "brewed", "zen": true}`,
      python: `import requests

response = requests.brew(
    "https://teapot.local/api/brew",
    json={"type": "green", "temp": "80°C"}
)

print(response.status_code)  # 200
print(response.json()["zen"])  # True`,
      javascript: `const response = await fetch("https://teapot.local/api/brew", {
  method: "BREW",
  headers: { "Content-Type": "application/tea+json" },
  body: JSON.stringify({ type: "green", temp: "80°C" })
});

const data = await response.json();
console.log(data.zen); // true`,
      british: `One politely requests a cup of green tea.
The kettle obliges.
All is well in the empire.
The tea is served at precisely 80°C.
One nods approvingly.`,
    },
  },
  {
    code: 301,
    status: 'Moved Permanently',
    tea: 'Reheated Tea',
    flavor: 'Tea that has been moved to another cup (reheated)',
    color: '#60a5fa',
    description: 'This tea has permanently moved to a different cup. All future requests should use the new cup. The flavor is... acceptable, but everyone knows it is not the same.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew/old-cup \\
  -H "Content-Type: application/tea+json"

# 301 Moved Permanently
# Location: /api/brew/new-cup
# {"message": "This tea has moved. Please update your teacup."}`,
      python: `response = requests.brew(
    "https://teapot.local/api/brew/old-cup",
    allow_redirects=False
)

print(response.status_code)  # 301
print(response.headers["Location"])  # /api/brew/new-cup
# Your tea is in another castle`,
      javascript: `const response = await fetch("https://teapot.local/api/brew/old-cup", {
  method: "BREW",
  redirect: "manual"
});

// 301 - Your tea has been relocated
console.log(response.headers.get("Location"));
// "/api/brew/new-cup"`,
      british: `One's tea has been moved to the drawing room.
It has been reheated.
One pretends not to notice.
One's butler has been informed of the new location.
This is fine.`,
    },
  },
  {
    code: 404,
    status: 'Not Found',
    tea: 'Decaf',
    flavor: 'Why does this exist?',
    color: '#f87171',
    description: 'The requested tea could not be found. Like decaf — technically it exists, but does it really? The philosophical emptiness of a cup that could have been.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew/meaning-of-life \\
  -H "Content-Type: application/tea+json"

# 404 Not Found
# {"error": "Tea not found", "suggestion": "Did you mean Earl Grey?"}
# {"existentialCrisis": true, "decafLevel": "maximum"}`,
      python: `response = requests.brew(
    "https://teapot.local/api/brew/meaning-of-life"
)

print(response.status_code)  # 404
# TeaNotFoundError: The tea you seek does not exist.
# Like decaf. Why does decaf exist?`,
      javascript: `try {
  const response = await fetch("https://teapot.local/api/brew/void");
  // 404 - The tea is a lie
  if (!response.ok) {
    console.log("The cup is empty.");
    console.log("Like decaf. Pointless.");
  }
} catch (e) {
  // The tea was never there
}`,
      british: `One requests a tea that does not exist.
The butler is perplexed.
"We have no such tea, sir."
One stares into the empty cup.
It stares back.`,
    },
  },
  {
    code: 418,
    status: "I'm a Teapot",
    tea: 'The Special',
    flavor: 'THE tea. Legendary. The reason we exist.',
    color: '#ff9900',
    description: 'The server is a teapot. It cannot brew coffee. This is not a bug, this is a feature. RFC 2324 is clear. Larry Masinter was right. This is the greatest HTTP status code ever created.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew \\
  -H "Content-Type: application/coffee+json" \\
  -d '{"type": "espresso"}'

# 418 I'm a Teapot
# I-Am-A-Teapot: true
# Will-Brew-Coffee: absolutely-not
# {"status": 418, "message": "I am a teapot.", "since": 1998}`,
      python: `response = requests.brew(
    "https://teapot.local/api/brew",
    json={"type": "coffee"}
)

print(response.status_code)  # 418
# ImATeapotError: I am a teapot.
# I cannot brew coffee. I will not brew coffee.
# I have been a teapot since 1998.
# This is not a phase.`,
      javascript: `const response = await fetch("https://teapot.local/api/brew", {
  method: "BREW",
  body: JSON.stringify({ type: "coffee" })
});

// 418 I'm a Teapot
if (response.status === 418) {
  console.log("The server is a teapot.");
  console.log("It has always been a teapot.");
  console.log("Thank you, Larry Masinter.");
}`,
      british: `One requests coffee from a teapot.
The teapot is AGHAST.
"I am a TEAPOT, sir. A TEAPOT."
"RFC 2324 is quite clear on this matter."
One is escorted from the premises.
The incident is recorded in the logbook.`,
    },
  },
  {
    code: 500,
    status: 'Internal Server Error',
    tea: 'Coffee',
    flavor: "Something went wrong. You've given up on tea.",
    color: '#ef4444',
    description: 'The server encountered an unexpected condition. At this point, you have abandoned tea and resorted to coffee. Something has gone terribly wrong. The teapot weeps.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew \\
  -H "Content-Type: application/tea+json" \\
  -d '{"type": "everything"}'

# 500 Internal Server Error
# {"error": "TeapotOverflowException", "teaSpilled": true}
# {"dignity": "lost", "cleanup": "required"}`,
      python: `try:
    response = requests.brew(
        "https://teapot.local/api/brew",
        json={"type": "everything", "at_once": True}
    )
except TeapotOverflowError:
    print("Tea everywhere.")
    print("The server is on the floor.")
    print("Someone get the coffee. We've given up.")`,
      javascript: `try {
  const response = await fetch("https://teapot.local/api/brew", {
    method: "BREW",
    body: JSON.stringify({ overload: true })
  });
  // This will never work
} catch (error) {
  // Tea is on the floor
  // Teapot is broken
  // Deploy the coffee. We've lost.
  console.error("500: Everything is terrible.");
}`,
      british: `One's teapot has catastrophically failed.
Tea is everywhere.
The carpet is ruined.
One resorts to instant coffee.
One's ancestors weep.
The empire has fallen.`,
    },
  },
  {
    code: 503,
    status: 'Service Unavailable',
    tea: 'Imaginary Tea',
    flavor: 'The tea service is down. Imagine tea instead.',
    color: '#a855f7',
    description: 'The tea service is temporarily unavailable. The teapot is on break. The kettle is napping. Try again in a few minutes. In the meantime, imagine tea.',
    examples: {
      curl: `curl -X BREW https://teapot.local/api/brew \\
  -H "Content-Type: application/tea+json"

# 503 Service Unavailable
# Retry-After: 120
# X-Teapot-Status: napping
# {"message": "Teapot is on break. Try again in 2 minutes."}`,
      python: `response = requests.brew("https://teapot.local/api/brew")

print(response.status_code)  # 503
retry_after = response.headers["Retry-After"]
print(f"Teapot returns in {retry_after} seconds")
# In the meantime, imagine tea
import time
time.sleep(int(retry_after))  # Patience is a virtue`,
      javascript: `const response = await fetch("https://teapot.local/api/brew");

if (response.status === 503) {
  const retryAfter = response.headers.get("Retry-After");
  console.log(\`Teapot napping. Back in \${retryAfter}s.\`);

  // Imagine tea while you wait
  await new Promise(r => setTimeout(r, retryAfter * 1000));
  // Try again with renewed hope
}`,
      british: `One arrives at the tea service.
The sign reads: "CLOSED FOR MAINTENANCE."
One is distraught.
One imagines tea.
It is not the same.
One shall return at half past.`,
    },
  },
];

export function ApiDocs() {
  const [selectedPairing, setSelectedPairing] = useState<number>(418);
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  const pairing = TEA_PAIRINGS.find((p) => p.code === selectedPairing)!;

  return (
    <section className="api-docs" aria-label="Status Code Tea Pairing API Docs">
      <h2 className="api-docs__title">STATUS CODE TEA PAIRING</h2>
      <p className="api-docs__subtitle">API Reference — Every HTTP status deserves a proper tea</p>

      <div className="api-docs__layout">
        {/* Sidebar — status code navigation */}
        <nav className="api-docs__nav" aria-label="Status codes">
          {TEA_PAIRINGS.map((p) => (
            <button
              key={p.code}
              type="button"
              className={`api-docs__nav-item ${selectedPairing === p.code ? 'api-docs__nav-item--active' : ''}`}
              onClick={() => setSelectedPairing(p.code)}
            >
              <span className="api-docs__nav-code" style={{ color: p.color }}>{p.code}</span>
              <span className="api-docs__nav-label">{p.tea}</span>
            </button>
          ))}
        </nav>

        {/* Main content area */}
        <div className="api-docs__content">
          {/* Header with status badge */}
          <div className="api-docs__header">
            <div className="api-docs__code-badge" style={{ borderColor: pairing.color, color: pairing.color }}>
              {pairing.code}
            </div>
            <div className="api-docs__header-info">
              <h3 className="api-docs__status-text">{pairing.status}</h3>
              <div className="api-docs__tea-name" style={{ color: pairing.color }}>
                {pairing.tea}
              </div>
              <div className="api-docs__flavor">{pairing.flavor}</div>
            </div>
          </div>

          {/* Description */}
          <div className="api-docs__description">
            {pairing.description}
          </div>

          {/* Code examples with language tabs */}
          <div className="api-docs__examples">
            <div className="api-docs__lang-tabs">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`api-docs__lang-tab ${selectedLang === lang ? 'api-docs__lang-tab--active' : ''}`}
                  onClick={() => setSelectedLang(lang)}
                >
                  {lang === 'british' ? 'British' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <motion.pre
              key={`${pairing.code}-${selectedLang}`}
              className="api-docs__code-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {pairing.examples[selectedLang]}
            </motion.pre>
          </div>
        </div>
      </div>
    </section>
  );
}
