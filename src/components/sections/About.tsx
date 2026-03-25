"use client";

import { memo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";
import { HiCode, HiBriefcase, HiChip, HiOfficeBuilding } from "react-icons/hi";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-bold gradient-text">
      {count}
      {suffix}
    </span>
  );
}

const statIcons = [HiCode, HiBriefcase, HiChip, HiOfficeBuilding];

export default memo(function About() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-4 md:px-6 max-w-6xl mx-auto w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-3">
            À propos
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
            Un aperçu rapide de mon profil et de mon parcours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
          <GlassCard hover={false}>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {profile.summary}
            </p>
          </GlassCard>

          <div className="grid grid-cols-2 gap-3">
            {profile.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <GlassCard key={stat.label} delay={i * 0.1} className="text-center py-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <Icon className="text-blue-400 text-lg" />
                    <Counter value={stat.value} suffix={stat.suffix} />
                    <span className="text-zinc-500 text-xs">
                      {stat.label}
                    </span>
                  </motion.div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
