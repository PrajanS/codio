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
  year: string;
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
    year: '2025',
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
    year: '2025',
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
    year: '2025',
    kind: 'web',
    Logo: LogoFitCore,
  },
  {
    n: '04',
    title: 'FanikClean',
    client: 'Independent build',
    discipline: 'Workforce & billing system',
    body: 'A workforce and billing system for a cleaning-services business — attendance, payroll, leave, client sites, invoicing, and financial reporting on a custom PHP MVC framework.',
    stack: 'PHP · MVC · MySQL',
    year: '2025',
    kind: 'web',
    Logo: LogoFanikClean,
  },
];

function ProjectRow({ p, delay }: { p: Project; delay: number }) {
  const KindIcon = p.kind === 'app' ? IconMobile : IconGlobe;
  const kindLabel = p.kind === 'app' ? 'Mobile app' : 'Web app';
  return (
    <Reveal as="li" delay={delay}>
      <article className="grid grid-cols-[auto_1fr] md:grid-cols-[3.5rem_auto_1fr_10rem] items-baseline gap-x-6 gap-y-4 py-9 border-b border-[var(--color-rule)]">
        {/* Index */}
        <span className="mono ink-faint self-start pt-1">{p.n}</span>

        {/* Logo — small, decorative */}
        <span className="ink hidden md:inline-flex self-start">
          <p.Logo size={56} />
        </span>

        {/* Title + client + description */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2
              className="font-display text-[clamp(1.7rem,1.1rem+1.4vw,2.6rem)] leading-[1.05] tracking-tight"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
            >
              {p.title}
            </h2>
            <span className="mono ink-mute inline-flex items-center gap-1.5 text-[0.7rem]">
              <KindIcon size={12} />
              {kindLabel}
            </span>
          </div>
          <div className="mono ink-mute mt-1.5">{p.client} · {p.discipline}</div>
          <p className="text-base ink-mute leading-relaxed mt-3 max-w-[62ch]">{p.body}</p>
        </div>

        {/* Meta — stack + year (right rail on desktop, inline on mobile) */}
        <div className="col-start-2 md:col-start-4 md:text-right">
          <div className="mono ink-faint leading-relaxed">{p.stack}</div>
          <div className="mono ink-faint mt-1">{p.year}</div>
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

      {/* ============ PROJECT LIST ============ */}
      <section className="frame pb-24">
        <div className="hairline-b pb-3 mb-4 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-6 flex-wrap">
            <span className="index">Shipped projects</span>
            <span className="mono ink-mute">live, in production</span>
          </div>
          <span className="mono ink-faint">{PROJECTS.length} products</span>
        </div>

        <ul className="list-none p-0 border-t border-[var(--color-rule)]">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.title} p={p} delay={i * 70} />
          ))}
        </ul>
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
