import React from 'react';
import { TESTIMONIALS } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] bg-[#EDF5F6] px-3.5 py-1.5 rounded-lg mb-3">
            <PawIcon size={14} className="text-[#1F5C66]" />
            <span>DEPOIMENTOS DEMONSTRATIVOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
            Tutores Felizes, Pets Tranquilos
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Veja a experiência fictícia de clientes que confiam a rotina de higiene de seus cães e gatos ao Focinho Feliz.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <div>
                {/* Identification badge explicitly identifying fictional nature */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    Depoimento Fictício
                  </span>
                </div>

                {/* Service Tag */}
                <div className="text-xs font-bold text-[#1F5C66] mb-3">
                  {test.serviceUsed}
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDF5F6] text-[#1F5C66] font-display font-bold flex items-center justify-center text-sm shrink-0">
                  {test.tutorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {test.tutorName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tutor(a) de {test.petName} ({test.petBreed})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          * Os depoimentos acima são fictícios e ilustram a rotina de acolhimento e satisfação dos tutores com nossos serviços.
        </div>
      </div>
    </section>
  );
};
