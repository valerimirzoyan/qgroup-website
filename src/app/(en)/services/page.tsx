import type { Metadata } from "next";
import { ServicesHub } from "@/components/ServicesHub";
import { hubAlternates } from "@/lib/serviceSeo";
import { JsonLd } from "@/components/JsonLd";
import { HUB_LABEL, hubBreadcrumb } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "IT Services Armenia | All Services | Q Group",
  description:
    "Explore all Q Group IT services in Armenia: IT outsourcing, cybersecurity, managed IT services, infrastructure, structured cabling, GRC consulting, and electrical systems.",
  alternates: {
    canonical: "https://qgroup24.com/services",
    languages: hubAlternates(),
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={hubBreadcrumb("en", HUB_LABEL.en)} />
      <ServicesHub />
    </>
  );
}