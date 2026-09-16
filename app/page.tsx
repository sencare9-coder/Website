import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { About } from "@/components/sections/About";
import { Discography } from "@/components/sections/Discography";
import { MusicCarousel } from "@/components/sections/MusicCarousel";
import { Live } from "@/components/sections/Live";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <News />
        <About />
        <Discography />
        <MusicCarousel />
        <Live />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
