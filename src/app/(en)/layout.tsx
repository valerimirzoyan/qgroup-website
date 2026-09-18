import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL } from "@/lib/routes";
import { ogImage } from "@/lib/serviceSeo";
import { organizationSchema, websiteSchema } from "@/lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Q Group | IT Support Armenia, Managed IT Services & Cybersecurity",
  description: "Q Group provides enterprise IT support in Armenia, 24/7 managed IT services, cybersecurity defense, low current systems, server administration and electrical infrastructure across Armenia.",
  keywords: [
    "IT Support Armenia",
    "Managed IT Services Armenia",
    "IT Outsourcing Armenia",
    "IT Outsourcing Yerevan",
    "Cybersecurity Armenia",
    "IT Infrastructure Armenia",
    "Network Cabling Yerevan",
    "Structured Cabling Armenia",
    "GRC Consulting Armenia",
    "Q Group Armenia",
    "Low Current Systems Armenia",
    "Server Management Yerevan",
    "IT company Armenia",
    "IT services Armenia"
  ],
  icons: {
    icon: "/images/logos/q-logo.png",
    apple: "/images/logos/q-logo.png",
  },
  alternates: {
    canonical: "https://qgroup24.com",
    languages: {
      en: "https://qgroup24.com",
      hy: "https://qgroup24.com/hy",
      ru: "https://qgroup24.com/ru",
      "x-default": "https://qgroup24.com",
    },
  },
  openGraph: {
    title: "Q Group | IT Support Armenia & Managed IT Services",
    description: "Enterprise IT support, cybersecurity, server administration and 24/7 helpdesk across Armenia.",
    url: "https://qgroup24.com",
    siteName: "Q Group",
    locale: "en_US",
    alternateLocale: ["hy_AM", "ru_RU"],
    type: "website",
    images: ogImage("en"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/images/logos/q-logo.png"
          as="image"
          type="image/png"
        />
        <JsonLd data={[organizationSchema("en"), websiteSchema()]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080d1a] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
