import Link from 'next/link';
import Marquee from './Marquee';

const SERVICES = [
  { href: '/services#web', label: 'Web' },
  { href: '/services#mobile', label: 'Mobile' },
  { href: '/services#cloud', label: 'Cloud' },
  { href: '/services#design', label: 'Product Design' },
];

const STUDIO = [
  { href: '/about', label: 'Studio' },
  { href: '/portfolio', label: 'Selected work' },
  { href: '/contact', label: 'Contact' },
];

const NETWORK = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { href: 'https://read.cv', label: 'Read.cv' },
];

export default function Footer() {
  return (
    <footer className="mt-32 bg-ink text-[var(--color-paper)]">
      {/* Big mark marquee */}
      <div className="border-y border-[color:var(--color-paper)]/15 py-8">
        <Marquee speed={88} className="text-[var(--color-paper)]">
          <span className="font-display italic text-[clamp(4rem,12vw,12rem)] leading-none tracking-[-0.04em] mr-12" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
            let&apos;s build something
          </span>
          <span className="font-display text-[clamp(4rem,12vw,12rem)] leading-none tracking-[-0.04em] mr-12" style={{ color: 'var(--color-signal)', fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
            worth keeping —
          </span>
          <span className="font-display italic text-[clamp(4rem,12vw,12rem)] leading-none tracking-[-0.04em] mr-12" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
            let&apos;s build something
          </span>
          <span className="font-display text-[clamp(4rem,12vw,12rem)] leading-none tracking-[-0.04em] mr-12" style={{ color: 'var(--color-signal)', fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
            worth keeping —
          </span>
        </Marquee>
      </div>

      <div className="frame pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: contact pitch */}
          <div className="md:col-span-5">
            <div className="mono ink-faint mb-4" style={{ color: 'var(--color-paper-faint)' }}>
              [ 01 — get in touch ]
            </div>
            <h2 className="font-display text-[clamp(2.2rem,1.4rem+2vw,3.6rem)] leading-[0.95] tracking-tight mb-8" style={{ color: 'var(--color-paper)' }}>
              Tell us what you&apos;re building.<br />
              <em className="italic" style={{ color: 'var(--color-signal)' }}>We reply within one working day.</em>
            </h2>
            <div className="space-y-2">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ash@codio.co.in&su=Project%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-display text-2xl u-link"
                style={{ color: 'var(--color-paper)' }}
              >
                ash@codio.co.in
              </a>
              <Link href="/contact" className="block mono u-link" style={{ color: 'var(--color-paper-mute)' }}>
                Book a 30-minute call ↗
              </Link>
            </div>
          </div>

          {/* Right: index columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 max-sm:grid-cols-1">
            <FCol title="Services" items={SERVICES} />
            <FCol title="Studio" items={STUDIO} />
            <FCol title="Find us" items={NETWORK} external />
          </div>
        </div>

        <div className="mt-24 pt-6 border-t border-[color:var(--color-paper)]/15 flex flex-wrap items-center justify-between gap-3 mono" style={{ color: 'var(--color-paper-faint)' }}>
          <span>© {new Date().getFullYear()} codio studio</span>
          <span>Remote-first · India and worldwide</span>
          <span>v.2026.05 — first projects open</span>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, items, external }: { title: string; items: { href: string; label: string }[]; external?: boolean }) {
  return (
    <div>
      <h4 className="mono mb-5" style={{ color: 'var(--color-paper-faint)' }}>{title}</h4>
      <ul className="list-none p-0 space-y-3">
        {items.map((i) => (
          <li key={i.href}>
            {external ? (
              <a
                href={i.href}
                target="_blank"
                rel="noreferrer"
                className="u-link text-base"
                style={{ color: 'var(--color-paper)' }}
              >
                {i.label} ↗
              </a>
            ) : (
              <Link href={i.href} className="u-link text-base" style={{ color: 'var(--color-paper)' }}>
                {i.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
