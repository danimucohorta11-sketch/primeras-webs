/** Logotipo tipográfico inspirado en el del salón: "Peluquería" espaciado + "Bea" manuscrito en rojo. */
export function Logo({ tone = "brand", className = "" }: { tone?: "brand" | "light"; className?: string }) {
  const color = tone === "light" ? "text-cream" : "text-red";
  return (
    <span className={`inline-flex flex-col items-start leading-none ${color} ${className}`} translate="no">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] opacity-90">Peluquería</span>
      <span className="script -mt-1 ml-3 text-[2.65rem]">Bea</span>
    </span>
  );
}
