import type { Metadata } from "next";
import {
  BASE_URL,
  buildLanguageAlternates,
  absoluteUrl,
  hubPath as routeHubPath,
  servicePath as routeServicePath,
  type Lang,
} from "./routes";

export const baseUrl = BASE_URL;

export type SeoLang = Lang;

interface ServiceSeo {
  seoSlug: string;
  serviceId: string;
  priority: number;
  title: Record<SeoLang, string>;
  description: Record<SeoLang, string>;
}

export const serviceRoutes: ServiceSeo[] = [
  {
    seoSlug: "it-outsourcing",
    serviceId: "outsourcing",
    priority: 0.9,
    title: {
      en: "IT Outsourcing Armenia | Managed IT Services | Q Group",
      hy: "ՏՏ Աութսորսինգ Հայաստանում | Q Group",
      ru: "IT-аутсорсинг в Армении | Q Group",
    },
    description: {
      en: "Professional IT outsourcing services in Armenia. Q Group provides 24/7 managed IT support, server administration, helpdesk, and complete IT department coverage for businesses in Yerevan and across Armenia.",
      hy: "ՏՏ աութսորսինգ և աջակցություն Հայաստանում: Q Group-ն ապահովում է 24/7 տեխնիկական սպասարկում, սերվերների կառավարում և լիարժեք ՏՏ բաժնի ծածկույթ Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "IT-аутсорсинг в Армении. Q Group предоставляет техническую поддержку 24/7, администрирование серверов и полное покрытие IT-отдела в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "cybersecurity",
    serviceId: "cybersecurity",
    priority: 0.9,
    title: {
      en: "Cybersecurity Armenia | Information Security Company | Q Group",
      hy: "Կիբեռանվտանգություն Հայաստանում | Q Group",
      ru: "Кибербезопасность в Армении | Q Group",
    },
    description: {
      en: "Professional cybersecurity services in Armenia. Q Group provides penetration testing, SOC monitoring, firewall management, EDR solutions, and comprehensive threat defense for businesses in Yerevan and across Armenia.",
      hy: "Կիբեռանվտանգության ծառայություններ Հայաստանում: Q Group-ն ապահովում է ցանցային պաշտպանություն, firewall-ների կառավարում և տվյալների անվտանգություն Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Услуги кибербезопасности в Армении. Q Group обеспечивает сетевую защиту, управление межсетевыми экранами и безопасность данных в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "it-support",
    serviceId: "it-support",
    priority: 0.9,
    title: {
      en: "IT Support Armenia | Technical Support Company | Q Group",
      hy: "ՏՏ Աջակցություն Հայաստանում | Q Group",
      ru: "IT-поддержка в Армении | Q Group",
    },
    description: {
      en: "Professional IT support services in Armenia. Q Group provides 24/7 helpdesk, on-site technical support, workstation management, and emergency IT assistance for businesses in Yerevan and across Armenia.",
      hy: "ՏՏ աջակցության ծառայություններ Հայաստանում: Q Group-ն ապահովում է 24/7 helpdesk, օն-սայթ տեխնիկական աջակցություն և աշխատակայանների կառավարում Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Услуги IT-поддержки в Армении. Q Group предоставляет helpdesk 24/7, выездную техподдержку и управление рабочими станциями в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "managed-it",
    serviceId: "managed-it",
    priority: 0.9,
    title: {
      en: "Managed IT Services Armenia | MSP Armenia | Q Group",
      hy: "Կառավարվող ՏՏ Ծառայություններ Հայաստանում | Q Group",
      ru: "Управляемые IT-услуги в Армении | Q Group",
    },
    description: {
      en: "Professional managed IT services in Armenia. Q Group provides proactive 24/7 IT management, monitoring, cloud administration, and infrastructure maintenance for businesses in Yerevan and across Armenia.",
      hy: "Կառավարվող ՏՏ ծառայություններ Հայաստանում: Q Group-ն ապահովում է ակտիվ 24/7 ՏՏ կառավարում, մոնիտորինգ և ամպային ադմինիստրացիա Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Управляемые IT-услуги в Армении. Q Group обеспечивает проактивное управление IT-инфраструктурой, мониторингом и облачной администрацией в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "it-infrastructure",
    serviceId: "infrastructure",
    priority: 0.8,
    title: {
      en: "IT Infrastructure Armenia | Network Infrastructure Company | Q Group",
      hy: "ՏՏ Ենթակառուցվածք Հայաստանում | Q Group",
      ru: "IT-инфраструктура в Армении | Q Group",
    },
    description: {
      en: "Professional IT infrastructure services in Armenia. Q Group provides server room setup, network infrastructure, enterprise Wi-Fi, and data center solutions for businesses in Yerevan and across Armenia.",
      hy: "ՏՏ ենթակառուցվածքի ծառայություններ Հայաստանում: Q Group-ն իրականացնում է սերվերային սենյակների կահավորում, ցանցային ենթակառուցվածք և կորպորատիվ Wi-Fi Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Услуги по созданию IT-инфраструктуры в Армении. Q Group выполняет оснащение серверных, сетевую инфраструктуру и корпоративный Wi-Fi в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "structured-cabling",
    serviceId: "structured-cabling",
    priority: 0.8,
    title: {
      en: "Structured Cabling Armenia | Network Cabling Installation | Q Group",
      hy: "Կառուցվածքային Մալուխավորում Հայաստանում | Q Group",
      ru: "СКС и структурированные кабельные сети в Армении | Q Group",
    },
    description: {
      en: "Professional structured cabling services in Armenia. Q Group provides Cat6/Cat7/Fiber optic installation, LAN cabling, server room cabling, and network infrastructure for businesses in Yerevan and across Armenia.",
      hy: "Կառուցվածքային մալուխավորման ծառայություններ Հայաստանում: Q Group-ն իրականացնում է Cat6/Cat7/օպտիկական մալուխների անցկացում, LAN ցանցեր և սերվերային մալուխավորում Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Монтаж структурированных кабельных сетей в Армении. Q Group выполняет прокладку Cat6/Cat7/оптики, LAN-сетей и серверных в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "grc-consulting",
    serviceId: "grc",
    priority: 0.8,
    title: {
      en: "GRC Consulting Armenia | IT Compliance & Risk Management | Q Group",
      hy: "GRC Կոնսալթինգ Հայաստանում | ՏՏ Համապատասխանություն | Q Group",
      ru: "GRC-консалтинг в Армении | Комплаенс и риски | Q Group",
    },
    description: {
      en: "Professional GRC consulting services in Armenia. Q Group provides governance, risk management, compliance audits, ISO 27001 certification, and IT security assessments for businesses in Yerevan and across Armenia.",
      hy: "GRC խորհրդատվություն Հայաստանում: Q Group-ն ապահովում է ռիսկերի կառավարում, համապատասխանություն և ISO 27001 վկայագրում Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "GRC-консалтинг в Армении. Q Group обеспечивает управление рисками, соответствие стандартам и сертификацию ISO 27001 в Ереване и по всей Армении.",
    },
  },
  {
    seoSlug: "electrical",
    serviceId: "electrical",
    priority: 0.7,
    title: {
      en: "Electrical Installation Armenia | Power Systems & UPS | Q Group",
      hy: "Էլեկտրամոնտաժ Հայաստանում | Q Group",
      ru: "Электромонтаж в Армении | Q Group",
    },
    description: {
      en: "Professional electrical installation services in Armenia. Q Group provides UPS installation, generator setup, electrical panels, and commercial electrical work for businesses in Yerevan and across Armenia.",
      hy: "Էլեկտրամոնտաժի ծառայություններ Հայաստանում: Q Group-ն իրականացնում է UPS-ի, գեներատորների և էլեկտրական վահանակների տեղադրում Երևանում և Հայաստանի ողջ տարածքում:",
      ru: "Электромонтажные услуги в Армении. Q Group выполняет установку ИБП, генераторов и электрических щитов в Ереване и по всей Армении.",
    },
  },
];

const OG_LOCALE: Record<SeoLang, string> = {
  en: "en_US",
  hy: "hy_AM",
  ru: "ru_RU",
};

export function servicePath(seoSlug: string, lang: SeoLang): string {
  return routeServicePath(seoSlug, lang);
}

export function ogImage(): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: `${BASE_URL}/images/logos/q-logo-original.png`,
      width: 500,
      height: 500,
      alt: "Q Group — IT Support & Managed IT Services in Armenia",
    },
  ];
}

export function serviceAlternates(seoSlug: string) {
  return buildLanguageAlternates((lang) => servicePath(seoSlug, lang));
}

export function hubAlternates() {
  return buildLanguageAlternates((lang) => routeHubPath(lang));
}

export function localizedServiceMetadata(seoSlug: string, lang: SeoLang): Metadata {
  const seo = serviceRoutes.find((s) => s.seoSlug === seoSlug);
  if (!seo) return {};
  const url = absoluteUrl(servicePath(seoSlug, lang));
  const title = seo.title[lang] || seo.title.en;
  const description = seo.description[lang] || seo.description.en;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates((l) => servicePath(seoSlug, l)),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Q Group",
      locale: OG_LOCALE[lang],
      type: "website",
      images: ogImage(),
    },
  };
}

export const hubLocalizedSeo: Record<
  SeoLang,
  { title: string; description: string }
> = {
  en: {
    title: "IT Services Armenia | All Services | Q Group",
    description:
      "Explore all Q Group IT services in Armenia: IT outsourcing, cybersecurity, managed IT services, infrastructure, structured cabling, GRC consulting, and electrical systems.",
  },
  hy: {
    title: "ՏՏ Ծառայություններ Հայաստանում | Բոլոր Ծառայությունները | Q Group",
    description:
      "Ծանոթացեք Q Group-ի բոլոր ՏՏ ծառայություններին Հայաստանում: ՏՏ աութսորսինգ, կիբեռանվտանգություն, կառավարվող ՏՏ ծառայություններ, ենթակառուցվածք և էլեկտրամոնտաժ:",
  },
  ru: {
    title: "IT-услуги в Армении | Все услуги | Q Group",
    description:
      "Все IT-услуги Q Group в Армении: аутсорсинг, кибербезопасность, управляемые услуги, инфраструктура, СКС, GRC и электромонтаж.",
  },
};

export function localizedHubMetadata(lang: SeoLang): Metadata {
  const seo = hubLocalizedSeo[lang];
  const url = absoluteUrl(routeHubPath(lang));
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: hubAlternates(),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Q Group",
      locale: OG_LOCALE[lang],
      type: "website",
      images: ogImage(),
    },
  };
}