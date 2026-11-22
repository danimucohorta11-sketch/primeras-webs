import { getBookingAction } from "@/lib/booking";

type Variant = "primary" | "ghost" | "light" | "light-ghost";

const variantClass: Record<Variant, string> = {
  primary: "",
  ghost: "btn-ghost",
  light: "btn-light",
  "light-ghost": "btn-light-ghost",
};

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
      <path d="M0 5h16.5M12 1l4.5 4L12 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Botón de reserva: toda la web reserva a través de lib/booking.ts. */
export function BookButton({
  variant = "primary",
  label,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const action = getBookingAction();
  const external = action.kind === "external";
  return (
    <a
      href={action.href}
      className={`btn ${variantClass[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {label ?? action.label}
      <Arrow />
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
