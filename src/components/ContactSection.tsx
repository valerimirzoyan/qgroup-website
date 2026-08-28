"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/data/LanguageContext";
import confetti from "canvas-confetti";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Headphones,
  Calculator,
  X,
  Layers,
  Server,
  Monitor,
  AlertCircle
} from "lucide-react";

interface PlanDetails {
  workstations: number;
  servers: number;
  locations: number;
  security: string;
  schedule: string;
  estimatedCost: number;
}

interface ContactSectionProps {
  initialService?: string;
  selectedPlan?: PlanDetails | null;
  onClearPlan?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialService, 
  selectedPlan,
  onClearPlan
}) => {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(initialService || "IT Outsourcing & Helpdesk");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (selectedPlan) {
      setService(`Custom Plan (${selectedPlan.workstations} PCs, ${selectedPlan.servers} Servers)`);
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name,
      company,
      email,
      phone,
      service,
      message: message || "No additional message",
      calculatorPlan: selectedPlan
        ? `${selectedPlan.workstations} Workstations, ${selectedPlan.servers} Servers, ${selectedPlan.locations} Site(s), ${selectedPlan.security} Security, ${selectedPlan.schedule} Hours (~${selectedPlan.estimatedCost.toLocaleString()} AMD/mo)`
        : "None",
      _subject: `New IT Consultation Lead: ${name} (${company})`,
      _template: "table",
      _captcha: "false"
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/info@q-group.am", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (data.success === "false" && !data.message?.includes("Activation")) {
        throw new Error(data.message || "Failed to deliver request. Please call 8123.");
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#84cc16", "#10b981", "#38bdf8"],
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred. Please try again or call 8123.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
      
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-lime-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("contact.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t("contact.title")}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Direct Phone */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Headphones className="w-5 h-5 text-lime-400" />
                <span>{t("contact.hq_title")}</span>
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:8123"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-lime-500/40 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{t("contact.phone_label")}</div>
                    <div className="text-base font-extrabold text-white group-hover:text-lime-400 transition-colors">
                      8123 (Short Code)
                    </div>
                    <div className="text-xs text-slate-400">{t("contact.phone_sub")}</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@q-group.am"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-lime-500/40 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{t("contact.email_label")}</div>
                    <div className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      info@q-group.am
                    </div>
                    <div className="text-xs text-slate-400">{t("contact.email_sub")}</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{t("contact.address_label")}</div>
                    <div className="text-sm font-bold text-white">
                      {t("contact.address_val")}
                    </div>
                    <div className="text-xs text-slate-400">{t("contact.address_sub")}</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{t("contact.hours_label")}</div>
                    <div className="text-sm font-bold text-white">
                      {t("contact.hours_val")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Audit Guarantee */}
              <div className="p-4 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                <span>{t("contact.nda_notice")}</span>
              </div>

            </div>

          </div>

          {/* Right: Consultation Request Form */}
          <div className="lg:col-span-7">
            
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl space-y-6">
              
              {/* If a calculator plan was selected, show highlighted banner */}
              {selectedPlan && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-lime-500/15 via-emerald-500/10 to-transparent border border-lime-500/40 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider">
                      <Calculator className="w-4 h-4" />
                      <span>{t("contact.attached_plan")}</span>
                    </div>
                    {onClearPlan && (
                      <button
                        type="button"
                        onClick={onClearPlan}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 p-1 rounded hover:bg-slate-800 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>{t("contact.remove_plan")}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-2xl font-black text-white">
                      ~{selectedPlan.estimatedCost.toLocaleString()} <span className="text-sm font-bold text-lime-400">{t("calc.amd")}</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {selectedPlan.schedule === "247" ? t("calc.hours_247") : t("calc.hours_business")}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <Monitor className="w-3 h-3 text-lime-400" />
                      {selectedPlan.workstations} {t("calc.breakdown_endpoints")}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <Server className="w-3 h-3 text-emerald-400" />
                      {selectedPlan.servers} {t("calc.servers_unit")}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {selectedPlan.locations} {t("calc.breakdown_sites")}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 uppercase">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" />
                      {selectedPlan.security} {t("calc.breakdown_protection")}
                    </span>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-lime-500/20 border border-lime-500 text-lime-400 mx-auto flex items-center justify-center shadow-2xl shadow-lime-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t("form.success_title")}
                  </h3>
                  
                  <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    {t("form.success_desc")}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition"
                    >
                      {t("contact.send_another")}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {t("contact.form_title")}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {t("contact.form_subtitle")}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {t("form.name")} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("form.name_placeholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-400 transition"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {t("form.company")} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t("form.company_placeholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {t("form.email")} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("form.email_placeholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-400 transition"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {t("form.phone")} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("form.phone_placeholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-400 transition"
                      />
                    </div>
                  </div>

                  {/* Service selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {t("form.service")}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-lime-400 transition cursor-pointer"
                    >
                      {selectedPlan && (
                        <option value={`Custom Plan (${selectedPlan.workstations} PCs, ${selectedPlan.servers} Servers)`}>
                          Custom Plan ({selectedPlan.workstations} PCs, ${selectedPlan.servers} Servers, ~{selectedPlan.estimatedCost.toLocaleString()} AMD/mo)
                        </option>
                      )}
                      <option value="IT Outsourcing & Helpdesk">{t("services.outsourcing.title")}</option>
                      <option value="IT Infrastructure & Low Current">{t("services.infra.title")}</option>
                      <option value="Cybersecurity & Defense">{t("services.cyber.title")}</option>
                      <option value="Governance, Risk & Compliance (GRC)">{t("services.grc.title")}</option>
                      <option value="Electrical & Power Reliability">{t("services.electrical.title")}</option>
                      <option value="Comprehensive IT Audit">{t("hero.cta_quote")}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("form.message_placeholder")}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-400 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-border-btn py-4 rounded-xl text-center font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-lime-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>{t("form.submitting")}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t("form.submit")}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-slate-500">
                    {t("contact.privacy_note")}
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
