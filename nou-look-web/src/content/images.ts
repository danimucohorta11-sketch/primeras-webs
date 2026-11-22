/**
 * Manifiesto de imágenes.
 *
 * ESTADO ACTUAL: todas las fotos son de STOCK de Pexels (licencia Pexels: uso comercial
 * libre, sin atribución obligatoria) y NO son trabajos de Nou Look. Se muestran
 * sin etiqueta y deben sustituirse por fotos reales del salón antes de
 * publicar. Sobre todo las de "Nuestros trabajos", que no pueden presentarse como propias.
 *
 * Para sustituir una: copia el archivo a /public/images, cambia `src`, `alt` y `focal`
 * y pon status: "definitiva". Procedencia completa en docs/DATOS-PENDIENTES.md.
 * `focal` admite punto distinto en móvil y escritorio.
 */

export type Tone = "sand" | "clay" | "stone" | "umber";

export type ImageEntry = {
  id: string;
  /** Ruta bajo /public. `null` = marcador tonal sin foto. */
  src: string | null;
  alt: string;
  /** Proporción de la caja en CSS (ancho / alto). */
  ratio: string;
  tone: Tone;
  focal: { desktop: string; mobile?: string };
  status: "provisional" | "definitiva";
};

/** Foto de stock provisional. `pexels` = id de la foto en pexels.com/photo/<id>. */
const stock = (
  id: string,
  pexels: string,
  alt: string,
  ratio: string,
  focal = "50% 40%",
  focalMobile?: string,
): ImageEntry => ({
  id,
  src: `/images/stock-${pexels}.webp`,
  alt,
  ratio,
  tone: "sand",
  focal: { desktop: focal, mobile: focalMobile },
  status: "provisional",
});

/** Marcador tonal sin foto (por si algún hueco queda libre). */
export const placeholder = (
  id: string,
  alt: string,
  ratio: string,
  tone: Tone,
  focal = "50% 40%",
): ImageEntry => ({
  id,
  src: null,
  alt,
  ratio,
  tone,
  focal: { desktop: focal },
  status: "provisional",
});

export const images = {
  hero: stock("hero", "13543276", "Mujer de espaldas con media melena castaña ondulada", "4 / 5", "50% 30%", "50% 25%"),

  salonA: stock("salon-a", "696285", "Peluquero secando el cabello de una clienta en el salón", "4 / 5", "50% 40%"),
  salonB: stock("salon-b", "7142796", "Cepillado de una melena rubia", "1 / 1", "50% 35%"),

  svcCorte: stock("servicio-corte", "6487882", "Corte de cabello con tijera y peine", "4 / 5", "50% 45%"),
  svcColor: stock("servicio-color", "4981476", "Aplicación de color con pincel", "16 / 11", "50% 50%"),
  svcPeinados: stock("servicio-peinados", "9941096", "Recogido con adorno de perlas", "1 / 1", "50% 30%"),
  svcTratamientos: stock("servicio-tratamientos", "3993449", "Lavado del cabello en el lavacabezas", "4 / 5", "50% 45%"),
  svcOcasiones: stock("servicio-ocasiones", "10561323", "Recogido con flores para una ocasión especial", "16 / 11", "50% 22%"),

  w1: stock("trabajo-1", "8468036", "Coloración con pincel y papel", "2 / 3", "50% 35%"),
  w2: stock("trabajo-2", "7755461", "Clienta en el lavacabezas del salón", "3 / 2", "50% 50%"),
  w3: stock("trabajo-3", "2995337", "Recogido trenzado con flores", "2 / 3", "50% 35%"),
  w4: stock("trabajo-4", "7755225", "Corte de puntas con tijera", "3 / 2", "50% 50%"),

  expA: stock("experiencia-a", "3993312", "Peluquera aplicando color a una clienta", "4 / 5", "50% 35%"),
  expB: stock("experiencia-b", "7440133", "Alisado y secado del cabello rubio", "1 / 1", "50% 40%"),
  expC: stock("experiencia-c", "705255", "Interior luminoso de una peluquería", "16 / 11", "50% 50%"),

  cta: stock("reserva", "8468127", "Peluquero y clienta sonriendo durante una coloración", "4 / 5", "50% 40%"),
} as const;

export type ImageKey = keyof typeof images;
