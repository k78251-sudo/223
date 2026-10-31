import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingWizard } from './components/BookingWizard';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { ProductVitrine } from './components/ProductVitrine';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PawIcon } from './components/PawIcon';
import { CalendarCheck } from 'lucide-react';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('banho');

  const scrollToBooking = () => {
    const el = document.getElementById('agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromSection = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToBooking();
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-[#F6D55C]/40 selection:text-[#1F5C66] overflow-x-hidden">
      
      {/* Top Bar Contract compliant Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={scrollToBooking}
          onExploreServices={() => handleNavClick('#servicos')}
        />

        {/* Central Visual Booking Assistant (The highlighted core feature of the site) */}
        <BookingWizard
          initialServiceId={selectedServiceId}
          onServiceChosen={scrollToBooking}
        />

        {/* Detailed Services & Size-based Pricing */}
        <ServicesSection onSelectService={handleSelectServiceFromSection} />

        {/* How It Works Compassionate Process */}
        <HowItWorks />

        {/* Products Showcase (Food, Toys, Accessories) */}
        <ProductVitrine />

        {/* Testimonials (Fictional with clear badges) */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer with Placeholders and Demonstrative Legal Notice */}
      <Footer onNavClick={handleNavClick} />

      {/* Floating Quick Booking Button for Mobile & Tablet viewports */}
      <div className="sm:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={scrollToBooking}
          className="flex items-center gap-2 bg-[#1F5C66] hover:bg-[#143F46] text-[#F6D55C] font-bold text-xs px-4 py-3 rounded-full shadow-lg border border-[#F6D55C]/40 active:scale-95 transition-transform"
          aria-label="Ir para agendamento"
        >
          <PawIcon size={16} />
          <span>Agendar Agora</span>
        </button>
      </div>

    </div>
  );
}
