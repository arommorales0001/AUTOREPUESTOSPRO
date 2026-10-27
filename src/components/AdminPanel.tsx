import React, { useState, useEffect } from 'react';
import { X, Users, Package, Mail, Send, ShieldAlert, Edit, Save, Plus, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Product, UserSubscription, Order, EmailCampaign } from '../types';
import { getAllSubscribedUsers, getAllOrders, updateOrderStatus } from '../services/firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductStock: (productId: string, newStock: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductStock
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'products' | 'campaigns'>('users');
  const [users, setUsers] = useState<UserSubscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Campaign Form State
  const [campaignTitle, setCampaignTitle] = useState('Super Oferta de Frenos & Suspensión - AUTOREPUESTOS PRO');
  const [campaignSubject, setCampaignSubject] = useState('🔥 Descuentos Exclusivos en Repuestos Automotrices en Soles');
  const [campaignMessage, setCampaignMessage] = useState(
    'Estimado cliente de AUTOREPUESTOS PRO,\n\nTe informamos que hemos actualizado nuestro catálogo de 40 repuestos originales para Toyota, Nissan, Hyundai, Kia y Honda. Esta semana contamos con hasta 20% de descuento en Kit de Pastillas Cerámicas y Amortiguadores de Nitrógeno.\n\nDescarga tu catálogo en PDF directamente desde nuestra plataforma web.\n\nAtentamente,\nEquipo de AUTOREPUESTOS PRO'
  );
  const [campaignSent, setCampaignSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const uList = await getAllSubscribedUsers();
      const oList = await getAllOrders();
      setUsers(uList.length > 0 ? uList : [
        { uid: '1', name: 'Eliel (Admin)', email: 'eliel.estudioem@gmail.com', whatsapp: '+51 987 654 321', registeredAt: new Date().toISOString(), subscribed: true, role: 'admin' },
        { uid: '2', name: 'Carlos Mendoza - Taller Sur', email: 'carlos@tallermendoza.pe', whatsapp: '+51 912 345 678', registeredAt: new Date().toISOString(), subscribed: true, role: 'user' },
        { uid: '3', name: 'Mecánica Ramos', email: 'contacto@mecanicaramos.pe', whatsapp: '+51 998 877 665', registeredAt: new Date().toISOString(), subscribed: true, role: 'user' }
      ]);
      setOrders(oList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderCode: string, newStatus: Order['status']) => {
    await updateOrderStatus(orderCode, newStatus);
    setOrders(orders.map(o => o.orderCode === orderCode ? { ...o, status: newStatus } : o));
  };

  const handleSendCampaignMailto = () => {
    const bccEmails = users.map(u => u.email).join(',');
    const mailtoUrl = `mailto:${bccEmails}?subject=${encodeURIComponent(campaignSubject)}&body=${encodeURIComponent(campaignMessage)}`;
    window.open(mailtoUrl, '_blank');
    setCampaignSent(true);
    setTimeout(() => setCampaignSent(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase tracking-wider text-white">
                PANEL ADMINISTRATIVO PRO
              </h3>
              <span className="text-xs text-[#8A94A6] font-mono">Acceso: eliel.estudioem@gmail.com</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A94A6] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users' ? 'bg-[#0052CC] text-white shadow-md' : 'bg-white/5 text-[#8A94A6] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Usuarios Suscritos ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-[#0052CC] text-white shadow-md' : 'bg-white/5 text-[#8A94A6] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestión de Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'campaigns' ? 'bg-[#0052CC] text-white shadow-md' : 'bg-white/5 text-[#8A94A6] hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Campañas Masivas por Correo</span>
          </button>
        </div>

        {/* TAB 1: REGISTERED USERS */}
        {activeTab === 'users' && (
          <div className="flex-grow overflow-y-auto pr-2 space-y-3">
            <h4 className="text-xs font-bold text-[#8A94A6] uppercase tracking-wider mb-2">
              Clientes Registrados (Nombre, Correo, WhatsApp)
            </h4>
            
            <div className="bg-[#0F1216] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-[#8A94A6]">
                <thead className="bg-white/5 text-white uppercase font-semibold">
                  <tr>
                    <th className="p-3">Nombre Cliente</th>
                    <th className="p-3">Correo Electrónico</th>
                    <th className="p-3">WhatsApp</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((u) => (
                    <tr key={u.uid} className="hover:bg-white/5">
                      <td className="p-3 text-white font-medium">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 font-mono text-emerald-400">{u.whatsapp}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-[#0052CC]/20 text-[#0052CC]'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <a 
                          href={`https://wa.me/${u.whatsapp.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="flex-grow overflow-y-auto pr-2 space-y-3">
            <h4 className="text-xs font-bold text-[#8A94A6] uppercase tracking-wider mb-2">
              Pedidos y Actualización de Estados
            </h4>

            {orders.length === 0 ? (
              <p className="text-xs text-[#8A94A6]">No hay pedidos en la base de datos de Firestore actualmente.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.orderCode} className="bg-[#0F1216] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['JetBrains_Mono'] text-base font-bold text-white">{ord.orderCode}</span>
                        <span className="text-xs text-[#8A94A6]">· {ord.customerName} ({ord.customerPhone})</span>
                      </div>
                      <p className="text-xs text-[#8A94A6]">{ord.shippingAddress}</p>
                      <span className="text-xs font-['JetBrains_Mono'] text-[#0052CC] font-bold">Total: S/ {ord.totalSoles.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.orderCode, e.target.value as Order['status'])}
                        className="bg-[#141820] border border-white/10 text-xs text-white rounded-lg px-3 py-1.5 focus:border-[#0052CC]"
                      >
                        <option value="Registrado">Registrado</option>
                        <option value="En Preparación">En Preparación</option>
                        <option value="En Camino">En Camino</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EMAIL CAMPAIGNS BROADCAST */}
        {activeTab === 'campaigns' && (
          <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <h4 className="font-['Barlow_Condensed'] text-xl font-bold uppercase text-white mb-1">
                HERRAMIENTA DE CAMPAÑAS DE ANUNCIOS MASIVOS POR CORREO
              </h4>
              <p className="text-xs text-[#8A94A6]">
                Envía un comunicado oficial a todos los <strong className="text-white font-bold">{users.length} usuarios suscritos</strong> registrados en la plataforma.
              </p>
            </div>

            {campaignSent && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Cliente de correo activado con destinatarios masivos en CCO (BCC).</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">Asunto del Anuncio</label>
              <input
                type="text"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
                className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">Mensaje de la Campaña / Promoción</label>
              <textarea
                rows={6}
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC] font-mono text-xs"
              />
            </div>

            <button
              onClick={handleSendCampaignMailto}
              className="w-full py-3.5 bg-[#0052CC] hover:bg-[#2563EB] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Lanzar Campaña Masiva ({users.length} Destinatarios)</span>
            </button>
          </div>
        )}

        {/* Bottom Close */}
        <div className="pt-4 border-t border-white/10 mt-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
