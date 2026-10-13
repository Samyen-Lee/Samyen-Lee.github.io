"use client";

import { useState } from "react";
import type { Content } from "@/content/types";
import { Hash, Lock, Unlock } from "../icons";

const LEVELS = ["A", "B", "C"] as const;
const LOGINS = ["OneKey", "DocCheck", "SelfCert"];

export function AccessLevels({ labels }: { labels: Content["projects"]["access"] }) {
  const [level, setLevel] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="label mr-2">{labels.loginLabel}</span>
        {LOGINS.map((login) => (
          <span
            key={login}
            className="rounded-full border border-line-strong bg-paper px-3 py-1 font-mono text-[12px] text-ink-2"
          >
            {login}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <p className="label mb-3" id="access-level-label">
          {labels.levelLabel}
        </p>
        <div
          role="radiogroup"
          aria-labelledby="access-level-label"
          className="relative grid grid-cols-3 rounded-full border border-line-strong bg-paper p-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 rounded-full bg-ink transition-transform duration-500 ease-out-expo"
            style={{ width: "calc((100% - 0.5rem) / 3)", transform: `translateX(${level * 100}%)` }}
          />
          {LEVELS.map((name, i) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={level === i}
              tabIndex={level === i ? 0 : -1}
              onClick={() => setLevel(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight" ? Math.min(i + 1, 2) : event.key === "ArrowLeft" ? Math.max(i - 1, 0) : i;
                if (next === i) return;
                event.preventDefault();
                setLevel(next);
                (event.currentTarget.parentElement?.querySelectorAll("button")[next] as HTMLButtonElement)?.focus();
              }}
              className={`relative z-10 rounded-full py-2 font-mono text-[14px] transition-colors duration-300 ${
                level === i ? "text-paper" : "text-ink-2 hover:text-ink"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-3">
        {LEVELS.map((name, i) => {
          const open = i <= level;
          return (
            <li
              key={name}
              className={`flex min-h-[148px] flex-col justify-between rounded-xl border p-4 transition-all duration-500 ease-out-expo ${
                open ? "border-ink bg-paper text-ink" : "border-dashed border-line-strong text-ink-3"
              }`}
              style={{ transitionDelay: `${open ? i * 80 : 0}ms` }}
            >
              <span className="flex items-center justify-between">
                <span className="display text-4xl">{name}</span>
                {open ? <Unlock size={18} className="text-accent" /> : <Lock size={18} />}
              </span>
              <span>
                <span className="block text-[13px]">
                  {labels.content} {name}
                </span>
                <span className="label mt-1 block text-[10px]">{open ? labels.unlocked : labels.locked}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 flex gap-3 border-t border-line pt-5 text-[14px] leading-snug text-ink-2">
        <Hash size={16} className="mt-0.5 shrink-0 text-accent" />
        {labels.extras}
      </p>
    </div>
  );
}
