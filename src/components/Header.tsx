"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { openPalette, scrollToSection, toggleTheme } from "@/lib/events";
import { Close, Menu, Moon, Search, Sun } from "./icons";

export function Header({ content }: { content: Content }) {
  const { nav, ui } = content;
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [nav]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-baseline gap-2 text-[15px] font-medium tracking-tight"
        >
          <span className="display whitespace-nowrap text-2xl transition-colors group-hover:text-accent">Samyen Lee</span>
          <span className="label hidden sm:inline">Andriatiana</span>
        </a>

        <nav aria-label="Navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-[14px] transition-colors ${
                    active === item.id ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-full h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                      active === item.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            aria-label={ui.openPalette}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-ink hover:text-ink md:flex"
          >
            <Search size={14} />
            <kbd className="font-mono text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <a
            href={ui.switchHref}
            hrefLang={content.lang === "fr" ? "en" : "fr"}
            className="grid h-9 min-w-9 place-items-center rounded-full px-2 font-mono text-[12px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            {ui.switchLabel}
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={ui.themeToggle}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <Moon className="dark:hidden" />
            <Sun className="hidden dark:block" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-paper-2 lg:hidden"
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-6 sm:px-8 lg:hidden"
      >
        <ol className="flex flex-col">
          {nav.map((item, index) => (
            <li key={item.id} className="border-b border-line">
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                className="flex items-baseline gap-4 py-4"
              >
                <span className="label w-6">{String(index + 1).padStart(2, "0")}</span>
                <span className="display text-5xl">{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            {site.email}
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
