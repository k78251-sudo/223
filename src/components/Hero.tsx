import React from 'react';
import { HERO_IMAGE } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import { CalendarCheck, HeartHandshake, ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF5F6]/70 via-[#F8FAFC] to-[#F8FAFC] pt-10 pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle decorative paw background accents */}
      <div className="absolute top-12 left-8 text-[#1F5C66]/5 pointer-events-none rotate-12 hidden lg:block">
        <PawIcon size={120} />
      </div>
      <div className="absolute bottom-10 right-12 text-[#F6D55C]/20 pointer-events-none -rotate-12 hidden lg:block">
        <PawIcon size={140} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Friendly kicker without pill cliches */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] tracking-wide mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#F6D55C] text-[#143F46]">
                <PawIcon size={14} />
              </span>
              <span>ESTÉTICA PET DE CONFIANÇA & CUIDADO AFETIVO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.18] tracking-tight font-display text-balance mb-5">
              O carinho que seu pet merece com{' '}
              <span className="text-[#1F5C66] relative inline-block">
                banho e tosa
                <span
                  className="absolute left-0 bottom-1 w-full h-3 bg-[#F6D55C]/45 -z-10 rounded-sm"
                  aria-hidden="true"
                />
              </span>{' '}
              sem estresse.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              No Focinho Feliz, cada peludo é acolhido com paciência, água quentinha, produtos hipoalergênicos e secadores silenciosos. Escolha os serviços ideais para o porte do seu cão ou gato e agende em poucos passos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-[#143F46] bg-[#F6D55C] hover:bg-[#E5BF35] rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <CalendarCheck className="w-5 h-5 text-[#143F46]" />
                <span>Agendar banho e tosa</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#1F5C66] bg-white hover:bg-[#EDF5F6] border border-slate-200/90 rounded-2xl shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver serviços e valores</span>
              </button>
            </div>

            {/* Quiet trust credentials without pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF5F6] text-[#1F5C66] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Sem contenção brava</div>
                  <div className="text-xs text-slate-500">Manejo calmo e respeitoso</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF5F6] text-[#1F5C66] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Hipoalergênicos</div>
                  <div className="text-xs text-slate-500">Shampoos neutros e seguros</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF5F6] text-[#1F5C66] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Horário pontual</div>
                  <div className="text-xs text-slate-500">Atendimento sem longas esperas</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Demonstrative Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer soft shadow & border card */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                <img
                  src={HERO_IMAGE}
                  alt="Imagem meramente ilustrativa para amostra do produto"
                  className="w-full h-[360px] sm:h-[430px] lg:h-[480px] object-contain bg-neutral-950 transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Floating badge inside photo with clear demonstrative attribution */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F6D55C] text-[#1F5C66] flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Foto demonstrativa</div>
                      <div className="text-[11px] text-slate-500">Espaço higienizado & toalhas individuais</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1F5C66] bg-[#EDF5F6] px-2.5 py-1 rounded-lg shrink-0">
                    Ambiente Real
                  </span>
                </div>
              </div>

              {/* Decorative accent element behind the image */}
              <div
                className="absolute -top-4 -right-4 w-28 h-28 bg-[#F6D55C]/40 rounded-3xl -z-10 blur-xs"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1F5C66]/15 rounded-3xl -z-10 blur-xs"
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
