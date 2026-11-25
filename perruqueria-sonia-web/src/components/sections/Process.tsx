import { process } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";

/** Cómo trabajamos: cuatro pasos junto a dos fotos superpuestas. */
export function Process() {
  return (
    <section id="como-trabajamos" aria-labelledby="proceso-title" className="section bg-forest text-paper">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <Photo
            name="tinteClienta"
            ratio="4 / 5"
            sizes="(min-width: 1024px) 36vw, 92vw"
            frameClassName="rounded-[2rem]"
          />
          <div className="absolute -bottom-8 -right-3 w-[46%] md:-right-10">
            <Photo
              name="utensiliosColor"
              ratio="1 / 1"
              sizes="(min-width: 1024px) 16vw, 42vw"
              frameClassName="rounded-[1.5rem] border-[6px] border-forest"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-peach-soft">{process.eyebrow}</p>
          </Reveal>
          <h2 id="proceso-title" className="display display-lg mt-5">
            <LineReveal lines={process.title} />
          </h2>
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {process.steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.07} className="border-t border-paper/20 pt-6">
                <span className="display text-[2.6rem] italic leading-none text-peach-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-paper/75">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
