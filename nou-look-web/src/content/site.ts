/**
 * Datos del negocio. ÚNICO sitio donde cambiar teléfono, dirección, redes, etc.
 *
 * `verified` indica de dónde sale cada dato:
 *  - "public-snippet": leído en fragmentos públicos (bio de Instagram / buscador), NO contrastado con el salón.
 *  - "pending": no se ha podido obtener; hay que pedirlo al salón.
 * Ver docs/DATOS-PENDIENTES.md.
 */

export type Verification = "bio-instagram" | "public-snippet" | "pending";

export const site = {
  name: "Nou Look",
  legalDisplayName: "Nou Look Hair Salon",
  tagline: "Salón de peluquería unisex",
  /** Dominio público final. Se rellena con NEXT_PUBLIC_SITE_URL (ver .env.example). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",
  year: 2026,

  address: {
    street: "Av. Ramón y Cajal 36",
    city: "Tarragona",
    country: "ES",
    verified: "bio-instagram" as Verification,
  },

  phone: {
    display: "977 21 59 57",
    /** Formato internacional para enlaces tel: y datos estructurados. */
    e164: "+34977215957",
    verified: "bio-instagram" as Verification,
  },

  /** WhatsApp: no se ha podido confirmar que el salón lo use. No se enlaza. */
  whatsapp: null as null | { e164: string },

  social: {
    instagram: {
      handle: "@noulookhairsalon",
      url: "https://www.instagram.com/noulookhairsalon/",
    },
    facebook: {
      url: "https://www.facebook.com/NouLookUnisex",
    },
  },

  /** Horario facilitado por el cliente (imagen publicada en el destacado "Horario" de Instagram). */
  hours: [
    { days: "Lunes a miércoles", hours: "9:00–13:00 · 15:30–19:30", opens: ["Monday", "Tuesday", "Wednesday"], spans: [["09:00", "13:00"], ["15:30", "19:30"]] },
    { days: "Jueves y viernes", hours: "9:00–19:30", opens: ["Thursday", "Friday"], spans: [["09:00", "19:30"]] },
    { days: "Sábado", hours: "9:00–14:00", opens: ["Saturday"], spans: [["09:00", "14:00"]] },
  ] as { days: string; hours: string; opens: string[]; spans: string[][] }[] | null,

  /** Cita previa: hoy solo por teléfono (según la bio de Instagram). */
  bookingNote: "Cita previa por teléfono",
} as const;

export const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "El salón", href: "#salon" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nuestros trabajos", href: "#trabajos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export function fullAddress() {
  return `${site.address.street}, ${site.address.city}`;
}

export function mapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.legalDisplayName} ${fullAddress()}`,
  )}`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`;
}
