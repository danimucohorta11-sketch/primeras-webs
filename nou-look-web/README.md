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
| Barra de datos bajo el hero | `src/components/sections/InfoBand.tsx` |
| Sistema de reservas | `src/lib/booking.ts` |

## Dependencias (justificadas)
- `motion`: entradas, máscaras y lightbox (patrones de Motion Primitives / React Bits); respeta `prefers-reduced-motion`.
- `@radix-ui/react-dialog`: base accesible de shadcn/ui para menú móvil y lightbox, sin estilos por defecto.
- `@fontsource-variable/public-sans`, `@fontsource-variable/jost`: tipografías autoalojadas (Public Sans ligera para textos y titulares; Jost en mayúsculas para frases de impacto y el logotipo).

Magic UI, Once UI y React Hook Form se estudiaron pero no se instalaron: no hay formularios (la cita es telefónica) y no hacía falta otro sistema de diseño.

Ver `docs/DATOS-PENDIENTES.md` para datos sin verificar y fotos provisionales.

## Dirección de diseño
Estética de salón de moda editorial: cabecera blanca con logotipo centrado, fotografía a sangre,
botones en píldora, superficies crema y piedra, banda y panel negros, frases en mayúsculas de peso
alto y el nombre del salón a gran tamaño en el pie. Orden de la home: hero · barra de cita y datos ·
el salón · servicios · experiencia · trabajos · (reseñas, si las hay) · contacto · Instagram · reserva.
