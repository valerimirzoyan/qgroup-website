"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ArrowUp,
  Headphones,
  Shield
} from "lucide-react";

interface FooterProps {
  onSelectServiceTab?: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectServiceTab }) => {
  const { lang, setLang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(serviceId);
    }
    const servicesElem = document.getElementById("services");
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm relative">
      
      {/* Emergency technical hotline banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-base">
                {t("footer.emergency")}
              </div>
              <div className="text-xs text-slate-400">
                {t("footer.emergency_sub")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:8123"
              className="gradient-border-btn px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-lime-500/20"
            >
              <Phone className="w-4 h-4" />
              <span>{t("nav.call_now")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl p-1 bg-slate-900 border border-lime-500/30 shadow-lg shadow-lime-500/15 flex items-center justify-center">
                <img
                  src="/images/logos/q-logo.png"
                  alt="Q Group Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-wider text-white">
                  Q GROUP
                </span>
                <span className="block text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  {t("footer.tagline")}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>

            {/* Social Icons (SVGs) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/q-group-it/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-lime-400 hover:text-lime-400 text-slate-400 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.87 0-1.57.7-1.57 1.57 0 .86.7 1.57 1.57 1.57.86 0 1.57-.71 1.57-1.57 0-.87-.71-1.57-1.57-1.57z"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/Qgrouparmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-lime-400 hover:text-lime-400 text-slate-400 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/qgrouparmenia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-lime-400 hover:text-lime-400 text-slate-400 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.home")}</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("all")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.services")}</span>
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.about")}</span>
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.clients")}</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.calculator")}</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.contact")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("footer.services_links")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleServiceClick("outsourcing")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.it_outsourcing")}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("infrastructure")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.infrastructure")}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("cybersecurity")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.cybersecurity")}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("grc")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.grc")}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick("electrical")}
                  className="hover:text-lime-400 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t("nav.electrical")}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("footer.contact_info")}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:8123" className="text-white hover:text-lime-400 font-bold block">
                    8123 (Short Code)
                  </a>
                  <span className="text-slate-500">{t("footer.incident_dispatch")}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@q-group.am" className="text-white hover:text-emerald-400 font-medium block">
                    info@q-group.am
                  </a>
                </div>
              </div>

              <a
                href="https://yandex.com/maps/-/CTHZrF08"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  {t("contact.address_val")}
                </span>
              </a>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <div className="inline-flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${lang === "en" ? "bg-lime-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("hy")}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${lang === "hy" ? "bg-lime-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  ՀԱՅ
                </button>
                <button
                  onClick={() => setLang("ru")}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${lang === "ru" ? "bg-lime-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  РУС
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} {t("footer.rights")}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">{t("footer.iso")}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-lime-400 hover:border-lime-400 transition cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
