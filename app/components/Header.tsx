'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import BrandMark from './BrandMark';
import Wordmark from './Wordmark';

const LINKS = [
  { href: '/', label: 'Home', n: '01' },
  { href: '/services', label: 'Services', n: '02' },
  { href: '/portfolio', label: 'Work', n: '03' },
  { href: '/about', label: 'About', n: '04' },
  { href: '/contact', label: 'Contact', n: '05' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background,backdrop-filter,border-color] duration-300 bg-[var(--color-paper)] border-[var(--color-rule)] ${
        scrolled || open
          ? 'md:bg-[color:var(--color-paper)]/90 md:backdrop-blur-md md:border-[var(--color-rule)]'
          : 'md:bg-transparent md:backdrop-blur-none md:border-transparent'
      }`}
    >
      <div className="frame flex items-center justify-between py-4">
        <Link href="/" aria-label="Codio — home" className="group inline-flex items-center gap-2.5">
          <BrandMark size={22} className="ink" />
          <Wordmark size={1.5} studio />
        </Link>

        <nav className="max-md:hidden">
          <ul className="flex items-center gap-7 list-none p-0">
            {LINKS.map((l) => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
              return (
                <li key={l.href} className="flex items-baseline gap-1.5">
                  <span className="mono ink-faint">{l.n}</span>
                  <Link href={l.href} className={`nav-link ${active ? 'is-active' : ''}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 max-md:hidden">
          <span className="live">Open · 2 slots free</span>
          <MagneticButton href="/contact" className="btn btn-primary">
            Apply for a slot
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="hidden max-md:inline-grid place-items-center w-11 h-11 border border-[var(--color-ink)] bg-[var(--color-paper)]"
        >
          <span
            className={`block w-5 h-px bg-[var(--color-ink)] transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : '-translate-y-1'}`}
          />
          <span
            className={`block w-5 h-px bg-[var(--color-ink)] mt-1 transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : 'translate-y-1'}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-0 top-[64px] bg-[var(--color-paper)] z-30 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="frame pt-12 pb-16 h-full flex flex-col">
          <ul className="list-none p-0 space-y-1 flex-1">
            {LINKS.map((l, i) => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
              return (
                <li key={l.href} className="hairline-b">
                  <Link
                    href={l.href}
                    className="flex items-baseline justify-between py-5 group transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transitionDelay: open ? `${120 + i * 65}ms` : '0ms',
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(18px)',
                    }}
                  >
                    <span className="mono ink-mute">{l.n}</span>
                    <span
                      className={`font-display text-4xl leading-none tracking-tight transition-colors group-active:signal ${active ? 'italic signal' : 'ink'}`}
                      style={{ fontVariationSettings: active ? '"opsz" 144, "SOFT" 100' : '"opsz" 144, "SOFT" 40' }}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="pt-8 mt-auto transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transitionDelay: open ? `${120 + LINKS.length * 65}ms` : '0ms',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(14px)',
            }}
          >
            <span className="live mb-4 block">Open · 2 slots free</span>
            <Link href="/contact" className="btn btn-primary w-full justify-center">Apply for a slot</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
