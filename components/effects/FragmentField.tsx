"use client";

import { useFragments } from "./useFragments";
import { Fragment } from "./Fragment";

export function FragmentField({ count = 24 }: { count?: number }) {
  const { fragments, respawn } = useFragments(count);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {fragments.map((f) => (
        <Fragment key={`${f.slotId}-${f.generation}`} data={f} onSettle={() => respawn(f.slotId)} />
      ))}
    </div>
  );
}
