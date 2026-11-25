import { site, schemaDay } from "@/content/site";
import { categories } from "@/content/services";

/** Datos estructurados HairSalon con los datos públicos de Booksy. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.name,
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: site.url } : {}),
    telephone: site.phone.e164,
    image: `${site.url}/images/bea.webp`,
    priceRange: "10 € – 170 €",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    openingHoursSpecification: site.hours.flatMap((h) =>
      h.spans.map(([opens, closes]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaDay(h.day),
        opens,
        closes,
      })),
    ),
    makesOffer: categories.flatMap((c) =>
      c.services.map((s) => ({
        "@type": "Offer",
        name: s.name,
        priceCurrency: "EUR",
        price: Math.min(...s.variants.map((v) => v.price)),
      })),
    ),
    potentialAction: { "@type": "ReserveAction", target: site.booking.url },
    sameAs: [site.social.instagram.url, site.booking.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
