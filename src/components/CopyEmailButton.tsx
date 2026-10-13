"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { copyText, showToast } from "@/lib/events";
import { Check, Copy } from "./icons";

export function CopyEmailButton({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        if (!(await copyText(site.email))) return;
        setCopied(true);
        showToast(copiedLabel);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={label}
      title={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}
