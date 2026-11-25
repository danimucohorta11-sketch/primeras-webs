import type { ImageKey } from "./images";

export const hero = {
  eyebrow: "Perruqueria unisex · Casagemes, Badalona",
  text: "Cortes, color, mechas y peinados para mujer y hombre. Te escuchamos, te aconsejamos y te vas a casa sintiéndote tú.",
};

export const values = [
  "Mujer y hombre",
  "Cita por WhatsApp",
  "Atención personalizada",
  "Color y mechas",
  "En el barrio de Casagemes",
  "Abierto también los sábados",
];

export type Service = { id: string; title: string; text: string; image: ImageKey; items: string[] };

/** Servicios habituales de una peluquería unisex. Pendiente de validar la carta y los precios con Sònia. */
export const services: Service[] = [
  {
    id: "corte-mujer",
    title: "Corte de mujer",
    text: "Desde sanear las puntas hasta un cambio de look. Te proponemos el corte que mejor va con tu cara y tu día a día.",
    image: "corteRizos",
    items: ["Corte y peinado", "Corte para pelo rizado", "Flequillos y capas"],
  },
  {
    id: "color",
    title: "Color y tinte",
    text: "Cobertura de canas, cambios de tono y matices. Un color que se ve natural y aguanta.",
    image: "colorPincel",
    items: ["Tinte raíz", "Color completo", "Matiz y brillo"],
  },
  {
    id: "mechas",
    title: "Mechas y balayage",
    text: "Luz donde la necesitas: mechas finas, balayage o babylights, siempre cuidando la fibra.",
    image: "ondas",
    items: ["Balayage", "Mechas de papel", "Babylights"],
  },
  {
    id: "peinados",
    title: "Peinados y ondas",
    text: "Secados con volumen, ondas, alisados con plancha y peinados para ocasiones especiales.",
    image: "planchado",
    items: ["Lavar y peinar", "Ondas", "Recogidos"],
  },
  {
    id: "caballero",
    title: "Corte de caballero",
    text: "Clásico, degradado o a tijera. Arreglo de nuca y patillas para ir siempre impecable.",
    image: "corteCaballero",
    items: ["Corte a tijera", "Degradado", "Arreglo de nuca"],
  },
  {
    id: "tratamientos",
    title: "Lavado y tratamientos",
    text: "Lavado con masaje y tratamientos de hidratación para recuperar suavidad y brillo.",
    image: "lavadoHombre",
    items: ["Hidratación", "Reparación", "Masaje capilar"],
  },
];

export const process = {
  eyebrow: "Cómo trabajamos",
  title: ["Sin prisas", "y escuchándote."],
  steps: [
    { title: "Hablamos", text: "Nos cuentas qué quieres, cómo te peinas y cuánto tiempo le dedicas a tu pelo." },
    { title: "Te aconsejamos", text: "Te proponemos opciones reales para tu tipo de pelo, con el precio claro antes de empezar." },
    { title: "Manos a la obra", text: "Lavado con masaje, corte o color con calma, sin cadena de montaje." },
    { title: "Para casa", text: "Te explicamos cómo mantenerlo para que el resultado dure hasta la próxima visita." },
  ],
};

export const forHim = {
  eyebrow: "También para él",
  title: "Una peluquería de barrio para toda la casa.",
  text: "Ven con quien quieras: tú al color y él al corte. Cortes clásicos, degradados y arreglos rápidos con cita, para no esperar.",
};

export type IdeaTag = "mujer" | "hombre";

export const ideaFilters: { id: IdeaTag | "todo"; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "mujer", label: "Mujer" },
  { id: "hombre", label: "Hombre" },
];

export const ideas: { image: ImageKey; tag: IdeaTag; title: string }[] = [
  { image: "ondas", tag: "mujer", title: "Mechas con ondas" },
  { image: "degradado", tag: "hombre", title: "Degradado clásico" },
  { image: "planchado", tag: "mujer", title: "Liso pulido" },
  { image: "corteRizos", tag: "mujer", title: "Corte para rizos" },
  { image: "maquinaCaballero", tag: "hombre", title: "Arreglo de nuca" },
  { image: "colorPincel", tag: "mujer", title: "Color a pincel" },
  { image: "barberoCepillo", tag: "hombre", title: "Tupé con volumen" },
  { image: "tinteClienta", tag: "mujer", title: "Cambio de color" },
];

export const faqs = [
  {
    q: "¿Cómo pido cita?",
    a: "Escríbenos por WhatsApp o llámanos al 633 50 31 45. Te damos el primer hueco que te vaya bien.",
  },
  {
    q: "¿Atendéis a hombres?",
    a: "Sí, somos una peluquería unisex: cortes de caballero, degradados y arreglos de nuca, además de todos los servicios para mujer.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del servicio, del largo y de la cantidad de pelo. Pregúntanos por WhatsApp y te damos el precio antes de reservar, sin sorpresas.",
  },
  {
    q: "¿Abrís los sábados?",
    a: "Sí, los sábados abrimos de 9:00 a 14:00. De martes a viernes, de 9:00 a 13:00 y de 15:00 a 19:00.",
  },
];
