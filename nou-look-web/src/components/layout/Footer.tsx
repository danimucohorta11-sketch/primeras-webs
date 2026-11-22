import { nav, site, fullAddress } from "@/content/site";
import { Logo } from "./Logo";
import { BookButton } from "@/components/ui/BookButton";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="wrap pb-10 pt-16 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-ivory" />
            <p className="display display-md mt-8 max-w-sm !leading-[1.05] text-ivory/90">
              Un look nuevo, siempre tuyo.
            </p>
            <div className="mt-8">
              <BookButton variant="light" />
            </div>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <h2 className="eyebrow text-ivory/55">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-u">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-ivory/55">El salón</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p>
                {site.address.street}
                <br />
                {site.address.city}
              </p>
              <p>
                <a className="link-u" href={`tel:${site.phone.e164}`}>
                  {site.phone.display}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2">
                <a className="link-u" href={site.social.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a className="link-u" href={site.social.facebook.url} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.year} {site.legalDisplayName} · {fullAddress()}
          </p>
          <p>
            <a className="link-u" href="/legal">
              Aviso legal y privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
