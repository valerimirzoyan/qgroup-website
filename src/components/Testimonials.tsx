"use client";

import React from "react";
import { useLanguage } from "@/data/LanguageContext";
import { Quote, Star, Sparkles, Building } from "lucide-react";

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      quote: t("testimonials.q1"),
      author: t("testimonials.q1_author"),
      company: t("testimonials.q1_company"),
      stars: 5,
      industry: "Retail & Multi-Branch Chain",
    },
    {
      quote: t("testimonials.q2"),
      author: t("testimonials.q2_author"),
      company: t("testimonials.q2_company"),
      stars: 5,
      industry: "Financial & Advisory Services",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-lime-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("testimonials.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("testimonials.title")}
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative group hover:border-lime-500/30 transition duration-300"
            >
              <Quote className="w-10 h-10 text-lime-400/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.stars)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-normal">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">
                    {rev.author}
                  </div>
                  <div className="text-xs font-medium text-lime-400">
                    {rev.company}
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                  {rev.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
