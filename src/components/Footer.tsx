import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { ArrowUp } from "./icons";

export function Footer({ content }: { content: Content }) {
  const { footer, ui } = content;

  return (
    <footer className="bg-ink text-paper/60">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 border-t border-paper/20 px-5 py-8 text-[13px] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p>
          © {new Date().getFullYear()} {site.name}. {footer.built}
        </p>
        <div className="flex items-center gap-6">
          <p className="hidden items-center gap-2 md:flex">
            <kbd className="rounded border border-paper/30 px-1.5 py-0.5 font-mono text-[11px] text-paper">Ctrl K</kbd>
            {footer.hint}
          </p>
          <a href="#top" className="inline-flex items-center gap-2 text-paper transition-colors hover:text-accent-inverse">
            {ui.backToTop}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
