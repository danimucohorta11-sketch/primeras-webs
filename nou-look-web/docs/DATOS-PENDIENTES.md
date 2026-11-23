# Nou Look · Datos, fotos y procedencia

## Actualización (fotos y horario del cliente)
- **Horario** facilitado por el cliente (imagen del destacado "Horario" de Instagram): L–X 9–13 y 15:30–19:30 · J–V 9–19:30 · S 9–14. El domingo no figura, así que no se publica ningún dato sobre él.
- **Dirección y teléfono** confirmados en la bio de Instagram vista en el navegador.
- **Facebook oficial**: facebook.com/NouLookUnisex (enlazado desde la bio).
- Las fotos del cliente se retiraron por indicación suya y se sustituyeron por **stock de Pexels** (ver "Fotografías"). No se han descargado imágenes de Instagram ni de Google Imágenes (sin constancia de autorización).

## Qué se pudo verificar (y cómo)
Instagram y Facebook solo devolvieron el título al acceso automatizado (muro de login) y la ficha de L'Oréal Professionnel no resolvió DNS. Los únicos datos proceden de **fragmentos públicos de buscador** (bio de Instagram / descripción de Facebook), **no contrastados con el salón**:

| Dato | Valor | Estado |
|---|---|---|
| Nombre | NOU LOOK · Nou Look Hair Salon | Título de Instagram/Facebook |
| Dirección | Av. Ramón y Cajal 36, Tarragona | Bio de Instagram (confirmada) |
| Teléfono / cita previa | 977 21 59 57 | Bio de Instagram (confirmada) |
| Instagram | @noulookhairsalon | Enlace proporcionado |
| Facebook | facebook.com/NouLookUnisex | Enlazado desde la bio de Instagram |

Hay otros salones llamados "Nou Look" (p. ej. Valls, Crevillente). **No** se ha usado ningún dato suyo.

## Pendiente de obtener del salón
- Confirmar dirección y teléfono; si usan WhatsApp (`site.whatsapp`).
- Logotipo, paleta y tipografías reales (hoy: logotipo tipográfico en Jost y paleta blanco/crema/piedra/negro **provisionales**).
- Servicios reales (`src/content/sections.ts`; los 5 actuales son provisionales) y si publican precios.
- Fotografías y autorización de uso (ver abajo). Año de fundación ("desde 1994" aparece en un fragmento de Facebook; **no se publica** hasta confirmarlo).
- Reseñas reales y atribuibles (`reviews` en `sections.ts`; vacío = la sección no se muestra).
- Textos legales: razón social, NIF y política de privacidad (`/legal` es plantilla).
- Dominio definitivo (`NEXT_PUBLIC_SITE_URL`).

## Fotografías
Las de `public/images/` (WebP optimizado) son **stock de Pexels** (licencia Pexels: uso comercial permitido, atribución no obligatoria). **No son trabajos de Nou Look** y se muestran sin etiqueta. Antes de publicar, sustituirlas por fotos reales del salón; en especial las de "Nuestros trabajos", que no deben presentarse como propias. Solo los huecos sin foto (marcadores) llevan etiqueta "Foto provisional".

Procedencia (pexels.com/photo/<id>): 13543276 hero · 3993312 (también bloque editorial de El salón) · 7755461 (también mosaico de Experiencia) · 3065207 (también trabajo 5) · 3065207 · 7142796 · 6487882 · 4981476 · 9941096 · 3993449 · 10561323 · 8468036 · 7755461 · 2995337 · 7755225 · 3993312 · 7440133 · 705255 · 8468127. `salon-a.webp` (sección Salón): foto aportada por el cliente, verificar su procedencia y licencia. Verificar la licencia vigente de cada una en su página.

El hero usa 5 escenas con recortes propios para escritorio (16:9) y móvil (vertical) en `public/images/hero/` (`heroSlides` en `src/content/sections.ts`), derivadas de fotos de stock: 13543276, 9941096, 7142796, 3065207, 10561323. Cada imagen lleva una miniatura desenfocada en `src/content/blur.json` para que nunca haya huecos mientras carga.

Para sustituir una: `src/content/images.ts` (ruta, punto focal por breakpoint, alt real, `status: "definitiva"`).

## Reservas multiweb
Todos los botones "Reservar" pasan por `src/lib/booking.ts`. Hoy llaman por teléfono; para integrar el sistema multiweb se devuelve `{ kind: "external", href }` desde `getBookingAction()`.
