"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { categories, formatMinutes, formatPrice, minPrice, priceNote } from "@/content/services";
import { site } from "@/content/site";
import type { ImageKey } from "@/content/images";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { Arrow, BookButton } from "@/components/ui/Buttons";
import { ClockIcon } from "@/components/ui/Icons";

const categoryPhoto: Record<string, ImageKey> = {
  cortes: "lisoCastano",
  color: "melenaMechas",
  tratamientos: "recogidoJoya",
};

/** Carta de servicios por categorías (pestañas accesibles) con precios y duración de Booksy. */
export function Services() {
  const [active, setActive] = useState(categories[0].id);
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Columna fija */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow text-berry">Servicios y precios</p>
            </Reveal>
            <h2 id="servicios-title" className="display display-lg mt-5 text-wine-deep">
              <LineReveal lines={["Elige tu servicio,", "reserva en un minuto."]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted">
                Precios claros, sin sorpresas. Pulsa <strong className="font-semibold text-ink">Reservar</strong> en
                cualquier servicio y se abrirá directamente en Booksy con ese servicio seleccionado.
              </p>
            </Reveal>

            <div className="relative mt-10 hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Photo
                    name={categoryPhoto[cat.id]}
                    reveal={false}
                    ratio="5 / 4"
                    sizes="(min-width: 1024px) 36vw, 0px"
                    frameClassName="rounded-[2rem]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Carta */}
        <div className="lg:col-span-7">
          <div
            role="tablist"
            aria-label="Categorías de servicios"
            className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 sm:mx-0 sm:px-0"
          >
            {categories.map((c) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${c.id}`}
                  onClick={() => setActive(c.id)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[0.92rem] font-medium transition-colors duration-300 ${
                    selected
                      ? "border-wine text-cream"
                      : "border-[var(--line)] text-ink hover:border-wine/50"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-wine"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{c.title}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              role="tabpanel"
              id={`panel-${cat.id}`}
              aria-labelledby={`tab-${cat.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-7 text-muted">{cat.intro}</p>

              <ul className="mt-6 space-y-4">
                {cat.services.map((s) => (
                  <li
                    key={s.name}
                    className="group rounded-[1.5rem] border border-[var(--line)] bg-white/55 p-5 transition-[border-color,background-color,box-shadow] duration-500 hover:border-rose hover:bg-white hover:shadow-[0_20px_50px_-30px_rgba(74,20,36,0.35)] md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="display text-[1.5rem] text-wine-deep md:text-[1.75rem]">{s.name}</h3>
                        {s.note && <p className="mt-1.5 text-sm text-muted">{s.note}</p>}
                      </div>
                      <p className="shrink-0 text-right">
                        <span className="block text-[0.7rem] uppercase tracking-[0.14em] text-muted">desde</span>
                        <span className="display text-[1.6rem] text-red">{minPrice(s)} €</span>
                      </p>
                    </div>

                    <dl className="mt-4 divide-y divide-[var(--line)] border-t border-[var(--line)]">
                      {s.variants.map((v) => (
                        <div key={v.label} className="flex items-center gap-3 py-2.5 text-[0.95rem]">
                          <dt className="flex-1">{v.label}</dt>
                          <dd className="flex items-center gap-1.5 text-sm text-muted">
                            <ClockIcon className="h-3.5 w-3.5" />
                            <span className="sr-only">Duración:</span>
                            {formatMinutes(v.minutes)}
                          </dd>
                          <dd className="w-24 text-right font-semibold tabular-nums">{formatPrice(v)}</dd>
                        </div>
                      ))}
                    </dl>

                    {s.variantId && (
                      <a
                        href={site.booking.service(s.variantId)}
                        target="_blank"
                        rel="noopener"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-berry"
                        aria-label={`Reservar ${s.name} en Booksy`}
                      >
                        <span className="link-u">Reservar este servicio</span>
                        <Arrow />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 text-sm text-muted">{priceNote}</p>
          <div className="mt-8">
            <BookButton label="Ver disponibilidad en Booksy" />
          </div>
        </div>
      </div>
    </section>
  );
}
