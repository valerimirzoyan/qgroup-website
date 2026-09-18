import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Q Group Admin",
  description: "Q Group website content management panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080d1a] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}