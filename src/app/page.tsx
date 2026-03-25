"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { ScrollProvider, useScrollContext } from "@/contexts/ScrollContext";
import FullpageSection from "@/components/ui/FullpageSection";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

import GradientMeshBg from "@/components/backgrounds/GradientMeshBg";
import AuroraBeamsBg from "@/components/backgrounds/AuroraBeamsBg";
import GeometricShapesBg from "@/components/backgrounds/GeometricShapesBg";
import ConstellationBg from "@/components/backgrounds/ConstellationBg";
import RadialGlowBg from "@/components/backgrounds/RadialGlowBg";

const Navbar = dynamic(() => import("@/components/ui/Navbar"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), {
  ssr: false,
});
const SectionDots = dynamic(() => import("@/components/ui/SectionDots"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const DotGridWaveBg = dynamic(
  () => import("@/components/backgrounds/DotGridWaveBg"),
  { ssr: false }
);

function ScrollContainer() {
  const { setContainerNode } = useScrollContext();

  const refCallback = useCallback(
    (node: HTMLElement | null) => {
      setContainerNode(node);
    },
    [setContainerNode]
  );

  return (
    <main
      ref={refCallback}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
    >
      <FullpageSection id="hero">
        <Hero />
      </FullpageSection>

      <FullpageSection id="about" background={<GradientMeshBg />}>
        <About />
      </FullpageSection>

      <FullpageSection id="experience" background={<AuroraBeamsBg />}>
        <Experience />
      </FullpageSection>

      <FullpageSection id="skills" background={<DotGridWaveBg />}>
        <Skills />
      </FullpageSection>

      <FullpageSection id="projects" background={<GeometricShapesBg />}>
        <Projects />
      </FullpageSection>

      <FullpageSection id="education" background={<ConstellationBg />}>
        <Education />
      </FullpageSection>

      <FullpageSection id="contact" background={<RadialGlowBg />}>
        <Contact />
      </FullpageSection>
    </main>
  );
}

export default function Home() {
  return (
    <ScrollProvider>
      <ScrollProgress />
      <Navbar />
      <SectionDots />
      <ScrollContainer />
    </ScrollProvider>
  );
}
