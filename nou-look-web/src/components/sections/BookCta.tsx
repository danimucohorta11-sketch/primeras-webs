import { bookingSection } from "@/content/sections";
import { site } from "@/content/site";
import { getBookingAction } from "@/lib/booking";
import { Photo } from "@/components/ui/Photo";
import { Reveal, LineReveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/BookButton";

export function BookCta() {
  const action = getBookingAction();
  return (
    <section id="reservar" aria-labelledby="reservar-title" className="bg-clay-deep text-ivory">
      <div className="wrap grid items-center gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-32">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow text-ivory/75">{bookingSection.eyebrow}</p>
          </Reveal>
          <h2 id="reservar-title" className="display display-lg mt-5">
            <LineReveal lines={[bookingSection.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-ivory/85">{bookingSection.text}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-center">
            <BookButton variant="light" label={action.kind === "tel" ? `Llamar al ${site.phone.display}` : undefined} />
            <p className="text-sm text-ivory/75">{site.bookingNote}</p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Photo name="cta" sizes="(min-width: 768px) 30vw, 70vw" className="mx-auto max-w-[22rem] md:max-w-none" />
        </div>
      </div>
    </section>
  );
}
