import { salon } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";

export function Salon() {
  return (
    <section id="salon" aria-labelledby="salon-title" className="section bg-cream">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="relative md:col-span-6 md:row-span-2">
          <Photo name="salonA" sizes="(min-width: 768px) 46vw, 92vw" className="max-w-[30rem] md:max-w-none" />
          <div className="absolute -bottom-10 right-0 w-[46%] md:-right-12">
            <Photo name="salonB" sizes="(min-width: 768px) 20vw, 42vw" rounded="rounded-[2px]" />
          </div>
        </div>

        <div className="mt-8 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">
          <Reveal>
            <p className="eyebrow text-clay-deep">{salon.eyebrow}</p>
          </Reveal>
          <h2 id="salon-title" className="display display-lg mt-5">
            <LineReveal lines={[salon.title]} />
          </h2>
          <div className="mt-8 space-y-5 text-[1.05rem] text-muted">
            {salon.paragraphs.map((t, i) => (
              <Reveal key={i} as="p" delay={0.1 * i}>
                {t}
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden border-y border-[var(--line)] md:col-span-5 md:col-start-8 md:self-start">
          {salon.principles.map((p, i) => (
            <Reveal key={p.title} as="li" delay={0.08 * i} className="flex items-baseline justify-between gap-6 py-5">
              <span className="display text-[1.55rem]">{p.title}</span>
              <span className="max-w-[13rem] text-right text-sm text-muted">{p.text}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
