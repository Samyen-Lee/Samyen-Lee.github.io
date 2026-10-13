import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import type { Content } from "@/content/types";

export function buildMetadata(content: Content): Metadata {
  const path = content.lang === "fr" ? "/" : "/en/";
  return {
    metadataBase: new URL(site.url),
    title: content.meta.title,
    description: content.meta.description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: path,
      languages: { fr: "/", en: "/en/", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: site.name,
      title: content.meta.title,
      description: content.meta.description,
      locale: content.lang === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#11100e" },
  ],
};
