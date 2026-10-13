export type Lang = "fr" | "en";

export interface NavItem {
  id: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employer: string;
  period: string;
  summary: string;
  context: string;
  groups: { title: string; items: string[] }[];
  team: string;
  stack: string[];
  url?: string;
}

export interface Step {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  kicker: string;
  period: string;
  role: string;
  summary: string;
  points: string[];
  stack: string[];
  visual: "rag" | "access" | "delivery";
  visualTitle: string;
  visualCaption: string;
  steps?: Step[];
}

export interface StackRow {
  label: string;
  where: string;
  from: string;
  to: string | null;
}

export interface Content {
  lang: Lang;
  meta: { title: string; description: string };
  nav: NavItem[];
  ui: {
    switchLabel: string;
    switchHref: string;
    themeToggle: string;
    openPalette: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
    copyEmail: string;
    copied: string;
    downloadCv: string;
    viewSite: string;
    skipToContent: string;
  };
  palette: {
    placeholder: string;
    empty: string;
    groups: { navigate: string; actions: string; links: string };
    actions: {
      copyEmail: string;
      downloadCv: string;
      toggleTheme: string;
      switchLang: string;
      linkedin: string;
      github: string;
      email: string;
    };
    hint: string;
  };
  hero: {
    eyebrow: string;
    before: string;
    words: string[];
    after: string;
    facts: string[];
    localTime: string;
    status: string;
    currentLabel: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  marquee: { label: string; items: string[] };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    figures: { value: number; suffix?: string; label: string }[];
    portraitAlt: string;
  };
  experience: {
    label: string;
    title: string;
    contextLabel: string;
    teamLabel: string;
    stackLabel: string;
    items: Experience[];
  };
  projects: {
    label: string;
    title: string;
    roleLabel: string;
    githubCta: string;
    items: Project[];
    access: {
      levelLabel: string;
      loginLabel: string;
      content: string;
      locked: string;
      unlocked: string;
      extras: string;
    };
    rag: { question: string; answer: string; replay: string };
    delivery: { replay: string };
  };
  expertise: {
    label: string;
    title: string;
    timelineTitle: string;
    now: string;
    rows: StackRow[];
    groups: { title: string; items: string[] }[];
    methodsTitle: string;
    methods: string[];
  };
  education: {
    label: string;
    title: string;
    items: { period: string; degree: string; school: string; details?: string[] }[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  contact: {
    label: string;
    title: string;
    titleEmphasis: string;
    text: string;
    emailLabel: string;
    elsewhere: string;
  };
  footer: { built: string; hint: string };
}
