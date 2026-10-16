# Skill Pack — How To Use

An unofficial, bilingual (Vietnamese / English) guide to Devpost Learn's **Build With AI: Basics** skill pack. You can try all 7 steps in a click-through simulator (install, then `/1-start` through `/6-ship`) before running them for real. The page also explains why the method works and shares tips for using it well.

Built for the Devpost Learn *Build With AI: Basics* hackathon.

## What's on the page

- **Journey simulator.** Seven stages, one per real command. Click Run, pick a preset answer, and watch it appear in the generated `devpost/` document. Each stage has a Copy button for the real command and a Details panel.
- **"I already know this" mode.** Shows just the 7 commands, each with a Copy button.
- **Why it works.** Explains the method, with a "Who makes the decisions?" drag-and-drop game.
- **Best practices and tips.**
- **Sources.** Links to the videos and the skill pack this guide is based on.
- **Toggles.** Switch between Vietnamese and English, light and dark themes, and sound on or off. Your progress and preferences are saved in your browser.

Everything runs in the browser. There is no server, no account, and no API key.

## Run it locally

You need Node.js (LTS) and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production build

```bash
npm run build
```

This writes a fully static site to `out/`, which can be hosted anywhere that serves static files (for example, Vercel).

## Project layout

```
app/          page, layout (fonts, theme script), global styles and design tokens
components/   navbar, hero, simulator/, why/, tips, footer, ui/
content/      en.ts + vi.ts (all page text), stages.ts (simulator scripts), decisions.ts
lib/          providers (language/theme/sound/progress), storage, sound
devpost/      planning documents: scope, PRD, spec, build checklist
```

All visitor-facing text lives in `content/en.ts` and `content/vi.ts`. `vi.ts` is typed against `en.ts`, so a missing translation fails the build.

## Credits

The content is summarized and rewritten in our own words from:

- Joe, *Stop Building Generic AI Apps: The Flipped Interaction Method*: https://www.youtube.com/watch?v=sooC4QGFUUs
- Joe, live build of *Who Let The Dogs Out*: https://www.youtube.com/watch?v=0Zi0OkKTZqM
- The skill pack itself: https://github.com/challengepost/learn-ai-basics

This is a community-made guide. It is not affiliated with or endorsed by Devpost.
