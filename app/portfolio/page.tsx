import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MagneticButton from '../components/MagneticButton';

export const metadata: Metadata = {
  title: 'Work — Three project slots open',
  description:
    'No past projects to show yet. Codio has three project slots open for 2026 — web, mobile, and cloud.',
};

const COHORT = [
  {
    n: '01',
    state: 'Taken',
    discipline: 'Web · Platform',
    body: 'First slot is taken. The project starts in July. We are building a Next.js platform with login, payments, and an internal admin tool.',
  },
  {
    n: '02',
    state: 'Open',
    discipline: 'Mobile · iOS / Android',
    body: 'Looking for a mobile project — React Native or fully native is fine. We prefer apps that work offline. Six to twelve weeks.',
  },
  {
    n: '03',
    state: 'Open',
    discipline: 'Cloud · Infrastructure',
    body: 'Looking for a cloud project we can own end to end — migration, infrastructure as code, monitoring, or cost work. Longer embed projects are also welcome.',
  },
  {
    n: '04',
    state: 'Shipped',
    discipline: 'Mobile · College search',
    body: 'A college finder app that helps students search and compare colleges, backed by cloud data and a shipped Android release.',
    repo: 'https://github.com/Raghu1700/hitagyana_clg_finder',
  },
  {
    n: '05',
    state: 'Shipped',
    discipline: 'Mobile · Wearables',
    body: 'A wearable health-tracking app with real-time sensor dashboards — heart rate, oxygen, temperature — plus performance analytics and trend charts.',
    repo: 'https://github.com/Raghu1700/sports_tracker_app',
  },
  {
    n: '06',
    state: 'Shipped',
    discipline: 'IoT · Robotics',
    body: 'A control app for a field surveillance robot — live camera feed, directional and crane controls, and real-time temperature and gas monitoring over Firebase.',
    repo: 'https://github.com/Raghu1700/field_surveillance_robot',
  },
  {
    n: '07',
    state: 'Shipped',
    discipline: 'Mobile · Marketplace',
    body: 'A campus marketplace where students buy and sell textbooks — Firebase auth, book listings, a bidding system, favorites, and user profiles.',
    repo: 'https://github.com/Raghu1700/Stusents_book_exchange',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-16 max-md:pt-10 max-md:pb-10">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 03 — work ]</span>
          <span className="mono ink-faint">first projects · 2026</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.93] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[0, 1, 2, 3]}
          signal={[3]}
        >
          No past projects yet. On purpose.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 md:col-span-7 md:col-start-2">
            <Reveal delay={240}>
              <p className="text-lg ink-mute leading-relaxed">
                Codio is a new studio. Instead of filling this page with old projects from companies the founders happened to work at, we want to show you the projects we are about to start — and keep a slot open for the one we start with you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ COHORT GRID ============ */}
      <section className="frame pb-24">
        <div className="hairline-b pb-3 mb-12 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-6 flex-wrap">
            <span className="index">Project slots</span>
            <span className="mono ink-mute">three for 2026</span>
          </div>
          <span className="mono ink-faint">1 taken · 2 open</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {COHORT.map((c, i) => {
            const open = c.state === 'Open';
            const repo = (c as { repo?: string }).repo;
            return (
              <Reveal
                key={c.n}
                className={`col-span-12 md:col-span-6 ${i === 1 ? 'md:translate-y-16' : ''}`}
                delay={i * 80}
              >
                <article className="group">
                  <div className="slot aspect-[4/3] mb-6 grid place-items-center">
                    <span className="slot-tag">{c.discipline}</span>
                    <span
                      className="font-display text-[8rem] leading-none tracking-[-0.04em] ink-faint group-hover:signal transition-colors duration-300"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontStyle: 'italic' }}
                    >
                      {c.n}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <span className="mono ink-faint">{c.n} · 2026</span>
                    <span className={`mono ${open ? 'signal' : 'ink-mute'}`}>{c.state}</span>
                  </div>

                  <h3 className="font-display text-[clamp(1.8rem,1.1rem+1.4vw,2.8rem)] leading-[1.02] tracking-tight mb-3"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {c.discipline}
                  </h3>

                  <p className="text-base ink-mute leading-relaxed mb-6 max-w-[58ch]">{c.body}</p>

                  {open && (
                    <div className="hairline pt-5">
                      <Link href="/contact" className="u-link mono ink">
                        Ask about this slot ↗
                      </Link>
                    </div>
                  )}

                  {repo && (
                    <div className="hairline pt-5">
                      <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="u-link mono ink"
                      >
                        View on GitHub ↗
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 hairline pt-8 mono ink-mute max-w-[64ch] leading-relaxed">
          Once these three projects are running, we will publish full case studies — what we built, the code, what changed for the business, and what we got wrong. Until then, this page stays honest about where we are.
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 md:col-span-8">
              <span className="index">Your project, next</span>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,1.4rem+3vw,5rem)] leading-[0.95] tracking-[-0.03em]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                Want to be <em className="italic signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>our first case study?</em>
              </h2>
              <p className="text-base ink-mute mt-6 max-w-[55ch]">
                Two slots are still open. After the first call, we send a short one-page plan. No slide deck, no follow-up sales emails.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <MagneticButton href="/contact" className="btn btn-primary">
                Apply for a slot
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
