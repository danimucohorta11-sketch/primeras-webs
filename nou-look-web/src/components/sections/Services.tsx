import { services, servicesIntro } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/BookButton";

/**
 * Servicios: filas editoriales grandes de proporciones distintas y imagen alternando lado.
 * No son tarjetas repetidas: cada fila cambia de ancho, formato y orden.
 */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section">
      <div className="wrap">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-clay-deep">{servicesIntro.eyebrow}</p>
          </Reveal>
          <h2 id="servicios-title" className="display display-lg mt-5">
            <LineReveal lines={[servicesIntro.title]} />
          </h2>
        </div>

        <ol className="mt-14 space-y-20 md:mt-24 md:space-y-32">
          {services.map((s, i) => {
            const wide = s.span === "wide";
            const flip = i % 2 === 1;
            return (
              <li key={s.id} className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
                <div
                  className={`${wide ? "md:col-span-8" : "md:col-span-5"} ${
                    flip ? "md:order-2 md:col-start-auto" : ""
                  } ${flip && !wide ? "md:col-start-8" : ""}`}
                >
                  <Photo
                    name={s.image}
                    sizes={wide ? "(min-width: 768px) 64vw, 92vw" : "(min-width: 768px) 40vw, 92vw"}
                  />
                </div>
                <div className={`${wide ? "md:col-span-4" : "md:col-span-5"} ${flip ? "md:order-1" : ""} md:pb-4`}>
                  <Reveal>
                    <span className="eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Reveal>
                  <h3 className="display display-md mt-3">{s.title}</h3>
                  <Reveal delay={0.1}>
                    <p className="mt-4 max-w-md text-muted">{s.text}</p>
                  </Reveal>
                  <Reveal delay={0.2} className="mt-7">
                    <BookButton variant="ghost" label="Reservar" />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-16 text-sm text-muted md:mt-24">{servicesIntro.note}</p>
      </div>
    </section>
  );
}
