import React, { useState } from 'react';
import { SERVICES, SERVICE_BATH_IMAGE, SERVICE_GROOMING_IMAGE } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import { PetSize } from '../types';
import { Clock, Check, CalendarCheck, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<PetSize>('small');

  return (
    <section id="servicos" className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] tracking-wide mb-2">
              <PawIcon size={14} className="text-[#1F5C66]" />
              <span>TABELA TRANSPARENTE DE CUIDADOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
              Nossos Serviços & Valores por Porte
            </h2>
            <p className="mt-2 text-slate-600 text-base leading-relaxed">
              Todos os preços são transparentes e calculados a partir do porte físico do animal. Clique em qualquer serviço para agendar diretamente.
            </p>
          </div>

          {/* Interactive Porte Filter Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 self-start md:self-auto shrink-0 border border-slate-200">
            <button
              onClick={() => setSelectedSizeFilter('small')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSizeFilter === 'small'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Porte Pequeno (até 10kg)
            </button>
            <button
              onClick={() => setSelectedSizeFilter('medium')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSizeFilter === 'medium'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Médio (10 a 25kg)
            </button>
            <button
              onClick={() => setSelectedSizeFilter('large')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSizeFilter === 'large'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grande (+25kg)
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((srv, index) => {
            const price = srv.prices[selectedSizeFilter];
            const isFeatured = srv.id === 'banho' || srv.id === 'tosa-completa';

            return (
              <div
                key={srv.id}
                className={`rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden bg-white ${
                  isFeatured
                    ? 'border-[#1F5C66]/30 shadow-md ring-1 ring-[#1F5C66]/10'
                    : 'border-slate-200/90 shadow-2xs hover:shadow-md'
                }`}
              >
                {/* Optional Service Card Header Image for marquee items */}
                {srv.image && (
                  <div className="h-44 overflow-hidden relative bg-neutral-950">
                    <img
                      src={srv.image}
                      alt="Imagem meramente ilustrativa para amostra do produto"
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#1F5C66] px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{srv.durationMinutes} min</span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {!srv.image && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1F5C66] bg-[#EDF5F6] px-2.5 py-1 rounded-md">
                          Cuidado Essencial
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {srv.durationMinutes} min
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                      {srv.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {srv.fullDesc}
                    </p>

                    {/* Includes List */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        O que está incluso:
                      </span>
                      {srv.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Book CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                        A partir de
                      </span>
                      <div className="text-2xl font-bold text-[#1F5C66] font-display tabular-nums">
                        R$ {price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectService(srv.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6D55C] hover:bg-[#E5BF35] text-[#143F46] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on prices */}
        <div className="mt-8 text-center text-xs text-slate-400">
          * Valores demonstrativos para simulação de agendamento online.
        </div>
      </div>
    </section>
  );
};
