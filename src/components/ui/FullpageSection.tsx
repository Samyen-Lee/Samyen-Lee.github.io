"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FullpageSectionProps {
  id: string;
  background?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function FullpageSection({
  id,
  background,
  children,
  className,
}: FullpageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative h-screen w-full snap-start snap-always overflow-hidden",
        className
      )}
    >
      {background && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {background}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 h-full w-full flex flex-col min-h-0"
      >
        {children}
      </motion.div>
    </section>
  );
}
