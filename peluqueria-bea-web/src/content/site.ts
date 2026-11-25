/**
 * Datos del negocio. Fuente: ficha pública de Booksy (nombre, dirección, horario,
 * valoración, servicios) y el propio logotipo del salón (teléfono).
 * Lo que falta por confirmar con el salón está en docs/DATOS-PENDIENTES.md.
 */

const BOOKSY = "https://booksy.com/es-es/136847_peluqueria-bea_peluqueria_48852_badalona";

export const site = {
  name: "Peluquería Bea",
  shortName: "Bea",
  owner: "Beatriz",
  tagline: "Peluquería unisex en Badalona",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",

  phone: { display: "685 415 237", e164: "+34685415237" },
  /** Mismo móvil que el teléfono. Pendiente de confirmar que atienden WhatsApp. */
  whatsapp: {
    number: "34685415237",
    message: "¡Hola Bea! Me gustaría pedir cita 😊",
  },

  address: {
    street: "Av. de Catalunya, 89-91",
    postalCode: "08917",
    city: "Badalona",
    region: "Barcelona",
    country: "ES",
    geo: { lat: 41.45296, lng: 2.2299 },
  },

  booking: {
    url: BOOKSY,
    /** Abre directamente el servicio en el widget de Booksy. */
    service: (variantId: number) => `${BOOKSY}?do=open-widget&variantId=${variantId}`,
    reviewsUrl: `${BOOKSY}#reviews`,
  },

  rating: { value: 5, count: 64, source: "Booksy" },

  /** 0 = domingo … 6 = sábado. Horario publicado en Booksy. */
  hours: [
    { day: 1, label: "Lunes", spans: [] },
    { day: 2, label: "Martes", spans: [["09:15", "16:00"]] },
    { day: 3, label: "Miércoles", spans: [["09:15", "16:00"]] },
    { day: 4, label: "Jueves", spans: [["09:30", "19:00"]] },
    { day: 5, label: "Viernes", spans: [["10:30", "19:00"]] },
    { day: 6, label: "Sábado", spans: [["09:00", "12:00"]] },
    { day: 0, label: "Domingo", spans: [] },
  ] as { day: number; label: string; spans: [string, string][] }[],

  amenities: ["Pago con tarjeta", "Adaptado para niños", "Reserva online 24 h"],

  social: {
    instagram: { handle: "@unisexpeluqueriabea", url: "https://www.instagram.com/unisexpeluqueriabea/" },
  },
} as const;

export const nav = [
  { href: "#servicios", label: "Servicios y precios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#bea", label: "Conoce a Bea" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#visitanos", label: "Visítanos" },
] as const;

export const fullAddress = () =>
  `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Peluquería Bea, ${fullAddress()}`)}`;

export const whatsappUrl = () =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

const DAYS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const schemaDay = (d: number) => DAYS_SCHEMA[d];
