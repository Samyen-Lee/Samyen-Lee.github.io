"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechBadge from "@/components/ui/TechBadge";
import { experiences } from "@/data/profile";
import { HiChevronLeft, HiChevronRight, HiBriefcase } from "react-icons/hi";

export default function Experience() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const exp = experiences[current];

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return experiences.length - 1;
      if (next >= experiences.length) return 0;
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
        className="text-center mb-5 md:mb-8 shrink-0"
      >
        <h2 className="text-2xl md:text-4xl font-bold gradient-text inline-block mb-1 md:mb-2">
          Expériences
        </h2>
        <p className="text-zinc-400 text-xs md:text-base">
          Mon parcours professionnel dans le développement logiciel
        </p>
      </motion.div>

      <div className="w-full flex items-center gap-2 md:gap-4">
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/30 transition-colors"
          aria-label="Précédent"
        >
          <HiChevronLeft size={20} />
        </button>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={exp.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass rounded-2xl p-3 md:p-5 lg:p-6"
            >
              <div className="grid md:grid-cols-5 gap-3 md:gap-5">
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                    <div>
                      <span className="text-blue-400 text-xs font-mono mb-0.5 md:mb-1 block">
                        {exp.period}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-0.5 md:mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-zinc-400 text-xs md:text-sm">{exp.role}</p>
                    </div>
                    <HiBriefcase className="text-blue-400 text-xl shrink-0 mt-1 md:hidden" />
                  </div>

                  <p className="text-zinc-400 text-xs md:text-sm mb-1.5 md:mb-2">
                    {exp.context}
                  </p>
                  <p className="text-zinc-300 text-xs md:text-sm mb-2 md:mb-3">
                    {exp.contribution}
                  </p>

                  <div className="space-y-0.5 md:space-y-1 text-xs text-zinc-500">
                    <div>
                      <HiBriefcase className="inline mr-1" />
                      Équipe : {exp.team}
                    </div>
                    <div>Méthodologie : {exp.methodology}</div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                    {exp.domains.map((domain) => (
                      <div key={domain.title}>
                        <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 md:mb-1.5">
                          {domain.title}
                        </h4>
                        <ul className="space-y-0.5 md:space-y-1">
                          {domain.items.map((item) => (
                            <li
                              key={item}
                              className="text-zinc-400 text-xs md:text-sm pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-blue-500"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 md:gap-1.5 mt-2 md:mt-4 pt-2 md:pt-4 border-t border-white/5">
                {exp.techEnv.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => navigate(1)}
          className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/30 transition-colors"
          aria-label="Suivant"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      <div className="flex gap-2 mt-4 shrink-0">
        {experiences.map((_, i) => (
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
            aria-label={`Expérience ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
