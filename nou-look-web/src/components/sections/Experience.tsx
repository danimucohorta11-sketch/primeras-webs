import { experience } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";

export function Experience() {
  const [a, b, c] = experience.images;
  return (
    <section aria-labelledby="exp-title" className="section bg-charcoal text-ivory">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-sand">{experience.eyebrow}</p>
        </Reveal>
        <h2 id="exp-title" className="display display-lg mt-5 max-w-4xl">
          <LineReveal lines={[experience.title]} />
        </h2>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <Photo name={a} sizes="(min-width: 768px) 30vw, 92vw" />
          </div>
          <div className="flex flex-col gap-8 md:col-span-5 md:mt-24">
            <Photo name={c} sizes="(min-width: 768px) 40vw, 92vw" />
            <ol className="divide-y divide-ivory/15 border-y border-ivory/15">
              {experience.statements.map((s, i) => (
                <Reveal key={s.n} as="li" delay={0.08 * i} className="flex gap-5 py-5">
                  <span className="eyebrow pt-2 text-sand">{s.n}</span>
                  <div>
                    <h3 className="display text-[1.7rem]">{s.title}</h3>
                    <p className="mt-1 text-sm text-ivory/65">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="md:col-span-3 md:mt-48">
            <Photo name={b} sizes="(min-width: 768px) 22vw, 70vw" className="max-w-[18rem] md:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
