import React, { useState } from 'react';
import { Download, Lock, CheckCircle2, Layers, PackageX } from 'lucide-react';
import { Product, UserSubscription, VehicleFilter } from '../types';
import { ProductCard } from './ProductCard';
import { VehicleSearch } from './VehicleSearch';
import { generateCatalogPDF } from '../utils/pdfGenerator';

interface CatalogStoreProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  user: UserSubscription | null;
  onOpenAuth: () => void;
  filter: VehicleFilter;
  onFilterChange: (newFilter: VehicleFilter) => void;
}

const CATEGORIES = ['Todas', 'Frenos', 'Motor', 'Suspensión', 'Transmisión', 'Eléctrico', 'Filtración'];

export const CatalogStore: React.FC<CatalogStoreProps> = ({
  products,
  onAddToCart,
  user,
  onOpenAuth,
  filter,
  onFilterChange
}) => {
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handlePDFDownload = () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setDownloadingPDF(true);
    setTimeout(() => {
      generateCatalogPDF(products, user);
      setDownloadingPDF(false);
    }, 600);
  };

  return (
    <section id="tienda" className="w-full py-12 bg-[#0F1216] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[#60A5FA] font-bold text-xs uppercase tracking-widest mb-1.5 animate-subtitle-slide">
              <Layers className="w-4 h-4 text-[#0052CC] animate-gentle-float" />
              <span className="transition-subtitle">Bloque de Tienda Completa</span>
            </div>
            <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide animate-title-reveal text-shimmer-cobalt transition-title hover:tracking-wide">
              CATÁLOGO DE 40 REPUESTOS AUTOMOTRICES
            </h2>
            <p className="text-sm text-[#8A94A6] mt-1 font-sans animate-subtitle-slide transition-subtitle">
              Cada producto cuenta con especificaciones de motor, compatibilidad por marca y año, y precio en Soles (S/).
            </p>
          </div>

          {/* Exclusive PDF Download Button for Subscribed Users */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 perspective-1000">
            <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-4 backdrop-blur-md shadow-xl hover:border-[#60A5FA]/60">
              <div className="flex items-center gap-2.5 translate-z-20">
                {user ? (
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Catálogo Completo PDF</span>
                  <span className="text-[10px] text-[#8A94A6]">
                    {user ? `Desbloqueado para ${user.name}` : 'Exclusivo para usuarios registrados'}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePDFDownload}
                disabled={downloadingPDF}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 transform active:scale-95 cursor-pointer translate-z-30 ${
                  user 
                    ? 'animate-sheen bg-gradient-to-r from-[#0052CC] to-[#2563EB] text-white shadow-lg shadow-[#0052CC]/40 hover:shadow-[#60A5FA]/60 hover:-translate-y-0.5' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:-translate-y-0.5'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{downloadingPDF ? 'Generando PDF...' : user ? 'Descargar Catálogo PDF' : 'Registrarse para PDF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Integrated Vehicle Filter inside Store Block */}
        <div className="mb-8">
          <VehicleSearch
            filter={filter}
            onChange={onFilterChange}
            onReset={() => onFilterChange({ brand: 'Todas', model: 'Todos', year: 'Todos', engine: 'Todas', category: 'Todas', searchQuery: '' })}
            resultsCount={products.length}
          />
        </div>

        {/* Category Pills Filter Bar with 3D tactile buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none perspective-1000">
          <span className="text-xs font-semibold text-[#8A94A6] uppercase tracking-wider whitespace-nowrap mr-2">
            Categoría:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = filter.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange({ ...filter, category: cat })}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 transform active:scale-90 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#0052CC] to-[#2563EB] text-white shadow-lg shadow-[#0052CC]/40 border border-[#60A5FA]/40 -translate-y-0.5' 
                    : 'bg-white/5 hover:bg-white/10 text-[#8A94A6] hover:text-white border border-white/5 hover:-translate-y-0.5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid with 3D perspective */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1500">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <PackageX className="w-16 h-16 text-[#8A94A6] mb-4" />
            <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white mb-2">
              No se encontraron repuestos
            </h3>
            <p className="text-sm text-[#8A94A6] max-w-md mb-6">
              No encontramos repuestos que coincidan con la búsqueda actual. Reinicia los filtros para visualizar los 40 productos disponibles.
            </p>
            <button
              onClick={() => onFilterChange({ brand: 'Todas', model: 'Todos', year: 'Todos', engine: 'Todas', category: 'Todas', searchQuery: '' })}
              className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Reiniciar Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
