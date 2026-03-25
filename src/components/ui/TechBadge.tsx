"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export default memo(function TechBadge({
  name,
  className,
  size = "sm",
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      {name}
    </span>
  );
});
