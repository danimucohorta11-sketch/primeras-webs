"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { works, worksIntro } from "@/content/sections";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/BookButton";

function ratioNumber(r: string) {
  const [w, h] = r.split("/").map((n) => parseFloat(n));
  return w / h;
}

/** Galería masonry editorial (columnas CSS, proporciones mixtas) con lightbox accesible. */
export function Works() {
  const [active, setActive] = useState<number | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setActive((i) => (i === null ? i : (i + dir + works.length) % works.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const current = active !== null ? images[works[active]] : null;

  return (
    <section id="trabajos" aria-labelledby="trabajos-title" className="section bg-cream">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow text-clay-deep">{worksIntro.eyebrow}</p>
            </Reveal>
            <h2 id="trabajos-title" className="display display-lg mt-5">
              <LineReveal lines={[worksIntro.title]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted">{worksIntro.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <LinkButton href={site.social.instagram.url} external>
              Ver Instagram {site.social.instagram.handle}
            </LinkButton>
          </Reveal>
        </div>

        <ul className="mt-12 columns-2 gap-3 md:mt-20 md:columns-3 md:gap-5 [&>li]:mb-3 md:[&>li]:mb-5">
          {works.map((key, i) => (
            <li key={key} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ampliar fotografía: ${images[key].alt}`}
                className="group relative block w-full cursor-zoom-in text-left"
              >
                <Photo name={key} sizes="(min-width: 768px) 30vw, 46vw" />
                <span className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/45 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow text-ivory">Ampliar</span>
                  <span className="display text-xl text-ivory">{String(i + 1).padStart(2, "0")}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <AnimatePresence>
          {active !== null && current && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/92"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-4 outline-none md:p-10"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Dialog.Title className="sr-only">{current.alt}</Dialog.Title>
                  <div
                    className="relative"
                    style={{ width: `min(92vw, calc(74svh * ${ratioNumber(current.ratio)}))` }}
                  >
                    <Photo key={current.id} name={works[active]} sizes="92vw" reveal={false} />
                  </div>

                  <div className="mt-5 flex w-full max-w-md items-center justify-between text-ivory">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Fotografía anterior"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/40 transition-colors hover:bg-ivory hover:text-ink"
                    >
                      <span aria-hidden>←</span>
                    </button>
                    <span className="eyebrow">
                      {active + 1} / {works.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Fotografía siguiente"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/40 transition-colors hover:bg-ivory hover:text-ink"
                    >
                      <span aria-hidden>→</span>
                    </button>
                  </div>

                  <Dialog.Close
                    aria-label="Cerrar galería"
                    className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-ink md:right-8 md:top-8"
                  >
                    <span aria-hidden>✕</span>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
