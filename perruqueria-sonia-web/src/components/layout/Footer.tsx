import Link from "next/link";
import { nav, site, fullAddress, mapsUrl, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="grain bg-forest-deep pb-28 pt-16 text-paper md:pb-12 md:pt-20">
      <div className="wrap">
        <p className="display max-w-3xl text-[2.6rem] leading-[1.02] md:text-[4rem]">
          Vienes como eres. <em className="text-peach-soft">Sales como quieres.</em>
        </p>
        <div className="mt-14 grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm text-paper/70">{site.tagline}. Cortes, color, mechas y peinados para mujer y hombre.</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-peach-soft">Contacto</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/85">
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
            <h3 className="eyebrow text-peach-soft">Horario</h3>
            <ul className="mt-5 space-y-1.5 text-sm text-paper/85">
              {site.hours
                .filter((h) => h.spans.length)
                .map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 tabular-nums">
                    <span>{h.label}</span>
                    <span>{h.spans.map(([a, b]) => `${a}–${b}`).join(" · ")}</span>
                  </li>
                ))}
              <li className="flex justify-between gap-4 text-paper/55">
                <span>Domingo y lunes</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-2">
            <h3 className="eyebrow text-peach-soft">Navegar</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/85">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.fullName} · {site.address.city}
          </p>
          <p className="flex gap-5">
            <Link href="/legal" className="link-u">
              Aviso legal y privacidad
            </Link>
            <span>Fotos: Pexels</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
