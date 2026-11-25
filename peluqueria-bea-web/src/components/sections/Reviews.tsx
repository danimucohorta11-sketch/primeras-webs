"use client";

import { useRef } from "react";
import { reviews } from "@/content/sections";
import { site } from "@/content/site";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Buttons";
import { Stars } from "@/components/ui/Icons";

/** Opiniones verificadas de Booksy: resumen de valoración + tarjetas desplazables. */
export function Reviews() {
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * Math.min(rail.current.clientWidth * 0.8, 420), behavior: "smooth" });

  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="section overflow-hidden">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-berry">Opiniones</p>
          </Reveal>
          <h2 id="opiniones-title" className="display display-lg mt-5 text-wine-deep">
            <LineReveal lines={["64 reseñas.", "Todas de cinco estrellas."]} />
          </h2>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="flex items-center gap-6 rounded-[1.75rem] bg-blush p-6 md:p-7">
            <span className="display text-[4.2rem] leading-none text-wine">5,0</span>
            <div>
              <Stars size={20} className="text-[#e0a54a]" />
              <p className="mt-2 text-sm text-muted">
                Media de {site.rating.count} reseñas de clientas verificadas en {site.rating.source}.
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-rose">
                <div className="h-full w-full rounded-full bg-wine" />
              </div>
              <p className="mt-1.5 text-xs text-muted">5 estrellas: {site.rating.count} de {site.rating.count}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <ul
        ref={rail}
        className="no-scrollbar wrap mt-12 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto pb-4 md:gap-6"
        aria-label="Reseñas de clientas"
      >
        {reviews.map((r, i) => (
          <Reveal
            key={r.name}
            as="li"
            delay={Math.min(i, 4) * 0.06}
            className="flex w-[82%] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] border border-[var(--line)] bg-white/70 p-7 sm:w-[24rem] md:p-8"
          >
            <div>
              <Stars size={15} className="text-[#e0a54a]" />
              <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-ink">“{r.text}”</blockquote>
            </div>
            <footer className="mt-7 flex items-center gap-3 border-t border-[var(--line)] pt-5">
              <span
                aria-hidden
                className="display flex h-11 w-11 items-center justify-center rounded-full bg-wine text-lg text-cream"
              >
                {r.name[0]}
              </span>
              <span className="text-sm leading-tight">
                <strong className="block font-semibold">{r.name}</strong>
                <span className="text-muted">
                  {r.service} · {r.date}
                </span>
              </span>
            </footer>
          </Reveal>
        ))}
      </ul>

      <div className="wrap mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d < 0 ? "Reseñas anteriores" : "Más reseñas"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-wine hover:bg-wine hover:text-cream"
              >
                <span aria-hidden>{d < 0 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">Reseñas de clientas verificadas en Booksy.</p>
        </div>
        <LinkButton href={site.booking.reviewsUrl} external>
          Leer todas en Booksy
        </LinkButton>
      </div>
    </section>
  );
}
