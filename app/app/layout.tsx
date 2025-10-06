export const metadata = {
  title: "Exponential Distilled • Public Portfolio",
  description: "Live mock cross-asset portfolio engineered to outperform BTC."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:"#0b0b0b", color:"#eaeaea", fontFamily:"Inter, ui-sans-serif, system-ui"}}>
        {children}
      </body>
    </html>
  );
}
