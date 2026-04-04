export const GLITCH_CHARS = '!@#$%^&*[]|/?';

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

export interface TeaItem {
  name: string;
  status: 'AVAILABLE' | '418 FORBIDDEN';
  temp: string;
}

export const TEA_MENU: TeaItem[] = [
  { name: 'Earl Grey', status: 'AVAILABLE', temp: '98\u00B0C' },
  { name: 'English Breakfast', status: 'AVAILABLE', temp: '100\u00B0C' },
  { name: 'Green Tea', status: 'AVAILABLE', temp: '80\u00B0C' },
  { name: 'Chamomile', status: 'AVAILABLE', temp: '95\u00B0C' },
  { name: 'Espresso', status: '418 FORBIDDEN', temp: 'N/A' },
  { name: 'Americano', status: '418 FORBIDDEN', temp: 'N/A' },
  { name: 'Cappuccino', status: '418 FORBIDDEN', temp: 'N/A' },
  { name: 'Latte', status: '418 FORBIDDEN', temp: 'N/A' },
];

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
