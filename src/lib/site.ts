/**
 * Central site configuration.
 * Edit these constants to update global metadata, contact channels, and the
 * production domain in one place. When a real domain is acquired, change
 * `url` below and everything (metadata, sitemap, canonicals, JSON-LD) follows.
 */
export const site = {
  name: "Albert Chai",
  fullName: "Chai Yen Shing, Albert",
  role: "Head of Product",
  tagline:
    "Head of Product & AI Transformation Leader building products, platforms, and teams that turn strategy into measurable business impact.",
  description:
    "Head of Product with 10+ years across fintech, SaaS, AI, loyalty, and digital commerce. Built zero-to-one platforms, led cross-functional teams, and drove significant annual cost savings.",
  // Placeholder production URL — replace when a custom domain is connected.
  url: "https://albert-chai-portfolio.vercel.app",
  location: "Kuala Lumpur, Malaysia",
  availability: "Open to Head of Product opportunities",
  email: "yshing1992@gmail.com",
  linkedin: "https://www.linkedin.com/in/yenshingchai",
  linkedinHandle: "in/yenshingchai",
  // Replace with the real number in international format (no +, no spaces),
  // e.g. "60123456789". Kept as a placeholder until provided.
  whatsapp: "60000000000",
  resumePath: "/resume/Albert-Chai-Head-of-Product-Resume.pdf",
} as const;

export type Site = typeof site;
