"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FragmentData } from "./useFragments";

export function Fragment({ data, onSettle }: { data: FragmentData; onSettle: () => void }) {
  const [isPopping, setIsPopping] = useState(false);

  return (
    <motion.img
      src={data.src}
      alt=""
      draggable={false}
      className="pointer-events-auto absolute left-0 top-0 select-none"
      style={{ left: `${data.left}%`, height: data.size, width: "auto" }}
      initial={{ y: "-20vh", opacity: 0, rotate: data.rotateFrom, scale: 1, filter: "blur(0px)" }}
      animate={
        isPopping
          ? { scale: [1, 1.7, 0.2], opacity: [1, 0.55, 0], filter: ["blur(0px)", "blur(1px)", "blur(3px)"] }
          : {
              y: "120vh",
              x: [0, data.driftX, -data.driftX * 0.6, 0],
              opacity: [0, 1, 1, 0.85],
              rotate: data.rotateTo,
            }
      }
      transition={
        isPopping
          ? { duration: 0.45, ease: "easeOut" }
          : {
              default: { duration: data.duration, delay: data.delay, ease: "linear" },
              x: { duration: data.duration, delay: data.delay, ease: "easeInOut" },
              opacity: { duration: data.duration, delay: data.delay, times: [0, 0.08, 0.85, 1] },
            }
      }
      onAnimationComplete={() => onSettle()}
      onMouseEnter={() => setIsPopping(true)}
    />
  );
}
