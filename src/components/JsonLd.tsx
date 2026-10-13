import type { Content } from "@/content/types";
import { site } from "@/content/site";

export function JsonLd({ content }: { content: Content }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.jobTitle,
    description: content.meta.description,
    url: content.lang === "fr" ? site.url : `${site.url}/en/`,
    image: `${site.url}${site.portrait}`,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "MG" },
    sameAs: [site.linkedin, site.github],
    knowsAbout: [".NET", "C#", "React", "Next.js", "Java Spring", "LangChain", "RAG", "Azure DevOps"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "ESTIA" },
      { "@type": "CollegeOrUniversity", name: "IT University" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
