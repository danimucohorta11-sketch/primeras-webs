import { ImageResponse } from "next/og";

export const alt = "Perruqueria Sònia · Peluquería unisex en Badalona";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#1f3b34",
          color: "#f6f3ee",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 10, textTransform: "uppercase", color: "#f3c3b2" }}>
          Perruqueria Sònia · Casagemes, Badalona
        </div>
        <div style={{ fontSize: 118, lineHeight: 1, display: "flex", flexDirection: "column" }}>
          <span>Vienes como eres.</span>
          <span style={{ color: "#f3c3b2", fontStyle: "italic" }}>Sales como quieres.</span>
        </div>
        <div style={{ fontSize: 30, color: "#c9d3c6" }}>Cita por WhatsApp · 633 50 31 45</div>
      </div>
    ),
    size,
  );
}
