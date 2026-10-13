"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-visible)";

export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const observeAll = () => document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
    observeAll();

    // Elements mounted later (e.g. after a re-render with new keys) must be observed too
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
