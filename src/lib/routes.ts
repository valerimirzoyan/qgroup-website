export const BASE_URL = "https://qgroup24.com";

export type Lang = "en" | "hy" | "ru";

export const LANGS: Lang[] = ["en", "hy", "ru"];

export const HOME_PATH: Record<Lang, string> = {
  en: "/",
  hy: "/hy",
  ru: "/ru",
};

export const SERVICES_HUB_SEGMENT: Record<Lang, string> = {
  en: "services",
  hy: "ծառայություններ",
  ru: "услуги",
};

export interface LocalizedPath {
  en: string;
  hy: string;
  ru: string;
}

export const SERVICE_LOCALIZED_SLUG: Record<string, LocalizedPath> = {
  "it-outsourcing": {
    en: "it-outsourcing",
    hy: "իտ-աութսորսինգ",
    ru: "ит-аутсорсинг",
  },
  cybersecurity: {
    en: "cybersecurity",
    hy: "կիբեռանվտանգություն",
    ru: "кибербезопасность",
  },
  "it-support": {
    en: "it-support",
    hy: "իտ-աջակցություն",
    ru: "ит-поддержка",
  },
  "managed-it": {
    en: "managed-it",
    hy: "կառավարվող-իտ-ծառայություններ",
    ru: "управляемые-ит-услуги",
  },
  "it-infrastructure": {
    en: "it-infrastructure",
    hy: "իտ-ենթակառուցվածք",
    ru: "ит-инфраструктура",
  },
  "structured-cabling": {
    en: "structured-cabling",
    hy: "կառուցվածքային-մալուխավորում",
    ru: "скс",
  },
  "grc-consulting": {
    en: "grc-consulting",
    hy: "grc-կոնսալթինգ",
    ru: "grc-консалтинг",
  },
  electrical: {
    en: "electrical",
    hy: "էլեկտրամոնտաժ",
    ru: "электромонтаж",
  },
};

export const SERVICE_SLUGS: string[] = Object.keys(SERVICE_LOCALIZED_SLUG);

export const SERVICE_ID_TO_SLUG: Record<string, string> = {
  outsourcing: "it-outsourcing",
  "it-support": "it-support",
  "managed-it": "managed-it",
  cybersecurity: "cybersecurity",
  infrastructure: "it-infrastructure",
  "structured-cabling": "structured-cabling",
  grc: "grc-consulting",
  electrical: "electrical",
};

export function homePath(lang: Lang): string {
  return HOME_PATH[lang];
}

export function hubPath(lang: Lang): string {
  return lang === "en"
    ? "/services"
    : `/${lang}/${SERVICES_HUB_SEGMENT[lang]}`;
}

export function servicePath(internalSlug: string, lang: Lang): string {
  const localized =
    SERVICE_LOCALIZED_SLUG[internalSlug]?.[lang] ?? internalSlug;
  return `${hubPath(lang)}/${localized}`;
}

export function servicePathById(serviceId: string, lang: Lang): string {
  const slug = SERVICE_ID_TO_SLUG[serviceId] ?? serviceId;
  return servicePath(slug, lang);
}

export function internalSlugFromLocalized(
  lang: Lang,
  localizedSlug: string
): string | null {
  for (const [internalSlug, paths] of Object.entries(
    SERVICE_LOCALIZED_SLUG
  )) {
    if (paths[lang] === localizedSlug) return internalSlug;
  }
  return null;
}

export function serviceIdFromSlug(internalSlug: string): string {
  for (const [id, slug] of Object.entries(SERVICE_ID_TO_SLUG)) {
    if (slug === internalSlug) return id;
  }
  return internalSlug;
}

export function absoluteUrl(path: string): string {
  if (path === "/") return BASE_URL;
  return BASE_URL + encodeURI(path);
}

export function buildLanguageAlternates(
  makePath: (lang: Lang) => string
): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(makePath("en")),
  };
  for (const lang of LANGS) {
    languages[lang] = absoluteUrl(makePath(lang));
  }
  return languages;
}

function normalizePath(path: string): string {
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    decoded = path;
  }
  const trimmed = decoded.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function translatePath(pathname: string, target: Lang): string {
  const current = normalizePath(pathname);

  for (const lang of LANGS) {
    if (normalizePath(HOME_PATH[lang]) === current) return HOME_PATH[target];
  }

  for (const lang of LANGS) {
    if (normalizePath(hubPath(lang)) === current) return hubPath(target);
  }

  for (const slug of SERVICE_SLUGS) {
    for (const lang of LANGS) {
      if (normalizePath(servicePath(slug, lang)) === current) {
        return servicePath(slug, target);
      }
    }
  }

  return HOME_PATH[target];
}
