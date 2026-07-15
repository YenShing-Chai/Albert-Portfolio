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
    id: "users",
    value: 300,
    suffix: "K+",
    label: "Registered fintech users",
    detail:
      "Scale of the B2C fintech ecosystem under current product ownership.",
    type: "realized",
  },
  {
    id: "savings",
    value: 312,
    prefix: "RM",
    suffix: "K+",
    label: "Est. annual cost savings",
    detail:
      "Combined estimated annual savings from an in-house voucher platform and an internal communications (CPaaS) platform.",
    type: "estimated",
  },
  {
    id: "loyalty",
    value: 1,
    suffix: "M+",
    label: "Loyalty members delivered",
    detail:
      "Loyalty ecosystem delivered for a global food & beverage brand's regional market.",
    type: "realized",
  },
  {
    id: "outlets",
    value: 80,
    suffix: "+",
    label: "Outlets rolled out",
    detail:
      "Mobile app and QR self-ordering rollout across a regional casual-dining chain.",
    type: "realized",
  },
  {
    id: "team",
    value: 15,
    suffix: "+",
    label: "Cross-functional team members led",
    detail:
      "Across product, engineering, design, marketing, partnerships, operations, and customer experience.",
    type: "realized",
  },
];

/** Expanded impact-dashboard cards (richer than the hero metric strip). */
export const impactCards: Metric[] = [
  {
    id: "savings-total",
    value: 312,
    prefix: "RM",
    suffix: "K+",
    label: "Estimated annual savings",
    detail:
      "In-house voucher platform (~RM120K/yr) plus an internal CPaaS platform (~RM192K/yr, in development).",
    type: "estimated",
  },
  {
    id: "users",
    value: 300,
    suffix: "K+",
    label: "Registered users",
    detail: "Scale of the B2C fintech ecosystem under product ownership.",
    type: "realized",
  },
  {
    id: "loyalty",
    value: 1,
    suffix: "M+",
    label: "Loyalty members",
    detail: "Loyalty ecosystem for a global F&B brand's regional market.",
    type: "realized",
  },
  {
    id: "outlets-casual",
    value: 80,
    suffix: "+",
    label: "Casual-dining outlets",
    detail: "Mobile app and QR self-ordering rollout across the chain.",
    type: "realized",
  },
  {
    id: "outlets-qsr",
    value: 50,
    suffix: "+",
    label: "QSR kiosk outlets",
    detail: "Self-ordering kiosk rollout for a global quick-service brand.",
    type: "realized",
  },
  {
    id: "team",
    value: 15,
    suffix: "+",
    label: "Team members led",
    detail:
      "Cross-functional leadership across seven disciplines and multiple markets.",
    type: "realized",
  },
];
