export const LANDING_SLUGS = [
  "hide-browser-tabs",
  "hide-chrome-tabs",
  "hide-tabs-from-boss",
  "chrome-panic-button",
  "mute-browser-tabs",
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
  problem: { title: string; copy: string; items: string[] };
  flow: { before: string; action: string; after: string };
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
      { title: "Emergency Mode", copy: "Hide and mute matching tabs together when speed matters." },
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
    image: "/promo-images/SBA_Settings_1280x800.png",
    imageAlt: "Stealth Browser Assistant settings in Google Chrome",
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
      { title: "Add Emergency Mode", copy: "Combine hiding with muting for a faster response." },
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
    cta: "Get the Emergency Shortcut",
    image: "/promo-images/someone-coming.png",
    imageAlt: "Someone approaching while a user triggers the Stealth Browser Assistant emergency shortcut",
    problem: {
      title: "Work on one side. Personal browsing on the other.",
      copy: "A screen share, shared computer, or unexpected conversation can expose unrelated tabs. SBA gives you a quick, controlled response.",
      items: ["Keep work tabs visible", "Hide personal matches", "Mute matching media at the same time"],
    },
    flow: { before: "Work + personal tabs", action: "Emergency shortcut", after: "Work tabs remain" },
    howTitle: "One shortcut, two privacy actions",
    steps: [
      { title: "Define personal matches", copy: "Add the sites or words that identify tabs you do not want visible." },
      { title: "Configure Emergency Mode", copy: "Choose Hide and Mute for matching tabs." },
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
      { question: "Does Emergency Mode also mute sound?", answer: "Emergency actions can be configured to hide and mute matching tabs together." },
      { question: "Is my browsing sent to a server?", answer: "SBA performs keyword matching locally in the browser; review the privacy policy for full details." },
    ],
  },
  "chrome-panic-button": {
    slug: "chrome-panic-button",
    title: "Chrome Panic Button — Hide Tabs Instantly | SBA",
    description: "Turn your browser into a panic button. Instantly hide and mute selected Chrome tabs with one keyboard shortcut.",
    eyebrow: "EMERGENCY MODE",
    headline: "A panic button for your browser.",
    lead: "Someone walked in? Hide and mute selected tabs instantly with one keyboard shortcut.",
    cta: "Set Up Your Panic Button",
    image: "/promo-images/chrome-panic-button-shortcut.png",
    imageAlt: "Stealth Browser Assistant Emergency action setting for muting and hiding matching tabs",
    problem: {
      title: "You do not always have time to close tabs one by one.",
      copy: "Emergency Mode handles every matching tab in one action, so your visible browser and its audio change together.",
      items: ["Hide matching tabs", "Mute matching tabs", "Keep unrelated work tabs visible"],
    },
    flow: { before: "Video · Shopping · Work · Private", action: "Emergency Mode", after: "Work · Gmail · Sheets" },
    howTitle: "What the panic button does",
    steps: [
      { title: "Match", copy: "SBA identifies open tabs using your own keywords and website rules." },
      { title: "Hide", copy: "Matching tabs disappear from the visible tab strip." },
      { title: "Mute", copy: "Audio from those matching tabs is silenced at the same time." },
    ],
    featuresTitle: "Fast by design",
    features: [
      { title: "One shortcut", copy: "Trigger the full emergency action without opening the popup." },
      { title: "Multiple matches", copy: "Handle several configured tabs in the same action." },
      { title: "Custom rules", copy: "Your keywords decide which tabs are affected." },
      { title: "Separate actions", copy: "Use Hide or Mute alone when you do not need both." },
    ],
    compatibility: "Emergency Mode is available in SBA for Chrome, Edge, and Firefox.",
    ctaTitle: "Be ready before someone walks in.",
    ctaCopy: "Install SBA and configure your emergency shortcut.",
    faq: [
      { question: "What is a Chrome panic button?", answer: "It is a keyboard shortcut that quickly applies configured actions to matching browser tabs." },
      { question: "What does SBA Emergency Mode do?", answer: "It can hide and mute all matching tabs in one action." },
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
      { title: "Emergency Mode", copy: "Need more than silence? Hide and mute matching tabs together." },
    ],
    compatibility: "Mute matching tabs with SBA on Chrome, Edge, and Firefox.",
    ctaTitle: "Stop unexpected tab audio.",
    ctaCopy: "Install SBA and create a mute shortcut that matches your workflow.",
    faq: [
      { question: "Can SBA mute multiple tabs?", answer: "Yes. The Mute action applies to open tabs that match your configured keywords." },
      { question: "Will muting close the tab?", answer: "No. Mute and Close are separate actions." },
      { question: "Can I choose which tabs are muted?", answer: "Yes. You control matching through your own keywords and website rules." },
      { question: "Can SBA hide and mute together?", answer: "Yes. Emergency Mode can combine both actions for matching tabs." },
    ],
  },
};

export function isLandingSlug(value: string): value is LandingSlug {
  return LANDING_SLUGS.includes(value as LandingSlug);
}

export function getLandingPage(slug: LandingSlug) {
  return en[slug];
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (configured ?? (vercel ? `https://${vercel}` : "http://localhost:4000")).replace(/\/$/, "");
}
