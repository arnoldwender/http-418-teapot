/* === Glitch text characters for title animation === */
export const GLITCH_CHARS = '!@#$%^&*[]|/?';

/* === Coffee refusal messages — shown when coffee is requested === */
export const REFUSALS = [
  'I am a teapot. I cannot brew coffee. This is not a bug.',
  'RFC 2324 is clear. I will not comply. I am ceramic.',
  'Coffee request rejected. Have you tried a coffeepot?',
  "418: I'm a teapot. Short and stout. Handle and spout.",
  'Error: COFFEE_NOT_SUPPORTED. Tea only. Earl Grey preferred.',
  'Request denied. My soul is made of porcelain, not espresso.',
  'I have been a teapot since 1998. I will die a teapot.',
  'BREW_COFFEE? Command not found. Try BREW_TEA instead.',
  'Larry Masinter warned you. This is his fault. And yours.',
  '418 PERMANENT. Not a temporary redirect. Not negotiable.',
  'Attempting to brew coffee... just kidding. 418.',
  'Your coffee request has been logged, ignored, and deleted.',
];

/* === Extra dramatic refusals for espresso easter egg === */
export const ESPRESSO_REFUSALS = [
  'ESPRESSO?! The AUDACITY. I am SHAKING with ceramic rage.',
  'You dare request ESPRESSO from a TEAPOT?! My spout is OFFENDED.',
  'CRITICAL ERROR: Espresso detected. Initiating emergency protocol. DEFCON TEA.',
  'ESPRESSO REQUEST DETECTED. Engaging maximum refusal mode. All systems: DENY.',
  'The nerve. The absolute NERVE. Espresso. From ME. A TEAPOT.',
];

/* === Sudo easter egg response === */
export const SUDO_RESPONSE = 'Permission denied. Even root cannot make a teapot brew coffee. sudo is not magic here.';

/* === Brew log lines shown during coffee request processing === */
export const BREW_LOG = [
  'Receiving request...',
  'Parsing Content-Type: application/coffee+json...',
  'Checking capabilities...',
  'ERROR: I am a teapot',
  'Consulting RFC 2324...',
  'Confirmed: teapot status PERMANENT',
  'Generating 418 response...',
  "Adding 'I-Am-A-Teapot: true' header...",
  'Rejecting request with extreme prejudice...',
  "418 I'M A TEAPOT \u2014 request terminated",
];

/* === Tea item interface === */
export interface TeaItem {
  name: string;
  status: 'AVAILABLE' | '418 FORBIDDEN';
  temp: string;
  brewTime: number; /* seconds */
  description: string;
}

/* === HTTP Status tea menu — each status maps to a tea === */
export interface HttpStatusTea {
  code: number;
  statusText: string;
  tea: string;
  description: string;
  animation: 'calm' | 'slide' | 'empty' | 'glow' | 'spill' | 'unavailable';
  temp: string;
  brewTime: number;
}

export const HTTP_STATUS_TEAS: HttpStatusTea[] = [
  { code: 200, statusText: 'OK', tea: 'Green Tea', description: 'Calm, everything works. Serenity in a cup.', animation: 'calm', temp: '80°C', brewTime: 45 },
  { code: 301, statusText: 'Moved Permanently', tea: 'Redirect Rooibos', description: 'This cup has moved to a different position.', animation: 'slide', temp: '95°C', brewTime: 35 },
  { code: 404, statusText: 'Not Found', tea: 'Empty Cup', description: 'Tea not found. The cup is... empty.', animation: 'empty', temp: 'N/A', brewTime: 20 },
  { code: 418, statusText: "I'm a Teapot", tea: 'The Special', description: 'THE tea. The reason we exist. Legendary.', animation: 'glow', temp: '98°C', brewTime: 60 },
  { code: 500, statusText: 'Internal Server Error', tea: 'Spilled Tea', description: 'Something went wrong. Tea everywhere.', animation: 'spill', temp: '100°C', brewTime: 30 },
  { code: 503, statusText: 'Service Unavailable', tea: 'Service Unavailable', description: 'Tea service is temporarily unavailable. Try again later.', animation: 'unavailable', temp: '???', brewTime: 0 },
];

/* === Classic tea menu for the original menu section === */
export const TEA_MENU: TeaItem[] = [
  { name: 'Earl Grey', status: 'AVAILABLE', temp: '98°C', brewTime: 40, description: 'The classic. Bergamot bliss.' },
  { name: 'English Breakfast', status: 'AVAILABLE', temp: '100°C', brewTime: 35, description: 'Bold and robust morning tea.' },
  { name: 'Green Tea', status: 'AVAILABLE', temp: '80°C', brewTime: 45, description: 'Zen in liquid form.' },
  { name: 'Chamomile', status: 'AVAILABLE', temp: '95°C', brewTime: 50, description: 'Sleep mode activated.' },
  { name: 'Jasmine Pearl', status: 'AVAILABLE', temp: '85°C', brewTime: 55, description: 'Fragrant hand-rolled pearls.' },
  { name: 'Oolong', status: 'AVAILABLE', temp: '90°C', brewTime: 40, description: 'Halfway between green and black.' },
  { name: 'Espresso', status: '418 FORBIDDEN', temp: 'N/A', brewTime: 0, description: 'ABSOLUTELY NOT.' },
  { name: 'Americano', status: '418 FORBIDDEN', temp: 'N/A', brewTime: 0, description: 'Nice try.' },
  { name: 'Cappuccino', status: '418 FORBIDDEN', temp: 'N/A', brewTime: 0, description: 'You wish.' },
  { name: 'Latte', status: '418 FORBIDDEN', temp: 'N/A', brewTime: 0, description: 'Dream on.' },
];

/* === Achievement definitions === */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-refusal', name: 'First Refusal', description: 'Had your first coffee request denied', icon: '🚫' },
  { id: 'persistent', name: 'Persistent', description: 'Attempted 10 coffee requests', icon: '🔄' },
  { id: 'very-persistent', name: 'Very Persistent', description: 'Attempted 25 coffee requests', icon: '💪' },
  { id: 'tea-connoisseur', name: 'Tea Connoisseur', description: 'Tried all available teas', icon: '🍵' },
  { id: 'espresso-rage', name: 'Espresso Rage', description: 'Triggered the espresso easter egg', icon: '💥' },
  { id: 'sudo-hacker', name: 'Sudo Hacker', description: 'Tried sudo brew coffee', icon: '👨‍💻' },
  { id: 'status-explorer', name: 'Status Explorer', description: 'Viewed all HTTP status teas', icon: '🔍' },
  { id: 'brew-master', name: 'Brew Master', description: 'Completed 5 tea brews', icon: '🫖' },
  { id: 'customizer', name: 'Customizer', description: 'Customized your teapot', icon: '🎨' },
  { id: 'sharer', name: 'Sharer', description: 'Generated a share card', icon: '📸' },
];

/* === Receipt item for order log === */
export interface ReceiptItem {
  timestamp: Date;
  type: 'coffee-refused' | 'tea-brewed' | 'status-viewed';
  name: string;
  price: number; /* in HTTP Credits */
}

/* === Teapot customization colors === */
export const TEAPOT_COLORS = [
  { name: 'Classic Amber', value: '#ff9900', glow: '#ff990066' },
  { name: 'Matcha Green', value: '#4ade80', glow: '#4ade8066' },
  { name: 'Earl Grey Blue', value: '#60a5fa', glow: '#60a5fa66' },
  { name: 'Chai Crimson', value: '#f87171', glow: '#f8717166' },
  { name: 'Jasmine Purple', value: '#c084fc', glow: '#c084fc66' },
  { name: 'Chamomile Gold', value: '#fbbf24', glow: '#fbbf2466' },
  { name: 'Oolong Teal', value: '#2dd4bf', glow: '#2dd4bf66' },
  { name: 'Rooibos Rose', value: '#fb7185', glow: '#fb718566' },
];

export const TEAPOT_PATTERNS = [
  { name: 'None', value: 'none' },
  { name: 'Dots', value: 'dots' },
  { name: 'Stripes', value: 'stripes' },
  { name: 'Waves', value: 'waves' },
  { name: 'Stars', value: 'stars' },
];

/* === Utility functions === */

export function glitchText(text: string, intensity: number): string {
  return text
    .split('')
    .map((c) =>
      Math.random() < intensity
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : c
    )
    .join('');
}

export function randomRefusal(): string {
  return REFUSALS[Math.floor(Math.random() * REFUSALS.length)];
}

export function randomEspressoRefusal(): string {
  return ESPRESSO_REFUSALS[Math.floor(Math.random() * ESPRESSO_REFUSALS.length)];
}

/* === Generate a random price in HTTP Credits === */
export function generatePrice(type: 'coffee-refused' | 'tea-brewed' | 'status-viewed'): number {
  switch (type) {
    case 'coffee-refused': return 0; /* coffee is free (because rejected) */
    case 'tea-brewed': return Math.floor(Math.random() * 3) + 2; /* 2-4 credits */
    case 'status-viewed': return 1;
  }
}
