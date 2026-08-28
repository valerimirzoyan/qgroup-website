"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/data/LanguageContext";
import { serviceDetailsData, ServiceDetailItem } from "@/data/serviceDetails";
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Layers, 
  Sparkles,
  PhoneCall,
  Laptop,
  Server,
  FileCheck2,
  Zap,
  Briefcase
} from "lucide-react";

interface ServiceModalProps {
  serviceId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

const getServiceIcon = (id: string) => {
  switch (id) {
    case "outsourcing":
      return Laptop;
    case "infrastructure":
      return Server;
    case "cybersecurity":
      return ShieldCheck;
    case "grc":
      return FileCheck2;
    case "electrical":
      return Zap;
    default:
      return Layers;
  }
};

const getServiceGradients = (id: string) => {
  switch (id) {
    case "outsourcing":
      return {
        gradient: "from-lime-500 to-emerald-500",
        badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
        btnColor: "bg-lime-500 hover:bg-lime-400 text-slate-950 shadow-lime-500/25",
        accentText: "text-lime-400",
      };
    case "infrastructure":
      return {
        gradient: "from-emerald-500 to-teal-500",
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        btnColor: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25",
        accentText: "text-emerald-400",
      };
    case "cybersecurity":
      return {
        gradient: "from-cyan-500 to-blue-500",
        badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        btnColor: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25",
        accentText: "text-cyan-400",
      };
    case "grc":
      return {
        gradient: "from-indigo-500 to-purple-500",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
        btnColor: "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/25",
        accentText: "text-indigo-400",
      };
    case "electrical":
      return {
        gradient: "from-amber-500 to-orange-500",
        badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25",
        accentText: "text-amber-400",
      };
    default:
      return {
        gradient: "from-lime-500 to-emerald-500",
        badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
        btnColor: "bg-lime-500 hover:bg-lime-400 text-slate-950 shadow-lime-500/25",
        accentText: "text-lime-400",
      };
  }
};

export const ServiceModal: React.FC<ServiceModalProps> = ({
  serviceId,
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  const { lang, t } = useLanguage();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !serviceId) return null;

  const data: ServiceDetailItem | undefined = serviceDetailsData[serviceId];
  if (!data) return null;

  const IconComponent = getServiceIcon(serviceId);
  const styling = getServiceGradients(serviceId);

  const title = data.title[lang] || data.title.en;
  const tagline = data.tagline[lang] || data.tagline.en;
  const badge = data.badge[lang] || data.badge.en;
  const overviewList = data.overview[lang] || data.overview.en;
  const benefitsList = data.benefits[lang] || data.benefits.en;
  const industriesList = data.industries[lang] || data.industries.en;
  const serviceModelsList = data.serviceModels[lang] || data.serviceModels.en;

  const handleInquireClick = () => {
    onClose();
    onRequestQuote(title);
  };

  const labels = {
    overviewTitle: lang === "hy" ? "Ծառայության Նկարագրություն" : lang === "ru" ? "Обзор услуги" : "Service Overview",
    deliverablesTitle: lang === "hy" ? "Հիմնական Ուղղություններ և Ծավալ" : lang === "ru" ? "Ключевые направления и состав работ" : "Key Deliverables & Scope",
    benefitsTitle: lang === "hy" ? "Բիզնես Առավելություններ" : lang === "ru" ? "Преимущества для бизнеса" : "Business Benefits & ROI",
    industriesTitle: lang === "hy" ? "Ոլորտներ, Որոնց Սպասարկում ենք" : lang === "ru" ? "Отрасли и специализация" : "Industries We Serve",
    engagementTitle: lang === "hy" ? "Համագործակցության Մոդելներ" : lang === "ru" ? "Форматы сотрудничества" : "Engagement Models",
    ctaConsultation: lang === "hy" ? "Պատվիրել Խորհրդատվություն Այս Ծառայության Համար" : lang === "ru" ? "Заказать консультацию по этой услуге" : "Request Consultation for this Service",
    callImmediate: lang === "hy" ? "Արագ զանգ՝ 8123" : lang === "ru" ? "Срочный звонок: 8123" : "Fast call: 8123",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b1329] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-scale-in">
        
        {/* Top Decorative Color Accent Bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${styling.gradient}`} />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-800/80 relative">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl border ${styling.badgeBg} flex items-center justify-center`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${styling.badgeBg}`}>
              {badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium mt-1">
            {tagline}
          </p>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200">
          
          {/* Section 1: Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>{labels.overviewTitle}</span>
            </h3>
            <div className="space-y-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {overviewList.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Section 2: Key Deliverables Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-lime-400" />
              <span>{labels.deliverablesTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.deliverables.map((item, idx) => {
                const itemTitle = item.title[lang] || item.title.en;
                const itemDesc = item.desc[lang] || item.desc.en;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <div className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center text-xs shrink-0 font-bold">
                        {idx + 1}
                      </div>
                      <span>{itemTitle}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-7">
                      {itemDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Benefits & ROI */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              <span>{labels.benefitsTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {benefitsList.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Industries & Engagement Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Industries */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-lime-400" />
                <span>{labels.industriesTitle}</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {industriesList.map((ind, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement Models */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-lime-400" />
                <span>{labels.engagementTitle}</span>
              </h3>
              <div className="space-y-1.5 pt-1">
                {serviceModelsList.map((mod, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="tel:8123"
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-lime-400">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span>{labels.callImmediate}</span>
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer border border-slate-800"
            >
              {lang === "hy" ? "Փակել" : lang === "ru" ? "Закрыть" : "Close"}
            </button>

            <button
              onClick={handleInquireClick}
              className={`w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-lg group ${styling.btnColor}`}
            >
              <span>{labels.ctaConsultation}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
