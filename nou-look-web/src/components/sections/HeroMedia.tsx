"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import blur from "@/content/blur.json";

type Slide = { d: string; m: string };
const blurMap = blur as Record<string, string>;

/**
 * Fondo del hero: fundido cruzado + zoom lento (Ken Burns), a pantalla completa.
 * - Recortes distintos para escritorio y móvil con <picture> (art direction real).
 * - La primera escena carga con prioridad; las demás se montan después de que la
 *   página esté estable para no competir por ancho de banda con la primera.
 * - Cada escena tiene miniatura desenfocada: nunca se ve un hueco vacío.
 */
export function HeroMedia({ slides, active }: { slides: Slide[]; active: number }) {
  const [restReady, setRestReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRestReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal">
      {slides.map((s, i) => {
        if (i > 0 && !restReady) return null;
        const isActive = i === active;
        const common = { alt: "", fill: true, quality: 70, placeholder: "blur" as const };
        const {
          props: { srcSet: dSet },
        } = getImageProps({ ...common, src: s.d, sizes: "100vw", blurDataURL: blurMap[s.d] });
        const { props: mProps } = getImageProps({
          ...common,
          src: s.m,
          sizes: "100vw",
          blurDataURL: blurMap[s.m],
          priority: i === 0,
        });
        return (
          <div
            key={s.d}
            data-active={isActive}
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-[1600ms] ease-out data-[active=true]:opacity-100"
          >
            <div className={`absolute inset-0 ${isActive ? "kenburns" : ""}`}>
              <picture>
                <source media="(min-width: 768px)" srcSet={dSet} />
                <img {...mProps} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
            </div>
          </div>
        );
      })}
      {/* Velos para que el texto blanco se lea siempre sobre cualquier foto */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/30 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />
    </div>
  );
}

/** true si el usuario prefiere menos movimiento. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
