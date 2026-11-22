import type { Metadata } from "next";
import { site, fullAddress } from "@/content/site";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

/**
 * Plantilla: los datos fiscales y el texto legal definitivo deben aportarlos
 * el titular del negocio / su asesor. No se inventa razón social ni NIF.
 */
export default function Legal() {
  return (
    <main id="contenido" className="wrap section max-w-3xl">
      <Link href="/" aria-label="Volver al inicio" className="inline-block">
        <Logo />
      </Link>
      <h1 className="display display-lg mt-12">Aviso legal y privacidad</h1>
      <div className="mt-10 space-y-6 text-muted">
        <p>
          <strong className="font-medium text-ink">Titular:</strong> {site.legalDisplayName}, {fullAddress()}.{" "}
          Razón social y NIF: <em>pendiente de aportar por el titular</em>.
        </p>
        <p>
          <strong className="font-medium text-ink">Contacto:</strong> {site.phone.display}.
        </p>
        <p>
          <strong className="font-medium text-ink">Datos personales:</strong> esta web no recoge datos mediante
          formularios ni utiliza cookies de seguimiento. La cita previa se gestiona por teléfono. Texto definitivo
          de privacidad: <em>pendiente de revisión legal</em>.
        </p>
      </div>
    </main>
  );
}
