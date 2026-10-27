import React, { useState } from 'react';
import { Search, PackageCheck, Clock, Truck, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Order } from '../types';
import { getOrderByCode } from '../services/firebase';

export const OrderTracking: React.FC = () => {
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSearchedOrder(null);

    const found = await getOrderByCode(searchCode);
    setLoading(false);

    if (found) {
      setSearchedOrder(found);
    } else {
      // Demo fallback mock for instant testing if code format ARP-10420
      if (searchCode.toUpperCase().startsWith('ARP-')) {
        setSearchedOrder({
          orderCode: searchCode.toUpperCase(),
          customerName: 'Cliente Ejemplo Talleres Perú',
          customerEmail: 'cliente@ejemplo.pe',
          customerPhone: '+51 998 765 432',
          shippingAddress: 'Av. Los Próceres 450, San Martín de Porres, Lima',
          totalSoles: 574.00,
          status: 'En Camino',
          createdAt: new Date().toISOString(),
          items: [
            { productId: 'ARP-101', name: 'Kit de Pastillas Ceramic Performance', sku: 'ARP-BRK-001', price: 289.00, quantity: 1, subtotal: 289.00 },
            { productId: 'ARP-108', name: 'Filtro de Aire Alto Flujo K&N', sku: 'ARP-FLT-008', price: 285.00, quantity: 1, subtotal: 285.00 }
          ]
        });
      } else {
        setErrorMsg('No encontramos ningún pedido registrado con el código ingresado. Verifica el código (Ej: ARP-10420).');
      }
    }
  };

  const STAGES: { key: Order['status']; label: string; desc: string }[] = [
    { key: 'Registrado', label: '1. Registrado', desc: 'Pedido confirmado en sistema' },
    { key: 'En Preparación', label: '2. En Preparación', desc: 'Embalaje técnico y verificación OEM' },
    { key: 'En Camino', label: '3. En Camino', desc: 'En ruta de entrega con agencia' },
    { key: 'Entregado', label: '4. Entregado', desc: 'Recibido por el taller/cliente' }
  ];

  const getStageIndex = (status: Order['status']) => {
    switch (status) {
      case 'Registrado': return 0;
      case 'En Preparación': return 1;
      case 'En Camino': return 2;
      case 'Entregado': return 3;
      default: return 0;
    }
  };

  return (
    <section id="seguimiento" className="w-full py-16 bg-[#141820]/60 border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0052CC]/20 text-[#60A5FA] border border-[#0052CC]/30 font-bold text-xs uppercase tracking-wider mb-3 animate-subtitle-slide">
            <PackageCheck className="w-4 h-4 text-[#0052CC] animate-gentle-float" />
            <span className="transition-subtitle">Seguimiento de Pedido en Tiempo Real</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide animate-title-reveal text-shimmer-cobalt transition-title hover:tracking-wide">
            CONSULTA EL ESTADO DE TU REPUESTO
          </h2>
          <p className="text-sm text-[#8A94A6] mt-2 font-sans max-w-xl mx-auto animate-subtitle-slide transition-subtitle">
            Ingresa tu código de orden emitido al realizar la compra (Formato: <strong className="text-white font-mono">ARP-XXXXX</strong>).
          </p>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10 perspective-1000">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Ejemplo: ARP-10420 o tu código..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full bg-[#0F1216] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-[#8A94A6]/60 font-['JetBrains_Mono'] focus:outline-none focus:border-[#60A5FA] transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-[#8A94A6] absolute left-4 top-4" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 bg-gradient-to-r from-[#0052CC] to-[#2563EB] hover:from-[#2563EB] hover:to-[#3B82F6] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#0052CC]/40 transition-all duration-300 transform active:scale-95 active:translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:shadow-[#60A5FA]/50"
          >
            <PackageCheck className="w-4 h-4 animate-bounce" />
            <span>{loading ? 'Rastreando...' : 'Rastrear Pedido'}</span>
          </button>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <div className="max-w-xl mx-auto p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-xs flex items-center gap-3 mb-8 animate-fade-in shadow-xl">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 3D Order Results Card */}
        {searchedOrder && (
          <div className="perspective-1000">
            <div className="card-3d-interactive preserve-3d bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl animate-fade-in">
              
              {/* Top Order Code & Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 translate-z-20">
                <div>
                  <span className="text-xs text-[#8A94A6] uppercase tracking-wider font-semibold">Código de Seguimiento</span>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-black text-white">{searchedOrder.orderCode}</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <span className="text-xs text-[#8A94A6]">Fecha: {new Date(searchedOrder.createdAt).toLocaleDateString('es-PE')}</span>
                </div>
                <div className="animate-sheen badge-3d-stamp flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052CC]/40 to-[#0052CC]/20 border border-[#60A5FA]/40 rounded-xl text-white font-bold text-sm shadow-lg shadow-[#0052CC]/20">
                  <Clock className="w-4 h-4 text-[#60A5FA] animate-spin [animation-duration:8s]" />
                  <span>Estado: {searchedOrder.status}</span>
                </div>
              </div>

              {/* Stage Progress Timeline */}
              <div className="py-8 border-b border-white/10 translate-z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
                  {STAGES.map((stg, idx) => {
                    const currentIdx = getStageIndex(searchedOrder.status);
                    const isDone = idx <= currentIdx;
                    return (
                      <div key={stg.key} className="flex flex-col items-center text-center group/stage">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs mb-3 transition-all duration-500 transform group-hover/stage:scale-110 ${
                          isDone 
                            ? 'bg-gradient-to-br from-[#0052CC] to-[#2563EB] text-white shadow-xl shadow-[#0052CC]/50 ring-4 ring-[#0052CC]/30' 
                            : 'bg-[#0F1216] text-[#8A94A6] border border-white/10'
                        }`}>
                          {isDone ? <CheckCircle className="w-5 h-5 animate-pulse" /> : idx + 1}
                        </div>
                      <span className={`text-xs font-bold mb-1 ${isDone ? 'text-white' : 'text-[#8A94A6]'}`}>
                        {stg.label}
                      </span>
                      <span className="text-[10px] text-[#8A94A6] leading-tight max-w-[140px]">
                        {stg.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="pt-6">
              <h4 className="font-['Barlow_Condensed'] text-xl font-bold uppercase text-white mb-4">
                Detalle del Pedido & Dirección de Entrega
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customer Info */}
                <div className="bg-[#0F1216] p-4 rounded-xl border border-white/5 text-xs text-[#8A94A6] space-y-2">
                  <p><strong className="text-white">Cliente:</strong> {searchedOrder.customerName}</p>
                  <p><strong className="text-white">Correo:</strong> {searchedOrder.customerEmail}</p>
                  <p><strong className="text-white">Teléfono / WhatsApp:</strong> {searchedOrder.customerPhone}</p>
                  <p><strong className="text-white">Dirección de Envío:</strong> {searchedOrder.shippingAddress}</p>
                </div>

                {/* Items & Total */}
                <div className="bg-[#0F1216] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                    {searchedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs pb-1 border-b border-white/5 last:border-0">
                        <span className="text-white font-medium truncate max-w-[180px]">{item.quantity}x {item.name}</span>
                        <span className="font-['JetBrains_Mono'] text-[#8A94A6]">S/ {item.subtotal.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-['JetBrains_Mono'] mt-3">
                    <span className="text-xs text-[#8A94A6] uppercase">Total Soles:</span>
                    <span className="text-lg font-black text-white">S/ {searchedOrder.totalSoles.toFixed(2)}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
          </div>
        )}

      </div>
    </section>
  );
};
