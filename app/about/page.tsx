import type { Metadata } from 'next';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MagneticButton from '../components/MagneticButton';

export const metadata: Metadata = {
  title: 'Studio — Four founders, one direct line',
  description:
    'Codio is a new senior software studio founded by Prajan S, Raghunanthan VR, Ashwanth V, and Sanjaykumar M. We write the code ourselves. Three project slots open for 2026.',
};

const VALUES = [
  {
    n: '01',
    title: 'Ship working software, not slides',
    body: 'A real user clicking a real button teaches us more than any document. We build a working version fast, put it in front of users, and improve it from there.',
  },
  {
    n: '02',
    title: 'Easy to maintain after we leave',
    body: 'Code that works today is the easy part. We write code your team can read, change, and extend six months later without calling us back.',
  },
  {
    n: '03',
    title: 'We do the work ourselves',
    body: 'The same person who talks to you in the first call is the one writing the code on day one. No junior team, no hand-offs.',
  },
  {
    n: '04',
    title: 'No surprises, no hidden status',
    body: 'You see our task board, our commits, and our releases. If something is slipping, you hear it from us first — not at the next review meeting.',
  },
];

const TEAM = [
  {
    initials: 'PS',
    title: 'Prajan S',
    role: 'Product & Engineering',
    bio: 'Shapes the product, owns the engineering roadmap, and keeps releases on track. The first person you talk to on a kickoff call, and the one who writes the one-page plan after.',
    tag: 'Product · Architecture · Delivery',
  },
  {
    initials: 'RV',
    title: 'Raghunanthan VR',
    role: 'Mobile Engineering',
    bio: 'Builds the mobile side end to end. Shipped both Hitagyana apps from prototype through to production on the Play Store — Flutter, Firebase, Dart, in production.',
    tag: 'Flutter · Firebase · Dart',
  },
  {
    initials: 'AV',
    title: 'Ashwanth V',
    role: 'Design & Brand',
    bio: 'Leads design and brand. Turns rough scope into something we are not embarrassed to put a real user in front of. Owns the visual system from logo to last empty state.',
    tag: 'Figma · Brand · UI',
  },
  {
    initials: 'SM',
    title: 'Sanjaykumar M',
    role: 'Web Engineering',
    bio: 'Builds web platforms top to bottom. Shipped FitCore (React / Node / Postgres) and FanikClean (PHP / MySQL) — real dashboards, real users, real money flowing through.',
    tag: 'React · Node · PHP · SQL',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-24 max-md:pt-10 max-md:pb-16">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 04 — studio ]</span>
          <span className="mono ink-faint">EST. 2026 · founding year</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.94] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[5, 6]}
          signal={[6]}
        >
          Four founders. One direct line. No middlemen.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-12">
          <div className="col-span-12 md:col-span-5 md:col-start-2">
            <Reveal delay={250}>
              <p className="text-lg ink-mute leading-relaxed">
                Codio is a new senior software studio, started in 2026 by four people who spent the last several years building software inside other companies and shipping side projects of their own. We are staying small on purpose. For our first year, we are taking only three projects so each one gets our full attention.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={400}>
              <p className="text-base ink-mute leading-relaxed">
                Every project is built by the same small team, so nothing gets passed down to a junior team. The people you meet on the first call are the same people writing your code on day one — and on the final day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ NUMBERS STRIP ============ */}
      <section className="bg-paper-2 hairline hairline-b py-16 max-md:py-10">
        <div className="frame grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <Num n="01" v="4" label="Founders on every project" />
          <Num n="02" v="3" label="Total project slots for 2026" />
          <Num n="03" v="2" label="Slots still open" />
          <Num n="04" v="2026" label="Studio founded" />
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">What we believe</span>
            <span className="mono ink-faint">/ 02</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            Four rules · every project
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.n}
              className="col-span-12 md:col-span-6"
              delay={i * 80}
            >
              <article className="hairline-b pb-12">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display text-7xl tracking-tight leading-none ink-faint" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {v.n}
                  </span>
                  <h3 className="font-display italic text-3xl tracking-tight leading-none signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                    {v.title}
                  </h3>
                </div>
                <p className="text-base ink-mute leading-relaxed">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">The team</span>
            <span className="mono ink-faint">/ 03</span>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right mono ink-mute">
            The people you actually work with
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-2">
          {TEAM.map((p, i) => (
            <Reveal key={p.initials} className="col-span-12 md:col-span-6" delay={i * 80}>
              <article className="hairline-b py-8 grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr_auto] gap-x-5 gap-y-3 md:gap-6 items-baseline group">
                <div className="font-display text-[2.6rem] md:text-[3.4rem] leading-none tracking-tight ink-faint group-hover:signal group-hover:italic transition-colors duration-300" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                  {p.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-2xl leading-tight tracking-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>{p.title}</h4>
                  <div className="mono ink-mute mt-1">{p.role}</div>
                  <p className="text-sm ink-mute mt-3 max-w-[42ch] leading-relaxed">{p.bio}</p>
                </div>
                <div className="col-span-2 md:col-span-1 pl-[calc(64px+1.25rem)] md:pl-0 mono ink-faint md:text-right">{p.tag}</div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mono ink-mute mt-10 max-w-[60ch]">
          Photos go up next. For now, you can see the work first — the proper introductions happen on the first call.
        </p>
      </section>

      {/* ============ CTA ============ */}
      <section className="frame py-28 max-md:py-16">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-12 md:col-span-8">
              <span className="index">Work with us</span>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,1.4rem+3vw,5rem)] leading-[0.95] tracking-[-0.03em]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                Call us <em className="italic signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>early</em> or call us <em className="italic signal" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>late</em>. We can help in both.
              </h2>
              <p className="text-base ink-mute mt-6 max-w-[55ch]">
                Whether you have only an idea, or you are halfway through a build, we can help. Every project starts with a 30-minute call.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <MagneticButton href="/contact" className="btn btn-primary">
                Book a call
              </MagneticButton>
              <p className="mono ink-mute mt-6">We reply within one working day</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Num({ n, v, label }: { n: string; v: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="mono ink-faint">{n}</span>
      <span className="stat-num text-[clamp(2.8rem,1.6rem+3vw,5rem)] tabular-nums">{v}</span>
      <span className="mono ink-mute">{label}</span>
    </div>
  );
}
