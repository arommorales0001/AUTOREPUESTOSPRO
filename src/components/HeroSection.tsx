import React from 'react';
import { ShieldCheck, Truck, Wrench, Sparkles, Flame, ArrowRight, Zap, Award } from 'lucide-react';
import { Product, VehicleBrand, VehicleFilter } from '../types';
import { ProductCard } from './ProductCard';
import { VehicleSearch } from './VehicleSearch';
import { BrandRibbon3D } from './BrandRibbon3D';

interface HeroSectionProps {
  offerProducts: Product[];
  onAddToCart: (product: Product) => void;
  filter: VehicleFilter;
  onFilterChange: (newFilter: VehicleFilter) => void;
  onResetFilter: () => void;
  filteredCount: number;
  onExploreAll: () => void;
  brandCounts?: Record<string, number>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  offerProducts,
  onAddToCart,
  filter,
  onFilterChange,
  onResetFilter,
  filteredCount,
  onExploreAll,
  brandCounts = {}
}) => {
  return (
    <section id="inicio" className="relative w-full pt-8 pb-16 overflow-hidden animate-fade-in">
      
      {/* Background Hero Asset with subtle parallax overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] opacity-20 pointer-events-none rounded-3xl overflow-hidden blur-sm">
        <img 
          src="/src/assets/images/hero_automotive_parts_1793063568875.jpg" 
          alt="Taller Automotriz" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1216]/60 via-[#0F1216]/90 to-[#0F1216]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Brief & Value Proposition Header with 2-second motion reveals */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 pt-2">
          
          {/* Subtitle Badge with slide & 3D sheen */}
          <div className="animate-sheen badge-3d-stamp inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-4 shadow-xl shadow-[#0052CC]/10 animate-subtitle-slide">
            <Sparkles className="w-4 h-4 text-[#60A5FA] animate-spin [animation-duration:8s]" />
            <span className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider transition-subtitle">
              Especialistas en Repuestos Mecánicos para Perú
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Main Hero Headline with 2-second kinetic entrance & liquid shimmer */}
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight mb-4 leading-none animate-title-reveal text-shimmer-cobalt transition-title hover:tracking-wide">
            REPUESTOS MECÁNICOS CON <span className="text-[#0052CC]">PRECISIÓN DE TALLER</span>
          </h1>

          {/* Subtitle Narrative with smooth 2s reveal */}
          <p className="text-base sm:text-lg text-[#8A94A6] leading-relaxed mb-8 font-sans animate-subtitle-slide transition-subtitle text-balance max-w-2xl">
            En <strong className="text-white font-semibold">AUTOREPUESTOS PRO</strong> proveemos piezas originales y de alto rendimiento para motores, frenos, suspensión y transmisión en marcas Toyota, Nissan, Hyundai, Kia y Honda. Garantía OEM y envíos express a Lima y provincias.
          </p>

          {/* 3D Quick Value Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl animate-subtitle-slide perspective-1000">
            <div className="group card-3d-interactive preserve-3d flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#60A5FA]/60 transition-all duration-500">
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 border border-[#0052CC]/40 flex items-center justify-center shrink-0 translate-z-20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <div className="flex flex-col text-left translate-z-10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">100% Garantizados</span>
                <span className="text-[10px] text-[#8A94A6]">12 Meses OEM escrita</span>
              </div>
            </div>

            <div className="group card-3d-interactive preserve-3d flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#60A5FA]/60 transition-all duration-500">
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 border border-[#0052CC]/40 flex items-center justify-center shrink-0 translate-z-20 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <div className="flex flex-col text-left translate-z-10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Envíos Todo Perú</span>
                <span className="text-[10px] text-[#8A94A6]">Shalom · Olva · Marvisur</span>
              </div>
            </div>

            <div className="group card-3d-interactive preserve-3d flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#60A5FA]/60 transition-all duration-500">
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 border border-[#0052CC]/40 flex items-center justify-center shrink-0 translate-z-20 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <div className="flex flex-col text-left translate-z-10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Soporte Técnico</span>
                <span className="text-[10px] text-[#8A94A6]">Mecánicos certificados</span>
              </div>
            </div>
          </div>

        </div>

        {/* Integrated Vehicle Filter Box */}
        <div className="mb-8">
          <VehicleSearch 
            filter={filter}
            onChange={onFilterChange}
            onReset={onResetFilter}
            resultsCount={filteredCount}
          />
        </div>

        {/* 3D Brand Interactive Ribbon with tilt and counters */}
        <BrandRibbon3D
          selectedBrand={filter.brand}
          onSelectBrand={(brand) => onFilterChange({ ...filter, brand, model: 'Todos' })}
          brandCounts={brandCounts}
        />

        {/* 6 OFFERS BLOCK (DESTACADOS DE OFERTA) */}
        <div className="flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              {/* Subtitle with movement and 2s transition */}
              <div className="flex items-center gap-2 text-[#0052CC] font-bold text-xs uppercase tracking-widest mb-1 animate-subtitle-slide transition-subtitle">
                <Flame className="w-4 h-4 text-[#0052CC] animate-bounce" />
                <span>Promociones del Mes en Soles (S/)</span>
              </div>
              
              {/* Section Headline with 2s title reveal */}
              <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-wide animate-title-reveal transition-title hover:text-[#60A5FA]">
                6 OFERTAS DESTACADAS DEL TALLER
              </h2>
            </div>

            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-white/10 hover:bg-[#0052CC] border border-white/10 rounded-xl transition-all duration-500 self-start sm:self-auto group"
            >
              <span>Ver los 40 Repuestos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid of 6 Offers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
