import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton, CallButton } from "@/components/ui/Buttons";

/** Llamada final a pedir cita. */
export function BookCta() {
  return (
    <section aria-labelledby="cta-title" className="wrap pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className="grain grid items-center gap-12 overflow-hidden rounded-[2.25rem] bg-blush px-6 py-16 md:px-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-peach">Tu cita</p>
          </Reveal>
          <h2 id="cta-title" className="display display-lg mt-4 text-forest">
            <LineReveal lines={["Escríbenos y", "te buscamos hueco."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-muted">
              Un mensaje por WhatsApp y listo. Si lo prefieres, llámanos en horario de apertura.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton />
            <CallButton />
          </Reveal>
        </div>
        <div className="relative hidden h-full min-h-[22rem] lg:col-span-5 lg:block" aria-hidden>
          <div className="absolute right-0 top-0 w-[60%] rotate-2">
            <Photo name="planchado" reveal={false} ratio="4 / 5" sizes="18rem" frameClassName="rounded-[1.75rem] shadow-2xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-[52%] -rotate-3">
            <Photo
              name="ondas"
              reveal={false}
              ratio="1 / 1"
              sizes="15rem"
              frameClassName="rounded-[1.5rem] border-[5px] border-blush shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
