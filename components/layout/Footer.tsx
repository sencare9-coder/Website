import { socialLinks } from "@/lib/data/social";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-display text-lg tracking-widest2">SensuCarens</p>

        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted">&copy; {new Date().getFullYear()} SensuCarens</p>
      </Container>
    </footer>
  );
}
