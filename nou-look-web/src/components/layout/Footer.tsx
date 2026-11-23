import { nav, site } from "@/content/site";

function SocialIcon({ kind }: { kind: "instagram" | "facebook" }) {
  return kind === "instagram" ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
    </svg>
  );
}

/** Pie negro: columnas de enlaces y datos, y el nombre del salón a gran tamaño. */
export function Footer() {
  const col = "text-[0.78rem] font-medium uppercase tracking-[0.16em] font-[family-name:var(--font-display)]";
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap pt-16 md:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Pie de página">
            <h2 className={col}>Nou Look</h2>
            <ul className="mt-5 space-y-2.5 text-[0.92rem] text-paper/85">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={col}>El salón</h2>
            <address className="mt-5 space-y-2.5 text-[0.92rem] not-italic text-paper/85">
              <p>
                {site.address.street}
                <br />
                {site.address.city}
              </p>
              <p>
                <a className="hover:underline" href={`tel:${site.phone.e164}`}>
                  {site.phone.display}
                </a>
              </p>
              <p>{site.bookingNote}</p>
            </address>
          </div>

          <div>
            <h2 className={col}>Horario</h2>
            {site.hours && (
              <dl className="mt-5 space-y-2.5 text-[0.92rem] text-paper/85">
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd className="text-paper/60">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div>
            <h2 className={col}>Síguenos</h2>
            <ul className="mt-5 flex gap-4">
              <li>
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Nou Look"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
                >
                  <SocialIcon kind="instagram" />
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Nou Look"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
                >
                  <SocialIcon kind="facebook" />
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[0.92rem]">
              <a className="text-paper/85 hover:underline" href="/legal">
                Aviso legal y privacidad
              </a>
            </p>
          </div>
        </div>

        {/* Nombre a gran tamaño */}
        <div className="mt-16 select-none md:mt-24" aria-hidden>
          {/* Tamaño calculado para ocupar todo el ancho útil en una sola línea */}
          <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-[calc((min(100vw,88rem)-2*var(--gutter))/5.62)] font-medium uppercase leading-[0.8] tracking-[0.04em]">
            Nou Look
          </p>
          <p className="mt-[0.4em] whitespace-nowrap text-[calc((min(100vw,88rem)-2*var(--gutter))/15)] font-extralight leading-none tracking-[0.01em]">
            hair salon
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/15 py-6 text-[0.8rem] text-paper/55 md:flex-row md:justify-between">
          <p>
            © {site.year} {site.legalDisplayName}
          </p>
          <p>{site.tagline} en {site.address.city}</p>
        </div>
      </div>
    </footer>
  );
}
