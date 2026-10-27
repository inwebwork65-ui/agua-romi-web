# Agua Romi – Sitio web comercial

Sitio web de **Hielo y Agua Romi** (Villa Cañas, Santa Fe). Muestra productos, permite armar un pedido y enviarlo
por **WhatsApp**, e incluye secciones de calidad, servicios, app de autogestión, preguntas frecuentes y contacto.

Tecnología: React 19 · Vite · TypeScript · Tailwind CSS 4 · lucide-react.

## 1. Cómo ejecutarlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # revisa tipos y genera la carpeta dist/
npm run preview    # prueba local del build
```

El contenido de `dist/` es un sitio estático: se sube a cualquier hosting (Netlify, Vercel, Cloudflare Pages, hosting con cPanel, etc.).
No hay variables de entorno obligatorias ni credenciales.

## 2. Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, teléfono, correo, dirección, horarios, redes, número de habilitaciones, enlace de la app | `src/config/settings.ts` |
| Productos | `src/data/products.ts` |
| Categorías | `src/data/categories.ts` |
| Promociones | `src/data/promotions.ts` |
| Fotos del inicio | `src/data/hero.ts` |
| Videos de "Romi en acción" | `src/data/videos.ts` |
| Servicios | `src/data/services.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |
| Textos de "Quiénes somos" y "Calidad" | `src/data/about.ts` |
| Colores y tipografías | `src/index.css` (bloque `@theme`) |
| Imágenes / videos | `public/images/`, `public/videos/` |

### Cargar precios
En `src/data/products.ts` cada producto tiene `precio: null` (se muestra "Consultar precio"). Poné un número
(`precio: 4500`) y `disponibilidad: 'disponible'`; el carrito calcula totales y los incluye en el mensaje de WhatsApp.
Cuando haya precios, el orden por precio se habilita solo. Con `catalogo.avisoDemo: false` desaparece el cartel de catálogo de demostración.

### Agregar un producto
Copiá un bloque de `products.ts`, cambiá `id` (único), `categoria` (id de una categoría), nombre, presentación, descripción e imagen (`/images/archivo.webp`).

### Agregar promociones
Completá el arreglo de `src/data/promotions.ts`. Mientras esté vacío, la sección muestra un mensaje invitando a consultar por WhatsApp.

### Logo
Copiá el archivo (SVG o PNG) en `public/images/` y poné su ruta en `logo.url` de `settings.ts`. Mientras sea `null` se usa un logo de texto.

### Link de Google Play
Poné el enlace exacto de la app en `app.enlaceGooglePlay`. Mientras sea `null` el botón abre una búsqueda en Google Play.

### Textos "A confirmar"
Los textos que no figuraban en el material recibido están marcados con la etiqueta **A confirmar**.
Cuando estén validados, completalos y poné `mostrarAvisosProvisorios: false` en `settings.ts`.

## 3. Cómo funciona el pedido

1. La persona agrega productos al carrito (se guarda en el navegador).
2. En "Confirmar pedido" completa su nombre (dirección y notas son opcionales) y **revisa el mensaje**, que puede editar.
3. Al enviar se abre WhatsApp con el mensaje listo; el pedido queda confirmado cuando Agua Romi responde.

No se simula ningún pago ni confirmación automática. Si un producto no tiene precio, el total se muestra como "A confirmar".

## 4. Pasar a tienda online con Mercado Pago (preparado, no activo)

La arquitectura ya está separada: `src/services/orders.ts` define la interfaz `OrderService`.
Hoy está activo `whatsappOrderService`; `onlineOrderService` es un esqueleto que rechaza el envío mientras `ventaOnline.habilitada` sea `false`.

Pasos para activarla (requiere un backend propio):
1. Crear un backend (por ejemplo una función serverless) con endpoints para crear el pedido y crear la preferencia de pago de Mercado Pago, y un webhook que confirme el pago.
2. Guardar el Access Token **solo en el backend**; en el frontend solo va la clave pública (ver `.env.example`).
3. Implementar `onlineOrderService.submit()` para llamar a ese backend y redirigir al checkout.
4. Definir envíos (`ShippingOption` en `src/types.ts`), estados de pedido (`OrderStatus`) y políticas legales reales.
5. Poner `ventaOnline.habilitada: true` y `pedidos.modo: 'online'`.

## 5. Lo que hay que confirmar con la empresa antes de publicar

- Número de WhatsApp: se dedujo del flyer ("03462 15596926" → `5493462596926`). Probar un mensaje real.
- Dirección (tomada de las bolsas de hielo), correo y números de habilitación ASSAL (R.N.E. 21-114386 / R.N.P.A. 21-113132).
- Equipamiento de la planta mencionado en "Calidad" (ósmosis inversa, ozonizador, filtro de carbón activado) y cualquier otra afirmación.
- Horarios, zonas de reparto, medios de pago, precios, disponibilidad, promociones e historia de la empresa (hoy "A confirmar").
- Textos legales (privacidad y términos): son un borrador, deben revisarse.
- Logo oficial y enlace de Google Play.
- El catálogo es de demostración: 4 productos sin precio.

## 6. Notas técnicas

- Accesible por teclado, con enlace "Saltar al contenido", foco atrapado en diálogos, y respeto de `prefers-reduced-motion`.
- Los videos están sin audio, en bucle y solo se reproducen mientras están a la vista.
- SEO: metadatos, Open Graph, datos estructurados `LocalBusiness`, `robots.txt`. Falta agregar `sitemap.xml` y la imagen Open Graph con la URL final del sitio.
