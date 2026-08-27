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
      src: "/images/clients/ecco.png",
      alt: "ECCO Armenia IT Partner",
      url: "https://ecco.am/",
    },
    { 
      name: "Karas Wines", 
      category: "Winery & Export", 
      src: "/images/clients/karas.png",
      alt: "Karas Wines IT Infrastructure",
      url: "https://karaswines.com/",
    },
    { 
      name: "Dargett", 
      category: "Craft Brewery & Hospitality", 
      src: "/images/clients/dargett.jpg",
      alt: "Dargett Craft Brewery",
      url: "https://dargett.com/",
    },
    { 
      name: "Coffee Shop Company", 
      category: "Café Chain", 
      src: "/images/clients/coffee-shop.png",
      alt: "Coffee Shop Company Armenia",
      url: "https://coffeeshopcompany.am/",
    },
    { 
      name: "Rouge", 
      category: "Luxury Cosmetics", 
      src: "/images/clients/rouge.png",
      alt: "Rouge Perfumery & Cosmetics",
      url: "https://rouge.am/",
    },
    { 
      name: "Guess", 
      category: "Fashion Retail", 
      src: "/images/clients/guess.jpg",
      alt: "Guess Armenia Retail IT",
      url: "https://guess.am/",
    },
    { 
      name: "Сыроварня", 
      category: "Restaurant Group", 
      src: "/images/clients/sirovarnya.jpeg",
      alt: "Sirovarnya Restaurant Yerevan",
      url: "https://syrovarnya.com/",
    },
    { 
      name: "Rare Water", 
      category: "Beverage Production", 
      src: "/images/clients/rare-water.png",
      alt: "Rare Water Armenia",
      url: "https://rarewater.am/",
    },
    { 
      name: "CUBE", 
      category: "Architecture & Design", 
      src: "/images/clients/cub.svg",
      alt: "CUBE Architecture",
      url: "https://cub.am/",
    },
    { 
      name: "Parvanyan Consulting", 
      category: "Advisory & Audit", 
      src: "/images/clients/parvanyan.png",
      alt: "Parvanyan Consulting",
      url: "https://parvanyan.am/",
    },
    { 
      name: "Yasaman", 
      category: "Hospitality & Cuisine", 
      src: "/images/clients/yasaman.png",
      alt: "Yasaman Restaurant Yerevan",
      url: "https://yasaman.am/",
    },
    { 
      name: "Center of Excellence", 
      category: "Education & Tech", 
      src: "/images/clients/coe.svg",
      alt: "Center of Excellence (COE)",
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
              className="flex-shrink-0 w-56 h-32 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-lime-500/40 p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 group backdrop-blur-sm shadow-md cursor-pointer"
            >
              <div className="relative w-36 h-14 flex items-center justify-center">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="max-h-12 max-w-full object-contain filter grayscale invert brightness-200 contrast-125 opacity-75 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
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
