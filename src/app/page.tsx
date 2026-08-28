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
import { OpeningAnimation } from "@/components/OpeningAnimation";

function MainContent() {
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

  // When a specific service is clicked from Header Dropdown or Footer
  const handleSelectServiceTab = (tabId: string) => {
    setSelectedServiceTab(tabId);
  };

  // Option 2 Flow: Smoothly scroll to the Contact section with the calculated plan attached
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
    
    // Smooth scroll down to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-lime-500 selection:text-slate-950">
      {/* Real-time Dynamic Animated Tab Icon */}
      <AnimatedFavicon />

      {/* Opening Intro Sequence */}
      <OpeningAnimation />

      {/* Navigation */}
      <Navbar 
        onOpenConsultation={() => handleOpenConsultation()} 
        onSelectServiceTab={handleSelectServiceTab}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        <Hero onOpenConsultation={() => handleOpenConsultation()} />
        <Stats />
        <ServicesSection 
          onSelectService={(s) => handleOpenConsultation(s)} 
          activeTab={selectedServiceTab}
          onTabChange={handleSelectServiceTab}
        />
        <WhyUs />
        {/* Cost Calculator Section (Hidden on request - code preserved for future reactivation) */}
        {/* <CostCalculator onPlanSelected={handlePlanSelected} /> */}
        <ClientsCarousel />
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

      {/* Interactive Modal (for navbar / hero consultation triggers) */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
        planDetails={calculatorPlan}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
