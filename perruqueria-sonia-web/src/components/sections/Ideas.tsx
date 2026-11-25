"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ideas as works, ideaFilters as workFilters, type IdeaTag as WorkTag } from "@/content/sections";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Buttons";
import { InstagramIcon } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

const ratioOf = (r: string) => {
  const [w, h] = r.split("/").map((n) => parseFloat(n));
  return w / h;
};


/** Galería de ideas (fotos de referencia) con filtros y visor accesible. */
export function Ideas() {
  const [filter, setFilter] = useState<WorkTag | "todo">("todo");
  const [active, setActive] = useState<number | null>(null);

  const list = useMemo(() => (filter === "todo" ? works : works.filter((w) => w.tag === filter)), [filter]);

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + list.length) % list.length)),
    [list.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const current = active !== null ? list[active] : null;

  return (
    <section id="ideas" aria-labelledby="ideas-title" className="section bg-sand/60">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-peach">Ideas para tu próximo look</p>
            </Reveal>
            <h2 id="ideas-title" className="display display-lg mt-5 text-forest">
              <LineReveal lines={["¿Te inspira?", "Lo hablamos."]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted">
                Trae una foto o elige una de estas y te decimos cómo adaptarla a tu pelo. Para ver nuestros trabajos, síguenos en Instagram.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <LinkButton href={site.social.instagram.url} external>
              <InstagramIcon className="h-4 w-4" />
              Ver Instagram
            </LinkButton>
          </Reveal>
        </div>

        <div
          className="no-scrollbar -mx-[var(--gutter)] mt-10 flex gap-2 overflow-x-auto px-[var(--gutter)] sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filtrar ideas"
        >
          {workFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                filter === f.id ? "border-ink bg-ink text-paper" : "border-[var(--line)] hover:border-ink/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 ">
            <AnimatePresence initial={false}>
              {list.map((w, i) => (
                <motion.li
                  key={w.image}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease }}
                  
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ampliar: ${w.title}`}
                    className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] text-left md:rounded-[1.5rem]"
                  >
                    <Photo
                      name={w.image}
                      reveal={false}
                      ratio="3 / 4"
                      sizes="(min-width: 768px) 23vw, 46vw"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-4 pt-12 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      <span className="text-sm font-medium text-paper">{w.title}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        <p className="mt-5 text-xs text-muted">Fotografías de referencia (banco de imágenes), no son trabajos del salón.</p>
      </div>

      <Dialog.Root open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <AnimatePresence>
          {current && active !== null && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-sm"
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
                  transition={{ duration: 0.4, ease }}
                >
                  <Dialog.Title className="sr-only">{current.title}</Dialog.Title>
                  <div
                    className="relative"
                    style={{ width: `min(92vw, calc(72svh * ${ratioOf(images[current.image].ratio)}))` }}
                  >
                    <Photo
                      key={current.image}
                      name={current.image}
                      reveal={false}
                      ratio={images[current.image].ratio}
                      sizes="92vw"
                      frameClassName="rounded-[1.25rem]"
                    />
                  </div>

                  <div className="mt-5 flex w-full max-w-md items-center justify-between text-paper">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Foto anterior"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 transition-colors hover:bg-paper hover:text-ink"
                    >
                      <span aria-hidden>←</span>
                    </button>
                    <span className="text-center text-sm">
                      <span className="block font-medium">{current.title}</span>
                      <span className="text-paper/60">
                        {active + 1} / {list.length}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Foto siguiente"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 transition-colors hover:bg-paper hover:text-ink"
                    >
                      <span aria-hidden>→</span>
                    </button>
                  </div>

                  <Dialog.Close
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink md:right-8 md:top-8"
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
