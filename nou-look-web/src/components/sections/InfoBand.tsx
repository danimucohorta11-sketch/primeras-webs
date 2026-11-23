import { site } from "@/content/site";
import { BookButton } from "@/components/ui/BookButton";

/**
 * Barra crema de "pide tu cita" + franja piedra con datos clave.
 * Solo datos reales del salón: nada de cifras de reseñas, años o premios sin verificar.
 */
export function InfoBand() {
  const facts = [
    { big: "Unisex", small: "Para ella, para él, para todos" },
    { big: "Lun – Sáb", small: "Jueves y viernes, horario continuo" },
    { big: site.phone.display, small: "Cita previa por teléfono", href: `tel:${site.phone.e164}` },
    { big: site.address.city, small: site.address.street },
  ];

  return (
    <div>
      <div className="bg-cream">
        <div className="wrap flex flex-col items-stretch gap-3 py-3 md:flex-row md:items-center md:gap-5">
          <p className="flex items-center gap-2 text-[0.92rem] md:shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Pide tu cita
          </p>
          <p className="flex-1 rounded-md bg-paper px-4 py-3 text-[0.92rem] text-muted">
            Llámanos al{" "}
            <a href={`tel:${site.phone.e164}`} className="link-u text-ink">
              {site.phone.display}
            </a>{" "}
            y te buscamos hueco.
          </p>
          <BookButton label="Llamar ahora" className="!rounded-md" />
        </div>
      </div>

      <div className="bg-stone text-paper">
        <ul className="wrap grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-9">
          {facts.map((f, i) => (
            <li
              key={f.small}
              className={`px-3 text-center ${i % 2 === 1 ? "border-l border-paper/25" : ""} ${
                i === 2 ? "md:border-l md:border-paper/25" : ""
              }`}
            >
              <p className="text-[1.5rem] font-light leading-tight md:text-[1.9rem]">
                {f.href ? (
                  <a href={f.href} className="hover:opacity-80">
                    {f.big}
                  </a>
                ) : (
                  f.big
                )}
              </p>
              <p className="mt-1.5 text-[0.8rem] text-paper/80">{f.small}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
