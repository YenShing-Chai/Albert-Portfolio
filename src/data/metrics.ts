import type { Metric } from "@/types/content";

/**
 * Headline credibility metrics.
 * NOTE (confidentiality): brand/product names are intentionally generalized.
 * All cost-savings figures are labeled "estimated" per the owner's direction.
 */
export const metrics: Metric[] = [
  {
    id: "experience",
    value: 10,
    suffix: "+",
    label: "Years of experience",
    detail:
      "A decade building and scaling products across fintech, SaaS, loyalty, and digital commerce.",
    type: "realized",
  },
  {
    id: "savings",
    value: 120,
    prefix: "RM",
    suffix: "K++",
    label: "Est. annual cost savings",
    detail:
      "Realized annual savings from the in-house voucher platform; the internal CPaaS platform (in development) is estimated to add ~RM192K/yr.",
    type: "estimated",
  },
  {
    id: "loyalty",
    value: 1,
    suffix: "M+",
    label: "Loyalty members across all projects",
    detail:
      "Loyalty members delivered across food & beverage and digital commerce projects.",
    type: "realized",
  },
  {
    id: "kiosks",
    value: 100,
    suffix: "+",
    label: "Self-ordering kiosks deployed",
    detail:
      "Self-ordering kiosks deployed across Malaysia, Singapore, and other countries.",
    type: "realized",
  },
  {
    id: "team",
    value: 10,
    suffix: "+",
    label: "Team members led",
    detail:
      "Cross-functional leadership across product, engineering, design, marketing, partnerships, operations, and customer experience.",
    type: "realized",
  },
];

/** Expanded impact-dashboard cards (richer than the hero metric strip). */
export const impactCards: Metric[] = [
  {
    id: "savings-total",
    value: 120,
    prefix: "RM",
    suffix: "K++",
    label: "Estimated annual savings",
    detail:
      "Realized from the in-house voucher platform; the internal CPaaS platform (in development) is estimated to add ~RM192K/yr.",
    type: "estimated",
  },
  {
    id: "loyalty",
    value: 1,
    suffix: "M+",
    label: "Loyalty members across all projects",
    detail:
      "Loyalty members delivered across food & beverage and digital commerce projects.",
    type: "realized",
  },
  {
    id: "kiosks",
    value: 100,
    suffix: "+",
    label: "Self-ordering kiosks deployed across Malaysia, Singapore & other countries",
    detail:
      "Self-ordering kiosk rollouts delivered across Malaysia, Singapore, and other countries.",
    type: "realized",
  },
  {
    id: "team",
    value: 10,
    suffix: "+",
    label: "Team members led",
    detail:
      "Cross-functional leadership across product, engineering, design, marketing, partnerships, operations, and customer experience.",
    type: "realized",
  },
];
