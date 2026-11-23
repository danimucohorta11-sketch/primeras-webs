"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { BookButton } from "@/components/ui/BookButton";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Cabecera blanca y fija, de salón de moda:
 * - Escritorio: logotipo centrado, menú debajo y acciones a la derecha.
 *   Al desplazarse se compacta (desaparece la fila del menú y el logotipo se reduce).
 * - Móvil: menú a la izquierda, logotipo centrado y llamada directa a la derecha.
 */
export function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper/95 text-ink backdrop-blur-md transition-shadow duration-500 ${
        compact ? "shadow-[0_1px_0_var(--line)]" : ""
      }`}
    >
      {/* Barra superior con datos de contacto */}
      <div
        className={`hidden overflow-hidden bg-ink text-[0.78rem] text-paper/85 transition-[max-height] duration-500 lg:block ${
          compact ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="wrap flex h-9 items-center justify-between">
          <p>
            {site.tagline} · {site.address.street}, {site.address.city}
          </p>
          <p>
            Cita previa:{" "}
            <a href={`tel:${site.phone.e164}`} className="link-u text-paper">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>

      <div className="wrap relative grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Izquierda */}
        <div className="flex items-center">
          <MobileMenu />
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u hidden text-[0.85rem] lg:inline"
          >
            {site.social.instagram.handle}
          </a>
        </div>

        {/* Logotipo centrado */}
        <a
          href="#inicio"
          aria-label="Nou Look, ir al inicio"
          className={`flex justify-center transition-[padding] duration-500 ${compact ? "py-3" : "py-3 lg:py-5"}`}
        >
          <Logo />
        </a>

        {/* Derecha */}
        <div className="flex items-center justify-end gap-2">
          <a
            href={`tel:${site.phone.e164}`}
            className="hidden text-[0.85rem] xl:mr-3 xl:inline"
            aria-label={`Llamar al ${site.phone.display}`}
          >
            <span className="link-u">{site.phone.display}</span>
          </a>
          <a href="#contacto" className="btn btn-ghost btn-sm hidden lg:inline-flex">
            Cómo llegar
          </a>
          <BookButton small className="hidden lg:inline-flex" />
          <a
            href={`tel:${site.phone.e164}`}
            aria-label={`Llamar para pedir cita: ${site.phone.display}`}
            className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>

      {/* Menú principal centrado (solo escritorio) */}
      <nav
        aria-label="Principal"
        className={`hidden overflow-hidden transition-[max-height,opacity] duration-500 lg:block ${
          compact ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
        }`}
      >
        <ul className="flex items-center justify-center gap-9 pb-4 text-[0.92rem]">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-u" tabIndex={compact ? -1 : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
