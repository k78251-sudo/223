import React from 'react';
import { PawIcon } from './PawIcon';
import { Sparkles, Thermometer, VolumeX, HeartHandshake } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Recepção Afetiva & Avaliação',
      icon: HeartHandshake,
      description:
        'Recebemos seu pet com carinho e sem gaiolas frias. Avaliamos a textura da pelagem, sensibilidade da pele e conversamos com o tutor sobre as preferências de tosa e perfume.',
    },
    {
      step: '02',
      title: 'Banho Spa & Água Térmica',
      icon: Thermometer,
      description:
        'Água morninha em temperatura controlada com shampoo e condicionador dermatológico hipoalergênico. Massagem suave que relaxa até os animaizinhos mais ansiosos.',
    },
    {
      step: '03',
      title: 'Secagem Acústica Sem Estresse',
      icon: VolumeX,
      description:
        'Utilizamos secadores e sopradores modernos com isolamento acústico e toalhas de algodão 100% esterilizadas e individuais para cada atendimento.',
    },
    {
      step: '04',
      title: 'Tosa, Estilização & Reencontro',
      icon: Sparkles,
      description:
        'Finalização com tesouras cirúrgicas ou máquina suave, corte seguro de unhas, limpeza de ouvidos e o adorno que você preferir antes da festa do reencontro.',
    },
  ];

  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-[#EDF5F6]/50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] bg-white px-3.5 py-1.5 rounded-lg mb-3 shadow-2xs border border-slate-200/80">
            <PawIcon size={14} className="text-[#1F5C66]" />
            <span>PROTOCOLO DE BEM-ESTAR ANIMAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
            Como Funciona o Nosso Atendimento
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Eliminamos qualquer motivo de medo ou desconforto. Veja as 4 etapas de carinho dedicadas ao seu bichinho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#1F5C66] font-display">
                      {item.step}.
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FFFDF0] border border-[#F6D55C] text-[#143F46] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1F5C66]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1F5C66]">
                  <PawIcon size={12} />
                  <span>Cuidado individual</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
