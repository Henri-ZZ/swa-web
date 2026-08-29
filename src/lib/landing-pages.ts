export const LANDING_SLUGS = [
  "hide-browser-tabs",
  "hide-chrome-tabs",
  "hide-tabs-from-boss",
  "panic-button",
  "chrome-panic-button",
  "mute-browser-tabs",
  "emergency-tab-close",
  "clean-porn-history",
] as const;

export type LandingSlug = (typeof LANDING_SLUGS)[number];

export type LandingPageContent = {
  slug: LandingSlug;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lead: string;
  cta: string;
  image: string;
  imageAlt: string;
  answer?: string;
  supportingIntents?: { eyebrow: string; title: string; copy: string }[];
  problem: { title: string; copy: string; items: string[] };
  flow: { before: string; action: string; after: string };
  flowEyebrow?: string;
  flowTitle?: string;
  howTitle: string;
  steps: { title: string; copy: string }[];
  featuresTitle: string;
  features: { title: string; copy: string }[];
  compatibility: string;
  ctaTitle: string;
  ctaCopy: string;
  faq: { question: string; answer: string }[];
};

const en: Record<LandingSlug, LandingPageContent> = {
  "hide-browser-tabs": {
    slug: "hide-browser-tabs",
    title: "How to Hide Browser Tabs Quickly | Stealth Browser Assistant",
    description:
      "Hide browser tabs instantly without closing them. Stealth Browser Assistant lets you hide matching tabs with customizable keywords and keyboard shortcuts.",
    eyebrow: "HIDE BROWSER TABS",
    headline: "Hide browser tabs instantly.",
    lead: "Keep private or distracting tabs out of sight with a single keyboard shortcut.",
    cta: "Install Stealth Browser Assistant",
    image: "/promo-images/keywords-match.png",
    imageAlt: "Stealth Browser Assistant matching browser tabs by custom keywords",
    problem: {
      title: "Need to hide a tab right now?",
      copy: "Instead of closing your tabs one by one, hide matching tabs instantly and return to them when you are ready.",
      items: ["Someone is approaching", "You are sharing your screen", "Personal tabs are open on a work computer"],
    },
    flow: { before: "Tabs visible", action: "Press your hide shortcut", after: "Matching tabs disappear" },
    howTitle: "How tab hiding works",
    steps: [
      { title: "Choose your keywords", copy: "Add websites, domains, or words that identify the tabs you want to control." },
      { title: "Choose Hide", copy: "Assign the Hide action to matching tabs in your settings." },
      { title: "Press your shortcut", copy: "SBA finds the matches and hides them without closing your whole session." },
    ],
    featuresTitle: "Fast control, built around your rules",
    features: [
      { title: "Hide tabs", copy: "Hide matching tabs without closing them." },
      { title: "Custom keywords", copy: "You decide which websites and page titles match." },
      { title: "Keyboard shortcuts", copy: "Act without opening the extension popup." },
      { title: "Panic Button", copy: "Hide and mute matching tabs together when speed matters." },
    ],
    compatibility: "Available for Chrome, Edge, and Firefox.",
    ctaTitle: "Ready to hide your tabs?",
    ctaCopy: "Install SBA and set up your first shortcut in minutes.",
    faq: [
      { question: "Can I hide multiple browser tabs at once?", answer: "Yes. SBA applies the selected action to every open tab that matches your configured keywords." },
      { question: "Can I hide tabs without closing them?", answer: "Yes. The Hide action removes matching tabs from view without using the Close action." },
      { question: "Can I choose which websites are hidden?", answer: "Yes. You create the keywords, domains, or title matches that SBA uses." },
      { question: "Which browsers are supported?", answer: "SBA is available for Chrome, Microsoft Edge, and Firefox." },
    ],
  },
  "hide-chrome-tabs": {
    slug: "hide-chrome-tabs",
    title: "How to Hide Chrome Tabs Quickly | Stealth Browser Assistant",
    description: "Learn how to hide Chrome tabs without closing them. Hide matching tabs with a keyboard shortcut using Stealth Browser Assistant.",
    eyebrow: "FOR GOOGLE CHROME",
    headline: "Need to hide Chrome tabs quickly?",
    lead: "Hide selected Chrome tabs with a keyboard shortcut instead of closing them.",
    cta: "Hide Chrome Tabs with SBA",
    image: "/promo-images/SBA_Small_Promo_Tile_440x280.png",
    imageAlt: "Stealth Browser Assistant for private browsing with Mute, Hide, and Clean actions",
    answer: "Yes — you can hide Chrome tabs without closing them. Define the pages you want SBA to match, then trigger Hide with a keyboard shortcut.",
    problem: {
      title: "Keep the session. Remove the distraction.",
      copy: "Closing a tab can interrupt what you were doing. Hiding lets you clear the Chrome tab strip while preserving the tabs you may need later.",
      items: ["Keep matching tabs available", "Leave work tabs untouched", "Restore hidden tabs when you are ready"],
    },
    flow: { before: "YouTube · Reddit · Gmail · Work", action: "Chrome hide shortcut", after: "Gmail · Work" },
    howTitle: "How to hide Chrome tabs",
    steps: [
      { title: "Install SBA for Chrome", copy: "Add Stealth Browser Assistant from the Chrome Web Store." },
      { title: "Add websites or keywords", copy: "Tell SBA which open tabs should be considered a match." },
      { title: "Set a shortcut", copy: "Use Chrome's extension shortcut settings to choose a key combination." },
      { title: "Press it when needed", copy: "Matching tabs are hidden while the rest of your Chrome window stays intact." },
    ],
    featuresTitle: "Why hide instead of close?",
    features: [
      { title: "Preserve your session", copy: "Keep the relevant browsing state available for later." },
      { title: "Control several tabs", copy: "Handle matching tabs together rather than one at a time." },
      { title: "Use your own rules", copy: "Match by the keywords and sites that matter to you." },
      { title: "Add the Panic Button", copy: "Combine hiding with muting for a faster response." },
    ],
    compatibility: "Built for Chrome and also available on Edge and Firefox.",
    ctaTitle: "Hide what you need. Keep the rest.",
    ctaCopy: "Add SBA to Chrome and create your first hide shortcut.",
    faq: [
      { question: "Does hiding a Chrome tab close it?", answer: "No. Hide and Close are separate SBA actions." },
      { question: "Can I hide several Chrome tabs together?", answer: "Yes. SBA can act on all tabs that match the keywords you configured." },
      { question: "Can I customize the shortcut?", answer: "Yes. Extension keyboard shortcuts can be customized through Chrome's shortcut settings." },
      { question: "Can SBA decide what is private for me?", answer: "No. You define your own matching keywords and rules." },
    ],
  },
  "hide-tabs-from-boss": {
    slug: "hide-tabs-from-boss",
    title: "How to Hide Tabs From Your Boss Quickly | SBA",
    description: "Need to hide personal tabs at work? Quickly hide selected browser tabs with a keyboard shortcut using Stealth Browser Assistant.",
    eyebrow: "WORK & SCREEN SHARING",
    headline: "Someone is coming. Hide your tabs.",
    lead: "Keep personal browsing out of sight before it appears in a shared screen or work conversation.",
    cta: "Get the Panic Button",
    image: "/promo-images/someone-coming.png",
    imageAlt: "Someone approaching while a user triggers the Stealth Browser Assistant panic shortcut",
    problem: {
      title: "Work on one side. Personal browsing on the other.",
      copy: "A screen share, shared computer, or unexpected conversation can expose unrelated tabs. SBA gives you a quick, controlled response.",
      items: ["Keep work tabs visible", "Hide personal matches", "Mute matching media at the same time"],
    },
    flow: { before: "Work + personal tabs", action: "Panic shortcut", after: "Work tabs remain" },
    howTitle: "One shortcut, two privacy actions",
    steps: [
      { title: "Define personal matches", copy: "Add the sites or words that identify tabs you do not want visible." },
      { title: "Configure the Panic Button", copy: "Choose Mute and Hide for matching tabs." },
      { title: "Use the shortcut", copy: "Trigger both actions before sharing your screen or handing over your computer." },
    ],
    featuresTitle: "Useful beyond one awkward moment",
    features: [
      { title: "At work", copy: "Separate personal browsing from the tabs you need for work." },
      { title: "Screen sharing", copy: "Keep unrelated tabs out of your presentation." },
      { title: "Shared computers", copy: "Quickly control tabs you do not want left visible." },
      { title: "Unexpected audio", copy: "Silence matching media before it interrupts the room." },
    ],
    compatibility: "Use the same privacy workflow on Chrome, Edge, or Firefox.",
    ctaTitle: "Keep personal browsing private.",
    ctaCopy: "Set your matching rules before you need them.",
    faq: [
      { question: "Will SBA hide every tab?", answer: "Only tabs matching the keywords you configure are affected by matching actions." },
      { question: "Can it help during screen sharing?", answer: "Yes. You can hide matching unrelated tabs before or during a screen-sharing session." },
      { question: "Does the Panic Button also mute sound?", answer: "The Panic Button can be configured to hide and mute matching tabs together." },
      { question: "Is my browsing sent to a server?", answer: "SBA performs keyword matching locally in the browser; review the privacy policy for full details." },
    ],
  },
  "panic-button": {
    slug: "panic-button",
    title: "Browser Panic Button — Hide & Mute Tabs Instantly | SBA",
    description:
      "Use a browser panic button to instantly hide and mute matching tabs with one customizable shortcut. Available for Chrome, Edge, and Firefox.",
    eyebrow: "BROWSER PANIC BUTTON",
    headline: "One panic button. Private tabs out of sight.",
    lead: "Instantly hide and mute every matching tab while leaving unrelated tabs open.",
    cta: "Get the Panic Button",
    image: "/promo-images/someone-coming.png",
    imageAlt:
      "Stealth Browser Assistant panic button hiding and muting matching browser tabs when someone approaches",
    answer:
      "A browser panic button gives you one fast, customizable shortcut for hiding and muting matching tabs across Chrome, Edge, and Firefox.",
    problem: {
      title: "When someone walks in, every second counts.",
      copy: "Searching through a crowded tab bar is slow, and muting only one tab may leave another making sound. SBA applies your chosen panic action to every tab matching your own rules.",
      items: [
        "Hide matching tabs from view",
        "Mute matching audio at the same time",
        "Leave unrelated tabs open and visible",
      ],
    },
    flow: {
      before: "Private tabs are visible and playing",
      action: "Press the panic shortcut",
      after: "Matching tabs are hidden and silent",
    },
    howTitle: "How to set up your browser panic button",
    steps: [
      {
        title: "Define what should match",
        copy: "Add the websites, domains, URLs, or page-title keywords you want SBA to recognize.",
      },
      {
        title: "Choose the panic action",
        copy: "Use the free Mute and Hide action, or choose Close matching tabs with Premium.",
      },
      {
        title: "Customize the shortcut",
        copy: "Assign a keyboard combination you can reach quickly in your browser's extension shortcut settings.",
      },
      {
        title: "Press it when needed",
        copy: "SBA acts on all current matches together without disturbing unrelated tabs.",
      },
    ],
    featuresTitle: "A panic button built around your rules",
    features: [
      {
        title: "Free Mute and Hide",
        copy: "Silence matching audio and move matching tabs out of sight in one action.",
      },
      {
        title: "Premium Close action",
        copy: "Choose to close all matching tabs when hiding is not enough.",
      },
      {
        title: "Custom matching",
        copy: "You decide which websites and page-title keywords the Panic Button affects.",
      },
      {
        title: "Custom shortcut",
        copy: "Trigger the Panic Button without opening the extension popup.",
      },
    ],
    compatibility:
      "The SBA Panic Button is available on Chrome, Edge, and Firefox. Mute and Hide is free; Close matching tabs requires Premium.",
    ctaTitle: "Set up your Panic Button before you need it.",
    ctaCopy:
      "Install Stealth Browser Assistant, define your matching rules, and choose a shortcut you can press instantly.",
    faq: [
      {
        question: "What is a browser panic button?",
        answer: "It is a fast browser-extension action that hides, mutes, or closes selected tabs when you press a customizable shortcut.",
      },
      {
        question: "Does the Panic Button hide every browser tab?",
        answer: "No. SBA acts only on tabs matching the keywords, domains, URLs, or page-title rules you configure.",
      },
      {
        question: "Is the SBA Panic Button free?",
        answer: "Yes. The Mute and Hide Panic Button action is free. Closing all matching tabs with the Panic Button is a Premium option.",
      },
      {
        question: "Can I customize the panic button shortcut?",
        answer: "Yes. Chrome, Edge, and Firefox let you assign your preferred keyboard shortcut to the extension action.",
      },
      {
        question: "Does it work on Chrome, Edge, and Firefox?",
        answer: "Yes. Stealth Browser Assistant and its Panic Button are available for all three browsers.",
      },
    ],
  },
  "chrome-panic-button": {
    slug: "chrome-panic-button",
    title: "Chrome Panic Button — Hide Tabs Instantly | SBA",
    description: "Turn your browser into a panic button. Instantly hide and mute selected Chrome tabs with one keyboard shortcut.",
    eyebrow: "CHROME PANIC BUTTON",
    headline: "A panic button for your browser.",
    lead: "Someone walked in? Hide and mute selected tabs instantly with one keyboard shortcut.",
    cta: "Set Up Your Panic Button",
    image: "/promo-images/someone-coming.png",
    imageAlt: "Stealth Browser Assistant Chrome panic button hiding and muting matching tabs",
    problem: {
      title: "You do not always have time to close tabs one by one.",
      copy: "The Panic Button handles every matching tab in one action, so your visible browser and its audio change together.",
      items: ["Hide matching tabs", "Mute matching tabs", "Keep unrelated work tabs visible"],
    },
    flow: { before: "Video · Shopping · Work · Private", action: "Panic Button", after: "Work · Gmail · Sheets" },
    howTitle: "What the panic button does",
    steps: [
      { title: "Match", copy: "SBA identifies open tabs using your own keywords and website rules." },
      { title: "Hide", copy: "Matching tabs disappear from the visible tab strip." },
      { title: "Mute", copy: "Audio from those matching tabs is silenced at the same time." },
    ],
    featuresTitle: "Fast by design",
    features: [
      { title: "One shortcut", copy: "Trigger the Panic Button without opening the popup." },
      { title: "Multiple matches", copy: "Handle several configured tabs in the same action." },
      { title: "Custom rules", copy: "Your keywords decide which tabs are affected." },
      { title: "Separate actions", copy: "Use Hide or Mute alone when you do not need both." },
    ],
    compatibility: "The Panic Button is available in SBA for Chrome, Edge, and Firefox.",
    ctaTitle: "Be ready before someone walks in.",
    ctaCopy: "Install SBA and configure your panic shortcut.",
    faq: [
      { question: "What is a Chrome panic button?", answer: "It is a keyboard shortcut that quickly applies configured actions to matching browser tabs." },
      { question: "What does the SBA Panic Button do?", answer: "It can hide and mute all matching tabs in one action." },
      { question: "Does it affect my work tabs?", answer: "Only tabs that match your configured rules are targeted." },
      { question: "Can I change the keyboard shortcut?", answer: "Yes. Configure extension shortcuts through your browser's shortcut settings." },
    ],
  },
  "mute-browser-tabs": {
    slug: "mute-browser-tabs",
    title: "How to Mute Browser Tabs Quickly | Stealth Browser Assistant",
    description: "Mute browser tabs instantly with customizable keywords and keyboard shortcuts. Silence distracting or unexpected audio without closing tabs.",
    eyebrow: "MUTE BROWSER TABS",
    headline: "Unexpected sound? Mute it instantly.",
    lead: "Silence matching browser tabs without closing them or searching for the noisy tab.",
    cta: "Install SBA",
    image: "/promo-images/popup.png",
    imageAlt: "Stealth Browser Assistant popup showing the Mute Tabs action",
    problem: {
      title: "Audio should not take over the room.",
      copy: "A video or ad can start while you are working, presenting, or sharing a computer. Use a shortcut to silence matching tabs immediately.",
      items: ["Unexpected video audio", "Distracting media tabs", "Sound during a meeting or presentation"],
    },
    flow: { before: "A matching video starts playing", action: "Press the mute shortcut", after: "Silence" },
    howTitle: "How instant tab muting works",
    steps: [
      { title: "Add matching keywords", copy: "Use sites or words such as video services you want to control." },
      { title: "Assign Mute", copy: "Choose the Mute action and set a keyboard shortcut." },
      { title: "Silence the matches", copy: "Press the shortcut whenever matching tabs start making noise." },
    ],
    featuresTitle: "Silence without losing your place",
    features: [
      { title: "Keep tabs open", copy: "Mute audio without closing the underlying page." },
      { title: "Match several tabs", copy: "Apply Mute to all tabs matching your configured rules." },
      { title: "Keyboard control", copy: "Act without hunting through the tab strip." },
      { title: "Panic Button", copy: "Need more than silence? Hide and mute matching tabs together." },
    ],
    compatibility: "Mute matching tabs with SBA on Chrome, Edge, and Firefox.",
    ctaTitle: "Stop unexpected tab audio.",
    ctaCopy: "Install SBA and create a mute shortcut that matches your workflow.",
    faq: [
      { question: "Can SBA mute multiple tabs?", answer: "Yes. The Mute action applies to open tabs that match your configured keywords." },
      { question: "Will muting close the tab?", answer: "No. Mute and Close are separate actions." },
      { question: "Can I choose which tabs are muted?", answer: "Yes. You control matching through your own keywords and website rules." },
      { question: "Can SBA hide and mute together?", answer: "Yes. The Panic Button can combine both actions for matching tabs." },
    ],
  },
  "emergency-tab-close": {
    slug: "emergency-tab-close",
    title: "Emergency Tab Close — Close Matching Tabs Instantly | SBA",
    description:
      "Use emergency tab close to instantly close matching browser tabs with one customizable shortcut. Keep unrelated tabs open with Stealth Browser Assistant.",
    eyebrow: "EMERGENCY TAB CLOSE",
    headline: "Close matching tabs in an emergency.",
    lead: "When hiding is not enough, close every matching tab with one customizable emergency shortcut.",
    cta: "Set Up Emergency Tab Close",
    image: "/promo-images/someone-coming.png",
    imageAlt:
      "Someone approaching while Stealth Browser Assistant triggers an emergency tab close action",
    answer:
      "Emergency tab close lets you close every open tab that matches your own keywords in one action, while unrelated tabs stay open.",
    problem: {
      title: "Sometimes the tabs need to be gone, not just hidden.",
      copy: "Closing tabs one by one takes time and can expose each page as you search for it. SBA can close all configured matches together when you trigger the Panic Button.",
      items: [
        "Someone is approaching your computer",
        "A screen-sharing session starts unexpectedly",
        "Several matching tabs need to close at once",
      ],
    },
    flow: {
      before: "Matching tabs are open",
      action: "Emergency tab close shortcut",
      after: "Matching tabs are closed",
    },
    howTitle: "How emergency tab close works",
    steps: [
      {
        title: "Define your matching rules",
        copy: "Add the domains, URLs, or title keywords that identify the tabs you may need to close.",
      },
      {
        title: "Choose Close for the Panic Button",
        copy: "Select Close matching tabs as your Premium Panic Button action in SBA settings. Free users can use Hide to remove matching tabs from view without closing them.",
      },
      {
        title: "Customize the shortcut",
        copy: "Use your browser's extension shortcut settings to choose a key combination you can reach quickly.",
      },
      {
        title: "Trigger it when needed",
        copy: "SBA closes all currently matching tabs together and leaves unrelated tabs untouched.",
      },
    ],
    featuresTitle: "Fast closing without closing everything",
    features: [
      {
        title: "Close all matches",
        copy: "Handle several matching tabs with one Panic Button action.",
      },
      {
        title: "Keep unrelated tabs",
        copy: "Tabs outside your matching rules remain open.",
      },
      {
        title: "Your own keywords",
        copy: "You decide which domains, URLs, and page titles count as matches.",
      },
      {
        title: "Custom shortcut",
        copy: "Choose an extension keyboard shortcut that fits your workflow.",
      },
    ],
    compatibility:
      "Emergency tab close is available with SBA Premium on Chrome, Edge, and Firefox. Free users can hide matching tabs instead.",
    ctaTitle: "Be ready before you need to close everything.",
    ctaCopy:
      "Install SBA, define your matching rules, and configure your Panic Button.",
    faq: [
      {
        question: "What is emergency tab close?",
        answer: "It is an SBA Panic Button action that closes every currently open tab matching your configured keywords and website rules.",
      },
      {
        question: "Will emergency tab close close every browser tab?",
        answer: "No. It targets matching tabs only. Tabs that do not match your rules remain open.",
      },
      {
        question: "Can I customize the emergency tab close shortcut?",
        answer: "Yes. You can customize extension keyboard shortcuts through your browser's shortcut settings.",
      },
      {
        question: "Is Close matching tabs a free feature?",
        answer: "Close matching tabs is a Premium Panic Button action. Free users can use Hide to remove matching tabs from view without closing them, and the free Panic Button includes Mute and Hide.",
      },
    ],
  },
  "clean-porn-history": {
    slug: "clean-porn-history",
    title: "Clean Porn History & Hide Porn Tabs Instantly | SBA",
    description:
      "Hide porn tabs instantly, then clear browsing history, download history, cookies, site data, and address bar history with Stealth Browser Assistant.",
    eyebrow: "HIDE NOW · CLEAN AFTER",
    headline: "Hide porn tabs now. Clean your traces afterward.",
    lead: "Start free: use your own keywords and one shortcut to hide and mute matching tabs before anyone sees or hears them.",
    cta: "Hide Tabs Free",
    image: "/promo-images/someone-coming.png",
    imageAlt:
      "Someone approaching while Stealth Browser Assistant hides matching private browser tabs",
    answer:
      "Stealth Browser Assistant helps you hide porn tabs instantly for free. When you want a more complete cleanup, Premium can clear selected private browser data such as browsing history and download history.",
    supportingIntents: [
      {
        eyebrow: "HIDE ADULT TABS",
        title: "How to hide adult tabs instantly",
        copy: "Use Stealth Browser Assistant to hide adult browser tabs with your own website and page-title keywords. The free Hide action keeps matching tabs out of view, while the free Panic Button can hide and mute them together with one keyboard shortcut.",
      },
      {
        eyebrow: "CLEAR BROWSING TRACES",
        title: "How to clear porn history from your browser",
        copy: "Use Premium Clear Private Data when you want to clean porn browsing traces after a session. Choose the browser-data categories you want to clear, including browsing history, download history, cookies and site data, and address bar history. Clearing download history removes the browser record, not files saved on your computer.",
      },
    ],
    problem: {
      title: "Privacy needs two different responses.",
      copy: "When someone approaches, hiding matching tabs is the fastest response. Afterward, you may also want to clear the browser records left behind. SBA supports both parts of that workflow without touching unrelated open tabs.",
      items: [
        "Hide and mute matching tabs immediately",
        "Keep unrelated work and personal tabs available",
        "Clear selected browsing traces when you are ready",
      ],
    },
    flow: {
      before: "Private tabs are visible",
      action: "Hide now · Clean afterward",
      after: "Tabs out of view · selected data cleared",
    },
    flowEyebrow: "IMMEDIATE PRIVACY → OPTIONAL CLEANUP",
    flowTitle: "Hide first. Clean up when you are ready.",
    howTitle: "How to hide porn tabs and clean browsing traces",
    steps: [
      {
        title: "Define your own matches",
        copy: "Add the domains, URLs, or page-title keywords that identify the tabs you want SBA to control. SBA does not decide what counts as adult or private content.",
      },
      {
        title: "Hide and mute for free",
        copy: "Use Hide or the free Panic Button to remove matching tabs from view and silence their audio with a shortcut.",
      },
      {
        title: "Clear private data with Premium",
        copy: "When you are finished, Premium can clear selected categories including browsing history, download history, cookies and site data, and address bar history.",
      },
      {
        title: "Automate cleanup with Premium",
        copy: "Choose automatic cleanup when you want SBA to clear configured private data after the last matching tab is closed.",
      },
    ],
    featuresTitle: "Start free. Add deeper cleanup when you need it.",
    features: [
      {
        title: "Free tab hiding",
        copy: "Hide every tab matching your configured rules without closing unrelated tabs.",
      },
      {
        title: "Free Panic Button",
        copy: "Mute and hide matching tabs together when someone approaches or screen sharing starts.",
      },
      {
        title: "Premium private-data cleanup",
        copy: "Clear selected browser records in one action when hiding alone is not enough.",
      },
      {
        title: "Local matching",
        copy: "Your matching rules and browsing activity stay in your browser instead of being uploaded for analysis.",
      },
    ],
    compatibility:
      "Free Hide, Mute, and the Panic Button are available on Chrome, Edge, and Firefox. Private-data cleanup and automatic cleanup require Premium.",
    ctaTitle: "Start by hiding matching tabs for free.",
    ctaCopy:
      "Install SBA, add your own matching rules, and upgrade later only if you want private-data cleanup and automation.",
    faq: [
      {
        question: "How can I hide porn tabs quickly?",
        answer: "Add your own website or title keywords in SBA, then use Hide or the free Panic Button to hide all currently matching tabs with a shortcut.",
      },
      {
        question: "Can SBA clean porn browsing history?",
        answer: "SBA Premium can clear selected private browser data, including browsing history, download history, cookies and site data, and address bar history. You choose the matching rules and cleanup settings.",
      },
      {
        question: "How do I delete porn history from my browser?",
        answer: "Use SBA Premium's Clear Private Data action to clear the browser-data categories you configure. It can remove browsing-history and download-history records together with other selected private data.",
      },
      {
        question: "Is hiding porn tabs free?",
        answer: "Yes. Hide, Mute, and the Mute-and-Hide Panic Button action are included in the free version. Private-data cleanup and automatic cleanup require Premium.",
      },
      {
        question: "Can I hide adult browser tabs for free?",
        answer: "Yes. Add your own adult-site domains or page-title keywords, then use SBA's free Hide action or the free Mute-and-Hide Panic Button action on matching tabs.",
      },
      {
        question: "Does clearing download history delete downloaded files?",
        answer: "No. Clearing download history removes the browser's download-list records; it does not delete files already saved on your computer.",
      },
      {
        question: "Can SBA clean browsing data automatically?",
        answer: "Yes. Premium includes automatic cleanup that can run after the last matching tab is closed, using the cleanup options you configure.",
      },
      {
        question: "Does SBA automatically detect porn websites?",
        answer: "No. SBA does not classify pages as porn or private content. You define the domains, URLs, and title keywords that should match.",
      },
    ],
  },
};

export function isLandingSlug(value: string): value is LandingSlug {
  return LANDING_SLUGS.includes(value as LandingSlug);
}

export function getLandingPage(slug: LandingSlug) {
  return en[slug];
}
