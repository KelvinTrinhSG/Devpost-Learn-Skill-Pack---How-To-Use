"use client";

import { useState } from "react";
import type { StageText } from "@/content/en";
import { useLang } from "@/lib/providers";

// Expandable panel: purpose, file created, tip, example.
export default function StageDetails({ text }: { text: StageText }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const rows: [string, string][] = [
    [t.sim.detailPurpose, text.details.purpose],
    [t.sim.detailFile, text.details.file],
    [t.sim.detailTip, text.details.tip],
    [t.sim.detailExample, text.details.example],
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="cursor-pointer text-sm font-semibold text-(--secondary) hover:underline"
      >
        {open ? "▾ " : "▸ "}
        {open ? t.sim.hideDetails : t.sim.details}
      </button>
      {open && (
        <dl className="line-in mt-3 grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-(--radius-md) border border-(--border) bg-(--surface) p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-(--text-faint)">{label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-(--text-soft)">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
