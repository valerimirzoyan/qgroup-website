"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { ShieldCheck, Cpu, CheckCircle2, Award, Zap } from "lucide-react";

export const PartnersSection: React.FC = () => {
  const { t } = useLanguage();

  const partners = [
    {
      name: "Microsoft",
      logo: "/images/partners/microsoft-orig.png",
      tag: "Cloud, Azure & Microsoft 365",
      type: "Global Vendor",
      url: "https://www.microsoft.com/",
    },
    {
      name: "Bitdefender",
      logo: "/images/partners/bitdefender-orig.webp",
      tag: "Endpoint & EDR Security",
      type: "Global Vendor",
      url: "https://www.bitdefender.com/",
    },
    {
      name: "Kaspersky",
      logo: "/images/partners/kaspersky-orig.png",
      tag: "Cybersecurity & Antivirus",
      type: "Global Vendor",
      url: "https://www.kaspersky.com/",
    },
    {
      name: "MUK Group",
      logo: "/images/partners/muk-orig.png",
      tag: "Cisco, Dell & Fortinet VAD",
      type: "Premier Distributor",
      url: "https://muk.group/am/country/am/",
    },
    {
      name: "Mont Tech",
      logo: "/images/partners/mont-orig.png",
      tag: "Software & Cloud Solutions",
      type: "VAD Distributor",
      url: "https://monttech.am/hy-am",
    },
    {
      name: "Axoft Global",
      logo: "/images/partners/axoft-orig.png",
      tag: "Security & Infrastructure",
      type: "Global Distributor",
      url: "https://axoftglobal.com/ru-am/",
    },
    {
      name: "DG Comp",
      logo: "/images/partners/dgcomp-orig.png",
      tag: "Enterprise IT Hardware",
      type: "Authorized Distributor",
      url: "https://dgcomp.am/",
    },
    {
      name: "X-Art",
      logo: "/images/partners/xart-orig.png",
      tag: "Apple & IT Hardware",
      type: "Authorized Distributor",
      url: "https://x-art.am/",
    },
    {
      name: "Scan City",
      logo: "/images/partners/scancity-orig.png",
      tag: "Auto-ID & POS Systems",
      type: "Authorized Distributor",
      url: "https://scancity.am/",
    },
    {
      name: "GSC",
      logo: "/images/partners/gsc-orig.png",
      tag: "Security & CCTV Systems",
      type: "Security Partner",
      url: "https://www.gsc.am/",
    },
  ];

  return (
    <section id="partners" className="py-20 bg-[#080d1a] relative overflow-hidden border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-lime-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t("partners.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("partners.title")}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            {t("partners.subtitle")}
          </p>
        </div>

        {/* Interactive Responsive Partner Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 mb-10">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-lime-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-lime-500/10 hover:-translate-y-1 backdrop-blur-sm cursor-pointer"
            >
              {/* Logo Presentation Box */}
              <div className="w-full h-14 bg-white/95 rounded-xl p-2 flex items-center justify-center mb-3 shadow-inner group-hover:bg-white transition-colors">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-0.5 w-full">
                <div className="text-xs font-bold text-slate-200 group-hover:text-lime-400 transition-colors truncate">
                  {partner.name}
                </div>
                <div className="text-[10px] font-medium text-slate-400 truncate">
                  {partner.tag}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 w-full flex items-center justify-center gap-1 text-[9px] font-semibold text-lime-400/90 uppercase tracking-wider">
                <CheckCircle2 className="w-2.5 h-2.5 text-lime-400" />
                <span>{partner.type}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">{t("partners.benefit1_title")}</div>
              <div className="text-[11px] text-slate-400">{t("partners.benefit1_desc")}</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">{t("partners.benefit2_title")}</div>
              <div className="text-[11px] text-slate-400">{t("partners.benefit2_desc")}</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">{t("partners.benefit3_title")}</div>
              <div className="text-[11px] text-slate-400">{t("partners.benefit3_desc")}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
