"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FragmentField } from "@/components/effects/FragmentField";
import { fadeIn, fadeUp } from "@/lib/animations";
import { assetPath } from "@/lib/basePath";

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-bg">
      <Image
        src={assetPath("/images/hero/hero-wide.jpg")}
        alt="SensuCarens"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-80"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg/40 via-bg/20 to-bg" />

      <FragmentField count={24} />

      <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-display text-[11vw] leading-[0.85] md:text-[9vw]"
        >
          SensuCarens
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs uppercase tracking-widest2 text-muted md:text-sm"
        >
          Vo. 千秋 &nbsp;/&nbsp; Gt. まつじゅん &nbsp;/&nbsp; Ba. 恭亮 &nbsp;/&nbsp; Dr. 晃次郎
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase tracking-widest2 text-muted"
      >
        Scroll
      </motion.div>
    </section>
  );
}
