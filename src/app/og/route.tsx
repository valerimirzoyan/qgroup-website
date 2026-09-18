import { ImageResponse } from "next/og";
import { LANGS, type Lang } from "@/lib/routes";

export const runtime = "nodejs";

const SUBTITLE: Record<Lang, string> = {
  en: "IT Support · Managed IT · Cybersecurity",
  hy: "IT Support · Managed IT · Cybersecurity",
  ru: "IT Support · Managed IT · Cybersecurity",
};

function resolveLang(value: string | null): Lang {
  return LANGS.includes(value as Lang) ? (value as Lang) : "en";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = resolveLang(searchParams.get("lang"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080d1a",
          padding: "72px",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              backgroundColor: "#a3e635",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#080d1a",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            Q
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "2px" }}>
            Q GROUP
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.1 }}>
            Technology that works for you.
          </div>
          <div style={{ fontSize: "34px", color: "#a3e635", fontWeight: 600 }}>
            {SUBTITLE[lang]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "26px",
            color: "#94a3b8",
          }}
        >
          <span>Yerevan · Armenia</span>
          <span>qgroup24.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
