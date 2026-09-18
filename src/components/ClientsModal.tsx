"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/data/LanguageContext";
import { X, Loader2, AlertCircle } from "lucide-react";
import { Client } from "@/lib/content-types";

interface ClientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientsModal: React.FC<ClientsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/content/clients")
      .then((res) => (res.ok ? res.json() : []))
      .then((list: Client[]) => {
        if (mounted && Array.isArray(list)) setClients(list);
      })
      .catch(() => {
        if (mounted) setError("Failed to load customers.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-700/80 p-4 sm:p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-4 sm:mb-5 text-center sm:text-left">
          <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
            {t("clients.modal_title")}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium leading-relaxed">
            {t("clients.modal_subtitle")}
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 custom-scroll">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          ) : clients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-sm text-slate-500">
              {t("clients.modal_empty")}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-1">
              {clients.map((client, idx) => (
                <a
                  key={client.id || idx}
                  href={client.url || undefined}
                  target={client.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center text-center rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-lime-500/40 p-4 sm:p-5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 backdrop-blur-sm shadow-md cursor-pointer"
                >
                  {/* Colored Logo */}
                  <div className="w-full h-14 sm:h-16 bg-white/95 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={client.colorSrc || client.monoSrc}
                      alt={client.alt || client.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-10 max-w-[120px] object-contain pointer-events-none"
                    />
                  </div>

                  <span className="text-[11px] font-semibold text-slate-300 group-hover:text-lime-400 transition-colors line-clamp-1 mt-2.5">
                    {client.name}
                  </span>
                  {client.category && (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors line-clamp-1 mt-0.5">
                      {client.category}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};