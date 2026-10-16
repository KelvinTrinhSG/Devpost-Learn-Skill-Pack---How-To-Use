---
doc: spec
status: approved
---

# Devpost Learn Skill Pack - How To Use — Technical Spec

## How This Works, In Plain Language
This is one web page built with **Next.js + React + Tailwind** — a stack the learner already knows. There is **no server and no database**: Next.js turns the project into plain static files (HTML, CSS, JavaScript) at build time, and Vercel serves those files at a public link.

The page is made of a few pieces:

- **Content files** — all the words on the page live in two dictionaries, `en.ts` and `vi.ts`, with exactly the same keys. A tiny hook (`useLang()`) picks the right one. TypeScript refuses to build if the Vietnamese file is missing a key the English one has.
- **Stage scripts** — each of the 7 simulator stages is described as *data*: the real command, the lines of terminal output to play, the agent's sample question, the preset answers, which file appears, and the Details text. The simulator component just "plays" a script. Changing content means editing data, not logic.
- **Components** — the navbar, the hero with the simulator (or quick command list), the "Who makes the decisions?" drag-and-drop, the tip cards, and the footer.
- **The browser's sticky note (`localStorage`)** — remembers the current stage, the Guided/Quick mode, language, theme, and sound on/off.
- **Sound** — generated in code with the browser's Web Audio API (short clicks and chimes). No audio files, no copyright worries.

Why this shape: everything the PRD asks for happens inside the visitor's browser, so a server would add cost and failure points without proving anything.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. Visitor opens the Vercel link → Vercel sends the static page → `Providers` reads `localStorage` (language, theme, sound, mode, stage). First visit: English, Guided mode, stage 1, light theme.
2. Hero renders `JourneySimulator` with `stages[currentStage]`.
3. Visitor clicks **Run** → the simulator plays that stage's script: terminal lines appear one by one, files appear in the `devpost/` tab, a sound plays → stage marked complete → saved to `localStorage`.
4. Interview stage → agent question + preset answer buttons → visitor clicks one → the answer text is inserted into that stage's document preview (`DocPreview`).
5. **Details** opens the stage's purpose / file / tip / example from the dictionary. **Copy** calls the Clipboard API with the real command → shows "Copied ✓".
6. Next stage → if the stage has a tip, `TipPopup` shows it.
7. Stage 7 complete → `canvas-confetti` fires + completion badge.
8. Visitor scrolls → `Reveal` fades sections in → `DecisionGame` (dnd-kit) → each drop recomputes a "how personal" score → `AppPreview` switches look.
9. Tips cards → footer.
10. Visitor returns later → step 1 restores the saved stage → "Welcome back — continue at stage X" + **Start over**.

Quick mode: the switch sets `mode = "quick"` in `localStorage` → hero renders `QuickCommandList` instead of the simulator.

## Stack
- **Next.js** (App Router) with **static export** (`output: "export"` in `next.config.ts`) — learner's choice, a stack the learner already knows. Docs: https://nextjs.org/docs/app/guides/static-exports
- **React** + **TypeScript** — comes with Next.js. Docs: https://react.dev
- **Tailwind CSS** (v4, `@import "tailwindcss"`) + CSS variables for the design tokens. Docs: https://tailwindcss.com/docs
- **Geist / Geist Mono** via `next/font/google`. Docs: https://nextjs.org/docs/app/getting-started/fonts
- **@dnd-kit/core** — drag-and-drop that also works on touch screens and with the keyboard (native HTML drag-and-drop doesn't work on touch). Docs: https://docs.dndkit.com
- **canvas-confetti** — completion effect. Docs: https://github.com/catdad/canvas-confetti
- **Web Audio API** (built into browsers) — sound effects. Docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Clipboard API** (built in) — copy buttons. Docs: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

Unverified: exact current versions of Next.js, Tailwind, and dnd-kit were not looked up during planning. Check at the start of the build (`npx create-next-app@latest`) and confirm static export + Tailwind v4 setup still work as above.

## Where It Runs and How Someone Tries It
- **Runtime:** the visitor's browser. Development needs Node.js (LTS) and npm on the learner's machine. No API keys, no environment variables.
- **Local:** `npm install` then `npm run dev` → open http://localhost:3000.
- **Production build check:** `npm run build` → static files in `out/`.
- **Demo recording:** record the local or Vercel version: run a few simulator stages, pick a preset answer and show it appear in the document, copy a command, flip to Quick mode, switch EN/VI, play the drag-and-drop, reload to show the stage is remembered.
- **Submission:** short demo video + public GitHub repository (both required).
- **Deployment (learner's choice): Vercel** — live at https://devpost-learn-skill-pack-how-to-use.vercel.app (Vercel project `devpost-learn-skill-pack-how-to-use`, deployed with the Vercel CLI from the local folder; `.vercelignore` keeps private files out of the upload). Not yet connected to the GitHub repo for automatic deploys — redeploy with `npx vercel deploy --prod`, or connect the repo in the Vercel dashboard.
- **Public repository:** https://github.com/KelvinTrinhSG/Devpost-Learn-Skill-Pack---How-To-Use

## Look and Feel
Carried forward from `prd.md > Look and Feel`.

- `app/globals.css` defines these CSS variables: `--bg #FAFAF8`, `--bg-alt #F3F0E9`, `--surface #FFFFFF`, `--surface-2 #F1EEE7`, `--border #E3DFD6`, `--border-strong #D2CDC0`, `--text #171717`, `--text-muted #55524B`, `--text-dim #6E6B62`, `--text-faint #8B877C`, `--primary #FF004D`, `--primary-strong #990070`, `--secondary #5546FF`, `--secondary-light #6E4FE0`, `--success #16824F`, `--blue #2563EB`, `--gold #B8860B`, `--danger #D6304B`; plus the `[data-theme="dark"]` overrides (`--bg #0A0A0F`, `--surface #131313`, `--border #262626`, `--text #F2F1EE`, `--primary-strong #FF5FA8`, `--secondary #8B80FF`, `--success #00D395`, …).
- Radii `--radius-sm 8px`, `--radius-md 12px`, `--radius-lg 16px`; shadows `--shadow-sm/md/lg`; easing `cubic-bezier(0.16, 1, 0.3, 1)`; durations 150 / 200 / 550ms.
- Shared classes: `.btn-primary`, `.btn-outline`, `.btn-motion`, `.card-hover`, `.hero-in`, `.float`, `.figure`; `prefers-reduced-motion` override.
- Headline weight 800, tracking −0.03em, `clamp(36px, 5vw, 58px)`; one gradient phrase (primary → primary-strong).
- Pill section labels (`SectionLabel`), 9%/19% tinted badges (`Badge`), "01/02" step numbering with a faint big number and a gradient bottom bar.
- Hero backdrop: radial glows of primary and secondary.
- The simulated window: a mac-style window frame with three tabs, Geist Mono for terminal and file content.
- Copy tone: friendly, short, direct; same meaning in EN and VI.
- Theme: light default; set before first paint with a small inline script to avoid a flash.

## Components

### Providers (Language, Theme, Sound, Progress)
One client-side context that loads and saves preferences and progress in `localStorage`, exposes `useLang()`, `useTheme()`, `useSound()`, `useProgress()`.
PRD ref: `prd.md > Language, Theme, and Sound Toggles`, `prd.md > States and Boundaries`.

### Navbar
Sticky, blurred background. Page name, section anchors, language toggle (EN/VI), theme toggle, sound toggle.
PRD ref: `prd.md > Screens and Layout`.

### Hero
Headline + subline + "Unofficial community guide" badge on the left; `ModeSwitch` and either `JourneySimulator` or `QuickCommandList` on the right.
PRD ref: `prd.md > Screens and Layout`, `prd.md > Product Decisions`.

### ModeSwitch
Guided ⇄ "I already know this" segmented toggle; persists `mode`.
PRD ref: `prd.md > Quick Command List ("I already know this" mode)`.

### JourneySimulator
Owns the current stage and the "playing" state. Contains `ProgressRail`, `SimWindow`, `StageControls` (Run / preset answers / Approve-Request change / Fix), `StageDetails`, `CopyButton`, `TipPopup`, `CompletionMoment`. Plays a stage script step by step with timers; respects reduced motion (show everything at once).
PRD ref: `prd.md > Journey Simulator (Guided mode)`.

#### ProgressRail
7 stage buttons with done/current state; click to jump.

#### SimWindow
Window frame with tabs `Terminal`, `Claude Code`, `devpost/`; auto-selects the stage's tab. Sub-views: `TerminalView` (lines), `ChatView` (agent question + chosen answer), `FileTree` + `DocPreview` (file list and document text with the chosen answer inserted).

#### StageDetails
Expandable panel: purpose, file created, tip, example — from the dictionary.

#### CopyButton
Clipboard API → "Copied ✓"; on failure, selects the command text for manual copy.
PRD ref: `prd.md > States and Boundaries` (Copy unavailable).

#### TipPopup
Shown when moving to the next stage if the stage has a tip (`/clear`, speech-to-text, review before approving).

#### CompletionMoment
Confetti + badge + "Start over" and a link to Quick mode.

### QuickCommandList
The 7 real commands, one-line description each, `CopyButton` on each row.
PRD ref: `prd.md > Quick Command List ("I already know this" mode)`.

### WhySection + DecisionGame
Short method explanations (flipped interaction, cognitive debt, documents as memory, small reviewed steps) from the dictionary; `DecisionGame` uses dnd-kit with ~6 cards and two drop zones; `AppPreview` renders a generic or personal variant (and an in-between) based on how many cards are on "You decide". Original example, not the videos' demo apps.
PRD ref: `prd.md > Why It Works — "Who makes the decisions?"`.

### TipsSection
Grid of tip cards from the dictionary.
PRD ref: `prd.md > Best Practices & Tips`.

### SiteFooter
Credits and links to Joe's two videos and the skill pack; states content is rewritten in our own words; "unofficial community guide" note.
PRD ref: `prd.md > Sources Footer`.

### Shared UI
`Reveal` (fade/slide in on scroll, one-shot), `SectionLabel`, `Badge`, `Button`.

## Data Model
All data is either static content compiled into the page or small preferences in `localStorage`.

**Static content**
- `content/en.ts`, `content/vi.ts` — `Dictionary` objects with identical keys: navbar, hero, mode switch, every stage's caption / agent question / preset answers / details / tip, completion text, why section, decision cards, tips, footer. `vi.ts` is typed as `Dictionary` (the type derived from `en.ts`), so a missing key fails the build.
- `content/stages.ts` — language-independent stage scripts:
  ```ts
  type Stage = {
    id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    command: string;              // exact real command, copied as-is
    tab: "terminal" | "chat" | "files";
    terminalLines?: string[];     // played one by one
    files?: string[];             // e.g. ["devpost/scope.md"]
    interaction: "run" | "answer" | "approve" | "fix";
    tipKey?: string;              // TipPopup when leaving this stage
  };
  ```
  Text for each stage is looked up in the dictionary by stage id.

**Browser storage (`localStorage`, prefix `skillguide:`)**
| Key | Value | Updated when | On return |
|---|---|---|---|
| `skillguide:lang` | `"en" \| "vi"` | language toggle | restored; if absent, `"en"` (default) |
| `skillguide:theme` | `"light" \| "dark"` | theme toggle | applied before first paint |
| `skillguide:sound` | `"on" \| "off"` | sound toggle | restored; default on |
| `skillguide:mode` | `"guided" \| "quick"` | mode switch | restored |
| `skillguide:progress` | `{ stage: number, done: number[], answers: Record<number, number> }` | Run / answer / jump / Start over | simulator reopens at `stage` with "Welcome back" |

Decision-game card positions are not saved (resetting is fine).

## File Structure
```
Devpost Learn Skill Pack - How To Use/
├── app/
│   ├── layout.tsx          # fonts, theme-init script, Providers
│   ├── page.tsx            # assembles Navbar, Hero, WhySection, TipsSection, SiteFooter
│   └── globals.css         # design tokens, light/dark, shared classes, reduced motion
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ModeSwitch.tsx
│   ├── QuickCommandList.tsx
│   ├── simulator/
│   │   ├── JourneySimulator.tsx  # plays stage scripts, owns current stage
│   │   ├── ProgressRail.tsx
│   │   ├── SimWindow.tsx         # window frame + tabs
│   │   ├── TerminalView.tsx
│   │   ├── ChatView.tsx
│   │   ├── FileTree.tsx
│   │   ├── DocPreview.tsx
│   │   ├── StageControls.tsx     # Run / answers / approve / fix
│   │   ├── StageDetails.tsx
│   │   ├── TipPopup.tsx
│   │   └── CompletionMoment.tsx
│   ├── why/
│   │   ├── WhySection.tsx
│   │   ├── DecisionGame.tsx      # dnd-kit
│   │   └── AppPreview.tsx
│   ├── TipsSection.tsx
│   ├── SiteFooter.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── CopyButton.tsx
│       ├── Reveal.tsx
│       └── SectionLabel.tsx
├── content/
│   ├── en.ts               # English dictionary (source of the Dictionary type)
│   ├── vi.ts               # Vietnamese dictionary (must match en.ts keys)
│   └── stages.ts           # language-independent stage scripts
├── lib/
│   ├── providers.tsx       # lang / theme / sound / progress context + localStorage
│   ├── storage.ts          # safe localStorage read/write
│   └── sound.ts            # Web Audio tones
├── public/                 # favicon, social image
├── next.config.ts          # output: "export"
├── package.json
├── tsconfig.json
├── README.md
├── .agents/                # installed skill pack (curriculum)
└── devpost/                # Devpost learning workspace
```

## External Services and Dependencies
- **Vercel** (hosting, optional per rules; learner chose it) — free Hobby plan for a personal static site; no API calls, no keys. Import the GitHub repo; build command `next build`, output `out/`. Docs: https://vercel.com/docs/frameworks/nextjs
- **GitHub** — public repository (required for submission).
- **Google Fonts via `next/font`** — downloaded at build time and self-hosted; no runtime call.
- **Source preview images** — the Sources footer shows each video's YouTube thumbnail (`i.ytimg.com`) and GitHub's social card for the skill-pack repo (`opengraph.githubassets.com`), loaded in the visitor's browser. If they fail to load, a colored placeholder with an icon is shown instead. Added at final review, at the learner's request.
- No APIs, databases, or keys.

## Important Failure Modes
- **Clipboard blocked** (non-HTTPS or permission denied) → command text is selected and a "Press Ctrl+C" hint shows.
- **`localStorage` unavailable or corrupted** (private mode, bad JSON) → `storage.ts` catches errors and falls back to defaults; the page still works, just without memory.
- **Audio blocked before first interaction** → sounds start only after the first click; failures are silent.
- **Missing Vietnamese text** → prevented at build time by the `Dictionary` type.

## What Was Simplified and Why
- **Static export, no server** instead of a server-rendered app — everything runs in the browser; the fuller version would add hosting cost and failure points with no benefit to the kernel.
- **Two typed dictionaries** instead of an i18n library with `/en` and `/vi` routes — the fuller version would add routing and a dependency; not needed to prove the kernel.
- **`localStorage`** instead of accounts — per `prd.md > States and Boundaries`.
- **Scripted, simulated stages** instead of a real agent or terminal — explicitly simulated sample content, labeled as such on the page (`prd.md > Non-Goals`). The kernel — learning by trying the steps — is real.
- **Generated sounds** instead of audio files — no licensing, no downloads.

## Decisions and Open Issues
**Learner choices**
- Next.js + React + Tailwind — already familiar to the learner.
- Deploy to Vercel (optional per rules; chosen so others can open a link).
- Accepted Claude's recommendations: typed EN/VI dictionaries + `useLang()`; `localStorage` for progress and preferences; Web Audio for sound; dnd-kit for drag-and-drop (touch support, extra dependency accepted); canvas-confetti; Geist via `next/font`; stage scripts as data.

**Implementation details derived from those choices**
- Static export (`output: "export"`), `skillguide:` storage prefix, inline theme-init script, file structure above.

**Learner uncertainty**
- Asked which part felt least certain; none was identified ("ok, quá tuyệt"). Noted, no extra exercise added.

**Settled at review**
- **Default language: English** — learner's decision at the `5-build` final review (replaces the earlier Vietnamese default, which had replaced the browser-language default); `<html lang>` starts as `en` and the pre-rendered page is in English.
- **Sample project in the preset answers:** the simulated learner builds an **English vocabulary flashcard app for Vietnamese learners** — proposed by Claude, accepted by the learner. Lives only in the content files, so it's easy to change.

**Open**
- Exact library versions — verify at build start (see Stack).
