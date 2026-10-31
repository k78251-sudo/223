import React, { useState } from 'react';
import { FAQS } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] bg-[#EDF5F6] px-3.5 py-1.5 rounded-lg mb-3">
            <PawIcon size={14} className="text-[#1F5C66]" />
            <span>DÚVIDAS FREQUENTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
            Perguntas Frequentes dos Tutores
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Tudo o que você precisa saber sobre a experiência de banho, tosa e agendamento no Focinho Feliz.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-colors bg-white shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#1F5C66] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#1F5C66] text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F8FAFC]/50 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Callout */}
        <div className="mt-10 bg-[#EDF5F6] border border-[#1F5C66]/20 rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-sm font-display">
              Tem alguma dúvida sobre alergias ou porte especial?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Nossa equipe fica à disposição para orientar o melhor cuidado para seu cão ou gato.
            </p>
          </div>
          <a
            href="#agendamento"
            className="px-4 py-2 text-xs font-bold text-[#143F46] bg-[#F6D55C] hover:bg-[#E5BF35] rounded-xl whitespace-nowrap shrink-0 transition-colors"
          >
            Fazer Simulação de Agendamento
          </a>
        </div>

      </div>
    </section>
  );
};
