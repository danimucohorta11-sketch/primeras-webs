import { about } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/Buttons";

/** Presentación de Bea, con su foto real y la voz de una clienta. */
export function About() {
  return (
    <section id="bea" aria-labelledby="bea-title" className="section grain bg-blush">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <Photo
            name="bea"
            ratio="4 / 5"
            sizes="(min-width: 1024px) 38vw, 92vw"
            frameClassName="rounded-[2.5rem]"
          />
          <Reveal
            delay={0.3}
            className="absolute -bottom-6 right-4 rounded-2xl bg-cream px-6 py-4 shadow-[0_24px_50px_-28px_rgba(74,20,36,0.5)] md:-right-8"
          >
            <span className="script block text-[2.6rem] leading-none text-red">Hola, soy Bea</span>
            <span className="mt-1 block text-sm text-muted">Peluquera y alma del salón</span>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-berry">{about.eyebrow}</p>
          </Reveal>
          <h2 id="bea-title" className="display display-lg mt-5 text-wine-deep">
            <LineReveal lines={["Como ir a casa", "de una amiga que", "sabe muchísimo", "de pelo."]} />
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[1.03rem] text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i} as="p">
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <figure className="mt-10 max-w-xl border-l-2 border-red pl-6">
              <blockquote className="display text-[1.45rem] italic leading-snug text-wine-deep md:text-[1.65rem]">
                “{about.quote.text}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">{about.quote.author}</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--line)] pt-8">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="display text-[2.4rem] text-wine md:text-[3rem]">{f.value}</dd>
                  <dd className="text-sm text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <BookButton label="Reserva con Bea" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
