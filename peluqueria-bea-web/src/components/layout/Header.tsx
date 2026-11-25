"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { BookButton } from "@/components/ui/Buttons";
import { PhoneIcon, Stars } from "@/components/ui/Icons";

/** Cabecera fija: cinta superior con la valoración que se recoge al hacer scroll. */
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
        className={`grid bg-wine text-cream transition-[grid-template-rows] duration-500 ${
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <a
            href={site.booking.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="wrap flex h-9 items-center justify-center gap-2.5 text-[0.78rem]"
          >
            <Stars size={12} className="text-[#f4c27a]" />
            <span>
              <strong className="font-semibold">5,0</strong> · {site.rating.count} reseñas en Booksy
            </span>
            <span className="hidden opacity-70 sm:inline">· Reserva online las 24 h</span>
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-cream/90 backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
          scrolled ? "border-[var(--line)] shadow-[0_8px_30px_-18px_rgba(74,20,36,0.35)]" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <a href="#inicio" aria-label="Peluquería Bea, ir al inicio" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-u text-[0.88rem] font-medium">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={`tel:${site.phone.e164}`} className="flex items-center gap-2 text-[0.9rem] font-medium">
              <PhoneIcon className="h-4 w-4 text-berry" />
              {site.phone.display}
            </a>
            <BookButton small />
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
