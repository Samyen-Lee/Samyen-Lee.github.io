"use client";

import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/profile";
import { useScrollContext } from "@/contexts/ScrollContext";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SectionDots() {
  const { activeSection, scrollToSection, scrollToNextSection, scrollToPrevSection } =
    useScrollContext();

  const isFirst = activeSection === sectionIds[0];
  const isLast = activeSection === sectionIds[sectionIds.length - 1];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3">
      <AnimatePresence>
        {!isFirst && (
          <motion.button
            key="chevron-up"
            onClick={scrollToPrevSection}
            aria-label="Section précédente"
            className="flex items-center justify-center w-7 h-7 rounded-full text-zinc-400 hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {navLinks.map((link) => {
        const section = link.href.replace("#", "");
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className="group relative flex items-center justify-end"
            aria-label={link.label}
          >
            <span className="absolute right-6 px-2 py-1 text-xs text-zinc-300 bg-[#0a0a0f]/80 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {link.label}
            </span>
            <motion.div
              className="rounded-full transition-colors"
              animate={{
                width: isActive ? 12 : 6,
                height: isActive ? 12 : 6,
                backgroundColor: isActive
                  ? "rgba(59, 130, 246, 1)"
                  : "rgba(113, 113, 122, 0.4)",
              }}
              whileHover={{
                scale: 1.4,
                backgroundColor: "rgba(59, 130, 246, 0.7)",
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        );
      })}

      <AnimatePresence>
        {!isLast && (
          <motion.button
            key="chevron-down"
            onClick={scrollToNextSection}
            aria-label="Section suivante"
            className="flex items-center justify-center w-7 h-7 rounded-full text-zinc-400 hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
