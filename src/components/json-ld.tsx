import { site } from "@/lib/site";

/**
 * Person + WebSite structured data for rich results.
 * Rendered once on the home page.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.fullName,
        alternateName: site.name,
        jobTitle: "Head of Product",
        description: site.description,
        email: `mailto:${site.email}`,
        url: site.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kuala Lumpur",
          addressCountry: "MY",
        },
        sameAs: [site.linkedin],
        knowsAbout: [
          "Product Strategy",
          "Product Management",
          "Fintech",
          "SaaS",
          "AI Product Strategy",
          "Agentic AI",
          "Product-Led Growth",
          "Monetization",
          "Platform Products",
        ],
      },
      {
        "@type": "WebSite",
        name: `${site.name} — Portfolio`,
        url: site.url,
        author: { "@type": "Person", name: site.fullName },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
