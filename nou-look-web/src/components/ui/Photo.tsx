"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { images, type ImageKey } from "@/content/images";
import blur from "@/content/blur.json";

const SHOW_LABELS = process.env.NEXT_PUBLIC_HIDE_PLACEHOLDER_LABELS !== "1";

/**
 * Fotografía del manifiesto. Con `src` usa next/image (responsive, lazy, optimizada);
 * sin `src` pinta un marcador tonal provisional, claramente etiquetado.
 * El punto focal se mantiene por breakpoint con object-position.
 */
export function Photo({
  name,
  sizes,
  priority = false,
  reveal = true,
  ratio,
  className = "",
  rounded = "",
}: {
  name: ImageKey;
  sizes: string;
  priority?: boolean;
  reveal?: boolean;
  /** Anula la proporción del manifiesto (p. ej. "4 / 5"). */
  ratio?: string;
  className?: string;
  rounded?: string;
}) {
  const img = images[name];
  const style = {
    aspectRatio: ratio ?? img.ratio,
    ["--focal-d" as string]: img.focal.desktop,
    ["--focal-m" as string]: img.focal.mobile ?? img.focal.desktop,
  } as React.CSSProperties;

  const label = SHOW_LABELS && !img.src && (
    <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-ink/55 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur-sm">
      Foto provisional · {img.id}
    </span>
  );

  const inner = img.src ? (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={(blur as Record<string, string>)[img.src] ? "blur" : "empty"}
        blurDataURL={(blur as Record<string, string>)[img.src]}
        className="focal object-cover"
      />
      {label}
    </>
  ) : (
    <div className={`ph ph-${img.tone}`} role="img" aria-label={`${img.alt} (imagen provisional)`}>
      {label}
    </div>
  );

  const frame = (
    <div className={`zoom relative w-full overflow-hidden ${rounded}`} style={style}>
      {inner}
    </div>
  );

  if (!reveal) return <div className={className}>{frame}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {frame}
    </motion.div>
  );
}
