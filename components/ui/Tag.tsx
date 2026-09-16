export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block border border-line px-3 py-1 text-[10px] uppercase tracking-widest2 text-muted">
      {children}
    </span>
  );
}
