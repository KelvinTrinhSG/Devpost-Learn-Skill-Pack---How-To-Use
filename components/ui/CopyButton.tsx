"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/providers";

// Shows a command in mono with a Copy button. If the browser blocks the
// Clipboard API, the command text is selected so the visitor can press Ctrl+C.
export default function CopyButton({ command, label }: { command: string; label?: string }) {
  const { t } = useLang();
  const codeRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "fallback">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setState("copied");
    } catch {
      const el = codeRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setState("fallback");
    }
    window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-(--radius-sm) border border-(--border) bg-(--surface-2) py-1.5 pl-3 pr-1.5">
      {label && <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-(--text-faint) sm:inline">{label}</span>}
      <code ref={codeRef} className="figure min-w-0 flex-1 truncate text-[13px] text-(--text)">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="btn-motion shrink-0 cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold"
        style={{
          color: state === "copied" ? "var(--success)" : "var(--text)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
        aria-live="polite"
      >
        {state === "copied" ? t.copy.copied : state === "fallback" ? t.copy.fallback : t.copy.copy}
      </button>
    </div>
  );
}
