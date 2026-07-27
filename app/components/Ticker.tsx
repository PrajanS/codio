'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  'Open · 3 project slots · 2026',
  'Web · Mobile · Cloud · Design',
  'Remote-first · works with teams worldwide',
  'First call to first code · under 14 days',
  '2026 — year we started',
];

export default function Ticker() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(d);
      setTime(`IST ${ist}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const dot = <span className="ticker-dot" aria-hidden="true" />;
  const full = [...ITEMS, time || 'IST —— ——'];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {Array.from({ length: 2 }).map((_, copy) => (
          <span key={copy} className="inline-flex items-center gap-[2.4rem]">
            {full.map((it, i) => (
              <span key={`${copy}-${i}`} className="inline-flex items-center gap-[2.4rem]">
                <span>{it}</span>
                {dot}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
