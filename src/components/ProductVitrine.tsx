import React, { useState } from 'react';
import { PRODUCTS, VITRINE_IMAGE } from '../data/petShopData';
import { ProductItem } from '../types';
import { PawIcon } from './PawIcon';
import { ShoppingBag, X, Check, Store } from 'lucide-react';

export const ProductVitrine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'racao' | 'brinquedos' | 'acessorios'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="vitrine" className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with image and section description */}
        <div className="rounded-3xl bg-[#FFFDF0] border border-[#F6D55C]/70 p-6 sm:p-8 lg:p-10 mb-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#143F46] bg-[#F6D55C] px-3 py-1 rounded-md mb-3">
                <Store className="w-3.5 h-3.5" />
                <span>VITRINE FÍSICA DEMONSTRATIVA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
                Rações Premium, Brinquedos e Acessórios
              </h2>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                Além do banho e tosa, nossa loja física conta com uma curadoria rigorosa de alimentos super premium, brinquedos interativos que estimulam a mente do pet e acessórios anatômicos para passeios seguros.
              </p>
              
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Disponíveis na recepção:</span>
                <span>Alimentos Naturais</span>
                <span>·</span>
                <span>Mordedores Atóxicos</span>
                <span>·</span>
                <span>Guias Anti-puxão</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-neutral-950 flex items-center justify-center">
                <img
                  src={VITRINE_IMAGE}
                  alt="Imagem meramente ilustrativa para amostra do produto"
                  className="w-full h-56 sm:h-64 object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Itens em Destaque na Loja
            </h3>
            <p className="text-xs text-slate-500">
              Produtos e valores demonstrativos disponíveis para compra presencial.
            </p>
          </div>

          <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveCategory('racao')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'racao'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rações
            </button>
            <button
              onClick={() => setActiveCategory('brinquedos')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'brinquedos'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brinquedos
            </button>
            <button
              onClick={() => setActiveCategory('acessorios')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'acessorios'
                  ? 'bg-white text-[#1F5C66] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acessórios
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-36 rounded-xl overflow-hidden bg-neutral-950 mb-3 flex items-center justify-center">
                  <img
                    src={VITRINE_IMAGE}
                    alt="Imagem meramente ilustrativa para amostra do produto"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#1F5C66] bg-[#EDF5F6] px-2 py-0.5 rounded-md">
                    {prod.volumeOrWeight}
                  </span>
                  {prod.badge && (
                    <span className="text-[11px] font-semibold text-[#143F46] bg-[#F6D55C]/70 px-2 py-0.5 rounded-md">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 font-display text-base mb-1.5 line-clamp-1">
                  {prod.name}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {prod.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Preço demonstrativo
                  </span>
                  <div className="text-xl font-bold text-[#1F5C66] tabular-nums font-display">
                    R$ {prod.price.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#1F5C66] bg-[#EDF5F6] px-2.5 py-1 rounded-md">
                {selectedProduct.volumeOrWeight}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Item Demonstrativo
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
              {selectedProduct.name}
            </h3>

            <div className="h-48 rounded-2xl overflow-hidden bg-neutral-950 mb-4 flex items-center justify-center">
              <img
                src={VITRINE_IMAGE}
                alt="Imagem meramente ilustrativa para amostra do produto"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {selectedProduct.desc}
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 mb-6 text-xs text-slate-700 leading-relaxed border border-slate-200">
              <strong className="block mb-1 text-slate-800">Especificações & Benefícios:</strong>
              {selectedProduct.details}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block">Preço estimado</span>
                <span className="text-2xl font-bold text-[#1F5C66] font-display tabular-nums">
                  R$ {selectedProduct.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 bg-[#1F5C66] text-white rounded-xl text-sm font-bold hover:bg-[#143F46] cursor-pointer"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
