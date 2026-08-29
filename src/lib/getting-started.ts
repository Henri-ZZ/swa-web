export type GettingStartedLocale = "en" | "zh";

export type TutorialStep = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  bullets: string[];
  screenshot?: {
    src: string;
    width: number;
    height: number;
    label: string;
  };
  note?: string;
  warning?: string;
};

export type GettingStartedContent = {
  metadata: { title: string; description: string };
  headerCta: string;
  installed: { eyebrow: string; title: string; copy: string };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    time: string;
    browsers: string;
  };
  overview: {
    title: string;
    copy: string;
    items: { title: string; copy: string }[];
  };
  stepsHeading: string;
  stepsCopy: string;
  steps: TutorialStep[];
  shortcutTable: {
    eyebrow: string;
    title: string;
    copy: string;
    columns: [string, string];
    rows: [string, string][];
    note: string;
  };
  troubleshooting: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  privacy: { eyebrow: string; title: string; copy: string };
  next: {
    eyebrow: string;
    title: string;
    copy: string;
    links: { href: string; label: string; copy: string }[];
  };
  faqTitle: string;
  faq: { question: string; answer: string }[];
};

const en: GettingStartedContent = {
  metadata: {
    title: "How to Use Stealth Browser Assistant | Getting Started",
    description:
      "Learn how to add Keywords, match private tabs, use Mute and Hide, configure the Panic Button, customize shortcuts, and clean private data.",
  },
  headerCta: "Start setup",
  installed: {
    eyebrow: "INSTALLATION COMPLETE",
    title: "Welcome to Stealth Browser Assistant.",
    copy: "You are installed. Follow the steps below to add your first Keyword and test Mute, Hide, and the Panic Button.",
  },
  hero: {
    eyebrow: "GETTING STARTED",
    title: "Set up private-tab control in a few minutes.",
    copy: "Stealth Browser Assistant matches tabs using the Keywords you choose. Once configured, you can Mute, Hide, or use the Panic Button without searching through your tab bar.",
    primaryCta: "Start with Keywords",
    secondaryCta: "Install SBA",
    time: "About 5 minutes",
    browsers: "Chrome · Edge · Firefox",
  },
  overview: {
    title: "The setup at a glance",
    copy: "Start with the free features. You can add Premium capabilities later if you need deeper cleanup or Close matching tabs.",
    items: [
      { title: "1. Define", copy: "Add up to five Keywords for free." },
      { title: "2. Confirm", copy: "Open a tab whose URL or title matches." },
      { title: "3. Control", copy: "Use Mute, Hide, or the Panic Button." },
    ],
  },
  stepsHeading: "Complete setup step by step",
  stepsCopy: "Follow each step with the matching product screenshot, then test the action in your own browser.",
  steps: [
    {
      id: "open-settings",
      number: "01",
      eyebrow: "OPEN SETTINGS",
      title: "Open the extension and go to Settings",
      copy: "Select the Stealth Browser Assistant icon in your browser toolbar, then open Settings. Pinning the extension first makes the popup easier to reach.",
      bullets: [
        "Chrome and Edge: use the Extensions menu to pin SBA.",
        "Firefox: add SBA to the toolbar if it is inside the extensions menu.",
        "Open Settings from the SBA popup.",
      ],
      screenshot: {
        src: "/getting-started/1.png",
        width: 666,
        height: 852,
        label: "Browser toolbar and the SBA popup with Settings highlighted",
      },
    },
    {
      id: "add-keywords",
      number: "02",
      eyebrow: "ADD KEYWORDS",
      title: "Tell SBA which tabs are private",
      copy: "Enter a domain or ordinary word in the Keywords field, then press Enter or select Add. SBA checks both the tab URL and title using case-insensitive substring matching.",
      bullets: [
        "Use a domain such as example.com for a specific website.",
        "Use an ordinary word such as shopping when several pages share the same term.",
        "Any one matching Keyword makes the tab a match.",
        "Free supports up to five Keywords; Premium removes the limit.",
      ],
      screenshot: {
        src: "/getting-started/2.png",
        width: 1842,
        height: 486,
        label: "SBA Settings with a Keyword being added",
      },
      note: "SBA does not decide what is private. Your own Keywords define which tabs match.",
    },
    {
      id: "confirm-matches",
      number: "03",
      eyebrow: "CONFIRM MATCHES",
      title: "Open a matching tab and check the feedback",
      copy: "Open or refresh a page whose URL or title contains one of your Keywords. Match hit feedback can replace the tab icon, and the optional red border flash can make an active match easier to notice.",
      bullets: [
        "Replace tab icon is enabled by default.",
        "Red border flash can be enabled in Match hit feedback.",
        "Protected browser pages and extension-store pages may block visual feedback.",
      ],
      screenshot: {
        src: "/getting-started/3.png",
        width: 938,
        height: 518,
        label: "A matching browser tab showing Match hit feedback",
      },
    },
    {
      id: "mute-hide",
      number: "04",
      eyebrow: "MUTE & HIDE",
      title: "Try the free Mute and Hide controls",
      copy: "Open the SBA popup. Mute applies browser-native tab muting to current matches and keeps muting new matches while it is on. Hide moves matching tabs into a minimized temporary window and mutes them.",
      bullets: [
        "Turn Mute off to release muting that SBA applied.",
        "Turn Hide off to restore hidden tabs, usually to their original window and position.",
        "If Mute remains on after restoration, matching tabs remain muted.",
      ],
      screenshot: {
        src: "/getting-started/4.png",
        width: 672,
        height: 850,
        label: "SBA popup showing the Mute and Hide controls",
      },
      note: "Hide is not encryption or deletion. It moves matching tabs into a minimized temporary window until Hide is turned off.",
    },
    {
      id: "panic-button",
      number: "05",
      eyebrow: "PANIC BUTTON",
      title: "Configure one shortcut for urgent moments",
      copy: "In Settings, choose the Panic Button action. The free option turns on Mute and Hide together. Premium can instead Close matching tabs immediately.",
      bullets: [
        "Mute and hide matching tabs is available to Free and Premium users.",
        "Close matching tabs is Premium and closes current matches without creating an SBA backup.",
        "The default Panic Button shortcut is Alt + Shift + E and can be customized.",
      ],
      screenshot: {
        src: "/getting-started/5.png",
        width: 922,
        height: 912,
        label: "SBA Settings showing Panic Button action options",
      },
      warning: "Close matching tabs is destructive. Recovery depends on your browser's own reopen-closed-tab behavior.",
    },
    {
      id: "shortcuts",
      number: "06",
      eyebrow: "SHORTCUTS",
      title: "Customize your keyboard shortcuts",
      copy: "Use the shortcut management link in Settings to open your browser's extension-shortcut page. Assign combinations that do not conflict with your browser or operating system.",
      bullets: [
        "Chrome and Edge provide an extension shortcut management page.",
        "Firefox may require you to open its add-on shortcut settings manually.",
        "On macOS, Alt is displayed as Option.",
      ],
      screenshot: {
        src: "/getting-started/6.png",
        width: 1400,
        height: 794,
        label: "Browser extension shortcut settings for SBA",
      },
    },
    {
      id: "clean-private-data",
      number: "07",
      eyebrow: "OPTIONAL · PREMIUM",
      title: "Configure Clean private data when you need it",
      copy: "Premium can remove matching browsing history, Downloads history, and Cookies & site data. Each category is off by default and requests its browser permission only when you enable it.",
      bullets: [
        "Downloads history removes browser records, not downloaded files.",
        "Cookies & site data requires domain-like Keywords and may sign you out of matching websites.",
        "Auto cleanup can run after the last matching tab closes, using your selected cleanup types.",
      ],
      screenshot: {
        src: "/getting-started/7.png",
        width: 1842,
        height: 966,
        label: "SBA Settings showing Clean private data and Auto cleanup",
      },
      warning: "Review the selected data types before running cleanup. Clean private data cannot restore deleted browser records.",
    },
  ],
  shortcutTable: {
    eyebrow: "QUICK REFERENCE",
    title: "Default keyboard shortcuts",
    copy: "Use the defaults immediately or replace them in your browser's extension shortcut settings.",
    columns: ["Action", "Default shortcut"],
    rows: [
      ["Mute", "Alt + Shift + M"],
      ["Hide", "Alt + Shift + H"],
      ["Panic Button", "Alt + Shift + E"],
      ["Clean private data", "Alt + Shift + C"],
    ],
    note: "On macOS, Alt is shown as Option. All shortcuts are customizable.",
  },
  troubleshooting: {
    eyebrow: "TROUBLESHOOTING",
    title: "If something does not work as expected",
    items: [
      {
        question: "A tab is not matching",
        answer: "Check whether the tab URL or title actually contains one of your Keywords. Matching is a case-insensitive substring match, not a regular expression.",
      },
      {
        question: "A keyboard shortcut does nothing",
        answer: "Open your browser's extension shortcut settings and confirm that the shortcut is assigned and does not conflict with another command.",
      },
      {
        question: "I cannot see a hidden tab",
        answer: "Open the SBA popup and turn Hide off. SBA will restore recorded tabs to the original window when possible, or to the most recently focused window.",
      },
      {
        question: "A visual or Pause media feature does not run on a page",
        answer: "Browser internal pages, extension-store pages, and some protected pages block script injection. Browser-native Mute may still work even when page-level feedback or Pause media cannot run.",
      },
    ],
  },
  privacy: {
    eyebrow: "PRIVACY BY DESIGN",
    title: "Your Keywords and browsing activity stay in your browser.",
    copy: "Keyword matching happens locally. SBA does not send your Keywords, tab URLs, page content, or browsing history to its License service. Network requests are limited to License Key activation and status checks.",
  },
  next: {
    eyebrow: "LEARN MORE",
    title: "Explore a feature in more detail",
    copy: "These focused guides explain the most common SBA workflows.",
    links: [
      { href: "/hide-browser-tabs", label: "Hide browser tabs", copy: "Keep matching tabs open but out of view." },
      { href: "/mute-browser-tabs", label: "Mute browser tabs", copy: "Silence matching tabs with native tab muting." },
      { href: "/panic-button", label: "Set up the Panic Button", copy: "Prepare one shortcut for urgent privacy." },
      { href: "/clean-porn-history", label: "Clean private browsing history", copy: "Understand Hide now and optional cleanup afterward." },
    ],
  },
  faqTitle: "Getting started questions",
  faq: [
    {
      question: "Do I need Premium to start using SBA?",
      answer: "No. Free includes up to five Keywords, Match hit feedback, Mute, Hide, and the Mute-and-Hide Panic Button action.",
    },
    {
      question: "Does SBA automatically decide which tabs are private?",
      answer: "No. You define private tabs with your own Keywords. SBA checks each tab's URL and title for those Keywords.",
    },
    {
      question: "How do I restore hidden tabs?",
      answer: "Turn Hide off in the SBA popup or use the Hide shortcut. SBA restores recorded tabs to their previous window and position when possible.",
    },
    {
      question: "Can I change the Panic Button shortcut?",
      answer: "Yes. Open your browser's extension shortcut settings and assign your preferred key combination.",
    },
  ],
};

const zh: GettingStartedContent = {
  metadata: {
    title: "Stealth Browser Assistant 使用教程｜快速开始",
    description:
      "学习添加 Keywords、识别 private tabs、使用 Mute、Hide 与 Panic Button、自定义快捷键，以及配置 Clean private data。",
  },
  headerCta: "开始设置",
  installed: {
    eyebrow: "安装完成",
    title: "欢迎使用 Stealth Browser Assistant。",
    copy: "插件已经安装。按照下面的步骤添加第一个 Keyword，并测试 Mute、Hide 和紧急按钮（Panic Button）。",
  },
  hero: {
    eyebrow: "快速开始",
    title: "几分钟完成 private tabs 管理设置。",
    copy: "Stealth Browser Assistant 使用你选择的 Keywords 匹配标签页。设置完成后，无需在标签栏中逐个寻找，即可执行 Mute、Hide 或 Panic Button。",
    primaryCta: "从 Keywords 开始",
    secondaryCta: "安装 SBA",
    time: "大约 5 分钟",
    browsers: "Chrome · Edge · Firefox",
  },
  overview: {
    title: "设置流程概览",
    copy: "先使用免费功能完成基础设置。以后需要更深入的清理或 Close matching tabs 时，再考虑 Premium。",
    items: [
      { title: "1. 定义", copy: "免费添加最多 5 个 Keywords。" },
      { title: "2. 确认", copy: "打开 URL 或标题能够命中的标签页。" },
      { title: "3. 控制", copy: "使用 Mute、Hide 或 Panic Button。" },
    ],
  },
  stepsHeading: "逐步完成设置",
  stepsCopy: "按照每一步对应的英文界面截图完成设置，然后在自己的浏览器中测试相应操作。",
  steps: [
    {
      id: "open-settings",
      number: "01",
      eyebrow: "打开 SETTINGS",
      title: "打开插件并进入 Settings",
      copy: "点击浏览器工具栏中的 Stealth Browser Assistant 图标，然后打开 Settings。建议先固定插件，方便随时打开 popup。",
      bullets: [
        "Chrome 和 Edge：在扩展菜单中固定 SBA。",
        "Firefox：如果 SBA 位于扩展菜单，可将其添加到工具栏。",
        "从 SBA popup 打开 Settings。",
      ],
      screenshot: {
        src: "/getting-started/1.png",
        width: 666,
        height: 852,
        label: "浏览器工具栏与突出显示 Settings 的 SBA popup",
      },
    },
    {
      id: "add-keywords",
      number: "02",
      eyebrow: "添加 KEYWORDS",
      title: "告诉 SBA 哪些标签页属于 private tabs",
      copy: "在 Keywords 输入框中填写域名或普通词，然后按 Enter 或点击 Add。SBA 会对标签页 URL 和标题进行不区分大小写的子字符串匹配。",
      bullets: [
        "使用 example.com 这样的域名匹配特定网站。",
        "使用 shopping 这样的普通词匹配含有相同词语的多个页面。",
        "任意一个 Keyword 命中，标签页即视为匹配。",
        "Free 最多保存 5 个 Keywords；Premium 不限数量。",
      ],
      screenshot: {
        src: "/getting-started/2.png",
        width: 1842,
        height: 486,
        label: "在 SBA Settings 中添加 Keyword",
      },
      note: "SBA 不会判断什么内容属于 private。哪些标签页匹配，完全由你的 Keywords 决定。",
    },
    {
      id: "confirm-matches",
      number: "03",
      eyebrow: "确认匹配",
      title: "打开匹配标签页并检查 Match hit feedback",
      copy: "打开或刷新 URL、标题中包含 Keyword 的页面。Match hit feedback 可以替换标签页图标，也可以通过可选的红色边框闪烁提示当前页面已经匹配。",
      bullets: [
        "Replace tab icon 默认开启。",
        "可以在 Match hit feedback 中开启 Red border flash。",
        "浏览器保护页面和扩展商店页面可能会阻止视觉反馈。",
      ],
      screenshot: {
        src: "/getting-started/3.png",
        width: 938,
        height: 518,
        label: "显示 Match hit feedback 的匹配标签页",
      },
    },
    {
      id: "mute-hide",
      number: "04",
      eyebrow: "MUTE 与 HIDE",
      title: "试用免费的 Mute 和 Hide",
      copy: "打开 SBA popup。Mute 使用浏览器原生标签页静音处理当前匹配标签页，并在开启期间自动处理新的匹配标签页。Hide 会将匹配标签页移入最小化的暂存窗口，同时保持静音。",
      bullets: [
        "关闭 Mute 会释放由 SBA 设置的静音。",
        "关闭 Hide 会恢复隐藏标签页，并尽量放回原窗口和原位置。",
        "如果恢复时 Mute 仍然开启，匹配标签页会继续保持静音。",
      ],
      screenshot: {
        src: "/getting-started/4.png",
        width: 672,
        height: 850,
        label: "显示 Mute 与 Hide 控件的 SBA popup",
      },
      note: "Hide 不是加密或删除。它会把匹配标签页移动到最小化的暂存窗口，直到你关闭 Hide。",
    },
    {
      id: "panic-button",
      number: "05",
      eyebrow: "PANIC BUTTON",
      title: "为紧急场景配置一个快捷键",
      copy: "在 Settings 中选择 Panic Button action。免费选项会同时开启 Mute 和 Hide；Premium 还可以选择立即 Close matching tabs。",
      bullets: [
        "Mute and hide matching tabs 对 Free 和 Premium 用户都可用。",
        "Close matching tabs 仅限 Premium，并且 SBA 不会为关闭的标签页创建备份。",
        "Panic Button 默认快捷键为 Alt + Shift + E，可以自定义。",
      ],
      screenshot: {
        src: "/getting-started/5.png",
        width: 922,
        height: 912,
        label: "SBA Settings 中的 Panic Button action 选项",
      },
      warning: "Close matching tabs 属于不可撤销操作。能否恢复取决于浏览器自身的“重新打开关闭的标签页”功能。",
    },
    {
      id: "shortcuts",
      number: "06",
      eyebrow: "快捷键",
      title: "自定义键盘快捷键",
      copy: "通过 Settings 中的快捷键管理入口打开浏览器扩展快捷键页面。请选择不会与浏览器或操作系统冲突的按键组合。",
      bullets: [
        "Chrome 和 Edge 提供扩展快捷键管理页面。",
        "Firefox 可能需要手动进入附加组件快捷键设置。",
        "macOS 会将 Alt 显示为 Option。",
      ],
      screenshot: {
        src: "/getting-started/6.png",
        width: 1400,
        height: 794,
        label: "浏览器中的 SBA 扩展快捷键设置",
      },
    },
    {
      id: "clean-private-data",
      number: "07",
      eyebrow: "可选 · PREMIUM",
      title: "需要时配置 Clean private data",
      copy: "Premium 可以清理匹配的浏览历史、Downloads history 以及 Cookies & site data。所有类型默认关闭，只有主动开启时才会请求相应浏览器权限。",
      bullets: [
        "Downloads history 只移除浏览器记录，不会删除实际下载文件。",
        "Cookies & site data 需要域名型 Keywords，并可能让你退出匹配网站。",
        "Auto cleanup 可以在最后一个匹配标签页关闭后，按照选定的类型自动清理。",
      ],
      screenshot: {
        src: "/getting-started/7.png",
        width: 1842,
        height: 966,
        label: "SBA Settings 中的 Clean private data 与 Auto cleanup",
      },
      warning: "执行前请确认清理类型。Clean private data 无法恢复已删除的浏览器记录。",
    },
  ],
  shortcutTable: {
    eyebrow: "快速参考",
    title: "默认键盘快捷键",
    copy: "你可以直接使用默认按键，也可以在浏览器扩展快捷键设置中修改。",
    columns: ["操作", "默认快捷键"],
    rows: [
      ["Mute", "Alt + Shift + M"],
      ["Hide", "Alt + Shift + H"],
      ["Panic Button", "Alt + Shift + E"],
      ["Clean private data", "Alt + Shift + C"],
    ],
    note: "macOS 会将 Alt 显示为 Option。所有快捷键都可以自定义。",
  },
  troubleshooting: {
    eyebrow: "问题排查",
    title: "如果功能没有按预期工作",
    items: [
      {
        question: "标签页没有匹配",
        answer: "检查标签页的 URL 或标题是否真的包含某个 Keyword。匹配方式是不区分大小写的子字符串匹配，不支持正则表达式。",
      },
      {
        question: "按下快捷键没有反应",
        answer: "打开浏览器扩展快捷键设置，确认快捷键已经分配，并且没有与其他命令发生冲突。",
      },
      {
        question: "找不到隐藏的标签页",
        answer: "打开 SBA popup 并关闭 Hide。SBA 会尽量恢复到原窗口；原窗口不存在时，会恢复到最近使用的窗口。",
      },
      {
        question: "某个页面没有视觉反馈或无法 Pause media",
        answer: "浏览器内部页面、扩展商店页面和部分保护页面会阻止脚本注入。即使页面级反馈或 Pause media 无法运行，浏览器原生 Mute 仍可能正常工作。",
      },
    ],
  },
  privacy: {
    eyebrow: "隐私设计",
    title: "你的 Keywords 和浏览活动留在浏览器中。",
    copy: "Keyword 匹配在本地完成。SBA 不会把 Keywords、标签页 URL、页面内容或浏览历史发送到 License 服务。网络请求仅用于 License Key 激活和状态检查。",
  },
  next: {
    eyebrow: "继续了解",
    title: "深入查看具体功能",
    copy: "以下专题指南介绍最常见的 SBA 使用场景。",
    links: [
      { href: "/hide-browser-tabs", label: "隐藏浏览器标签页", copy: "保留匹配标签页，但将它们移出视图。" },
      { href: "/mute-browser-tabs", label: "静音浏览器标签页", copy: "使用浏览器原生静音控制匹配标签页。" },
      { href: "/panic-button", label: "设置 Panic Button", copy: "提前准备一个应对紧急隐私场景的快捷键。" },
      { href: "/clean-porn-history", label: "清理 private browsing history", copy: "了解立即 Hide 与后续可选清理。" },
    ],
  },
  faqTitle: "快速开始常见问题",
  faq: [
    {
      question: "开始使用 SBA 必须购买 Premium 吗？",
      answer: "不需要。Free 包含最多 5 个 Keywords、Match hit feedback、Mute、Hide，以及 Mute and Hide Panic Button action。",
    },
    {
      question: "SBA 会自动判断哪些标签页属于 private 吗？",
      answer: "不会。你通过自己的 Keywords 定义 private tabs，SBA 只检查标签页 URL 和标题是否包含这些 Keywords。",
    },
    {
      question: "如何恢复隐藏的标签页？",
      answer: "在 SBA popup 中关闭 Hide，或者使用 Hide 快捷键。SBA 会尽量将记录的标签页恢复到之前的窗口和位置。",
    },
    {
      question: "可以修改 Panic Button 快捷键吗？",
      answer: "可以。在浏览器扩展快捷键设置中分配你习惯的按键组合。",
    },
  ],
};

export function getGettingStartedContent(locale: string): GettingStartedContent {
  return locale === "zh" ? zh : en;
}
