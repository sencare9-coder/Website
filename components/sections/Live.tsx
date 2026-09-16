import { liveEvents } from "@/lib/data/live";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const STATUS_LABEL: Record<NonNullable<(typeof liveEvents)[number]["status"]>, string> = {
  upcoming: "Ticket",
  soldout: "Sold Out",
  ended: "Ended",
};

export function Live() {
  return (
    <section id="live" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Schedule" title="Live" />

        <ul className="divide-y divide-line border-t border-line">
          {liveEvents.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.06}>
              <li className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-7">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
                  <span className="text-xs text-muted md:w-28">{event.date}</span>
                  <span className="text-sm text-ink md:text-base">{event.title}</span>
                  <span className="text-xs text-muted">
                    {event.venue} / {event.city}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest2 text-muted">
                  {event.status ? STATUS_LABEL[event.status] : ""}
                </span>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
