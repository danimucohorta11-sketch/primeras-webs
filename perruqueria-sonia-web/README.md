# Perruqueria Sònia · Web

Web de **Perruqueria Sònia Unisex** (Carrer de l'Actriu Margarida Xirgu 30, Casagemes, Badalona).
Next.js (App Router) + React + TypeScript + Tailwind v4. Lista para Vercel (Root Directory: `perruqueria-sonia-web`).

Referencias de diseño: `../docs/REFERENCIAS-PELUQUERIAS.md`. Estructura basada en `../peluqueria-bea-web`, con identidad propia
(verde bosque + papel + melocotón; Instrument Serif + Manrope; hero a pantalla completa).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

## Secciones
Hero a pantalla completa · Cinta de valores · Servicios (cada tarjeta abre WhatsApp preguntando por ese servicio) · Cómo trabajamos · También para él · Ideas (galería con filtros y visor) · Preguntas frecuentes · Llamada a pedir cita · Visítanos (horario con «abierto ahora» y mapa) · Pie · Barra fija de WhatsApp y llamada en móvil.

## Dónde cambiar cosas
| Qué | Archivo |
|---|---|
| Teléfono, WhatsApp, dirección, horario, Instagram | `src/content/site.ts` |
| Textos, servicios, pasos, ideas, preguntas | `src/content/sections.ts` |
| Fotos | `src/content/images.ts` + `public/images` |
| Colores y tipografías | `src/app/globals.css` (`:root`) |

Para previsualizar en Claude (sin Vercel): `docs/PREVIEW.md`. Datos y pendientes: `docs/DATOS-PENDIENTES.md`.
