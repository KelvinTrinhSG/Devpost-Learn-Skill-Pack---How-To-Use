import type { ReactNode } from "react";

// Uppercase pill label in the primary color, above section headings.
export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
      style={{
        color: "var(--primary)",
        background: "color-mix(in srgb, var(--primary) 9%, transparent)",
        border: "1px solid color-mix(in srgb, var(--primary) 19%, transparent)",
      }}
    >
      {children}
    </span>
  );
}
