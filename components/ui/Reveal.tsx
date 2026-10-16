"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades and slides its children in the first time they scroll into view (one-shot).
// Reduced motion is handled globally in globals.css.
export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity var(--duration-slow) var(--ease-out) ${delay}ms, transform var(--duration-slow) var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
