import React, { useState } from 'react';
import { PawIcon } from './PawIcon';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#1F5C66] whitespace-nowrap shrink-0 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1F5C66]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F6D55C] text-[#1F5C66] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <PawIcon size={20} className="text-[#1F5C66]" />
            </div>
            <span className="font-display font-bold text-2xl text-[#1F5C66] tracking-normal">
              Focinho Feliz
            </span>
          </a>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('#agendamento')}
              className="hover:text-[#1F5C66] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              Agendamento
            </button>
            <button
              onClick={() => handleNavClick('#servicos')}
              className="hover:text-[#1F5C66] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              Serviços & Preços
            </button>
            <button
              onClick={() => handleNavClick('#como-funciona')}
              className="hover:text-[#1F5C66] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleNavClick('#vitrine')}
              className="hover:text-[#1F5C66] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              Vitrine Pet
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="hover:text-[#1F5C66] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              Dúvidas
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBookClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#143F46] bg-[#F6D55C] hover:bg-[#E5BF35] rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#1F5C66]"
            >
              <CalendarCheck className="w-4 h-4 text-[#143F46]" />
              <span>Agendar Banho</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#1F5C66] rounded-lg focus-visible:ring-2 focus-visible:ring-[#1F5C66]"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleNavClick('#agendamento')}
              className="text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1F5C66]"
            >
              Agendamento Online
            </button>
            <button
              onClick={() => handleNavClick('#servicos')}
              className="text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1F5C66]"
            >
              Serviços & Preços
            </button>
            <button
              onClick={() => handleNavClick('#como-funciona')}
              className="text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1F5C66]"
            >
              Como Funciona o Atendimento
            </button>
            <button
              onClick={() => handleNavClick('#vitrine')}
              className="text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1F5C66]"
            >
              Vitrine de Produtos
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1F5C66]"
            >
              Perguntas Frequentes
            </button>
            <div className="pt-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#143F46] bg-[#F6D55C] hover:bg-[#E5BF35] rounded-xl shadow-xs"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Agendar Banho e Tosa Agora</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
