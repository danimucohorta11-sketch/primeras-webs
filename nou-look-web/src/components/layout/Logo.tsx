/**
 * Logotipo tipográfico PROVISIONAL. Sustituir por el logotipo real del salón cuando se facilite.
 * Dos líneas: nombre en mayúsculas geométricas y descriptor en sans ligera.
 */
export function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-[family-name:var(--font-display)] font-medium uppercase ${
          big ? "text-[2rem] tracking-[0.32em]" : "text-[1.45rem] tracking-[0.3em] md:text-[1.7rem]"
        } -mr-[0.3em]`}
      >
        Nou Look
      </span>
      <span className={`mt-1 font-light ${big ? "text-[1.05rem]" : "text-[0.82rem] md:text-[0.95rem]"} tracking-[0.02em]`}>
        hair salon
      </span>
    </span>
  );
}
