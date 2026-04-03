import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4" };
const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n}`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100}
.ma{margin-left:236px;min-height:100vh;padding:24px 28px}
.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}
.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px;margin-bottom:12px}
.mt{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:16px 18px}
.cc{padding:5px 7px;text-align:center;font-size:12px;border-radius:4px}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const MRR = [
  { m: "Sep", mrr: 53700, newM: 53700, churnM: 0, cust: 300 },
  { m: "Oct", mrr: 280200, newM: 248400, churnM: 21900, cust: 1200 },
  { m: "Nov", mrr: 762500, newM: 541000, churnM: 58700, cust: 3500 },
  { m: "Dec", mrr: 1388000, newM: 756000, churnM: 130500, cust: 6000 },
  { m: "Jan", mrr: 2247500, newM: 1102000, churnM: 242500, cust: 9500 },
  { m: "Feb", mrr: 3412000, newM: 1548000, churnM: 383500, cust: 14000 },
  { m: "Mar", mrr: 4690000, newM: 1802000, churnM: 524000, cust: 19000 },
  { m: "Apr", mrr: 6175000, newM: 2180000, churnM: 695000, cust: 25000 },
];

const COHORTS = [
  { c: "Sep '24", s: 300, r: [100, 82, 71, 62, 55, 49, 44, 40] },
  { c: "Oct '24", s: 900, r: [100, 84, 73, 64, 57, 51, 46] },
  { c: "Nov '24", s: 2300, r: [100, 83, 72, 63, 56, 50] },
  { c: "Dec '24", s: 2500, r: [100, 85, 74, 65, 58] },
  { c: "Jan '25", s: 3500, r: [100, 84, 73, 64] },
  { c: "Feb '25", s: 4500, r: [100, 83, 72] },
  { c: "Mar '25", s: 5000, r: [100, 84] },
  { c: "Apr '25", s: 6000, r: [100] },
];

const CHANNELS = [
  { ch: "Meta (FB/IG)", sp: 2520000, cu: 32800, rv: 18284000, cac: 77, ltv: 1480, roas: 3.86 },
  { ch: "TikTok", sp: 1008000, cu: 16200, rv: 9234000, cac: 62, ltv: 1520, roas: 4.12 },
  { ch: "Google Brand", sp: 336000, cu: 8400, rv: 5796000, cac: 40, ltv: 1540, roas: 6.13 },
  { ch: "Influencer (FitTea Network)", sp: 210000, cu: 4800, rv: 3456000, cac: 44, ltv: 1580, roas: 5.84 },
  { ch: "Referral", sp: 84000, cu: 3400, rv: 2448000, cac: 25, ltv: 1620, roas: 8.43 },
  { ch: "Organic/SEO", sp: 12000, cu: 2100, rv: 1512000, cac: 6, ltv: 1490, roas: 42.0 },
];

const PNL = [
  { m: "Sep", rv: 53700, cg: 23100, ad: 30000, op: 5000 },
  { m: "Oct", rv: 280200, cg: 120500, ad: 80000, op: 8000 },
  { m: "Nov", rv: 762500, cg: 327900, ad: 180000, op: 12000 },
  { m: "Dec", rv: 1388000, cg: 596800, ad: 280000, op: 18000 },
  { m: "Jan", rv: 2247500, cg: 966400, ad: 380000, op: 22000 },
  { m: "Feb", rv: 3412000, cg: 1467200, ad: 480000, op: 28000 },
  { m: "Mar", rv: 4690000, cg: 2016700, ad: 560000, op: 32000 },
  { m: "Apr", rv: 6175000, cg: 2655300, ad: 650000, op: 38000 },
];

function MrrPage() {
  const l = MRR[MRR.length - 1]; const p = MRR[MRR.length - 2]; const mx = Math.max(...MRR.map(d => d.mrr));
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 20 }}>MRR & Growth</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 18 }}>
        {[{ l: "MRR", v: fmt(l.mrr), c: B.sage }, { l: "New MRR", v: fmt(l.newM), c: B.cyan }, { l: "Churned", v: fmt(l.churnM), c: B.red }, { l: "Net New", v: fmt(l.newM - l.churnM), c: B.sage }, { l: "Customers", v: l.cust.toLocaleString(), c: B.bright }].map((m, i) => (
          <div key={i} className="mt"><div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{m.l}</div><div className="mn" style={{ fontSize: 24, fontWeight: 700, color: m.c }}>{m.v}</div></div>
        ))}
      </div>
      <div className="cd">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.bright, marginBottom: 16 }}>MRR Growth</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 160, marginBottom: 6 }}>
          {MRR.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div className="mn" style={{ fontSize: 9, color: B.muted }}>{fmt(d.mrr)}</div>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                <div style={{ height: `${(d.newM / mx) * 130}px`, background: B.sage, borderRadius: "3px 3px 0 0", minHeight: 2 }} />
                <div style={{ height: `${(d.churnM / mx) * 130}px`, background: B.red, borderRadius: "0 0 3px 3px", opacity: .6, minHeight: 0 }} />
              </div>
              <span style={{ fontSize: 10, color: B.muted }}>{d.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CohortPage() {
  const gc = p => p >= 80 ? `${B.sage}30` : p >= 60 ? `${B.sage}20` : p >= 45 ? `${B.amber}20` : p >= 30 ? `${B.amber}15` : `${B.red}10`;
  const tc = p => p >= 60 ? B.sage : p >= 40 ? B.amber : B.red;
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 20 }}>Cohort Retention</h1>
      <div className="cd" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, borderBottom: `1px solid ${B.border}` }}>Cohort</th>
            <th style={{ textAlign: "center", padding: "8px", fontSize: 10, fontWeight: 700, color: B.muted, borderBottom: `1px solid ${B.border}` }}>Size</th>
            {[0,1,2,3,4,5,6,7].map(m => <th key={m} style={{ textAlign: "center", padding: "8px", fontSize: 10, fontWeight: 700, color: B.muted, borderBottom: `1px solid ${B.border}` }}>M{m}</th>)}
          </tr></thead>
          <tbody>
            {COHORTS.map((c, i) => (
              <tr key={i}>
                <td style={{ padding: "6px 10px", fontWeight: 600, fontSize: 13, color: B.bright, whiteSpace: "nowrap" }}>{c.c}</td>
                <td className="mn" style={{ textAlign: "center", padding: 6, fontSize: 12, color: B.muted }}>{c.s.toLocaleString()}</td>
                {[0,1,2,3,4,5,6,7].map(m => (
                  <td key={m} style={{ padding: 3 }}>
                    {c.r[m] !== undefined ? (
                      <div className="cc mn" style={{ background: gc(c.r[m]), color: tc(c.r[m]), fontWeight: 600 }}>{c.r[m]}%</div>
                    ) : <div className="cc" style={{ color: B.border }}>—</div>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cd">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.bright, marginBottom: 8 }}>Key Insights</h3>
        <div style={{ fontSize: 13, color: B.text, lineHeight: 2 }}>
          <div>• <strong style={{ color: B.sage }}>M1→M2:</strong> ~83% retention (best-in-class telehealth)</div>
          <div>• <strong style={{ color: B.amber }}>Month 3:</strong> Biggest drop — focus retention here (dosage adjustment emails)</div>
          <div>• <strong style={{ color: B.sage }}>Month 4+:</strong> Stabilizes. Patients who stay 4+ months tend to stay 8+</div>
          <div>• <strong style={{ color: B.cyan }}>Avg lifetime:</strong> 5.8 months → $1,495 LTV</div>
        </div>
      </div>
    </div>
  );
}

function AttrPage() {
  const totR = CHANNELS.reduce((s, c) => s + c.rv, 0); const totS = CHANNELS.reduce((s, c) => s + c.sp, 0);
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 20 }}>Channel Attribution</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 18 }}>
        {[{ l: "Revenue", v: fmt(totR), c: B.sage }, { l: "Ad Spend", v: fmt(totS), c: B.blue }, { l: "ROAS", v: (totR / totS).toFixed(1) + "x", c: B.sage }, { l: "Customers", v: CHANNELS.reduce((s, c) => s + c.cu, 0).toLocaleString(), c: B.bright }].map((m, i) => (
          <div key={i} className="mt"><div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{m.l}</div><div className="mn" style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div></div>
        ))}
      </div>
      <div className="cd" style={{ padding: 0, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Channel", "Spend", "Customers", "Revenue", "CAC", "LTV", "ROAS"].map((h, i) => (
            <th key={i} style={{ textAlign: i >= 1 ? "right" : "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: .8, color: B.muted, borderBottom: `1px solid ${B.border}` }}>{h}</th>
          ))}</tr></thead>
          <tbody>
            {CHANNELS.sort((a, b) => b.rv - a.rv).map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "10px 14px", fontWeight: 600, color: B.bright, fontSize: 13 }}>{c.ch}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12 }}>{fmt(c.sp)}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12 }}>{c.cu.toLocaleString()}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, fontWeight: 700, color: B.sage }}>{fmt(c.rv)}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, color: c.cac < 50 ? B.sage : B.text }}>${c.cac}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12 }}>${c.ltv}</td>
                <td className="mn" style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, fontWeight: 700, color: c.roas >= 5 ? B.sage : c.roas >= 3.5 ? B.cyan : B.amber }}>{c.roas.toFixed(1)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cd" style={{ marginTop: 4 }}>
        <div style={{ fontSize: 13, color: B.text, lineHeight: 2 }}>
          <div>• <strong style={{ color: B.sage }}>Scale aggressively:</strong> Referral (8.4x), Organic (42x), Influencer/FitTea network (5.8x)</div>
          <div>• <strong style={{ color: B.cyan }}>Maintain:</strong> TikTok (4.1x), Meta (3.9x) — volume drivers</div>
          <div>• <strong style={{ color: B.bright }}>Your edge:</strong> Influencer channel at 5.8x ROAS — that's the FitTea playbook paying off</div>
        </div>
      </div>
    </div>
  );
}

function PnlPage() {
  const tot = PNL.reduce((a, m) => ({ rv: a.rv + m.rv, cg: a.cg + m.cg, ad: a.ad + m.ad, op: a.op + m.op }), { rv: 0, cg: 0, ad: 0, op: 0 });
  tot.pr = tot.rv - tot.cg - tot.ad - tot.op;
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 20 }}>Profit & Loss</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 18 }}>
        {[{ l: "Revenue", v: fmt(tot.rv), c: B.bright }, { l: "COGS", v: fmt(tot.cg), c: B.red }, { l: "Ad Spend", v: fmt(tot.ad), c: B.blue }, { l: "OpEx", v: fmt(tot.op), c: B.muted }, { l: "Net Profit", v: fmt(tot.pr), c: B.sage, sub: `${(tot.pr / tot.rv * 100).toFixed(0)}%` }].map((m, i) => (
          <div key={i} className="mt"><div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{m.l}</div><div className="mn" style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div>{m.sub && <div style={{ fontSize: 11, color: B.sage, marginTop: 2 }}>{m.sub} margin</div>}</div>
        ))}
      </div>
      <div className="cd" style={{ padding: 0, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Month", "Revenue", "COGS", "Ad Spend", "OpEx", "Profit", "Margin"].map((h, i) => (
            <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "10px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: .8, color: B.muted, borderBottom: `1px solid ${B.border}` }}>{h}</th>
          ))}</tr></thead>
          <tbody>
            {PNL.map((m, i) => { const pr = m.rv - m.cg - m.ad - m.op; return (
              <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: B.bright }}>{m.m}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12 }}>{fmt(m.rv)}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12, color: B.red }}>{fmt(m.cg)}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12, color: B.blue }}>{fmt(m.ad)}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12, color: B.muted }}>{fmt(m.op)}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12, fontWeight: 700, color: pr >= 0 ? B.sage : B.red }}>{fmt(pr)}</td>
                <td className="mn" style={{ padding: "9px 12px", textAlign: "right", fontSize: 12, color: pr >= 0 ? B.sage : B.red }}>{(pr / m.rv * 100).toFixed(0)}%</td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const NAV = [{ id: "mrr", l: "MRR & Growth", i: "📈" }, { id: "cohorts", l: "Cohort Retention", i: "🔄" }, { id: "attr", l: "Attribution", i: "🎯" }, { id: "pnl", l: "Profit & Loss", i: "💰" }];

export default function App() {
  const [pg, setPg] = useState("mrr");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>Analytics & Intelligence</div>
        </div>
        <div style={{ padding: "0 8px" }}>{NAV.map(n => (<div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}><span style={{ fontSize: 14 }}>{n.i}</span>{n.l}</div>))}</div>
      </div>
      <div className="ma">
        {pg === "mrr" && <MrrPage />}
        {pg === "cohorts" && <CohortPage />}
        {pg === "attr" && <AttrPage />}
        {pg === "pnl" && <PnlPage />}
      </div>
    </div>
  );
}
