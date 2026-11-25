import { site, schemaDay } from "@/content/site";

/** Datos estructurados HairSalon con los datos públicos verificados. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.fullName,
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: site.url } : {}),
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: site.hours.flatMap((h) =>
      h.spans.map(([opens, closes]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaDay(h.day),
        opens,
        closes,
      })),
    ),
    sameAs: [site.social.instagram.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
