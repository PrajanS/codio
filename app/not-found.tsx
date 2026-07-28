import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="frame min-h-[80vh] grid place-items-center pt-16 pb-24">
      <div className="grid grid-cols-12 gap-6 w-full items-end">
        <div className="col-span-12 hairline-b pb-3 flex items-baseline justify-between">
          <span className="mono ink-mute">[ 404 — not found ]</span>
          <span className="mono ink-faint">no route matched</span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h1
            className="font-display leading-[0.92] tracking-[-0.04em] text-[clamp(4.4rem,2rem+10vw,12rem)] mt-10"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
          >
            404
            <span
              className="signal italic block text-[clamp(2.4rem,1.4rem+3vw,5rem)] mt-4"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              page slipped its mooring.
            </span>
          </h1>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9 pb-8">
          <p className="text-base ink-mute leading-relaxed mb-8">
            The URL you followed doesn&apos;t exist — or doesn&apos;t exist yet.
            Try one of these instead:
          </p>
          <ul className="list-none p-0 space-y-1 mono">
            <li className="hairline-b py-3"><Link href="/" className="u-link ink">01 — Index</Link></li>
            <li className="hairline-b py-3"><Link href="/services" className="u-link ink">02 — Services</Link></li>
            <li className="hairline-b py-3"><Link href="/portfolio" className="u-link ink">03 — Work</Link></li>
            <li className="hairline-b py-3"><Link href="/about" className="u-link ink">04 — About</Link></li>
            <li className="hairline-b py-3"><Link href="/contact" className="u-link ink">05 — Contact</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
