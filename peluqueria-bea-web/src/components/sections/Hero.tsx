"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/sections";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { LineReveal } from "@/components/ui/Reveal";
import { BookButton, CallButton } from "@/components/ui/Buttons";
import { Stars } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero editorial: titular grande a la izquierda, collage de trabajos reales a la derecha. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-[8.5rem] md:pb-24 md:pt-[10.5rem]"
    >
      {/* halo rosado de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-[46rem] w-[46rem] rounded-full bg-blush blur-3xl"
      />

      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.p
            className="eyebrow flex items-center gap-3 text-berry"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="h-px w-8 bg-current" aria-hidden />
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="display display-xl mt-6 text-wine-deep">
            <LineReveal immediate delay={0.1} lines={hero.title.slice(0, 2)} />
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.34, ease }}
              >
                de <em className="text-red">ti.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-lg text-[1.06rem] text-muted md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            {hero.text}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease }}
          >
            <BookButton label="Reservar cita online" />
            <CallButton />
          </motion.div>

          <motion.a
            href={site.booking.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-cream/70 py-3 pl-3 pr-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <span className="display flex h-12 w-12 items-center justify-center rounded-xl bg-wine text-xl text-cream">
              5,0
            </span>
            <span className="flex flex-col text-sm leading-tight">
              <Stars size={14} className="text-[#e0a54a]" />
              <span className="mt-1 text-muted">
                <strong className="font-semibold text-ink">{site.rating.count} reseñas</strong> de clientas en Booksy
              </span>
            </span>
          </motion.a>
        </div>

        {/* Collage */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[34rem] pb-10 pl-8 sm:pl-16 lg:mr-0">
            <motion.div style={{ y: yBig }}>
              <Photo
                name="ondasLargas"
                priority
                reveal={false}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 34rem, 85vw"
                frameClassName="rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgba(74,20,36,0.55)]"
              />
            </motion.div>

            <motion.div
              style={{ y: ySmall }}
              className="absolute -bottom-2 left-0 w-[44%]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <Photo
                name="recogidoCobrizo"
                priority
                reveal={false}
                ratio="1 / 1"
                sizes="(min-width: 1024px) 15rem, 40vw"
                frameClassName="rounded-[1.5rem] border-[6px] border-cream shadow-xl"
              />
            </motion.div>

            {/* Sello giratorio */}
            <motion.div
              aria-hidden
              style={{ rotate }}
              className="absolute -right-2 top-6 hidden h-32 w-32 sm:block md:-right-6"
            >
              <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_24s_linear_infinite] text-wine">
                <defs>
                  <path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <circle cx="60" cy="60" r="59" fill="var(--cream)" />
                <text fontSize="10.5" letterSpacing="3.2" fill="currentColor" fontWeight="600">
                  <textPath href="#circ">PELUQUERÍA UNISEX · BADALONA · </textPath>
                </text>
              </svg>
              <span className="script absolute inset-0 flex items-center justify-center text-[2.6rem] text-red">
                Bea
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
