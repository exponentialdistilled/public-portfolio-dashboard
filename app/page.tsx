"use client";

type Holding = {
  ticker: string;
  theme: string;
  entryDate: string;
  initialUnits: number;
  avgPrice: number;
  currentPrice: number;
  unitsRemaining: number;
  currentSize: number;
  weightPct: number; // 0–100
  unrealPnL: number;
};

const meta = {
  inception: "July 15th 2025",
  starting: 100_000,
  current: 130_414,
  roi: 0.3041,
  relBtc: 0.2421,
};

const holdings: Holding[] = [
  { ticker:"BTC-USD", theme:"Digital Assets", entryDate:"7/15/2025", initialUnits:0.08, avgPrice:120405.94, currentPrice:124818.80, unitsRemaining:0.18, currentSize:22053.93, weightPct:16.91, unrealPnL:779.70 },
  { ticker:"AMD", theme:"AI Hardware", entryDate:"7/15/2025", initialUnits:89, avgPrice:154.18, currentPrice:203.71, unitsRemaining:86, currentSize:17552.78, weightPct:13.46, unrealPnL:4267.78 },
  { ticker:"LLY", theme:"GLP-1s", entryDate:"9/22/2025", initialUnits:19, avgPrice:753.50, currentPrice:845.05, unitsRemaining:19, currentSize:16253.42, weightPct:12.46, unrealPnL:1760.84 },
  { ticker:"KRX:000660", theme:"AI Hardware", entryDate:"7/15/2025", initialUnits:47, avgPrice:215.87, currentPrice:280.35, unitsRemaining:54, currentSize:15035.69, weightPct:11.53, unrealPnL:3458.18 },
  { ticker:"ETH-USD", theme:"Digital Assets", entryDate:"7/15/2025", initialUnits:4.72, avgPrice:2964.04, currentPrice:4694.16, unitsRemaining:2.68, currentSize:12564.05, weightPct:9.63, unrealPnL:4630.71 },
  { ticker:"VST", theme:"Nuclear", entryDate:"7/15/2025", initialUnits:62, avgPrice:194.81, currentPrice:200.41, unitsRemaining:62, currentSize:12344.95, weightPct:9.47, unrealPnL:344.95 },
  { ticker:"CCJ", theme:"Nuclear", entryDate:"7/15/2025", initialUnits:120, avgPrice:74.88, currentPrice:85.31, unitsRemaining:127, currentSize:10860.12, weightPct:8.33, unrealPnL:1327.76 },
  { ticker:"OKLO", theme:"Nuclear", entryDate:"7/15/2025", initialUnits:160, avgPrice:65.38, currentPrice:138.56, unitsRemaining:79, currentSize:10995.31, weightPct:8.43, unrealPnL:5807.14 },
  { ticker:"GDXJ", theme:"Precious Metals", entryDate:"9/2/2025", initialUnits:68, avgPrice:82.06, currentPrice:102.48, unitsRemaining:68, currentSize:6964.75, weightPct:5.34, unrealPnL:1387.78 },
  { ticker:"HIMS", theme:"GLP-1s", entryDate:"7/15/2025", initialUnits:211, avgPrice:52.03, currentPrice:54.76, unitsRemaining:106, currentSize:5788.58, weightPct:4.44, unrealPnL:288.58 },
];

const f$ = (n:number) => n.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2});

export default function Page() {
  const totalWeight = holdings.reduce((s,h)=>s+h.weightPct,0);
  const asOf = new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

  return (
    <main style={wrap as React.CSSProperties}>
      {/* Top bar / title */}
      <section style={{marginBottom: 18}}>
        <h1 style={h1 as React.CSSProperties}>Exponential, Distilled — Public Portfolio</h1>
        <p style={tag as React.CSSProperties}>
          Live cross-asset mock portfolio. Designed to consistently outperform BTC & major benchmarks.
        </p>
      </section>

      {/* KPI row */}
      <section style={kpiGrid as React.CSSProperties}>
        <Kpi label="Inception" value={meta.inception}/>
        <Kpi label="Starting Value" value={f$(meta.starting)}/>
        <Kpi label="Current Value" value={f$(meta.current)}/>
        <Kpi label="As of" value={asOf}/>
      </section>

      {/* ROI row */}
      <section style={twoCols as React.CSSProperties}>
        <StatCard label="Portfolio ROI" value={`${(meta.roi*100).toFixed(2)}%`} accent="#7cc5ff"/>
        <StatCard label="Relative ROI vs BTC" value={`${(meta.relBtc*100).toFixed(2)}%`} accent="#ffe674" darkText />
      </section>

      {/* Holdings table */}
      <section style={{marginTop: 18}}>
        <h2 style={h2 as React.CSSProperties}>Live Portfolio</h2>
        <div style={tableShell as React.CSSProperties}>
          <table style={table as React.CSSProperties}>
            <thead>
              <tr>
                {HEADERS.map((h)=>(
                  <th key={h} style={th as React.CSSProperties}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((r, i)=>(
                <tr key={r.ticker} style={{background: i%2? "rgba(255,255,255,0.02)":"transparent"}}>
                  <td style={td}>{r.ticker}</td>
                  <td style={td}>{r.theme}</td>
                  <td style={td}>{r.entryDate}</td>
                  <td style={td}>{r.initialUnits}</td>
                  <td style={td}>{f$(r.avgPrice)}</td>
                  <td style={td}>{f$(r.currentPrice)}</td>
                  <td style={td}>{r.unitsRemaining}</td>
                  <td style={td}>{f$(r.currentSize)}</td>
                  <td style={td}>{r.weightPct.toFixed(2)}</td>
                  <td style={{...td, color: r.unrealPnL>=0? "#79f2b0":"#ff8f8f"}}>{f$(r.unrealPnL)}</td>
                </tr>
              ))}
              <tr>
                <td style={{...td, fontWeight:700}} colSpan={8}>Total Weight</td>
                <td style={{...td, fontWeight:700}}>{totalWeight.toFixed(2)}</td>
                <td style={td}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={disclaimer as React.CSSProperties}>
          * Mock portfolio. For education only. Not investment advice.
        </p>
      </section>
    </main>
  );
}

// --- components & styles ---
function Kpi({label, value}:{label:string; value:string}) {
  return (
    <div style={card as React.CSSProperties}>
      <div style={kpiLabel as React.CSSProperties}>{label}</div>
      <div style={kpiValue as React.CSSProperties}>{value}</div>
    </div>
  );
}

function StatCard(
  {label, value, accent, darkText=false}:{label:string; value:string; accent:string; darkText?:boolean}
){
  return (
    <div style={{...card, background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))", borderColor:"rgba(255,255,255,0.12)"}}>
      <div style={{...pill as React.CSSProperties, background: accent, color: darkText? "#0e1530":"#081425"}}>{label}</div>
      <div style={{fontSize: 28, fontWeight: 700, marginTop: 10}}>{value}</div>
    </div>
  );
}

const wrap = { maxWidth: 1100, margin: "36px auto 80px", padding: "0 16px" };
const h1 = { fontSize: 28, fontWeight: 800, margin: 0 };
const tag = { marginTop: 6, opacity: 0.8, fontSize: 14 };

const kpiGrid = { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginTop: 18 };
const twoCols = { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, marginTop: 12 };
const h2 = { fontSize: 18, fontWeight: 700, margin: "18px 0 10px" };

const card = { border: "1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: "14px 16px", backdropFilter: "blur(4px)" };
const kpiLabel = { fontSize: 12, opacity: 0.7 };
const kpiValue = { fontSize: 16, fontWeight: 700, marginTop: 6 };
const pill = { display:"inline-block", padding:"6px 10px", fontSize:12, borderRadius: 999 };

const tableShell = { overflowX: "auto", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 };
const table = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const th = {
  textAlign: "left",
  padding: "12px 14px",
  background: "rgba(8,20,41,0.8)",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  position: "sticky" as const,
  top: 0,
};
const td = { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const disclaimer = { fontSize: 12, opacity: 0.65, marginTop: 10 };

const HEADERS = [
  "Ticker","Theme","Entry Date","Initial Units","Average Price",
  "Current Price","Units Remaining","Current Size","Weight (%)","Unrealized P/L"
];

