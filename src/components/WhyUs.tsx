"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  Coins, 
  Sparkles,
  ServerCrash,
  CheckCircle,
  Clock3
} from "lucide-react";

export const WhyUs: React.FC = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Zap,
      title: t("why.point1_title"),
      desc: t("why.point1_desc"),
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Clock3,
      title: t("why.point2_title"),
      desc: t("why.point2_desc"),
      color: "text-lime-400 bg-lime-500/10 border-lime-500/20",
    },
    {
      icon: Award,
      title: t("why.point3_title"),
      desc: t("why.point3_desc"),
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      icon: Coins,
      title: t("why.point4_title"),
      desc: t("why.point4_desc"),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("why.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t("why.title")}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {t("why.subtitle")}
          </p>
        </div>

        {/* 4-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition duration-300 flex flex-col sm:flex-row items-start gap-6 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${adv.color} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Banner: Traditional IT vs Q Group Dedicated Partnership */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Traditional in-house pain points */}
            <div className="space-y-4 p-6 rounded-2xl bg-red-950/20 border border-red-900/30">
              <div className="flex items-center gap-2.5 text-red-400 font-bold text-base">
                <ServerCrash className="w-5 h-5" />
                <span>{t("why.compare_single_title")}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>{t("why.compare_single_point1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>{t("why.compare_single_point2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>{t("why.compare_single_point3")}</span>
                </li>
              </ul>
            </div>

            {/* Right: The Q Group Advantage */}
            <div className="space-y-4 p-6 rounded-2xl bg-lime-950/20 border border-lime-500/30">
              <div className="flex items-center gap-2.5 text-lime-400 font-bold text-base">
                <CheckCircle className="w-5 h-5" />
                <span>{t("why.compare_qgroup_title")}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>{t("why.compare_qgroup_point1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>{t("why.compare_qgroup_point2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>{t("why.compare_qgroup_point3")}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
