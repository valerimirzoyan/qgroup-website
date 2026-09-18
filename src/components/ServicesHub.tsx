"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage, Language } from "@/data/LanguageContext";
import { servicePath } from "@/lib/routes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/ConsultationModal";
import {
  ArrowRight,
  Layers,
  Sparkles,
  Laptop,
  Server,
  ShieldCheck,
  FileCheck2,
  Zap,
  Headphones,
  Activity,
} from "lucide-react";

const servicesMeta = [
  {
    id: "outsourcing",
    slug: "it-outsourcing",
    icon: Laptop,
    color: "from-lime-500 to-emerald-500",
    accent: "text-lime-400",
    bgAccent: "bg-lime-500/10",
    borderAccent: "border-lime-500/20",
    titleKey: "services.outsourcing.title",
    taglineKey: "services.outsourcing.tagline",
    descKey: "services.outsourcing.desc",
  },
  {
    id: "infrastructure",
    slug: "it-infrastructure",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    titleKey: "services.infra.title",
    taglineKey: "services.infra.tagline",
    descKey: "services.infra.desc",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-500",
    accent: "text-cyan-400",
    bgAccent: "bg-cyan-500/10",
    borderAccent: "border-cyan-500/20",
    titleKey: "services.cyber.title",
    taglineKey: "services.cyber.tagline",
    descKey: "services.cyber.desc",
  },
  {
    id: "grc",
    slug: "grc-consulting",
    icon: FileCheck2,
    color: "from-indigo-500 to-purple-500",
    accent: "text-indigo-400",
    bgAccent: "bg-indigo-500/10",
    borderAccent: "border-indigo-500/20",
    titleKey: "services.grc.title",
    taglineKey: "services.grc.tagline",
    descKey: "services.grc.desc",
  },
  {
    id: "electrical",
    slug: "electrical",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    accent: "text-amber-400",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/20",
    titleKey: "services.electrical.title",
    taglineKey: "services.electrical.tagline",
    descKey: "services.electrical.desc",
  },
];

const extraServices = [
  {
    slug: "it-support",
    icon: Headphones,
    en: { title: "IT Support & Helpdesk", tagline: "24/7 technical support for your business" },
    hy: { title: "ՏՏ Սպասարկում և HelpDesk", tagline: "24/7 տեխնիկական աջակցություն" },
    ru: { title: "IT-поддержка и Helpdesk", tagline: "Техподдержка 24/7 для бизнеса" },
  },
  {
    slug: "managed-it",
    icon: Activity,
    en: { title: "Managed IT Services", tagline: "Proactive MSP solutions for your stack" },
    hy: { title: "Կառավարվող ՏՏ Ծառայություններ", tagline: "Ակտիվ MSP լուծումներ" },
    ru: { title: "Управляемые IT-услуги", tagline: "Проактивные MSP-решения" },
  },
  {
    slug: "structured-cabling",
    icon: Layers,
    en: { title: "Structured Cabling", tagline: "Certified cabling for fast networks" },
    hy: { title: "Կառուցվածքային Մալուխավորում", tagline: "Սերտիֆիկացված ցանցային կապ" },
    ru: { title: "Структурированные СКС", tagline: "Сертифицированные сети" },
  },
];

function ServicesHubInner() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectServiceTab = () => {
    // On the hub page the dropdown scrolls to the grid
    const servicesElem = document.getElementById("services-grid");
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-lime-500 selection:text-slate-950">
      <Navbar onOpenConsultation={() => setModalOpen(true)} onSelectServiceTab={handleSelectServiceTab} />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden hero-glow">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-lime-500/30 shadow-lg shadow-lime-500/10 backdrop-blur-md mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-lime-400">
                  {t("services.badge")}
                </span>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] break-words">
                {lang === "hy"
                  ? "ՏՏ Ծառայություններ Հայաստանում"
                  : lang === "ru"
                    ? "IT-услуги в Армении"
                    : "IT Services in Armenia"}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {t("services.subtitle")}
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#services-grid"
                  className="w-full sm:w-auto gradient-border-btn px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-lime-500/25 group"
                >
                  <span>{t("nav.services")}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-y-0.5 group-hover:-translate-x-0 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services-grid" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("services.badge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {t("services.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesMeta.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={servicePath(service.slug, lang)}
                    className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-slate-800 hover:border-lime-500/40 hover:bg-slate-900/90 transition-all duration-300 group relative overflow-hidden cursor-pointer hover:-translate-y-1 shadow-lg"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color}`} />

                    <div className="space-y-6">
                      <div className={`w-14 h-14 rounded-2xl ${service.bgAccent} border ${service.borderAccent} flex items-center justify-center ${service.accent} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">
                          {t(service.titleKey)}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">
                          {t(service.taglineKey)}
                        </p>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {t(service.descKey)}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-800/80">
                      <div className="flex items-center gap-2 text-sm font-bold text-lime-400">
                        <span>{t("services.learn_more")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Additional SEO cluster services */}
              {extraServices.map((service) => {
                const Icon = service.icon;
                const labels = service[lang] || service.en;
                return (
                  <Link
                    key={service.slug}
                    href={servicePath(service.slug, lang)}
                    className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-slate-800 hover:border-lime-500/40 hover:bg-slate-900/90 transition-all duration-300 group relative overflow-hidden cursor-pointer hover:-translate-y-1 shadow-lg"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-500 to-emerald-500" />

                    <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">
                          {labels.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">
                          {labels.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-800/80">
                      <div className="flex items-center gap-2 text-sm font-bold text-lime-400">
                        <span>{t("services.learn_more")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer onSelectServiceTab={handleSelectServiceTab} />

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export const ServicesHub: React.FC<{ lang?: Language }> = ({ lang = "en" }) => {
  return (
    <LanguageProvider lang={lang}>
      <ServicesHubInner />
    </LanguageProvider>
  );
};