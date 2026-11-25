"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { images, type ImageKey } from "@/content/images";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/**
 * Fotografía del manifiesto con next/image (responsive, lazy, optimizada),
 * miniatura desenfocada mientras carga y revelado con máscara al entrar en pantalla.
 */
export function Photo({
  name,
  sizes,
  priority = false,
  reveal = true,
  ratio,
  className = "",
  frameClassName = "",
}: {
  name: ImageKey;
  sizes: string;
  priority?: boolean;
  reveal?: boolean;
  /** Proporción de la caja (p. ej. "4 / 5"); por defecto la de la foto. */
  ratio?: string;
  className?: string;
  frameClassName?: string;
}) {
  const img = images[name];
  const frame = (
    <div
      className={`zoom relative w-full overflow-hidden bg-sand ${frameClassName}`}
      style={{ aspectRatio: ratio ?? img.ratio }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={blurMap[img.src] ? "blur" : "empty"}
        blurDataURL={blurMap[img.src]}
        className="object-cover"
        style={{ objectPosition: img.focal ?? "50% 50%" }}
      />
    </div>
  );

  if (!reveal) return <div className={className}>{frame}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {frame}
    </motion.div>
  );
}
