"use client";

import { useCallback, useEffect, useState } from "react";

const FRAGMENT_IMAGE_COUNT = 103;

export type FragmentData = {
  slotId: number;
  generation: number;
  src: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rotateFrom: number;
  rotateTo: number;
};

function randomFragment(slotId: number, generation: number, initial: boolean): FragmentData {
  const num = Math.floor(Math.random() * FRAGMENT_IMAGE_COUNT) + 1;
  return {
    slotId,
    generation,
    src: `/images/fragments/${String(num).padStart(3, "0")}.png`,
    left: Math.random() * 92 + 2,
    size: Math.random() * 34 + 26,
    duration: Math.random() * 10 + 16,
    delay: initial ? Math.random() * 16 : Math.random() * 2.5,
    driftX: Math.random() * 60 + 20,
    rotateFrom: Math.random() * 40 - 20,
    rotateTo: Math.random() * 280 + 40,
  };
}

export function useFragments(count: number) {
  const [fragments, setFragments] = useState<FragmentData[]>([]);

  useEffect(() => {
    // Randomized on mount only, client-side, to avoid an SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFragments(Array.from({ length: count }, (_, i) => randomFragment(i, 0, true)));
  }, [count]);

  const respawn = useCallback((slotId: number) => {
    setFragments((prev) =>
      prev.map((f) => (f.slotId === slotId ? randomFragment(slotId, f.generation + 1, false) : f))
    );
  }, []);

  return { fragments, respawn };
}
