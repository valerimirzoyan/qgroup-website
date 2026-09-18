import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "IT Support Armenia | Technical Support Company | Q Group",
  description:
    "Professional IT support services in Armenia. Q Group provides 24/7 helpdesk, on-site technical support, workstation management, and emergency IT assistance for businesses in Yerevan and across Armenia.",
  keywords: [
    "IT support Armenia",
    "IT support Yerevan",
    "IT support company Armenia",
    "business IT support Armenia",
    "corporate IT support Armenia",
    "technical support Armenia",
    "helpdesk Armenia",
    "IT service provider Armenia",
  ],
  openGraph: {
    title: "IT Support Services in Armenia | Q Group",
    description:
      "24/7 IT support services in Armenia. Helpdesk, on-site technical support, workstation management, and emergency IT assistance.",
    url: "https://qgroup24.com/services/it-support",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage("en"),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/it-support",
    languages: serviceAlternates("it-support"),
  },
};

export default function ItSupportPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("it-support", "en")} />
      <ServiceLanding serviceId="it-support" />
    </>
  );
}