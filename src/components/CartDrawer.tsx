import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem, Order, UserSubscription } from '../types';
import { createOrder } from '../services/firebase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  user: UserSubscription | null;
  onOrderCreated: (orderCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  onOrderCreated
}) => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.whatsapp || '');

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [createdOrderCode, setCreatedOrderCode] = useState('');

  if (!isOpen) return null;

  const totalSoles = cartItems.reduce((sum, item) => {
    const itemPrice = item.product.isOffer && item.product.discountPrice 
      ? item.product.discountPrice 
      : item.product.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);

    const generatedCode = `ARP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      orderCode: generatedCode,
      customerName: customerName || user?.name || 'Cliente Perú',
      customerEmail: customerEmail || user?.email || 'ventas@autorepuestospro.pe',
      customerPhone: customerPhone || user?.whatsapp || '+51 987 654 321',
      shippingAddress: shippingAddress || 'Retiro en almacén principal',
      totalSoles: totalSoles,
      status: 'Registrado',
      createdAt: new Date().toISOString(),
      items: cartItems.map((item) => {
        const p = item.product.isOffer && item.product.discountPrice ? item.product.discountPrice : item.product.price;
        return {
          productId: item.product.id,
          name: item.product.name,
          sku: item.product.sku,
          price: p,
          quantity: item.quantity,
          subtotal: p * item.quantity
        };
      })
    };

    try {
      await createOrder(newOrder);
    } catch (err) {
      console.error(err);
    }

    setCreatedOrderCode(generatedCode);
    setLoading(false);
    onClearCart();
    onOrderCreated(generatedCode);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#141820] border-l border-white/10 h-full flex flex-col justify-between p-6 shadow-2xl text-white overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 font-['Barlow_Condensed'] text-2xl font-bold uppercase">
              <ShoppingBag className="w-6 h-6 text-[#0052CC]" />
              <span>Carrito de Compras ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#8A94A6] hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SUCCESS STEP */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase text-white mb-2">
                ¡PEDIDO REGISTRADO EXITOSAMENTE!
              </h3>
              <p className="text-xs text-[#8A94A6] mb-6 font-sans">
                Tu orden ha sido registrada en el sistema. Puedes consultar el estado en tiempo real con tu código:
              </p>

              <div className="bg-[#0F1216] border border-white/10 rounded-2xl p-4 w-full mb-6 font-['JetBrains_Mono']">
                <span className="text-xs text-[#8A94A6] block uppercase">Código de Seguimiento</span>
                <span className="text-2xl font-black text-white">{createdOrderCode}</span>
              </div>

              <button
                onClick={() => { setStep('cart'); onClose(); }}
                className="w-full py-3 bg-[#0052CC] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl transition-all"
              >
                Volver a la Tienda
              </button>
            </div>
          )}

          {/* CART ITEMS STEP */}
          {step === 'cart' && (
            <>
              {cartItems.length > 0 ? (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const price = item.product.isOffer && item.product.discountPrice 
                      ? item.product.discountPrice 
                      : item.product.price;
                    return (
                      <div key={item.product.id} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-14 h-14 rounded-lg object-cover bg-[#0F1216] shrink-0"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-[#8A94A6] block font-mono">SKU: {item.product.sku}</span>
                          <span className="text-xs font-['JetBrains_Mono'] text-white font-bold">
                            S/ {price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-[#0F1216] px-2 py-1 rounded-lg border border-white/10 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="text-[#8A94A6] hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="text-[#8A94A6] hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center text-[#8A94A6]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-white">Tu carrito está vacío</p>
                  <p className="text-xs mt-1">Agrega repuestos desde la tienda para continuar.</p>
                </div>
              )}
            </>
          )}

          {/* CHECKOUT STEP */}
          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <h4 className="font-['Barlow_Condensed'] text-xl font-bold uppercase text-white mb-2">
                Datos de Envío & Confirmación
              </h4>

              <div>
                <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="cliente@ejemplo.pe"
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">WhatsApp de Contacto</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+51 987 654 321"
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">Dirección de Entrega / Provincia</label>
                <textarea
                  required
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Av. Principal 123, Distrito / Agencia Shalom/Olva..."
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0052CC]"
                />
              </div>
            </form>
          )}

        </div>

        {/* Footer Subtotal & Action */}
        {cartItems.length > 0 && step !== 'success' && (
          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="flex items-center justify-between font-['JetBrains_Mono'] mb-4">
              <span className="text-xs text-[#8A94A6] uppercase">Total Estimado Soles:</span>
              <span className="text-2xl font-black text-white">S/ {totalSoles.toFixed(2)}</span>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#0052CC] hover:bg-[#2563EB] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#0052CC]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Ir al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  disabled={loading}
                  className="w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Generando Pedido...' : 'Confirmar Pedido'}</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
