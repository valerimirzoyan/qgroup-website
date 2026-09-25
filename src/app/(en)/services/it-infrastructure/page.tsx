import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "IT Infrastructure Armenia | Network Infrastructure Company | Q Group",
  description:
    "Professional IT infrastructure services in Armenia. Q Group provides server room setup, network infrastructure, enterprise Wi-Fi, and data center solutions for businesses in Yerevan and across Armenia.",
  keywords: [
    "IT infrastructure Armenia",
    "IT infrastructure company Armenia",
    "IT infrastructure services Armenia",
    "network infrastructure Armenia",
    "IT infrastructure Yerevan",
    "server room setup Armenia",
    "data center Armenia",
  ],
  openGraph: {
    title: "IT Infrastructure Services in Armenia | Q Group",
    description:
      "Enterprise IT infrastructure solutions in Armenia. Server rooms, network infrastructure, and data center services.",
    url: "https://qgroup24.com/services/it-infrastructure",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage(),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/it-infrastructure",
    languages: serviceAlternates("it-infrastructure"),
  },
};

export default function ItInfrastructurePage() {
  return (
    <>
      <JsonLd data={servicePageSchema("it-infrastructure", "en")} />
      <ServiceLanding serviceId="infrastructure" />
    </>
  );
}