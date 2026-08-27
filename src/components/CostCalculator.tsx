"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/data/LanguageContext";
import { 
  Calculator, 
  Monitor, 
  Server, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Info,
  CheckCircle2
} from "lucide-react";

interface CostCalculatorProps {
  onPlanSelected: (details: {
    workstations: number;
    servers: number;
    locations: number;
    security: string;
    schedule: string;
    estimatedCost: number;
  }) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onPlanSelected }) => {
  const { t } = useLanguage();

  const [workstations, setWorkstations] = useState<number>(15);
  const [servers, setServers] = useState<number>(2);
  const [locations, setLocations] = useState<number>(1);
  const [securityTier, setSecurityTier] = useState<"standard" | "advanced" | "enterprise">("advanced");
  const [schedule, setSchedule] = useState<"business" | "247">("business");

  // Cost formula based on market rates in Armenia (AMD)
  const estimatedCost = useMemo(() => {
    // Base per workstation: ~8,000 AMD
    const pcCost = workstations * 8000;
    // Base per server: ~25,000 AMD
    const serverCost = servers * 25000;
    // Location overhead
    const locationCost = (locations - 1) * 35000;
    
    // Security tier multipliers
    let securityMultiplier = 1.0;
    if (securityTier === "advanced") securityMultiplier = 1.25;
    if (securityTier === "enterprise") securityMultiplier = 1.6;

    // 24/7 multiplier
    let scheduleMultiplier = schedule === "247" ? 1.35 : 1.0;

    const rawTotal = (pcCost + serverCost + locationCost) * securityMultiplier * scheduleMultiplier;
    // Round to nearest 5,000 AMD
    return Math.max(60000, Math.round(rawTotal / 5000) * 5000);
  }, [workstations, servers, locations, securityTier, schedule]);

  const handleProceed = () => {
    onPlanSelected({
      workstations,
      servers,
      locations,
      security: securityTier,
      schedule,
      estimatedCost,
    });
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-lime-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("calc.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t("calc.title")}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {t("calc.subtitle")}
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl space-y-8 border border-slate-800">
            
            {/* Slider 1: Workstations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-lime-400" />
                  <span>{t("calc.workstations")}</span>
                </label>
                <span className="px-3.5 py-1 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 font-extrabold text-base">
                  {workstations} {workstations === 1 ? t("calc.devices_unit_single") : t("calc.devices_unit")}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={workstations}
                onChange={(e) => setWorkstations(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>5 {t("calc.devices_unit")}</span>
                <span>50</span>
                <span>100</span>
                <span>150+ {t("calc.devices_unit")}</span>
              </div>
            </div>

            {/* Slider 2: Servers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span>{t("calc.servers")}</span>
                </label>
                <span className="px-3.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-base">
                  {servers} {servers === 1 ? t("calc.servers_unit_single") : t("calc.servers_unit")}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={servers}
                onChange={(e) => setServers(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>{t("calc.servers_cloud_only")}</span>
                <span>5 {t("calc.servers_unit")}</span>
                <span>10 {t("calc.servers_unit")}</span>
                <span>15+ {t("calc.servers_unit")}</span>
              </div>
            </div>

            {/* Slider 3: Office Locations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{t("calc.locations")}</span>
                </label>
                <span className="px-3.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-base">
                  {locations} {locations === 1 ? t("calc.branches_unit_single") : t("calc.branches_unit")}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={locations}
                onChange={(e) => setLocations(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>{t("calc.main_office")}</span>
                <span>3 {t("calc.branches_unit")}</span>
                <span>5 {t("calc.branches_unit")}</span>
                <span>10+ {t("calc.locations")}</span>
              </div>
            </div>

            {/* Radio 1: Security Tier */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{t("calc.security_level")}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSecurityTier("standard")}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    securityTier === "standard"
                      ? "bg-slate-800 border-lime-400 text-white ring-1 ring-lime-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-sm text-white">{t("calc.sec_standard_title")}</div>
                  <div className="text-xs text-slate-400 mt-1">{t("calc.sec_standard_desc")}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSecurityTier("advanced")}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer relative ${
                    securityTier === "advanced"
                      ? "bg-slate-800 border-lime-400 text-white ring-1 ring-lime-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-lime-500 text-slate-950 font-bold text-[9px] uppercase">
                    {t("calc.rec_badge")}
                  </span>
                  <div className="font-bold text-sm text-white">{t("calc.sec_advanced_title")}</div>
                  <div className="text-xs text-slate-400 mt-1">{t("calc.sec_advanced_desc")}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSecurityTier("enterprise")}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    securityTier === "enterprise"
                      ? "bg-slate-800 border-lime-400 text-white ring-1 ring-lime-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-sm text-white">{t("calc.sec_enterprise_title")}</div>
                  <div className="text-xs text-slate-400 mt-1">{t("calc.sec_enterprise_desc")}</div>
                </button>
              </div>
            </div>

            {/* Radio 2: Support Schedule */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{t("calc.support_hours")}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSchedule("business")}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    schedule === "business"
                      ? "bg-slate-800 border-lime-400 text-white ring-1 ring-lime-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-sm text-white">{t("calc.hours_business")}</div>
                  <div className="text-xs text-slate-400 mt-1">{t("calc.hours_business_desc")}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSchedule("247")}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    schedule === "247"
                      ? "bg-slate-800 border-lime-400 text-white ring-1 ring-lime-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{t("calc.hours_247")}</span>
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{t("calc.hours_247_desc")}</div>
                </button>
              </div>
            </div>

          </div>

          {/* Result Card (Right Column) */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-700/80 bg-slate-900/90 shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t("calc.summary_title")}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-lime-500/10 text-lime-400 border border-lime-500/20">
                {t("calc.sla_guarantee")}
              </span>
            </div>

            {/* Estimated Price Display */}
            <div className="text-center py-4 bg-slate-950/70 rounded-2xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t("calc.estimated_monthly")}
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
                {estimatedCost.toLocaleString()} <span className="text-xl font-bold text-lime-400">AMD</span>
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">
                {t("calc.amd")}
              </div>
            </div>

            {/* Plan Breakdown Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{t("calc.breakdown_workstations")}</span>
                <span className="font-bold text-white">{workstations} {t("calc.breakdown_endpoints")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{t("calc.breakdown_servers")}</span>
                <span className="font-bold text-white">{servers} {t("calc.breakdown_dedicated")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{t("calc.breakdown_locations")}</span>
                <span className="font-bold text-white">{locations} {t("calc.breakdown_sites")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{t("calc.breakdown_security")}</span>
                <span className="font-bold text-lime-400 capitalize">{securityTier} {t("calc.breakdown_protection")}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{t("calc.breakdown_sla")}</span>
                <span className="font-bold text-white">{schedule === "247" ? t("calc.breakdown_247_sla") : t("calc.breakdown_biz_sla")}</span>
              </div>
            </div>

            {/* Perks included */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{t("calc.perk1")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{t("calc.perk2")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{t("calc.perk3")}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleProceed}
              className="w-full gradient-border-btn py-4 rounded-xl text-center font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-lime-500/20 group"
            >
              <span>{t("calc.cta")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Footnote */}
            <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{t("calc.note")}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
