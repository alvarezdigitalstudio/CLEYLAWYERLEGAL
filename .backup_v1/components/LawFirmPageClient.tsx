'use client';

import { useState } from 'react';
import { AboutSection } from './AboutSection';
import { BlogSection } from './BlogSection';
import { ConsultationModal } from './ConsultationModal';
import { ContactSection } from './ContactSection';
import { CtaBanner } from './CtaBanner';
import { HeroSection } from './HeroSection';
import { PracticeAreasSection } from './PracticeAreasSection';
import { ServicesSection } from './ServicesSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { ValuesStrip } from './ValuesStrip';

export function LawFirmPageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>(
    'Asesoría Legal',
  );

  const openConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    setModalOpen(true);
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      openConsultation();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <SiteHeader onOpenConsultation={() => openConsultation('Asesoría Legal')} />

      <main className="flex-1">
        <HeroSection onContactClick={scrollToContact} />
        <ServicesSection onSelectService={(title) => openConsultation(title)} />
        <AboutSection onScheduleClick={() => openConsultation('Asesoría Legal')} />
        <ValuesStrip />
        <PracticeAreasSection onSelectArea={(title) => openConsultation(title)} />
        <TestimonialsCarousel />
        <BlogSection onScheduleFromArticle={(topic) => openConsultation(topic)} />
        <CtaBanner onScheduleClick={() => openConsultation('Asesoría Legal')} />
        <ContactSection />
      </main>

      <SiteFooter />

      <ConsultationModal
        isOpen={modalOpen}
        preselectedService={preselectedService}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
