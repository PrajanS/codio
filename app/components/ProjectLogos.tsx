import type { SVGProps } from 'react';

/**
 * Custom inline logos for the four shipped projects on the work page.
 * Monochrome line drawings on a 120×120 grid — ink stroke +
 * signal-green accent — so they read as siblings of BrandMark and
 * sit comfortably on the warm-paper slot background.
 */

type LogoProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (p: LogoProps) => ({
  width: p.size ?? 140,
  height: p.size ?? 140,
  viewBox: '0 0 120 120',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
  ...p,
});

const SIGNAL = 'var(--color-signal-deep)';
const PAPER = 'var(--color-paper)';

/** Hitagyana College Finder — open notebook with a magnifying glass
 *  hovering over its lines, signal-green dot inside the lens marking
 *  the "found" college. */
export function LogoCollegeFinder(p: LogoProps) {
  return (
    <svg {...baseProps(p)}>
      {/* spine */}
      <path d="M60 28v66" />
      {/* notebook frame */}
      <path d="M22 32c10-4 28-5 38 0 10-5 28-4 38 0v60c-10-4-28-5-38 0-10-5-28-4-38 0V32Z" />
      {/* ruled lines */}
      <path d="M30 50h22M30 60h22M30 70h18" opacity=".55" />
      <path d="M68 50h22M68 60h22M68 70h18" opacity=".55" />
      {/* lens body — paper fill so the rules underneath disappear */}
      <circle cx="78" cy="70" r="18" fill={PAPER} />
      {/* lens stroke */}
      <circle cx="78" cy="70" r="18" />
      {/* handle */}
      <path d="M92 84l10 10" strokeWidth="2.4" />
      {/* signal-green target dot */}
      <circle cx="78" cy="70" r="4.2" fill={SIGNAL} stroke="none" />
    </svg>
  );
}

/** Hitagyana Book Exchange — two book spines facing each other with
 *  a pair of arrows looping between them. One arrow signal-green to
 *  signal "trade" rather than "send". */
export function LogoBookExchange(p: LogoProps) {
  return (
    <svg {...baseProps(p)}>
      {/* left book */}
      <rect x="14" y="26" width="26" height="68" rx="1.5" />
      <path d="M22 26v68M30 26v68" opacity=".5" />
      {/* right book */}
      <rect x="80" y="26" width="26" height="68" rx="1.5" />
      <path d="M88 26v68M96 26v68" opacity=".5" />
      {/* top arrow — left → right (ink) */}
      <path d="M44 42c8-8 24-8 32 0" />
      <path d="M70 36l8 6-8 6" />
      {/* bottom arrow — right → left (signal) */}
      <path d="M76 80c-8 8-24 8-32 0" stroke={SIGNAL} />
      <path d="M50 86l-8-6 8-6" stroke={SIGNAL} />
    </svg>
  );
}

/** FitCore — concentric target rings with a heartbeat trace passing
 *  through; centre dot signal-green. Reads as both "gym dashboard"
 *  and "core metric". */
export function LogoFitCore(p: LogoProps) {
  return (
    <svg {...baseProps(p)}>
      {/* outer rings */}
      <circle cx="60" cy="60" r="44" />
      <circle cx="60" cy="60" r="30" opacity=".55" />
      <circle cx="60" cy="60" r="16" />
      {/* heartbeat trace */}
      <path
        d="M14 60h28l5-10 7 22 6-18 5 10 6-6h35"
        strokeWidth="2"
        fill="none"
      />
      {/* core dot */}
      <circle cx="60" cy="60" r="5" fill={SIGNAL} stroke="none" />
    </svg>
  );
}

/** FanikClean — bucket silhouette with a signal-green checkmark inside
 *  and two sparkles, signalling "cleaning service, work complete". */
export function LogoFanikClean(p: LogoProps) {
  return (
    <svg {...baseProps(p)}>
      {/* handle arc */}
      <path d="M36 44a24 8 0 0 1 48 0" />
      {/* bucket body */}
      <path d="M32 44h56l-6 50H38L32 44Z" />
      {/* rim shading */}
      <path d="M32 50h56" opacity=".5" />
      {/* check */}
      <path
        d="M46 72l9 9 19-22"
        stroke={SIGNAL}
        strokeWidth="3"
        fill="none"
      />
      {/* sparkles */}
      <path d="M98 24v8M94 28h8" strokeWidth="1.6" />
      <path d="M20 32v6M17 35h6" strokeWidth="1.4" opacity=".75" />
    </svg>
  );
}
