import { forHim } from "@/content/sections";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/Buttons";

/** Bloque para caballero: refuerza el carácter unisex. */
export function ForHim() {
  return (
    <section aria-labelledby="el-title" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-peach">{forHim.eyebrow}</p>
          </Reveal>
          <h2 id="el-title" className="display display-lg mt-5 text-forest">
            <LineReveal lines={["Una peluquería", "de barrio para", "toda la casa."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-muted">{forHim.text}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <BookButton label="Cita para caballero" message="¡Hola Sònia! Me gustaría pedir cita para un corte de caballero." />
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-6">
          <Photo name="degradado" ratio="3 / 4" sizes="(min-width: 1024px) 28vw, 46vw" frameClassName="rounded-[1.75rem]" />
          <div className="mt-16 space-y-4 lg:space-y-6">
            <Photo name="maquinaCaballero" ratio="1 / 1" sizes="(min-width: 1024px) 28vw, 46vw" frameClassName="rounded-[1.75rem]" />
            <div className="rounded-[1.5rem] bg-blush p-5 md:p-6">
              <p className="display text-[1.7rem] leading-tight text-forest md:text-[2rem]">
                Clásico, <em>degradado</em> o a tijera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
