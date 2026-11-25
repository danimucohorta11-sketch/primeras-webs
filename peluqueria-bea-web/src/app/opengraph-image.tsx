import { ImageResponse } from "next/og";

export const alt = "Peluquería Bea · Peluquería unisex en Badalona";
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
          background: "#fbf6f2",
          color: "#4a1424",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 10, textTransform: "uppercase", color: "#d2353f" }}>
          Peluquería Bea · Badalona
        </div>
        <div style={{ fontSize: 118, lineHeight: 1, display: "flex", flexDirection: "column" }}>
          <span>Tu pelo lo dice</span>
          <span>
            todo de <span style={{ color: "#d2353f", fontStyle: "italic" }}>&nbsp;ti.</span>
          </span>
        </div>
        <div style={{ fontSize: 30, color: "#6f5c60" }}>5,0 estrellas · 64 reseñas · Reserva online en Booksy</div>
      </div>
    ),
    size,
  );
}
