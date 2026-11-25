import Link from "next/link";
import { nav, site, fullAddress, mapsUrl, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramIcon, Stars } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="grain bg-wine-deep pb-28 pt-16 text-cream md:pb-12 md:pt-20">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" className="[&>span:last-child]:text-[3.4rem]" />
            <p className="mt-5 max-w-xs text-sm text-cream/70">
              {site.tagline}. Color, mechas, keratina, cortes, trenzas y recogidos para toda la familia.
            </p>
            <a
              href={site.booking.reviewsUrl}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-3 text-sm"
            >
              <Stars size={14} className="text-[#f4c27a]" />
              5,0 · {site.rating.count} reseñas en Booksy
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-[#f3b8b0]">Contacto</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/85">
              <li>
                <a href={mapsUrl()} target="_blank" rel="noopener" className="link-u">
                  {fullAddress()}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.e164}`} className="link-u">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="link-u">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.social.instagram.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2">
                  <InstagramIcon className="h-4 w-4" />
                  <span className="link-u">{site.social.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-[#f3b8b0]">Horario</h3>
            <ul className="mt-5 space-y-1.5 text-sm text-cream/85">
              {site.hours
                .filter((h) => h.spans.length)
                .map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 tabular-nums">
                    <span>{h.label}</span>
                    <span>{h.spans.map(([a, b]) => `${a}–${b}`).join(", ")}</span>
                  </li>
                ))}
              <li className="flex justify-between gap-4 text-cream/55">
                <span>Domingo y lunes</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-2">
            <h3 className="eyebrow text-[#f3b8b0]">Navegar</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/85">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`/${n.href}`} className="link-u">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.name} · {site.address.city}
          </p>
          <p className="flex gap-5">
            <Link href="/legal" className="link-u">
              Aviso legal y privacidad
            </Link>
            <a href={site.booking.url} target="_blank" rel="noopener" className="link-u">
              Reservas en Booksy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
