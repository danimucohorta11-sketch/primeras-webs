import type { ImageKey } from "./images";

export const hero = {
  eyebrow: "Peluquería unisex · Badalona",
  /** Frase de Bea en su ficha de Booksy. */
  title: ["Tu pelo", "lo dice todo", "de ti."],
  text: "Color, mechas, balayage, cortes y peinados para mujer, hombre y niños. Un salón de barrio donde te escuchan, te aconsejan y sales contenta.",
};

export const values = [
  { title: "5,0 en Booksy", text: "64 reseñas, todas de cinco estrellas." },
  { title: "Unisex y peques", text: "Mujer, hombre y niños desde bebés." },
  { title: "Tintes orgánicos", text: "Opción vegetal, más respetuosa con tu pelo." },
  { title: "Reserva 24 h", text: "Elige día y hora en Booksy cuando quieras." },
];

export const about = {
  eyebrow: "Conoce a Bea",
  title: "Como ir a casa de una amiga que sabe muchísimo de pelo.",
  paragraphs: [
    "Detrás de Peluquería Bea está Beatriz: tijeras, secador y muchas ganas de que salgas del salón sintiéndote tú. Cada servicio empieza escuchándote: qué te gusta, qué no te funciona y qué te apetece probar.",
    "Te aconseja con sinceridad y respeta tus decisiones, tanto si vienes a por las puntas de siempre como si quieres un cambio de color radical. Es la misma peluquera de principio a fin, así que siempre sabe cómo dejaste el pelo la última vez.",
  ],
  quote: {
    text: "Estar allí con ella es como estar en tu casa con una amiga. No voy a otro sitio desde hace unos años por algo.",
    author: "Raquel, clienta en Booksy",
  },
  facts: [
    { value: "5,0", label: "valoración media" },
    { value: "64", label: "reseñas verificadas" },
    { value: "100%", label: "de cinco estrellas" },
  ],
};

export const featured = {
  eyebrow: "Lo más pedido",
  title: "Tratamientos estrella",
  keratina: {
    title: "Alisado de keratina",
    text: "Adiós al encrespamiento. El pelo queda liso, suave y con brillo durante meses, y te peinas en la mitad de tiempo.",
    price: "desde 130 €",
    variantId: 1947530,
  },
  cards: [
    {
      image: "trenzasSalon" as ImageKey,
      title: "Trenzas boxeadoras",
      text: "Las trenzas de Bea tienen fama: para el cole, para entrenar o para una fiesta.",
      price: "desde 20 €",
      variantId: 1947549,
    },
    {
      image: "recogidoJoya" as ImageKey,
      title: "Recogidos para tu día",
      text: "Bodas, comuniones y graduaciones. Semirrecogidos y recogidos completos a tu medida.",
      price: "desde 30 €",
      variantId: 1947538,
    },
    {
      image: "ondasLargas" as ImageKey,
      title: "Mechas y balayage",
      text: "Luz natural y degradados suaves, adaptados a tu tono y a tu largo.",
      price: "desde 40 €",
      variantId: 1947511,
    },
  ],
};

export type WorkTag = "color" | "cortes" | "recogidos" | "trenzas";

export const workFilters: { id: WorkTag | "todo"; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "color", label: "Color y mechas" },
  { id: "cortes", label: "Cortes" },
  { id: "recogidos", label: "Recogidos" },
  { id: "trenzas", label: "Trenzas" },
];

export const works: { image: ImageKey; tag: WorkTag; title: string }[] = [
  { image: "ondasRubias", tag: "color", title: "Mechas rubias con ondas" },
  { image: "recogidoCobrizo", tag: "recogidos", title: "Recogido trenzado" },
  { image: "hombreColeta", tag: "cortes", title: "Undercut con coleta" },
  { image: "colorRojo", tag: "color", title: "Rojo intenso" },
  { image: "trenzasBoxeadoras", tag: "trenzas", title: "Trenzas boxeadoras" },
  { image: "lisoCastano", tag: "cortes", title: "Corte recto castaño" },
  { image: "semirecogido", tag: "recogidos", title: "Semirrecogido de fiesta" },
  { image: "bobRojo", tag: "color", title: "Bob fucsia" },
  { image: "ninoCorte", tag: "cortes", title: "Degradado infantil" },
  { image: "trenzasMono", tag: "trenzas", title: "Trenzas con moño" },
  { image: "melenaMechas", tag: "color", title: "Mechas caramelo" },
  { image: "pixiePlatino", tag: "cortes", title: "Pixie platino" },
  { image: "recogidoPlata", tag: "recogidos", title: "Recogido de novia" },
  { image: "lisoCaoba", tag: "color", title: "Caoba brillante" },
  { image: "hombreCorte", tag: "cortes", title: "Corte de caballero" },
  { image: "permanente", tag: "cortes", title: "Permanente" },
  { image: "recogidoInformal", tag: "recogidos", title: "Recogido desenfadado" },
  { image: "cortoRubio", tag: "cortes", title: "Corto texturizado" },
];

/** Reseñas reales de Booksy (clientas verificadas). Texto original con la puntuación mínimamente retocada; solo nombre de pila. */
export const reviews = [
  {
    name: "Raquel",
    service: "Color y peinado",
    date: "abril 2026",
    text: "Siempre me deja el pelo increíble, me aconseja y respeta mis decisiones. Con ella no te sientes ridícula al pedirle cambios o cosas distintas, y aparte estar allí con ella es como estar en tu casa con una amiga. No voy a otro sitio desde hace unos años por algo 🧡",
  },
  {
    name: "Daniela",
    service: "Lavar + cortar + peinar",
    date: "julio 2026",
    text: "Primera vez que voy con mi mamá y quedamos encantadas. Fui porque vi buenas valoraciones y confirmo que es una chica amable, atenta y muy segura de lo que hace. Salimos felices :) Gracias Bea, volveremos.",
  },
  {
    name: "Ángeles",
    service: "Color y peinado",
    date: "septiembre 2026",
    text: "Bea una gran profesional, cercana, amable y siempre te hace lo que le pides, la recomiendo.",
  },
  {
    name: "Adriana",
    service: "Lavar + cortar + peinar · Botox",
    date: "julio 2026",
    text: "Excelente, me ha encantado el corte y Bea es muy amable y agradable.",
  },
  {
    name: "Laura",
    service: "Lavar + peinar",
    date: "junio 2026",
    text: "Muy atenta, nos cuida y nos mima 😉",
  },
  {
    name: "Cris",
    service: "Tinte y lavar",
    date: "abril 2026",
    text: "Hace unas trencitas increíbles, entre otras cosas.",
  },
  {
    name: "Susana",
    service: "Color y peinado",
    date: "abril 2026",
    text: "Muy contenta con el trabajo de Bea, profesional y muy simpática.",
  },
  {
    name: "Nervis",
    service: "Color y peinado",
    date: "marzo 2026",
    text: "Excelente trabajo, buen trato, buenos productos. Estoy muy encantada con la peluquera.",
  },
];

export const faqs = [
  {
    q: "¿Cómo pido cita?",
    a: "Lo más cómodo es reservar en Booksy: eliges servicio, día y hora en un minuto y te llega la confirmación. También puedes llamar o escribir al 685 415 237.",
  },
  {
    q: "¿Cortáis el pelo a hombres y niños?",
    a: "Sí, es una peluquería unisex. Hay corte de caballero desde 12 € y corte de bebé (0 a 3 años) por 10 €. El salón está adaptado para niños.",
  },
  {
    q: "¿Por qué algunos precios son «desde»?",
    a: "Porque dependen del largo y de la cantidad de pelo. Bea te dice el precio exacto antes de empezar, sin sorpresas.",
  },
  {
    q: "¿Puedo pagar con tarjeta?",
    a: "Sí, se acepta pago con tarjeta además de efectivo.",
  },
  {
    q: "¿Usáis tintes sin químicos agresivos?",
    a: "Además de la coloración habitual, Bea ofrece tintes orgánicos y vegetales, con ingredientes de origen natural y más respetuosos con el pelo y el cuero cabelludo.",
  },
];
