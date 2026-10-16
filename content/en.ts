// English dictionary — the source of the Dictionary type.
// content/vi.ts must have exactly the same keys, or the build fails.

export type StageText = {
  title: string; // short name in the progress rail
  caption: string; // what this stage is for
  chat?: string[]; // agent messages in the Claude Code tab; the last one is the question
  // Preset answers: button label + text inserted into the doc (+ an optional reply for this answer only).
  answers?: { label: string; text: string; reply?: string }[];
  reply?: string; // agent's reply after the visitor answers (when the answer has none of its own)
  doc?: string[]; // document preview lines; "{answer}" is replaced by the chosen answer
  details: { purpose: string; file: string; tip: string; example: string };
};

const stage = (t: StageText) => t;

export const en = {
  meta: {
    title: "Skill Pack — How To Use | Build With AI: Basics",
    description:
      "Try the Devpost Learn Build With AI: Basics skill pack in a click-through simulator, then learn why it works.",
  },
  nav: {
    name: "Skill Pack — How To Use",
    language: "Language",
  },
  hero: {
    badge: "Unofficial community guide",
    titleStart: "Try the skill pack before you",
    titleHighlight: "build for real",
    subline:
      "Click through all 7 steps of Devpost Learn's Build With AI: Basics — see which command to type, what the agent asks, and which file appears — then do it on your own machine.",
  },
  sim: {
    stageLabel: "Stage",
    simulated: "Simulated sample",
    run: "Run",
    running: "Running…",
    next: "Next stage",
    pickAnswer: "Pick an answer:",
    you: "You",
    agent: "Claude",
    stageDone: "Stage complete",
    details: "Details",
    hideDetails: "Hide details",
    detailPurpose: "What it does",
    detailFile: "File created",
    detailTip: "Tip",
    detailExample: "Example",
    commandLabel: "Real command",
    tabs: { terminal: "Terminal", chat: "Claude Code", files: "devpost/" },
    terminalIdle: "Click Run to play this stage.",
    chatIdle: "Click Run to send the command to the agent.",
    chatOtherStage: "This stage runs in the terminal.",
    filesEmpty: "The project folder is still empty.",
    pickFile: "Click a file to preview it.",
    folderNote: "Skill folder (instructions for the agent)",
    jumpTo: "Go to stage",
  },
  copy: {
    copy: "Copy",
    copied: "Copied ✓",
    fallback: "Press Ctrl+C to copy",
  },
  stages: {
    1: stage({
      title: "Install",
      caption:
        "Create an empty project folder, install the skill pack into it, and open Claude Code there.",
      details: {
        purpose:
          "Downloads the 6 skills (1-start … 6-ship) into your project so the agent knows the method.",
        file: ".agents/skills/ — one folder per skill. Nothing in devpost/ yet.",
        tip: "Always start in a new, empty folder: one folder = one project.",
        example: "mkdir my-flashcards → cd my-flashcards → npx skills add … → claude",
      },
    }),
    2: stage({
      title: "/1-start",
      caption:
        "The agent introduces the method and asks about you, so every later step fits your experience.",
      chat: [
        "Hi! Before we plan anything, I'd like to know you a little. I'll ask — you answer in your own words.",
        "How much coding have you done before?",
      ],
      answers: [
        {
          label: "Never coded",
          text: "Never written code. Wants plain-language explanations and small steps.",
        },
        {
          label: "A little HTML/JS",
          text: "Has edited some HTML and JavaScript. Understands the basics, new to frameworks.",
        },
        {
          label: "Code every day",
          text: "Professional developer. Wants a systematic way to go from idea to MVP.",
        },
      ],
      reply: "Thanks! I saved this to devpost/learner-profile.md. Next, run /2-scope.",
      doc: [
        "# Learner Profile",
        "",
        "## Initial Idea",
        "An English vocabulary flashcard app for Vietnamese learners.",
        "",
        "## Demonstrated Technical and Agent Experience",
        "{answer}",
        "",
        "## Collaboration Preferences",
        "One question at a time.",
      ],
      details: {
        purpose:
          "Checks you're in a fresh folder, explains flipped interaction (the agent asks, you answer), and records your background.",
        file: "devpost/learner-profile.md — kept private, never committed.",
        tip: "Answer richly. Speaking is about 3× faster than typing — try speech-to-text.",
        example: "\"I read some JavaScript and I want to build a flashcard app for my students.\"",
      },
    }),
    3: stage({
      title: "/2-scope",
      caption:
        "The most important conversation: the agent pulls the idea out of your head, then cuts it down to a small proof of concept.",
      chat: [
        "Let's find what makes your idea yours. There are thousands of flashcard apps.",
        "What should make yours different from the others?",
      ],
      answers: [
        {
          label: "Words from real songs",
          text: "Every card shows the word inside a line from an English song the learner likes.",
        },
        {
          label: "Vietnamese sound hints",
          text: "Each word comes with a pronunciation hint written with Vietnamese sounds.",
        },
        {
          label: "Smart review timing",
          text: "Cards come back right before you'd forget them (spaced repetition).",
        },
      ],
      reply: "That's the unique kernel — we'll build it first. Saved to devpost/scope.md.",
      doc: [
        "# Flashcards for Vietnamese Learners",
        "",
        "## The Unique Kernel",
        "{answer}",
        "",
        "## The POC Boundary",
        "1. Study today's cards  2. Flip a card  3. Mark known / unknown",
        "",
        "## Explicitly Cut",
        "Accounts, leaderboards, a mobile app.",
      ],
      details: {
        purpose:
          "Interviews you one question at a time to find the idea's unique kernel, then trims it to a proof of concept you can finish.",
        file: "devpost/scope.md — the idea, its kernel, what's in, what's cut.",
        tip: "Don't accept a generic idea. If your answer could describe any app, the agent will push for something more yours.",
        example: "\"Not just flashcards — every word comes from a song lyric I already love.\"",
      },
    }),
    4: stage({
      title: "/3-prd",
      caption:
        "Turns the approved scope into a full product description: the core journey, every screen, states and edge cases. No code talk yet.",
      chat: [
        "Now let's describe exactly what a user experiences, step by step.",
        "When someone opens the app, what should the first screen show?",
      ],
      answers: [
        {
          label: "Today's 10 cards",
          text: "The first screen shows today's 10 cards with a big \"Start\" button.",
        },
        {
          label: "Streak + Start",
          text: "The first screen shows the day streak 🔥 and one \"Continue learning\" button.",
        },
        {
          label: "Pick a topic",
          text: "The first screen lists topics (Travel, Food, School) to pick from.",
        },
      ],
      reply: "Clear. I wrote the full journey and acceptance criteria into devpost/prd.md.",
      doc: [
        "# Product Requirements",
        "",
        "## The Core Journey",
        "1. {answer}",
        "2. The learner flips a card and hears the word.",
        "3. They mark it Known or Again.",
        "",
        "## Acceptance criteria",
        "- [ ] Flipping a card shows the meaning in Vietnamese.",
      ],
      details: {
        purpose:
          "Defines what the product does — journey, screens, behaviors, empty and error states — and a firm proof-of-concept boundary.",
        file: "devpost/prd.md — the product definition everyone (you and the agent) builds against.",
        tip: "Describe what the user sees and does, not how it's coded. Tech choices come in the next step.",
        example: "\"If there are no cards left today, show a cheerful 'All done!' screen.\"",
      },
    }),
    5: stage({
      title: "/4-spec",
      caption:
        "The technical blueprint: stack, where it runs, components, data, and file structure — sized to a proof of concept and to you.",
      chat: [
        "Time for the blueprint. I'll suggest options; you decide.",
        "Where should the app keep the cards and your progress?",
      ],
      answers: [
        {
          label: "In the browser",
          text: "Browser storage (localStorage) — no server, no account, free to host.",
        },
        {
          label: "A small database",
          text: "A hosted database (e.g. Supabase) — progress syncs across devices.",
        },
        {
          label: "A JSON file",
          text: "A JSON file shipped with the app — simplest, progress resets on reload.",
        },
      ],
      reply: "Good choice for a POC. The full blueprint is in devpost/spec.md.",
      doc: [
        "# Technical Spec",
        "",
        "## Stack",
        "Next.js + React + Tailwind.",
        "",
        "## Data Model",
        "{answer}",
        "",
        "## File Structure",
        "app/  components/  content/words.ts",
      ],
      details: {
        purpose:
          "Chooses the stack and architecture with you, explains each choice in plain words, and maps files and data before any code.",
        file: "devpost/spec.md — the blueprint the build follows.",
        tip: "Ask \"what's simpler?\" Every server, account, or paid API is something that can break during your demo.",
        example: "\"I already know Next.js from another project — let's use that.\"",
      },
    }),
    6: stage({
      title: "/5-build",
      caption:
        "The agent turns the plan into small working slices, builds them one by one, verifies and commits each — and stops so you can try the app.",
      chat: [
        "Plan: 3 slices. Slice 1 — see today's cards and flip one.",
        "Slice 1 built ✓  verified ✓  committed ✓",
        "Checkpoint: open http://localhost:3000 and flip a few cards. Approve, or ask for a change?",
      ],
      answers: [
        {
          label: "Approve",
          text: "Checkpoint 1 — approved as is.",
          reply: "Great! Slice 2 ✓  Slice 3 ✓ — all verified and committed. Checklist complete.",
        },
        {
          label: "Request a change",
          text: "Checkpoint 1 — asked for bigger cards with a flip animation → done.",
          reply: "Got it — bigger cards with a flip animation. Re-verified ✓. Then Slice 2 ✓  Slice 3 ✓.",
        },
      ],
      doc: [
        "# Build Checklist",
        "",
        "- [x] 1. See today's cards and flip one",
        "- [x] 2. Mark Known / Again",
        "- [x] 3. Cards come back tomorrow",
        "",
        "## Hands-on Checkpoints",
        "{answer}",
      ],
      details: {
        purpose:
          "Builds in thin end-to-end slices, runs a real check after each one, commits it, and pauses at checkpoints for your feedback.",
        file: "devpost/checklist.md — the build plan and progress; re-run /5-build to resume anytime.",
        tip: "Actually open the app at each checkpoint. Approving without looking is how bugs reach your demo.",
        example: "\"The cards are too small on my phone — can they fill the screen?\"",
      },
    }),
    7: stage({
      title: "/6-ship",
      caption:
        "Checks the app is ready, makes sure no secrets go public, then guides the public GitHub repo, the demo video, and your own submission.",
      chat: [
        "Before anything goes public, I'm scanning the files for secrets…",
        "⚠ Found an API key in src/config.js: \"sk-demo-1234…\" (a fake one, for this demo). Anyone could copy it from a public repo.",
        "Shall I move it into .env (ignored by git)?",
      ],
      answers: [
        {
          label: "🔧 Fix",
          text: "Moved the key to .env.",
          reply:
            "Fixed ✓ .env is ignored ✓ Pushed to a public GitHub repo ✓. Your turn: record a short demo video, then write your Devpost submission in your own words.",
        },
      ],
      details: {
        purpose:
          "Final checks, secret and privacy scan, public GitHub repo, short demo video, then you write the submission yourself.",
        file: "No new devpost/ file — the repo URL and video link are recorded in your notes.",
        tip: "Never commit API keys or devpost/learner-profile.md. And write the submission yourself — the agent will only fix spelling.",
        example: "Demo video: open the app, show the core journey once, end on the result.",
      },
    }),
  },
  tips: {
    gotIt: "Got it",
    label: "Tip",
    clear: {
      title: "Type /clear between steps",
      body: "Start each skill with a fresh conversation. You lose nothing — devpost/ is the agent's memory card, and every step reads it.",
    },
    speech: {
      title: "Talk, don't type",
      body: "Use speech-to-text for the interviews. You speak about 3× faster than you type, so your answers come out richer and more personal.",
    },
    review: {
      title: "Review before you approve",
      body: "Read each document before saying \"looks good\". Fixing a plan costs a sentence; fixing built code costs much more.",
    },
  },
  completion: {
    badge: "Journey complete!",
    body: "You've seen all 7 steps. Now make a new empty folder and run them for real.",
    startOver: "Start over",
  },
};

export type Dictionary = typeof en;

export function stageText(t: Dictionary, id: number): StageText {
  return (t.stages as Record<number, StageText>)[id];
}
