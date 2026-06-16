import Reveal from './Reveal';
import StatCounter from './StatCounter';

type Item = {
  n: string;
  /** Numeric target (or a literal string for non-counting items like a year). */
  value: number | string;
  /** Optional suffix shown after the number (e.g. " yrs", "+"). */
  suffix?: string;
  label: string;
  /** Optional short clarifier rendered under the label in mono. */
  sub?: string;
};

/**
 * Compact impact / "proof of delivery" band that sits below the homepage
 * hero. Mixes counting numbers with a year so the row reads "real things
 * we have done" rather than the SaaS hero-metric template (which lives on
 * the absolute-bans list for a reason). Each cell uses an exponential
 * ease-out counter so the row "settles" as it scrolls into view.
 */
export default function ImpactStrip() {
  const items: Item[] = [
    {
      n: '01',
      value: 4,
      label: 'Products live',
      sub: 'shipped to real users',
    },
    {
      n: '02',
      value: 2,
      label: 'Client engagements',
      sub: 'Hitagyana — 2 apps',
    },
    {
      n: '03',
      value: 9,
      suffix: '+',
      label: 'Technologies in production',
      sub: 'web, mobile, cloud',
    },
    {
      n: '04',
      value: '2026',
      label: 'Studio founded',
      sub: '4 founders · 3 slots',
    },
  ];

  return (
    <section
      aria-label="What Codio has shipped"
      className="bg-paper-2 border-y border-[var(--color-rule)]"
    >
      <div className="frame py-14 max-md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 90}>
              <div className="flex flex-col gap-2">
                <span className="mono ink-faint">{it.n}</span>
                <span className="stat-num text-[clamp(2.4rem,1.4rem+2.6vw,4.4rem)] tabular-nums leading-none">
                  {typeof it.value === 'number' ? (
                    <StatCounter target={it.value} suffix={it.suffix ?? ''} />
                  ) : (
                    <span>{it.value}</span>
                  )}
                </span>
                <span className="font-display text-lg leading-tight tracking-tight"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                  {it.label}
                </span>
                {it.sub && <span className="mono ink-mute text-[0.72rem]">{it.sub}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
