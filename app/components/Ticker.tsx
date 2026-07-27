const ITEMS = [
  'Open · 2 project slots for 2026',
  'Remote-first · works with teams worldwide',
  'First call to first code · under 14 days',
];

// Static status strip. No scrolling animation — the row stays put and the
// less-critical middle item drops on small screens.
export default function Ticker() {
  return (
    <div className="ticker">
      <div className="frame flex items-center justify-between gap-6 py-[0.6rem] mono text-[0.72rem] tracking-[0.14em] uppercase ink-mute">
        <span>{ITEMS[0]}</span>
        <span className="max-md:hidden">{ITEMS[1]}</span>
        <span className="max-sm:hidden">{ITEMS[2]}</span>
      </div>
    </div>
  );
}
