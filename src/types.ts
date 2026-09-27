export type Locale = "ko" | "en";
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export type LinkItem = {
  label: string;
  href: string;
};

export type LocalizedText = Record<Locale, string>;
export type InlineTextPart = {
  text: string;
  href?: string;
};
export type LocalizedInlineText = Record<Locale, InlineTextPart[]>;

export type LocalizedList = Record<Locale, string[]>;

export type SkillItem = {
  name: string;
  iconKey: string;
  description: LocalizedInlineText;
};

export type SkillCategory = {
  title: LocalizedText;
  items: SkillItem[];
};

export type PortfolioItem = {
  title: string;
  description: LocalizedText;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export type ProjectItem = {
  title: string;
  role: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
  githubUrl: string;
  liveUrl?: string;
};

export type ExperienceItem = {
  period: string;
  company: LocalizedText;
  position: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
};

export type EducationItem = {
  period: string;
  institution: LocalizedText;
  program: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
};

export type OtherItem = {
  period: string;
  organization: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
};

export type LearningHistoryItem = {
  period: string;
  institution: LocalizedText;
  program: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
};

export type CertificationItem = {
  title: LocalizedText;
  grade?: string;
  acquiredAt: string;
  description?: LocalizedText;
};
