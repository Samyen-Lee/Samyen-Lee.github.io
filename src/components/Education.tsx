import type { Content } from "@/content/types";
import { SectionHeading } from "./SectionHeading";

export function Education({ content }: { content: Content }) {
  const { education } = content;

  return (
    <section id="education" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading index={5} label={education.label} title={education.title} />

      <ol className="mt-14 border-b border-line lg:mt-20">
        {education.items.map((item, i) => (
          <li
            key={item.degree}
            className="group grid gap-3 border-t border-line py-8 lg:grid-cols-12 lg:gap-6"
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <p className="label lg:col-span-3 lg:pt-2">{item.period}</p>
            <div className="lg:col-span-6">
              <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] transition-colors duration-300 group-hover:text-accent">
                {item.degree}
              </h3>
              {item.details && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-ink-2"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="text-[15px] text-ink-2 lg:col-span-3 lg:pt-2 lg:text-right">{item.school}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-6 lg:grid-cols-12" data-reveal>
        <h3 className="label lg:col-span-3">{education.languagesTitle}</h3>
        <dl className="flex flex-wrap gap-x-12 gap-y-4 lg:col-span-9">
          {education.languages.map((language) => (
            <div key={language.name} className="flex items-baseline gap-3">
              <dt className="display text-3xl">{language.name}</dt>
              <dd className="text-[14px] text-ink-3">{language.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
