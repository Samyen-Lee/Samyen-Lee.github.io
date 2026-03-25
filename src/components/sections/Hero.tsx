"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import AnimatedText from "@/components/ui/AnimatedText";
import { profile } from "@/data/profile";
import { HiArrowDown } from "react-icons/hi";
import { useScrollContext } from "@/contexts/ScrollContext";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-background" />,
});

export default function Hero() {
  const { scrollToSection, activeSection } = useScrollContext();
  const isVisible = activeSection === "hero";

  return (
    <div className="relative h-full flex items-center justify-center">
      <Suspense fallback={null}>
        <div className="absolute inset-0 -z-10">
          <HeroScene paused={!isVisible} />
        </div>
      </Suspense>

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedText text={profile.name} delay={0.2} />
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-400 mb-3">
            <AnimatedText text={profile.title} delay={0.5} />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto"
          >
            {profile.subtitle} — {profile.yearsOfExperience}{' '}ans d&apos;expérience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              Voir mes projets
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20 font-medium transition-all active:scale-95"
            >
              Me contacter
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="text-zinc-500 hover:text-blue-400 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <HiArrowDown size={24} />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}
