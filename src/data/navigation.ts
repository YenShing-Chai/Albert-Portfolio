export interface NavItem {
  label: string;
  href: string;
}

/** In-page anchor navigation. Order defines scroll-spy sequence. */
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "AI", href: "#ai" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

/** Dynamic role words cycled beneath the hero headline. */
export const roleWords: string[] = [
  "Head of Product",
  "AI Transformation Leader",
  "Fintech & SaaS Strategist",
  "Zero-to-One Builder",
  "Product Portfolio Leader",
];
