import { ArrowUpRight } from "lucide-react";
import { socialLinks, contactHref } from "@/lib/data/social";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Get in touch" title="Contact" />

        <FadeIn>
          <a
            href={contactHref}
            className="group mb-16 inline-flex items-center gap-3 border-b border-line pb-2 text-xl md:text-2xl"
          >
            Contact Us
            <ArrowUpRight
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
