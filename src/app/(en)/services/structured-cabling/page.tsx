import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Structured Cabling Armenia | Network Cabling Installation | Q Group",
  description:
    "Professional structured cabling services in Armenia. Q Group provides Cat6/Cat7/Fiber optic installation, LAN cabling, server room cabling, and network infrastructure for businesses in Yerevan and across Armenia.",
  keywords: [
    "structured cabling Armenia",
    "structured cabling Yerevan",
    "network cabling Armenia",
    "LAN cabling Armenia",
    "fiber optic installation Armenia",
    "Cat6 installation Armenia",
    "cable installation Yerevan",
  ],
  openGraph: {
    title: "Structured Cabling Services in Armenia | Q Group",
    description:
      "Professional structured cabling solutions in Armenia. Cat6/Cat7/Fiber optic installation and network cabling.",
    url: "https://qgroup24.com/services/structured-cabling",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage("en"),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/structured-cabling",
    languages: serviceAlternates("structured-cabling"),
  },
};

export default function StructuredCablingPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("structured-cabling", "en")} />
      <ServiceLanding serviceId="structured-cabling" />
    </>
  );
}