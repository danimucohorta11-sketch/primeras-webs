import { values } from "@/content/sections";

/** Cinta de valores en movimiento (se pausa al pasar el ratón). */
export function Values() {
  const items = [...values, ...values];
  return (
    <section aria-label="Lo que nos define" className="overflow-hidden border-y border-[var(--line)] bg-sand py-5 md:py-6">
      <ul className="marquee flex w-max items-center">
        {items.map((v, i) => (
          <li key={i} className="flex items-center gap-6 pr-6 md:gap-8 md:pr-8" aria-hidden={i >= values.length}>
            <span className="display text-[1.6rem] italic text-forest md:text-[2rem]">{v}</span>
            <span className="h-2 w-2 rotate-45 bg-peach" aria-hidden />
          </li>
        ))}
      </ul>
    </section>
  );
}
