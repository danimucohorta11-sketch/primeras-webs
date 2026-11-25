/**
 * Carta de servicios y precios tal como figura en Booksy (noviembre 2026).
 * `from: true` = Booksy lo marca con "+", el precio final depende del pelo.
 * `variantId` = abre ese servicio directamente en el widget de reserva.
 */

export type Variant = { label: string; price: number; from?: boolean; minutes: number };
export type Service = {
  name: string;
  note?: string;
  variantId?: number;
  variants: Variant[];
};
export type Category = { id: string; title: string; intro: string; services: Service[] };

export const categories: Category[] = [
  {
    id: "cortes",
    title: "Cortes y peinados",
    intro: "Para ella, para él y para los peques de la casa.",
    services: [
      {
        name: "Lavar + cortar + peinar",
        variantId: 2372328,
        variants: [
          { label: "Melena corta", price: 28, minutes: 30 },
          { label: "Media melena", price: 32, from: true, minutes: 35 },
          { label: "Melena larga", price: 38, minutes: 35 },
        ],
      },
      {
        name: "Lavar y cortar (sin peinar)",
        variantId: 2372336,
        variants: [
          { label: "Melena corta", price: 15, from: true, minutes: 20 },
          { label: "Media melena o larga", price: 18, from: true, minutes: 30 },
        ],
      },
      {
        name: "Lavar + peinar",
        variantId: 2372339,
        variants: [
          { label: "Pelo corto", price: 18, from: true, minutes: 25 },
          { label: "Media melena", price: 24, minutes: 40 },
          { label: "Melena larga", price: 31, from: true, minutes: 30 },
        ],
      },
      {
        name: "Corte chico",
        variantId: 1947507,
        variants: [{ label: "Corte de caballero", price: 12, minutes: 30 }],
      },
      {
        name: "Corte bebé",
        variantId: 1947537,
        variants: [{ label: "De 0 a 3 años", price: 10, minutes: 30 }],
      },
      {
        name: "Trenzas boxeadoras",
        variantId: 1947549,
        variants: [{ label: "Según número de trenzas", price: 20, from: true, minutes: 30 }],
      },
    ],
  },
  {
    id: "color",
    title: "Color y mechas",
    intro: "Tintes, mechas y balayage. Ahora también tintes orgánicos y vegetales.",
    services: [
      {
        name: "Color y peinado",
        note: "Si además quieres corte, resérvalo también.",
        variantId: 1947521,
        variants: [
          { label: "Melena corta", price: 30, from: true, minutes: 85 },
          { label: "Media melena", price: 38, from: true, minutes: 90 },
          { label: "Melena larga", price: 43, from: true, minutes: 95 },
        ],
      },
      {
        name: "Mechas y peinado",
        variantId: 1947511,
        variants: [
          { label: "Melena corta", price: 40, from: true, minutes: 70 },
          { label: "Media melena", price: 72, from: true, minutes: 90 },
          { label: "Melena larga", price: 85, from: true, minutes: 100 },
        ],
      },
      {
        name: "Color + mechas + peinado",
        variantId: 1966327,
        note: "Varía según la cantidad de mechas y el largo.",
        variants: [
          { label: "Melena corta", price: 56, from: true, minutes: 65 },
          { label: "Media melena", price: 83, from: true, minutes: 90 },
          { label: "Melena larga", price: 91, from: true, minutes: 105 },
        ],
      },
      {
        name: "Tinte y lavar (sin peinar)",
        variantId: 1956417,
        variants: [
          { label: "Melena corta", price: 22, minutes: 35 },
          { label: "Media melena", price: 24, from: true, minutes: 45 },
          { label: "Melena larga", price: 28, from: true, minutes: 45 },
        ],
      },
    ],
  },
  {
    id: "tratamientos",
    title: "Tratamientos y recogidos",
    intro: "Keratina, botox capilar, permanente y peinados para tus días especiales.",
    services: [
      {
        name: "Alisado de keratina",
        note: "Si además quieres corte, resérvalo también.",
        variantId: 1947530,
        variants: [
          { label: "Melena corta", price: 130, from: true, minutes: 150 },
          { label: "Media melena", price: 150, from: true, minutes: 150 },
          { label: "Melena larga", price: 170, from: true, minutes: 180 },
        ],
      },
      {
        name: "Tratamiento botox",
        variantId: 1947543,
        note: "Reserva también el lavado y peinado.",
        variants: [
          { label: "Media melena", price: 15, from: true, minutes: 30 },
          { label: "Melena larga", price: 18, from: true, minutes: 35 },
        ],
      },
      {
        name: "Recogidos",
        variantId: 1947538,
        variants: [
          { label: "Semirrecogido (sin peinado)", price: 30, from: true, minutes: 30 },
          { label: "Recogido completo", price: 45, from: true, minutes: 40 },
        ],
      },
      {
        name: "Permanente",
        variantId: 1947544,
        note: "Si además quieres corte, resérvalo también.",
        variants: [
          { label: "Melena corta", price: 38, from: true, minutes: 60 },
          { label: "Media melena", price: 42, minutes: 60 },
          { label: "Melena larga", price: 45, from: true, minutes: 90 },
        ],
      },
    ],
  },
];

export const priceNote =
  "Precios orientativos publicados en Booksy. El precio final puede variar según el largo y la cantidad de pelo; Bea te lo confirma antes de empezar.";

export const formatPrice = (v: Variant) => `${v.from ? "desde " : ""}${v.price} €`;

export const formatMinutes = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r} min`;
  return r ? `${h} h ${r} min` : `${h} h`;
};

export const minPrice = (s: Service) => Math.min(...s.variants.map((v) => v.price));
