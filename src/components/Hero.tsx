import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { ArrowDown, Download } from "./icons";
import { LocalTime } from "./LocalTime";
import { RotatingWord } from "./RotatingWord";

export function Hero({ content }: { content: Content }) {
  const { hero, lang } = content;
  const current = content.experience.items[0];

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col">
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink-2" style={{ "--rise-delay": "100ms" } as React.CSSProperties}>
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {hero.status}
            <span className="text-ink-3">{hero.workModes}</span>
          </p>
          <div
            className="rise hidden max-w-[260px] border-l border-line pl-4 md:block"
            style={{ "--rise-delay": "250ms" } as React.CSSProperties}
          >
            <p className="label">{hero.currentLabel}</p>
            <p className="mt-1 text-[14px] leading-snug text-ink">
              {current.role} · {current.company}
            </p>
            <p className="text-[13px] text-ink-3">{current.period}</p>
          </div>
        </div>

        <h1 className="mt-auto pt-16">
          <span
            className="rise label block text-ink-2"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            {site.name} — {hero.eyebrow}
          </span>
          <span
            className="rise display mt-6 block max-w-[20ch] text-[clamp(2.9rem,6.6vw,7rem)] leading-[0.95]"
            style={{ "--rise-delay": "350ms" } as React.CSSProperties}
          >
            {hero.before} <RotatingWord words={hero.words} />
            {hero.after}
          </span>
        </h1>

        <div
          className="rise mt-12 grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:items-end"
          style={{ "--rise-delay": "550ms" } as React.CSSProperties}
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ink-2 md:col-span-7">
            {hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
            <li className="flex items-center gap-2">
              {hero.localTime} · <LocalTime lang={lang} /> <span className="text-ink-3">UTC+3</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
            >
              {hero.ctaPrimary}
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={site.cv}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              <Download size={16} />
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
