"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { education } from "@/data/profile";
import { HiAcademicCap, HiLocationMarker } from "react-icons/hi";

export default memo(function Education() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center px-4 md:px-6 max-w-6xl mx-auto w-full py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 md:mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-3">
          Formation
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Mon parcours académique
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-3 md:gap-4 w-full">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass rounded-2xl p-3 md:p-5 hover:border-blue-500/20 transition-colors flex flex-col"
          >
            <span className="text-blue-400 text-xs font-mono mb-3 block">
              {edu.period}
            </span>

            <h3 className="text-sm md:text-base font-semibold text-white mb-2 leading-snug">
              {edu.degree}
            </h3>

            <div className="space-y-1 text-xs text-zinc-400 mb-4">
              <span className="flex items-center gap-1">
                <HiAcademicCap className="text-blue-400" />
                {edu.school}
              </span>
              <span className="flex items-center gap-1">
                <HiLocationMarker className="text-blue-400" />
                {edu.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {edu.highlights.map((h) => (
                <span
                  key={h}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
