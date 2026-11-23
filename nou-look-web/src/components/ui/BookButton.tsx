import { getBookingAction } from "@/lib/booking";

type Variant = "primary" | "ghost" | "light" | "light-ghost" | "cream";

const variantClass: Record<Variant, string> = {
  primary: "",
  ghost: "btn-ghost",
  light: "btn-light",
  "light-ghost": "btn-light-ghost",
  cream: "btn-cream",
};

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
      <path d="M0 5h16.5M12 1l4.5 4L12 9" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Botón de reserva: toda la web reserva a través de lib/booking.ts. */
export function BookButton({
  variant = "primary",
  label,
  small = false,
  arrow = false,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  small?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const action = getBookingAction();
  const external = action.kind === "external";
  return (
    <a
      href={action.href}
      className={`btn ${variantClass[variant]} ${small ? "btn-sm" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {label ?? action.label}
      {arrow && <Arrow />}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "ghost",
  external = false,
  small = false,
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  small?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`btn ${variantClass[variant]} ${small ? "btn-sm" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
