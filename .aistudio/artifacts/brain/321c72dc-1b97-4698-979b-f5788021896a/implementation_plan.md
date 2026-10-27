# AUTOREPUESTOS PRO - Tienda Online de Repuestos Mecánicos & Panel Admin

Una plataforma de comercio electrónico de grado industrial para la venta y distribución de repuestos automotrices en Perú. Cuenta con buscador avanzado por marca, modelo, año (2000-2026) y motor; liquid glass UI; animaciones de 2 segundos en títulos/subtítulos; calculadora/fuente digital en precios (S/); pantalla de carga; catálogo de 40 repuestos precargados; descarga de catálogo PDF exclusiva para usuarios suscritos; seguimiento de pedidos por código ARP-XXXXX; panel administrativo (eliel.estudioem@gmail.com) con creador de campañas de correo masivo; e integración completa con Firebase Auth y Cloud Firestore.

---

> [!IMPORTANT] **Decisiones Confirmadas con el Usuario**
> - **Paleta de Colores**: Azul Cobalto Técnico (`#0052CC` / `#2563EB`), Carbono `#0F1216` y Acero `#8A94A6` (sin usar rojo).
> - **Estructura de Productos & Búsqueda**: 40 repuestos mecánicos precargados con filtro por marcas (Toyota, Nissan, Hyundai, Kia, Honda) y años (2000 - 2026).
> - **Seguimiento & Catálogo PDF**: Tracking por código de orden `ARP-XXXXX` + Generador dinámico de PDF exclusivo para usuarios registrados.
> - **Tipografía**: Arial para títulos principales, Times New Roman para textos/cuerpos y estilo calculadora / `JetBrains Mono` tabular para los precios en Soles (S/).
> - **Animación**: Pantalla de carga inicial (loading screen), transición suave de 2s en títulos/subtítulos, movimiento parallax sutil al scroll y efecto liquid glass en tarjetas y contenedores principales.
> - **Base de Datos & Auth**: Firebase Auth + Firestore para registro (Nombre, Correo, WhatsApp), almacenamiento de productos, pedidos y suscripciones.

---

## 1. Visión General y Concepto Principal

**AUTOREPUESTOS PRO** está diseñado para mecánicos, talleres automotrices y conductores particulares en Perú que buscan repuestos de alta durabilidad con búsqueda técnica precisa por vehículo.

- **Audiencia Objetivo**: Talleres mecánicos B2B y propietarios de vehículos en Perú.
- **Diferenciador Clave**: Buscador instantáneo por modelo de auto y año, experiencia visual técnica con liquid glass, precios en Soles peruanos (S/) con números tabulares de alta legibilidad, y un flujo completo de fidelización (registro con WhatsApp + catálogo PDF + panel admin para broadcasts de campañas).

---

## 2. Experiencia de Usuario y Diseño Visual (UX/UI)

### Paleta de Colores y Tokens de Diseño
- **Canvas Base**: Dark Carbon `#0F1216` y Soft Slate `#141820` (fondos profundos).
- **Superficies Liquid Glass**: `bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl`
- **Acento Técnico**: Cobalt Blue `#0052CC` / `#2563EB` (Botones de acción, badges, focus rings).
- **Textos Secundarios & Bordes**: Steel `#8A94A6` y Cool Slate `#CBD5E1`.
- **Precios & Códigos SKU**: Estilo Calculadora / Digital Monospace (`JetBrains Mono` tabular).

### Estructura de Pantallas y Bloques Principales
1. **Pantalla de Carga (Initial Loader Screen)**:
   - Animación de engranajes/piston automotriz con indicador de porcentaje y logo de AUTOREPUESTOS PRO.
2. **Navegación Superior (Top Bar Contract)**:
   - Logo "AUTOREPUESTOS PRO" con isotipo técnico.
   - Enlaces: Inicio, Tienda, Seguimiento, Nosotros, Garantía.
   - Acciones: Buscador rápido, Botón de Carrito (contador animado) y Registro/Login.
3. **Bloque Principal / Hero**:
   - Explicación breve de la tienda + Buscador Avanzado Interactivo de Repuestos (Marca: Toyota/Nissan/Hyundai/Kia/Honda $\rightarrow$ Modelo $\rightarrow$ Año 2000-2026 $\rightarrow$ Categoría).
   - Bloque destacado con **6 productos en oferta especial** (con descuento visible y badge "OFERTA").
4. **Bloque Tienda / Catálogo Completo (40 Productos)**:
   - Grilla interactiva de 40 repuestos precargados (Frenos, Suspensión, Motor, Filtración, Transmisión, Eléctrico).
   - Filtros dinámicos por marca, modelo, año, categoría, rango de precio e interacción instantánea.
   - Botón para **Descargar Catálogo PDF** (desbloqueado si el usuario ha iniciado sesión con Nombre, Correo y WhatsApp; si no está autenticado, abre el modal de registro).
5. **Seguimiento de Pedido (Order Tracking ARP-XXXXX)**:
   - Campo para ingresar el código de pedido `ARP-XXXXX`. Muestra timeline interactivo de estados: *Registrado* $\rightarrow$ *En Preparación* $\rightarrow$ *En Camino* $\rightarrow$ *Entregado*.
6. **Nosotros: Historia, Misión y Visión**:
   - Sección narrativa sobre la trayectoria de AUTOREPUESTOS PRO en el mercado automotriz peruano, su misión de proveer repuestos con estándar OEM y visión de liderar la distribución nacional.
7. **Garantía & Seguridad**:
   - Tarjetas informativas sobre repuestos 100% originales, envíos garantizados a nivel nacional en Perú y atención personalizada por WhatsApp.
8. **Panel Administrativo (Acceso Privado `eliel.estudioem@gmail.com`)**:
   - Gestión de catálogo de repuestos (crear, editar, eliminar, stock).
   - Ver usuarios registrados (Nombre, Correo, WhatsApp, fecha).
   - Ver lista de pedidos y actualizar su estado (`ARP-XXXXX`).
   - **Módulo de Campañas Masivas**: Redactar anuncios/ofertas prediseñados y lanzarlos mediante enlace mailto / cliente de correo configurado.

---

## 3. Decisiones Clave de Producto

1. **Simulación y Persistencia en Firebase**:
   - Usar **Firebase Authentication** para el registro con correo y almacenamiento de datos adicionales (Nombre y WhatsApp) en **Firestore**.
   - Para el catálogo de 40 repuestos, se precargarán datos iniciales en Firestore y en local state para garantizar velocidad instantánea en conexiones lentas.
2. **Descarga de Catálogo PDF Exclusiva**:
   - Generación del catálogo en formato PDF profesional usando `jspdf` o `html2canvas`/dibujo dinámico en Canvas/PDF con logo, SKU, compatibilidad y precios en Soles. Accesible únicamente cuando `user` está autenticado.
3. **Optimización de Imágenes y Animación Liquid Glass**:
   - Componente `ImageWithSkeleton` con compresión/lazy loading y micro-animación al cargar.
   - Transiciones CSS de 2 segundos en subtítulos y títulos (`transition-all duration-[2000ms]`).
   - Animación sutil al scroll (Efecto Parallax suave).

---

## 4. Arquitectura Técnica y Estrategia de Datos

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           AUTOREPUESTOS PRO UI                            │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  TopBar (Logo, Nav Links, Carrito Drawer, User Auth Modal / Avatar)   │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  HeroBlock (Buscador Vehículo Marca/Modelo/Año + 6 Productos Oferta)  │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  StoreCatalogBlock (Filtros, 40 Productos, Descarga PDF Exclusiva)   │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  OrderTrackingBlock (Búsqueda ARP-XXXXX) | AboutUsBlock | Security    │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  AdminPanel Modal/View (Acceso restringido: eliel.estudioem@gmail.com)│ │
│ │  - CRUD Productos | Usuarios (WhatsApp) | Pedidos | Mail Campaign Tool │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                      STATE & PERSISTENCE SERVICES                         │
│  ┌──────────────────────────┐         ┌────────────────────────────────┐  │
│  │ Firebase Auth (User session)       │ Firestore Database             │  │
│  │ - Name, Email, WhatsApp  │         │ - /products (40 repuestos)     │  │
│  └──────────────────────────┘         │ - /users (suscriptores)        │  │
│                                       │ - /orders (pedidos ARP-XXXXX)  │  │
│                                       └────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

### Plan de Componentes y Archivos

1. **`src/types/index.ts`**: Definición de interfaces (`Product`, `VehicleFilter`, `UserRegistration`, `Order`, `CartItem`).
2. **`src/data/products.ts`**: Colección completa de 40 repuestos automotrices precargados con datos técnicos (compatibilidad Toyota, Nissan, Hyundai, Kia, Honda, años 2000-2026, motor, SKU, precio en soles, oferta boolean, imagen).
3. **`src/services/firebase.ts`**: Configuración de Firebase Auth y Firestore, helpers para registro, login, sincronización de productos y pedidos, y error handlers según la skill.
4. **`src/components/InitialLoader.tsx`**: Pantalla de carga animada de entrada.
5. **`src/components/Header.tsx`**: Navegación superior con liquid glass styling, barra de búsqueda, drawer de carrito y login/perfil.
6. **`src/components/VehicleSearch.tsx`**: Buscador por marca, modelo, año y motor.
7. **`src/components/HeroSection.tsx`**: Presentación de la tienda + grilla de 6 productos en oferta.
8. **`src/components/ProductCard.tsx`**: Tarjeta de producto con efecto liquid glass, precio en formato calculadora/mono, badges de compatibilidad y animación de carga en imágenes.
9. **`src/components/CatalogStore.tsx`**: Grilla completa de repuestos con filtros por categoría y vehículo, y botón de descarga de PDF restringido por suscripción/login.
10. **`src/components/OrderTracking.tsx`**: Consulta interactiva de pedidos mediante código `ARP-XXXXX`.
11. **`src/components/AboutSection.tsx`**: Historia, misión y visión de AUTOREPUESTOS PRO.
12. **`src/components/SecuritySection.tsx`**: Certificados de seguridad, garantía de repuestos OEM y envíos Perú.
13. **`src/components/AuthModal.tsx`**: Modal de inicio de sesión y registro (Nombre, Correo, WhatsApp).
14. **`src/components/AdminPanel.tsx`**: Dashboard para `eliel.estudioem@gmail.com` con gestión de productos, usuarios registrados, pedidos y herramienta de envío de campañas masivas por mailto.
15. **`src/components/CartDrawer.tsx`**: Drawer lateral de carrito de compras con resumen en Soles peruanos y checkout hacia Firestore + código de orden `ARP-XXXXX`.
16. **`src/utils/pdfGenerator.ts`**: Generador dinámico de catálogo PDF con formato técnico y branding de AUTOREPUESTOS PRO.

---

## 5. Verificación y Pruebas
- Verificar compilación con `compile_applet`.
- Probar el flujo de búsqueda por vehículo (ej: Toyota Yaris 2018 o Nissan Sentra 2020).
- Probar el registro de usuario (Nombre, Correo, WhatsApp) y la descarga restringida del PDF.
- Probar el acceso al Panel Admin con `eliel.estudioem@gmail.com` y la función de envío de correos de campaña.
- Validar respuesta responsive (mobile 375px a desktop 1440px), animaciones de 2s en títulos, estilo liquid glass y precios formateados como `S/ 1,250.00` en tipografía monospace/digital.
