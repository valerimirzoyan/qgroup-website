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
  title: "Q Group | ՏՏ Աջակցություն Հայաստանում, Կիբեռանվտանգություն և Կառավարվող ՏՏ",
  description:
    "Q Group-ը տրամադրում է ձեռնարկատիրական ՏՏ աջակցություն Հայաստանում, 24/7 կառավարվող ՏՏ ծառայություններ, կիբեռպաշտպանություն, սերվերային կառավարում և ենթակառուցվածքային լուծումներ ողջ Հայաստանում:",
  keywords: [
    "ՏՏ աջակցություն Հայաստանում",
    "ՏՏ աջակցություն Երևան",
    "ՏՏ աութսորսինգ Հայաստանում",
    "կիբեռանվտանգություն Հայաստանում",
    "կառավարվող ՏՏ ծառայություններ",
    "ՏՏ ենթակառուցվածք Երևան",
    "IT ընկերություն Հայաստան",
    "Q Group",
    "ՏՏ ծառայություններ Հայաստանում",
  ],
  icons: {
    icon: "/images/logos/q-logo.png",
    apple: "/images/logos/q-logo.png",
  },
  alternates: {
    canonical: "https://qgroup24.com/hy",
    languages: {
      en: "https://qgroup24.com",
      hy: "https://qgroup24.com/hy",
      ru: "https://qgroup24.com/ru",
      "x-default": "https://qgroup24.com",
    },
  },
  openGraph: {
    title: "Q Group | ՏՏ Աջակցություն Հայաստանում",
    description:
      "Կորպորատիվ ՏՏ աջակցություն, կիբեռանվտանգություն և սերվերային կառավարում Հայաստանում:",
    url: "https://qgroup24.com/hy",
    siteName: "Q Group",
    locale: "hy_AM",
    alternateLocale: ["en_US", "ru_RU"],
    type: "website",
    images: ogImage("hy"),
  },
};

export default function HyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy" className="dark scroll-smooth" dir="ltr">
      <head>
        <link
          rel="preload"
          href="/images/logos/q-logo.png"
          as="image"
          type="image/png"
        />
        <JsonLd data={[organizationSchema("hy"), websiteSchema()]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080d1a] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}