import type { Content } from "@/content/types";
import { About } from "./About";
import { CommandPalette } from "./CommandPalette";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Expertise } from "./Expertise";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { Marquee } from "./Marquee";
import { Projects } from "./Projects";
import { RevealObserver } from "./RevealObserver";
import { ScrollProgress } from "./ScrollProgress";
import { Toaster } from "./Toaster";

export function Portfolio({ content }: { content: Content }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {content.ui.skipToContent}
      </a>
      <ScrollProgress />
      <Header content={content} />
      <main id="main" className="overflow-x-clip">
        <Hero content={content} />
        <Marquee content={content} />
        <About content={content} />
        <Experience content={content} />
        <Projects content={content} />
        <Expertise content={content} />
        <Education content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <CommandPalette content={content} />
      <Toaster />
      <RevealObserver />
      <JsonLd content={content} />
    </>
  );
}
