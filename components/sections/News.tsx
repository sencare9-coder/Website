import { newsItems } from "@/lib/data/news";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeIn } from "@/components/ui/FadeIn";

export function News() {
  return (
    <section id="news" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Information" title="News" />

        <ul className="divide-y divide-line border-t border-line">
          {newsItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <li className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:gap-8 md:py-7">
                <span className="text-xs text-muted md:w-28">{item.date}</span>
                <Tag>{item.category}</Tag>
                <span className="text-sm text-ink md:text-base">{item.title}</span>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
