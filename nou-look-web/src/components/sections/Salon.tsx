import Image from "next/image";
import { salon } from "@/content/sections";
import { images } from "@/content/images";
import blur from "@/content/blur.json";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";

const blurMap = blur as Record<string, string>;

/**
 * El salón: bloque editorial a sangre con el texto sobre la foto
 * y, debajo, banda negra de tres columnas con los principios del salón.
 */
export function Salon() {
  const img = images[salon.banner];
  const src = img.src ?? "";

  return (
    <section id="salon" aria-labelledby="salon-title">
      <div className="relative flex min-h-[38rem] items-end overflow-hidden bg-charcoal text-paper md:min-h-[44rem] lg:h-[88svh] lg:max-h-[54rem]">
        <Image
          src={src}
          alt={img.alt}
          fill
          sizes="100vw"
          placeholder={blurMap[src] ? "blur" : "empty"}
          blurDataURL={blurMap[src]}
          className="focal object-cover"
          style={
            {
              "--focal-d": img.focal.desktop,
              "--focal-m": img.focal.mobile ?? img.focal.desktop,
            } as React.CSSProperties
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5 md:bg-gradient-to-r md:from-ink/80 md:via-ink/35 md:to-transparent" />

        <div className="wrap relative z-10 pb-12 pt-40 md:pb-20">
          <div className="max-w-xl">
            <Reveal>
              <p className="kicker text-paper/85">{salon.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="salon-title" className="display display-lg mt-3 [text-wrap:balance]">
                {salon.title}
              </h2>
            </Reveal>
            {salon.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.14 + i * 0.06}>
                <p className="mt-4 text-paper/85">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#servicios" variant="light-ghost">
                Ver servicios
              </LinkButton>
              <BookButton variant="light" />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bg-ink text-paper">
        <ul className="wrap grid gap-10 py-14 text-center md:grid-cols-3 md:gap-8 md:py-16">
          {salon.principles.map((p, i) => (
            <Reveal key={p.title} as="li" delay={i * 0.08} className="mx-auto max-w-xs">
              <h3 className="shout shout-md">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] text-paper/75">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
