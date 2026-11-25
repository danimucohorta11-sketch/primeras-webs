import { faqs } from "@/content/sections";
import { Reveal, LineReveal } from "@/components/ui/Reveal";

/** Preguntas frecuentes con <details> nativo (accesible y sin JavaScript). */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section pt-0">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-peach">Dudas</p>
          </Reveal>
          <h2 id="faq-title" className="display display-md mt-5 text-forest-deep">
            <LineReveal lines={["Preguntas", "frecuentes"]} />
          </h2>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group border-b border-[var(--line)] py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.1rem] font-medium md:text-[1.2rem]">
                  {f.q}
                  <span
                    aria-hidden
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-open:border-forest group-open:bg-forest group-open:text-paper"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-12 text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
