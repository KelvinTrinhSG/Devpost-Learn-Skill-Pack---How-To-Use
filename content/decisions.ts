// Language-independent data for the "Who makes the decisions?" game.
// Card labels and app texts live in the dictionaries under `why.game`.

export const CARD_IDS = ["name", "color", "features", "style", "audience", "font"] as const;
export type CardId = (typeof CARD_IDS)[number];
export type Zone = "tray" | "ai" | "you";

// How the preview looks when the AI picks (safe defaults) vs. when you pick (your own taste).
export const LOOKS = {
  color: {
    ai: { from: "#6366F1", to: "#8B5CF6", ink: "#FFFFFF" },
    you: { from: "#E4572E", to: "#FFC857", ink: "#2B1A0E" },
  },
  font: {
    ai: "var(--font-geist-sans), Arial, sans-serif",
    you: "var(--font-lora), Georgia, serif",
  },
} as const;

export type Verdict = "generic" | "mixed" | "personal";

// Undecided cards count as AI decisions: if you don't choose, the agent fills the gap with defaults.
export function previewVerdict(youCount: number, total: number = CARD_IDS.length): Verdict {
  if (youCount <= 0) return "generic";
  if (youCount >= total) return "personal";
  return "mixed";
}
