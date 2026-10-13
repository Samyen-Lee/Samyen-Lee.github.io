"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { PALETTE_EVENT, copyText, scrollToSection, showToast, toggleTheme } from "@/lib/events";
import { ArrowUpRight, Copy, Download, Github, Globe, Hash, Linkedin, Mail, Moon, Search } from "./icons";

interface Command {
  id: string;
  group: string;
  label: string;
  icon: ReactNode;
  run: () => void;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function CommandPalette({ content }: { content: Content }) {
  const { palette, nav, ui } = content;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(
    () => [
      ...nav.map((item) => ({
        id: `go-${item.id}`,
        group: palette.groups.navigate,
        label: item.label,
        icon: <Hash size={16} />,
        run: () => scrollToSection(item.id),
      })),
      {
        id: "copy-email",
        group: palette.groups.actions,
        label: palette.actions.copyEmail,
        icon: <Copy size={16} />,
        run: () => {
          copyText(site.email).then((ok) => ok && showToast(ui.copied));
        },
      },
      {
        id: "download-cv",
        group: palette.groups.actions,
        label: palette.actions.downloadCv,
        icon: <Download size={16} />,
        run: () => window.open(site.cv, "_blank", "noopener"),
      },
      {
        id: "theme",
        group: palette.groups.actions,
        label: palette.actions.toggleTheme,
        icon: <Moon size={16} />,
        run: toggleTheme,
      },
      {
        id: "lang",
        group: palette.groups.actions,
        label: palette.actions.switchLang,
        icon: <Globe size={16} />,
        run: () => window.location.assign(ui.switchHref),
      },
      {
        id: "email",
        group: palette.groups.links,
        label: palette.actions.email,
        icon: <Mail size={16} />,
        run: () => window.location.assign(`mailto:${site.email}`),
      },
      {
        id: "linkedin",
        group: palette.groups.links,
        label: palette.actions.linkedin,
        icon: <Linkedin size={16} />,
        run: () => window.open(site.linkedin, "_blank", "noopener"),
      },
      {
        id: "github",
        group: palette.groups.links,
        label: palette.actions.github,
        icon: <Github size={16} />,
        run: () => window.open(site.github, "_blank", "noopener"),
      },
    ],
    [nav, palette, ui],
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((command) => normalize(`${command.label} ${command.group}`).includes(q));
  }, [commands, query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, show);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    setOpen(false);
    // Let the dialog unmount before scrolling or opening a new tab
    requestAnimationFrame(command.run);
  };

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  if (!open) return null;

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]">
      <button
        type="button"
        aria-label={ui.closeMenu}
        tabIndex={-1}
        onClick={hide}
        className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ui.openPalette}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={18} className="shrink-0 text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder={palette.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            className="h-14 w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3 focus-visible:outline-none"
          />
          <kbd className="label rounded border border-line px-1.5 py-0.5 text-[10px]">Esc</kbd>
        </div>
        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-ink-3">{palette.empty}</li>}
          {results.map((command, i) => {
            const header = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {header && <div className="label px-3 pb-1.5 pt-3">{header}</div>}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={i === index}
                  data-index={i}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(command)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                    i === index ? "bg-paper-2 text-ink" : "text-ink-2"
                  }`}
                >
                  <span className={i === index ? "text-accent" : "text-ink-3"}>{command.icon}</span>
                  <span className="flex-1">{command.label}</span>
                  {i === index && <ArrowUpRight size={14} className="text-ink-3" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2 border-t border-line px-5 py-2.5 text-[12px] text-ink-3">
          <kbd className="font-mono">↑↓</kbd>
          <span>{palette.hint}</span>
          <kbd className="ml-3 font-mono">↵</kbd>
          <span>OK</span>
        </div>
      </div>
    </div>
  );
}
