"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, Language } from "@/data/LanguageContext";
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Server, 
  Laptop, 
  FileCheck, 
  Zap,
  Globe,
  Headphones
} from "lucide-react";

interface NavbarProps {
  onOpenConsultation: (service?: string) => void;
  onSelectServiceTab?: (tabId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenConsultation, 
  onSelectServiceTab 
}) => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceItems = [
    {
      id: "outsourcing",
      titleKey: "nav.it_outsourcing",
      descKey: "services.outsourcing.tagline",
      icon: Laptop,
      href: "#services",
    },
    {
      id: "infrastructure",
      titleKey: "nav.infrastructure",
      descKey: "services.infra.tagline",
      icon: Server,
      href: "#services",
    },
    {
      id: "cybersecurity",
      titleKey: "nav.cybersecurity",
      descKey: "services.cyber.tagline",
      icon: Shield,
      href: "#services",
    },
    {
      id: "grc",
      titleKey: "nav.grc",
      descKey: "services.grc.tagline",
      icon: FileCheck,
      href: "#services",
    },
    {
      id: "electrical",
      titleKey: "nav.electrical",
      descKey: "services.electrical.tagline",
      icon: Zap,
      href: "#services",
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(serviceId);
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    
    // Smooth scroll down to the services section
    const servicesElem = document.getElementById("services");
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none border-0 ${
        isScrolled ? "glass-nav shadow-lg shadow-black/40 py-2.5" : "bg-slate-950/70 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl p-1 bg-slate-900/90 border border-lime-500/30 shadow-lg shadow-lime-500/15 flex items-center justify-center group-hover:border-lime-400 group-hover:scale-105 transition-all duration-300 shrink-0">
              <img
                src="/images/logos/q-logo.png"
                alt="Q Group Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]"
              />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-lime-400 transition-colors whitespace-nowrap">
                  Q GROUP
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse shrink-0" />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400 whitespace-nowrap">
                {t("footer.tagline")}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            <a
              href="#home"
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition whitespace-nowrap"
            >
              {t("nav.home")}
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition flex items-center gap-1 cursor-pointer whitespace-nowrap"
                onClick={() => handleServiceSelect("all")}
              >
                <span>{t("nav.services")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-lime-400" : ""}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-black/80 space-y-1">
                    
                    {/* All Solutions item */}
                    <button
                      onClick={() => handleServiceSelect("all")}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-lime-500 group-hover:text-slate-950 transition-colors shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors whitespace-nowrap">
                          {t("services.tab_all")}
                        </div>
                        <div className="text-xs text-slate-400">
                          {t("nav.all_solutions_desc")}
                        </div>
                      </div>
                    </button>

                    <div className="h-[1px] bg-slate-800 my-1" />

                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleServiceSelect(item.id)}
                          className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left cursor-pointer group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-500 group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors whitespace-nowrap">
                              {t(item.titleKey)}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1">
                              {t(item.descKey)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#about"
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition whitespace-nowrap"
            >
              {t("nav.about")}
            </a>

            <a
              href="#clients"
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition whitespace-nowrap"
            >
              {t("nav.clients")}
            </a>

            <a
              href="#calculator"
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition whitespace-nowrap"
            >
              {t("nav.calculator")}
            </a>

            <a
              href="#contact"
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition whitespace-nowrap"
            >
              {t("nav.contact")}
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold shrink-0">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === "en" ? "bg-lime-500 text-slate-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hy")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === "hy" ? "bg-lime-500 text-slate-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                ՀԱՅ
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === "ru" ? "bg-lime-500 text-slate-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                РУС
              </button>
            </div>

            {/* Direct Phone Call */}
            <a
              href="tel:8123"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs xl:text-sm font-bold transition group whitespace-nowrap shrink-0"
            >
              <div className="w-5 h-5 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-3 h-3" />
              </div>
              <span>8123</span>
            </a>

            {/* CTA button */}
            <button
              onClick={() => onOpenConsultation()}
              className="gradient-border-btn px-3.5 xl:px-5 py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-lime-500/20 whitespace-nowrap shrink-0"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{t("nav.get_quote")}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:8123"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-lime-400 flex items-center justify-center"
              aria-label="Call 8123"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile Lang switcher */}
            <button
              onClick={() => {
                const nextLang: Record<Language, Language> = { en: "hy", hy: "ru", ru: "en" };
                setLang(nextLang[lang]);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300"
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3">
          <div className="flex flex-col space-y-2">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-slate-200 font-medium hover:bg-slate-900"
            >
              {t("nav.home")}
            </a>
            
            <div className="px-3 py-2 text-xs font-semibold text-lime-400 uppercase tracking-wider flex justify-between items-center">
              <span>{t("nav.services")}</span>
              <button 
                onClick={() => handleServiceSelect("all")}
                className="text-[11px] text-slate-400 underline font-normal cursor-pointer"
              >
                {t("services.tab_all")}
              </button>
            </div>
            
            <div className="pl-3 space-y-1">
              {serviceItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleServiceSelect(item.id)}
                  className="w-full text-left block px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 cursor-pointer"
                >
                  {t(item.titleKey)}
                </button>
              ))}
            </div>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-slate-200 font-medium hover:bg-slate-900"
            >
              {t("nav.about")}
            </a>

            <a
              href="#clients"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-slate-200 font-medium hover:bg-slate-900"
            >
              {t("nav.clients")}
            </a>

            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-slate-200 font-medium hover:bg-slate-900"
            >
              {t("nav.calculator")}
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-slate-200 font-medium hover:bg-slate-900"
            >
              {t("nav.contact")}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full gradient-border-btn py-3 rounded-xl text-center font-bold text-sm cursor-pointer"
            >
              {t("nav.get_quote")}
            </button>

            <a
              href="tel:8123"
              className="w-full py-3 bg-slate-900 border border-slate-800 text-white rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-lime-400" />
              <span>{t("nav.call_now")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
