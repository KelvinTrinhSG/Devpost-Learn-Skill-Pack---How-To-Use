import type { ReactNode } from "react";

// 9%-tint fill with a 19%-tint border.
export default function Badge({
  children,
  color = "var(--primary)",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={{
        color,
        background: `color-mix(in srgb, ${color} 9%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 19%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}
