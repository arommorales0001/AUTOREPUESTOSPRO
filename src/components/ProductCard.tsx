import React, { useState } from 'react';
import { ShoppingCart, Check, Tag, Info, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView && onQuickView(product)}
      className="group relative flex flex-col justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:border-[#60A5FA]/60 cursor-pointer overflow-hidden perspective-1000 preserve-3d card-3d-interactive"
    >
      {/* 3D Top Badges Bar */}
      <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none translate-z-30">
        {product.isOffer && (
          <span className="animate-sheen badge-3d-stamp px-3 py-1 text-[10px] font-black tracking-wider uppercase text-white bg-gradient-to-r from-[#0052CC] via-[#2563EB] to-[#0052CC] shadow-lg shadow-[#0052CC]/50 border border-white/30">
            ★ OFERTA
          </span>
        )}
        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#F4F5F7] bg-[#0F1216]/90 backdrop-blur-md rounded-md border border-white/15 shadow-md">
          {product.brand}
        </span>
      </div>

      {/* 3D SKU & Live Stock indicator */}
      <div className="absolute top-5 right-5 z-20 pointer-events-none translate-z-30 flex items-center gap-1.5">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono text-[#8A94A6] bg-[#0F1216]/90 px-2 py-0.5 rounded-md border border-white/10 shadow-md">
          {product.sku}
        </span>
      </div>

      {/* Product Image Container with 3D depth and parallax glow */}
      <div className="relative w-full h-48 sm:h-52 rounded-xl bg-[#0F1216] overflow-hidden mb-4 flex items-center justify-center translate-z-10 group-hover:translate-z-20 transition-transform duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1216]/60 via-transparent to-transparent z-10 pointer-events-none"></div>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse flex items-center justify-center">
            <span className="text-xs text-[#8A94A6] font-mono">Cargando repuesto...</span>
          </div>
        )}

        <img
          key={product.image}
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Fallback container if image fails */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#0F1216] -z-10">
          <ShieldCheck className="w-10 h-10 text-[#0052CC] mb-2" />
          <span className="text-xs font-bold text-white">{product.name}</span>
          <span className="text-[10px] text-[#8A94A6] mt-1">Repuesto Automotriz OEM</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Subtitle / Category with 2s transition effect */}
          <div className="flex items-center gap-2 text-xs text-[#8A94A6] mb-1.5 transition-all duration-[2000ms] group-hover:text-slate-200">
            <span className="font-semibold text-[#0052CC] group-hover:text-[#60A5FA] uppercase tracking-wider transition-colors duration-[2000ms]">{product.category}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="truncate">{product.engine}</span>
          </div>

          {/* Product Title with 2s transition effect */}
          <h3 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-[#60A5FA] group-hover:translate-x-1 transition-all duration-[2000ms] line-clamp-2">
            {product.name}
          </h3>

          {/* Compatible Vehicles Pills (clean inline unboxed metadata) */}
          <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-[#8A94A6]">
            <span className="font-semibold text-white/80">Para:</span>
            {product.compatibleModels.map((mod, idx) => (
              <span key={mod} className="after:content-[','] last:after:content-[''] after:mr-1">
                {mod}
              </span>
            ))}
            <span className="text-white/60">({product.yearStart}-{product.yearEnd})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-end justify-between gap-2 mt-2">
          
          {/* Price formatted in Soles with Calculator Monospace font */}
          <div className="flex flex-col">
            {product.isOffer && product.discountPrice ? (
              <>
                <span className="text-[11px] text-[#8A94A6] line-through font-['JetBrains_Mono']">
                  S/ {product.price.toFixed(2)}
                </span>
                <span className="font-['JetBrains_Mono'] text-xl sm:text-2xl font-black text-white tracking-tight">
                  S/ {product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-['JetBrains_Mono'] text-xl sm:text-2xl font-black text-white tracking-tight">
                S/ {product.price.toFixed(2)}
              </span>
            )}
            <span className="text-[9px] text-[#8A94A6]">Inc. IGV (Perú)</span>
          </div>

          {/* Add to Cart Button with 3D tactile press */}
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 transform active:scale-90 active:translate-y-0.5 cursor-pointer ${
              added 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-gradient-to-r from-[#0052CC] to-[#2563EB] hover:from-[#2563EB] hover:to-[#3B82F6] text-white shadow-lg shadow-[#0052CC]/40 hover:shadow-[#60A5FA]/50 hover:-translate-y-0.5'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Agregar</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
