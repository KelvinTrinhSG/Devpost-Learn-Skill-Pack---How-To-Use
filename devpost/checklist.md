---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. The hero simulator plays the first two stages (Install and `/1-start`)**
  Becomes usable: A running page in the Taskify style (Vietnamese by default, EN/VI toggle in the navbar) whose hero shows the journey simulator. Stage ① Install: click Run → terminal lines play and the 6 skill folders appear. Stage ② `/1-start`: the agent asks one question, the visitor picks a preset answer, and that answer appears inside `learner-profile.md` in the `devpost/` tab. Progress rail, Details panel, and Copy button work on both stages.
  Why now: This is the unique kernel — learning by trying the steps — and its riskiest piece is the "stage script as data" engine plus "picked answer appears in the document". Proving it on the first slice, together with the scaffold, design tokens, and typed EN/VI dictionaries, means every later stage is just more data.
  PRD ref: `prd.md > The Core Journey` (steps 1–5), `prd.md > Journey Simulator (Guided mode)`, `prd.md > Look and Feel`, `prd.md > Language, Theme, and Sound Toggles` (EN/VI part)
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > Components` (Providers, Navbar, Hero, JourneySimulator and its parts, CopyButton), `spec.md > Data Model`, `spec.md > File Structure`
  Build: Scaffold Next.js + TypeScript + Tailwind v4 with static export (verify current versions); add `node_modules`, `.next`, `out` to `.gitignore`; write `globals.css` tokens and shared classes, Geist fonts; `content/en.ts`, `content/vi.ts` (typed as `Dictionary`), `content/stages.ts` with stages 1–2; `lib/providers.tsx` with language (default `vi`); Navbar with language toggle; Hero with headline, badge, and `JourneySimulator` (ProgressRail, SimWindow with Terminal / Claude Code / `devpost/` tabs, TerminalView, ChatView, FileTree, DocPreview, StageControls, StageDetails, CopyButton).
  Verify (mechanical): `npm run build` succeeds with no type errors and produces `out/index.html`; start the dev server and confirm the page returns 200 and contains the Vietnamese hero text and the real install command; temporarily remove one key from `vi.ts` and confirm the build fails, then restore it.
  Learner check: Run `npm run dev`, open http://localhost:3000. Click Run on stage ①, watch the terminal and the skill folders appear. Go to stage ②, pick an answer and open the `devpost/` tab — your answer should be in `learner-profile.md`. Open Details, click Copy and paste somewhere. Switch EN/VI. Tell me whether the look and the feel of the simulator match what you pictured.
  Commit: `Add hero journey simulator with Install and /1-start stages`

- [x] **2. The whole 7-stage journey plays through to the completion moment**
  Becomes usable: Stages ③ `/2-scope` → ⑦ `/6-ship` are playable: interview answers fill `scope.md`, `prd.md`, `spec.md`; ⑥ ticks off `checklist.md` items with an Approve / Request a change checkpoint; ⑦ finds a fake API key, Fix, then GitHub push and demo-video checklist. Tip pop-ups appear between stages; finishing ⑦ fires confetti and shows the badge with Start over.
  Why now: Completes the kernel ("watch the whole journey run") right after its engine is proven, before any secondary section. Content for the sample project (vocabulary flashcard app) is written here in both languages.
  PRD ref: `prd.md > Journey Simulator (Guided mode)` (per-stage content, acceptance criteria), `prd.md > The Core Journey` (steps 6–8)
  Spec ref: `spec.md > Components` (StageControls, TipPopup, CompletionMoment), `spec.md > Data Model` (`content/stages.ts`)
  Build: Add stages 3–7 to `stages.ts` and both dictionaries; `approve` and `fix` interactions in StageControls; TipPopup; CompletionMoment with `canvas-confetti`.
  Verify (mechanical): `npm run build` succeeds; a small Node check confirms `stages.ts` has 7 stages with ids 1–7, every interview stage has 2–3 preset answers in both languages, and each stage's files match the PRD list (`learner-profile.md`, `scope.md`, `prd.md`, `spec.md`, `checklist.md`); dev server page returns 200.
  Learner check: Play all 7 stages from start to end, try both Approve and Request a change at ⑥, click Fix at ⑦, and watch the completion moment. Jump around with the progress rail. Tell me which stage felt unclear or too slow/fast.
  Commit: `Complete all 7 simulator stages with tips and completion moment`

- [x] **3. The page remembers you, and experienced visitors get the quick command list**
  Becomes usable: Reloading reopens the simulator at the saved stage with "Welcome back — continue at stage X" and Start over. The Guided ⇄ "I already know this" switch shows the 7 commands with copy buttons. Light/dark and sound toggles work (generated Web Audio sounds after the first click) and all choices survive a reload.
  Why now: These are cross-cutting states that wrap the finished simulator; doing them after slice 2 means the saved progress covers every real stage, and they're independent of the sections further down the page.
  PRD ref: `prd.md > Quick Command List ("I already know this" mode)`, `prd.md > Language, Theme, and Sound Toggles`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components` (Providers, ModeSwitch, QuickCommandList, Navbar), `spec.md > Data Model` (browser storage), `spec.md > Important Failure Modes`
  Build: `lib/storage.ts` (safe read/write with defaults), progress / mode / theme / sound in Providers under the `skillguide:` prefix; theme-init inline script in `layout.tsx`; ModeSwitch and QuickCommandList; theme and sound toggles in the Navbar; `lib/sound.ts` tones on Run, file appear, stage complete, completion.
  Verify (mechanical): `npm run build` succeeds; `out/index.html` contains the theme-init script; a Node check of `storage.ts` logic confirms corrupted JSON falls back to defaults; the 7 commands in QuickCommandList come from the same `stages.ts` data as the simulator.
  Learner check: Play to stage ④, reload — you should see "Welcome back" at stage ④; click Start over. Flip to "I already know this", copy a command, reload — it stays in that mode. Toggle dark mode and sound, reload, and confirm both are remembered.
  Commit: `Remember progress and preferences, add quick command list and toggles`

- [x] **4. "Why it works" with the "Who makes the decisions?" drag-and-drop**
  Becomes usable: Below the hero, a section explains flipped interaction, cognitive debt, documents as memory, and small reviewed steps; ~6 decision cards can be dragged (mouse, touch, keyboard) between "AI decides" and "You decide", and an app preview changes after every drop from generic to personal.
  Why now: The second interactive piece of the POC; it depends only on the shared UI and dictionaries already in place.
  PRD ref: `prd.md > Why It Works — "Who makes the decisions?"`
  Spec ref: `spec.md > Components` (WhySection + DecisionGame), `spec.md > Stack` (@dnd-kit/core)
  Build: Install `@dnd-kit/core`; WhySection, DecisionGame (two zones + starting tray), AppPreview with generic / in-between / personal variants; drop sound; EN/VI text.
  Verify (mechanical): `npm run build` succeeds; dev server page returns 200 and contains the section's heading in Vietnamese; the preview variant function returns generic for 0 cards on "You", personal for all, in-between otherwise.
  Learner check: Scroll to "Why it works", drag each card to "You decide" and back, watch the preview change; try once with the keyboard (Tab, Space, arrow keys). Tell me whether the generic vs. personal difference is obvious enough.
  Commit: `Add Why it works section with decision drag-and-drop`

- [x] **5. Tips, sources footer, scroll animations, and a finished bilingual page**
  Becomes usable: The full page: Best Practices & Tips cards, the Sources footer crediting Joe's videos and the skill pack with the "unofficial community guide" note, sections fading in on scroll, reduced-motion respected, readable on a phone, and every visible string switching between EN and VI.
  Why now: Mostly content and polish around the working interactive parts; last because nothing depends on it.
  PRD ref: `prd.md > Best Practices & Tips`, `prd.md > Sources Footer`, `prd.md > Screens and Layout`, `prd.md > Look and Feel` (motion)
  Spec ref: `spec.md > Components` (TipsSection, SiteFooter, Shared UI), `spec.md > Look and Feel`
  Build: TipsSection and SiteFooter from the dictionaries; `Reveal`, `SectionLabel`, `Badge`; navbar section anchors; favicon; README with how to run.
  Verify (mechanical): `npm run build` succeeds and `out/` is produced; a scan of components finds no hard-coded user-facing text outside the dictionaries; the footer links match the two YouTube URLs in `scope.md`.
  Learner check: Scroll the whole page in both languages and in dark mode, on desktop and with the browser narrowed to phone width. Tell me anything that looks off, untranslated, or hard to read.
  Commit: `Add tips, sources footer, and scroll animations`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1 (first look at the style and simulator feel, while it can still shape stages ③–⑦). Learner tried it: "tất cả đều ok" (all OK) — no changes requested.
- [x] Final kick-the-tires exploration and feedback completed — learner asked for source thumbnails and an English default; both done and verified.

## Final Review

- [x] Sources footer: show each video's YouTube thumbnail, and a nicer image for the GitHub skill-pack card (learner request at final review). Committed `d661d98`; headless check: 3 images load, fallback placeholders show when images are blocked.

- [x] Make English the default language on first visit (learner request at final review). Committed `44405da`; headless check: first visit English, VI choice remembered, no leftover strings either way.

- [x] Final review complete — feedback resolved and learner confirms ready to ship. The learner reviewed the running app, asked for the two changes above, then had the repo pushed to GitHub and the site deployed to Vercel (https://devpost-learn-skill-pack-how-to-use.vercel.app), and asked to move on to `6-ship` — taken as confirmation the PoC is ready.

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Brief evidence-based recap (the learner asked to move straight to shipping and had no separate learning goal). Connection: the observable PRD criterion "no leftover strings in the other language" became the bilingual leftover-text check, which passed in both languages and was re-run after the English-default change; screenshot review caught the Georgia diacritics bug (fixed with Lora).
Route and stops: Reference route only (not toured): `StageControls.tsx` › `StageControls` → `JourneySimulator.tsx` › `run` / `answer` / `complete` (+ `lib/storage.ts` › `writeRaw`) → `DocPreview.tsx` › `DocPreview`.
Edit outcome: Not applicable — no optional edit offered; the learner asked to proceed to shipping.
Reflection: Optional transfer question offered in the hand-off message; answering is optional.
Activity mode: Recap. App map: `devpost/app-map.html` — 32 path/symbol checks passed against source; renders with JavaScript disabled.

## Revisions

- Removed the scaffold's `cacheComponents` / `partialPrefetching` options from `next.config.ts` and kept `output: "export"` — `create-next-app` 16.4 enabled them by default; they aren't needed for a fully client-side static page.
- Added headless-browser interaction checks (Playwright driving the installed Edge, run from a scratch folder, not a project dependency) to slice verification — build and HTTP checks alone can't confirm Run / answer / Copy behavior.
- The theme-init script lives in its own `lib/theme-script.ts` (not in the spec's file list) — the server-rendered `layout.tsx` can't import a constant from the client-only `lib/providers.tsx` or from `lib/storage.ts`, which uses React hooks.
- Saved language and mode apply right after the page loads, not before first paint (only the theme uses the inline script) — static pre-rendered HTML is always in the defaults (Vietnamese, Guided), so a returning English or Quick-mode visitor may see the default for a split second.
- Decision-game data (card ids, AI vs. personal looks, the generic / mixed / personal rule) lives in `content/decisions.ts`, and the personal font is Lora loaded via `next/font` — Georgia lacked some Vietnamese glyphs and broke diacritics in the preview.
- Replaced the scaffold's Next.js `app/favicon.ico` with an own `app/icon.svg` (the spec listed the favicon under `public/`; the App Router serves `app/icon.svg` directly). No separate social image was made.
- Sources footer now loads preview images from YouTube and GitHub at runtime (learner request at final review); `spec.md > External Services and Dependencies` updated. Images fall back to a colored placeholder if blocked — including failures that happen before hydration.
- Default language changed from Vietnamese to English (learner decision at final review); `prd.md > States and Boundaries`, `prd.md > Product Decisions`, `spec.md > The Core Journey Through the System`, `spec.md > Data Model`, and `spec.md > Decisions and Open Issues` updated. The pre-rendered page and `<html lang>` are now English, so the brief default-language flash now affects returning Vietnamese visitors instead.

