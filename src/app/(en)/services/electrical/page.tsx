import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Electrical Installation Armenia | Power Systems & UPS | Q Group",
  description:
    "Professional electrical installation services in Armenia. Q Group provides UPS installation, generator setup, electrical panels, and commercial electrical work for businesses in Yerevan and across Armenia.",
  keywords: [
    "electrical installation Armenia",
    "electrical contractor Yerevan",
    "commercial electrical services Armenia",
    "UPS installation Armenia",
    "generator installation Armenia",
    "electrical panel installation Armenia",
    "power systems Armenia",
  ],
  openGraph: {
    title: "Electrical Installation Services in Armenia | Q Group",
    description:
      "Professional electrical installation in Armenia. UPS, generators, electrical panels, and commercial power systems.",
    url: "https://qgroup24.com/services/electrical",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage(),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/electrical",
    languages: serviceAlternates("electrical"),
  },
};

export default function ElectricalPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("electrical", "en")} />
      <ServiceLanding serviceId="electrical" />
    </>
  );
}