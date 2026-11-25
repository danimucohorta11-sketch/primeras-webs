import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site, fullAddress } from "@/content/site";
import { MotionProvider } from "@/components/ui/MotionProvider";

const title = `${site.name} · Peluquería unisex en ${site.address.city}`;
const description = `Peluquería unisex en Casagemes, ${site.address.city}: cortes de mujer y caballero, color, mechas, balayage y peinados. Cita por WhatsApp o teléfono (${site.phone.display}). ${fullAddress()}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
