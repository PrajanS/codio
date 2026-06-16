import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MagneticButton from '../components/MagneticButton';
import { IconMobile, IconGlobe } from '../components/Icon';
import {
  LogoCollegeFinder,
  LogoBookExchange,
  LogoFitCore,
  LogoFanikClean,
} from '../components/ProjectLogos';

export const metadata: Metadata = {
  title: 'Work — Shipped projects',
  description:
    'Selected work from Codio — mobile and web products designed, built, and released to real users.',
};

type Kind = 'app' | 'web';
type LogoComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type Project = {
  n: string;
  title: string;
  client: string;
  discipline: string;
  body: string;
  stack: string;
  repo: string;
  kind: Kind;
  Logo: LogoComponent;
};

const PROJECTS: Project[] = [
  {
    n: '01',
    title: 'College Finder',
    client: 'Hitagyana',
    discipline: 'College search & discovery',
    body: 'A college discovery app — students search, filter, and compare colleges across India, backed by cloud data and shipped to Android.',
    stack: 'Flutter · Firebase · Dart',
    repo: 'https://github.com/Raghu1700/hitagyana_clg_finder',
    kind: 'app',
    Logo: LogoCollegeFinder,
  },
  {
    n: '02',
    title: 'Book Exchange',
    client: 'Hitagyana',
    discipline: 'Campus marketplace',
    body: 'A campus book marketplace — students buy and sell textbooks with Firebase auth, listings, a bidding system, favourites, and profiles.',
    stack: 'Flutter · Firebase · Dart',
    repo: 'https://github.com/Raghu1700/Stusents_book_exchange',
    kind: 'app',
    Logo: LogoBookExchange,
  },
  {
    n: '03',
    title: 'FitCore',
    client: 'Independent build',
    discipline: 'Gym management dashboard',
    body: 'A full-stack gym management dashboard — members, workout and diet plans, attendance, payments, and role-based access with audit trails.',
    stack: 'React · TypeScript · Node · PostgreSQL',
    repo: 'https://github.com/Sanjaykumar-2005/FitCore',
    kind: 'web',
    Logo: LogoFitCore,
  },
  {
    n: '04',
    title: 'FanikClean',
    client: 'Independent build',
    discipline: 'Workforce & billing system',
    body: 'A workforce and billing system for a cleaning-services business — worker attendance, payroll, leave, client sites, invoicing, and financial reporting on a custom PHP MVC framework.',
    stack: 'PHP · MVC · MySQL',
    repo: 'https://github.com/Sanjaykumar-2005/Fanikclean_development',
    kind: 'web',
    Logo: LogoFanikClean,
  },
];

function ProjectCard({ p, delay, offset }: { p: Project; delay: number; offset?: boolean }) {
  const KindIcon = p.kind === 'app' ? IconMobile : IconGlobe;
  const kindLabel = p.kind === 'app' ? 'Mobile app' : 'Web app';
  return (
    <Reveal
      className={`col-span-12 md:col-span-6 ${offset ? 'md:translate-y-16' : ''}`}
      delay={delay}
    >
      <article className="group">
        {/* Logo slot — large, no overlapping badges. The custom SVG sits
            on the warm paper-2 background; on hover it tilts toward
            signal-green to acknowledge the cursor. */}
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.title} — view repository`}
          className="slot aspect-[4/3] mb-6 grid place-items-center relative overflow-hidden"
        >
          <span className="slot-tag">{p.discipline}</span>
          <span className="ink group-hover:signal transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <p.Logo size={180} />
          </span>
        </a>

        {/* Single meta row — index + kind on the left, live state on the right.
            Keeps each card to a predictable rhythm. */}
        <div className="flex items-baseline justify-between mono mb-4">
          <span className="ink-faint inline-flex items-baseline gap-2">
            <span>{p.n}</span>
            <span className="ink-mute inline-flex items-center gap-1.5">
              <KindIcon size={12} />
              {kindLabel}
            </span>
          </span>
          <span className="signal">Live</span>
        </div>

        {/* Title block */}
        <h3
          className="font-display text-[clamp(1.9rem,1.1rem+1.6vw,3rem)] leading-[1.02] tracking-tight"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          {p.title}
        </h3>
        <div className="mono ink-mute mt-1 mb-4">{p.client}</div>

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
  const clientCount = PROJECTS.filter((p) => p.client === 'Hitagyana').length;
  const otherCount = PROJECTS.length - clientCount;
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-16 max-md:pt-10 max-md:pb-10">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 03 — work ]</span>
          <span className="mono ink-faint">{PROJECTS.length} shipped · 2025–26</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.93] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[0, 1, 2, 3]}
          signal={[3]}
        >
          Work we have shipped.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-10 items-baseline">
          <div className="col-span-12 md:col-span-7 md:col-start-2">
            <Reveal delay={240}>
              <p className="text-lg ink-mute leading-relaxed">
                Real products, designed and released to real users. {clientCount} built for Hitagyana — a college finder and a campus book exchange — and {otherCount} independent builds across the web.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10 md:text-right">
            <Reveal delay={360}>
              <div className="mono ink-mute">{clientCount} client · {otherCount} independent</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ UNIFIED PROJECT GRID ============ */}
      <section className="frame pb-24">
        <div className="hairline-b pb-3 mb-12 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-6 flex-wrap">
            <span className="index">Shipped projects</span>
            <span className="mono ink-mute">live, in production</span>
          </div>
          <span className="mono ink-faint">{PROJECTS.length} products</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-20">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.repo} p={p} delay={i * 80} offset={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 md:col-span-8">
              <span className="index">Your project, next</span>
              <h2
                className="font-display mt-6 text-[clamp(2.4rem,1.4rem+3vw,5rem)] leading-[0.95] tracking-[-0.03em]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
              >
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
