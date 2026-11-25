import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton, CallButton } from "@/components/ui/Buttons";

/** Llamada final a reservar, sobre fondo vino con dos trabajos reales. */
export function BookCta() {
  return (
    <section aria-labelledby="cta-title" className="wrap pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className="grain grid items-center gap-12 overflow-hidden rounded-[2.25rem] bg-wine px-6 py-16 text-cream md:px-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="script text-[2.8rem] leading-none text-[#f3b8b0]">¿Nos vemos?</p>
          </Reveal>
          <h2 id="cta-title" className="display display-lg mt-4">
            <LineReveal lines={["Tu próxima cita,", "a un clic."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-cream/80">
              Elige servicio, día y hora en Booksy y recibe la confirmación al momento. ¿Prefieres hablar? Llama a Bea.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton variant="light" label="Reservar cita online" />
            <CallButton variant="light-ghost" />
          </Reveal>
        </div>

        <div className="relative hidden h-full min-h-[22rem] lg:col-span-5 lg:block" aria-hidden>
          <div className="absolute right-0 top-0 w-[62%] rotate-3">
            <Photo name="semirecogido" reveal={false} ratio="4 / 5" sizes="18rem" frameClassName="rounded-[1.75rem] shadow-2xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-[50%] -rotate-3">
            <Photo
              name="colorRojo"
              reveal={false}
              ratio="1 / 1"
              sizes="15rem"
              frameClassName="rounded-[1.5rem] border-[5px] border-wine shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
