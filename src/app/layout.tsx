import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q Group | IT Support Armenia, Managed IT Services & Cybersecurity",
  description: "Q Group provides enterprise IT support in Armenia, 24/7 managed IT services, cybersecurity defense, low current systems, server administration and electrical infrastructure across Armenia.",
  keywords: [
    "IT Support Armenia",
    "Managed IT Services Armenia",
    "IT Outsourcing Yerevan",
    "Cybersecurity Armenia",
    "Network Cabling Yerevan",
    "Q Group Armenia",
    "Low Current Systems Armenia",
    "Server Management Yerevan"
  ],
  icons: {
    icon: "/images/logos/q-logo.png",
    apple: "/images/logos/q-logo.png",
  },
  openGraph: {
    title: "Q Group | IT Support Armenia & Managed IT Services",
    description: "Enterprise IT support, cybersecurity, server administration and 24/7 helpdesk across Armenia.",
    url: "https://qgroup24.com",
    siteName: "Q Group",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080d1a] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
