import type { CSSProperties } from 'react';

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Show the "systems" sub-mark in mono after the wordmark. */
  systems?: boolean;
  /** Inverted colors (e.g. on dark ink slabs). */
  inverted?: boolean;
};

/**
 * Codio wordmark — lowercase Fraunces italic + signal-green period.
 * Reuses the design system's italic + dot language. Pairs with BrandMark
 * at any size.
 */
export default function Wordmark({ size = 1.65, className = '', style, systems, inverted }: Props) {
  const inkColor = inverted ? 'var(--color-paper)' : 'var(--color-ink)';
  return (
    <span
      translate="no"
      className={`inline-flex items-baseline gap-1 font-display leading-none ${className}`}
      style={{
        fontSize: `${size}rem`,
        fontStyle: 'italic',
        letterSpacing: '-0.02em',
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
        color: inkColor,
        ...style,
      }}
    >
      <span>codio</span>
      <span
        aria-hidden="true"
        style={{
          color: 'var(--color-signal-deep)',
          fontStyle: 'normal',
          fontSize: `${size * 0.95}rem`,
        }}
      >
        .
      </span>
      {systems && (
        <span
          className="mono"
          style={{
            marginLeft: '0.55rem',
            fontStyle: 'normal',
            color: inverted ? 'var(--color-paper-mute)' : 'var(--color-ink-mute)',
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          systems
        </span>
      )}
    </span>
  );
}
