import { useState, useEffect } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", goldL: "#B8860B", dark: "#0C0F0D", text: "#8FA89A", bright: "#D4E8DC", white: "#F0F5F2", muted: "#5A6E63" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:#fff;-webkit-font-smoothing:antialiased;overflow:hidden;height:100vh}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.slide{width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;padding:60px 80px;position:relative;overflow:hidden}
.glow{position:absolute;border-radius:50%;filter:blur(80px);opacity:.08;pointer-events:none}
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fu .6s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.08s;opacity:0}.d2{animation-delay:.16s;opacity:0}.d3{animation-delay:.24s;opacity:0}.d4{animation-delay:.32s;opacity:0}.d5{animation-delay:.4s;opacity:0}
@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}
.shm{background:linear-gradient(90deg,${B.forest} 0%,${B.gold} 50%,${B.forest} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:sh 4s linear infinite}
.sb{position:absolute;padding:28px;border-radius:18px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);backdrop-filter:blur(4px)}
.dots{position:fixed;left:28px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;z-index:100}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.12);cursor:pointer;transition:all .3s}
.dot.on{background:${B.sage};height:22px;border-radius:4px}
.nav-b{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:100}
.nb{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all .2s}
.nb:hover{background:rgba(255,255,255,.08);color:#fff}
.cnt{position:fixed;bottom:24px;right:28px;font-size:12px;color:rgba(255,255,255,.2);z-index:100}
.cr{display:grid;gap:1px;align-items:center}
`;

const SLIDES = [
  // Title
  (a) => (
    <div className="slide" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="glow" style={{ width: 600, height: 600, background: B.sage, top: "5%", left: "20%" }} />
      <div className="glow" style={{ width: 400, height: 400, background: B.gold, bottom: "10%", right: "20%" }} />
      <div className={`au ${a}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 28 }}>
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
          <span className="pf" style={{ fontSize: 36, fontWeight: 700 }}>TrimDoctor</span>
        </div>
      </div>
      <h1 className={`pf au d1 ${a}`} style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -3, maxWidth: 780, marginBottom: 22 }}>
        The AI-Native <span className="shm">GLP-1</span> Telehealth Platform
      </h1>
      <p className={`au d2 ${a}`} style={{ fontSize: 19, color: "rgba(255,255,255,.4)", maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
        $40M+ Year 1 revenue. 2 employees. Zero medical infrastructure. Powered by AI and outsourced healthcare networks.
      </p>
      <div className={`au d3 ${a}`} style={{ fontSize: 13, color: "rgba(255,255,255,.2)" }}>Confidential · April 2026 · trimdoctor.com</div>
    </div>
  ),

  // Problem
  (a) => (
    <div className="slide">
      <div className="glow" style={{ width: 500, height: 500, background: "#E74C3C", top: "-10%", right: "-5%" }} />
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>The Problem</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 50, lineHeight: 1.08, letterSpacing: -2, maxWidth: 680, marginBottom: 40 }}>74% of Americans are overweight. GLP-1s work. Access is broken.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {[{ s: "$1,200+", l: "Monthly cost of brand-name Ozempic without insurance", e: "💰" }, { s: "6-12 mo", l: "Average wait for prior authorization from insurers", e: "⏳" }, { s: "73%", l: "Of GLP-1 prescriptions abandoned due to cost or access", e: "🚫" }].map((x, i) => (
          <div key={i} className={`sb au d${i + 2} ${a}`} style={{ position: "relative" }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{x.e}</div>
            <div className="mn" style={{ fontSize: 34, fontWeight: 700, color: B.sage, marginBottom: 6 }}>{x.s}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.6 }}>{x.l}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // Solution
  (a) => (
    <div className="slide">
      <div className="glow" style={{ width: 500, height: 500, background: B.sage, bottom: "-10%", left: "-5%" }} />
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>The Solution</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 50, lineHeight: 1.08, letterSpacing: -2, maxWidth: 680, marginBottom: 36 }}>Compounded GLP-1s. Online. <span style={{ color: B.sage }}>$179/month.</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[{ t: "AI-Built Platform", d: "Website, portal, support — all built and maintained with AI. Zero engineering team.", e: "🤖" }, { t: "Outsourced Medicine", d: "Licensed physicians via OpenLoop. FDA-regulated pharmacies. We never touch medicine.", e: "🏥" }, { t: "DTC Marketing Engine", d: "AI-generated creatives at scale. 15-20 new ads/week. $62 blended CAC.", e: "📱" }, { t: "Radical Efficiency", d: "2-person operation. No office. $20M+ profit on $44M revenue. 45% margins.", e: "⚡" }].map((x, i) => (
          <div key={i} className={`sb au d${i + 2} ${a}`} style={{ position: "relative", display: "flex", gap: 14 }}>
            <span style={{ fontSize: 26 }}>{x.e}</span>
            <div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{x.t}</div><div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>{x.d}</div></div>
          </div>
        ))}
      </div>
    </div>
  ),

  // Market
  (a) => (
    <div className="slide" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="glow" style={{ width: 700, height: 700, background: B.gold, top: "5%", left: "25%" }} />
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Market</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 50, lineHeight: 1.08, letterSpacing: -2, marginBottom: 44 }}>The GLP-1 Market is <span style={{ color: B.gold }}>$50B+</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22, maxWidth: 860, width: "100%" }}>
        {[{ l: "TAM", v: "$50B+", s: "Global GLP-1 (2026)", c: B.gold }, { l: "SAM", v: "$12B", s: "U.S. DTC telehealth GLP-1", c: B.sage }, { l: "SOM", v: "$500M", s: "Capturable in 3 years", c: "#3B82F6" }].map((m, i) => (
          <div key={i} className={`sb au d${i + 2} ${a}`} style={{ position: "relative", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{m.l}</div>
            <div className="mn" style={{ fontSize: 46, fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 6 }}>{m.s}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // Traction
  (a) => (
    <div className="slide">
      <div className="glow" style={{ width: 500, height: 500, background: B.sage, top: "0", right: "0" }} />
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Traction</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 50, letterSpacing: -2, marginBottom: 44 }}><span style={{ color: B.sage }}>$44.5M</span> Year 1 Revenue</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 36 }}>
        {[{ v: "300", l: "Month 1", s: "Cold start" }, { v: "14K", l: "Month 6", s: "46x growth" }, { v: "55K", l: "Month 12", s: "$9.8M MRR" }, { v: "$20.3M", l: "Net Profit", s: "45% margin" }].map((m, i) => (
          <div key={i} className={`sb au d${i + 2} ${a}`} style={{ position: "relative", textAlign: "center" }}>
            <div className="mn" style={{ fontSize: 34, fontWeight: 700, color: B.sage }}>{m.v}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 4 }}>{m.l}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 2 }}>{m.s}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // Unit Economics
  (a) => (
    <div className="slide">
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Unit Economics</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 48, letterSpacing: -2, marginBottom: 36 }}><span style={{ color: B.sage }}>24:1</span> LTV to CAC</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { title: "Revenue", rows: [["First month", "$179"], ["Ongoing", "$299/mo"], ["Avg retention", "5.8 months"], ["LTV", "$1,495"]] },
          { title: "Cost", rows: [["Pharmacy", "$45"], ["Physician", "$18"], ["Shipping", "$8.50"], ["Stripe", "$5.49"], ["Total COGS", "$76.99"], ["Gross margin", "57%"], ["CAC", "$62"]] },
        ].map((sec, si) => (
          <div key={si} className={`sb au d${si + 2} ${a}`} style={{ position: "relative" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>{sec.title}</div>
            {sec.rows.map(([l, v], ri) => (
              <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{l}</span>
                <span className="mn" style={{ fontSize: 14, fontWeight: 600, color: v.includes("$1,495") || v.includes("57%") ? B.sage : "#fff" }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`au d4 ${a}`} style={{ marginTop: 20, padding: 14, borderRadius: 12, background: `${B.sage}10`, border: `1px solid ${B.sage}20`, fontSize: 14, color: B.sage, textAlign: "center" }}>
        <strong>Payback: 11 days.</strong> CAC recovered on first payment.
      </div>
    </div>
  ),

  // Competition
  (a) => (
    <div className="slide">
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Competition</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 48, letterSpacing: -2, marginBottom: 28 }}>Same Market. <span style={{ color: B.sage }}>Different Model.</span></h2>
      <div className={`au d2 ${a}`}>
        <div className="cr" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: 1, textTransform: "uppercase" }}>
          <div>Company</div><div style={{ textAlign: "center" }}>Employees</div><div style={{ textAlign: "center" }}>Revenue</div><div style={{ textAlign: "center" }}>Rev/Emp</div><div style={{ textAlign: "center" }}>AI-Native</div>
        </div>
        {[
          { n: "TrimDoctor (Us)", e: "2", r: "$44M*", rpe: "$22M", ai: "✅", hl: true },
          { n: "MEDVi", e: "2", r: "$401M", rpe: "$200M", ai: "✅", hl: false },
          { n: "Hims & Hers", e: "2,442", r: "$2.4B", rpe: "$983K", ai: "❌", hl: false },
          { n: "Ro", e: "800+", r: "$500M+", rpe: "$625K", ai: "❌", hl: false },
          { n: "Calibrate", e: "200+", r: "$100M+", rpe: "$500K", ai: "❌", hl: false },
        ].map((c, i) => (
          <div key={i} className="cr" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.04)", color: c.hl ? B.sage : "rgba(255,255,255,.5)", fontWeight: c.hl ? 700 : 400, background: c.hl ? `${B.sage}08` : "transparent", borderRadius: 8, fontSize: 14 }}>
            <div style={{ fontWeight: 600 }}>{c.n}</div><div className="mn" style={{ textAlign: "center" }}>{c.e}</div><div className="mn" style={{ textAlign: "center" }}>{c.r}</div><div className="mn" style={{ textAlign: "center" }}>{c.rpe}</div><div style={{ textAlign: "center" }}>{c.ai}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // The Ask
  (a) => (
    <div className="slide" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="glow" style={{ width: 700, height: 700, background: B.sage, top: "0", left: "15%" }} />
      <p className={`au ${a}`} style={{ fontSize: 12, fontWeight: 700, color: B.sage, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>The Opportunity</p>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 54, letterSpacing: -2, marginBottom: 36 }}>Seeking <span style={{ color: B.gold }}>$5M</span> to scale to <span style={{ color: B.sage }}>$500M</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, maxWidth: 860, width: "100%", marginBottom: 36 }}>
        {[{ t: "Marketing Scale", p: "60%", a: "$3M", d: "Scale ads from $1M→$5M/mo. $1 in returns $3.90." }, { t: "Product Expansion", p: "25%", a: "$1.25M", d: "Tirzepatide tablets, meal delivery, peptides, men's health." }, { t: "Infrastructure", p: "15%", a: "$750K", d: "Small ops team, enterprise platform, pharmacy partnerships." }].map((x, i) => (
          <div key={i} className={`sb au d${i + 2} ${a}`} style={{ position: "relative", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span className="mn" style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>{x.p}</span><span className="mn" style={{ fontSize: 14, fontWeight: 700, color: B.sage }}>{x.a}</span></div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{x.t}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", lineHeight: 1.7 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // Close
  (a) => (
    <div className="slide" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="glow" style={{ width: 600, height: 600, background: B.sage, top: "15%", left: "30%" }} />
      <div className={`au ${a}`} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
        <svg width="52" height="52" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
        <span className="pf" style={{ fontSize: 40, fontWeight: 700 }}>TrimDoctor</span>
      </div>
      <h2 className={`pf au d1 ${a}`} style={{ fontSize: 50, lineHeight: 1.12, letterSpacing: -2, marginBottom: 14 }}>Let's build the future<br/>of healthcare together.</h2>
      <p className={`au d2 ${a}`} style={{ fontSize: 17, color: "rgba(255,255,255,.35)", marginBottom: 44 }}>michael@trimdoctor.com · trimdoctor.com</p>
      <div className={`au d3 ${a}`} style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(255,255,255,.2)" }}>
        {["$44.5M Year 1", "45% Margins", "24:1 LTV:CAC", "2 Employees"].map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  ),
];

export default function App() {
  const [s, setS] = useState(0);
  const [k, setK] = useState(0);
  const n = SLIDES.length;
  const go = (i) => { if (i >= 0 && i < n) { setS(i); setK(x => x + 1); } };
  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(s + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(s - 1); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [s]);
  const Slide = SLIDES[s];
  return (
    <div><style>{css}</style>
      <div className="dots">{SLIDES.map((_, i) => <div key={i} className={`dot ${s === i ? "on" : ""}`} onClick={() => go(i)} />)}</div>
      <div key={k}><Slide /></div>
      <div className="nav-b"><div className="nb" onClick={() => go(s - 1)} style={{ opacity: s === 0 ? .3 : 1 }}>←</div><div className="nb" onClick={() => go(s + 1)} style={{ opacity: s === n - 1 ? .3 : 1 }}>→</div></div>
      <div className="cnt"><span className="mn">{s + 1}/{n}</span></div>
    </div>
  );
}
