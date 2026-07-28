import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Codio Systems — software, mobile & cloud engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// satori (ImageResponse parser) doesn't support oklch() — using hex approximations
// of the design-system tokens (paper, ink, ink-mute, signal-deep).
const PAPER = '#f6f3ec';
const INK = '#1a1f33';
const MUTE = '#7a7c8c';
const SIGNAL = '#7ac43a';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: 80,
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top index row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: MUTE,
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 18,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          <span>[ codio systems · 2026 ]</span>
          <span>est. 2026</span>
        </div>

        {/* Mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <div
            style={{
              width: 120,
              height: 120,
              border: `5px solid ${INK}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 28,
            }}
          >
            <div style={{ width: 18, height: 48, background: SIGNAL }} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontStyle: 'italic',
              fontSize: 240,
              letterSpacing: -10,
              color: INK,
              lineHeight: 1,
            }}
          >
            codio
            <span style={{ color: SIGNAL, fontStyle: 'normal' }}>.</span>
          </div>
        </div>

        {/* Sub-headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: INK }}>
          <div style={{ fontSize: 56, letterSpacing: -2 }}>Engineering systems for</div>
          <div style={{ fontSize: 56, fontStyle: 'italic', letterSpacing: -2, color: SIGNAL }}>
            software, mobile &amp; cloud.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: MUTE,
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 18,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          <span>codio.co.in</span>
          <span>remote-first · india and worldwide</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
