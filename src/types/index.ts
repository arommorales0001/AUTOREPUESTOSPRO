export type VehicleBrand = 'Toyota' | 'Nissan' | 'Hyundai' | 'Kia' | 'Honda' | 'Todas';

export interface VehicleFilter {
  brand: VehicleBrand;
  model: string;
  year: number | 'Todos';
  engine: string;
  category: string;
  searchQuery: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Frenos' | 'Motor' | 'Suspensión' | 'Transmisión' | 'Eléctrico' | 'Filtración';
  price: number;
  isOffer: boolean;
  discountPrice?: number;
  stock: number;
  brand: VehicleBrand;
  compatibleModels: string[]; // e.g. ["Toyota Yaris", "Toyota Corolla"]
  yearStart: number;
  yearEnd: number;
  engine: string; // e.g. "1.5L Dual VVT-i", "2.0L CRDi"
  image: string;
  fallbackType?: 'brake' | 'piston' | 'shock' | 'general';
  description: string;
  specs: { label: string; value: string }[];
}

export interface UserSubscription {
  uid: string;
  name: string;
  email: string;
  whatsapp: string;
  registeredAt: string;
  subscribed: boolean;
  role: 'user' | 'admin';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id?: string;
  orderCode: string; // e.g. ARP-49201
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalSoles: number;
  status: 'Registrado' | 'En Preparación' | 'En Camino' | 'Entregado';
  createdAt: string;
  items: OrderItem[];
}

export interface EmailCampaign {
  id: string;
  title: string;
  subject: string;
  preheader: string;
  messageBody: string;
  ctaText: string;
  ctaUrl: string;
  targetAudience: 'all' | 'wholesalers' | 'offers';
  createdAt: string;
}
