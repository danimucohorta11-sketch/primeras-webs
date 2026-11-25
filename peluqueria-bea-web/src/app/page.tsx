import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { Hero } from "@/components/sections/Hero";
import { Values } from "@/components/sections/Values";
import { Services } from "@/components/sections/Services";
import { Featured } from "@/components/sections/Featured";
import { About } from "@/components/sections/About";
import { Works } from "@/components/sections/Works";
import { Reviews } from "@/components/sections/Reviews";
import { Visit } from "@/components/sections/Visit";
import { Faq } from "@/components/sections/Faq";
import { BookCta } from "@/components/sections/BookCta";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero />
        <Values />
        <Services />
        <Featured />
        <About />
        <Works />
        <Reviews />
        <Faq />
        <BookCta />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
