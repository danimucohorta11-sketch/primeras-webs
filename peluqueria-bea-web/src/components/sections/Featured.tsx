import { featured } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { Arrow, BookButton } from "@/components/ui/Buttons";
import { site } from "@/content/site";

/** Tratamientos estrella: antes/después real de keratina + tres especialidades. */
export function Featured() {
  const k = featured.keratina;
  return (
    <section aria-labelledby="destacados-title" className="section">
      <div className="wrap">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-berry">{featured.eyebrow}</p>
          </Reveal>
          <h2 id="destacados-title" className="display display-lg mt-5 text-wine-deep">
            <LineReveal lines={[featured.title]} />
          </h2>
        </div>

        {/* Keratina antes / después */}
        <div className="mt-12 grid overflow-hidden rounded-[2rem] bg-wine-deep text-cream md:mt-16 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-1.5 p-1.5">
            {(
              [
                ["keratinaAntes", "Antes"],
                ["keratinaDespues", "Después"],
              ] as const
            ).map(([name, label]) => (
              <div key={name} className="relative">
                <Photo
                  name={name}
                  ratio="3 / 4"
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  frameClassName="rounded-[1.6rem]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-wine-deep backdrop-blur">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="grain flex flex-col justify-center p-8 md:p-14">
            <p className="eyebrow text-[#f3b8b0]">Antes y después real del salón</p>
            <h3 className="display display-md mt-4">{k.title}</h3>
            <p className="mt-5 max-w-md text-cream/80">{k.text}</p>
            <p className="display mt-7 text-[2rem] text-[#f3b8b0]">{k.price}</p>
            <div className="mt-7">
              <BookButton variant="light" label="Reservar keratina" variantId={k.variantId} />
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {featured.cards.map((c, i) => (
            <Reveal key={c.title} as="li" delay={0.08 * i}>
              <a
                href={site.booking.service(c.variantId)}
                target="_blank"
                rel="noopener"
                className="group block"
                aria-label={`${c.title}: reservar en Booksy`}
              >
                <Photo
                  name={c.image}
                  ratio="4 / 5"
                  sizes="(min-width: 768px) 30vw, 92vw"
                  frameClassName="rounded-[1.75rem]"
                  reveal={false}
                />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-[1.6rem] text-wine-deep">{c.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-muted">{c.text}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blush px-3 py-1 text-sm font-semibold text-berry">
                    {c.price}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-berry">
                  <span className="link-u">Reservar</span>
                  <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
