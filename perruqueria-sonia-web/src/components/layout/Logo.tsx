/** Logotipo tipográfico: "Sònia" en serif cursiva + "Perruqueria unisex" espaciado. */
export function Logo({ tone = "brand", className = "" }: { tone?: "brand" | "light"; className?: string }) {
  const color = tone === "light" ? "text-paper" : "text-forest";
  return (
    <span className={`inline-flex items-baseline gap-2.5 leading-none ${color} ${className}`} translate="no">
      <span className="display text-[2.15rem] italic tracking-[-0.01em]">Sònia</span>
      <span className="flex flex-col text-[0.56rem] font-semibold uppercase leading-[1.25] tracking-[0.28em] opacity-80">
        <span>Perruqueria</span>
        <span>Unisex</span>
      </span>
    </span>
  );
}
