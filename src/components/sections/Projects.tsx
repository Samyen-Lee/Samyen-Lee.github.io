"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechBadge from "@/components/ui/TechBadge";
import { projects } from "@/data/profile";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCalendar,
  HiUserCircle,
  HiCheckCircle,
} from "react-icons/hi";

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const project = projects[current];

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col items-center px-4 md:px-6 max-w-5xl mx-auto w-full py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3 md:mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-2">
          Projets
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Quelques réalisations marquantes de mon parcours
        </p>
      </motion.div>

      <div className="w-full flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/30 transition-colors"
          aria-label="Précédent"
        >
          <HiChevronLeft size={20} />
        </button>

        <div className="flex-1 relative overflow-hidden min-h-[280px] md:min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass rounded-2xl p-4 md:p-8"
            >
              <div className="flex items-center gap-2 mb-3">
                <HiCalendar className="text-blue-400 text-sm" />
                <span className="text-blue-400 text-xs font-mono">
                  {project.period}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-xs mb-3">{project.company}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
                <HiUserCircle className="text-blue-400" />
                {project.role}
              </div>

              <div className="grid sm:grid-cols-2 gap-1.5 mb-4">
                {project.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-xs text-zinc-400">
                    <HiCheckCircle className="text-blue-400 mt-0.5 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => navigate(1)}
          className="shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/30 transition-colors"
          aria-label="Suivant"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? "bg-blue-500 w-6"
                : "bg-zinc-600 hover:bg-zinc-500"
            }`}
            aria-label={`Projet ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
