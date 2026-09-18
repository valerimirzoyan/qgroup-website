import type { MetadataRoute } from "next";
import {
  LANGS,
  SERVICE_SLUGS,
  absoluteUrl,
  buildLanguageAlternates,
  homePath,
  hubPath,
  servicePath,
} from "@/lib/routes";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-09-18T00:00:00.000Z");

const servicePriorities: Record<string, number> = {
  "it-outsourcing": 0.9,
  cybersecurity: 0.9,
  "it-support": 0.9,
  "managed-it": 0.9,
  "it-infrastructure": 0.8,
  "structured-cabling": 0.8,
  "grc-consulting": 0.8,
  electrical: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = LANGS.map((lang) => ({
    url: absoluteUrl(homePath(lang)),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: buildLanguageAlternates((l) => homePath(l)),
    },
  }));

  const hubEntries: MetadataRoute.Sitemap = LANGS.map((lang) => ({
    url: absoluteUrl(hubPath(lang)),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: {
      languages: buildLanguageAlternates((l) => hubPath(l)),
    },
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.flatMap((slug) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(servicePath(slug, lang)),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: servicePriorities[slug] ?? 0.7,
      alternates: {
        languages: buildLanguageAlternates((l) => servicePath(slug, l)),
      },
    }))
  );

  return [...homeEntries, ...hubEntries, ...serviceEntries];
}
