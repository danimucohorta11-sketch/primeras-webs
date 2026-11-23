import { instagramSection } from "@/content/sections";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/BookButton";

/** Franja de comunidad: invitación a seguir el Instagram del salón. */
export function InstagramStrip() {
  return (
    <section aria-labelledby="instagram-title" className="py-12 md:py-16">
      <Reveal className="wrap flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">{instagramSection.eyebrow}</p>
          <h2 id="instagram-title" className="display display-md mt-2">
            {instagramSection.title}
          </h2>
          <p className="mt-1 text-[0.9rem] text-muted">{site.social.instagram.handle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.social.facebook.url} external small>
            Facebook
          </LinkButton>
          <LinkButton href={site.social.instagram.url} variant="primary" external small>
            {instagramSection.cta}
          </LinkButton>
        </div>
      </Reveal>
    </section>
  );
}
