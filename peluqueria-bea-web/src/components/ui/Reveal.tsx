"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Entrada suave al hacer scroll (técnica de Motion Primitives: in-view + fade/translate). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/**
 * Titular que aparece línea a línea con máscara (inspirado en los text-reveal de React Bits).
 * El observador vive en el contenedor (no en las líneas, que están recortadas por overflow:hidden).
 */
export function LineReveal({
  lines,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: readonly string[];
  className?: string;
  delay?: number;
  /** true = anima al montar (hero); false = al entrar en pantalla */
  immediate?: boolean;
}) {
  return (
    <motion.span
      className={className}
      style={{ display: "block" }}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
          <motion.span
            style={{ display: "block" }}
            variants={{
              hidden: { y: "105%" },
              show: { y: 0, transition: { duration: 1.1, delay: delay + i * 0.12, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
