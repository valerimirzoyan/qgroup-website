"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage, Language } from "@/data/LanguageContext";
import { servicePath } from "@/lib/routes";
import { serviceDetailsData, ServiceDetailItem } from "@/data/serviceDetails";
import { serviceDetailsExtra } from "@/data/serviceDetailsExtra";

const serviceData = { ...serviceDetailsData, ...serviceDetailsExtra };
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/ConsultationModal";
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Building2,
  Layers,
  Sparkles,
  Briefcase,
  Laptop,
  Server,
  FileCheck2,
  Zap,
  Headphones,
  Clock,
  Activity,
  ShieldCheck as ShieldIcon,
} from "lucide-react";

interface ServiceLandingProps {
  serviceId: string;
  lang?: Language;
}

const getServiceGradients = (id: string) => {
  switch (id) {
    case "outsourcing":
    case "it-support":
    case "managed-it":
      return {
        gradient: "from-lime-500 to-emerald-500",
        badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
        btnColor: "bg-lime-500 hover:bg-lime-400 text-slate-950 shadow-lime-500/25",
        accentText: "text-lime-400",
        ring: "hover:border-lime-500/40",
        bar: "bg-gradient-to-r from-lime-500 to-emerald-500",
      };
    case "infrastructure":
    case "structured-cabling":
      return {
        gradient: "from-emerald-500 to-teal-500",
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        btnColor: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25",
        accentText: "text-emerald-400",
        ring: "hover:border-emerald-500/40",
        bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
      };
    case "cybersecurity":
      return {
        gradient: "from-cyan-500 to-blue-500",
        badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        btnColor: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25",
        accentText: "text-cyan-400",
        ring: "hover:border-cyan-500/40",
        bar: "bg-gradient-to-r from-cyan-500 to-blue-500",
      };
    case "grc":
      return {
        gradient: "from-indigo-500 to-purple-500",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
        btnColor: "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/25",
        accentText: "text-indigo-400",
        ring: "hover:border-indigo-500/40",
        bar: "bg-gradient-to-r from-indigo-500 to-purple-500",
      };
    case "electrical":
      return {
        gradient: "from-amber-500 to-orange-500",
        badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25",
        accentText: "text-amber-400",
        ring: "hover:border-amber-500/40",
        bar: "bg-gradient-to-r from-amber-500 to-orange-500",
      };
    default:
      return {
        gradient: "from-lime-500 to-emerald-500",
        badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
        btnColor: "bg-lime-500 hover:bg-lime-400 text-slate-950 shadow-lime-500/25",
        accentText: "text-lime-400",
        ring: "hover:border-lime-500/40",
        bar: "bg-gradient-to-r from-lime-500 to-emerald-500",
      };
  }
};

const relatedServicesMeta: Record<
  string,
  { id: string; slug: string; icon: typeof Laptop }
> = {
  outsourcing: { id: "outsourcing", slug: "it-outsourcing", icon: Laptop },
  "it-support": { id: "it-support", slug: "it-support", icon: Headphones },
  "managed-it": { id: "managed-it", slug: "managed-it", icon: Activity },
  cybersecurity: { id: "cybersecurity", slug: "cybersecurity", icon: ShieldIcon },
  infrastructure: { id: "infrastructure", slug: "it-infrastructure", icon: Server },
  "structured-cabling": { id: "structured-cabling", slug: "structured-cabling", icon: Layers },
  grc: { id: "grc", slug: "grc-consulting", icon: FileCheck2 },
  electrical: { id: "electrical", slug: "electrical", icon: Zap },
};

const statsStrip = [
  { icon: Clock, en: "24/7 Monitoring", hy: "24/7 Մոնիտորինգ", ru: "Мониторинг 24/7" },
  { icon: Activity, en: "<15 min SLA", hy: "<15 րոպե SLA", ru: "SLA <15 мин" },
  { icon: ShieldIcon, en: "ISO 27001 Practice", hy: "ISO 27001 Ստանդարտ", ru: "ISO 27001" },
  { icon: Headphones, en: "200+ Enterprise Clients", hy: "200+ Կորպորատիվ հաճախորդ", ru: "200+ клиентов" },
];

function ServiceLandingInner({ serviceId }: ServiceLandingProps) {
  const { lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | undefined>(undefined);

  const data: ServiceDetailItem | undefined = serviceData[serviceId];
  const IconComponent = relatedServicesMeta[serviceId]?.icon ?? Laptop;
  const styling = getServiceGradients(serviceId);

  if (!data) return null;

  const title = data.title[lang] || data.title.en;
  const tagline = data.tagline[lang] || data.tagline.en;
  const badge = data.badge[lang] || data.badge.en;
  const overviewList = data.overview[lang] || data.overview.en;
  const benefitsList = data.benefits[lang] || data.benefits.en;
  const industriesList = data.industries[lang] || data.industries.en;
  const serviceModelsList = data.serviceModels[lang] || data.serviceModels.en;

  const labels = {
    overviewTitle:
      lang === "hy"
        ? "Ծառայության Նկարագրություն"
        : lang === "ru"
          ? "Обзор услуги"
          : "Service Overview",
    deliverablesTitle:
      lang === "hy"
        ? "Հիմնական Ուղղություններ և Ծավալ"
        : lang === "ru"
          ? "Ключевые направления и состав работ"
          : "Key Deliverables & Scope",
    benefitsTitle:
      lang === "hy"
        ? "Բիզնես Առավելություններ"
        : lang === "ru"
          ? "Преимущества для бизнеса"
          : "Business Benefits",
    industriesTitle:
      lang === "hy"
        ? "Ոլորտներ, Որոնց Սպասարկում ենք"
        : lang === "ru"
          ? "Отрасли и специализация"
          : "Industries We Serve",
    engagementTitle:
      lang === "hy"
        ? "Համագործակցության Մոդելներ"
        : lang === "ru"
          ? "Форматы сотрудничества"
          : "Engagement Models",
    relatedTitle:
      lang === "hy"
        ? "Հարակից Ծառայություններ"
        : lang === "ru"
          ? "Связанные услуги"
          : "Related Services",
    ctaConsultation:
      lang === "hy"
        ? "Պատվիրել Անվճար ՏՏ Աուդիտ"
        : lang === "ru"
          ? "Заказать бесплатный IT-аудит"
          : "Request Free IT Audit",
    callImmediate:
      lang === "hy" ? "Արագ զանգ՝ 8123" : lang === "ru" ? "Срочный звонок: 8123" : "Fast call: 8123",
    emergency:
      lang === "hy"
        ? "Վթարայի՞ն խնդիր: Զանգահարեք անմիջապես 8123"
        : lang === "ru"
          ? "Аварийная ситуация? Звоните 8123"
          : "Emergency technical incident? Call 8123 immediately.",
    emergencySub:
      lang === "hy"
        ? "24/7 շտապ արտագնա արձագանքում Երևանում և մարզերում"
        : lang === "ru"
          ? "Круглосуточный срочный выезд по Еревану и регионам"
          : "24/7 dedicated rapid emergency dispatch across Armenia.",
    learnMore:
      lang === "hy" ? "Իմանալ ավելին" : lang === "ru" ? "Подробнее" : "Learn more",
  };

  const related = Object.values(relatedServicesMeta)
    .filter((s) => s.id !== serviceId && data)
    .map((s) => {
      const relatedData = serviceData[s.id];
      return {
        ...s,
        title: (relatedData?.title[lang] || relatedData?.title.en || ""),
        tagline: (relatedData?.tagline[lang] || relatedData?.tagline.en || ""),
        styling: getServiceGradients(s.id),
      };
    })
    .filter((s) => s.title);

  const handleOpenConsultation = (service?: string) => {
    if (service) setDefaultService(service);
    setModalOpen(true);
  };

  const handleSelectServiceTab = () => {
    const servicesElem = document.getElementById("services");
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-lime-500 selection:text-slate-950">
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onSelectServiceTab={handleSelectServiceTab}
      />

      {/* ===== HERO ===== */}
      <main className="flex-grow">
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden hero-glow">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className={`absolute top-1/3 right-10 w-72 h-72 ${styling.badgeBg.replace("text-", "bg-").replace(/ border-[^\s]+/, "")} opacity-20 blur-[100px] rounded-full pointer-events-none -z-10`} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border ${styling.badgeBg.split(" ")[2]} shadow-lg backdrop-blur-md`}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
                  </span>
                  <span className={`text-xs sm:text-sm font-semibold ${styling.accentText}`}>
                    {badge}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${styling.badgeBg} text-xs font-extrabold uppercase tracking-widest`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  Q Group Armenia
                </span>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] break-words">
                {title}
              </h1>

              <p className="mt-5 text-lg sm:text-xl text-slate-200 font-medium max-w-3xl">
                {tagline}
              </p>

              <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl">
                {overviewList[0]}
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                <button
                  onClick={() => handleOpenConsultation(title)}
                  className="w-full sm:w-auto gradient-border-btn px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-lime-500/25 group"
                >
                  <span>{labels.ctaConsultation}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="tel:8123"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-base flex items-center justify-center gap-2.5 transition backdrop-blur-md hover:border-slate-600 shadow-md"
                >
                  <PhoneCall className="w-5 h-5 text-lime-400" />
                  <span>{labels.callImmediate}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS STRIP ===== */}
        <section className="border-y border-slate-800/70 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsStrip.map((stat, idx) => {
              const StatIcon = stat.icon;
              const label = stat[lang] || stat.en;
              return (
                <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${styling.accentText} shrink-0`}>
                    <StatIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== OVERVIEW ===== */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{labels.overviewTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800">
                <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                  {overviewList.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DELIVERABLES ===== */}
        <section className="py-24 bg-slate-900/40 border-y border-slate-800/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                <span>{labels.deliverablesTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {lang === "hy"
                  ? "Ինչ ենք Մատուցում"
                  : lang === "ru"
                    ? "Что мы предоставляем"
                    : "What We Deliver"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.deliverables.map((item, idx) => {
                const itemTitle = item.title[lang] || item.title.en;
                const itemDesc = item.desc[lang] || item.desc.en;
                return (
                  <div
                    key={idx}
                    className="glass-card rounded-3xl p-7 border border-slate-800 relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${styling.bar} opacity-80`} />
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${styling.badgeBg} border flex items-center justify-center font-extrabold text-lg shrink-0`}>
                        {idx + 1}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
                          {itemTitle}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {itemDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{labels.benefitsTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {lang === "hy"
                  ? "Ձեր Բիզնեսի Առավելությունները"
                  : lang === "ru"
                    ? "Выгоды для вашего бизнеса"
                    : "The Q Group Advantage"}
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
              {benefitsList.map((b, idx) => (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-5 border border-slate-800 flex items-start gap-3 ${styling.ring}`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${styling.accentText} shrink-0 mt-0.5`} />
                  <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INDUSTRIES + ENGAGEMENT ===== */}
        <section className="py-24 bg-slate-900/40 border-y border-slate-800/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{labels.industriesTitle}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {industriesList.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{labels.engagementTitle}</span>
                </div>
                <div className="glass-card rounded-3xl p-7 border border-slate-800 space-y-4">
                  {serviceModelsList.map((mod, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className={`w-2 h-2 rounded-full ${styling.accentText}`} style={{ background: "currentColor" }} />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== RELATED SERVICES ===== */}
        <section id="services" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                <span>{labels.relatedTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {lang === "hy"
                  ? "Գտեք Ձեր Լուծումը"
                  : lang === "ru"
                    ? "Найдите своё решение"
                    : "Explore More Solutions"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((service) => {
                const RelIcon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={servicePath(service.slug, lang)}
                    className={`glass-card rounded-3xl p-7 flex flex-col justify-between border border-slate-800 relative overflow-hidden group ${service.styling.ring} hover:-translate-y-1 transition-all duration-300 shadow-lg`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${service.styling.bar}`} />
                    <div className="space-y-5">
                      <div className={`w-12 h-12 rounded-2xl ${service.styling.badgeBg} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <RelIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className={`text-xs font-semibold ${service.styling.accentText} mt-1`}>
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-sm font-bold text-lime-400">
                      <span>{labels.learnMore}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ===== CTA / FOOTER ===== */}
      <Footer onSelectServiceTab={handleSelectServiceTab} />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={defaultService}
      />
    </div>
  );
}

export const ServiceLanding: React.FC<ServiceLandingProps> = ({ serviceId, lang = "en" }) => {
  return (
    <LanguageProvider lang={lang}>
      <ServiceLandingInner serviceId={serviceId} />
    </LanguageProvider>
  );
};