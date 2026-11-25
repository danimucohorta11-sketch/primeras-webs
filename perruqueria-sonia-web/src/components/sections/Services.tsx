import { services } from "@/content/sections";
import { whatsappUrl } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { Arrow, BookButton } from "@/components/ui/Buttons";

/** Servicios en tarjetas con foto; cada una abre WhatsApp preguntando por ese servicio. */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-peach">Servicios</p>
            </Reveal>
            <h2 id="servicios-title" className="display display-lg mt-5 text-forest">
              <LineReveal lines={["Todo lo que tu pelo", "necesita, en un solo sitio."]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-muted lg:ml-auto">
              Para mujer y para hombre. ¿Quieres saber el precio de algo? Pulsa en el servicio y te respondemos por
              WhatsApp antes de reservar.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} as="li" delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:mt-16" : ""}>
              <a
                href={whatsappUrl(`¡Hola Sònia! Me gustaría información y precio de: ${s.title}.`)}
                target="_blank"
                rel="noopener"
                className="group block"
                aria-label={`${s.title}: preguntar precio por WhatsApp`}
              >
                <div className="relative">
                  <Photo
                    name={s.image}
                    ratio="4 / 5"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    frameClassName="rounded-[1.75rem]"
                    reveal={false}
                  />
                </div>
                <h3 className="display mt-6 text-[2.1rem] text-forest">{s.title}</h3>
                <p className="mt-2 text-[0.97rem] text-muted">{s.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Incluye: ${s.items.join(", ")}`}>
                  {s.items.map((it) => (
                    <li key={it} className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.8rem]">
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  <span className="link-u">Preguntar precio</span>
                  <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-start gap-4 rounded-[1.75rem] bg-sand p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <p className="display text-[1.8rem] leading-tight text-forest md:text-[2.2rem]">
            ¿No ves lo que buscas? <em>Pregúntanos.</em>
          </p>
          <BookButton label="Escríbenos" />
        </Reveal>
      </div>
    </section>
  );
}
