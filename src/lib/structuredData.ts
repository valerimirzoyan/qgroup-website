import { BASE_URL, absoluteUrl, homePath, hubPath, servicePath, type Lang } from "./routes";
import { serviceRoutes } from "./serviceSeo";

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/q-group-it/",
  "https://www.facebook.com/Qgrouparmenia",
  "https://www.instagram.com/qgrouparmenia/",
];

const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const ORG_DESCRIPTION: Record<Lang, string> = {
  en: "Q Group provides enterprise IT support, managed IT services, cybersecurity, IT infrastructure, and electrical systems across Armenia.",
  hy: "Q Group-ը տրամադրում է ՏՏ աջակցություն, կառավարվող ՏՏ ծառայություններ, կիբեռանվտանգություն և ենթակառուցվածքային լուծումներ Հայաստանում:",
  ru: "Q Group предоставляет IT-поддержку, управляемые IT-услуги, кибербезопасность и инфраструктурные решения в Армении.",
};

const ORG_STREET: Record<Lang, string> = {
  en: "Arshakunyats 2",
  hy: "Արշակունյաց 2",
  ru: "Аршакуняц 2",
};

const ORG_CITY: Record<Lang, string> = {
  en: "Yerevan",
  hy: "Երևան",
  ru: "Ереван",
};

function serviceName(seoSlug: string, lang: Lang): string {
  const seo = serviceRoutes.find((s) => s.seoSlug === seoSlug);
  if (!seo) return seoSlug;
  return (seo.title[lang] || seo.title.en).split("|")[0].trim();
}

export function organizationSchema(lang: Lang = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Q Group",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logos/q-logo.png`,
    image: `${BASE_URL}/images/logos/q-logo.png`,
    description: ORG_DESCRIPTION[lang],
    email: "info@q-group.am",
    telephone: "+374-8123",
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG_STREET[lang],
      addressLocality: ORG_CITY[lang],
      addressCountry: "AM",
    },
    areaServed: { "@type": "Country", name: "Armenia" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+374-8123",
      contactType: "customer service",
      availableLanguage: ["English", "Russian", "Armenian"],
    },
    sameAs: SOCIAL_PROFILES,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Q Group Services",
      itemListElement: serviceRoutes.map((seo) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: serviceName(seo.seoSlug, lang),
          url: absoluteUrl(servicePath(seo.seoSlug, lang)),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Q Group",
    url: BASE_URL,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: ["en", "hy", "ru"],
  };
}

export function serviceSchema(seoSlug: string, lang: Lang) {
  const seo = serviceRoutes.find((s) => s.seoSlug === seoSlug);
  if (!seo) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName(seoSlug, lang),
    description: seo.description[lang] || seo.description.en,
    serviceType: serviceName(seoSlug, "en"),
    url: absoluteUrl(servicePath(seoSlug, lang)),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Armenia" },
    inLanguage: lang,
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const HUB_LABEL: Record<Lang, string> = {
  en: "Services",
  hy: "Ծառայություններ",
  ru: "Услуги",
};

export function servicePageSchema(seoSlug: string, lang: Lang) {
  const schema = serviceSchema(seoSlug, lang);
  if (!schema) return [];
  return [
    schema,
    serviceBreadcrumb(lang, HUB_LABEL[lang], seoSlug, serviceName(seoSlug, lang)),
  ];
}

export function hubBreadcrumb(lang: Lang, hubLabel: string) {
  return breadcrumbSchema([
    { name: "Q Group", path: homePath(lang) },
    { name: hubLabel, path: hubPath(lang) },
  ]);
}

export function serviceBreadcrumb(lang: Lang, hubLabel: string, seoSlug: string, serviceLabel: string) {
  return breadcrumbSchema([
    { name: "Q Group", path: `/${lang}` },
    { name: hubLabel, path: hubPath(lang) },
    { name: serviceLabel, path: servicePath(seoSlug, lang) },
  ]);
}
