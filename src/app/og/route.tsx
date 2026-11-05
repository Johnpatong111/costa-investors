import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

/**
 * ===========================================================================
 * DYNAMICZNY OBRAZ OpenGraph (1200×630)
 * ===========================================================================
 * Generowany na buildzie (`force-static`), więc na produkcji jest zwykłym
 * plikiem z CDN: https://costainvestors.eu/og
 *
 * `SITE.ogImage = "/og"` + `absoluteUrl()` w metadanych gwarantują, że
 * `og:image` i `twitter:image` zawsze mają absolutny adres produkcyjny.
 */
export const runtime = "nodejs";
export const dynamic = "force-static";

const SIZE = { width: 1200, height: 630 } as const;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0b2b3c 0%, #103a51 55%, #0d5c63 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase", opacity: 0.75 }}>
            Spain · Real Estate
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{SITE.brand}</div>
          <div style={{ fontSize: 38, opacity: 0.92 }}>
            Property investment on Costa Blanca &amp; Costa Cálida
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, fontSize: 30 }}>
          {["€/m² prices", "Rental ROI", "Legal check", "NIE support"].map((chip) => (
            <div
              key={chip}
              style={{
                padding: "14px 26px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.85 }}>
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
          <span>PL · EN · ES</span>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
