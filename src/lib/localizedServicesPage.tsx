import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ServicesHub } from "@/components/ServicesHub";
import { ServiceLanding } from "@/components/ServiceLanding";
import { JsonLd } from "@/components/JsonLd";
import {
  HUB_LABEL,
  hubBreadcrumb,
  servicePageSchema,
} from "@/lib/structuredData";
import {
  SERVICE_LOCALIZED_SLUG,
  SERVICE_SLUGS,
  SERVICES_HUB_SEGMENT,
  hubPath,
  internalSlugFromLocalized,
  serviceIdFromSlug,
  servicePath,
  type Lang,
} from "@/lib/routes";
import {
  localizedHubMetadata,
  localizedServiceMetadata,
} from "@/lib/serviceSeo";

interface RouteParams {
  slug: string[];
}

function decodeSegments(slug: string[]): string[] {
  return slug.map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
}

export function createLocalizedServicesRoute(lang: Lang) {
  const segment = SERVICES_HUB_SEGMENT[lang];

  function generateStaticParams(): RouteParams[] {
    const native: RouteParams[] = [
      { slug: [segment] },
      ...SERVICE_SLUGS.map((slug) => ({
        slug: [segment, SERVICE_LOCALIZED_SLUG[slug][lang]],
      })),
    ];
    // Legacy English-segment URLs are prerendered so they can emit a 308/301.
    const legacy: RouteParams[] = [
      { slug: ["services"] },
      ...SERVICE_SLUGS.map((slug) => ({ slug: ["services", slug] })),
    ];
    return [...native, ...legacy];
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<RouteParams>;
  }): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeSegments(rawSlug);
    if (slug.length === 1 && slug[0] === segment) {
      return localizedHubMetadata(lang);
    }
    if (slug.length === 2 && slug[0] === segment) {
      const internal = internalSlugFromLocalized(lang, slug[1]);
      if (internal) return localizedServiceMetadata(internal, lang);
    }
    return {};
  }

  async function Page({ params }: { params: Promise<RouteParams> }) {
    const { slug: rawSlug } = await params;
    const slug = decodeSegments(rawSlug);

    // Old localized URLs (e.g. /hy/services/cybersecurity) permanently move
    // to the native-script equivalents.
    if (slug[0] === "services") {
      if (slug.length === 1) permanentRedirect(encodeURI(hubPath(lang)));
      if (slug.length === 2 && SERVICE_SLUGS.includes(slug[1])) {
        permanentRedirect(encodeURI(servicePath(slug[1], lang)));
      }
      notFound();
    }

    if (slug[0] !== segment) notFound();

    if (slug.length === 1) {
      return (
        <>
          <JsonLd data={hubBreadcrumb(lang, HUB_LABEL[lang])} />
          <ServicesHub lang={lang} />
        </>
      );
    }

    if (slug.length === 2) {
      const internal = internalSlugFromLocalized(lang, slug[1]);
      if (!internal) notFound();
      return (
        <>
          <JsonLd data={servicePageSchema(internal, lang)} />
          <ServiceLanding serviceId={serviceIdFromSlug(internal)} lang={lang} />
        </>
      );
    }

    notFound();
  }

  return { generateStaticParams, generateMetadata, Page };
}
