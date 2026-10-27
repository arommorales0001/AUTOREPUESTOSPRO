import React from 'react';
import { Search, Car, Calendar, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { VehicleBrand, VehicleFilter } from '../types';

interface VehicleSearchProps {
  filter: VehicleFilter;
  onChange: (newFilter: VehicleFilter) => void;
  onReset: () => void;
  resultsCount: number;
}

const BRANDS: VehicleBrand[] = ['Todas', 'Toyota', 'Nissan', 'Hyundai', 'Kia', 'Honda'];
const YEARS: (number | 'Todos')[] = ['Todos', ...Array.from({ length: 27 }, (_, i) => 2026 - i)];
const CATEGORIES = ['Todas', 'Frenos', 'Motor', 'Suspensión', 'Transmisión', 'Eléctrico', 'Filtración'];

const MODEL_OPTIONS: Record<string, string[]> = {
  Toyota: ['Todos', 'Yaris', 'Corolla', 'Hilux', 'RAV4', 'Etios', 'Fortuner', 'Prado'],
  Nissan: ['Todos', 'Sentra', 'Versa', 'Frontier', 'Kicks', 'X-Trail', 'Tiida', 'March'],
  Hyundai: ['Todos', 'Elantra', 'Accent', 'Tucson', 'Santa Fe', 'i10', 'Creta', 'H1'],
  Kia: ['Todos', 'Rio', 'Cerato', 'Sportage', 'Sorento', 'Picanto', 'Soul'],
  Honda: ['Todos', 'Civic', 'CR-V', 'Accord', 'Fit', 'HR-V']
};

export const VehicleSearch: React.FC<VehicleSearchProps> = ({
  filter,
  onChange,
  onReset,
  resultsCount
}) => {
  const availableModels = filter.brand !== 'Todas' && MODEL_OPTIONS[filter.brand]
    ? MODEL_OPTIONS[filter.brand]
    : ['Todos'];

  return (
    <div className="w-full bg-[#141820]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
      {/* Subtle top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0052CC] to-transparent"></div>

      <div className="flex flex-col gap-4">
        {/* Header & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-[#0052CC] animate-gentle-float" />
            <h3 className="font-['Barlow_Condensed'] text-xl font-bold uppercase tracking-wide text-white transition-all duration-[2000ms] hover:text-[#60A5FA]">
              Buscador Técnico por Vehículo & Año
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A94A6] font-['JetBrains_Mono'] transition-all duration-[2000ms]">
              Repuestos encontrados: <strong className="text-white font-bold transition-all duration-[2000ms]">{resultsCount}</strong>
            </span>
            {(filter.brand !== 'Todas' || filter.year !== 'Todos' || filter.category !== 'Todas' || filter.searchQuery !== '') && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-[#8A94A6] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* 1. Marca */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider">Marca Vehículo</label>
            <select
              value={filter.brand}
              onChange={(e) => onChange({ ...filter, brand: e.target.value as VehicleBrand, model: 'Todos' })}
              className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b} className="bg-[#0F1216] text-white">
                  {b === 'Todas' ? 'Todas las Marcas' : b}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Modelo */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider">Modelo Auto</label>
            <select
              value={filter.model}
              onChange={(e) => onChange({ ...filter, model: e.target.value })}
              className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
              disabled={filter.brand === 'Todas'}
            >
              {availableModels.map((m) => (
                <option key={m} value={m} className="bg-[#0F1216] text-white">
                  {m === 'Todos' ? 'Todos los Modelos' : m}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Año (2000 - 2026) */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider">Año de Fabricación</label>
            <select
              value={filter.year}
              onChange={(e) => onChange({ ...filter, year: e.target.value === 'Todos' ? 'Todos' : Number(e.target.value) })}
              className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
            >
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-[#0F1216] text-white">
                  {y === 'Todos' ? 'Todos los Años (2000-2026)' : `Año ${y}`}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Categoría de Repuesto */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider">Sistema / Categoría</label>
            <select
              value={filter.category}
              onChange={(e) => onChange({ ...filter, category: e.target.value })}
              className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#0F1216] text-white">
                  {c === 'Todas' ? 'Todas las Categorías' : c}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Búsqueda por Nombre / SKU */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider">Palabra Clave / SKU</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej: Pastillas, ARP-BRK..."
                value={filter.searchQuery}
                onChange={(e) => onChange({ ...filter, searchQuery: e.target.value })}
                className="w-full bg-[#0F1216] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-[#8A94A6]/60 focus:outline-none focus:border-[#0052CC] transition-colors"
              />
              <Search className="w-4 h-4 text-[#8A94A6] absolute left-3 top-2.5" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
