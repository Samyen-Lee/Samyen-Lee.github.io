"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useScrollContext } from "@/contexts/ScrollContext";

export default function ScrollProgress() {
  const { containerNode } = useScrollContext();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerNode) return;

    const onScroll = () => {
      const scrollTop = containerNode.scrollTop;
      const scrollHeight = containerNode.scrollHeight - containerNode.clientHeight;
      if (scrollHeight > 0) {
        progress.set(scrollTop / scrollHeight);
      }
    };

    containerNode.addEventListener("scroll", onScroll, { passive: true });
    return () => containerNode.removeEventListener("scroll", onScroll);
  }, [mounted, containerNode, progress]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-60"
      style={{ scaleX }}
    />
  );
}
