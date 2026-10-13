import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { CountUp } from "./CountUp";
import { SectionHeading } from "./SectionHeading";

export function About({ content }: { content: Content }) {
  const { about } = content;

  return (
    <section id="about" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading index={1} label={about.label} title={about.title} />

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
        <figure className="lg:col-span-3" data-reveal>
          <div className="group relative aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-sm bg-paper-3">
            <img
              src={site.portrait}
              alt={about.portraitAlt}
              width={310}
              height={464}
              loading="lazy"
              className="h-full w-full object-cover grayscale contrast-[1.05] transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <span className="pointer-events-none absolute inset-0 bg-accent mix-blend-multiply opacity-[0.12] transition-opacity duration-700 group-hover:opacity-0 dark:mix-blend-soft-light" />
          </div>
          <figcaption className="label mt-3">
            {site.city}, Madagascar
          </figcaption>
        </figure>

        <div className="lg:col-span-9">
          <div className="max-w-[62ch] space-y-6 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed text-ink-2">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                className={i === 0 ? "text-ink" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {about.figures.map((figure, i) => (
              <div
                key={figure.label}
                className="flex flex-col-reverse justify-end gap-3 border-b border-r border-line p-5 lg:p-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <dt className="text-[14px] leading-snug text-ink-2">{figure.label}</dt>
                <dd className="display text-[clamp(3rem,5vw,4.5rem)] text-ink">
                  <CountUp value={figure.value} suffix={figure.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
