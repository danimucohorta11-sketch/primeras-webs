import { ImageResponse } from "next/og";

export const alt = "Nou Look · Peluquería unisex en Tarragona";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen social tipográfica provisional (sin fotografías hasta tener material autorizado). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f0e8",
          color: "#151311",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 10, textTransform: "uppercase" }}>Nou Look · Hair salon</div>
        <div style={{ fontSize: 120, lineHeight: 1, display: "flex", flexDirection: "column" }}>
          <span>Un look nuevo,</span>
          <span style={{ color: "#8a5738" }}>siempre tuyo.</span>
        </div>
        <div style={{ fontSize: 30, color: "#655d54" }}>Peluquería unisex · Tarragona</div>
      </div>
    ),
    size,
  );
}
