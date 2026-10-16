"use client";

import { PROJECT_FOLDER } from "@/content/stages";

// The project folder: files grouped under their parent folder, in the order they appeared.
export default function FileTree({
  files,
  fresh,
  selected,
  onSelect,
  hasDoc,
  emptyText,
}: {
  files: string[];
  fresh: string[];
  selected: string | null;
  onSelect: (path: string) => void;
  hasDoc: (path: string) => boolean;
  emptyText: string;
}) {
  const groups: { parent: string; items: string[] }[] = [];
  for (const path of files) {
    const trimmed = path.endsWith("/") ? path.slice(0, -1) : path;
    const cut = trimmed.lastIndexOf("/");
    const parent = path.slice(0, cut + 1);
    let group = groups.find((g) => g.parent === parent);
    if (!group) groups.push((group = { parent, items: [] }));
    group.items.push(path);
  }

  return (
    <div className="figure text-[12.5px] leading-6" style={{ color: "var(--term-text)" }}>
      <div style={{ color: "var(--term-dim)" }}>📁 {PROJECT_FOLDER}/</div>
      {files.length === 0 && (
        <div className="pl-4" style={{ color: "var(--term-dim)" }}>
          {emptyText}
        </div>
      )}
      {groups.map((g) => (
        <div key={g.parent} className="pl-3">
          <div style={{ color: "var(--term-dim)" }}>📁 {g.parent}</div>
          {g.items.map((path) => {
            const name = path.slice(g.parent.length);
            const isFolder = path.endsWith("/");
            const clickable = hasDoc(path);
            const isSelected = selected === path;
            return (
              <button
                key={path}
                type="button"
                disabled={!clickable}
                onClick={() => onSelect(path)}
                className={`${fresh.includes(path) ? "line-in" : ""} block w-full truncate rounded px-2 pl-4 text-left ${clickable ? "cursor-pointer hover:bg-white/5" : "cursor-default"}`}
                style={{
                  color: isSelected ? "var(--term-pink)" : isFolder ? "var(--term-violet)" : "var(--term-text)",
                  background: isSelected ? "color-mix(in srgb, var(--term-pink) 12%, transparent)" : undefined,
                }}
              >
                {isFolder ? "▸ " : "📄 "}
                {name}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
