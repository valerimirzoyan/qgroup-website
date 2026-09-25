import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Managed IT Services Armenia | MSP Armenia | Q Group",
  description:
    "Professional managed IT services in Armenia. Q Group provides proactive 24/7 IT management, monitoring, cloud administration, and infrastructure maintenance for businesses in Yerevan and across Armenia.",
  keywords: [
    "managed IT services Armenia",
    "managed IT services Yerevan",
    "MSP Armenia",
    "managed service provider Armenia",
    "IT managed services Armenia",
    "cloud services Armenia",
    "Microsoft 365 support Armenia",
  ],
  openGraph: {
    title: "Managed IT Services in Armenia | Q Group",
    description:
      "Proactive 24/7 managed IT services in Armenia. Cloud administration, monitoring, and infrastructure maintenance.",
    url: "https://qgroup24.com/services/managed-it",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage(),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/managed-it",
    languages: serviceAlternates("managed-it"),
  },
};

export default function ManagedItPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("managed-it", "en")} />
      <ServiceLanding serviceId="managed-it" />
    </>
  );
}