import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "GRC Consulting Armenia | IT Compliance & Risk Management | Q Group",
  description:
    "Professional GRC consulting services in Armenia. Q Group provides governance, risk management, compliance audits, ISO 27001 certification, and IT security assessments for businesses in Yerevan and across Armenia.",
  keywords: [
    "GRC Armenia",
    "GRC consulting Armenia",
    "IT compliance Armenia",
    "cybersecurity compliance Armenia",
    "information security audit Armenia",
    "risk assessment Armenia",
    "ISO 27001 Armenia",
    "IT audit Armenia",
  ],
  openGraph: {
    title: "GRC Consulting Services in Armenia | Q Group",
    description:
      "Professional GRC consulting in Armenia. Governance, risk management, compliance audits, and ISO 27001 certification.",
    url: "https://qgroup24.com/services/grc-consulting",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage("en"),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/grc-consulting",
    languages: serviceAlternates("grc-consulting"),
  },
};

export default function GrcConsultingPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("grc-consulting", "en")} />
      <ServiceLanding serviceId="grc" />
    </>
  );
}