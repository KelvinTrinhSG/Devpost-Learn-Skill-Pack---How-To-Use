// English dictionary — the source of the Dictionary type.
// content/vi.ts must have exactly the same keys, or the build fails.

export type StageText = {
  title: string; // short name in the progress rail
  caption: string; // what this stage is for
  chat?: string[]; // agent messages in the Claude Code tab; the last one is the question
  answers?: { label: string; text: string }[]; // preset answers: button label + text inserted into the doc
  reply?: string; // agent's reply after the visitor answers
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
  },
};

export type Dictionary = typeof en;

export function stageText(t: Dictionary, id: number): StageText {
  return (t.stages as Record<number, StageText>)[id];
}
