import type { Content } from "@/content/types";

const START = { year: 2020, month: 1 };
const END = { year: 2027, month: 1 };

function toMonths(value: string) {
  const [year, month] = value.split("-").map(Number);
  return (year - START.year) * 12 + (month - START.month);
}

function formatMonth(value: string, lang: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { month: "short", year: "numeric" }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
}

export function StackTimeline({ content }: { content: Content }) {
  const { expertise, lang } = content;
  const total = (END.year - START.year) * 12 + (END.month - START.month);
  // Computed at build time: the "today" marker moves on each deploy
  const now = new Date();
  const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const years = Array.from({ length: END.year - START.year }, (_, i) => START.year + i);

  return (
    <figure data-reveal>
      <figcaption className="label mb-6">{expertise.timelineTitle}</figcaption>
      <div className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
        <div />
        <div className="relative mb-3 h-5">
          {years.map((year) => (
            <span
              key={year}
              className="absolute top-0 font-mono text-[11px] text-ink-3"
              style={{ left: `${(toMonths(`${year}-01`) / total) * 100}%` }}
            >
              <span className="hidden sm:inline">{year}</span>
              <span className="sm:hidden">’{String(year).slice(2)}</span>
            </span>
          ))}
        </div>

        {expertise.rows.map((row) => {
          const current = row.to === null;
          const to = row.to ?? nowKey;
          const left = (toMonths(row.from) / total) * 100;
          const width = Math.max(((toMonths(to) - toMonths(row.from)) / total) * 100, 2);
          const period = `${formatMonth(row.from, lang)} — ${current ? expertise.now : formatMonth(to, lang)}`;
          return (
            <div key={row.label} className="contents">
              <div className="flex items-center border-t border-line py-4 text-[14px] text-ink sm:text-[15px]">
                {row.label}
              </div>
              <div className="relative border-t border-line py-4">
                {years.map((year) => (
                  <span
                    key={year}
                    aria-hidden="true"
                    className="absolute inset-y-0 w-px bg-line/70"
                    style={{ left: `${(toMonths(`${year}-01`) / total) * 100}%` }}
                  />
                ))}
                <div
                  tabIndex={0}
                  aria-label={`${row.label} : ${row.where}, ${period}`}
                  className="group/bar relative h-7 outline-none"
                  style={{ marginLeft: `${left}%`, width: `${width}%` }}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                      current ? "bg-accent" : "bg-ink group-hover/bar:bg-accent group-focus-visible/bar:bg-accent"
                    }`}
                  />
                  {current && (
                    <span className="pulse-dot absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-paper bg-accent" />
                  )}
                  <span className={`pointer-events-none absolute bottom-full z-10 mb-2 ${left > 30 ? "right-0" : "left-0"} w-max max-w-[16rem] translate-y-1 rounded-md bg-ink px-3 py-1.5 text-[12px] leading-snug text-paper opacity-0 shadow-lg transition-all duration-300 group-hover/bar:translate-y-0 group-hover/bar:opacity-100 group-focus-visible/bar:translate-y-0 group-focus-visible/bar:opacity-100`}>
                    <span className="font-medium">{row.where}</span>
                    <span className="block text-paper/70">{period}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
