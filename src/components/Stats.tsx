"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { Building2, Calendar, Headphones, Clock } from "lucide-react";

export const Stats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Building2,
      count: t("stats.clients_count"),
      label: t("stats.clients_label"),
      highlight: "Retail, Banking & IT",
    },
    {
      icon: Calendar,
      count: t("stats.exp_count"),
      label: t("stats.exp_label"),
      highlight: "Continuous Innovation",
    },
    {
      icon: Headphones,
      count: t("stats.support_count"),
      label: t("stats.support_label"),
      highlight: "Rapid Dispatch",
    },
    {
      icon: Clock,
      count: t("stats.sla_count"),
      label: t("stats.sla_label"),
      highlight: "Guaranteed SLA",
    },
  ];

  return (
    <section className="py-12 bg-slate-900/50 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex items-center gap-5 border border-slate-800/80 hover:border-lime-500/30 transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    {item.count}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.highlight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
