import type { Metadata } from 'next';
import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import ContactForm from '../components/ContactForm';
import { IconMail, IconPin, IconClock } from '../components/Icon';

export const metadata: Metadata = {
  title: 'Contact — Start a project',
  description:
    "Tell us about your project. We reply in one working day. No long sales process. After the first call, you get a one-page plan.",
};

const GMAIL_COMPOSE = 'https://mail.google.com/mail/?view=cm&fs=1&to=ash@codio.co.in&su=Project%20enquiry';

const LINES = [
  { icon: <IconMail size={16} />, label: 'Email', value: 'ash@codio.co.in', href: GMAIL_COMPOSE, external: true },
  { icon: <IconPin size={16} />, label: 'Location', value: 'Remote-first · global', external: false },
  { icon: <IconClock size={16} />, label: 'Hours', value: 'Mon — Fri · 09 — 18 IST', external: false },
];

const FAQS = [
  {
    q: 'How fast can you start?',
    a: 'Usually less than fourteen days from first call to first commit. We have three project slots for 2026 — one is taken, two are still open.',
  },
  {
    q: 'You have no past projects to show. Why should I trust you?',
    a: "Because the price is honest about that. Our first three projects come with full senior attention, fixed scope, and a special price that will not be offered again. The team has shipped software at scale before — just under a new studio name.",
  },
  {
    q: 'How much does a project cost?',
    a: 'A Sprint is fixed-price for two weeks. A Build is a fixed-scope, fixed-price project of six to twelve weeks. An Embed is a day rate with a monthly limit. First-project pricing is below market — we share exact numbers on the first call.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We are happy to sign yours, or we can send you a simple one-page mutual NDA in two minutes.',
  },
  {
    q: 'Will my code be easy to read after you leave?',
    a: 'Yes. Every project ends with a written guide to the system, a clear README, and a one-hour walk-through with your team.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="frame pt-16 pb-16 max-md:pt-10 max-md:pb-10">
        <div className="flex items-baseline justify-between hairline-b pb-3 mb-12">
          <span className="mono ink-mute">[ 05 — contact ]</span>
          <span className="live">Open · reply within 24h</span>
        </div>

        <WordReveal
          as="h1"
          className="font-display leading-[0.93] tracking-[-0.04em] text-[clamp(3rem,1.6rem+6vw,9rem)]"
          italic={[3, 4]}
          signal={[4]}
        >
          Tell us what you&apos;re building.
        </WordReveal>

        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 md:col-span-6 md:col-start-2">
            <Reveal delay={250}>
              <p className="text-lg ink-mute leading-relaxed">
                One working day. No long sales process. Tell us where you are — only an idea, halfway through a build, or trying to save a project that is in trouble. We will write back with clear next steps, and if your project fits our first three slots, we will say so.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FORM + LINES ============ */}
      <section className="frame pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-start">
          {/* Left column — lines */}
          <aside className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-4 hairline-b pb-3 mb-8">
                <span className="index">How to reach us</span>
              </div>

              <ul className="list-none p-0 space-y-6">
                {LINES.map((l) => (
                  <li key={l.label}>
                    <div className="flex items-baseline gap-3 mono ink-mute mb-1">
                      <span aria-hidden="true">{l.icon}</span>
                      <span>{l.label}</span>
                    </div>
                    {l.href ? (
                      <a
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className="font-display text-xl u-link ink"
                        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                      >
                        {l.value}
                      </a>
                    ) : (
                      <div className="font-display text-xl ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>{l.value}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-12 hairline pt-6 mono ink-mute leading-relaxed">
                Your message goes straight to the team. We reply within one working day, every time.
              </div>
            </Reveal>
          </aside>

          {/* Right column — form */}
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <div className="flex items-baseline gap-4 hairline-b pb-3 mb-8">
                <span className="index">Project details</span>
                <span className="mono ink-faint">— 3 required</span>
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="frame py-28 max-md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
          <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
            <span className="index">Common questions</span>
            <span className="mono ink-faint">/ 02</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {FAQS.map((f, i) => (
            <Reveal
              key={f.q}
              className={`col-span-12 md:col-span-6 ${i % 2 === 1 ? 'md:translate-y-10' : ''}`}
              delay={i * 80}
            >
              <details className="hairline-b py-6 group">
                <summary className="flex items-baseline justify-between cursor-pointer list-none">
                  <h3 className="font-display text-2xl leading-tight tracking-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}>
                    {f.q}
                  </h3>
                  <span className="mono ink-mute group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="text-base ink-mute leading-relaxed mt-4 max-w-[62ch]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
