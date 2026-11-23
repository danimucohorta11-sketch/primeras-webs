import { experience } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/BookButton";

/**
 * Experiencia: mosaico 2×2 de fotografías a la izquierda y panel oscuro
 * con frase de impacto en mayúsculas a la derecha.
 */
export function Experience() {
  return (
    <section aria-labelledby="experiencia-title" className="grid bg-charcoal text-paper lg:grid-cols-2">
      <div className="grid grid-cols-2">
        {experience.images.map((key) => (
          <Photo key={key} name={key} ratio="1 / 1" sizes="(min-width: 1024px) 25vw, 50vw" />
        ))}
      </div>

      <div className="flex items-center justify-center px-[var(--gutter)] py-16 text-center lg:py-12">
        <div className="max-w-lg">
          <Reveal>
            <p className="kicker text-paper/75">{experience.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="experiencia-title" className="shout shout-xl mt-4">
              {experience.shout.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[1.05rem] text-paper/85">{experience.title}</p>
          </Reveal>

          <ul className="mx-auto mt-8 max-w-sm space-y-0 text-left">
            {experience.statements.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={0.16 + i * 0.06}
                className="flex gap-4 border-t border-paper/15 py-4 last:border-b"
              >
                <span className="eyebrow pt-1 text-paper/55">{s.n}</span>
                <span>
                  <span className="block font-normal">{s.title}</span>
                  <span className="block text-[0.9rem] text-paper/70">{s.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.35} className="mt-8">
            <BookButton variant="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
