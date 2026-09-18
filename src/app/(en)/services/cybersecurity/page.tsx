import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { ogImage, serviceAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { servicePageSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Cybersecurity Armenia | Information Security Company | Q Group",
  description:
    "Professional cybersecurity services in Armenia. Q Group provides penetration testing, SOC monitoring, firewall management, EDR solutions, and comprehensive threat defense for businesses in Yerevan and across Armenia.",
  keywords: [
    "cybersecurity Armenia",
    "cybersecurity company Armenia",
    "cybersecurity services Armenia",
    "cyber security Yerevan",
    "information security Armenia",
    "IT security company Armenia",
    "penetration testing Armenia",
    "SOC Armenia",
  ],
  openGraph: {
    title: "Cybersecurity Services in Armenia | Q Group",
    description:
      "Enterprise cybersecurity solutions in Armenia. SOC monitoring, penetration testing, firewall management, and threat defense.",
    url: "https://qgroup24.com/services/cybersecurity",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
    images: ogImage("en"),
  },
  alternates: {
    canonical: "https://qgroup24.com/services/cybersecurity",
    languages: serviceAlternates("cybersecurity"),
  },
};

export default function CybersecurityPage() {
  return (
    <>
      <JsonLd data={servicePageSchema("cybersecurity", "en")} />
      <ServiceLanding serviceId="cybersecurity" />
    </>
  );
}