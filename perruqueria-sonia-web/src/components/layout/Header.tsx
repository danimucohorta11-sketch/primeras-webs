"use client";

import { useEffect, useState } from "react";
import { nav, site, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { BookButton } from "@/components/ui/Buttons";
import { PhoneIcon } from "@/components/ui/Icons";

/** Cabecera fija con cinta superior (cita y barrio) que se recoge al hacer scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`grid bg-forest text-paper transition-[grid-template-rows] duration-500 ${
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="wrap flex h-9 items-center justify-center gap-2 text-[0.78rem]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-peach-soft" aria-hidden />
            Cita previa por WhatsApp o teléfono · <strong className="font-semibold">{site.phone.display}</strong>
            <span className="hidden opacity-70 sm:inline">· Casagemes, Badalona</span>
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-paper/90 backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
          scrolled ? "border-[var(--line)] shadow-[0_8px_30px_-18px_rgba(20,40,36,0.35)]" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <a href="#inicio" aria-label="Perruqueria Sònia, ir al inicio" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-u text-[0.9rem] font-medium">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={`tel:${site.phone.e164}`} className="flex items-center gap-2 text-[0.9rem] font-medium">
              <PhoneIcon className="h-4 w-4 text-peach" />
              {site.phone.display}
            </a>
            <BookButton small label="Pedir cita" />
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
