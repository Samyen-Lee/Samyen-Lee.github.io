import type { Content } from "@/content/types";
import { SectionHeading } from "./SectionHeading";
import { StackTimeline } from "./StackTimeline";

export function Expertise({ content }: { content: Content }) {
  const { expertise } = content;

  return (
    <section id="expertise" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading index={4} label={expertise.label} title={expertise.title} />

      <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-9 lg:col-start-4">
          <StackTimeline content={content} />
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-9 lg:col-start-4 xl:grid-cols-3">
          {expertise.groups.map((group, i) => (
            <div
              key={group.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <h3 className="label mb-4 border-b border-line pb-3 text-ink">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-full border border-line px-3 py-1.5 text-[14px] text-ink-2 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-9 lg:col-start-4" data-reveal>
          <h3 className="label mb-2 text-ink">{expertise.methodsTitle}</h3>
          <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {expertise.methods.map((method, i) => (
              <li key={method} className="flex gap-4 border-b border-line py-4 text-[15px] text-ink-2">
                <span className="font-mono text-[12px] leading-[1.9] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {method}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
