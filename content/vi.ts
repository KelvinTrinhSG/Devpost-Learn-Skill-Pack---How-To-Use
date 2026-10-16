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
    toDark: "Chuyển sang giao diện tối",
    toLight: "Chuyển sang giao diện sáng",
    mute: "Tắt âm thanh",
    unmute: "Bật âm thanh",
  },
  mode: {
    label: "Bạn muốn dùng trang này thế nào?",
    guided: "Hướng dẫn từng bước",
    quick: "Tôi biết rồi",
  },
  quick: {
    title: "7 lệnh cần nhớ",
    intro: "Chạy lần lượt trong một thư mục dự án mới, trống. Gõ /clear giữa các bước.",
  },
  welcome: {
    back: "Chào mừng trở lại — tiếp tục ở bước {n}.",
    startOver: "Làm lại từ đầu",
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
      short: "Cài 6 skill vào .agents/skills/",
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
      short: "Tìm hiểu về bạn → devpost/learner-profile.md",
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
    3: {
      title: "/2-scope",
      short: "Tìm lõi ý tưởng → devpost/scope.md",
      caption:
        "Cuộc trò chuyện quan trọng nhất: agent khơi ý tưởng từ đầu bạn ra, rồi cắt gọn thành một bản thử nghiệm (proof of concept) nhỏ.",
      chat: [
        "Cùng tìm điều làm ý tưởng này là của riêng bạn nhé. Có hàng nghìn app flashcard rồi.",
        "App của bạn nên khác các app khác ở điểm nào?",
      ],
      answers: [
        {
          label: "Từ vựng trong bài hát",
          text: "Mỗi thẻ hiển thị từ nằm trong một câu hát tiếng Anh mà người học thích.",
        },
        {
          label: "Gợi ý phát âm kiểu Việt",
          text: "Mỗi từ kèm gợi ý phát âm viết bằng âm tiếng Việt.",
        },
        {
          label: "Ôn đúng lúc sắp quên",
          text: "Thẻ quay lại đúng lúc bạn sắp quên (lặp lại ngắt quãng).",
        },
      ],
      reply: "Đó chính là \"lõi độc đáo\" — mình sẽ build nó trước tiên. Đã lưu vào devpost/scope.md.",
      doc: [
        "# Flashcard cho người Việt học tiếng Anh",
        "",
        "## Lõi độc đáo",
        "{answer}",
        "",
        "## Giới hạn bản thử nghiệm",
        "1. Học thẻ hôm nay  2. Lật thẻ  3. Đánh dấu nhớ / chưa nhớ",
        "",
        "## Cắt bỏ",
        "Tài khoản, bảng xếp hạng, app di động.",
      ],
      details: {
        purpose:
          "Phỏng vấn bạn từng câu một để tìm lõi độc đáo của ý tưởng, rồi cắt gọn thành bản thử nghiệm bạn làm xong được.",
        file: "devpost/scope.md — ý tưởng, phần lõi, cái gì làm, cái gì bỏ.",
        tip: "Đừng chấp nhận ý tưởng chung chung. Nếu câu trả lời của bạn đúng với mọi app, agent sẽ hỏi tiếp để tìm điều riêng của bạn.",
        example: "\"Không chỉ là flashcard — mỗi từ lấy từ lời một bài hát mình vốn đã thích.\"",
      },
    },
    4: {
      title: "/3-prd",
      short: "Mô tả sản phẩm → devpost/prd.md",
      caption:
        "Biến scope đã duyệt thành mô tả sản phẩm đầy đủ: hành trình chính, từng màn hình, các trạng thái và trường hợp đặc biệt. Chưa bàn về code.",
      chat: [
        "Giờ mình mô tả chính xác người dùng trải nghiệm gì, từng bước một.",
        "Khi ai đó mở app, màn hình đầu tiên nên hiển thị gì?",
      ],
      answers: [
        {
          label: "10 thẻ của hôm nay",
          text: "Màn hình đầu hiển thị 10 thẻ của hôm nay và một nút \"Bắt đầu\" lớn.",
        },
        {
          label: "Chuỗi ngày + Bắt đầu",
          text: "Màn hình đầu hiển thị chuỗi ngày học 🔥 và một nút \"Học tiếp\".",
        },
        {
          label: "Chọn chủ đề",
          text: "Màn hình đầu liệt kê các chủ đề (Du lịch, Ăn uống, Trường học) để chọn.",
        },
      ],
      reply: "Rõ rồi. Mình đã viết đủ hành trình và tiêu chí nghiệm thu vào devpost/prd.md.",
      doc: [
        "# Yêu cầu sản phẩm",
        "",
        "## Hành trình chính",
        "1. {answer}",
        "2. Người học lật thẻ và nghe phát âm.",
        "3. Đánh dấu Đã nhớ hoặc Học lại.",
        "",
        "## Tiêu chí nghiệm thu",
        "- [ ] Lật thẻ thì thấy nghĩa tiếng Việt.",
      ],
      details: {
        purpose:
          "Định nghĩa sản phẩm làm gì — hành trình, màn hình, hành vi, trạng thái trống và lỗi — cùng ranh giới rõ ràng cho bản thử nghiệm.",
        file: "devpost/prd.md — bản mô tả sản phẩm mà bạn và agent cùng build theo.",
        tip: "Mô tả người dùng thấy gì và làm gì, chưa cần nói code thế nào. Chọn công nghệ là bước sau.",
        example: "\"Nếu hôm nay hết thẻ thì hiện màn hình 'Xong rồi!' thật vui.\"",
      },
    },
    5: {
      title: "/4-spec",
      short: "Bản thiết kế kỹ thuật → devpost/spec.md",
      caption:
        "Bản thiết kế kỹ thuật: công nghệ, chạy ở đâu, các thành phần, dữ liệu, cấu trúc file — vừa với bản thử nghiệm và vừa với bạn.",
      chat: [
        "Đến lúc vẽ bản thiết kế. Mình gợi ý các lựa chọn, bạn quyết định.",
        "App nên lưu thẻ và tiến độ học ở đâu?",
      ],
      answers: [
        {
          label: "Trong trình duyệt",
          text: "Bộ nhớ trình duyệt (localStorage) — không cần server, không tài khoản, host miễn phí.",
        },
        {
          label: "Một database nhỏ",
          text: "Database trên mạng (ví dụ Supabase) — tiến độ đồng bộ giữa các thiết bị.",
        },
        {
          label: "Một file JSON",
          text: "File JSON đi kèm app — đơn giản nhất, tải lại trang thì mất tiến độ.",
        },
      ],
      reply: "Lựa chọn hợp lý cho bản thử nghiệm. Bản thiết kế đầy đủ nằm trong devpost/spec.md.",
      doc: [
        "# Đặc tả kỹ thuật",
        "",
        "## Công nghệ",
        "Next.js + React + Tailwind.",
        "",
        "## Mô hình dữ liệu",
        "{answer}",
        "",
        "## Cấu trúc file",
        "app/  components/  content/words.ts",
      ],
      details: {
        purpose:
          "Cùng bạn chọn công nghệ và kiến trúc, giải thích từng lựa chọn bằng lời dễ hiểu, và vạch ra file, dữ liệu trước khi viết code.",
        file: "devpost/spec.md — bản thiết kế để build theo.",
        tip: "Hãy hỏi \"cách nào đơn giản hơn?\". Mỗi server, tài khoản hay API trả phí đều là thứ có thể hỏng giữa lúc demo.",
        example: "\"Mình đã biết Next.js từ dự án khác — dùng nó nhé.\"",
      },
    },
    6: {
      title: "/5-build",
      short: "Build từng lát đã kiểm tra → devpost/checklist.md",
      caption:
        "Agent chia kế hoạch thành các lát nhỏ chạy được, build từng lát, kiểm tra và commit — rồi dừng lại để bạn dùng thử app.",
      chat: [
        "Kế hoạch: 3 lát. Lát 1 — xem thẻ hôm nay và lật một thẻ.",
        "Lát 1 đã build ✓  kiểm tra ✓  commit ✓",
        "Điểm dừng: mở http://localhost:3000 và lật thử vài thẻ. Bạn duyệt, hay muốn sửa gì?",
      ],
      answers: [
        {
          label: "Duyệt",
          text: "Điểm dừng 1 — duyệt, giữ nguyên.",
          reply: "Tuyệt! Lát 2 ✓  Lát 3 ✓ — đều đã kiểm tra và commit. Hoàn tất checklist.",
        },
        {
          label: "Yêu cầu sửa",
          text: "Điểm dừng 1 — yêu cầu thẻ to hơn, có hiệu ứng lật → đã làm.",
          reply: "Đã hiểu — thẻ to hơn, có hiệu ứng lật. Kiểm tra lại ✓. Sau đó Lát 2 ✓  Lát 3 ✓.",
        },
      ],
      doc: [
        "# Checklist build",
        "",
        "- [x] 1. Xem thẻ hôm nay và lật một thẻ",
        "- [x] 2. Đánh dấu Đã nhớ / Học lại",
        "- [x] 3. Thẻ quay lại vào ngày mai",
        "",
        "## Điểm dừng dùng thử",
        "{answer}",
      ],
      details: {
        purpose:
          "Build theo từng lát mỏng chạy được từ đầu đến cuối, kiểm tra thật sau mỗi lát, commit, và dừng ở các điểm hẹn để bạn góp ý.",
        file: "devpost/checklist.md — kế hoạch build và tiến độ; chạy lại /5-build để làm tiếp bất cứ lúc nào.",
        tip: "Hãy thật sự mở app ở mỗi điểm dừng. Duyệt mà không xem là cách lỗi lọt vào video demo.",
        example: "\"Thẻ trên điện thoại nhỏ quá — cho nó to hết màn hình được không?\"",
      },
    },
    7: {
      title: "/6-ship",
      short: "Repo công khai, video demo, bài nộp của bạn",
      caption:
        "Kiểm tra app đã sẵn sàng, đảm bảo không lộ bí mật, rồi hướng dẫn tạo repo GitHub công khai, video demo, và bài nộp do chính bạn viết.",
      chat: [
        "Trước khi công khai, mình quét các file để tìm thông tin bí mật…",
        "⚠ Tìm thấy API key trong src/config.js: \"sk-demo-1234…\" (key giả, chỉ để minh hoạ). Ai cũng có thể copy nó từ repo công khai.",
        "Mình chuyển nó vào .env (git sẽ bỏ qua file này) nhé?",
      ],
      answers: [
        {
          label: "🔧 Sửa",
          text: "Đã chuyển key vào .env.",
          reply:
            "Đã sửa ✓ .env được git bỏ qua ✓ Đã push lên repo GitHub công khai ✓. Đến lượt bạn: quay một video demo ngắn, rồi tự viết bài nộp Devpost bằng lời của bạn.",
        },
      ],
      details: {
        purpose:
          "Kiểm tra cuối, quét bí mật và thông tin riêng tư, repo GitHub công khai, video demo ngắn, rồi bạn tự viết bài nộp.",
        file: "Không có file devpost/ mới — link repo và video được ghi lại trong ghi chú của bạn.",
        tip: "Không bao giờ commit API key hay devpost/learner-profile.md. Và hãy tự viết bài nộp — agent chỉ sửa chính tả.",
        example: "Video demo: mở app, đi qua hành trình chính một lần, kết thúc ở kết quả.",
      },
    },
  },
  tips: {
    gotIt: "Đã hiểu",
    label: "Mẹo",
    clear: {
      title: "Gõ /clear giữa các bước",
      body: "Bắt đầu mỗi skill bằng một cuộc trò chuyện mới. Bạn không mất gì cả — devpost/ là \"thẻ nhớ\" của agent, và bước nào cũng đọc nó.",
    },
    speech: {
      title: "Nói thay vì gõ",
      body: "Dùng nhập bằng giọng nói cho các buổi phỏng vấn. Bạn nói nhanh hơn gõ khoảng 3 lần, nên câu trả lời sẽ chi tiết và mang dấu ấn riêng hơn.",
    },
    review: {
      title: "Đọc kỹ trước khi duyệt",
      body: "Đọc từng tài liệu trước khi nói \"ổn rồi\". Sửa kế hoạch chỉ tốn một câu; sửa code đã build tốn hơn nhiều.",
    },
  },
  why: {
    label: "Vì sao hiệu quả",
    title: "Bạn ra quyết định. Agent lo phần gõ code.",
    intro:
      "Bộ skill không phải cách nhanh hơn để \"xin\" một cái app. Đó là một phương pháp giữ bạn làm chủ những gì được build — và làm cho kết quả mang dấu ấn của bạn.",
    points: [
      {
        title: "Đảo chiều tương tác",
        body: "Thay vì bạn phải viết một câu lệnh hoàn hảo, agent phỏng vấn bạn — mỗi lần một câu. Ý tưởng và lựa chọn đều đến từ bạn.",
      },
      {
        title: "Không \"nợ nhận thức\"",
        body: "Nếu agent build những thứ bạn chưa từng nghĩ kỹ, bạn sẽ sở hữu một app mà chính mình không hiểu. Cùng lên kế hoạch trước giúp bạn vẫn là người làm chủ.",
      },
      {
        title: "Tài liệu là bộ nhớ",
        body: "Agent quên sạch giữa các cuộc trò chuyện. scope.md, prd.md, spec.md và checklist.md mang mọi quyết định đi tiếp, nên mở chat mới cũng không mất gì.",
      },
      {
        title: "Bước nhỏ, có kiểm tra",
        body: "Build một lát chạy được, kiểm tra, commit, rồi lặp lại. Vấn đề lộ ra sớm, và lúc nào cũng có một phiên bản chạy được.",
      },
    ],
    game: {
      title: "Ai ra quyết định?",
      intro:
        "Kéo từng quyết định sang AI hoặc Bạn và xem app thay đổi. Bàn phím: Tab đến thẻ, Space để nhấc, phím mũi tên để di chuyển, Space để thả.",
      tray: "Chưa quyết định",
      zoneAi: "🤖 AI quyết",
      zoneYou: "🙋 Bạn quyết",
      dropHere: "Thả vào đây",
      reset: "Đặt lại",
      cards: {
        name: "Tên app",
        color: "Màu chủ đạo",
        features: "Tính năng chính",
        style: "Phong cách",
        audience: "Đối tượng",
        font: "Phông chữ",
      },
      count: "AI: {ai} · Bạn: {you} · Chưa quyết: {tray}",
      verdicts: {
        generic: "Chung chung — giống hàng nghìn app khác",
        mixed: "Đang tới — đã có phần là của bạn",
        personal: "Cá nhân — không ai khác build ra được",
      },
      preview: {
        aiName: "VocabMaster AI",
        youName: "Hát Là Nhớ",
        aiTagline: "Học từ vựng thông minh hơn. Dành cho mọi người.",
        youTagline: "Từ vựng tiếng Anh cho teen Việt học bằng cách hát.",
        aiFeatures: ["Flashcard", "Trắc nghiệm", "Mục tiêu mỗi ngày"],
        youFeatures: ["Từ vựng trong bài hát bạn thích", "Chế độ hát theo", "Gợi ý phát âm kiểu Việt"],
        start: "Bắt đầu",
        youStart: "Mở một bài hát ♪",
      },
    },
  },
  completion: {
    badge: "Hoàn thành hành trình!",
    body: "Bạn đã xem đủ 7 bước. Giờ hãy tạo một thư mục trống mới và chạy thật nhé.",
    startOver: "Làm lại từ đầu",
    quickLink: "Xem tất cả lệnh",
  },
};
