/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Preloader } from './components/Preloader.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { StatsSection } from './components/StatsSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { ProcessTimeline } from './components/ProcessTimeline.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';

export default function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('Growth Flagship (₹8,999)');

  const handleOpenEnquiry = (planOrService?: string) => {
    if (planOrService) {
      setSelectedPlanForModal(planOrService);
    }
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Elegant Preloader Screen */}
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* 21. Desktop-Only Subtle Custom Glowing Cursor Effect */}
      <CustomCursor />

      {/* 13 & 15. Navbar with Scroll Progress Bar & Glassmorphic Effect */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Content Sections */}
      <main>
        {/* 2, 3, 4, 19, 20. Hero Section with Cinematic Reveal, Parallax & Background */}
        <HeroSection
          isReady={isPreloaderDone}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 10. Animated Statistics Section (count-up once) */}
        <StatsSection />

        {/* 5, 8, 9, 18. Services Section with 3D Tilt Cards & Hover Icon Animations */}
        <ServicesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 5, 9, 12. Selected Portfolio Deployments with Hover Zoom & View Details */}
        <PortfolioSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 17. 4-Step Process Timeline Animation (Discuss, Design, Develop, Launch) */}
        <ProcessTimeline />

        {/* 5, 9, 11. Transparent Pricing Plans with Growth "MOST POPULAR" Highlight */}
        <PricingSection onOpenEnquiry={handleOpenEnquiry} />

        {/* About Section: Proven Client Testimonials & Interactive FAQs */}
        <AboutSection />

        {/* Contact Section: Lead Discovery & Direct WhatsApp Integration */}
        <ContactSection onOpenModal={() => handleOpenEnquiry()} />
      </main>

      {/* Quiet Production Footer */}
      <Footer />

      {/* 14. Floating WhatsApp CTA with Glow, Pulse Ring & Tooltip */}
      <FloatingWhatsApp />

      {/* 23. Premium Enquiry Modal with Scale + Fade Animations */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        initialPlan={selectedPlanForModal}
      />
    </div>
  );
}

