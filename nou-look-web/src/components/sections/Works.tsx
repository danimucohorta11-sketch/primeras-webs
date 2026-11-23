"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { works, worksIntro } from "@/content/sections";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/BookButton";

function ratioNumber(r: string) {
  const [w, h] = r.split("/").map((n) => parseFloat(n));
  return w / h;
}

/** Galería en rejilla (una pieza grande + cuatro pequeñas) con lightbox accesible. */
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
        <header className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="kicker">{worksIntro.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="trabajos-title" className="display display-lg mt-3">
              {worksIntro.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-muted">{worksIntro.text}</p>
          </Reveal>
        </header>

        {/* Una pieza grande a la izquierda y cuatro pequeñas en rejilla 2×2 */}
        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {works.map((key, i) => (
            <li key={key} className={i === 0 ? "col-span-2 md:row-span-2" : ""}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ampliar fotografía: ${images[key].alt}`}
                className="group block h-full w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper text-left"
              >
                <div className="relative">
                  <Photo
                    name={key}
                    ratio={i === 0 ? "6 / 5" : "4 / 3"}
                    sizes={i === 0 ? "(min-width: 768px) 46vw, 92vw" : "(min-width: 768px) 23vw, 46vw"}
                  />
                </div>
                <span className="flex items-center justify-between gap-3 px-4 py-3 text-[0.88rem] md:py-3.5">
                  <span className="line-clamp-1">{images[key].alt}</span>
                  <span aria-hidden className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center">
          <LinkButton href={site.social.instagram.url} external>
            {worksIntro.instagramCta}
          </LinkButton>
        </Reveal>
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
