"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/data/LanguageContext";
import { Shield, Star, Users } from "lucide-react";
import { Client, DEFAULT_CLIENTS } from "@/lib/content-types";
import { ClientsModal } from "@/components/ClientsModal";

export const ClientsCarousel: React.FC = () => {
  const { t } = useLanguage();

  const [allClients, setAllClients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [clientsModalOpen, setClientsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/content/clients")
      .then((res) => (res.ok ? res.json() : null))
      .then((list: Client[] | null) => {
        if (mounted && Array.isArray(list)) setAllClients(list);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Homepage carousel only shows clients that provide BOTH a monochrome and a
  // full-color logo. Color-only clients appear solely in the "View all" popup.
  const carouselClients = allClients.filter((c) => c.monoSrc && c.colorSrc);

  // Duplicate list for infinite loop
  const marqueeList = [...carouselClients, ...carouselClients];

  return (
    <section id="clients" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>{t("clients.badge")}</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          {t("clients.title")}
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
          {t("clients.subtitle")}
        </p>
      </div>

      {/* Infinite Horizontal Carousel Strip */}
      <div className="relative w-full overflow-hidden py-6">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6">
          {marqueeList.map((client, idx) => (
            <a
              key={idx}
              href={client.url || undefined}
              target={client.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex-shrink-0 w-56 h-32 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-lime-500/40 p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 group backdrop-blur-sm shadow-md cursor-pointer relative"
            >
              {/* Logo Dual Container: Monochrome default with smooth cross-fade to full-color on hover */}
              <div className="relative w-36 h-14 flex items-center justify-center overflow-hidden">
                {/* 1. Monochrome / B&W resting logo */}
                <img
                  src={client.monoSrc as string}
                  alt={client.alt || client.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none filter drop-shadow-[0_0_1px_rgba(255,255,255,0.15)]"
                />

                {/* 2. Authentic Original Colored hover logo */}
                {client.colorSrc && (
                  <img
                    src={client.colorSrc}
                    alt={client.alt || client.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute max-h-12 max-w-full object-contain opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none rounded-lg"
                  />
                )}
              </div>

              <span className="text-[11px] font-semibold text-slate-400 mt-2 tracking-wider group-hover:text-lime-400 transition-colors line-clamp-1">
                {client.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Trust Quote Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-lime-400 font-bold">
            <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
            <span>{t("clients.satisfaction")}</span>
          </div>
          <div className="text-slate-400">
            {t("clients.sectors")}
          </div>
        </div>
      </div>

      {/* View All Customers Trigger */}
      <div className="flex justify-center mt-10 px-4">
        <button
          type="button"
          onClick={() => setClientsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-5 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-lime-500/20 transition-all duration-300 hover:shadow-lime-500/40 cursor-pointer"
        >
          <Users className="w-4 h-4" />
          {t("clients.view_all")}
        </button>
      </div>

      {/* All Customers Popup */}
      {clientsModalOpen && (
        <ClientsModal isOpen onClose={() => setClientsModalOpen(false)} />
      )}

    </section>
  );
};
