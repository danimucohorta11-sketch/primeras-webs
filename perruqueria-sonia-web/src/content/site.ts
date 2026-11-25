/**
 * Datos del negocio. Fuentes: ficha de Google Maps facilitada por el cliente
 * (nombre y ubicación) y directorio Peluquería de Chicas (dirección, teléfono, horario).
 * Pendientes en docs/DATOS-PENDIENTES.md.
 */

export const site = {
  name: "Perruqueria Sònia",
  fullName: "Perruqueria Sònia Unisex",
  owner: "Sònia",
  tagline: "Perruqueria unisex a Casagemes, Badalona",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",

  phone: { display: "633 50 31 45", e164: "+34633503145" },
  /** Mismo móvil que el teléfono. Pendiente de confirmar que atienden WhatsApp. */
  whatsapp: { number: "34633503145", message: "¡Hola Sònia! Me gustaría pedir cita 😊" },

  address: {
    street: "Carrer de l'Actriu Margarida Xirgu, 30",
    district: "Casagemes",
    postalCode: "08911",
    city: "Badalona",
    region: "Barcelona",
    country: "ES",
    geo: { lat: 41.4548562, lng: 2.2500098 },
  },

  mapsUrl:
    "https://www.google.com/maps/place/Perruqueria+S%C3%B2nia+Unisex/@41.4548562,2.2500098,17z/data=!4m6!3m5!1s0x12a4bbf62e4231cf:0xf9706c9c191dc5f7!8m2!3d41.4548562!4d2.2500098",

  /** 0 = domingo … 6 = sábado */
  hours: [
    { day: 1, label: "Lunes", spans: [] },
    { day: 2, label: "Martes", spans: [["09:00", "13:00"], ["15:00", "19:00"]] },
    { day: 3, label: "Miércoles", spans: [["09:00", "13:00"], ["15:00", "19:00"]] },
    { day: 4, label: "Jueves", spans: [["09:00", "13:00"], ["15:00", "19:00"]] },
    { day: 5, label: "Viernes", spans: [["09:00", "13:00"], ["15:00", "19:00"]] },
    { day: 6, label: "Sábado", spans: [["09:00", "14:00"]] },
    { day: 0, label: "Domingo", spans: [] },
  ] as { day: number; label: string; spans: [string, string][] }[],

  social: {
    instagram: { handle: "@soniaperruqueria", url: "https://www.instagram.com/soniaperruqueria/" },
  },
} as const;

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#ideas", label: "Ideas" },
  { href: "#visitanos", label: "Visítanos" },
] as const;

export const fullAddress = () =>
  `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const mapsUrl = () => site.mapsUrl;

export const whatsappUrl = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

const DAYS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const schemaDay = (d: number) => DAYS_SCHEMA[d];
