"use client";

import { useEffect, useState } from "react";
import { hero, heroSlides } from "@/content/sections";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";
import { HeroMedia, usePrefersReducedMotion } from "./HeroMedia";

const AUTOPLAY_MS = 5600;

/**
 * Hero editorial: fotografía a sangre bajo la cabecera, texto centrado en blanco,
 * dos botones en píldora y una línea de datos reales. Las escenas rotan con fundido.
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
      className="relative flex h-[calc(88svh-64px)] min-h-[34rem] items-center justify-center overflow-hidden bg-charcoal text-paper lg:h-[calc(100svh-162px)] lg:max-h-[52rem] lg:min-h-[36rem]"
    >
      <HeroMedia slides={heroSlides} active={active} />

      <div className="wrap relative z-10 flex flex-col items-center text-center">
        <Reveal y={12}>
          <p className="kicker text-paper/90">{hero.eyebrow}</p>
        </Reveal>
        <Reveal y={18} delay={0.1}>
          <h1 id="hero-title" className="display display-xl mt-4 max-w-[14ch] [text-wrap:balance]">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal y={14} delay={0.25}>
          <p className="mx-auto mt-5 max-w-md text-[1.02rem] text-paper/90 md:text-lg">{hero.subtitle}</p>
        </Reveal>
        <Reveal y={10} delay={0.4} className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="#salon" variant="light-ghost">
            Descubre el salón
          </LinkButton>
          <BookButton variant="light" />
        </Reveal>
        <Reveal y={8} delay={0.55}>
          <p className="mt-6 text-[0.82rem] text-paper/80">{hero.footnote}</p>
        </Reveal>
      </div>

      {/* Indicador de escenas */}
      <ol className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" aria-hidden>
        {heroSlides.map((s, i) => (
          <li key={s.d}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setActive(i)}
              className="block h-6 w-8 py-[11px]"
              aria-label={`Escena ${i + 1}`}
            >
              <span className="block h-[2px] w-full overflow-hidden rounded-full bg-paper/35">
                <span
                  key={i === active ? `a${active}` : `i${i}`}
                  className={`block h-full origin-left bg-paper ${i === active && !reduced ? "progress" : ""}`}
                  style={
                    i === active && reduced
                      ? undefined
                      : i < active
                        ? { transform: "scaleX(1)" }
                        : i === active
                          ? undefined
                          : { transform: "scaleX(0)" }
                  }
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
