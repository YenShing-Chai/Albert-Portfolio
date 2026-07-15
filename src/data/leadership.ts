import type {
  AiNode,
  Certification,
  EducationItem,
  LeadershipPrinciple,
  OperatingStep,
} from "@/types/content";

export const leadershipPrinciples: LeadershipPrinciple[] = [
  {
    id: "strategy-accountability",
    title: "Strategy with accountability",
    description:
      "Translate business goals into measurable product priorities, roadmaps, and outcomes.",
  },
  {
    id: "commercial-thinking",
    title: "Commercial product thinking",
    description:
      "Balance customer value, technical feasibility, operational efficiency, and business impact.",
  },
  {
    id: "cross-functional",
    title: "Strong cross-functional alignment",
    description:
      "Create clarity across product, engineering, marketing, partnerships, operations, customer success, and leadership.",
  },
  {
    id: "systems-not-dependency",
    title: "Build systems, not dependency",
    description:
      "Reduce manual work, vendor lock-in, and fragmented processes through scalable internal platforms.",
  },
  {
    id: "ai-leverage",
    title: "AI as operating leverage",
    description:
      "Use AI to improve speed, decision quality, productivity, and execution consistency.",
  },
  {
    id: "customer-insight",
    title: "Customer insight before output",
    description:
      "Use discovery, analytics, feedback, and experimentation to validate priorities.",
  },
  {
    id: "clear-ownership",
    title: "Teams with clear ownership",
    description:
      "Build operating cadence, OKRs, KPIs, governance, and accountability.",
  },
];

/** "My Product Operating System" — a continuous loop. */
export const operatingSystem: OperatingStep[] = [
  { id: "strategy", index: 1, title: "Business Strategy", description: "Anchor product to commercial goals and constraints." },
  { id: "insight", index: 2, title: "Customer Insight", description: "Ground decisions in research, data, and feedback." },
  { id: "opportunity", index: 3, title: "Opportunity ID", description: "Identify and frame the problems worth solving." },
  { id: "discovery", index: 4, title: "Product Discovery", description: "Validate desirability, feasibility, and viability." },
  { id: "prioritization", index: 5, title: "Prioritization", description: "Sequence by impact, effort, and confidence." },
  { id: "roadmap", index: 6, title: "Roadmap", description: "Communicate direction and trade-offs clearly." },
  { id: "delivery", index: 7, title: "Delivery", description: "Ship with agile cadence and quality." },
  { id: "gtm", index: 8, title: "Go-to-Market", description: "Launch with positioning, enablement, and partners." },
  { id: "measurement", index: 9, title: "Measurement", description: "Track outcomes against OKRs and KPIs." },
  { id: "iteration", index: 10, title: "Iteration", description: "Learn and feed insight back into strategy." },
];

export const operatingPractices: string[] = [
  "OKRs",
  "Product analytics",
  "Experimentation",
  "User research",
  "Stakeholder alignment",
  "Agile delivery",
  "Executive reporting",
  "AI-assisted workflows",
];

/** AI operating model — domains where AI creates leverage. */
export const aiNodes: AiNode[] = [
  { id: "strategy", title: "Strategy", example: "AI-assisted market and competitor synthesis to sharpen product bets." },
  { id: "product", title: "Product", example: "Faster discovery, documentation, and PRD drafting with human review." },
  { id: "engineering", title: "Engineering", example: "AI-assisted prototyping and delivery with Claude Code." },
  { id: "marketing", title: "Marketing", example: "Agentic campaign setup from brief to publish, human-approved." },
  { id: "operations", title: "Operations", example: "Automated repetitive workflows and reporting." },
  { id: "governance", title: "Governance", example: "Playbooks and human-in-the-loop controls for safe AI adoption." },
];

export const aiCapabilities: string[] = [
  "Claude Code",
  "Claude",
  "ChatGPT",
  "Gemini",
  "Agentic AI",
  "Prompt Engineering",
  "AI Product Strategy",
  "AI Workflow Design",
  "AI Governance",
  "AI-assisted Discovery",
  "AI-assisted Engineering",
  "AI Marketing Automation",
  "Internal AI Platforms",
  "LLM Tool Integration",
  "Human-in-the-Loop Systems",
];

export const education: EducationItem[] = [
  {
    credential: "Diploma in Digital & Precision Engineering",
    institution: "Nanyang Polytechnic",
    location: "Singapore",
    year: "2013",
    note: "Awarded NPES Full Scholarship",
  },
];

export const certifications: Certification[] = [
  { title: "Advanced Product Management", issuer: "Udemy", year: "2024" },
  { title: "Vision, Strategy & Metrics for Product Managers" },
];
