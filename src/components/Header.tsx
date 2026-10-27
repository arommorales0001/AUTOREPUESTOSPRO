import React from 'react';
import { ShoppingBag, User, ShieldAlert, LogOut, Home, Grid, PackageSearch, Building2, ShieldCheck } from 'lucide-react';
import { UserSubscription } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  user: UserSubscription | null;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const BLOCKS = [
  { id: 'inicio', label: 'Inicio & 6 Ofertas', icon: Home },
  { id: 'tienda', label: 'Tienda (40 Repuestos)', icon: Grid },
  { id: 'seguimiento', label: 'Seguimiento ARP', icon: PackageSearch },
  { id: 'nosotros', label: 'Nosotros', icon: Building2 },
  { id: 'garantia', label: 'Garantía & Envíos', icon: ShieldCheck },
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  onLogout,
  onOpenAdmin,
  onNavigate,
  activeSection
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F1216]/95 backdrop-blur-xl border-b border-white/10 transition-colors">
      {/* Top Bar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-2 font-['Barlow_Condensed'] text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white whitespace-nowrap shrink-0 group text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-[#0052CC] flex items-center justify-center text-white shadow-lg shadow-[#0052CC]/30 group-hover:scale-105 transition-transform">
            <span className="font-mono text-xl font-black">AP</span>
          </div>
          <span>AUTOREPUESTOS <span className="text-[#0052CC]">PRO</span></span>
        </button>

        {/* Zone 2: Desktop Block Selector Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          {BLOCKS.map((block) => {
            const Icon = block.icon;
            const isActive = activeSection === block.id;
            return (
              <button
                key={block.id}
                onClick={() => onNavigate(block.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#0052CC] text-white shadow-md shadow-[#0052CC]/40 border border-[#2563EB]'
                    : 'text-[#8A94A6] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8A94A6]'}`} />
                <span>{block.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Admin Panel Access Button (Only visible if admin or eliel email) */}
          {user && (user.role === 'admin' || user.email === 'eliel.estudioem@gmail.com') && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-500/20 border border-amber-500/40 rounded-lg hover:bg-amber-500/30 transition-all whitespace-nowrap shrink-0"
              title="Panel Administrativo"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Panel Admin</span>
            </button>
          )}

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white max-w-[120px] truncate">{user.name}</span>
                <span className="text-[10px] text-[#8A94A6] truncate">{user.whatsapp}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-[#8A94A6] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              <User className="w-4 h-4 text-[#0052CC]" />
              <span className="hidden sm:inline">Ingresar / Registro</span>
              <span className="sm:hidden">Ingresar</span>
            </button>
          )}

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-white bg-[#0052CC] hover:bg-[#2563EB] rounded-xl shadow-lg shadow-[#0052CC]/30 transition-all flex items-center justify-center shrink-0"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-[#0052CC] font-['JetBrains_Mono'] text-xs font-black rounded-full flex items-center justify-center shadow-md animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Block Navigation Bar (Horizontally scrollable block switchers) */}
      <div className="lg:hidden border-t border-white/5 bg-[#0B0E12] px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {BLOCKS.map((block) => {
          const Icon = block.icon;
          const isActive = activeSection === block.id;
          return (
            <button
              key={block.id}
              onClick={() => onNavigate(block.id)}
              className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-[#0052CC] text-white shadow-sm'
                  : 'text-[#8A94A6] bg-white/5'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{block.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
