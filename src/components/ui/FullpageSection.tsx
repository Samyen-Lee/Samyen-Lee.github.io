"use client";

import { useRef, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSectionVisible } from "@/lib/hooks";

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
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useSectionVisible(sectionRef);

  const backgroundWithVisibility =
    background && isValidElement(background)
      ? cloneElement(background as ReactElement<{ isVisible?: boolean }>, { isVisible })
      : background;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative h-screen w-full snap-start snap-always overflow-hidden",
        className
      )}
    >
      {backgroundWithVisibility && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {backgroundWithVisibility}
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
