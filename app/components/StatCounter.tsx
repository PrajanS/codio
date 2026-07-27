'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  target: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
};

export default function StatCounter({ target, suffix = '', duration = 1600, decimals }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setValue(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const d = decimals ?? (target % 1 === 0 ? 0 : 1);
  const display = value.toFixed(d);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
