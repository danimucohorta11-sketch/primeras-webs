"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { BookButton } from "@/components/ui/BookButton";

/** Header transparente sobre el hero que pasa a superficie sólida al desplazarse. */
export function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-ivory/92 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent text-ivory"
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between md:h-20">
        <a href="#inicio" aria-label="Nou Look, ir al inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-u text-[0.8rem] tracking-[0.04em]">
              {item.label}
            </a>
          ))}
          <BookButton variant={solid ? "primary" : "light"} className="!min-h-11 !px-6" />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
