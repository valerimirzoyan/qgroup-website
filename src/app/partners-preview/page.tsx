"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/data/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUs } from "@/components/WhyUs";
import { CostCalculator } from "@/components/CostCalculator";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import { PartnersSection } from "@/components/PartnersSection";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/ConsultationModal";
import { AnimatedFavicon } from "@/components/AnimatedFavicon";
import { Eye, ArrowLeft } from "lucide-react";

function PartnersPreviewContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>("all");
  const [calculatorPlan, setCalculatorPlan] = useState<{
    workstations: number;
    servers: number;
    locations: number;
    security: string;
    schedule: string;
    estimatedCost: number;
  } | null>(null);

  const handleOpenConsultation = (service?: string) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleSelectServiceTab = (tabId: string) => {
    setSelectedServiceTab(tabId);
  };

  const handlePlanSelected = (plan: {
    workstations: number;
    servers: number;
    locations: number;
    security: string;
    schedule: string;
    estimatedCost: number;
  }) => {
    setCalculatorPlan(plan);
    setSelectedService(`Custom Plan (${plan.workstations} PCs, ${plan.servers} Servers)`);
    
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-lime-500 selection:text-slate-950">
      <AnimatedFavicon />

      {/* Floating Version Indicator & Quick Switcher */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 border border-lime-500/50 text-white text-xs font-bold shadow-2xl shadow-lime-500/20 backdrop-blur-lg hover:bg-lime-500 hover:text-slate-950 transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-lime-400 group-hover:text-slate-950 transition-colors" />
          <span>Switch to Previous Version (No Partners)</span>
        </a>
      </div>

      {/* Navigation */}
      <Navbar 
        onOpenConsultation={() => handleOpenConsultation()} 
        onSelectServiceTab={handleSelectServiceTab}
      />

      {/* Main Page Sections with Partners Section Included */}
      <main className="flex-grow">
        <Hero onOpenConsultation={() => handleOpenConsultation()} />
        <Stats />
        <ServicesSection 
          onSelectService={(s) => handleOpenConsultation(s)} 
          activeTab={selectedServiceTab}
          onTabChange={handleSelectServiceTab}
        />
        <WhyUs />
        <CostCalculator onPlanSelected={handlePlanSelected} />
        <ClientsCarousel />
        
        {/* Partners Section */}
        <PartnersSection />
        
        <Testimonials />
        <ContactSection 
          initialService={selectedService}
          selectedPlan={calculatorPlan}
          onClearPlan={() => setCalculatorPlan(null)}
        />
      </main>

      {/* Footer */}
      <Footer onSelectServiceTab={handleSelectServiceTab} />

      {/* Interactive Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
        planDetails={calculatorPlan}
      />
    </div>
  );
}

export default function PartnersPreviewPage() {
  return (
    <LanguageProvider>
      <PartnersPreviewContent />
    </LanguageProvider>
  );
}
