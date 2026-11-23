import { contactSection } from "@/content/sections";
import { site, fullAddress, mapsDirectionsUrl, mapsSearchUrl } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";

/** Contacto: panel negro redondeado con tarjetas de dirección, teléfono y horario. */
export function Contact() {
  const card = "rounded-md border border-paper/12 bg-paper/[0.04] p-5 md:p-6";

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="px-3 py-3 md:px-5 md:py-5">
      <div className="rounded-xl bg-ink text-paper">
        <div className="wrap py-14 md:py-20">
          <header className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="kicker text-paper/75">{contactSection.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="contacto-title" className="display display-lg mt-3">
                {contactSection.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-paper/75">{contactSection.text}</p>
            </Reveal>
          </header>

          <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:mt-14 md:grid-cols-[1fr_1fr_1.3fr] md:gap-4">
            <Reveal className={card}>
              <h3 className="text-[1.05rem] font-normal">Dirección</h3>
              <address className="mt-2 text-[0.92rem] not-italic text-paper/75">
                {site.address.street}
                <br />
                {site.address.city}
              </address>
              <p className="mt-4 text-[0.85rem]">
                <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="link-u">
                  Cómo llegar →
                </a>
              </p>
            </Reveal>

            <Reveal delay={0.06} className={card}>
              <h3 className="text-[1.05rem] font-normal">Teléfono y cita previa</h3>
              <p className="mt-2 text-[1.6rem] font-light">
                <a href={`tel:${site.phone.e164}`} className="link-u">
                  {site.phone.display}
                </a>
              </p>
              <p className="mt-2 text-[0.85rem] text-paper/70">{site.bookingNote}</p>
            </Reveal>

            <Reveal delay={0.12} className={card}>
              <h3 className="text-[1.05rem] font-normal">Horario</h3>
              {site.hours ? (
                <dl className="mt-2 space-y-1.5 text-[0.88rem]">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap justify-between gap-x-4">
                      <dt className="whitespace-nowrap text-paper/75">{h.days}</dt>
                      <dd className="whitespace-nowrap">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 text-[0.88rem] text-paper/75">Consulta el horario por teléfono.</p>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
            <LinkButton href={mapsSearchUrl()} variant="light-ghost" external>
              Ver en Google Maps
            </LinkButton>
            <BookButton variant="light" />
          </Reveal>
          <p className="sr-only">{fullAddress()}</p>
        </div>
      </div>
    </section>
  );
}
