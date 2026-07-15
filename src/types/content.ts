/**
 * Shared content types for the portfolio.
 * All copy lives in `src/data/*` and conforms to these interfaces so the site
 * stays easy to maintain and confidentiality-safe (see ImpactType).
 */

/** Whether a quantified outcome is confirmed/delivered or projected. */
export type ImpactType = "realized" | "estimated";

/** Lifecycle status of a product/initiative. */
export type ProjectStatus = "launched" | "ongoing" | "concept";

export interface Metric {
  /** Short code, e.g. "users", used for keys. */
  id: string;
  /** Numeric target for the animated counter (0 if non-numeric). */
  value: number;
  /** Prefix rendered before the number, e.g. "RM". */
  prefix?: string;
  /** Suffix rendered after the number, e.g. "K+", "M+", "+". */
  suffix?: string;
  /** Headline label, e.g. "Registered users". */
  label: string;
  /** Supporting one-liner for tooltip / caption. */
  detail: string;
  /** Distinguishes realized vs estimated figures. */
  type: ImpactType;
  /** Optional decimal places for the counter. */
  decimals?: number;
}

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  location?: string;
  start: string; // e.g. "Feb 2026"
  end: string; // e.g. "Present"
  period: string; // display string, e.g. "Feb 2026 — Present"
  summary: string;
  highlights: string[];
  /** Optional grouped sub-achievements (used by the current role). */
  achievements?: { title: string; points: string[] }[];
  current?: boolean;
}

export interface ImpactStat {
  label: string;
  value: string;
  type: ImpactType;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string[];
  status: ProjectStatus;
  summary: string;
  problem: string;
  role: string;
  responsibilities: string[];
  solution: string[];
  impact: ImpactStat[];
  capabilities: string[];
  technologies: string[];
  confidentialNote?: string;
  featured: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface LeadershipPrinciple {
  id: string;
  title: string;
  description: string;
}

/** A node in the Product Operating System loop. */
export interface OperatingStep {
  id: string;
  index: number;
  title: string;
  description: string;
}

/** A domain node in the AI operating model. */
export interface AiNode {
  id: string;
  title: string;
  example: string;
}

export interface EducationItem {
  credential: string;
  institution: string;
  location?: string;
  year: string;
  note?: string;
}

export interface Certification {
  title: string;
  issuer?: string;
  year?: string;
}

/** MDX-backed insight/article (blog scaffold — none authored yet). */
export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  tags: string[];
}
