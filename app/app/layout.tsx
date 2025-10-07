import type { Metadata } from "next";
import { Merriweather } from "next/font/google";

export const metadata: Metadata = {
  title: "Exponential, Distilled — Public Portfolio",
  description: "Live mock cross-asset portfolio engineered to outperform BTC.",
};

const merr = Merriweather({ subsets: ["latin"], weight: ["300","400","700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={merr.className} style={bodyStyle as React.CSSProperties}>
        <div style={gridBackdrop as React.CSSProperties} />
        {children}
      </body>
    </html>
  );
}

// --- theme ---
const bodyStyle = {
  margin: 0,
  minHeight: "100dvh",
  background: "linear-gradient(180deg,#071426 0%, #0a1b33 60%, #0b1f3d 100%)",
  color: "rgba(244,246,250,0.96)",
  letterSpacing: "0.2px",
} as const;

const gridBackdrop = {
  position: "fixed",
  inset: 0,
  backgroundImage:
    "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06) 0 20%, transparent 22%)," +
    "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05) 0 18%, transparent 20%)",
  pointerEvents: "none",
  mixBlendMode: "screen",
  opacity: 0.35,
} as const;
