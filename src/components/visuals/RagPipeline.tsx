"use client";

import { useEffect, useState } from "react";
import type { Step } from "@/content/types";
import { useInView } from "@/lib/useInView";
import { Replay } from "../icons";

export function RagPipeline({
  steps,
  question,
  answer,
  replayLabel,
}: {
  steps: Step[];
  question: string;
  answer: string;
  replayLabel: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [active, setActive] = useState(-1);
  const [autoplay, setAutoplay] = useState(true);
  const done = active === steps.length - 1;
  const progress = Math.max(active, 0) / (steps.length - 1);

  useEffect(() => {
    if (!inView || !autoplay || done) return;
    const timer = setTimeout(() => setActive((i) => i + 1), active < 0 ? 500 : 1900);
    return () => clearTimeout(timer);
  }, [inView, autoplay, active, done]);

  const replay = () => {
    setActive(-1);
    setAutoplay(true);
  };

  return (
    <div ref={ref}>
      <p className="display text-[1.45rem] italic leading-snug text-ink">{question}</p>

      <div className="relative mt-6">
        <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-6 w-px bg-line-strong" />
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[15px] top-6 w-px origin-top bg-accent transition-transform duration-700 ease-out-expo"
          style={{ transform: `scaleY(${progress})` }}
        />
        <ol className="relative">
          {steps.map((step, i) => {
            const state = i < active ? "done" : i === active ? "active" : "todo";
            return (
              <li key={step.label}>
                <button
                  type="button"
                  onClick={() => {
                    setAutoplay(false);
                    setActive(i);
                  }}
                  aria-current={state === "active" ? "step" : undefined}
                  className="group flex w-full items-start gap-4 py-2 text-left"
                >
                  <span
                    className={`relative z-10 grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors duration-300 ${
                      state === "active"
                        ? "border-accent bg-accent text-accent-ink"
                        : state === "done"
                          ? "border-ink bg-ink text-paper"
                          : "border-line-strong bg-paper-2 text-ink-3 group-hover:border-ink"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span
                      className={`block text-[15px] font-medium transition-colors ${
                        state === "todo" ? "text-ink-3 group-hover:text-ink" : "text-ink"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="accordion-panel" data-open={state === "active"}>
                      <span className="block">
                        <span className="block pt-1 text-[14px] leading-snug text-ink-2">{step.detail}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
        <p
          aria-live="polite"
          className={`text-[14px] leading-snug transition-all duration-700 ease-out-expo ${
            done ? "translate-y-0 text-ink opacity-100" : "translate-y-1 text-ink-3 opacity-40"
          }`}
        >
          <span className="mr-2 text-accent" aria-hidden="true">
            →
          </span>
          {answer}
        </p>
        <button
          type="button"
          onClick={replay}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          <Replay size={14} />
          {replayLabel}
        </button>
      </div>
    </div>
  );
}
