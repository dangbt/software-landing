import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

// Bắt buộc với output: "export" — nếu không Next.js coi đây là route động.
export const dynamic = "force-static";

const PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "showcase", priority: 0.8, changeFrequency: "monthly" as const },
  ...getAllSlugs().map((slug) => ({
    path: `showcase/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
  { path: "privacy", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l === "vi" ? "vi-VN" : "en", absoluteUrl(l, page.path)])
        ),
      },
    }))
  );
}
