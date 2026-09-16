"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { musicVideos } from "@/lib/data/music";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

function VideoCard({ video }: { video: (typeof musicVideos)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-[80vw] shrink-0 snap-start overflow-hidden bg-surface md:w-[420px]">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${video.title}`}
          className="group relative block h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={video.title}
            fill
            sizes="(min-width: 768px) 420px, 80vw"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-bg/30 transition-colors duration-300 group-hover:bg-bg/10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/70 bg-bg/60 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Play size={20} className="ml-1 text-ink" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function MusicCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  return (
    <section id="music" className="py-24 md:py-32">
      <Container className="max-w-none px-0 md:px-0">
        <div className="mx-auto w-full max-w-content px-6 md:px-12">
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <SectionHeading eyebrow="Youtube" title="Music" className="mb-0" />
            <div className="hidden gap-3 md:flex">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollByAmount(-1)}
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollByAmount(1)}
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <FadeIn>
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {musicVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
