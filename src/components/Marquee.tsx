import type { Content } from "@/content/types";

export function Marquee({ content }: { content: Content }) {
  const { label, items } = content.marquee;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-[clamp(2rem,4vw,3.25rem)] italic text-ink-2 transition-colors hover:text-ink">
            {item}
          </span>
          <span className="text-accent" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="marquee relative overflow-hidden border-y border-line py-6">
      <span className="label absolute left-5 top-2 z-10 bg-paper pr-2 sm:left-8 lg:left-12">{label}</span>
      <div className="marquee-track flex w-max pt-3">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
