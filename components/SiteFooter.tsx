"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/providers";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function SiteFooter() {
  const { t } = useLang();
  const f = t.footer;
  const links = [...f.videos.map((v) => ({ ...v, icon: "▶" })), { ...f.skillPack, icon: "✻" }];

  return (
    <footer id="sources" className="scroll-mt-16 border-t border-(--border) bg-(--bg-alt)">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>{f.label}</SectionLabel>
          <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{f.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-(--text-muted) sm:text-base">{f.body}</p>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {links.map((l, i) => (
            <li key={l.url}>
              <Reveal delay={i * 70} className="h-full">
                <SourceCard {...l} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--text-faint)">
          {f.unofficial}
        </p>
      </div>
    </footer>
  );
}

// Preview image for a source link: the YouTube thumbnail, or GitHub's social card for the repo.
function previewImage(url: string) {
  const video = url.match(/[?&]v=([\w-]+)/)?.[1];
  if (video) return `https://i.ytimg.com/vi/${video}/maxresdefault.jpg`;
  const repo = url.match(/github\.com\/([\w.-]+\/[\w.-]+)/)?.[1];
  if (repo) return `https://opengraph.githubassets.com/1/${repo}`;
  return null;
}

function SourceCard({ url, title, note, icon }: { url: string; title: string; note: string; icon: string }) {
  const [broken, setBroken] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const image = previewImage(url);

  // The image starts loading from the pre-rendered HTML, so it can fail before onError is attached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setBroken(true);
  }, []);
  const isVideo = icon === "▶";
  const badge = isVideo ? "#FF0033" : "linear-gradient(135deg, var(--primary), var(--primary-strong))";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface)"
    >
      <span
        className="relative block aspect-video overflow-hidden"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 20%, var(--surface-2)), color-mix(in srgb, var(--secondary) 20%, var(--surface-2)))" }}
      >
        {image && !broken && (
          // Plain <img>: the site is a static export, so Next's image optimizer isn't available.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={image}
            alt=""
            loading="lazy"
            onError={() => setBroken(true)}
            // GitHub's card is 2:1 with text near the edges, so it's shown whole on white instead of cropped.
            className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${isVideo ? "object-cover" : "bg-white object-contain px-3"}`}
          />
        )}
        <span
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg text-white transition-transform group-hover:scale-110"
          style={{
            background: badge,
            boxShadow: "var(--shadow-md)",
            // Over GitHub's card the badge would hide the repo name, so it only shows as a fallback there.
            display: isVideo || broken || !image ? "flex" : "none",
          }}
          aria-hidden
        >
          {icon}
        </span>
      </span>
      <span className="flex gap-3 p-4">
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-snug">{title} ↗</span>
          <span className="mt-1 block text-xs leading-relaxed text-(--text-dim)">{note}</span>
        </span>
      </span>
    </a>
  );
}
