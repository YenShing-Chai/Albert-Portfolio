import type { ExperienceRole } from "@/types/content";

/**
 * Career timeline. Employer names are the owner's public professional history.
 * Specific product/client brand names are generalized for confidentiality.
 */
export const experience: ExperienceRole[] = [
  {
    id: "hextar-hop",
    title: "Head of Product",
    company: "Hextar Technologies Solutions Berhad",
    location: "Kuala Lumpur, Malaysia",
    start: "Jul 2025",
    end: "Present",
    period: "Jul 2025 — Present",
    current: true,
    summary:
      "Own the product vision, strategy, and roadmap for the MoneyX fintech ecosystem, aligning product investments with commercial objectives.",
    highlights: [
      "Lead cross-functional teams across Product, Engineering, Design, Marketing, Partnership, and Customer Success.",
      "Delivered a zero-to-one enterprise Voucher Platform, replacing third-party dependency and saving RM120,000 annually.",
      "Leading development of an internal CPaaS platform supporting Push Notification, Email, SMS, and WhatsApp, with estimated annual savings of RM192,000.",
      "Established product governance, OKRs, prioritisation framework, and roadmap planning to improve execution quality.",
      "Championed AI transformation using Claude Code, ChatGPT, and agentic AI to automate product documentation, campaign operations, and internal workflows.",
      "Drive executive stakeholder communication, strategic partnerships, and product investment decisions.",
    ],
  },
  {
    id: "hextar-teamlead",
    title: "Team Lead, Partnership & Business Development",
    company: "Hextar Technologies Solutions Berhad",
    location: "Kuala Lumpur, Malaysia",
    start: "Aug 2024",
    end: "Jul 2025",
    period: "Aug 2024 — Jul 2025",
    summary:
      "Led business strategy and commercial direction for the fintech ecosystem, overseeing product, marketing, customer experience, and business development.",
    highlights: [
      "Oversaw product, marketing, customer experience, and BD teams to ensure strategic alignment.",
      "Managed P&L responsibilities, including budgeting, forecasting, and financial reporting.",
      "Drove partner acquisition and onboarding aligned with strategic objectives.",
      "Drafted, negotiated, and finalized strategic partnership agreements.",
      "Monitored partner performance, ensuring mutual value delivery.",
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
