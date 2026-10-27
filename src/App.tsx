import React, { useState, useEffect, useMemo } from 'react';
import { InitialLoader } from './components/InitialLoader';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogStore } from './components/CatalogStore';
import { OrderTracking } from './components/OrderTracking';
import { AboutSection } from './components/AboutSection';
import { SecuritySection } from './components/SecuritySection';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, VehicleFilter, CartItem, UserSubscription } from './types';
import { auth, onAuthStateChanged, getUserProfile, testFirestoreConnection } from './services/firebase';
import { TechnicalTickerBand } from './components/TechnicalTickerBand';

export default function App() {
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [user, setUser] = useState<UserSubscription | null>(null);

  // Products State (40 parts)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Active Block / View (inicio | tienda | seguimiento | nosotros | garantia)
  const [activeSection, setActiveSection] = useState('inicio');

  // Notification Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Vehicle Search Filter State
  const [filter, setFilter] = useState<VehicleFilter>({
    brand: 'Todas',
    model: 'Todos',
    year: 'Todos',
    engine: 'Todas',
    category: 'Todas',
    searchQuery: ''
  });

  // Test Firestore Connection on mount
  useEffect(() => {
    testFirestoreConnection();

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const profile = await getUserProfile(fbUser.uid);
        if (profile) {
          setUser(profile);
        } else {
          setUser({
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Cliente',
            email: fbUser.email || '',
            whatsapp: '+51 987 654 321',
            registeredAt: new Date().toISOString(),
            subscribed: true,
            role: fbUser.email === 'eliel.estudioem@gmail.com' ? 'admin' : 'user'
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filtered Products Logic across 40 parts
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Marca
      if (filter.brand !== 'Todas' && prod.brand !== filter.brand) {
        return false;
      }
      // 2. Modelo
      if (filter.model !== 'Todos') {
        const matchModel = prod.compatibleModels.some(m => m.toLowerCase().includes(filter.model.toLowerCase()));
        if (!matchModel) return false;
      }
      // 3. Año
      if (filter.year !== 'Todos') {
        const targetYear = Number(filter.year);
        if (targetYear < prod.yearStart || targetYear > prod.yearEnd) {
          return false;
        }
      }
      // 4. Categoría
      if (filter.category !== 'Todas' && prod.category !== filter.category) {
        return false;
      }
      // 5. Query
      if (filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchSKU = prod.sku.toLowerCase().includes(q);
        const matchCategory = prod.category.toLowerCase().includes(q);
        const matchEngine = prod.engine.toLowerCase().includes(q);
        if (!matchName && !matchSKU && !matchCategory && !matchEngine) {
          return false;
        }
      }
      return true;
    });
  }, [products, filter]);

  // Featured Offers (6 items)
  const offerProducts = useMemo(() => {
    return products.filter(p => p.isOffer);
  }, [products]);

  // Brand inventory counters for 3D ribbon
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Toyota: 0,
      Nissan: 0,
      Hyundai: 0,
      Kia: 0,
      Honda: 0
    };
    products.forEach(p => {
      if (counts[p.brand] !== undefined) {
        counts[p.brand]++;
      }
    });
    return counts;
  }, [products]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`¡${product.name} agregado al carrito!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Block Navigation Switcher (renders only the chosen block and scrolls to top)
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  return (
    <div className="min-h-screen bg-[#0F1216] text-[#F4F5F7] font-sans relative selection:bg-[#0052CC] selection:text-white flex flex-col justify-between">
      
      {/* 1. Initial Animated Screen Loader */}
      {loadingInitial && (
        <InitialLoader onFinish={() => setLoadingInitial(false)} />
      )}

      {/* 2. Top Bar Navigation with Block Tabs */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => { auth.signOut(); setUser(null); showToast('Sesión cerrada correctamente'); }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Dynamic Technical Ticker Band with infinite marquee and 3D hover tags */}
      <TechnicalTickerBand 
        onSelectFeature={(feature) => {
          if (feature.includes('40')) {
            handleNavigate('tienda');
          } else if (feature.includes('GARANTÍA')) {
            handleNavigate('garantia');
          } else if (feature.includes('SEGUIMIENTO') || feature.includes('ARP')) {
            handleNavigate('seguimiento');
          }
        }}
      />

      {/* Main Content Area: Renders ONLY the active block */}
      <main className="w-full flex-grow">
        
        {/* BLOQUE 1: INICIO & 6 OFERTAS + BUSCADOR */}
        {activeSection === 'inicio' && (
          <HeroSection
            offerProducts={offerProducts}
            onAddToCart={handleAddToCart}
            filter={filter}
            onFilterChange={setFilter}
            onResetFilter={() => setFilter({ brand: 'Todas', model: 'Todos', year: 'Todos', engine: 'Todas', category: 'Todas', searchQuery: '' })}
            filteredCount={filteredProducts.length}
            onExploreAll={() => handleNavigate('tienda')}
            brandCounts={brandCounts}
          />
        )}

        {/* BLOQUE 2: TIENDA (CATÁLOGO DE 40 REPUESTOS & PDF) */}
        {activeSection === 'tienda' && (
          <CatalogStore
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}

        {/* BLOQUE 3: SEGUIMIENTO DE PEDIDO ARP */}
        {activeSection === 'seguimiento' && (
          <OrderTracking />
        )}

        {/* BLOQUE 4: NOSOTROS (HISTORIA, MISIÓN, VISIÓN) */}
        {activeSection === 'nosotros' && (
          <AboutSection />
        )}

        {/* BLOQUE 5: GARANTÍA & SEGURIDAD EN ENVÍOS */}
        {activeSection === 'garantia' && (
          <SecuritySection />
        )}

      </main>

      {/* Footer with Block Switchers */}
      <footer className="w-full bg-[#0B0D10] border-t border-white/10 py-10 text-[#8A94A6] text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0052CC] flex items-center justify-center text-white font-mono font-black text-sm">
              AP
            </div>
            <div>
              <span className="font-['Barlow_Condensed'] text-lg font-bold text-white uppercase block">AUTOREPUESTOS PRO</span>
              <span>Distribución y Venta de Repuestos Automotrices en Perú</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 font-medium flex-wrap justify-center">
            <button 
              onClick={() => handleNavigate('inicio')} 
              className={`hover:text-white transition-colors ${activeSection === 'inicio' ? 'text-white font-bold' : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavigate('tienda')} 
              className={`hover:text-white transition-colors ${activeSection === 'tienda' ? 'text-white font-bold' : ''}`}
            >
              Catálogo (40)
            </button>
            <button 
              onClick={() => handleNavigate('seguimiento')} 
              className={`hover:text-white transition-colors ${activeSection === 'seguimiento' ? 'text-white font-bold' : ''}`}
            >
              Seguimiento
            </button>
            <button 
              onClick={() => handleNavigate('nosotros')} 
              className={`hover:text-white transition-colors ${activeSection === 'nosotros' ? 'text-white font-bold' : ''}`}
            >
              Nosotros
            </button>
            <button 
              onClick={() => handleNavigate('garantia')} 
              className={`hover:text-white transition-colors ${activeSection === 'garantia' ? 'text-white font-bold' : ''}`}
            >
              Garantía
            </button>
          </div>

          <div className="text-right font-mono text-[11px]">
            © {new Date().getFullYear()} AUTOREPUESTOS PRO
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0052CC] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2 animate-fade-in">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        user={user}
        onOrderCreated={(code) => showToast(`Pedido registrado con código ${code}`)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          showToast(`¡Bienvenido ${u.name}! Descarga de PDF desbloqueada.`);
        }}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProductStock={handleUpdateProductStock}
      />

    </div>
  );
}
