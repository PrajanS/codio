import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MagneticButton from '../components/MagneticButton';
import { IconGlobe, IconMobile, IconDesign } from '../components/Icon';

export const metadata: Metadata = {
  title: 'Services — Web, mobile, design',
  description:
    'We build web platforms, mobile apps, and product design — from start to finish, by senior engineers.',
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type Service = {
  id: string;
  n: string;
  eyebrow: string;
  title: string;
  italicWords?: number[];
  signalWords?: number[];
  blurb: string;
  stack: string[];
  features: string[];
  Icon: IconComponent;
};

const SERVICES: Service[] = [
  {
    id: 'web',
    n: '01',
    eyebrow: 'Web Platforms',
    title: 'Web platforms built to be fast and grow with you.',
    italicWords: [3, 5],
    signalWords: [5],
    blurb:
      'From simple marketing sites to large business dashboards. We use Next.js, React, and TypeScript the way they were meant to be used — rendered on the server, accessible to everyone, and fast on the phones people actually own.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Postgres', 'Redis', 'Vercel · Fly · AWS'],
    features: [
      'Marketing and content sites',
      'Business dashboards and admin tools',
      'Headless CMS (Sanity, Contentful)',
      'E-commerce (Shopify, Stripe)',
      'Speed and SEO tuning',
      'Accessibility (WCAG 2.2 AA)',
    ],
    Icon: IconGlobe,
  },
  {
    id: 'mobile',
    n: '02',
    eyebrow: 'Mobile Applications',
    title: 'Mobile apps for iOS and Android, built together.',
    italicWords: [0, 1],
    signalWords: [1],
    blurb:
      'One team, two app stores, one code base. We use Flutter or React Native when they are the right fit, and Swift or Kotlin when we need full native power. App Store and Play Store submission is handled by us, from start to finish.',
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Sentry'],
    features: [
      'Cross-platform apps',
      'Native iOS and Android',
      'Offline-first apps',
      'Push, deep linking, in-app purchases',
      'Build pipelines for release',
      'App store submission and review',
    ],
    Icon: IconMobile,
  },
  {
    id: 'design',
    n: '03',
    eyebrow: 'Product Design',
    title: 'Product design that ships with the code, not next quarter.',
    italicWords: [0, 1],
    signalWords: [1],
    blurb:
      'Research, UX, design systems, and component libraries — built directly in Figma and React, so the engineering team can use the design instead of guessing what it meant. We work alongside your team in the same weekly cycle.',
    stack: ['Figma', 'Tokens Studio', 'Storybook', 'Radix', 'Tailwind v4', 'Motion'],
    features: [
      'Research and UX',
      'Design systems',
      'UI engineering',
      'Brand into product',
      'Component libraries',
      'Design hand-off',
    ],
    Icon: IconDesign,
  },
];

const ENGAGEMENTS = [
  {
    n: '01',
    name: 'Sprint',
    sub: 'Two weeks · fixed price',
    body:
      "Research, a quick test build, and a working prototype. You get a written plan and a budget you can show your board. A good first step if you are not sure where to start.",
  },
  {
    n: '02',
    name: 'Build',
    sub: 'Six to twelve weeks · fixed scope',
    body:
      'A full production build with weekly demos and Friday releases. Fixed scope and fixed price. Three of these are open as our first project slots for 2026.',
  },
  {
    n: '03',
    name: 'Embed',
    sub: 'Three to twelve months · day rate',
    body:
      'We join your team as senior engineers for ongoing work. Day rate with a monthly limit. We only take one embed at a time so attention stays focused.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-20 max-md:pt-10 max-md:pb-12">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 02 — services ]</span>
          <span className="mono ink-faint">3 areas</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.93] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[3, 4]}
          signal={[4]}
        >
          What we build for you.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-10 items-baseline">
          <div className="col-span-12 md:col-span-6 md:col-start-2">
            <Reveal delay={240}>
              <p className="text-lg ink-mute leading-relaxed">
                Three areas, all built by our team before Codio existed. Each one runs from start to finish — plan, design, build, support. Most projects use two of them, and every project starts with a 30-minute call.
              </p>
            </Reveal>
          </div>

          {/* Quick-jump icon row */}
          <div className="col-span-12 md:col-span-4 md:col-start-9 max-md:mt-8">
            <Reveal delay={360}>
              <ul className="list-none p-0 grid grid-cols-3 gap-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className="group flex flex-col items-center gap-2 hairline px-2 py-4 ink-mute hover:ink transition-colors"
                    >
                      <span className="group-hover:signal transition-colors">
                        <s.Icon size={28} />
                      </span>
                      <span className="mono text-[0.7rem]">{s.eyebrow.split(' ')[0]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SERVICES — long-form ============ */}
      <section className="frame">
        {SERVICES.map((s, i) => (
          <ServiceBlock key={s.id} service={s} reverse={i % 2 === 1} />
        ))}
      </section>

      {/* ============ ENGAGEMENT MODELS ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">How to hire us</span>
            <span className="mono ink-faint">/ 02</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            Three ways to work together
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {ENGAGEMENTS.map((e, i) => (
            <Reveal key={e.n} className="col-span-12 md:col-span-4" delay={i * 80}>
              <article className="hairline-b pb-10 h-full">
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-display text-6xl leading-none ink-faint"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                  >
                    {e.n}
                  </span>
                  <h3
                    className="font-display italic text-2xl leading-none signal"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
                  >
                    {e.name}
                  </h3>
                </div>
                <div className="mono ink-mute mt-3 mb-5">{e.sub}</div>
                <p className="text-base ink-mute leading-relaxed">{e.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="bg-ink p-12 md:p-20">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="mono" style={{ color: 'var(--color-paper-faint)' }}>[ 03 — start ]</span>
                <h2
                  className="font-display mt-6 text-[clamp(2.4rem,1.4rem+3vw,5rem)] leading-[0.94] tracking-[-0.03em]"
                  style={{ color: 'var(--color-paper)', fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                >
                  Pick one area. <em className="italic" style={{ color: 'var(--color-signal)', fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>Or all three.</em>
                </h2>
                <p className="mt-6 max-w-[55ch]" style={{ color: 'var(--color-paper-mute)' }}>
                  Most of our projects cover two of these areas. Every one starts with a 30-minute call. No slide deck, no sales follow-ups.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <MagneticButton href="/contact" className="btn btn-signal">
                  Book a call
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ServiceBlock({ service: s, reverse }: { service: Service; reverse: boolean }) {
  return (
    <article id={s.id} className="py-24 max-md:py-16 hairline-b scroll-mt-24">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className={`col-span-12 md:col-span-5 ${reverse ? 'md:col-start-8 md:order-2' : ''}`}>
          <div className="sticky top-28">
            {/* Icon + index + eyebrow row. The icon gives a glance-level
                cue to what this section is about before the title even
                resolves. */}
            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="ink-mute flex-shrink-0 self-center"
                aria-hidden="true"
              >
                <s.Icon size={36} />
              </span>
              <span
                className="font-display text-[5rem] leading-none ink-faint"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
              >
                {s.n}
              </span>
              <span className="mono ink-mute">{s.eyebrow}</span>
            </div>
            <WordReveal
              as="h2"
              className="font-display leading-[0.96] tracking-[-0.03em] text-[clamp(2rem,1.2rem+2.5vw,4rem)]"
              italic={s.italicWords}
              signal={s.signalWords}
            >
              {s.title}
            </WordReveal>
          </div>
        </div>

        <div className={`col-span-12 md:col-span-6 ${reverse ? 'md:col-start-1 md:order-1' : 'md:col-start-7'}`}>
          <Reveal>
            <p className="text-base ink-mute leading-relaxed mb-10">{s.blurb}</p>

            <div className="hairline-b pb-5 mb-5 flex items-baseline justify-between">
              <span className="mono ink-mute">Tools we use</span>
              <span className="mono ink-faint">/ {s.stack.length.toString().padStart(2, '0')}</span>
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 mb-12 list-none p-0">
              {s.stack.map((t) => (
                <li
                  key={t}
                  className="font-display text-xl tracking-tight"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="hairline-b pb-5 mb-5 flex items-baseline justify-between">
              <span className="mono ink-mute">What we do</span>
              <span className="mono ink-faint">/ {s.features.length.toString().padStart(2, '0')}</span>
            </div>
            <ul className="grid gap-3 list-none p-0 mb-10">
              {s.features.map((f) => (
                <li key={f} className="flex items-baseline gap-3 text-base ink">
                  <span className="mono ink-faint mt-1">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn">Talk about a project</Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
