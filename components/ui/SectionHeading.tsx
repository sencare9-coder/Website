import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-3 text-xs uppercase tracking-widest2 text-muted">{eyebrow}</p>
      <h2 className="text-display text-4xl md:text-6xl">{title}</h2>
    </div>
  );
}
