import type { Metadata, Viewport } from "next";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/jost";
import "./globals.css";
import { site, fullAddress } from "@/content/site";
import { MotionProvider } from "@/components/ui/MotionProvider";

const description = `Peluquería unisex en ${site.address.city}. Corte, color, peinados y tratamientos capilares con cita previa. ${fullAddress()}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Peluquería unisex en ${site.address.city}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} · Peluquería unisex en ${site.address.city}`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
