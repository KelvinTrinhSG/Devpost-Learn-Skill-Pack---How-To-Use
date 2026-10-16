---
doc: prd
status: approved
---

# Devpost Learn Skill Pack - How To Use — Product Requirements

A single long-scrolling, bilingual (EN/VI) web page that lets people who want to build with AI — beginners and coders without a systematic method — *try* the Build With AI: Basics skill pack in a click-through simulator before using it for real, then learn why it works and how to use it well.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Develops `scope.md > The Core Loop` and `scope.md > What "Working" Looks Like`.

1. The visitor opens the page and lands on the **hero**: a big headline on the left, the **journey simulator** on the right, and a **Guided ⇄ I already know this** switch above it.
2. In **Guided** mode, the simulator starts at stage ① *Install*. A short caption says what this stage is for.
3. The visitor clicks **Run**. The simulated window plays the result (terminal output line by line, files popping into the folder view, or the agent's reply).
4. When the stage needs an answer (interview stages), the agent asks one sample question and the visitor picks one of the **preset answers**. The matching document in the `devpost/` view fills in a section using that answer.
5. The visitor can open **Details** for the stage: what it does, which file it creates, one tip, one concrete example — and can **Copy the real command**.
6. Moving to the next stage shows a short **tip pop-up** where relevant (e.g. "`/clear` between steps — `devpost/` is your memory card").
7. Steps 3–6 repeat through all 7 stages: ① Install → ② `/1-start` → ③ `/2-scope` → ④ `/3-prd` → ⑤ `/4-spec` → ⑥ `/5-build` → ⑦ `/6-ship`.
8. Finishing ⑦ triggers a **completion moment** (confetti + badge) and points to the real command list.
9. The visitor scrolls down to **Why it works** and plays the **"Who makes the decisions?"** drag-and-drop.
10. They scroll on to **Best Practices & Tips**, then the **Sources** footer.
11. If they leave and come back, the simulator reopens at the stage they were on.

A visitor who already knows the method flips the switch to **I already know this** and gets the 7 commands with copy buttons immediately — no simulation.

## Screens and Layout
One page, vertical scroll, in this order (`scope.md > The POC Boundary`):

1. **Sticky navbar** — page name, section links, language toggle (EN/VI), theme toggle (light/dark), sound toggle.
2. **Hero** — headline (left) + Guided/Quick switch + journey simulator or quick command list (right). Progress rail of 7 stages.
3. **Why it works** — the method, plus the "Who makes the decisions?" drag-and-drop.
4. **Best Practices & Tips** — cards.
5. **Sources footer** — credits and links to Joe's videos and the skill pack.

The separate "clickable 6-step flow diagram" from scope is **merged into the hero**: each simulator stage carries its own Details panel (see Product Decisions).

## Look and Feel
Borrowed from the learner's own project *Mezo Taskify* (`D:\Blockchain\Mezo Taskify\frontend`) — style only; no Taskify name or logo.

- **Theme:** light by default (warm off-white), dark mode via a toggle.
- **Colors (light):** background `#FAFAF8` / alt `#F3F0E9`; surfaces `#FFFFFF` / `#F1EEE7`; borders `#E3DFD6` / `#D2CDC0`; text `#171717`, muted `#55524B`, dim `#6E6B62`, faint `#8B877C`.
  **Primary** red-pink `#FF004D` → strong magenta `#990070`; **secondary** violet `#5546FF` / `#6E4FE0`; success `#16824F`; blue `#2563EB`; gold `#B8860B`; danger `#D6304B`.
- **Colors (dark):** background `#0A0A0F` / `#0D0D12`; surfaces `#131313` / `#1B1B1B`; borders `#262626` / `#333333`; text `#F2F1EE`, muted `#A8A49A`; primary stays `#FF004D`, strong `#FF5FA8`; secondary `#8B80FF`; success `#00D395`.
- **Type:** Geist for UI and prose; Geist Mono for commands, code, and numbers. Headlines heavy (800), tight tracking (≈ −0.03em), hero size ≈ `clamp(36px, 5vw, 58px)`; one hero phrase in a red→magenta gradient.
- **Shape & depth:** radii 8 / 12 / 16px; soft shadows; badges as 9%-tint fill with 19%-tint border; uppercase pill section labels in primary color.
- **Motion:** hero fades up on load; sections slide/fade in once when scrolled into view; the simulator window and floating badges gently bob; cards lift 3px on hover; buttons press to 0.97. Honors reduced-motion settings.
- **Hero backdrop:** soft radial glows of primary and secondary color.
- **Step cards:** "01 / 02 / …" numbering, large faint number in the corner, thin gradient bar at the bottom.
- **Sound:** small effects (Run, file appears, stage complete, card drop, completion) — no music in this version.

## Features and Behavior

### Journey Simulator (Guided mode)
Develops `scope.md > The Unique Kernel`.

- **Progress rail:** 7 stages, current one highlighted, completed ones checked. Clicking any stage jumps to it.
- **Simulated window** with three tabs: `Terminal`, `Claude Code`, `devpost/` (folder + document preview). The relevant tab opens automatically for each stage.
- **Run button** — the only action needed to advance a non-interview stage. No typing required.
- **Preset answers** — interview stages (② `/1-start`, ③ `/2-scope`, ④ `/3-prd`, ⑤ `/4-spec`) show one sample question with 2–3 preset answers to click. The chosen answer visibly appears in the generated document.
- **Per-stage content:**
  - ① Install — includes "create an empty project folder"; output plays, the 6 skill folders appear under `.agents/skills/`.
  - ② `/1-start` — agent asks about experience; `learner-profile.md` appears.
  - ③ `/2-scope` — agent asks for the idea; `scope.md` appears.
  - ④ `/3-prd` — agent asks what the first screen shows; `prd.md` appears.
  - ⑤ `/4-spec` — agent asks about tech choices; `spec.md` appears.
  - ⑥ `/5-build` — checklist items tick off; at a checkpoint the visitor clicks **Approve** or **Request a change** (both continue; "Request a change" shows the agent adjusting).
  - ⑦ `/6-ship` — a security check finds a fake API key; the visitor clicks **Fix**; then GitHub push and demo-video checklist; completion moment.
- **Details panel** per stage: what it does, file created in `devpost/`, one tip, one concrete example.
- **Copy real command** button on every stage.
- **Tip pop-ups** between stages where relevant (`/clear`, speech-to-text, review before approving).

Acceptance criteria:
- [ ] Clicking **Run** on each of the 7 stages plays a visible result in the simulated window.
- [ ] On interview stages, picking a preset answer makes that answer's text appear in the matching document preview.
- [ ] Each stage's file appears in the `devpost/` view at the stage that creates it (`learner-profile.md`, `scope.md`, `prd.md`, `spec.md`, `checklist.md`).
- [ ] Every stage's **Copy** button puts the exact real command on the clipboard and shows "Copied ✓".
- [ ] Every stage has a Details panel with: purpose, file created, tip, example.
- [ ] Clicking a stage in the progress rail jumps to it.
- [ ] Completing stage ⑦ shows the completion moment.

### Quick Command List ("I already know this" mode)
- The switch replaces the simulator with a compact list of the 7 real commands (install command + 6 slash commands), each with a one-line description (e.g. "creates `scope.md`") and a **Copy** button.
- The chosen mode is remembered.

Acceptance criteria:
- [ ] Flipping the switch shows all 7 commands without any simulation step.
- [ ] Each Copy button copies the exact command.
- [ ] Reloading the page keeps the chosen mode.

### Why It Works — "Who makes the decisions?"
Develops `scope.md > The POC Boundary` item 3.

- Short explanations, in our own words: flipped interaction; cognitive debt; documents as the agent's memory; building in small reviewed steps.
- **Drag-and-drop:** about 6 decision cards (e.g. app name, main color, key features, style, audience, font) sit between two drop zones, **AI decides** and **You decide**. A small app preview updates as cards move: more cards on the AI side → a bland, generic-looking app; more on the You side → a distinctive, personal one.
- An original example (not a copy of the videos' demo apps).

Acceptance criteria:
- [ ] Each card can be dragged into either zone and back.
- [ ] The preview visibly changes after every drop.
- [ ] All cards on "AI decides" shows the generic version; all on "You decide" shows the personal version.

### Best Practices & Tips
- Cards with short, original-wording tips drawn from the videos and the skill pack: use speech-to-text; let the agent interview you and answer richly; `/clear` between steps; watch usage; ask the agent to research inspiration; review at checkpoints; never commit API keys or personal notes; write your own submission.

Acceptance criteria:
- [ ] Every tip is readable in both EN and VI.
- [ ] No text is copied verbatim from the video transcripts.

### Language, Theme, and Sound Toggles
- **EN/VI** toggle switches all page text, including simulator captions, preset answers, details, and tips. Commands stay unchanged.
- **Light/Dark** toggle.
- **Sound** toggle (mute/unmute).
- All three choices are remembered.

Acceptance criteria:
- [ ] Switching language changes every visible text on the page with no leftover strings in the other language.
- [ ] Theme and sound toggles work and persist across reloads.

### Sources Footer
- Credits Joe's two videos with links, links to the skill pack, and states the content is rewritten in our own words.

## States and Boundaries
- **First visit** — Vietnamese, Guided mode, stage ①, light theme.
- **Returning visit** — opens at the saved stage with a small "Welcome back — continue at stage X" note and a **Start over** button. *(Shift from `scope.md > Explicitly Cut`: saved progress was cut assuming accounts were needed; it's now in, kept on the visitor's own browser only — no account, no server.)*
- **Journey complete** — completion moment; rail shows all checked; Start over available.
- **Copy unavailable** — if the browser blocks clipboard access, the command text is selected/highlighted so the visitor can copy it manually.
- **Sound** — plays only after the visitor's first click (browser rule); respects mute.
- **Reduced motion** — animations minimized when the visitor's system asks for it.
- **Nothing persists beyond this browser** — clearing browser data resets progress.

## Product Decisions
- Name: **Devpost Learn Skill Pack - How To Use** — learner's choice.
- **One long scrolling page**, like the Taskify landing page — learner's choice.
- **Walkthrough lives in the hero** — learner's choice; it's the top priority.
- **Run button only, no typing** — learner's choice; easiest for users.
- **Preset interview answers** — learner's choice.
- **7 stages, one per real command** — proposed by Claude, accepted: users remember "one stage = one command I'll type"; folder creation folds into ① and `/clear` becomes a tip.
- **Guided ⇄ I already know this switch** + copy button on every stage — learner's request: "làm sao để tôi cũng có thể dùng được khi tôi đã biết… có chỗ để tôi copy các dòng lệnh" *(so I can use it too when I already know — somewhere to copy the commands)*.
- **Remember the stage in progress** — learner's choice.
- **Flow diagram merged into the hero's per-stage Details** — proposed by Claude at the learner's request; frees time for Why and Tips.
- **Visual style from Mezo Taskify** — learner's choice.

- **Default language is Vietnamese** on first visit; the visitor's choice is then remembered — learner's decision during `4-spec` review (replaces the earlier "follow the browser language" assumption).
- Sound is on by default after the first click, with mute available — proposed by Claude, confirmed at review.
- Desktop-first; readable on a phone, simulator optimized for desktop — proposed by Claude, confirmed at review.
- The page states it is an **unofficial, community-made guide**, not an official Devpost page — proposed by Claude, confirmed at review.

## What We're Building
- Hero journey simulator: 7 stages, Run button, preset answers, simulated Terminal / Claude Code / `devpost/` views, per-stage Details, copy buttons, tip pop-ups, completion moment.
- Guided ⇄ Quick command list switch.
- Saved progress and preferences in the visitor's browser.
- "Why it works" section with the "Who makes the decisions?" drag-and-drop.
- Best Practices & Tips cards.
- EN/VI, light/dark, and sound toggles.
- Sources footer.

## Deferred From the POC
- **Typing commands yourself** — Run button is enough to prove the kernel.
- **Free-text interview answers** — presets keep it easy and predictable.
- **Separate 6-step flow diagram section** — merged into the hero's Details.

## Possible Later Enhancements
- Charts (typing ≈40 vs. speaking ≈130 words per minute, etc.).
- Background music.
- Mini-game: put the steps in order; comprehension checks.
- More sample projects to choose from in the simulator.

## Non-Goals
- Running real commands or a real agent in the browser — simulation only; safe and simple.
- Copying video transcripts verbatim — copyright; we rewrite and link.
- Accounts, login, server, or cross-device sync.

## Open Questions
- None. (Sample project for the preset answers was settled in `4-spec`: an English vocabulary flashcard app for Vietnamese learners.)
