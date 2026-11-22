import { reviews } from "@/content/sections";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Solo se renderiza si hay reseñas REALES en content/sections.ts.
 * No hay testimonios, nombres ni puntuaciones inventados.
 */
export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section aria-labelledby="resenas-title" className="section">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-clay-deep">Opiniones</p>
        </Reveal>
        <h2 id="resenas-title" className="display display-lg mt-5 max-w-3xl">
          Lo que cuentan quienes nos visitan.
        </h2>
        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={r.author + i} as="li" delay={0.1 * i}>
              <figure>
                <blockquote className="display text-[1.8rem] !leading-[1.15]">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  {r.author} ·{" "}
                  {r.url ? (
                    <a className="link-u" href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.source}
                    </a>
                  ) : (
                    r.source
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
