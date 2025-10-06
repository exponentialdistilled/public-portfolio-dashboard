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
  weightPct: number; // 0-100
  unrealPnL: number;
};

const meta = {
  inceptionDate: "July 15th 2025",
  starting: 100000,
  current: 130414,
  portfolioRoi: 0.3041,
  relRoiBtc: 0.2421
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
  { ticker:"HIMS", theme:"GLP-1s", entryDate:"7/15/2025", initialUnits:211, avgPrice:52.03, currentPrice:54.76, unitsRemaining:106, currentSize:5788.58, weightPct:4.44, unrealPnL:288.58 }
];

const fCurrency = (n:number) =>
  n.toLocaleString("en-US", { style:"currency", currency:"USD", maximumFractionDigits:2 });

export default function Page() {
  const totalWeight = holdings.reduce((s,h)=>s+h.weightPct,0);
  const asOf = new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });

  return (
    <div style={{maxWidth:1100, margin:"32px auto", padding:"0 16px"}}>
      <header style={{marginBottom:24}}>
        <h1 style={{fontSize:28, fontWeight:800}}>Exponential, Distilled — Public Portfolio</h1>
        <p style={{opacity:.8, marginTop:6}}>
          Live mock cross-asset portfolio, engineered to outperform BTC & major benchmarks.
        </p>
      </header>

      {/* KPI strip */}
      <section style={{
        display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:12, marginBottom:24
      }}>
        <Kpi label="Inception" value={meta.inceptionDate}/>
        <Kpi label="Starting Value" value={fCurrency(meta.starting)}/>
        <Kpi label="Current Value" value={fCurrency(meta.current)}/>
        <Kpi label="As of" value={asOf}/>
      </section>

      <section style={{
        display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, marginBottom:28
      }}>
        <StatCard label="Portfolio ROI" value={(meta.portfolioRoi*100).toFixed(2) + "%"} accent="#8BC34A"/>
        <StatCard label="Relative ROI vs BTC" value={(meta.relRoiBtc*100).toFixed(2) + "%"} accent="#FFEB3B" textColor="#111"/>
      </section>

      {/* Holdings table */}
      <section>
        <h2 style={{fontSize:18, fontWeight:700, margin:"14px 0"}}>Live Portfolio</h2>
        <div style={{overflowX:"auto", border:"1px solid #272727", borderRadius:8}}>
          <table style={{width:"100%", borderCollapse:"collapse", fontSize:14}}>
            <thead style={{background:"#0d2238"}}>
              <tr>
                {["Ticker","Theme","Entry Date","Initial Units","Average Price","Current Price","Units Remaining","Current Size","Weight (%)","Unrealized P/L"]
                  .map((h)=>(
                  <th key={h} style={{textAlign:"left", padding:"10px 12px", borderBottom:"1px solid #1f2a36"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((h,idx)=>(
                <tr key={h.ticker} style={{background: idx%2? "#121212":"#0f0f0f"}}>
                  <td style={td}>{h.ticker}</td>
                  <td style={td}>{h.theme}</td>
                  <td style={td}>{h.entryDate}</td>
                  <td style={td}>{h.initialUnits}</td>
                  <td style={td}>{fCurrency(h.avgPrice)}</td>
                  <td style={td}>{fCurrency(h.currentPrice)}</td>
                  <td style={td}>{h.unitsRemaining}</td>
                  <td style={td}>{fCurrency(h.currentSize)}</td>
                  <td style={td}>{h.weightPct.toFixed(2)}</td>
                  <td style={{...td, color: h.unrealPnL >= 0 ? "#7CFC9E" : "#FF6B6B"}}>
                    {fCurrency(h.unrealPnL)}
                  </td>
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
      </section>

      <footer style={{opacity:.7, fontSize:12, marginTop:18}}>
        * Mock portfolio. For educational purposes only. No investment advice.
      </footer>
    </div>
  );
}

const td: React.CSSProperties = { padding:"10px 12px", borderBottom:"1px solid #1e1e1e" };

function Kpi({label, value}:{label:string; value:string}) {
  return (
    <div style={{border:"1px solid #262626", borderRadius:10, padding:"14px 16px"}}>
      <div style={{opacity:.7, fontSize:12}}>{label}</div>
      <div style={{fontSize:16, fontWeight:700, marginTop:6}}>{value}</div>
    </div>
  );
}

function StatCard({label, value, accent, textColor}:{label:string; value:string; accent:string; textColor?:string}) {
  return (
    <div style={{border:"1px solid #262626", borderRadius:10, padding:"16px", background:accent+"20"}}>
      <div style={{opacity:.8, fontSize:12}}>{label}</div>
      <div style={{fontSize:22, fontWeight:800, marginTop:6, color:textColor ?? "#eaeaea"}}>{value}</div>
    </div>
  );
}
