import Image from "next/image";
import { members } from "@/lib/data/members";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { assetPath } from "@/lib/basePath";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Statement" title="About" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden bg-surface">
              <Image
                src={assetPath("/images/profile/profile.jpg")}
                alt="SensuCarens"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex flex-col justify-between gap-12">
            <p className="text-balance text-lg leading-relaxed text-ink/90 md:text-xl">
              静けさの中に、確かな熱を。削ぎ落とした音と言葉で、
              日常の奥にある感情の輪郭をなぞる。SensuCarensは、
              過剰さを避けながらも、聴く者の記憶に長く残る景色を鳴らし続ける。
            </p>

            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {members.map((member) => (
                <li key={member.part} className="text-sm text-muted">
                  <span className="mr-2 text-ink">{member.part}</span>
                  {member.name}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
