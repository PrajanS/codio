import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import Reveal from './components/Reveal';
import WordReveal from './components/WordReveal';
import MagneticButton from './components/MagneticButton';
import LogoMarquee from './components/LogoMarquee';
import ImpactStrip from './components/ImpactStrip';
import SelectedWork from './components/SelectedWork';
import BrandMark from './components/BrandMark';
import { IconGlobe, IconMobile, IconDesign, IconArrow } from './components/Icon';

type ServiceIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const SERVICES: { n: string; name: string; sub: string; Icon: ServiceIcon; anchor: string }[] = [
  { n: '01', name: 'Web Platforms', sub: 'Next.js · React · TypeScript', Icon: IconGlobe, anchor: 'web' },
  { n: '02', name: 'Mobile Applications', sub: 'Flutter · React Native · Swift', Icon: IconMobile, anchor: 'mobile' },
  { n: '03', name: 'Product Design', sub: 'Discovery · UX · Design Systems', Icon: IconDesign, anchor: 'design' },
];

const PROCESS = [
  { n: '01', label: 'Plan', body: 'A 30-minute call. We turn your idea into a one-page plan with a clear budget and timeline before you sign anything.' },
  { n: '02', label: 'Design', body: 'Two weeks. Research, screens, and a small working prototype. You get a real plan, not a slide deck.' },
  { n: '03', label: 'Build', body: 'Six to twelve weeks. Weekly demos, full access to our tools, and real commits. We release to production every Friday.' },
  { n: '04', label: 'Support', body: 'Optional monthly retainer. We help with monitoring, performance, and planning the next set of features with your team.' },
];

const COHORT = [
  { n: '01', label: 'Reserved', body: 'First seat is taken. The project starts in July.' },
  { n: '02', label: 'Open', body: 'Looking for a web or mobile build with a team that wants senior help from day one.' },
  { n: '03', label: 'Open', body: 'Looking for a design-led product engagement we can shape end to end.' },
];

const FOUNDERS = [
  {
    initials: 'PS',
    name: 'Prajan S',
    role: 'Product & Engineering',
    bio: 'Shapes the product, owns the engineering roadmap, and keeps releases on track. The first person you talk to on a kickoff call.',
    tag: 'Product · Architecture · Delivery',
  },
  {
    initials: 'RV',
    name: 'Raghunanthan VR',
    role: 'Mobile Engineering',
    bio: 'Builds the mobile side end to end. Shipped both Hitagyana apps from prototype through to production on the Play Store.',
    tag: 'Flutter · Firebase · Dart',
  },
  {
    initials: 'AV',
    name: 'Ashwanth V',
    role: 'Design & Brand',
    bio: 'Leads design and brand. Turns rough scope into something we are not embarrassed to put a real user in front of.',
    tag: 'Figma · Brand · UI',
  },
  {
    initials: 'SM',
    name: 'Sanjaykumar M',
    role: 'Web Engineering',
    bio: 'Builds web platforms top to bottom. Shipped FitCore and FanikClean — real dashboards, real users, real money flowing through.',
    tag: 'React · Node · PHP · SQL',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame relative pt-16 pb-24 max-md:pt-10 max-md:pb-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="col-span-12 flex items-baseline justify-between hairline-b pb-3">
            <span className="mono ink-mute">[ 00 — index ]</span>
            <span className="mono ink-mute hidden md:inline">founding year · 2026</span>
            <span className="mono ink-faint">EST. Codio Studio</span>
          </div>

          <div className="col-span-12">
            <WordReveal
              as="h1"
              className="font-display leading-[0.92] tracking-[-0.04em] text-[clamp(3rem,0.6rem+10vw,11.5rem)] mt-12 max-md:mt-4"
              italic={[3, 4, 5]}
              signal={[4]}
            >
              We build software that keeps working.
            </WordReveal>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-2 mt-10">
            <Reveal delay={300}>
              <p className="text-lg md:text-xl ink-mute leading-relaxed mb-8">
                Codio is a new software studio. We are senior engineers and designers starting fresh. For our first year, we are taking on only three projects so each one gets our full attention.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="/contact" className="btn btn-primary">
                  Book a call
                </MagneticButton>
                <Link href="/services" className="btn">See what we build</Link>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 mt-10">
            <Reveal delay={500}>
              <div className="flex items-baseline gap-3 mb-4">
                {/* Tiny BrandMark with blinking cursor — gives the hero a
                    living, "the terminal is open" feel without leaning on
                    glow effects or video. Pairs with the live status tag. */}
                <span className="inline-flex items-center text-[var(--color-ink)]">
                  <BrandMark size={18} blink />
                </span>
                <span className="live">Studio status</span>
                <span className="mono ink-faint">— live</span>
              </div>
              <p className="text-base ink leading-relaxed">
                <em className="italic signal">Three project slots for 2026.</em> One is taken, two are open. After the first call, we send a short one-page plan. No long sales process.
              </p>
              <div className="mt-8 hairline pt-5 mono ink-mute">
                Every message is read by the team · we reply within one working day
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 mt-12 max-md:mt-6 flex items-center gap-3">
            <span className="scroll-cue" aria-hidden="true" />
            <span className="mono ink-faint">scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ============ IMPACT STRIP — proof of delivery before any pitch ============ */}
      <ImpactStrip />

      {/* ============ STACK ============ */}
      <section className="py-16 max-md:py-10">
        <div className="frame">
          <div className="flex items-baseline justify-between hairline-b pb-3 mb-10">
            <span className="index">Tools we use</span>
            <span className="mono ink-faint">stack / 12</span>
          </div>
        </div>
        <LogoMarquee />
      </section>

      {/* ============ SELECTED WORK — visual proof, four custom logo tiles ============ */}
      <SelectedWork />

      {/* ============ FIRST PROJECTS (cohort) ============ */}
      <section className="frame py-24 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">First projects</span>
            <span className="mono ink-faint">/ 03</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            Three slots · 2026
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {COHORT.map((c, i) => (
            <Reveal
              key={c.n}
              className="col-span-12 md:col-span-4"
              delay={i * 100}
            >
              <article className="hairline-b pb-10 h-full">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display text-7xl tracking-tight leading-none ink-faint" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {c.n}
                  </span>
                  <h3 className="font-display italic text-3xl tracking-tight leading-none signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                    {c.label}
                  </h3>
                </div>
                <p className="text-base ink-mute leading-relaxed">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-baseline justify-between">
          <span className="mono ink-mute">1 taken · 2 open</span>
          <Link href="/contact" className="btn">Book a call</Link>
        </div>
      </section>

      {/* ============ SERVICES SLAB ============ */}
      <section className="frame py-24 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-2">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">What we do</span>
            <span className="mono ink-faint">/ 04</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            Three areas, one team
          </div>
        </div>

        <div>
          {SERVICES.map((s) => (
            <Link
              key={s.n}
              href={`/services#${s.anchor}`}
              className="service-slab"
            >
              <span className="slab-idx ink-mute">{s.n}</span>
              <span className="slab-icon ink-mute" aria-hidden="true">
                <s.Icon size={22} />
              </span>
              <span className="slab-title">{s.name}</span>
              <span className="mono ink-mute justify-self-end">{s.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ HOW WE THINK ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-6">
            <span className="index">How we think</span>
            <WordReveal
              as="h2"
              className="font-display leading-[0.96] tracking-[-0.03em] text-[clamp(2.4rem,1.6rem+2.6vw,4.6rem)] mt-6"
              italic={[5, 6, 7, 8]}
              signal={[7]}
            >
              We do not just write code. We build software that lasts.
            </WordReveal>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Reveal>
              <p className="text-base ink-mute mb-6 leading-relaxed">
                Most software does not fail on launch day. It fails three months later, when real users arrive and the early version starts to break. We plan for that month. We write the code ourselves, so there is no junior team learning on your project, and no agency passing your work to another agency.
              </p>
              <p className="text-base ink-mute leading-relaxed">
                Every Friday you get a new release and a short written update. Every Monday we join your stand-up. That is the full rhythm.
              </p>
              <Link href="/about" className="btn btn-bare mt-8">Read about the studio</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">How we work</span>
            <span className="mono ink-faint">/ 06</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            plan → design → build → support
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.n}
              className="col-span-12 md:col-span-6"
              delay={i * 90}
            >
              <article className="hairline-b pb-10">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display text-7xl tracking-tight leading-none ink-faint" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {p.n}
                  </span>
                  <h3 className="font-display italic text-3xl tracking-tight leading-none signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                    {p.label}
                  </h3>
                </div>
                <p className="text-base ink-mute leading-relaxed">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ MEET THE TEAM — personal branding + founders' quote ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">Meet the team</span>
            <span className="mono ink-faint">/ 07</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link href="/about" className="u-link mono ink inline-flex items-center gap-1.5">
              Full studio brief
              <IconArrow size={12} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-start">
          {/* Pull quote — sets the tone for the founder cards below */}
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <Reveal>
              <p className="font-display text-[clamp(1.7rem,1.1rem+1.8vw,2.8rem)] text-center leading-[1.18] tracking-[-0.02em]"
                 style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                <span className="signal font-display italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>&ldquo;</span>
                We spent years building software inside other companies. Codio is the kind of studio we always wanted to hire — small, senior, and honest about scope.
                <span className="signal font-display italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>&rdquo;</span>
              </p>
              <footer className="mt-6 mono ink-mute text-center">— The four founders · Codio Studio</footer>
            </Reveal>
          </div>

          {/* Founder grid — full-width 4-up on desktop, 2-up on tablet,
              stacked on phone. Index numerals match the homepage rhythm. */}
          <ul className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 list-none p-0 mt-4">
            {FOUNDERS.map((f, i) => (
              <Reveal as="li" key={f.initials} delay={i * 100}>
                <article className="founder-card-v group h-full">
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="mono ink-faint">0{i + 1}</span>
                    <span className="mono ink-mute text-[0.62rem]">founder</span>
                  </div>
                  <div className="founder-initials-v" aria-hidden="true">{f.initials}</div>
                  <h3 className="font-display text-xl leading-tight tracking-tight mt-5"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {f.name}
                  </h3>
                  <div className="mono signal mt-1 text-[0.72rem]">{f.role}</div>
                  <p className="text-sm ink-mute mt-3 leading-relaxed">{f.bio}</p>
                  <div className="mono ink-faint mt-4 text-[0.7rem] hairline pt-3">{f.tag}</div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA — bold ink slab ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="bg-ink p-12 md:p-20 relative overflow-hidden">
            <div className="grid grid-cols-12 gap-6 items-end relative z-10">
              <div className="col-span-12 md:col-span-8">
                <span className="mono" style={{ color: 'var(--color-paper-faint)' }}>[ 08 — start ]</span>
                <h2 className="font-display mt-6 text-[clamp(2.6rem,1.4rem+4vw,6rem)] leading-[0.94] tracking-[-0.03em]" style={{ color: 'var(--color-paper)', fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                  Have a project <em className="italic" style={{ color: 'var(--color-signal)', fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>worth building?</em>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <MagneticButton href="/contact" className="btn btn-signal">
                  Book a call
                </MagneticButton>
                <p className="mono mt-6" style={{ color: 'var(--color-paper-faint)' }}>
                  ash@codio.co.in · reply within 24h
                </p>
              </div>
            </div>

            {/* big watermark numeral */}
            <span aria-hidden="true" className="font-display absolute -right-6 -bottom-12 text-[28rem] leading-none tracking-[-0.06em] opacity-10 select-none pointer-events-none"
                  style={{ color: 'var(--color-signal)', fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
              ↗
            </span>
          </div>
        </Reveal>
      </section>
    </>
  );
}
