import React from 'react';
import { STORE_INFO } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#143F46] text-white pt-14 pb-10 border-t border-[#1F5C66]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#F6D55C] text-[#143F46] flex items-center justify-center">
                <PawIcon size={20} />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                Focinho Feliz
              </span>
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6">
              Pet shop e centro de estética animal dedicado ao bem-estar e acolhimento calmo de cães e gatos. Banho, tosa e amor em cada detalhe.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-[#F6D55C] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Aviso de Transparência</span>
              </div>
              {STORE_INFO.legalNotice}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-base text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <button
                  onClick={() => onNavClick('#agendamento')}
                  className="hover:text-[#F6D55C] transition-colors cursor-pointer"
                >
                  Agendamento Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#servicos')}
                  className="hover:text-[#F6D55C] transition-colors cursor-pointer"
                >
                  Serviços & Preços por Porte
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#como-funciona')}
                  className="hover:text-[#F6D55C] transition-colors cursor-pointer"
                >
                  Como Funciona o Atendimento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#vitrine')}
                  className="hover:text-[#F6D55C] transition-colors cursor-pointer"
                >
                  Vitrine de Produtos Físicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#faq')}
                  className="hover:text-[#F6D55C] transition-colors cursor-pointer"
                >
                  Perguntas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Placeholders for Contact & Hours */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-base text-white mb-4">
              Localização & Contato
            </h4>

            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F6D55C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{STORE_INFO.address}</span>
                  <span className="text-white/50 text-[11px]">{STORE_INFO.addressDisclaimer}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F6D55C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{STORE_INFO.phoneDisplay}</span>
                  <span className="text-white/50 text-[11px]">{STORE_INFO.phoneDisclaimer}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F6D55C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{STORE_INFO.email}</span>
                  <span className="text-white/50 text-[11px]">(E-mail de demonstração)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-[#F6D55C] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Horários de Atendimento:</span>
                  <span>{STORE_INFO.hoursWeekday}</span>
                  <br />
                  <span>{STORE_INFO.hoursSaturday}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Focinho Feliz Pet Shop · Projeto Fictício de Demonstração</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <span className="font-semibold text-[#F6D55C] tracking-wide text-sm sm:text-xs">
              Site desenvolvido por Nova
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <div className="flex items-center gap-1.5 text-white/60">
              <span>Desenvolvido com carinho para pets e tutores</span>
              <PawIcon size={14} className="text-[#F6D55C]" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
