// Language-independent stage scripts. The simulator "plays" these;
// all visitor-facing prose for a stage lives in content/en.ts and content/vi.ts.

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Stage = {
  id: StageId;
  command: string; // exact real command, copied as-is
  tab: "terminal" | "chat" | "files";
  terminalLines?: string[]; // played one by one; lines starting with "$ " are typed commands
  files?: string[]; // paths that appear in the project tree when the stage completes
  interaction: "run" | "answer" | "approve" | "fix";
  tipKey?: TipKey; // TipPopup when leaving this stage
};

export type TipKey = "clear" | "speech" | "review";

export const PROJECT_FOLDER = "my-flashcards";

export const stages: Stage[] = [
  {
    id: 1,
    command: "npx skills add challengepost/learn-ai-basics",
    tab: "terminal",
    terminalLines: [
      `$ mkdir ${PROJECT_FOLDER} && cd ${PROJECT_FOLDER}`,
      "$ npx skills add challengepost/learn-ai-basics",
      "◇ Source: github.com/challengepost/learn-ai-basics",
      "◇ Found 6 skills",
      "  ✓ 1-start   ✓ 2-scope   ✓ 3-prd",
      "  ✓ 4-spec    ✓ 5-build   ✓ 6-ship",
      "◆ Installed to .agents/skills/",
      "$ claude",
    ],
    files: [
      ".agents/skills/1-start/",
      ".agents/skills/2-scope/",
      ".agents/skills/3-prd/",
      ".agents/skills/4-spec/",
      ".agents/skills/5-build/",
      ".agents/skills/6-ship/",
    ],
    interaction: "run",
  },
  {
    id: 2,
    command: "/1-start",
    tab: "chat",
    files: ["devpost/learner-profile.md"],
    interaction: "answer",
    tipKey: "clear",
  },
  {
    id: 3,
    command: "/2-scope",
    tab: "chat",
    files: ["devpost/scope.md"],
    interaction: "answer",
    tipKey: "speech",
  },
  {
    id: 4,
    command: "/3-prd",
    tab: "chat",
    files: ["devpost/prd.md"],
    interaction: "answer",
  },
  {
    id: 5,
    command: "/4-spec",
    tab: "chat",
    files: ["devpost/spec.md"],
    interaction: "answer",
    tipKey: "review",
  },
  {
    id: 6,
    command: "/5-build",
    tab: "chat",
    files: ["devpost/checklist.md"],
    interaction: "approve",
  },
  {
    id: 7,
    command: "/6-ship",
    tab: "chat",
    interaction: "fix",
  },
];
