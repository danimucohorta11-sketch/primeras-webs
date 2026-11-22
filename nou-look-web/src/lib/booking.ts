import { site } from "@/content/site";

/**
 * Punto único de integración para reservas.
 *
 * Hoy: cita por teléfono (único método que consta públicamente).
 * Mañana: para conectar el sistema de reservas multiweb basta con devolver
 * `{ kind: "external", href }` (enlace a la página de reservas) o
 * `{ kind: "embed", ... }` (widget) desde `getBookingAction`. Todos los botones
 * "Reservar cita" de la web pasan por aquí; no hay que tocar ningún componente.
 */
export type BookingAction =
  | { kind: "tel"; href: string; label: string; helper: string }
  | { kind: "external"; href: string; label: string; helper: string };

export function getBookingAction(): BookingAction {
  // Ejemplo de futura integración:
  // const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  // if (url) return { kind: "external", href: url, label: "Reservar cita", helper: "Reserva online" };

  return {
    kind: "tel",
    href: `tel:${site.phone.e164}`,
    label: "Reservar cita",
    helper: `Cita previa: ${site.phone.display}`,
  };
}
