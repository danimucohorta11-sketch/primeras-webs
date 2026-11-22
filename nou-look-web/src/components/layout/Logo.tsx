import { site } from "@/content/site";

/** Logotipo tipográfico PROVISIONAL. Sustituir por el logotipo real del salón cuando se facilite. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="display text-[1.7rem] font-semibold uppercase tracking-[0.18em]">
        {site.name.toUpperCase()}
      </span>
      <span className="eyebrow mt-1 text-[0.54rem] tracking-[0.42em] opacity-70">Hair salon</span>
    </span>
  );
}
