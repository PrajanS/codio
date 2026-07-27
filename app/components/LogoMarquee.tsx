const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'React Native',
  'Swift',
  'Kotlin',
  'Postgres',
  'Redis',
  'AWS',
  'Terraform',
  'Tailwind',
  'Figma',
];

// Static, scannable grid of the stack. Replaces the earlier scrolling
// marquee so the names stay readable and hold their place.
export default function LogoMarquee() {
  return (
    <div className="frame">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-5 list-none p-0">
        {STACK.map((c, i) => (
          <li key={c} className="flex items-baseline justify-between gap-3 hairline-b pb-3">
            <span
              className="font-display text-xl md:text-2xl tracking-tight ink"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
            >
              {c}
            </span>
            <span className="mono ink-faint text-[0.7rem]">/{String(i + 1).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
