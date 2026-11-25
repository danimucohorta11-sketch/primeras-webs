import type { Metadata } from "next";
import Link from "next/link";
import { site, fullAddress } from "@/content/site";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

/** Plantilla: NIF y texto legal definitivo los aporta la titular o su gestoría. */
export default function Legal() {
  return (
    <main id="contenido" className="wrap section max-w-3xl">
      <Link href="/" aria-label="Volver al inicio" className="inline-block">
        <Logo />
      </Link>
      <h1 className="display display-lg mt-12 text-forest">Aviso legal y privacidad</h1>
      <div className="mt-10 space-y-6 text-muted">
        <p>
          <strong className="font-medium text-ink">Titular:</strong> {site.fullName}, {fullAddress()}. Nombre fiscal y NIF:{" "}
          <em>pendientes de aportar por la titular</em>.
        </p>
        <p>
          <strong className="font-medium text-ink">Contacto:</strong> {site.phone.display}.
        </p>
        <p>
          <strong className="font-medium text-ink">Datos personales:</strong> esta web no recoge datos mediante
          formularios ni usa cookies de seguimiento. Las citas se piden por teléfono o WhatsApp. El mapa se carga desde Google Maps. Texto definitivo:{" "}
          <em>pendiente de revisión legal</em>.
        </p>
        <p>
          <Link href="/" className="link-u text-ink">
            ← Volver a la web
          </Link>
        </p>
      </div>
    </main>
  );
}
