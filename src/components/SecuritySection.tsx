import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCw, PhoneCall, CheckCircle } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <section id="garantia" className="w-full py-16 bg-[#141820]/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0052CC]/20 text-[#60A5FA] font-bold text-xs uppercase tracking-wider mb-2 animate-subtitle-slide">
            <ShieldCheck className="w-4 h-4 text-[#0052CC] animate-gentle-float" />
            <span className="transition-subtitle">Compra Segura & Respaldo Garantizado</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide animate-title-reveal text-shimmer-cobalt transition-title hover:tracking-wide">
            GARANTÍA Y SEGURIDAD EN CADA PEDIDO
          </h2>
          <p className="text-sm text-[#8A94A6] mt-2 font-sans animate-subtitle-slide transition-subtitle">
            Construimos relaciones de confianza a largo plazo con talleres mecánicos y conductores de todo el país.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 perspective-1000">
          
          {/* Card 1 */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-4 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <ShieldCheck className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 transition-all duration-[2000ms] group-hover:text-[#60A5FA] translate-z-30">Garantía de Fábrica OEM</h3>
              <p className="text-xs text-[#8A94A6] leading-relaxed font-sans transition-all duration-[2000ms] group-hover:text-slate-200 translate-z-10">
                Todos nuestros repuestos cuentan con certificado de calidad y garantía escrita contra defectos de fabricación de hasta 12 meses o 30,000 km.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-semibold translate-z-20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verificación Técnica Pre-Despacho</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-4 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <Truck className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 transition-all duration-[2000ms] group-hover:text-[#60A5FA] translate-z-30">Envíos Protegidos en Perú</h3>
              <p className="text-xs text-[#8A94A6] leading-relaxed font-sans transition-all duration-[2000ms] group-hover:text-slate-200 translate-z-10">
                Despachamos tus repuestos embalados en empaque de protección antichoque a través de agencias líderes: Shalom, Olva Courier y Marvisur.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#0052CC] font-semibold translate-z-20">
              <div className="flex items-center gap-2 text-[#60A5FA]">
                <CheckCircle className="w-4 h-4" />
                <span>Seguimiento con Código ARP</span>
              </div>
              <span className="text-[10px] text-[#8A94A6] font-mono">Lima & Provincias</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-[#60A5FA]/60 transition-all duration-[2000ms]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 text-[#0052CC] flex items-center justify-center mb-4 transition-transform duration-[2000ms] group-hover:scale-110 translate-z-20">
                <RefreshCw className="w-5 h-5 text-[#60A5FA] animate-gentle-float" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 transition-all duration-[2000ms] group-hover:text-[#60A5FA] translate-z-30">Cambios & Devoluciones</h3>
              <p className="text-xs text-[#8A94A6] leading-relaxed font-sans transition-all duration-[2000ms] group-hover:text-slate-200 translate-z-10">
                ¿El repuesto no era la medida exacta para tu motor? Ofrecemos cambio directo sin complicaciones dentro de los primeros 7 días hábiles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-semibold translate-z-20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Soporte Inmediato por WhatsApp</span>
              </div>
              <span className="text-[10px] text-[#8A94A6] font-mono">7 Días Garantizados</span>
            </div>
          </div>

        </div>

        {/* Technical WhatsApp Consultation Banner with 3D sheen */}
        <div className="animate-sheen badge-3d-stamp bg-gradient-to-r from-[#0052CC]/30 via-[#141820] to-[#0052CC]/30 border border-[#60A5FA]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white mb-1 transition-all duration-[2000ms] hover:text-[#60A5FA]">
              ¿DUDAS SOBRE LA COMPATIBILIDAD CON TU AUTO?
            </h3>
            <p className="text-xs text-[#8A94A6] max-w-xl transition-all duration-[2000ms]">
              Consulta con nuestros asesores técnicos enviando tu número de VIN / Chasis por WhatsApp para confirmar la pieza exacta.
            </p>
          </div>
          <a
            href="https://wa.me/51987654321?text=Hola%20AUTOREPUESTOS%20PRO,%20necesito%20consultar%20compatibilidad%20de%20un%20repuesto"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-300 transform active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
