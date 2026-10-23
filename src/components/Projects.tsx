import type { Content, Project } from "@/content/types";
import { site } from "@/content/site";
import { ArrowUpRight, Github } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { AccessLevels } from "./visuals/AccessLevels";
import { DeliveryPipeline } from "./visuals/DeliveryPipeline";
import { RagPipeline } from "./visuals/RagPipeline";

function Visual({ project, content }: { project: Project; content: Content }) {
  const { projects } = content;
  switch (project.visual) {
    case "rag":
      return (
        <RagPipeline
          steps={project.steps ?? []}
          question={projects.rag.question}
          answer={projects.rag.answer}
          replayLabel={projects.rag.replay}
        />
      );
    case "access":
      return <AccessLevels labels={projects.access} />;
    case "delivery":
      return <DeliveryPipeline steps={project.steps ?? []} replayLabel={projects.delivery.replay} />;
  }
}

export function Projects({ content }: { content: Content }) {
  const { projects } = content;

  return (
    <section id="projects" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading index={3} label={projects.label} title={projects.title} />

      <div className="mt-14 lg:mt-20">
        {projects.items.map((project, i) => (
          <article
            key={project.id}
            aria-labelledby={`project-${project.id}`}
            className="grid gap-10 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
          >
            <div className="lg:col-span-5" data-reveal>
              <p className="label flex items-center gap-3">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                {project.period}
              </p>
              <h3 id={`project-${project.id}`} className="display mt-6 text-[clamp(2.75rem,5vw,4.5rem)]">
                {project.title}
              </h3>
              <p className="display mt-2 text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium text-ink-2">{project.kicker}</p>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-2">{project.summary}</p>

              <p className="mt-6 text-[14px]">
                <span className="label mr-2">{projects.roleLabel}</span>
                <span className="text-ink">{project.role}</span>
              </p>

              <ul className="mt-6 space-y-2 border-t border-line pt-6 text-[15px] text-ink">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-ink-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="label text-ink">{project.visualTitle}</p>
                  <p className="text-[13px] text-ink-3">{project.visualCaption}</p>
                </div>
                <Visual project={project} content={content} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-end border-t border-line pt-8" data-reveal>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-[15px] text-ink-2 transition-colors hover:text-accent"
        >
          <Github size={18} />
          {projects.githubCta}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}
