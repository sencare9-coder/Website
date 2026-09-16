import Image from "next/image";
import { works } from "@/lib/data/discography";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function Discography() {
  return (
    <section id="works" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Discography" title="Works" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {works.map((work, i) => (
            <FadeIn key={work.id} delay={i * 0.06}>
              <div className="group relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg/90 via-bg/0 to-bg/0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-widest2 text-muted">
                    {work.type} · {work.year}
                  </p>
                  <p className="text-display text-lg">{work.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
