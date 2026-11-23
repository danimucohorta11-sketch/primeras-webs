import { bookingSection } from "@/content/sections";
import { site } from "@/content/site";
import { getBookingAction } from "@/lib/booking";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/BookButton";

/** Bloque final de reserva sobre crema: foto redondeada, titular y acciones. */
export function BookCta() {
  const action = getBookingAction();
  return (
    <section aria-labelledby="reserva-title" className="bg-cream">
      <div className="wrap grid items-center gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
        <div className="md:col-span-4">
          <Photo name={bookingSection.image} ratio="1 / 1" rounded="rounded-xl" sizes="(min-width: 768px) 30vw, 92vw" />
        </div>

        <div className="md:col-span-5">
          <Reveal>
            <p className="kicker">{bookingSection.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="reserva-title" className="display display-lg mt-3 [text-wrap:balance]">
              {bookingSection.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-md text-muted">{bookingSection.text}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-3">
            <BookButton />
            <LinkButton href="#contacto" variant="light">
              Ver horario
            </LinkButton>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="md:col-span-3">
          <p className="text-[0.95rem]">Llámanos</p>
          <p className="mt-1 text-[1.9rem] font-light leading-tight">
            <a href={action.href} className="link-u">
              {site.phone.display}
            </a>
          </p>
          <p className="mt-4 text-[0.88rem] text-muted">
            {site.address.street}
            <br />
            {site.address.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
