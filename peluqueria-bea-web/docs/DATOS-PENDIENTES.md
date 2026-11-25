# Peluquería Bea · Datos, fotos y pendientes

## Fuentes
- **Booksy** (ficha pública del salón, consultada el 25/11/2026): nombre, dirección, coordenadas, horario, servicios con precio y duración, valoración (5,0 con 64 reseñas), reseñas, titular, «se aceptan tarjetas» y «adaptado para niños».
- **Logotipo del salón** (en Booksy): teléfono 685 415 237 y dirección «Avenida Catalunya 89-91». El mismo teléfono aparece en el cartel de horario del salón.
- **Instagram** (@unisexpeluqueriabea): el enlace lo facilitó el cliente. No se pudo leer de forma automática porque Instagram pide iniciar sesión. Un cartel promocional del salón muestra también la cuenta **@pelu_bea_unisex**. Hay que confirmar cuál es la actual.

## Fotografías
Todas las fotos de `public/images` son **del propio salón**, publicadas por Peluquería Bea en su ficha de Booksy (galería y fotos de servicios). No se ha usado stock. Se convirtieron a WebP optimizado. Las dos de keratina (`keratina-antes`, `keratina-despues`) se recortaron de su cartel «Keratina antes/después».

El logo original se guarda en `docs/logo-original-booksy.jpg`. La web usa una versión tipográfica que lo imita (rojo, «Peluquería» espaciado y «Bea» manuscrito). Si Bea tiene el logo en vectorial (SVG o PDF), se puede sustituir.

Si el cliente quiere otras fotos de Instagram, basta con copiarlas a `public/images` y añadirlas en `src/content/images.ts`.

## Pendiente de confirmar con el salón
- **WhatsApp**: se ha puesto el mismo móvil (685 415 237). Hay que confirmar que lo atienden por WhatsApp. Si no, se quita `whatsapp` en `site.ts` y los botones.
- **Instagram**: confirmar cuál es la cuenta actual, @unisexpeluqueriabea o @pelu_bea_unisex.
- **Horario**: es el de Booksy (M–X 9:15–16:00, J 9:30–19:00, V 10:30–19:00, S 9:00–12:00). El cartel antiguo del salón muestra horas algo distintas. En Booksy figuran vacaciones del 15 de agosto al 1 de septiembre, que no se publican en la web.
- **Precios**: copiados de Booksy. Hay que revisarlos cuando cambien, en `src/content/services.ts`. El «Tratamiento de keratina» de un cartel antiguo tenía otros precios (100–160 €). En la web se usan los de Booksy (130–170 €).
- **Tintes orgánicos y vegetales**: salen de un cartel del salón («Ahora también»). Confirmar que siguen ofreciéndolos.
- **Reseñas**: son textos reales de Booksy, solo con el nombre de pila y la puntuación mínimamente corregida.
- **Textos legales**: falta el NIF y la revisión de la política de privacidad (`/legal`). La titular que figura en Booksy es Beatriz Belén Padilla Fuentes.
- **Dominio** definitivo (`NEXT_PUBLIC_SITE_URL`).
