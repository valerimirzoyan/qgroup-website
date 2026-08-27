"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/data/LanguageContext";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  planDetails?: {
    workstations: number;
    servers: number;
    locations: number;
    security: string;
    schedule: string;
    estimatedCost: number;
  } | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  planDetails,
}) => {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService || "IT Outsourcing");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultService) setService(defaultService);
  }, [defaultService]);

  if (!isOpen) return null;

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
      notes: notes || "No additional notes",
      calculatorPlan: planDetails
        ? `${planDetails.workstations} Workstations, ${planDetails.servers} Servers, ${planDetails.locations} Site(s), ${planDetails.security} Security, ${planDetails.schedule} Hours (~${planDetails.estimatedCost.toLocaleString()} AMD/mo)`
        : "None",
      _subject: `New Quick Consultation Lead: ${name} (${company})`,
      _template: "table",
      _captcha: "false"
    };

    try {
      // 1. Try local route first if running locally
      let res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          service,
          message: notes,
          planDetails,
        }),
      }).catch(() => null);

      // 2. If static hosting, forward directly to info@q-group.am
      if (!res || !res.ok) {
        res = await fetch("https://formsubmit.co/ajax/info@q-group.am", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-lime-500/20 border border-lime-500 text-lime-400 mx-auto flex items-center justify-center shadow-lg shadow-lime-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {t("form.success_title")}
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t("form.success_desc")}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-lime-500 text-slate-950 font-bold text-sm hover:bg-lime-400 transition cursor-pointer"
              >
                {t("form.modal_close")}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-[11px] font-bold text-lime-400 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{t("contact.email_sub")}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {t("form.modal_title")}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t("form.modal_desc")}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* If plan details exist from calculator, show summary box */}
            {planDetails && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-lime-400 flex justify-between">
                  <span>{t("contact.attached_plan")}:</span>
                  <span>~{planDetails.estimatedCost.toLocaleString()} {t("calc.amd")}</span>
                </div>
                <div className="text-slate-400">
                  {planDetails.workstations} {t("calc.breakdown_endpoints")} • {planDetails.servers} {t("calc.servers_unit")} • {planDetails.locations} {t("calc.breakdown_sites")} • {planDetails.security.toUpperCase()}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("form.name")} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.name_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("form.company")} *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t("form.company_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("form.email")} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.email_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("form.phone")} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("form.phone_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("form.service")}</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400 cursor-pointer"
              >
                <option value="IT Outsourcing & Helpdesk">{t("services.outsourcing.title")}</option>
                <option value="IT Infrastructure & Low Current">{t("services.infra.title")}</option>
                <option value="Cybersecurity & Defense">{t("services.cyber.title")}</option>
                <option value="Governance, Risk & Compliance (GRC)">{t("services.grc.title")}</option>
                <option value="Electrical & Power Systems">{t("services.electrical.title")}</option>
                <option value="Free Full Infrastructure Audit">{t("hero.cta_quote")}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("form.modal_notes")}</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("form.modal_notes_placeholder")}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-border-btn py-3.5 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t("form.submitting")}</span>
              ) : (
                <>
                  <span>{t("form.submit")}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>{t("contact.nda_notice")}</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
