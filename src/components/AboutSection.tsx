import React from 'react';
import { Target, Compass, Award, Shield, Wrench, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="w-full py-20 bg-[#0F1216] relative overflow-hidden">
      
      {/* Visual Workshop Backdrop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[500px] opacity-15 pointer-events-none hidden lg:block rounded-l-3xl overflow-hidden">
        <img 
          src="/src/assets/images/workshop_banner_1793063570368.jpg" 
          alt="Taller Mecánico" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1216] via-[#0F1216]/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[#60A5FA] font-bold text-xs uppercase tracking-widest mb-2 animate-subtitle-slide">
            <Award className="w-4 h-4 text-[#0052CC] animate-gentle-float" />
            <span className="transition-subtitle">Trayectoria & Compromiso Automotriz</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-wide animate-title-reveal text-shimmer-cobalt transition-title hover:tracking-wide">
            NUESTRA HISTORIA, MISIÓN Y VISIÓN
          </h2>
        </div>

        {/* Narrative & Timeline Grid with 3D Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 perspective-1000">
          
          {/* Historia */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-6 border border-[#0052CC]/30 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <Wrench className="w-6 h-6 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white mb-3 transition-all duration-[2000ms] group-hover:text-[#60A5FA] group-hover:translate-x-1 translate-z-30">
                Nuestra Historia
              </h3>
              <p className="font-serif text-[#CBD5E1] text-sm leading-relaxed mb-4 transition-all duration-[2000ms] group-hover:text-white translate-z-10">
                Fundada por mecánicos apasionados en Lima, AUTOREPUESTOS PRO nació de la necesidad de abastecer a los talleres peruanos con piezas de motor, suspensión y frenos que cumplan con la rigurosa especificación OEM, sin sobrecostos innecesarios.
              </p>
              <p className="font-serif text-[#CBD5E1] text-sm leading-relaxed translate-z-10">
                A lo largo de los años, hemos expandido nuestra red logística para conectar los principales centros de inventario automotriz de Japón y Corea directamente con los profesionales mecánicos de todo el Perú.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A94A6] font-mono translate-z-20">
              <span className="animate-sheen badge-3d-stamp px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white font-bold">
                +15 AÑOS DE EXPERIENCIA
              </span>
              <span className="text-[#60A5FA]">Lima, Perú</span>
            </div>
          </div>

          {/* Misión */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-6 border border-[#0052CC]/30 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <Target className="w-6 h-6 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white mb-3 transition-all duration-[2000ms] group-hover:text-[#60A5FA] group-hover:translate-x-1 translate-z-30">
                Misión
              </h3>
              <p className="font-serif text-[#CBD5E1] text-sm leading-relaxed transition-all duration-[2000ms] group-hover:text-white translate-z-10">
                Garantizar que cada taller mecánico y conductor en el Perú tenga acceso inmediato a repuestos automotrices de durabilidad comprobada, con una búsqueda por vehículo rápida, asesoría técnica experta y tiempos de entrega récord que mantengan los vehículos en movimiento.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A94A6] font-mono translate-z-20">
              <span className="animate-sheen badge-3d-stamp px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white font-bold">
                NORMA OEM ESTRICTA
              </span>
              <span className="text-emerald-400">100% Certificado</span>
            </div>
          </div>

          {/* Visión */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-6 border border-[#0052CC]/30 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <Compass className="w-6 h-6 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white mb-3 transition-all duration-[2000ms] group-hover:text-[#60A5FA] group-hover:translate-x-1 translate-z-30">
                Visión
              </h3>
              <p className="font-serif text-[#CBD5E1] text-sm leading-relaxed transition-all duration-[2000ms] group-hover:text-white translate-z-10">
                Consolidarnos como la plataforma digital líder en la distribución de auto-partes de precisión en América Latina, integrando tecnología de búsqueda avanzada, catálogos en tiempo real y soporte continuo para el sector automotriz.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A94A6] font-mono translate-z-20">
              <span className="animate-sheen badge-3d-stamp px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white font-bold">
                LIDERAZGO DIGITAL B2B
              </span>
              <span className="text-cyan-400">Innovación Continua</span>
            </div>
          </div>

        </div>

        {/* 3D Key Metrics Strip with Metallic Accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 perspective-1000">
          <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-center hover:border-[#60A5FA]/60 transition-all duration-500">
            <span className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white block translate-z-20 text-shimmer-cobalt">40+</span>
            <p className="text-xs text-[#8A94A6] uppercase mt-1 font-mono tracking-wider translate-z-10">Repuestos en Stock</p>
          </div>
          <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-center hover:border-[#60A5FA]/60 transition-all duration-500">
            <span className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white block translate-z-20 text-shimmer-cobalt">24h</span>
            <p className="text-xs text-[#8A94A6] uppercase mt-1 font-mono tracking-wider translate-z-10">Despacho Lima</p>
          </div>
          <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-center hover:border-[#60A5FA]/60 transition-all duration-500">
            <span className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white block translate-z-20 text-shimmer-cobalt">100%</span>
            <p className="text-xs text-[#8A94A6] uppercase mt-1 font-mono tracking-wider translate-z-10">Garantía OEM</p>
          </div>
          <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-center hover:border-[#60A5FA]/60 transition-all duration-500">
            <span className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white block translate-z-20 text-shimmer-cobalt">24/7</span>
            <p className="text-xs text-[#8A94A6] uppercase mt-1 font-mono tracking-wider translate-z-10">Atención WhatsApp</p>
          </div>
        </div>

      </div>
    </section>
  );
};
