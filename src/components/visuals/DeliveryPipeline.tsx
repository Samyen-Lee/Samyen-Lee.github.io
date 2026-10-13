"use client";

import { useEffect, useState } from "react";
import type { Step } from "@/content/types";
import { useInView } from "@/lib/useInView";
import { Replay } from "../icons";

const DURATION_MS = 4200;

export function DeliveryPipeline({ steps, replayLabel }: { steps: Step[]; replayLabel: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (inView) setPlaying(true);
  }, [inView]);

  return (
    <div ref={ref}>
      {/* Changing the key remounts the list, which restarts the CSS animations */}
      <ol key={run} className={`pipeline relative grid gap-5 sm:grid-cols-6 sm:gap-2 ${playing ? "is-playing" : ""}`}>
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[17px] top-4 w-px bg-line-strong sm:bottom-auto sm:left-[8.333%] sm:right-[8.333%] sm:top-[17px] sm:h-px sm:w-auto"
        />
        <span aria-hidden="true" className="pipeline-fill absolute bg-accent" />
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="relative flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center"
            style={{ "--node-delay": `${(i / (steps.length - 1)) * DURATION_MS}ms` } as React.CSSProperties}
          >
            <span className="pipeline-node relative z-10 grid h-[35px] w-[35px] shrink-0 place-items-center rounded-full border border-line-strong bg-paper font-mono text-[11px] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pipeline-label text-[13px] leading-tight text-ink-3">{step.label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-end border-t border-line pt-5">
        <button
          type="button"
          onClick={() => {
            setRun((r) => r + 1);
            setPlaying(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          <Replay size={14} />
          {replayLabel}
        </button>
      </div>
    </div>
  );
}
