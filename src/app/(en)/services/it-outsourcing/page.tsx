import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "IT Outsourcing Armenia | Managed IT Services | Q Group",
  description:
    "Professional IT outsourcing services in Armenia. Q Group provides 24/7 managed IT support, server administration, helpdesk, and complete IT department coverage for businesses in Yerevan and across Armenia.",
  keywords: [
    "IT outsourcing Armenia",
    "IT outsourcing Yerevan",
    "IT outsourcing company Armenia",
    "managed IT services Armenia",
    "IT support Armenia",
    "outsourced IT support Armenia",
    "IT services Armenia",
    "IT company Armenia",
  ],
  openGraph: {
    title: "IT Outsourcing Services in Armenia | Q Group",
    description:
      "Enterprise IT outsourcing solutions in Armenia. 24/7 managed IT support, cybersecurity, server administration, and infrastructure management.",
    url: "https://qgroup24.com/services/it-outsourcing",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage(),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/it-outsourcing",
    languages: serviceAlternates("it-outsourcing"),
  },
};

export default function ItOutsourcingPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("it-outsourcing", "en")} />
      <ServiceLanding serviceId="outsourcing" />
    </>
  );
}