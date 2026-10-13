export function SectionHeading({ index, label, title }: { index: number; label: string; title: string }) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12" data-reveal>
      <p className="label lg:col-span-3">
        <span className="text-accent">{String(index).padStart(2, "0")}</span> — {label}
      </p>
      <h2 className="display max-w-[18ch] text-[clamp(2.5rem,5.6vw,5rem)] lg:col-span-9">{title}</h2>
    </div>
  );
}
