import React, { useEffect, useState } from 'react';
import { Cog, ShieldCheck, Wrench } from 'lucide-react';

interface InitialLoaderProps {
  onFinish: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Inicializando catálogo de repuestos...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        if (prev === 25) setStatusText('Verificando compatibilidad vehicular (2000 - 2026)...');
        if (prev === 60) setStatusText('Cargando compresión de imágenes y liquid glass UI...');
        if (prev === 85) setStatusText('Sincronizando inventario en tiempo real...');
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1216] text-white select-none transition-opacity duration-700">
      {/* Background Liquid Glow */}
      <div className="absolute w-96 h-96 bg-[#0052CC]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Mechanical Gears */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-[#141820] border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center">
            <Cog className="w-12 h-12 text-[#0052CC] animate-spin [animation-duration:6s]" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shadow-lg animate-bounce">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        {/* Title with 2s transition */}
        <h1 className="font-['Barlow_Condensed'] text-4xl font-extrabold uppercase tracking-wider text-white mb-2 transition-all duration-[2000ms]">
          AUTOREPUESTOS <span className="text-[#0052CC]">PRO</span>
        </h1>

        <p className="text-sm text-[#8A94A6] mb-8 font-sans transition-all duration-[2000ms]">
          Tienda Especializada en Repuestos Automotrices de Alta Durabilidad
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#141820] rounded-full h-3 border border-white/10 p-0.5 overflow-hidden mb-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-[#0052CC] to-[#2563EB] h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage & Status */}
        <div className="flex items-center justify-between w-full text-xs text-[#8A94A6] font-['JetBrains_Mono']">
          <span className="truncate pr-2">{statusText}</span>
          <span className="font-bold text-white">{progress}%</span>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#0052CC]" />
          <span>Calidad OEM Garantizada en Perú</span>
        </div>
      </div>
    </div>
  );
};
