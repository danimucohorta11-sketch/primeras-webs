import type { ImageKey } from "./images";

/**
 * Textos y estructura de secciones. Los servicios son PROVISIONALES:
 * confirmar con el salón cuáles ofrece antes de publicar (ver docs/DATOS-PENDIENTES.md).
 * Sin precios, años de experiencia, premios ni especializaciones inventadas.
 */

export const hero = {
  eyebrow: "Peluquería unisex · Tarragona",
  title: "Un look nuevo, siempre tuyo.",
  subtitle: "Corte, color y cuidado del cabello con criterio. Con cita previa y sin prisas.",
  /** Línea pequeña bajo los botones: solo datos reales. */
  footnote: "Cita previa por teléfono · Av. Ramón y Cajal 36, Tarragona",
};

/**
 * Escenas del hero (pantalla completa, rotan solas). Recortes específicos:
 * `d` = escritorio 16:9, `m` = móvil vertical. Generados en public/images/hero.
 */
export const heroSlides = [1, 2, 3, 4, 5].map((n) => ({
  d: `/images/hero/d-${n}.webp`,
  m: `/images/hero/m-${n}.webp`,
}));

export const salon = {
  eyebrow: "El salón",
  /** Foto a sangre del bloque editorial. */
  banner: "salonBanner" as ImageKey,
  title: "Detrás de cada look, personas que escuchan.",
  paragraphs: [
    "Nou Look es una peluquería unisex en Tarragona. Aquí el punto de partida es siempre el mismo: entender qué quieres y qué le sienta bien a tu cabello.",
    "Cada cita se piensa a medida, con el tiempo necesario y atención al detalle, desde el primer boceto hasta el último retoque.",
  ],
  principles: [
    { title: "Escuchar primero", text: "Hablamos antes de coger las tijeras." },
    { title: "Criterio estético", text: "Un resultado que funciona en tu día a día." },
    { title: "Cuidado en el detalle", text: "Del lavado al último retoque." },
  ],
  images: ["salonA", "salonB"] as ImageKey[],
};

export type Service = {
  id: string;
  title: string;
  text: string;
  image: ImageKey;
  /** Disposición editorial: tamaño de la imagen en la rejilla de 12 columnas. */
  span: "wide" | "narrow";
};

export const servicesIntro = {
  eyebrow: "Servicios",
  title: "El servicio que tu cabello necesita.",
  text: "Elige lo que buscas y llámanos: te reservamos el tiempo que cada servicio pide.",
  note: "Selección provisional pendiente de confirmar con el salón.",
};

export const services: Service[] = [
  {
    id: "corte",
    title: "Corte y estilismo",
    text: "Cortes para ella, para él y para quien prefiera no etiquetas. Pensados para tu cabello, tu rostro y tu rutina.",
    image: "svcCorte",
    span: "narrow",
  },
  {
    id: "color",
    title: "Coloración y mechas",
    text: "Del tono natural al cambio más atrevido. Color con matices, mantenimiento sencillo y brillo.",
    image: "svcColor",
    span: "wide",
  },
  {
    id: "peinados",
    title: "Peinados",
    text: "Secado, ondas, recogidos y acabados para el día a día o para cuando toca arreglarse.",
    image: "svcPeinados",
    span: "narrow",
  },
  {
    id: "tratamientos",
    title: "Tratamientos capilares",
    text: "Cuidado a fondo para recuperar fuerza, hidratación y luz en el cabello.",
    image: "svcTratamientos",
    span: "narrow",
  },
  {
    id: "ocasiones",
    title: "Ocasiones especiales",
    text: "Bodas, celebraciones y citas importantes. Un look que dure toda la jornada, con prueba previa si hace falta.",
    image: "svcOcasiones",
    span: "wide",
  },
];

export const worksIntro = {
  eyebrow: "Nuestros trabajos",
  title: "El mejor argumento es el resultado.",
  instagramCta: "Ver más en Instagram",
  text: "Una selección del trabajo del salón. Más en nuestro Instagram.",
};

export const works: ImageKey[] = ["w1", "w2", "w3", "w4", "w5"];

export const experience = {
  eyebrow: "Experiencia Nou Look",
  title: "Venir a Nou Look es parar un momento.",
  shout: ["Tu momento.", "Tu estilo."],
  statements: [
    { n: "01", title: "Sin prisas", text: "Una cita es tuya. Sin relojes a la vista." },
    { n: "02", title: "A tu medida", text: "Nada de fórmulas: cada cabello pide lo suyo." },
    { n: "03", title: "Con cuidado", text: "Del lavado al secado, cada gesto cuenta." },
  ],
  images: ["expA", "expB", "expC", "expD"] as ImageKey[],
};

/**
 * Reseñas: solo se muestran si se añaden aquí opiniones REALES y atribuibles.
 * Mientras esté vacío, la sección no se renderiza.
 * { quote: "...", author: "Nombre", source: "Google", url?: "https://..." }
 */
export type Review = { quote: string; author: string; source: string; url?: string };
export const reviews: Review[] = [];

export const bookingSection = {
  eyebrow: "Reserva tu cita",
  image: "cta" as ImageKey,
  title: "Tu próximo look empieza con una llamada.",
  text: "La cita previa se gestiona por teléfono. Cuéntanos qué buscas y te buscamos hueco.",
};

export const contactSection = {
  eyebrow: "Contacto y ubicación",
  title: "Te esperamos en Tarragona.",
  text: "Estamos en el centro de Tarragona. Llama para pedir cita o pide indicaciones para llegar.",
};

export const instagramSection = {
  eyebrow: "Comunidad Nou Look",
  title: "Síguenos en Instagram",
  cta: "Seguir",
};
