"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { BookButton, CallButton } from "@/components/ui/Buttons";
import { OpenBadge } from "./OpenStatus";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero a sangre: foto panorámica con parallax y titular editorial superpuesto. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  const line = (content: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-40 md:pb-20"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ y, scale }}>
        <Photo
          name="lavadoMasaje"
          priority
          reveal={false}
          ratio="auto"
          sizes="100vw"
          className="h-full"
          frameClassName="!h-full"
        />
      </motion.div>
      {/* velo para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,40,36,0.88)_0%,rgba(20,40,36,0.62)_38%,rgba(20,40,36,0.08)_72%)] max-md:bg-[linear-gradient(0deg,rgba(20,40,36,0.92)_0%,rgba(20,40,36,0.55)_55%,rgba(20,40,36,0.15)_100%)]"
      />

      <div className="wrap text-paper">
        <motion.p
          className="eyebrow flex items-center gap-3 text-peach-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="display display-xl mt-6 max-w-4xl">
          {line("Vienes como eres.", 0.1)}
          {line(
            <>
              Sales como <em className="text-peach-soft">quieres.</em>
            </>,
            0.22,
          )}
        </h1>

        <motion.p
          className="mt-7 max-w-lg text-[1.06rem] text-paper/85 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          {hero.text}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.58, ease }}
        >
          <BookButton variant="light" />
          <CallButton variant="light-ghost" />
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <OpenBadge dark />
        </motion.div>
      </div>
    </section>
  );
}
