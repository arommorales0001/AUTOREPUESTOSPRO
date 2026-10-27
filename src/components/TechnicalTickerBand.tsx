import React from 'react';
import { Truck, ShieldCheck, Wrench, CheckCircle2, Zap, Clock, Award, Sparkles } from 'lucide-react';

interface TechnicalTickerBandProps {
  onSelectFeature?: (feature: string) => void;
}

export const TechnicalTickerBand: React.FC<TechnicalTickerBandProps> = ({ onSelectFeature }) => {
  const TICKER_ITEMS = [
    {
      icon: Zap,
      label: 'ENVÍOS EXPRESS A TODO EL PERÚ',
      detail: 'Shalom · Olva Courier · Marvisur (Lima 24h / Provincias 48h)',
      color: 'text-[#60A5FA]'
    },
    {
      icon: ShieldCheck,
      label: 'GARANTÍA OEM CERTIFICADA 12 MESES',
      detail: 'Reemplazo directo o cobertura de hasta 30,000 km',
      color: 'text-emerald-400'
    },
    {
      icon: Wrench,
      label: 'COMPATIBILIDAD 100% POR CHASIS / VIN',
      detail: 'Asesoría técnica inmediata para mecánicos y talleres',
      color: 'text-cyan-400'
    },
    {
      icon: Award,
      label: 'CALIDAD JIS & ISO 9001 PROBADA',
      detail: 'Materiales grado automotriz para alta exigencia',
      color: 'text-amber-400'
    },
    {
      icon: Clock,
      label: 'INVENTARIO EN TIEMPO REAL',
      detail: '40 repuestos precargados con stock garantizado en Soles (S/)',
      color: 'text-[#60A5FA]'
    },
    {
      icon: CheckCircle2,
      label: 'FACTURACIÓN ELECTRÓNICA & B2B',
      detail: 'Precios transparentes con IGV incluido para empresas y talleres',
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="w-full bg-[#0B1F3A]/90 border-y border-[#0052CC]/30 py-2.5 overflow-hidden relative shadow-2xl backdrop-blur-md select-none group">
      {/* Background carbon texture overlay */}
      <div className="absolute inset-0 bg-carbon-stripes opacity-40 pointer-events-none"></div>
      
      {/* Lateral gradient masks for seamless fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0F1216] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0F1216] to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track (Repeated twice for seamless infinite loop) */}
      <div className="animate-marquee flex items-center gap-8">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              onClick={() => onSelectFeature && onSelectFeature(item.label)}
              className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#60A5FA]/60 hover:bg-[#0052CC]/20 transition-all duration-300 cursor-pointer group/item transform hover:scale-105"
            >
              <div className="w-6 h-6 rounded-lg bg-[#0052CC]/30 flex items-center justify-center shrink-0 border border-[#0052CC]/40 group-hover/item:animate-spin [animation-duration:4s]">
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Barlow_Condensed'] text-xs font-bold uppercase tracking-wider text-white group-hover/item:text-[#60A5FA] transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#8A94A6] font-mono leading-none">
                  {item.detail}
                </span>
              </div>
              <span className="text-white/20 ml-2 font-mono text-xs">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
