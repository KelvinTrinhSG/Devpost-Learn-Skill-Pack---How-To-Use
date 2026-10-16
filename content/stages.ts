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
  tipKey?: string; // TipPopup when leaving this stage
};

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
  },
];
