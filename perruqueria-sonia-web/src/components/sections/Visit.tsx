import { site, fullAddress, mapsUrl } from "@/content/site";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton, CallButton, LinkButton } from "@/components/ui/Buttons";
import { PinIcon, ClockIcon, InstagramIcon } from "@/components/ui/Icons";
import { HoursTable, OpenBadge } from "./OpenStatus";

/** Dirección, horario con estado en tiempo real y mapa. */
export function Visit() {
  const { lat, lng } = site.address.geo;
  const embed = `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=es&output=embed`;

  return (
    <section id="visitanos" aria-labelledby="visitanos-title" className="section bg-sand/60">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-peach">Visítanos</p>
            </Reveal>
            <h2 id="visitanos-title" className="display display-lg mt-5 text-forest">
              <LineReveal lines={["En el corazón", "de Casagemes."]} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <OpenBadge />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="rounded-[2rem] border border-[var(--line)] bg-paper p-7 md:p-10 lg:col-span-5">
            <div className="flex items-start gap-4">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-peach" />
              <div>
                <h3 className="font-semibold">Dirección</h3>
                <p className="mt-1 text-muted">
                  {fullAddress()}
                  <br />
                  Barrio de {site.address.district}
                </p>
                <a href={mapsUrl()} target="_blank" rel="noopener" className="link-u mt-2 inline-block text-sm font-semibold text-forest">
                  Cómo llegar
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-peach" />
              <div className="flex-1">
                <h3 className="font-semibold">Horario</h3>
                <div className="mt-2">
                  <HoursTable />
                </div>
                <p className="mt-3 text-xs text-muted">En festivos y vacaciones, confírmanos por WhatsApp.</p>
              </div>
            </div>

            <div className="mt-9 grid gap-3">
              <BookButton />
              <CallButton />
            </div>

            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener"
              className="mt-7 flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.social.instagram.handle}
            </a>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-sage lg:col-span-7">
            <iframe
              title={`Mapa: ${site.fullName}, ${fullAddress()}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto">
              <div className="pointer-events-auto rounded-2xl bg-paper/95 p-4 pr-6 shadow-lg backdrop-blur">
                <p className="display text-[1.9rem] italic leading-none text-forest">{site.fullName}</p>
                <p className="mt-1 text-sm text-muted">{fullAddress()}</p>
                <LinkButton href={mapsUrl()} external className="btn-sm mt-3">
                  Abrir en Google Maps
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
