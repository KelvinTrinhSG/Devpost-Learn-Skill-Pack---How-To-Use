import type { Dictionary } from "./en";

// Vietnamese dictionary — typed as Dictionary, so a missing or extra key fails the build.
export const vi: Dictionary = {
  meta: {
    title: "Skill Pack — Cách dùng | Build With AI: Basics",
    description:
      "Thử bộ skill Build With AI: Basics của Devpost Learn bằng trình mô phỏng bấm-là-chạy, rồi hiểu vì sao nó hiệu quả.",
  },
  nav: {
    name: "Skill Pack — Cách dùng",
    language: "Ngôn ngữ",
  },
  hero: {
    badge: "Hướng dẫn cộng đồng, không chính thức",
    titleStart: "Thử bộ skill trước khi",
    titleHighlight: "build thật",
    subline:
      "Bấm qua đủ 7 bước của Build With AI: Basics (Devpost Learn) — xem gõ lệnh gì, agent hỏi gì, file nào xuất hiện — rồi làm thật trên máy của bạn.",
  },
  sim: {
    stageLabel: "Bước",
    simulated: "Mô phỏng mẫu",
    run: "Chạy",
    running: "Đang chạy…",
    next: "Bước tiếp theo",
    pickAnswer: "Chọn một câu trả lời:",
    you: "Bạn",
    agent: "Claude",
    stageDone: "Hoàn thành bước",
    details: "Chi tiết",
    hideDetails: "Ẩn chi tiết",
    detailPurpose: "Bước này làm gì",
    detailFile: "File được tạo",
    detailTip: "Mẹo",
    detailExample: "Ví dụ",
    commandLabel: "Lệnh thật",
    tabs: { terminal: "Terminal", chat: "Claude Code", files: "devpost/" },
    terminalIdle: "Bấm Chạy để xem bước này.",
    chatIdle: "Bấm Chạy để gửi lệnh cho agent.",
    chatOtherStage: "Bước này chạy trong terminal.",
    filesEmpty: "Thư mục dự án vẫn còn trống.",
    pickFile: "Bấm vào một file để xem.",
    folderNote: "Thư mục skill (hướng dẫn cho agent)",
    jumpTo: "Đến bước",
  },
  copy: {
    copy: "Copy",
    copied: "Đã copy ✓",
    fallback: "Nhấn Ctrl+C để copy",
  },
  stages: {
    1: {
      title: "Cài đặt",
      caption:
        "Tạo một thư mục dự án trống, cài bộ skill vào đó, rồi mở Claude Code ngay trong thư mục.",
      details: {
        purpose:
          "Tải 6 skill (1-start … 6-ship) vào dự án để agent biết phương pháp làm việc.",
        file: ".agents/skills/ — mỗi skill một thư mục. devpost/ lúc này chưa có gì.",
        tip: "Luôn bắt đầu trong một thư mục mới, trống: một thư mục = một dự án.",
        example: "mkdir my-flashcards → cd my-flashcards → npx skills add … → claude",
      },
    },
    2: {
      title: "/1-start",
      caption:
        "Agent giới thiệu phương pháp và hỏi về bạn, để mọi bước sau hợp với kinh nghiệm của bạn.",
      chat: [
        "Chào bạn! Trước khi lên kế hoạch, mình muốn hiểu bạn một chút. Mình hỏi — bạn trả lời bằng lời của bạn.",
        "Bạn đã từng viết code nhiều chưa?",
      ],
      answers: [
        {
          label: "Chưa code bao giờ",
          text: "Chưa từng viết code. Muốn giải thích dễ hiểu và đi từng bước nhỏ.",
        },
        {
          label: "Biết chút HTML/JS",
          text: "Đã sửa một ít HTML và JavaScript. Hiểu cơ bản, chưa quen framework.",
        },
        {
          label: "Code hằng ngày",
          text: "Lập trình viên chuyên nghiệp. Muốn một cách làm có hệ thống từ ý tưởng đến MVP.",
        },
      ],
      reply: "Cảm ơn bạn! Mình đã lưu vào devpost/learner-profile.md. Tiếp theo, chạy /2-scope.",
      doc: [
        "# Hồ sơ người học",
        "",
        "## Ý tưởng ban đầu",
        "Một app flashcard học từ vựng tiếng Anh cho người Việt.",
        "",
        "## Kinh nghiệm kỹ thuật và dùng agent",
        "{answer}",
        "",
        "## Cách làm việc mong muốn",
        "Mỗi lần hỏi một câu.",
      ],
      details: {
        purpose:
          "Kiểm tra bạn đang ở thư mục mới, giải thích \"flipped interaction\" (agent hỏi, bạn trả lời), và ghi lại nền tảng của bạn.",
        file: "devpost/learner-profile.md — giữ riêng tư, không bao giờ commit.",
        tip: "Trả lời thật chi tiết. Nói nhanh hơn gõ khoảng 3 lần — hãy thử nhập bằng giọng nói.",
        example: "\"Mình đọc được JavaScript và muốn làm app flashcard cho học sinh của mình.\"",
      },
    },
  },
};
