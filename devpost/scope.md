---
doc: scope
status: approved
---

# [Working title: Skill Pack Guide — name not chosen yet]

A bilingual (English–Vietnamese), **interactive** website that walks people step by step through using Devpost Learn's Build With AI: Basics skill pack — where to go, which command to type, what they'll see — and only then explains the method behind it and the tips.

## The Unique Kernel
**Learn by "trying it" on the page, not just reading.** The user steps through a simulated walkthrough (folder → install command → `/1-start` … `/6-ship`) and sees in advance what they'll type and how the agent will respond — before doing it for real on their own machine.
In the learner's words: "phần key và quan trọng nhất vẫn là interactive hướng dẫn người dùng cách dùng Skill ra sao, vào đâu, gõ dòng lệnh nào, rồi sau đó mới là giải thích lý do, cho best practice, Tips" *(the key and most important part is an interactive guide to how to use the Skills — where to go, which command to type — and only after that the reasons, best practices, and tips).*

## Who It's For
People who want to build products with AI and have plenty of ideas, but "không biết start từ đâu và đi theo luồng suy nghĩ thế nào" *(don't know where to start or what flow of thinking to follow)*. Includes complete beginners and people who already code but lack a systematic method for building an MVP. Today they have to watch long English-language videos or read the hackathon page and figure it out themselves.

## The Core Loop
Open the page → pick EN/VI → step through the interactive walkthrough (click "next", copy the command, see the simulated response) → click any of the 6 steps in the flow diagram for details → read the "why" and the tips. They come back while doing it for real, when they forget the next step or which command to type.

## Inspiration & Identity
- Beautiful, interactive, easy to use; "càng nhiều tương tác, chart, flow và âm thanh, nhạc càng tốt" *(the more interactivity, charts, flows, sound and music, the better)*.
- Content sources (summarized and rewritten in our own words, with links — never the transcripts copied verbatim):
  - Joe — "Stop Building Generic AI Apps: The Flipped Interaction Method": https://www.youtube.com/watch?v=sooC4QGFUUs
  - Joe — live build of "Who Let The Dogs Out": https://www.youtube.com/watch?v=0Zi0OkKTZqM
- The actual skills in `.agents/skills/` are the authoritative reference for command names and the documents each step produces.

## Why This Matters to the Learner
They want a page where "người dùng đọc lại là biết cách dùng Skill như thế nào, dùng sao cho hiệu quả, phương pháp đằng sau Skill, các ví dụ cụ thể khi dùng SKILL" *(readers come away knowing how to use the Skills, how to use them effectively, the method behind them, and concrete examples)*.

## What "Working" Looks Like
Open the site in a browser → switch EN/VI → go through the whole interactive walkthrough from creating a folder to `/6-ship`, each step with a copyable command and a simulated result → click a step in the flow diagram to open its details → in the "why" section, drag decision cards between "AI" and "You" and watch an app preview change.
**The "oh, that's cool" moment:** the viewer watches the whole 6-step journey "run" in front of them as if they were using it for real.

## The POC Boundary
1. **Interactive step-by-step walkthrough** (top priority): where to go, which command to type (copyable), simulated response.
2. **Clickable 6-step flow diagram** — each step: what it does, which file it creates in `devpost/`, a tip, a concrete example.
3. **"Why"**: the method (flipped interaction, cognitive debt, writing things down as memory, building in small steps) + the "Who makes the decisions?" drag-and-drop.
4. **Best practices & tips** (speech-to-text, `/clear` between steps, write your own submission, never expose API keys…).
- **Bilingual EN/VI** with a toggle.
- Small sound effects (click / drop / complete) with a mute toggle.

## Later
- Charts (typing 40 vs. speaking 130 words per minute, etc.).
- Background music.
- Mini-game: drag the 6 steps into the right order; comprehension checks.

## Explicitly Cut
- Running real commands in the browser — simulation only; users run the real thing on their own machine (safe, simple).
- Copying video transcripts verbatim — respects copyright; we rewrite in our own words and link to the videos.
- Accounts/login, backend, saved progress — not needed to prove the kernel.
