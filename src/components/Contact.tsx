import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { CopyEmailButton } from "./CopyEmailButton";
import { ArrowUpRight, Download, Github, Linkedin } from "./icons";

export function Contact({ content }: { content: Content }) {
  const { contact, ui } = content;
  const links = [
    { label: "LinkedIn", href: site.linkedin, icon: <Linkedin size={18} />, external: true },
    { label: "GitHub", href: site.github, icon: <Github size={18} />, external: true },
    { label: ui.downloadCv, href: site.cv, icon: <Download size={18} />, external: true },
  ];

  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <p className="label border-t border-paper/20 pt-6 text-paper/60" data-reveal>
          <span className="text-accent">06</span> — {contact.label}
        </p>

        <h2 className="display mt-10 max-w-[16ch] text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.95]" data-reveal>
          {contact.title}{" "}
          <em className="whitespace-nowrap text-accent">{contact.titleEmphasis}</em>
        </h2>
        <p className="mt-8 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-relaxed text-paper/70" data-reveal>
          {contact.text}
        </p>

        <div className="mt-16 grid gap-12 border-t border-paper/20 pt-10 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-8">
            <p className="label mb-4 text-paper/50">{contact.emailLabel}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="display bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-[clamp(1.6rem,4.2vw,3.5rem)] leading-tight transition-[background-size,color] duration-700 ease-out-expo [overflow-wrap:anywhere] hover:bg-[length:100%_1px] hover:text-accent"
              >
                {site.email}
              </a>
              <CopyEmailButton label={ui.copyEmail} copiedLabel={ui.copied} />
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="label mb-4 text-paper/50">{contact.elsewhere}</p>
            <ul className="border-t border-paper/20">
              {links.map((link) => (
                <li key={link.label} className="border-b border-paper/20">
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 py-4 text-[16px] transition-colors hover:text-accent"
                  >
                    {link.icon}
                    <span className="flex-1">{link.label}</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
