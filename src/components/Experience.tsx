"use client";

import { useState } from "react";
import type { Content } from "@/content/types";
import { ArrowUpRight } from "./icons";
import { SectionHeading } from "./SectionHeading";

export function Experience({ content }: { content: Content }) {
  const { experience, ui } = content;
  const [openId, setOpenId] = useState<string | null>(experience.items[0]?.id ?? null);

  return (
    <section id="experience" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading index={2} label={experience.label} title={experience.title} />

      <ol className="mt-14 border-b border-line lg:mt-20">
        {experience.items.map((item, i) => {
          const open = openId === item.id;
          const panelId = `exp-panel-${item.id}`;
          return (
            <li
              key={item.id}
              className="border-t border-line"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-7 text-left lg:grid-cols-12 lg:py-9"
                >
                  <span className="label col-span-2 lg:col-span-3">{item.period}</span>
                  <span className="lg:col-span-6">
                    <span
                      className={`display block text-[clamp(2.1rem,4.4vw,3.75rem)] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 ${
                        open ? "text-accent" : "text-ink"
                      }`}
                    >
                      {item.company}
                    </span>
                    <span className="mt-1 block text-[15px] text-ink-2">{item.role}</span>
                  </span>
                  <span className="hidden text-[13px] text-ink-3 lg:col-span-2 lg:block">{item.employer}</span>
                  <span className="flex justify-end lg:col-span-1">
                    <span
                      aria-hidden="true"
                      className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 ${
                        open
                          ? "border-accent bg-accent text-accent-ink"
                          : "border-line-strong text-ink group-hover:border-ink"
                      }`}
                    >
                      <span className="absolute h-px w-4 bg-current" />
                      <span
                        className={`absolute h-4 w-px bg-current transition-transform duration-500 ease-out-expo ${
                          open ? "rotate-90 scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </span>
                </button>
              </h3>

              <div id={panelId} className="accordion-panel" data-open={open} inert={!open}>
                <div>
                  <div className="grid gap-10 pb-12 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <p className="label text-ink-3 lg:hidden">{item.employer}</p>
                    </div>
                    <div className="space-y-10 lg:col-span-9">
                      <p className="max-w-[54ch] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-relaxed text-ink">
                        {item.summary}
                      </p>

                      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="label mb-3">{group.title}</p>
                            <ul className="space-y-2 text-[15px] leading-snug text-ink-2">
                              {group.items.map((line) => (
                                <li key={line} className="flex gap-3">
                                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <dl className="grid gap-6 border-t border-line pt-6 text-[14px] sm:grid-cols-2">
                        <div>
                          <dt className="label mb-2">{experience.contextLabel}</dt>
                          <dd className="leading-relaxed text-ink-2">{item.context}</dd>
                        </div>
                        <div>
                          <dt className="label mb-2">{experience.teamLabel}</dt>
                          <dd className="leading-relaxed text-ink-2">{item.team}</dd>
                        </div>
                      </dl>

                      <div className="flex flex-wrap items-center justify-between gap-6">
                        <ul className="flex flex-wrap gap-2" aria-label={experience.stackLabel}>
                          {item.stack.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-ink-2"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link inline-flex items-center gap-1.5 text-[14px] text-ink-2 hover:text-accent"
                          >
                            {ui.viewSite}
                            <ArrowUpRight
                              size={14}
                              className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
