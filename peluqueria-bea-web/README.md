# Peluquería Bea · Web

Web de **Peluquería Bea** (peluquería unisex, Av. de Catalunya 89-91, Badalona).
Next.js (App Router) + React + TypeScript + Tailwind v4. Lista para Vercel.

Referencias de diseño: `../docs/REFERENCIAS-PELUQUERIAS.md` (Llongueras y Marco Aldany).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

## Secciones
Cinta de valoración · Hero con collage de trabajos reales · Cinta de valores · Servicios y precios (pestañas, con reserva directa de cada servicio en Booksy) · Tratamientos estrella (antes/después real de keratina) · Conoce a Bea · Galería con filtros y visor · Opiniones reales · Preguntas frecuentes · Llamada a reservar · Visítanos (horario con «abierto ahora», mapa) · Pie · Barra fija de cita, llamada y WhatsApp en móvil.

## Dónde cambiar cosas
| Qué | Archivo |
|---|---|
| Teléfono, dirección, horario, enlaces de Booksy e Instagram | `src/content/site.ts` |
| Servicios, precios y duraciones | `src/content/services.ts` |
| Textos, reseñas, galería, preguntas | `src/content/sections.ts` |
| Fotos (ruta, texto alternativo, encuadre) | `src/content/images.ts` + `public/images` |
| Colores y tipografías | `src/app/globals.css` (`:root`) |

Reservas: todos los botones abren la ficha de Booksy del salón. Los de cada servicio usan `?do=open-widget&variantId=…` para abrir ese servicio directamente.

Para publicar con el dominio real, define `NEXT_PUBLIC_SITE_URL` (canónicas, sitemap y datos estructurados).

Datos verificados, fotos y pendientes: `docs/DATOS-PENDIENTES.md`.
