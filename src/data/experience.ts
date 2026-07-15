import type { ExperienceRole } from "@/types/content";

/**
 * Career timeline. Employer names are the owner's public professional history.
 * Specific product/client brand names are generalized for confidentiality.
 */
export const experience: ExperienceRole[] = [
  {
    id: "hextar-hop",
    title: "Head of Product (Acting)",
    company: "Hextar Technologies Solutions Berhad",
    location: "Kuala Lumpur, Malaysia",
    start: "Feb 2026",
    end: "Present",
    period: "Feb 2026 — Present",
    current: true,
    summary:
      "Lead end-to-end product strategy for a B2C fintech ecosystem serving 300,000+ registered users, from vision and roadmap to monetization and delivery.",
    highlights: [
      "Own product vision, roadmap, portfolio priorities, and execution plans aligned to revenue, user growth, and operational efficiency.",
      "Lead cross-functional teams across Product, Engineering, Design, Marketing, Partnerships, Operations, and Customer Success.",
      "Establish product governance, OKRs, KPI frameworks, delivery cadence, and executive stakeholder communication.",
      "Drive AI transformation using Claude Code, agentic AI, and automation workflows across product and marketing.",
      "Manage vendor and platform integrations across fintech, loyalty, insurance, payments, CRM, and communications.",
    ],
    achievements: [
      {
        title: "Zero-to-one voucher platform",
        points: [
          "Built and shipped an internal voucher platform from zero to one, replacing an external dependency.",
          "Enabled full ownership of campaign, voucher, redemption, and reporting workflows.",
          "Estimated ~RM120K in annual cost savings with improved flexibility and control.",
        ],
      },
      {
        title: "Internal CPaaS platform (in development)",
        points: [
          "Leading development of an internal communications platform to replace an external CPaaS provider.",
          "Supports push, email, SMS, WhatsApp, OTP, campaign management, and delivery reporting.",
          "Estimated ~RM192K in annual savings; reduces vendor dependency and enables reuse across products.",
        ],
      },
      {
        title: "AI transformation",
        points: [
          "Introduced Claude Code and agentic AI into product and marketing workflows.",
          "Automated repetitive campaign creation and product documentation tasks.",
          "Established an internal playbook for safe AI adoption and governance.",
        ],
      },
    ],
  },
  {
    id: "hextar-teamlead",
    title: "Team Lead, Partnership & Business Development",
    company: "Hextar Technologies Solutions Berhad",
    location: "Kuala Lumpur, Malaysia",
    start: "Aug 2024",
    end: "Jan 2026",
    period: "Aug 2024 — Jan 2026",
    summary:
      "Led business strategy and roadmap planning for the fintech ecosystem, aligning product and commercial direction with executive leadership.",
    highlights: [
      "Oversaw Product, Marketing, Customer Experience, and Business Development functions.",
      "Managed P&L responsibilities, budgeting, forecasting, and commercial planning.",
      "Drove partner acquisition and onboarding; negotiated partnership agreements and commercial terms.",
      "Monitored partner performance and mutual value delivery.",
      "Built and scaled a business unit of more than 12 professionals.",
    ],
  },
  {
    id: "aigens-pm",
    title: "Product Manager",
    company: "Aigens Technology",
    location: "Singapore / Malaysia",
    start: "Sep 2021",
    end: "Aug 2024",
    period: "Sep 2021 — Aug 2024",
    summary:
      "Owned product vision, strategy, and roadmap for three digital ordering platforms across APAC food & beverage brands.",
    highlights: [
      "Conducted market research that expanded market reach by ~15%.",
      "Launched three digital products contributing to a ~25% increase in revenue.",
      "Increased user engagement by ~20% through continuous product iteration.",
      "Led product discovery, sprint planning, stakeholder alignment, and go-to-market execution.",
      "Launched a loyalty program driving 30% member growth and a 10% increase in average order value.",
    ],
  },
  {
    id: "aigens-projmgr",
    title: "Project Manager",
    company: "Aigens Technology",
    location: "Singapore",
    start: "Sep 2019",
    end: "Sep 2021",
    period: "Sep 2019 — Sep 2021",
    summary:
      "Managed SaaS and mobile product rollouts across APAC with structured risk, resource, and timeline management.",
    highlights: [
      "Delivered a USD 50,000 project two weeks ahead of schedule.",
      "Reduced project cost by ~5%.",
      "Maintained a high project success rate across concurrent rollouts.",
      "Integrated multiple third-party platforms to expand product capabilities.",
    ],
  },
  {
    id: "aigens-support",
    title: "Support Engineer / Project Manager",
    company: "Aigens Technology",
    location: "Singapore",
    start: "Feb 2018",
    end: "Aug 2019",
    period: "Feb 2018 — Aug 2019",
    summary:
      "Supported 100+ clients and led onboarding and deployment across the ordering platform portfolio.",
    highlights: [
      "Achieved ~95% customer satisfaction.",
      "Resolved ~80% of issues at first contact.",
      "Reduced resolution time by ~15%.",
      "Led onboarding and deployment for 50+ clients.",
    ],
  },
  {
    id: "revel",
    title: "Client Success Manager",
    company: "Revel Systems",
    location: "Singapore",
    start: "Jun 2016",
    end: "Jun 2017",
    period: "Jun 2016 — Jun 2017",
    summary:
      "Onboarded enterprise clients onto a cloud POS platform with tailored training and implementation support.",
    highlights: [
      "Onboarded 25+ enterprise clients.",
      "Delivered customized POS training and implementation support.",
      "Improved client retention by ~15% and user adoption by ~20%.",
    ],
  },
  {
    id: "bindo",
    title: "Support Manager",
    company: "Bindo Labs",
    location: "Singapore",
    start: "Nov 2015",
    end: "Oct 2016",
    period: "Nov 2015 — Oct 2016",
    summary:
      "Managed POS setup and reseller partner communications across Southeast Asia.",
    highlights: [
      "Managed POS setup for 30+ merchants.",
      "Achieved ~90% first-call resolution.",
      "Managed partner communications with 15+ resellers across Southeast Asia.",
    ],
  },
  {
    id: "durst",
    title: "Service & Technical Engineer",
    company: "Durst Image Technology Asia",
    location: "Singapore",
    start: "Jun 2014",
    end: "Oct 2015",
    period: "Jun 2014 — Oct 2015",
    summary:
      "Installed and maintained industrial imaging machines and trained technicians across the region.",
    highlights: [
      "Installed and maintained 50+ industrial machines.",
      "Improved equipment uptime by ~15%.",
      "Trained 30+ technicians across three countries.",
    ],
  },
];
