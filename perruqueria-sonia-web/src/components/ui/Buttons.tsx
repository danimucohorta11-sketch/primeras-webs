import { site, whatsappUrl } from "@/content/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

type Variant = "primary" | "ghost" | "light" | "light-ghost";

const variantClass: Record<Variant, string> = {
  primary: "",
  ghost: "btn-ghost",
  light: "btn-light",
  "light-ghost": "btn-light-ghost",
};

export function Arrow() {
  return (
    <svg className="arrow shrink-0" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
      <path d="M0 5h16.5M12 1l4.5 4L12 9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Cita por WhatsApp (único canal de reserva además del teléfono). */
export function BookButton({
  variant = "primary",
  label = "Pide cita por WhatsApp",
  message,
  className = "",
  small = false,
}: {
  variant?: Variant;
  label?: string;
  message?: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener"
      className={`btn ${variantClass[variant]} ${small ? "btn-sm" : ""} ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function CallButton({ variant = "ghost", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <a href={`tel:${site.phone.e164}`} className={`btn ${variantClass[variant]} ${className}`}>
      <PhoneIcon className="h-4 w-4" />
      {site.phone.display}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "ghost",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`btn ${variantClass[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow />
    </a>
  );
}
