import { contactSection } from "@/content/sections";
import { site, mapsDirectionsUrl, mapsSearchUrl } from "@/content/site";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-clay-deep">{contactSection.eyebrow}</p>
        </Reveal>
        <h2 id="contacto-title" className="display display-lg mt-5 max-w-4xl">
          <LineReveal lines={[contactSection.title]} />
        </h2>

        <div className="mt-14 grid gap-px border-y border-[var(--line)] md:mt-20 md:grid-cols-12">
          <Reveal className="py-8 md:col-span-5 md:border-r md:border-[var(--line)] md:py-12 md:pr-10">
            <h3 className="eyebrow text-muted">Dirección</h3>
            <address className="display display-md mt-4 not-italic">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
            <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
              <LinkButton href={mapsDirectionsUrl()} external>
                Cómo llegar
              </LinkButton>
              <LinkButton href={mapsSearchUrl()} external>
                Ver en Google Maps
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="border-t border-[var(--line)] py-8 md:col-span-3 md:border-r md:border-t-0 md:px-10 md:py-12">
            <h3 className="eyebrow text-muted">Teléfono</h3>
            <p className="display display-md mt-4">
              <a className="link-u" href={`tel:${site.phone.e164}`}>
                {site.phone.display}
              </a>
            </p>
            <p className="mt-3 text-sm text-muted">{site.bookingNote}</p>
          </Reveal>

          <Reveal delay={0.2} className="border-t border-[var(--line)] py-8 md:col-span-4 md:border-t-0 md:py-12 md:pl-10">
            <h3 className="eyebrow text-muted">Horario</h3>
            {site.hours ? (
              <dl className="mt-4 space-y-2">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6">
                    <dt>{h.days}</dt>
                    <dd className="text-muted">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-muted">
                Consulta el horario llamando al{" "}
                <a className="link-u text-ink" href={`tel:${site.phone.e164}`}>
                  {site.phone.display}
                </a>
                .
              </p>
            )}
            <p className="mt-8 text-sm">
              <a className="link-u" href={site.social.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram {site.social.instagram.handle}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <BookButton />
        </Reveal>
      </div>
    </section>
  );
}
