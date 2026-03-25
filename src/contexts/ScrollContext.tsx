"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { navLinks } from "@/data/profile";

interface ScrollContextValue {
  containerNode: HTMLElement | null;
  setContainerNode: (node: HTMLElement | null) => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollToNextSection: () => void;
  scrollToPrevSection: () => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
  return ctx;
}

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [containerNode, setContainerNode] = useState<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToNextSection = useCallback(() => {
    const idx = sectionIds.indexOf(activeSection);
    if (idx < sectionIds.length - 1) {
      scrollToSection(sectionIds[idx + 1]);
    }
  }, [activeSection, scrollToSection]);

  const scrollToPrevSection = useCallback(() => {
    const idx = sectionIds.indexOf(activeSection);
    if (idx > 0) {
      scrollToSection(sectionIds[idx - 1]);
    }
  }, [activeSection, scrollToSection]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToNextSection();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToPrevSection();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollToNextSection, scrollToPrevSection]);

  useEffect(() => {
    if (!containerNode) return;

    const onScroll = () => {
      const scrollTop = containerNode.scrollTop;
      const viewportH = containerNode.clientHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollTop + viewportH * 0.4) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    containerNode.addEventListener("scroll", onScroll, { passive: true });
    return () => containerNode.removeEventListener("scroll", onScroll);
  }, [containerNode]);

  return (
    <ScrollContext.Provider
      value={{ containerNode, setContainerNode, activeSection, scrollToSection, scrollToNextSection, scrollToPrevSection }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
