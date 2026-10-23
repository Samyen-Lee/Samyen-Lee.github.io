import type { ReactNode } from "react";
import { display, mono, sans } from "@/app/fonts";
import { InlineScript } from "./InlineScript";
import type { Lang } from "@/content/types";
import "@/app/globals.css";

const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})()`;

export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html
      lang={lang}
      data-theme="light"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>{children}</body>
    </html>
  );
}
