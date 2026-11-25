import { values } from "@/content/sections";

/** Cinta de valores en movimiento (se pausa al pasar el ratón). */
export function Values() {
  const items = [...values, ...values];
  return (
    <section aria-label="Por qué Peluquería Bea" className="grain overflow-hidden bg-wine py-6 text-cream md:py-7">
      <ul className="marquee flex w-max items-center">
        {items.map((v, i) => (
          <li key={i} className="flex items-center gap-4 pr-12 md:pr-16" aria-hidden={i >= values.length}>
            <span className="script text-[2rem] leading-none text-[#f3b8b0]">✦</span>
            <span className="display text-[1.35rem] md:text-[1.6rem]">{v.title}</span>
            <span className="text-sm text-cream/70">{v.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
