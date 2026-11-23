import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { InfoBand } from "@/components/sections/InfoBand";
import { Salon } from "@/components/sections/Salon";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Works } from "@/components/sections/Works";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { BookCta } from "@/components/sections/BookCta";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      {/* Hueco de la cabecera fija (barra superior + logotipo + menú en escritorio) */}
      <div aria-hidden className="h-[64px] lg:h-[162px]" />
      <main id="contenido">
        <Hero />
        <InfoBand />
        <Salon />
        <Services />
        <Experience />
        <Works />
        <Reviews />
        <Contact />
        <InstagramStrip />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
