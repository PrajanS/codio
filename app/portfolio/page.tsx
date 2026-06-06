import type { Metadata } from 'next';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MagneticButton from '../components/MagneticButton';
import { IconMobile, IconGlobe } from '../components/Icon';

export const metadata: Metadata = {
  title: 'Work — Shipped projects',
  description:
    'Selected work from Codio — client products built for Hitagyana, plus other shipped apps across mobile and the web.',
};

type Project = {
  title: string;
  discipline: string;
  body: string;
  stack: string;
  repo: string;
  kind: 'app' | 'web';
  state?: string;
};

const CLIENT_PROJECTS: Project[] = [
  {
    title: 'Hitagyana College Finder',
    discipline: 'Mobile · College search',
    body: 'A college discovery app built for Hitagyana — students search, filter, and compare colleges, backed by cloud data and a shipped Android release.',
    stack: 'Flutter · Firebase · Dart',
    repo: 'https://github.com/Raghu1700/hitagyana_clg_finder',
    kind: 'app',
  },
  {
    title: 'Hitagyana Book Exchange',
    discipline: 'Mobile · Marketplace',
    body: 'A campus book marketplace built for Hitagyana — students buy and sell textbooks with Firebase auth, listings, a bidding system, favorites, and profiles.',
    stack: 'Flutter · Firebase · Dart',
    repo: 'https://github.com/Raghu1700/Stusents_book_exchange',
    kind: 'app',
  },
];

const OTHER_PROJECTS: Project[] = [
  {
    title: 'FitCore',
    discipline: 'Web · Gym management',
    body: 'A full-stack gym management dashboard — member management, workout and diet plans, attendance, payments, and role-based access with audit trails.',
    stack: 'React · TypeScript · Node · PostgreSQL',
    repo: 'https://github.com/Sanjaykumar-2005/FitCore',
    kind: 'web',
  },
  {
    title: 'FanikClean',
    discipline: 'Web · Workforce management',
    body: 'A workforce and billing system for a cleaning-services business — worker attendance, payroll, leave, client sites, invoicing, and financial reporting, on a custom PHP MVC framework.',
    stack: 'PHP · MVC · MySQL',
    repo: 'https://github.com/Sanjaykumar-2005/Fanikclean_development',
    kind: 'web',
  },
];

function ProjectCard({
  p,
  delay,
  offset,
}: {
  p: Project;
  delay: number;
  offset?: boolean;
}) {
  const Icon = p.kind === 'app' ? IconMobile : IconGlobe;
  return (
    <Reveal
      className={`col-span-12 md:col-span-6 ${offset ? 'md:translate-y-16' : ''}`}
      delay={delay}
    >
      <article className="group">
        <div className="slot aspect-[4/3] mb-6 relative grid place-items-center overflow-hidden">
          <span className="slot-tag">{p.discipline}</span>
          <span className="absolute right-3 top-3 z-[2] inline-flex items-center gap-1.5 mono ink border border-[var(--color-rule)] bg-[var(--color-paper)] px-2.5 py-1">
            <Icon size={13} />
            {p.kind === 'app' ? 'App' : 'Web'}
          </span>
          <span className="ink-faint group-hover:signal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
            <Icon size={96} strokeWidth={1} />
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <span className="mono ink-faint inline-flex items-center gap-1.5">
            <Icon size={12} />
            {p.kind === 'app' ? 'Mobile app' : 'Web app'}
          </span>
          <span className="mono signal">{p.state ?? 'Live'}</span>
        </div>

        <h3
          className="font-display text-[clamp(1.8rem,1.1rem+1.4vw,2.8rem)] leading-[1.02] tracking-tight mb-3"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          {p.title}
        </h3>

        <p className="text-base ink-mute leading-relaxed mb-4 max-w-[58ch]">{p.body}</p>

        <p className="mono ink-faint mb-6">{p.stack}</p>

        <div className="hairline pt-5">
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link mono ink"
          >
            View on GitHub ↗
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function PortfolioPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-16 max-md:pt-10 max-md:pb-10">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 03 — work ]</span>
          <span className="mono ink-faint">selected work · 2025–26</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.93] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[0, 1, 2, 3]}
          signal={[3]}
        >
          Work we have shipped.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 md:col-span-7 md:col-start-2">
            <Reveal delay={240}>
              <p className="text-lg ink-mute leading-relaxed">
                Real products, built and released. Below is client work we delivered for Hitagyana, followed by other apps we have shipped across mobile and the web. Each card is marked as a mobile app or a web app.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CLIENT · HITAGYANA ============ */}
      <section className="frame pb-24">
        <div className="hairline-b pb-3 mb-12 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-6 flex-wrap">
            <span className="index">Client</span>
            <span className="mono ink-mute">previous customer</span>
          </div>
          <span className="mono ink-faint">2 products</span>
        </div>

        <div className="grid grid-cols-12 gap-6 gap-y-6 mb-14 items-baseline">
          <div className="col-span-12 md:col-span-6">
            <span className="index">Company</span>
            <h2
              className="font-display mt-5 text-[clamp(2.6rem,1.6rem+4vw,5.5rem)] leading-[0.95] tracking-[-0.03em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
            >
              Hitagyana
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="text-base ink-mute leading-relaxed">
              Two mobile products designed, built, and shipped for Hitagyana — a college finder and a student book exchange, both released to real users.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {CLIENT_PROJECTS.map((p, i) => (
            <ProjectCard key={p.repo} p={p} delay={i * 80} offset={i === 1} />
          ))}
        </div>
      </section>

      {/* ============ OTHER PROJECTS ============ */}
      <section className="frame pb-24">
        <div className="hairline-b pb-3 mb-12 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-6 flex-wrap">
            <span className="index">Other projects</span>
            <span className="mono ink-mute">independent builds</span>
          </div>
          <span className="mono ink-faint">{OTHER_PROJECTS.length} projects</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {OTHER_PROJECTS.map((p, i) => (
            <ProjectCard key={p.repo} p={p} delay={i * 80} offset={i === 1} />
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 md:col-span-8">
              <span className="index">Your project, next</span>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,1.4rem+3vw,5rem)] leading-[0.95] tracking-[-0.03em]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                Want something <em className="italic signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>built like this?</em>
              </h2>
              <p className="text-base ink-mute mt-6 max-w-[55ch]">
                Tell us what you are building. After the first call, we send a short one-page plan — no slide deck, no follow-up sales emails.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <MagneticButton href="/contact" className="btn btn-primary">
                Start a project
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
