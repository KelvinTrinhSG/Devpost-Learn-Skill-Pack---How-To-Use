"use client";

import { useState, type ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CARD_IDS, previewVerdict, type CardId, type Zone } from "@/content/decisions";
import { useLang, useSound } from "@/lib/providers";
import Button from "@/components/ui/Button";
import AppPreview from "./AppPreview";

const START: Record<CardId, Zone> = Object.fromEntries(CARD_IDS.map((id) => [id, "tray"])) as Record<CardId, Zone>;

// Drag decision cards between "AI decides" and "You decide"; the app preview reacts to every drop.
// Mouse, touch (press and hold briefly, so the page still scrolls), and keyboard all work.
export default function DecisionGame() {
  const { t } = useLang();
  const { play } = useSound();
  const g = t.why.game;
  const [positions, setPositions] = useState(START);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  function onDragEnd(e: DragEndEvent) {
    const zone = e.over?.id as Zone | undefined;
    const id = e.active.id as CardId;
    if (!zone || positions[id] === zone) return;
    setPositions((p) => ({ ...p, [id]: zone }));
    play("drop");
  }

  const count = (z: Zone) => CARD_IDS.filter((id) => positions[id] === z).length;
  const verdict = previewVerdict(count("you"));
  const verdictColor = { generic: "var(--text-dim)", mixed: "var(--gold)", personal: "var(--success)" }[verdict];

  const cardsIn = (z: Zone) =>
    CARD_IDS.filter((id) => positions[id] === z).map((id) => <DecisionCard key={id} id={id} label={g.cards[id]} />);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      {/* A fixed id keeps dnd-kit's generated ids identical in the pre-rendered HTML and the browser. */}
      <DndContext id="decision-game" sensors={sensors} onDragEnd={onDragEnd}>
        <div className="space-y-4">
          <DropZone id="tray" title={g.tray} empty={g.dropHere} tone="var(--text-faint)" dashed>
            {cardsIn("tray")}
          </DropZone>
          <div className="grid gap-4 sm:grid-cols-2">
            <DropZone id="ai" title={g.zoneAi} empty={g.dropHere} tone="var(--secondary)">
              {cardsIn("ai")}
            </DropZone>
            <DropZone id="you" title={g.zoneYou} empty={g.dropHere} tone="var(--primary)">
              {cardsIn("you")}
            </DropZone>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="figure text-xs text-(--text-dim)">
              {g.count
                .replace("{ai}", String(count("ai")))
                .replace("{you}", String(count("you")))
                .replace("{tray}", String(count("tray")))}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPositions(START)}>
              ↺ {g.reset}
            </Button>
          </div>
        </div>
      </DndContext>

      <div className="space-y-4">
        <p
          key={verdict}
          className="line-in text-center text-sm font-bold"
          style={{ color: verdictColor }}
          data-verdict={verdict}
        >
          {g.verdicts[verdict]}
        </p>
        <AppPreview positions={positions} />
      </div>
    </div>
  );
}

function DropZone({
  id,
  title,
  empty,
  tone,
  dashed,
  children,
}: {
  id: Zone;
  title: string;
  empty: string;
  tone: string;
  dashed?: boolean;
  children: ReactNode[];
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      data-zone={id}
      className="min-h-[120px] rounded-(--radius-lg) p-3 transition-all"
      style={{
        background: isOver ? `color-mix(in srgb, ${tone} 12%, transparent)` : `color-mix(in srgb, ${tone} 5%, var(--surface))`,
        border: `1.5px ${dashed ? "dashed" : "solid"} color-mix(in srgb, ${tone} ${isOver ? 60 : 25}%, transparent)`,
      }}
    >
      <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: tone }}>
        {title}
      </p>
      <div className="flex min-h-[44px] flex-wrap gap-2">
        {children.length ? children : <span className="self-center text-xs text-(--text-faint)">{empty}</span>}
      </div>
    </div>
  );
}

function DecisionCard({ id, label }: { id: CardId; label: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <button
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-card={id}
      className="relative cursor-grab rounded-(--radius-sm) border border-(--border) bg-(--surface) px-3 py-2 text-sm font-semibold active:cursor-grabbing"
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(-2deg)` : undefined,
        zIndex: isDragging ? 30 : undefined,
        boxShadow: isDragging ? "var(--shadow-lg)" : "var(--shadow-sm)",
      }}
    >
      ⠿ {label}
    </button>
  );
}
