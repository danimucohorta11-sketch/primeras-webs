# Nou Look · Web

Next.js (App Router) + React + TypeScript + Tailwind v4. Listo para Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

## Dónde cambiar cosas
| Qué | Archivo |
|---|---|
| Teléfono, dirección, redes, horario | `src/content/site.ts` |
| Textos, servicios, trabajos, reseñas | `src/content/sections.ts` |
| Fotografías | `src/content/images.ts` + `/public/images` |
| Colores y tipografía | `src/app/globals.css` (`:root`) |
| Sistema de reservas | `src/lib/booking.ts` |

## Dependencias (justificadas)
- `motion`: entradas, máscaras y lightbox (patrones de Motion Primitives / React Bits); respeta `prefers-reduced-motion`.
- `@radix-ui/react-dialog`: base accesible de shadcn/ui para menú móvil y lightbox, sin estilos por defecto.
- `@fontsource/cormorant-garamond`, `@fontsource-variable/dm-sans`: tipografías autoalojadas.

Magic UI, Once UI y React Hook Form se estudiaron pero no se instalaron: no hay formularios (la cita es telefónica) y no hacía falta otro sistema de diseño.

Ver `docs/DATOS-PENDIENTES.md` para datos sin verificar y fotos provisionales.
