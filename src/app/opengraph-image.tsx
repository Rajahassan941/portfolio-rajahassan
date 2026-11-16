import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";
import { profile } from "@/data/profile";

export const alt = SITE.title;
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
          padding: 72,
          background: "#07070a",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(79,124,255,0.35), transparent 45%), radial-gradient(circle at 90% 30%, rgba(139,92,246,0.3), transparent 45%), radial-gradient(circle at 60% 110%, rgba(34,211,238,0.2), transparent 45%)",
          color: "#ededf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#111118",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#a5b4fc",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 28, color: "#a1a1b0" }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, maxWidth: 980 }}>
            {profile.headline}
          </div>
          <div style={{ fontSize: 30, color: "#a1a1b0" }}>
            Full Stack Developer · React · Next.js · Node.js · Fintech
          </div>
        </div>

        <div style={{ display: "flex", height: 6, width: "100%", borderRadius: 6, background: "linear-gradient(90deg,#4f7cff,#8b5cf6,#22d3ee)" }} />
      </div>
    ),
    size,
  );
}
