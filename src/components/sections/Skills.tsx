"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories, skillTags } from "@/data/profile";
import {
  HiDesktopComputer,
  HiServer,
  HiDatabase,
  HiCloud,
} from "react-icons/hi";
import { FaBrain } from "react-icons/fa";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: HiDesktopComputer,
  server: HiServer,
  database: HiDatabase,
  cloud: HiCloud,
  brain: FaBrain,
};

function CompactSkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="flex items-center gap-2">
      <span className="text-zinc-400 text-xs w-20 truncate shrink-0">{name}</span>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-blue-500"
        />
      </div>
      <span className="text-zinc-600 font-mono text-[10px] w-7 text-right">{level}%</span>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center justify-start py-16 md:justify-center md:py-0 px-6 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2 md:mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-2">
          Compétences
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Technologies et outils que je maîtrise
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-1.5 mb-3 md:mb-6 max-w-3xl">
        {skillTags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.015 }}
            className="px-2 py-1 text-xs rounded-full border border-white/10 bg-white/3 text-zinc-400"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 w-full">
        {skillCategories.map((cat, i) => {
          const Icon = categoryIcons[cat.icon] || HiDesktopComputer;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl p-2 md:p-3"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icon className="text-blue-400 text-sm" />
                </div>
                <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
              </div>
              <div className="space-y-1.5">
                {cat.skills.map((skill, j) => (
                  <CompactSkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.08 + j * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
