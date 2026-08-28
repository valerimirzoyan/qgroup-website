"use client";

import React, { useState } from "react";
import { useLanguage } from "@/data/LanguageContext";
import { ServiceModal } from "./ServiceModal";
import { 
  Laptop, 
  Server, 
  ShieldCheck, 
  FileCheck2, 
  Zap, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  Info
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  activeTab: propActiveTab,
  onTabChange
}) => {
  const { t } = useLanguage();
  const [internalTab, setInternalTab] = useState<string>("all");
  const [modalServiceId, setModalServiceId] = useState<string | null>(null);

  const currentTab = propActiveTab !== undefined ? propActiveTab : internalTab;

  const handleTabSelect = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  const services = [
    {
      id: "outsourcing",
      category: "core",
      icon: Laptop,
      badge: "Most Popular",
      title: t("services.outsourcing.title"),
      tagline: t("services.outsourcing.tagline"),
      desc: t("services.outsourcing.desc"),
      features: [
        t("services.outsourcing.feat1"),
        t("services.outsourcing.feat2"),
        t("services.outsourcing.feat3"),
        t("services.outsourcing.feat4"),
      ],
      color: "from-lime-500 to-emerald-500",
      accent: "text-lime-400",
      bgAccent: "bg-lime-500/10",
      borderAccent: "border-lime-500/20",
    },
    {
      id: "infrastructure",
      category: "infra",
      icon: Server,
      badge: "Engineering",
      title: t("services.infra.title"),
      tagline: t("services.infra.tagline"),
      desc: t("services.infra.desc"),
      features: [
        t("services.infra.feat1"),
        t("services.infra.feat2"),
        t("services.infra.feat3"),
        t("services.infra.feat4"),
      ],
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/20",
    },
    {
      id: "cybersecurity",
      category: "security",
      icon: ShieldCheck,
      badge: "High Priority",
      title: t("services.cyber.title"),
      tagline: t("services.cyber.tagline"),
      desc: t("services.cyber.desc"),
      features: [
        t("services.cyber.feat1"),
        t("services.cyber.feat2"),
        t("services.cyber.feat3"),
        t("services.cyber.feat4"),
      ],
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-400",
      bgAccent: "bg-cyan-500/10",
      borderAccent: "border-cyan-500/20",
    },
    {
      id: "grc",
      category: "compliance",
      icon: FileCheck2,
      badge: "Audit & Risk",
      title: t("services.grc.title"),
      tagline: t("services.grc.tagline"),
      desc: t("services.grc.desc"),
      features: [
        t("services.grc.feat1"),
        t("services.grc.feat2"),
        t("services.grc.feat3"),
        t("services.grc.feat4"),
      ],
      color: "from-indigo-500 to-purple-500",
      accent: "text-indigo-400",
      bgAccent: "bg-indigo-500/10",
      borderAccent: "border-indigo-500/20",
    },
    {
      id: "electrical",
      category: "power",
      icon: Zap,
      badge: "Power & UPS",
      title: t("services.electrical.title"),
      tagline: t("services.electrical.tagline"),
      desc: t("services.electrical.desc"),
      features: [
        t("services.electrical.feat1"),
        t("services.electrical.feat2"),
        t("services.electrical.feat3"),
        t("services.electrical.feat4"),
      ],
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-400",
      bgAccent: "bg-amber-500/10",
      borderAccent: "border-amber-500/20",
    },
  ];

  const filteredServices = currentTab === "all" 
    ? services 
    : services.filter(s => s.category === currentTab || s.id === currentTab);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("services.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t("services.title")}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => handleTabSelect("all")}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              currentTab === "all"
                ? "bg-lime-500 text-slate-950 shadow-lg shadow-lime-500/20"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t("services.tab_all")}</span>
          </button>
          
          {services.map((s) => {
            const Icon = s.icon;
            const isSelected = currentTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleTabSelect(s.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-lime-500 text-slate-950 shadow-lg shadow-lime-500/20 font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{s.title.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 ${filteredServices.length === 1 ? "max-w-2xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"} gap-8`}>
          {filteredServices.map((service) => {
            const Icon = service.icon;
            const isSingleView = filteredServices.length === 1;

            return (
              <div
                key={service.id}
                onClick={() => setModalServiceId(service.id)}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between border ${
                  isSingleView 
                    ? "border-lime-500/50 shadow-2xl shadow-lime-500/10 bg-slate-900/90 ring-1 ring-lime-500/30" 
                    : "border-slate-800 hover:border-lime-500/40 hover:bg-slate-900/90"
                } transition-all duration-300 group relative overflow-hidden cursor-pointer hover:-translate-y-1 shadow-lg`}
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color}`} />

                <div className="space-y-6">
                  
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${service.bgAccent} border ${service.borderAccent} flex items-center justify-center ${service.accent} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {service.desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2 space-y-2.5 border-t border-slate-800/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("services.key_deliverables")}
                    </div>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom CTA Action Bar */}
                <div className="pt-8 space-y-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalServiceId(service.id);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer border border-slate-700/80 group/info"
                  >
                    <Info className="w-3.5 h-3.5 text-lime-400" />
                    <span>{t("services.learn_more")}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service.title);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-lg shadow-lime-500/20 group/btn"
                  >
                    <span>{t("services.quote_for_service")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {isSingleView && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabSelect("all");
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold text-xs transition cursor-pointer text-center"
                    >
                      {t("services.show_all")}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal Popup */}
      <ServiceModal
        serviceId={modalServiceId}
        isOpen={!!modalServiceId}
        onClose={() => setModalServiceId(null)}
        onRequestQuote={(serviceTitle) => onSelectService(serviceTitle)}
      />
    </section>
  );
};
