import React from 'react';
import { Car, ChevronRight, Sparkles, Shield, Wrench } from 'lucide-react';
import { VehicleBrand } from '../types';

interface BrandRibbon3DProps {
  selectedBrand: VehicleBrand;
  onSelectBrand: (brand: VehicleBrand) => void;
  brandCounts: Record<string, number>;
}

const BRANDS_DATA: { brand: VehicleBrand; country: string; flag: string; popular: string; tagline: string }[] = [
  { brand: 'Toyota', country: 'Japón', flag: '🇯🇵', popular: 'Yaris, Corolla, Hilux, RAV4', tagline: 'Fiabilidad Extrema OEM' },
  { brand: 'Nissan', country: 'Japón', flag: '🇯🇵', popular: 'Sentra, Versa, Frontier, Tiida', tagline: 'Precisión Mecánica Japonesa' },
  { brand: 'Hyundai', country: 'Corea del Sur', flag: '🇰🇷', popular: 'Elantra, Accent, Tucson, Creta', tagline: 'Tecnología e Innovación' },
  { brand: 'Kia', country: 'Corea del Sur', flag: '🇰🇷', popular: 'Rio, Cerato, Sportage, Picanto', tagline: 'Rendimiento & Durabilidad' },
  { brand: 'Honda', country: 'Japón', flag: '🇯🇵', popular: 'Civic, CR-V, Accord, Fit', tagline: 'Motores VTEC de Alta Eficiencia' },
];

export const BrandRibbon3D: React.FC<BrandRibbon3DProps> = ({
  selectedBrand,
  onSelectBrand,
  brandCounts
}) => {
  return (
    <div className="w-full my-8">
      {/* Title & Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[#60A5FA] font-bold text-xs uppercase tracking-widest mb-1 animate-subtitle-slide">
            <Sparkles className="w-4 h-4 text-[#0052CC] animate-spin [animation-duration:8s]" />
            <span className="transition-subtitle">Especialidad por Fabricante Vehicular</span>
          </div>
          <h3 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide transition-all duration-[2000ms] hover:text-[#60A5FA]">
            LÍNEAS DE REPUESTOS HOMOLOGADOS (2000 - 2026)
          </h3>
        </div>
        <span className="text-xs text-[#8A94A6] font-mono self-start sm:self-auto bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          Haz clic en una marca para filtrar al instante
        </span>
      </div>

      {/* 3D Brand Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 perspective-1000">
        {BRANDS_DATA.map((item) => {
          const isSelected = selectedBrand === item.brand;
          const count = brandCounts[item.brand] || 0;

          return (
            <div
              key={item.brand}
              onClick={() => onSelectBrand(item.brand)}
              className={`group relative rounded-2xl p-4 sm:p-5 border cursor-pointer preserve-3d transition-all duration-500 transform hover:-translate-y-2 hover:rotate-x-3 hover:shadow-2xl ${
                isSelected
                  ? 'bg-gradient-to-b from-[#0052CC]/30 to-[#0F1216] border-[#60A5FA] shadow-xl shadow-[#0052CC]/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#0052CC]/60'
              }`}
            >
              {/* 3D Top Corner Stamped Badge */}
              <div className="flex items-center justify-between mb-3 translate-z-20">
                <span className="text-base select-none">{item.flag}</span>
                <span className="text-[10px] font-mono text-[#8A94A6] bg-[#0F1216]/80 px-2 py-0.5 rounded-md border border-white/5">
                  {item.country}
                </span>
              </div>

              {/* Brand Name with 3D Depth */}
              <div className="mb-2 translate-z-30">
                <h4 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-black uppercase text-white tracking-wide group-hover:text-[#60A5FA] transition-colors">
                  {item.brand}
                </h4>
                <p className="text-[11px] text-[#8A94A6] font-sans truncate">
                  {item.tagline}
                </p>
              </div>

              {/* Supported Models */}
              <div className="mb-4 text-[10px] text-white/60 font-mono truncate translate-z-10">
                {item.popular}
              </div>

              {/* Bottom Stock Indicator & Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between translate-z-20">
                <span className="text-xs font-bold text-white font-['JetBrains_Mono']">
                  {count} <span className="text-[10px] text-[#8A94A6] font-normal">repuestos</span>
                </span>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  isSelected ? 'bg-[#0052CC] text-white' : 'bg-white/5 text-[#8A94A6] group-hover:text-white group-hover:bg-[#0052CC]'
                }`}>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Selected indicator pill */}
              {isSelected && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#0052CC] text-white text-[9px] font-black uppercase tracking-wider rounded-full shadow-lg border border-white/20">
                  FILTRADO
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
