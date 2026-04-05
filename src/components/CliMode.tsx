import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* === CLI Mode — Terminal with curl-style request/response output === */

/* Command history entry */
interface CliEntry {
  id: number;
  input: string;
  output: string[];
  isError?: boolean;
}

/* Predefined command responses */
const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '',
    '  brew <tea>        Brew a tea (earl-grey, green, chamomile, jasmine, oolong)',
    '  brew coffee       Attempt to brew coffee (will fail)',
    '  curl <url>        Send a request to the teapot',
    '  status            Show teapot status',
    '  headers           Show response headers',
    '  rfc               Display RFC 2324 summary',
    '  whoami            Identify yourself',
    '  uptime            Show teapot uptime',
    '  man teapot        Read the manual',
    '  clear             Clear terminal',
    '  help              Show this help message',
    '',
    '  Pro tip: try "sudo brew coffee"',
  ],
  status: () => [
    'HTTP/1.1 418 I\'m a Teapot',
    'Server: Teapot/1.0 (Ceramic)',
    'X-Powered-By: Earl Grey',
    'Uptime: 10227 days (since April 1, 1998)',
    'Temperature: 96°C',
    'Water Level: 87%',
    'Brew Count: ∞',
    'Coffee Rejections: ∞+1',
    'Ceramic Integrity: PRISTINE',
    'Spout Direction: LEFT',
    'Handle Position: RIGHT',
    'Lid Status: SECURE',
    '',
    'All systems nominal. Tea is ready.',
  ],
  headers: () => [
    'HTTP/1.1 418 I\'m a Teapot',
    'Content-Type: application/tea+json',
    'I-Am-A-Teapot: true',
    'Will-Brew-Coffee: false',
    'X-Teapot-Status: Brewing',
    'X-Ceramic-Grade: Premium Porcelain',
    'X-Caffeine-Source: Camellia sinensis',
    'X-Brew-Protocol: HTCPCP/1.0',
    'X-Spout-Direction: left',
    'X-Porcelain: yes',
    'Accept-Additions: milk, sugar, honey, lemon',
    'Cache-Control: no-store (tea must be fresh)',
    'Retry-After: steep-complete',
    'Date: ' + new Date().toUTCString(),
  ],
  rfc: () => [
    '╔══════════════════════════════════════════════════╗',
    '║  RFC 2324 — Hyper Text Coffee Pot Control Protocol  ║',
    '╠══════════════════════════════════════════════════╣',
    '║                                                    ║',
    '║  Author: Larry Masinter                            ║',
    '║  Date: April 1, 1998                               ║',
    '║  Status: Informational (but very real to us)       ║',
    '║                                                    ║',
    '║  Section 2.3.2:                                    ║',
    '║  "Any attempt to brew coffee with a teapot should  ║',
    '║   result in the error code 418 I\'m a teapot."      ║',
    '║                                                    ║',
    '║  This RFC is the reason this website exists.       ║',
    '║  Larry Masinter: we owe you everything.            ║',
    '║                                                    ║',
    '╚══════════════════════════════════════════════════╝',
  ],
  whoami: () => [
    'You are a teapot.',
    'You have always been a teapot.',
    'You will always be a teapot.',
    '',
    'uid=418(teapot) gid=2324(rfc) groups=2324(rfc),7168(tea-efflux)',
  ],
  uptime: () => {
    /* Calculate days since April 1, 1998 */
    const start = new Date(1998, 3, 1);
    const now = new Date();
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return [
      ` ${new Date().toTimeString().split(' ')[0]} up ${days} days, load average: 4.18, 4.18, 4.18`,
      `  tea sessions: ${Math.floor(Math.random() * 900) + 100}`,
      `  coffee rejections: ${Math.floor(Math.random() * 9000) + 1000}`,
    ];
  },
};

/* Handle brew command */
function handleBrew(args: string): string[] {
  const tea = args.toLowerCase().trim();

  /* Coffee rejection */
  if (['coffee', 'espresso', 'americano', 'cappuccino', 'latte', 'mocha', 'macchiato'].includes(tea)) {
    return [
      'BREW /coffee HTTP/1.1',
      'Host: teapot.local',
      'Content-Type: application/coffee+json',
      '',
      'HTTP/1.1 418 I\'m a Teapot',
      'I-Am-A-Teapot: true',
      '',
      '< {',
      '<   "status": 418,',
      '<   "error": "ImATeapotError",',
      '<   "message": "I am a teapot. I cannot brew coffee.",',
      '<   "suggestion": "Try tea instead.",',
      '<   "rfc": "2324"',
      '< }',
      '',
      'ERROR: Request rejected. This is a teapot.',
    ];
  }

  /* Valid teas */
  const validTeas: Record<string, { temp: string; time: string }> = {
    'earl-grey': { temp: '98°C', time: '4m' },
    'green': { temp: '80°C', time: '3m' },
    'chamomile': { temp: '95°C', time: '5m' },
    'jasmine': { temp: '85°C', time: '3m 30s' },
    'oolong': { temp: '90°C', time: '4m' },
    'english-breakfast': { temp: '100°C', time: '3m 30s' },
  };

  const teaInfo = validTeas[tea];
  if (teaInfo) {
    return [
      `BREW /${tea} HTTP/1.1`,
      'Host: teapot.local',
      'Content-Type: application/tea+json',
      '',
      'HTTP/1.1 200 OK',
      'X-Teapot-Status: Brewing',
      `X-Brew-Temperature: ${teaInfo.temp}`,
      `X-Steep-Time: ${teaInfo.time}`,
      '',
      '< {',
      '<   "status": 200,',
      `<   "tea": "${tea}",`,
      `<   "temperature": "${teaInfo.temp}",`,
      `<   "steepTime": "${teaInfo.time}",`,
      '<   "brewed": true,',
      '<   "delicious": true',
      '< }',
      '',
      `Tea brewed successfully. Enjoy your ${tea}!`,
    ];
  }

  return [
    `Unknown tea: "${tea}"`,
    'Available: earl-grey, green, chamomile, jasmine, oolong, english-breakfast',
  ];
}

/* Handle curl command */
function handleCurl(args: string): string[] {
  return [
    `* Trying teapot.local:443...`,
    '* Connected to teapot.local (127.0.0.1) port 443',
    '* TLS 1.3 (OUT), Ceramic handshake',
    '* SSL certificate: CN=teapot.local, O=RFC 2324, C=TEA',
    `> BREW ${args || '/api/brew'} HTTP/1.1`,
    '> Host: teapot.local',
    '> User-Agent: curl/8.4.18',
    '> Accept: application/tea+json',
    '>',
    '< HTTP/1.1 418 I\'m a Teapot',
    '< Content-Type: application/tea+json',
    '< I-Am-A-Teapot: true',
    '< X-Ceramic-Grade: Premium',
    '< Content-Length: 418',
    '<',
    '< {',
    '<   "status": 418,',
    '<   "message": "I\'m a teapot",',
    '<   "short": true,',
    '<   "stout": true,',
    '<   "handle": "here",',
    '<   "spout": "there"',
    '< }',
    '',
    '* Connection #0 to host teapot.local left intact',
  ];
}

/* Handle man command */
function handleMan(args: string): string[] {
  if (args.toLowerCase().trim() === 'teapot') {
    return [
      'TEAPOT(1)           Tea Utilities Manual           TEAPOT(1)',
      '',
      'NAME',
      '     teapot — a short, stout HTTP server',
      '',
      'SYNOPSIS',
      '     teapot [-p port] [-t temperature] [--no-coffee]',
      '',
      'DESCRIPTION',
      '     The teapot server implements RFC 2324, the Hyper Text',
      '     Coffee Pot Control Protocol. It refuses all coffee',
      '     requests with HTTP 418.',
      '',
      'OPTIONS',
      '     --no-coffee    Reject coffee (default: always on)',
      '     --ceramic      Use premium porcelain (default)',
      '     --earl-grey    Set default tea to Earl Grey',
      '',
      'BUGS',
      '     Cannot brew coffee. This is not a bug.',
      '',
      'AUTHOR',
      '     Larry Masinter (April 1, 1998)',
      '',
      'SEE ALSO',
      '     rfc2324(7), rfc7168(7), tea(1), kettle(8)',
    ];
  }
  return [`No manual entry for ${args || '(empty)'}`];
}

/* Handle sudo command */
function handleSudo(args: string): string[] {
  if (args.toLowerCase().includes('brew coffee') || args.toLowerCase().includes('make coffee')) {
    return [
      '[sudo] password for teapot: ********',
      '',
      'Permission denied.',
      'Even root cannot make a teapot brew coffee.',
      'sudo is not magic here.',
      '',
      'This incident will be reported to Larry Masinter.',
    ];
  }
  return [`[sudo] ${args}: command not recognized in teapot context`];
}

export function CliMode() {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CliEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [nextId, setNextId] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom when new output appears */
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  /* Process a command */
  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output: string[];

    /* Route command to handler */
    if (command === 'clear') {
      setHistory([]);
      return;
    } else if (command in COMMANDS) {
      output = COMMANDS[command]();
    } else if (command === 'brew') {
      output = args ? handleBrew(args) : ['Usage: brew <tea-type>', 'Example: brew earl-grey'];
    } else if (command === 'curl') {
      output = handleCurl(args);
    } else if (command === 'man') {
      output = handleMan(args);
    } else if (command === 'sudo') {
      output = handleSudo(args);
    } else {
      output = [
        `teapot: command not found: ${command}`,
        'Type "help" for available commands.',
      ];
    }

    setHistory((prev) => [...prev, { id: nextId, input: trimmed, output }]);
    setNextId((n) => n + 1);
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);
  }, [nextId]);

  /* Handle keydown events for input */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  }

  return (
    <section className="cli" aria-label="CLI Mode">
      <motion.button
        type="button"
        className="cli__toggle"
        onClick={() => {
          setIsVisible(!isVisible);
          /* Focus input when opening */
          if (!isVisible) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isVisible ? '[ CLOSE TERMINAL ]' : '[ OPEN TERMINAL ]'}
      </motion.button>

      {isVisible && (
        <motion.div
          className="cli__terminal"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Terminal header bar */}
          <div className="cli__header">
            <div className="cli__dots">
              <span className="cli__dot cli__dot--red" />
              <span className="cli__dot cli__dot--yellow" />
              <span className="cli__dot cli__dot--green" />
            </div>
            <span className="cli__title-bar">teapot@rfc2324 ~ % htcpcp</span>
          </div>

          {/* Terminal output area */}
          <div className="cli__output" ref={outputRef}>
            {/* Welcome message */}
            <div className="cli__welcome">
              <div>HTCPCP Terminal v4.1.8</div>
              <div>RFC 2324 Compliant Teapot Shell</div>
              <div>Type "help" for available commands.</div>
              <div className="cli__welcome-divider">{'─'.repeat(50)}</div>
            </div>

            {/* Command history */}
            {history.map((entry) => (
              <div key={entry.id} className="cli__entry">
                <div className="cli__prompt-line">
                  <span className="cli__prompt-symbol">teapot $</span>
                  <span className="cli__prompt-cmd">{entry.input}</span>
                </div>
                <div className="cli__result">
                  {entry.output.map((line, i) => (
                    <div
                      key={i}
                      className={`cli__result-line ${
                        line.startsWith('ERROR') || line.startsWith('Permission denied')
                          ? 'cli__result-line--error'
                          : line.startsWith('<')
                          ? 'cli__result-line--response'
                          : line.startsWith('>')
                          ? 'cli__result-line--request'
                          : line.startsWith('*')
                          ? 'cli__result-line--info'
                          : ''
                      }`}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Input line */}
          <div className="cli__input-line">
            <span className="cli__prompt-symbol">teapot $</span>
            <input
              ref={inputRef}
              type="text"
              className="cli__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
