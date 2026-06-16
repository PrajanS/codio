import Link from 'next/link';
import Reveal from './Reveal';
import { IconMobile, IconGlobe, IconArrow } from './Icon';
import {
  LogoCollegeFinder,
  LogoBookExchange,
  LogoFitCore,
  LogoFanikClean,
} from './ProjectLogos';

/**
 * Homepage "selected work" band — visual proof that things actually ship.
 * Four compact tiles, each reusing the inline-SVG logo from the full work
 * page so the brand language stays consistent. Tiles deliberately differ
 * in vertical offset (column 2 sits ~28px lower) to break the
 * identical-card-grid trap. Hover tints the logo signal-green and slides
 * a small arrow into the title — light enough not to fight the
 * established editorial rhythm of the rest of the page.
 */

const ITEMS = [
  {
    Logo: LogoCollegeFinder,
    title: 'College Finder',
    client: 'Hitagyana',
    kind: 'app' as const,
    stack: 'Flutter · Firebase',
  },
  {
    Logo: LogoBookExchange,
    title: 'Book Exchange',
    client: 'Hitagyana',
    kind: 'app' as const,
    stack: 'Flutter · Firebase',
  },
  {
    Logo: LogoFitCore,
    title: 'FitCore',
    client: 'Independent build',
    kind: 'web' as const,
    stack: 'React · Node · Postgres',
  },
  {
    Logo: LogoFanikClean,
    title: 'FanikClean',
    client: 'Independent build',
    kind: 'web' as const,
    stack: 'PHP · MVC · MySQL',
  },
];

export default function SelectedWork() {
  return (
    <section className="frame py-24 max-md:py-16">
      <div className="grid grid-cols-12 gap-6 items-end hairline-b pb-4 mb-12">
        <div className="col-span-12 md:col-span-8 flex items-baseline gap-4">
          <span className="index">Selected work</span>
          <span className="mono ink-faint">/ 02</span>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <Link href="/portfolio" className="u-link mono ink inline-flex items-center gap-1.5">
            See all {ITEMS.length} projects
            <IconArrow size={12} />
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-12 gap-x-6 gap-y-12 list-none p-0">
        {ITEMS.map((p, i) => {
          const KindIcon = p.kind === 'app' ? IconMobile : IconGlobe;
          return (
            <Reveal
              key={p.title}
              as="li"
              className={`col-span-6 md:col-span-3 ${i === 1 || i === 3 ? 'md:translate-y-7' : ''}`}
              delay={i * 90}
            >
              <Link
                href="/portfolio"
                className="work-tile group block"
              >
                <span className="work-tile-cover aspect-square">
                  <span className="work-tile-tag mono">
                    <KindIcon size={11} />
                    {p.kind === 'app' ? 'app' : 'web'}
                  </span>
                  <span className="work-tile-logo ink group-hover:signal">
                    <p.Logo size={120} />
                  </span>
                </span>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3
                    className="font-display text-xl leading-none tracking-tight inline-flex items-center gap-2"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
                  >
                    {p.title}
                    <span className="work-tile-arrow" aria-hidden="true">
                      <IconArrow size={13} />
                    </span>
                  </h3>
                  <span className="mono signal text-[0.65rem]">live</span>
                </div>
                <div className="mono ink-mute mt-1.5 text-[0.72rem]">{p.client}</div>
                <div className="mono ink-faint mt-3 text-[0.72rem]">{p.stack}</div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
