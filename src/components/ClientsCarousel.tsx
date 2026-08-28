"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/data/LanguageContext";
import { Shield, Star } from "lucide-react";

export const ClientsCarousel: React.FC = () => {
  const { t } = useLanguage();

  const clients = [
    { 
      name: "ECCO", 
      category: "Global Footwear", 
      monoSrc: "/images/clients/ecco.png",
      colorSrc: "/images/clients/ecco-orig.png",
      alt: "ECCO Armenia IT Partner",
      url: "https://ecco.am/",
    },
    { 
      name: "Karas", 
      category: "Winery & Export", 
      monoSrc: "/images/clients/karas.png",
      colorSrc: "/images/clients/karas-orig.png",
      alt: "Karas IT Infrastructure",
      url: "https://karas.am/",
    },
    { 
      name: "Dargett", 
      category: "Craft Brewery & Hospitality", 
      monoSrc: "/images/clients/dargett.png",
      colorSrc: "/images/clients/dargett-orig.jpg",
      alt: "Dargett Craft Brewery",
      url: "https://dargett.com/",
    },
    { 
      name: "Coffee Shop Company", 
      category: "Café Chain", 
      monoSrc: "/images/clients/coffee-shop.png",
      colorSrc: "/images/clients/coffee-shop-orig.png",
      alt: "Coffee Shop Company Armenia",
      url: "https://coffeeshopcompany.am/",
    },
    { 
      name: "Rouge", 
      category: "Luxury Cosmetics", 
      monoSrc: "/images/clients/rouge.png",
      colorSrc: "/images/clients/rouge-orig.png",
      alt: "Rouge Perfumery & Cosmetics",
      url: "https://rouge.am/",
    },
    { 
      name: "Guess", 
      category: "Fashion Retail", 
      monoSrc: "/images/clients/guess.png",
      colorSrc: "/images/clients/guess-orig.jpg",
      alt: "Guess Armenia Retail IT",
      url: "https://www.guess.eu/",
    },
    { 
      name: "Syrovarnya", 
      category: "Restaurant Group", 
      monoSrc: "/images/clients/sirovarnya.png",
      colorSrc: "/images/clients/sirovarnya-orig.jpeg",
      alt: "Syrovarnya Restaurant Yerevan",
      url: "https://syrovarnya.com/",
    },
    { 
      name: "Rare Water", 
      category: "Beverage Production", 
      monoSrc: "/images/clients/rare-water.png",
      colorSrc: "/images/clients/rare-water-orig.png",
      alt: "Rare Water Armenia",
      url: "https://rare-water.com/",
    },
    { 
      name: "Cube Invest", 
      category: "Investment & Financial", 
      monoSrc: "/images/clients/cub.png",
      colorSrc: "/images/clients/cub-orig.svg",
      alt: "Cube Invest",
      url: "https://cubeinvest.am/",
    },
    { 
      name: "Parvanyan Consulting", 
      category: "Advisory & Audit", 
      monoSrc: "/images/clients/parvanyan.png",
      colorSrc: "/images/clients/parvanyan-orig.png",
      alt: "Parvanyan Consulting",
      url: "https://pconsult.am/",
    },
    { 
      name: "Yasaman", 
      category: "Hospitality & Cuisine", 
      monoSrc: "/images/clients/yasaman.png",
      colorSrc: "/images/clients/yasaman-orig.png",
      alt: "Yasaman Restaurant Yerevan",
      url: "https://yasaman.am/",
    },
    { 
      name: "Council of Europe", 
      category: "International Organization", 
      monoSrc: "/images/clients/coe.png",
      colorSrc: "/images/clients/coe-orig.svg",
      alt: "Council of Europe (COE)",
      url: "https://www.coe.int/",
    },
  ];

  // Duplicate list for infinite loop
  const marqueeList = [...clients, ...clients];

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
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-56 h-32 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-lime-500/40 p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 group backdrop-blur-sm shadow-md cursor-pointer relative"
            >
              {/* Logo Dual Container: Monochrome default with smooth cross-fade to full-color on hover */}
              <div className="relative w-36 h-14 flex items-center justify-center overflow-hidden">
                {/* 1. Monochrome / B&W resting logo */}
                <img
                  src={client.monoSrc}
                  alt={client.alt}
                  className="max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none filter drop-shadow-[0_0_1px_rgba(255,255,255,0.15)]"
                />

                {/* 2. Authentic Original Colored hover logo */}
                <img
                  src={client.colorSrc}
                  alt={client.alt}
                  className="absolute max-h-12 max-w-full object-contain opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none rounded-lg"
                />
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

    </section>
  );
};
