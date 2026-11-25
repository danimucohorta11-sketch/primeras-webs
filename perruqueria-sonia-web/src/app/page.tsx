import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { Hero } from "@/components/sections/Hero";
import { Values } from "@/components/sections/Values";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { ForHim } from "@/components/sections/ForHim";
import { Ideas } from "@/components/sections/Ideas";
import { Faq } from "@/components/sections/Faq";
import { BookCta } from "@/components/sections/BookCta";
import { Visit } from "@/components/sections/Visit";
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
        <Process />
        <ForHim />
        <Ideas />
        <Faq />
        <BookCta />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
