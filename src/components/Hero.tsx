"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Server, 
  Clock, 
  Headphones, 
  CheckCircle2, 
  Cpu, 
  Activity, 
  Lock
} from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden hero-glow">
      {/* Background Tech Grid and Glow Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-lime-500/30 shadow-lg shadow-lime-500/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-lime-400">
                {t("hero.badge")}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] break-words">
              {t("hero.title_part1")}{" "}
              <span className="text-gradient inline-block">
                {t("hero.title_gradient")}
              </span>{" "}
              {t("hero.title_part2")}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t("hero.subtitle")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto gradient-border-btn px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-lime-500/25 group"
              >
                <span>{t("hero.cta_quote")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-base flex items-center justify-center gap-2.5 transition backdrop-blur-md hover:border-slate-600 shadow-md"
              >
                <Server className="w-5 h-5 text-lime-400" />
                <span>{t("nav.services")}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Tech Command Center Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Glassmorphic Dashboard Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none animate-float">
              
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-lime-500/30 to-emerald-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl overflow-hidden space-y-5">
                
                {/* Header of the status card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{t("hero.noc_title")}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <div className="text-xs text-slate-400">{t("hero.noc_location")}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {t("hero.noc_live")}
                  </span>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{t("hero.noc_sla_label")}</span>
                      <Activity className="w-3.5 h-3.5 text-lime-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">99.98%</div>
                    <div className="text-[11px] text-lime-400 font-medium mt-0.5">{t("hero.noc_sla_sub")}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{t("hero.noc_response_label")}</span>
                      <Clock className="w-3.5 h-3.5 text-lime-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">11.4 min</div>
                    <div className="text-[11px] text-lime-400 font-medium mt-0.5">{t("hero.noc_response_sub")}</div>
                  </div>
                </div>

                {/* Active Services Status Indicators */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t("hero.noc_status_title")}
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-200 font-medium">{t("hero.noc_status_cyber")}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">{t("hero.noc_status_secured")}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Server className="w-4 h-4 text-lime-400" />
                      <span className="text-slate-200 font-medium">{t("hero.noc_status_servers")}</span>
                    </div>
                    <span className="text-lime-400 font-bold">{t("hero.noc_status_optimal")}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-sky-400" />
                      <span className="text-slate-200 font-medium">{t("hero.noc_status_backup")}</span>
                    </div>
                    <span className="text-sky-400 font-bold">{t("hero.noc_status_synced")}</span>
                  </div>
                </div>

                {/* Emergency Contact Quick Strip */}
                <div className="pt-2">
                  <a
                    href="tel:8123"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-lime-500/10 via-emerald-500/10 to-transparent border border-lime-500/30 flex items-center justify-between group hover:border-lime-500/60 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-bold">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">{t("hero.noc_emergency_label")}</div>
                        <div className="text-sm font-extrabold text-white">{t("hero.noc_emergency_call")}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
