"use client";

import { useEffect, useState } from "react";
import { hero, heroSlides } from "@/content/sections";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";
import { HeroMedia, usePrefersReducedMotion } from "./HeroMedia";

const AUTOPLAY_MS = 5600;

/**
 * Hero a pantalla completa con fotografía en movimiento desde el primer segundo:
 * fundido cruzado entre escenas + zoom lento. Sin vídeo (ligero) y sin nada ligado al scroll.
 * Escritorio y móvil usan recortes distintos de cada foto.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const n = heroSlides.length;

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reduced, n]);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-ivory"
    >
      <HeroMedia slides={heroSlides} active={active} />

      <div className="wrap relative z-10 pb-24 pt-32 md:pb-28">
        <Reveal>
          <p className="eyebrow text-ivory/85">{hero.eyebrow}</p>
        </Reveal>
        <h1 id="hero-title" className="display display-xl mt-5 max-w-[11ch] md:mt-7 md:max-w-none">
          <LineReveal lines={hero.titleLines} delay={0.2} immediate />
        </h1>
        <Reveal delay={0.75}>
          <p className="mt-6 max-w-md text-[1.05rem] text-ivory/85 md:mt-8 md:text-lg">{hero.subtitle}</p>
        </Reveal>
        <Reveal delay={0.9} className="mt-8 flex flex-col gap-3 min-[480px]:flex-row md:mt-10">
          <BookButton variant="light" />
          <LinkButton href="#salon" variant="light-ghost">
            Descubrir el salón
          </LinkButton>
        </Reveal>
      </div>

      {/* Indicador de escenas */}
      <ol
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-10 md:left-auto md:right-[var(--gutter)] md:translate-x-0"
        aria-hidden
      >
        {heroSlides.map((s, i) => (
          <li key={s.d}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setActive(i)}
              className="block h-6 w-10 py-[11px]"
              aria-label={`Escena ${i + 1}`}
            >
              <span className="block h-px w-full overflow-hidden bg-ivory/35">
                <span
                  key={i === active ? `a${active}` : `i${i}`}
                  className={`block h-full origin-left bg-ivory ${i === active && !reduced ? "progress" : ""}`}
                  style={i === active && reduced ? undefined : i < active ? { transform: "scaleX(1)" } : i === active ? undefined : { transform: "scaleX(0)" }}
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
