import { site } from "@/lib/site";

/**
 * Personal details shown at the House.
 * NOTE: birthplace / birth date / phone are placeholders — fill these in, and
 * consider privacy before publishing a phone number or birth date publicly.
 */
export const personal = {
  name: site.fullName,
  shortName: site.name,
  role: site.role,
  currentLocation: site.location, // Kuala Lumpur, Malaysia
  birthplace: "Kuching, Malaysia",
  birthDate: "Add birth date in personal.ts",
  phone: "+60 12-895 8842",
  email: site.email,
  languages: ["English", "Bahasa Malaysia", "Mandarin"],
  funFact:
    "Started in service & precision engineering, now leads product and AI transformation.",
} as const;
