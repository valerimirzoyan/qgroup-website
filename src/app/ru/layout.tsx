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
  title: "Q Group | IT-поддержка в Армении, Кибербезопасность и IT-услуги",
  description:
    "Q Group — IT-поддержка предприятий в Армении: управляемые IT-услуги 24/7, кибербезопасность, администрирование серверов и инфраструктурные решения по всей Армении.",
  keywords: [
    "IT-поддержка в Армении",
    "IT-поддержка в Ереване",
    "IT-аутсорсинг в Армении",
    "кибербезопасность в Армении",
    "управляемые IT-услуги",
    "IT-инфраструктура в Ереване",
    "IT-компания Армения",
    "Q Group",
    "IT-услуги в Армении",
  ],
  icons: {
    icon: "/images/logos/q-logo.png",
    apple: "/images/logos/q-logo.png",
  },
  alternates: {
    canonical: "https://qgroup24.com/ru",
    languages: {
      en: "https://qgroup24.com",
      hy: "https://qgroup24.com/hy",
      ru: "https://qgroup24.com/ru",
      "x-default": "https://qgroup24.com",
    },
  },
  openGraph: {
    title: "Q Group | IT-поддержка в Армении",
    description:
      "Корпоративная IT-поддержка, кибербезопасность и администрирование серверов в Армении.",
    url: "https://qgroup24.com/ru",
    siteName: "Q Group",
    locale: "ru_RU",
    alternateLocale: ["en_US", "hy_AM"],
    type: "website",
    images: ogImage(),
  },
};

export default function RuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark scroll-smooth" dir="ltr">
      <head>
        <link
          rel="preload"
          href="/images/logos/q-logo.png"
          as="image"
          type="image/png"
        />
        <JsonLd data={[organizationSchema("ru"), websiteSchema()]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080d1a] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}