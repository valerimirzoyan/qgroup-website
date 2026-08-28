"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/data/LanguageContext";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle, Clock } from "lucide-react";

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
  const [service, setService] = useState(defaultService || "IT Outsourcing & Helpdesk");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (defaultService) setService(defaultService);
  }, [defaultService]);

  useEffect(() => {
    if (planDetails) {
      setService(`Custom Plan (${planDetails.workstations} PCs, ${planDetails.servers} Servers)`);
    }
  }, [planDetails]);

  const handleModalClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setNotes("");
      setErrorMessage(null);
      setCountdown(5);
    }, 300);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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

  // 5-second automatic close and form reset after successful submission
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (submitted) {
      setCountdown(5);

      interval = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      timer = setTimeout(() => {
        handleModalClose();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [submitted]);

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
      _subject: `New IT Consultation Lead: ${name} (${company})`,
      _template: "table",
      _captcha: "false"
    };

    try {
      const target = atob("cS1ncm91cC1hcm1laW5hQHByb3Rvbi5tZQ==");
      const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
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
        onClick={handleModalClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-lime-500/20 border border-lime-500 text-lime-400 mx-auto flex items-center justify-center shadow-lg shadow-lime-500/20 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {t("form.success_title")}
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t("form.success_desc")}
            </p>

            {/* 5-second auto-close countdown badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-lime-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Closing in {countdown}s...</span>
            </div>

            <div className="pt-3">
              <button
                onClick={handleModalClose}
                className="px-6 py-2.5 rounded-xl bg-lime-500 text-slate-950 font-bold text-sm hover:bg-lime-400 transition cursor-pointer"
              >
                {t("form.modal_close")}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t("form.name")} <span className="text-lime-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.name_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-lime-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t("form.company")} <span className="text-lime-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t("form.company_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-lime-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t("form.phone")} <span className="text-lime-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("form.phone_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-lime-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t("form.email")} <span className="text-lime-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.email_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-lime-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t("form.service")}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-lime-500 transition cursor-pointer"
              >
                {planDetails && (
                  <option value={`Custom Plan (${planDetails.workstations} PCs, ${planDetails.servers} Servers)`}>
                    Custom Plan ({planDetails.workstations} PCs, {planDetails.servers} Servers, ~{planDetails.estimatedCost.toLocaleString()} AMD/mo)
                  </option>
                )}
                <option value="IT Outsourcing & Helpdesk">{t("services.outsourcing.title")}</option>
                <option value="IT Infrastructure & Low Current">{t("services.infra.title")}</option>
                <option value="Cybersecurity & Defense">{t("services.cyber.title")}</option>
                <option value="Governance, Risk & Compliance (GRC)">{t("services.grc.title")}</option>
                <option value="Electrical & Backup Power Systems">{t("services.electrical.title")}</option>
                <option value="Comprehensive IT Audit">{t("hero.cta_quote")}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t("form.message")}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("form.message_placeholder")}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-lime-500 transition resize-none"
              />
            </div>

            {planDetails && (
              <div className="p-3 rounded-xl bg-lime-500/10 border border-lime-500/30 text-xs text-lime-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span>Custom Plan attached</span>
                </div>
                <span className="font-bold">~{planDetails.estimatedCost.toLocaleString()} AMD/mo</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-extrabold text-sm transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{t("form.submitting")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("form.submit")}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              {t("contact.privacy_note")}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
