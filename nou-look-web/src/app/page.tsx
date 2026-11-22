import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Salon } from "@/components/sections/Salon";
import { Services } from "@/components/sections/Services";
import { Works } from "@/components/sections/Works";
import { Experience } from "@/components/sections/Experience";
import { Reviews } from "@/components/sections/Reviews";
import { BookCta } from "@/components/sections/BookCta";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero />
        <Salon />
        <Services />
        <Works />
        <Experience />
        <Reviews />
        <BookCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
