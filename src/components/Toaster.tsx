"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT } from "@/lib/events";
import { Check } from "./icons";

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2400);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 transition-all duration-500 ease-out-expo ${
        message ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {message && (
        <span className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-lg">
          <Check size={16} />
          {message}
        </span>
      )}
    </div>
  );
}
