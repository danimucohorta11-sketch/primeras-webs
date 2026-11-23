import { services, servicesIntro } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";

/**
 * Servicios en tarjetas fotográficas: título y texto sobre la imagen con degradado,
 * y dos botones en píldora. Rejilla de 3 + 2 en escritorio.
 */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section">
      <div className="wrap">
        <header className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="kicker">{servicesIntro.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="servicios-title" className="display display-lg mt-3">
              {servicesIntro.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-muted">{servicesIntro.text}</p>
          </Reveal>
        </header>

        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-6 md:gap-5">
          {services.map((s, i) => {
            const wide = i >= 3;
            return (
              <Reveal
                key={s.id}
                as="li"
                delay={(i % 3) * 0.08}
                className={`group relative overflow-hidden rounded-sm ${wide ? "md:col-span-3" : "md:col-span-2"}`}
              >
                <Photo
                  name={s.image}
                  ratio={wide ? "16 / 10" : "4 / 5"}
                  reveal={false}
                  sizes={wide ? "(min-width: 768px) 46vw, 92vw" : "(min-width: 768px) 30vw, 92vw"}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-6">
                  <h3 className="text-[1.3rem] font-normal">{s.title}</h3>
                  <p className="mt-1.5 max-w-sm text-[0.88rem] text-paper/85">{s.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <LinkButton href="#trabajos" variant="light-ghost" small>
                      Ver trabajos
                    </LinkButton>
                    <BookButton variant="light" small />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs text-muted">{servicesIntro.note}</p>
      </div>
    </section>
  );
}
