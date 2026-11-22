import { site } from "@/content/site";

/**
 * Datos estructurados HairSalon solo con datos que constan públicamente.
 * Horario facilitado por el cliente. No se incluyen valoraciones, precios ni fecha de fundación (sin verificar).
 * `url` solo si NEXT_PUBLIC_SITE_URL está definido (dominio real).
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.legalDisplayName,
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: site.url } : {}),
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    ...(site.hours
      ? {
          openingHoursSpecification: site.hours.flatMap((h) =>
            h.spans.map(([opens, closes]) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: h.opens,
              opens,
              closes,
            })),
          ),
        }
      : {}),
    sameAs: [site.social.instagram.url, site.social.facebook.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
