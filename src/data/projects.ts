import type { CaseStudy } from "@/types/content";

/**
 * Selected product portfolio — presented at a high level for confidentiality.
 * Brand/product/client names are generalized. Cost-savings figures are labeled
 * "estimated" per the owner's direction.
 */
export const projects: CaseStudy[] = [
  {
    slug: "fintech-ecosystem",
    title: "B2C Fintech Ecosystem",
    subtitle: "Product strategy & portfolio ownership at 300K+ user scale",
    category: ["Fintech", "B2C", "Product Portfolio", "Mobile App"],
    status: "launched",
    featured: true,
    summary:
      "End-to-end product ownership of a consumer fintech ecosystem spanning loans, insurance, banking products, investment, loyalty, vouchers, and rewards.",
    problem:
      "A fast-growing fintech app needed unified product strategy, monetization, and governance to scale beyond 300,000 users without fragmenting the roadmap.",
    role: "Head of Product — vision, roadmap, monetization, and delivery.",
    responsibilities: [
      "Set product vision, roadmap, and portfolio priorities aligned to revenue and growth.",
      "Own product performance metrics, monetization strategy, and executive alignment.",
      "Lead product discovery, experimentation, and cross-functional delivery.",
      "Prioritize the roadmap across multiple product lines and partner integrations.",
    ],
    solution: [
      "Established portfolio-level roadmap prioritization and product governance.",
      "Integrated partner products across lending, insurance, payments, and rewards.",
      "Introduced analytics and experimentation to guide monetization decisions.",
    ],
    impact: [
      { label: "Registered users", value: "300K+", type: "realized" },
      { label: "Product lines", value: "7+", type: "realized" },
      { label: "Governance", value: "OKRs + KPI framework", type: "realized" },
    ],
    capabilities: [
      "Product strategy",
      "Portfolio management",
      "Monetization",
      "Partnerships",
      "Experimentation",
    ],
    technologies: ["Mobile", "REST APIs", "Payments", "Analytics", "CRM"],
    confidentialNote:
      "Presented generally to respect commercial sensitivity; brand name withheld.",
  },
  {
    slug: "voucher-platform",
    title: "Zero-to-One Voucher Platform",
    subtitle: "Replacing a third-party dependency with an in-house platform",
    category: ["Platform Product", "Cost Optimization", "B2B2C"],
    status: "launched",
    featured: true,
    summary:
      "Built and shipped an internal voucher platform from zero to one, taking full ownership of campaigns, issuance, redemption, partner management, and reporting.",
    problem:
      "The business depended on a third-party voucher platform, creating recurring cost, operational limitations, and vendor lock-in.",
    role: "Product owner — end-to-end, from concept to launch.",
    responsibilities: [
      "Defined the product scope, workflows, and rollout plan.",
      "Coordinated engineering, operations, and partner onboarding.",
      "Owned campaign, redemption, and reporting requirements.",
    ],
    solution: [
      "Delivered voucher creation, campaigns, issuance, redemption, and partner management.",
      "Added operational controls and reporting for internal ownership.",
      "Reduced reliance on the external provider.",
    ],
    impact: [
      { label: "Est. annual savings", value: "~RM120K", type: "estimated" },
      { label: "Vendor dependency", value: "Reduced", type: "realized" },
      { label: "Iteration speed", value: "Faster", type: "realized" },
    ],
    capabilities: [
      "Zero-to-one delivery",
      "Platform product",
      "Cost optimization",
      "Vendor migration",
    ],
    technologies: ["Web", "REST APIs", "Campaign engine", "Reporting"],
  },
  {
    slug: "cpaas-platform",
    title: "Internal CPaaS Platform",
    subtitle: "In-house communications infrastructure to replace a vendor",
    category: [
      "Platform Product",
      "Communications",
      "Internal Tools",
      "Cost Optimization",
    ],
    status: "ongoing",
    featured: true,
    summary:
      "Leading development of an internal communications platform to replace an external CPaaS provider across push, email, SMS, WhatsApp, and OTP.",
    problem:
      "Reliance on an external CPaaS provider drove high recurring subscription costs and limited channel ownership.",
    role: "Product lead — strategy, scope, and delivery direction.",
    responsibilities: [
      "Defined the platform vision, channel scope, and integration model.",
      "Aligned stakeholders across product, engineering, and operations.",
      "Planned phased rollout and reuse across internal products.",
    ],
    solution: [
      "Push notifications, email, SMS, WhatsApp, OTP, and campaign management.",
      "Delivery reporting, template management, and API integration.",
      "Reusable communication infrastructure across internal products.",
    ],
    impact: [
      { label: "Est. annual savings", value: "~RM192K", type: "estimated" },
      { label: "Channel ownership", value: "In-house", type: "estimated" },
      { label: "Reusability", value: "Cross-product", type: "estimated" },
    ],
    capabilities: [
      "Platform strategy",
      "Communications infrastructure",
      "Vendor replacement",
      "Cost transparency",
    ],
    technologies: ["APIs", "Messaging", "WhatsApp", "SMS", "Email", "OTP"],
    confidentialNote:
      "In development. Savings are estimated and not presented as realized.",
  },
  {
    slug: "ai-marketing-automation",
    title: "Agentic AI Marketing Automation",
    subtitle: "Turning campaign briefs into executable marketing setup",
    category: ["AI Transformation", "Automation", "Marketing Technology"],
    status: "ongoing",
    featured: true,
    summary:
      "An internal agentic workflow — built with Claude and Claude Code — that converts marketing briefs into executable campaign configuration with human approval.",
    problem:
      "Repetitive campaign creation and setup consumed significant marketing capacity and slowed delivery.",
    role: "Initiator & product owner — design, governance, and rollout.",
    responsibilities: [
      "Designed the agentic workflow and human-in-the-loop controls.",
      "Integrated with campaign and promotion infrastructure.",
      "Established governance, review, and controlled publishing.",
    ],
    solution: [
      "Brief → AI planning → content generation → campaign configuration → validation → human approval → publishing.",
      "Governed, reviewable steps with a human approval gate before publishing.",
    ],
    impact: [
      { label: "Capacity freed", value: "~2 person-days/wk", type: "estimated" },
      { label: "Manual work", value: "Reduced", type: "realized" },
      { label: "Governance", value: "Human-in-the-loop", type: "realized" },
    ],
    capabilities: [
      "Agentic AI",
      "Workflow automation",
      "AI governance",
      "Marketing operations",
    ],
    technologies: ["Claude", "Claude Code", "LLM workflows", "Automation"],
  },
  {
    slug: "loyalty-platform",
    title: "Group-Wide F&B Loyalty Platform",
    subtitle: "Consolidating siloed CRM systems into one loyalty ecosystem",
    category: ["Loyalty", "CRM", "Customer Data", "F&B"],
    status: "launched",
    featured: true,
    summary:
      "A group-wide loyalty platform unifying members, points, rewards, and redemption across multiple food & beverage brands, replacing fragmented legacy systems.",
    problem:
      "Multiple siloed CRM systems prevented cross-brand customer visibility and consistent loyalty operations.",
    role: "Product lead — consolidation strategy and migration.",
    responsibilities: [
      "Defined the unified data and loyalty model across brands.",
      "Led migration from legacy platforms.",
      "Enabled cross-brand customer visibility.",
    ],
    solution: [
      "Consolidated members, points, rewards, and redemption data.",
      "Unified loyalty operations across multiple brands.",
      "Migrated from legacy CRM platforms.",
    ],
    impact: [
      { label: "CRM systems", value: "Consolidated", type: "realized" },
      { label: "Customer view", value: "Cross-brand", type: "realized" },
      { label: "Legacy platforms", value: "Migrated", type: "realized" },
    ],
    capabilities: [
      "Loyalty strategy",
      "CRM consolidation",
      "Data migration",
      "Customer data",
    ],
    technologies: ["CRM", "Loyalty engine", "Data migration", "APIs"],
  },
  {
    slug: "contact-intelligence",
    title: "AI Contact Intelligence Platform",
    subtitle: "Name-card scanning to enriched, AI-assisted contact insight",
    category: ["AI", "OCR", "B2B SaaS", "Sales Technology"],
    status: "concept",
    featured: true,
    summary:
      "A product initiative for AI-assisted contact intelligence: name-card scanning, OCR extraction, enrichment, and relationship insight for sales and operations.",
    problem:
      "Sales teams lose time manually digitizing and enriching contacts, with inconsistent data quality.",
    role: "Product initiator — concept, scope, and capability design.",
    responsibilities: [
      "Defined the capability set and product concept.",
      "Scoped OCR, enrichment, and insight workflows.",
      "Framed the sales and operations use cases.",
    ],
    solution: [
      "Name-card scanning, batch upload, and OCR extraction.",
      "Contact standardization, AI enrichment, and confidence scoring.",
      "Relationship insights, conversation starters, and admin analytics.",
    ],
    impact: [
      { label: "Stage", value: "In development", type: "estimated" },
      { label: "Data quality", value: "Standardized", type: "estimated" },
      { label: "Insight", value: "AI-enriched", type: "estimated" },
    ],
    capabilities: [
      "AI product strategy",
      "OCR",
      "Data enrichment",
      "B2B SaaS",
    ],
    technologies: ["OCR", "LLM enrichment", "APIs", "Analytics"],
    confidentialNote:
      "Presented as a product initiative / concept under development.",
  },
  {
    slug: "casual-dining-ordering",
    title: "Casual-Dining Mobile & QR Ordering",
    subtitle: "Omnichannel app and QR self-ordering across 80+ outlets",
    category: ["Mobile App", "QR Ordering", "Loyalty", "F&B"],
    status: "launched",
    featured: false,
    summary:
      "Mobile app and QR self-ordering rollout with new CRM loyalty functionality across a regional casual-dining chain.",
    problem:
      "A casual-dining chain needed a scalable omnichannel ordering and loyalty experience across many outlets.",
    role: "Product manager — rollout and loyalty delivery.",
    responsibilities: [
      "Managed the large-scale omnichannel rollout.",
      "Delivered new CRM loyalty functionality.",
      "Coordinated across operations and engineering.",
    ],
    solution: [
      "Mobile app and QR self-ordering across 80+ outlets.",
      "New CRM loyalty capability driving member growth.",
    ],
    impact: [
      { label: "Outlets", value: "80+", type: "realized" },
      { label: "Members (1st year)", value: "300K+", type: "realized" },
      { label: "Rollout", value: "Omnichannel", type: "realized" },
    ],
    capabilities: ["Omnichannel", "QR ordering", "Loyalty", "Rollout"],
    technologies: ["Mobile", "QR", "CRM", "POS"],
  },
  {
    slug: "qsr-kiosks",
    title: "QSR Self-Ordering Kiosks",
    subtitle: "Self-ordering kiosks and delivery integration across 50+ outlets",
    category: ["Kiosk", "Mobile Ordering", "Delivery", "F&B"],
    status: "launched",
    featured: false,
    summary:
      "Self-ordering kiosk rollout with mobile ordering and delivery-aggregator integration for a global quick-service brand.",
    problem:
      "A QSR brand needed faster in-store throughput and integrated delivery ordering.",
    role: "Project / product manager — delivery and integration.",
    responsibilities: [
      "Delivered kiosk rollout across outlets.",
      "Integrated delivery aggregators.",
      "Coordinated mobile app delivery.",
    ],
    solution: [
      "Self-ordering kiosks across 50+ outlets.",
      "Mobile application and delivery-aggregator integration.",
    ],
    impact: [
      { label: "Outlets", value: "50+", type: "realized" },
      { label: "Orders/day", value: "1,000+", type: "realized" },
      { label: "Delivery", value: "Integrated", type: "realized" },
    ],
    capabilities: ["Kiosk", "Delivery integration", "Mobile ordering"],
    technologies: ["Kiosk", "Mobile", "Delivery APIs", "POS"],
  },
  {
    slug: "pizza-ordering-loyalty",
    title: "Pizza Brand Digital Ordering & Loyalty",
    subtitle: "Mobile ordering and a 1M+ member loyalty ecosystem",
    category: ["Digital Ordering", "Loyalty", "Mobile Web", "F&B"],
    status: "launched",
    featured: false,
    summary:
      "Mobile ordering platform and loyalty ecosystem for a global pizza brand's regional market, serving more than one million members.",
    problem:
      "A global pizza brand needed a cohesive digital ordering and retention experience at scale.",
    role: "Product manager — ordering and retention delivery.",
    responsibilities: [
      "Delivered across ordering and retention journeys.",
      "Supported the loyalty ecosystem at scale.",
    ],
    solution: [
      "Mobile ordering platform.",
      "Loyalty ecosystem serving 1M+ members.",
    ],
    impact: [
      { label: "Members", value: "1M+", type: "realized" },
      { label: "Journeys", value: "Order + retain", type: "realized" },
    ],
    capabilities: ["Digital ordering", "Loyalty", "Retention"],
    technologies: ["Mobile web", "Loyalty engine", "APIs"],
  },
  {
    slug: "ecommerce-pos",
    title: "eCommerce + POS Integration Platform",
    subtitle: "Real-time POS sync, payments, and inventory accuracy",
    category: ["eCommerce", "POS Integration", "Payments", "Inventory"],
    status: "launched",
    featured: false,
    summary:
      "An eCommerce platform with real-time POS synchronization, payment gateway integration, and improved inventory accuracy and checkout success.",
    problem:
      "Disconnected eCommerce and POS systems caused inventory discrepancies and checkout friction.",
    role: "Project / product manager — integration and delivery.",
    responsibilities: [
      "Delivered real-time POS synchronization.",
      "Integrated the payment gateway.",
      "Improved inventory and checkout reliability.",
    ],
    solution: [
      "Real-time POS sync and payment gateway integration.",
      "Inventory reconciliation and checkout improvements.",
    ],
    impact: [
      { label: "Inventory discrepancies", value: "-30%", type: "realized" },
      { label: "Checkout success", value: "+20%", type: "realized" },
      { label: "POS sync", value: "Real-time", type: "realized" },
    ],
    capabilities: ["eCommerce", "POS integration", "Payments", "Inventory"],
    technologies: ["Web", "POS", "Payment gateway", "APIs"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
