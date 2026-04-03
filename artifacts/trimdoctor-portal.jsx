import { useState, useEffect, useRef } from "react";

const B = {
  forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C",
  sage: "#95D5B2", sageL: "#D8F3DC",
  cream: "#FBF8F3", warm: "#F5F0E8",
  gold: "#B8860B", goldL: "#DAA520",
  dark: "#1A1A1A", text: "#3D3D3D", muted: "#8A8A8A", border: "#E8E2D6",
  white: "#FFFFFF",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.cream};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}
.mn{font-family:'JetBrains Mono',monospace}
.grain::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}

.sidebar{position:fixed;left:0;top:0;bottom:0;width:256px;background:${B.white};border-right:1px solid ${B.border};padding:28px 0;display:flex;flex-direction:column;z-index:100}
.main{margin-left:256px;min-height:100vh;padding:32px 36px;max-width:940px}

.nav-i{display:flex;align-items:center;gap:11px;padding:10px 24px;color:${B.muted};cursor:pointer;font-size:14px;font-weight:500;transition:all .15s;border-left:3px solid transparent;margin-bottom:2px}
.nav-i:hover{color:${B.text};background:${B.cream}}
.nav-i.on{color:${B.forest};background:${B.sageL};border-left-color:${B.forest};font-weight:600}

.card{background:${B.white};border-radius:20px;border:1px solid ${B.border};padding:24px;transition:box-shadow .2s}
.card:hover{box-shadow:0 2px 16px rgba(0,0,0,.03)}

.tag{display:inline-flex;align-items:center;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:600}
.tg{background:${B.sageL};color:${B.forest}}
.ta{background:#FEF3C7;color:#92400E}
.tb{background:#EFF6FF;color:#2563EB}

.btn{padding:10px 22px;border-radius:12px;font-family:Figtree;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;border:none}
.bp{background:${B.forest};color:#fff}
.bp:hover{background:${B.forestL}}
.bo{background:transparent;border:1.5px solid ${B.border};color:${B.text}}
.bo:hover{border-color:${B.forest};color:${B.forest}}

.msg{max-width:80%;padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.65}
.msg-p{background:${B.forest};color:#fff;border-bottom-right-radius:4px;align-self:flex-end}
.msg-d{background:${B.white};border:1px solid ${B.border};color:${B.text};border-bottom-left-radius:4px;align-self:flex-start}

@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fadeIn .35s ease forwards}
@media(max-width:800px){.sidebar{display:none}.main{margin-left:0;padding:20px}}
`;

const P = {
  name: "Michael", joinDate: "Jan 14, 2026", months: 3,
  plan: "Semaglutide Injection", price: 299, nextBill: "Apr 14, 2026",
  provider: "Dr. Sarah Williams, MD", specialty: "Internal Medicine",
  pharmacy: "Belmar Pharma Solutions",
  dose: "0.5mg weekly", nextDose: "1.0mg weekly (titrating)",
  startW: 238, curW: 214, goalW: 185,
  wLog: [
    {d:"Jan 14",w:238},{d:"Jan 21",w:236},{d:"Jan 28",w:234},{d:"Feb 4",w:231},{d:"Feb 11",w:229},
    {d:"Feb 18",w:227},{d:"Feb 25",w:225},{d:"Mar 4",w:222},{d:"Mar 11",w:220},{d:"Mar 18",w:218},
    {d:"Mar 25",w:216},{d:"Apr 1",w:214},
  ],
  refCode: "MICHAEL50", refCount: 3, refEarned: 150,
};

const MSGS = [
  { from: "dr", text: "Great progress, Michael! I'm recommending we increase your dose to 1.0mg starting with your next shipment. Let me know if you have questions.", time: "Mar 28, 2:15 PM" },
  { from: "me", text: "Thanks Dr. Williams! I have been feeling the appetite suppression wearing off toward end of the week. Any side effects at the higher dose?", time: "Mar 28, 3:02 PM" },
  { from: "dr", text: "Good observation — very common at 0.5mg. At 1.0mg you may have temporary nausea. Stay hydrated, eat smaller meals, and reach out if it's too much.", time: "Mar 28, 4:30 PM" },
];

// ─── PAGES ────────────────────────────────────────────────
function Dashboard() {
  const lost = P.startW - P.curW;
  const prog = Math.round((lost / (P.startW - P.goalW)) * 100);
  const bmi = (703 * P.curW / (71 * 71)).toFixed(1);
  const mn = Math.min(...P.wLog.map(w => w.w));
  const mx = Math.max(...P.wLog.map(w => w.w));
  const rng = mx - mn || 1;

  return (
    <div className="fi">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: B.dark, marginBottom: 2 }}>Welcome back, {P.name}</h1>
      <p style={{ fontSize: 14, color: B.muted, marginBottom: 24 }}>{P.months} months into your journey</p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 14, background: `linear-gradient(90deg,${B.sageL},#EFF6FF)`, border: `1px solid rgba(27,67,50,.1)`, marginBottom: 24 }}>
        <span style={{ fontSize: 18 }}>📦</span>
        <div style={{ flex: 1 }}><span style={{ fontWeight: 600, color: B.dark, fontSize: 14 }}>Your April medication is being prepared</span><span style={{ color: B.muted, fontSize: 13 }}> — Est. ship: Apr 5</span></div>
        <span className="tag tg">In Progress</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { l: "Lost", v: `${lost} lbs`, s: `${((lost/P.startW)*100).toFixed(1)}%`, c: B.forest },
          { l: "Current", v: `${P.curW} lbs`, s: `BMI: ${bmi}`, c: B.dark },
          { l: "Goal", v: `${P.goalW} lbs`, s: `${P.startW-P.goalW-lost} to go`, c: "#2563EB" },
          { l: "Progress", v: `${prog}%`, s: "toward goal", c: B.gold },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{m.l}</div>
            <div className="mn" style={{ fontSize: 28, fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 12, color: B.muted, marginTop: 4 }}>{m.s}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, color: B.dark }}>Weight Trend</h3>
          <span className="tag tg">↓ {lost} lbs total</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
          {P.wLog.map((w, i) => {
            const h = ((w.w - mn + 3) / (rng + 6)) * 100;
            const last = i === P.wLog.length - 1;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }} title={`${w.d}: ${w.w} lbs`}>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: last ? B.forest : `${B.forest}40`, height: `${h}%`, minHeight: 4, transition: "all .3s" }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: B.muted }}>
          <span>{P.wLog[0].d}</span><span>{P.wLog[P.wLog.length - 1].d}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, color: B.dark, marginBottom: 14, fontSize: 15 }}>Current Treatment</h3>
          {[
            ["Medication", P.plan], ["Current Dose", P.dose], ["Next Dose", P.nextDose],
            ["Provider", P.provider], ["Pharmacy", P.pharmacy],
          ].map(([l, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "6px 0", borderBottom: i < 4 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ color: B.muted }}>{l}</span>
              <span style={{ fontWeight: 600, color: B.dark, textAlign: "right", maxWidth: "58%" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, color: B.dark, marginBottom: 14, fontSize: 15 }}>Notifications</h3>
          {[
            { i: "📦", t: "April medication being prepared", d: "2h ago" },
            { i: "📅", t: "Monthly check-in available", d: "1d ago" },
            { i: "🎉", t: "Milestone: 24 lbs lost!", d: "3d ago" },
            { i: "💊", t: "Dosage increase: 0.5→1.0mg", d: "5d ago" },
          ].map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize: 16 }}>{n.i}</span>
              <div><div style={{ fontSize: 13, fontWeight: 600, color: B.dark }}>{n.t}</div><div style={{ fontSize: 11, color: B.muted }}>{n.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Messages() {
  const [msgs, setMsgs] = useState(MSGS);
  const [inp, setInp] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!inp.trim()) return;
    setMsgs(p => [...p, { from: "me", text: inp.trim(), time: "Just now" }]);
    setInp("");
    setTimeout(() => setMsgs(p => [...p, { from: "dr", text: "Thanks for your message! I'll review and respond within a few hours. If urgent, call (323) 690-1564.", time: "Just now" }]), 1200);
  };

  return (
    <div className="fi">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: B.dark, marginBottom: 2 }}>Messages</h1>
      <p style={{ fontSize: 14, color: B.muted, marginBottom: 24 }}>Direct messaging with {P.provider}</p>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${B.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: B.sageL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👩‍⚕️</div>
          <div><div style={{ fontWeight: 700, fontSize: 14, color: B.dark }}>{P.provider}</div><div style={{ fontSize: 12, color: B.muted }}>{P.specialty}</div></div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} /><span style={{ fontSize: 12, color: "#10B981" }}>Available</span></div>
        </div>
        <div style={{ height: 380, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 10, background: B.cream }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div className={`msg ${m.from === "me" ? "msg-p" : "msg-d"}`}>{m.text}</div>
              <span style={{ fontSize: 10, color: B.muted, marginTop: 3, padding: "0 4px" }}>{m.time}</span>
            </div>
          ))}
          <div ref={ref} />
        </div>
        <div style={{ padding: 14, borderTop: `1px solid ${B.border}`, display: "flex", gap: 10 }}>
          <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "12px 16px", borderRadius: 14, border: `1.5px solid ${B.border}`, fontSize: 14, outline: "none", fontFamily: "Figtree", transition: "border .2s" }} />
          <button className="btn bp" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}

function Shipments() {
  const steps = ["Rx Sent", "Compounding", "QC Check", "Shipping", "Delivered"];
  return (
    <div className="fi">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: B.dark, marginBottom: 24 }}>Shipments</h1>
      <div className="card" style={{ borderLeft: `4px solid ${B.forest}`, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div><span className="tag tg" style={{ marginBottom: 6, display: "inline-flex" }}>Upcoming</span><h3 style={{ fontSize: 16, fontWeight: 700, color: B.dark }}>April — Semaglutide 1.0mg/mL</h3></div>
          <span className="mn" style={{ fontSize: 13, color: B.forest, fontWeight: 600 }}>Preparing</span>
        </div>
        <div style={{ display: "flex", gap: 0, marginBottom: 14 }}>
          {steps.map((s, i) => (<div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ height: 3, background: i < 2 ? B.forest : B.border, borderRadius: 2, marginBottom: 6 }} /><span style={{ fontSize: 11, color: i < 2 ? B.forest : B.muted, fontWeight: i < 2 ? 600 : 400 }}>{s}</span></div>))}
        </div>
        <p style={{ fontSize: 13, color: B.muted }}>Estimated delivery: <strong style={{ color: B.dark }}>Apr 8-10, 2026</strong></p>
      </div>
      {[
        { id: "ORD-10234", d: "Mar 12", m: "Semaglutide 0.5mg/mL", del: "Mar 16", tr: "1Z999AA10123456784" },
        { id: "ORD-10189", d: "Feb 12", m: "Semaglutide 0.25mg/mL", del: "Feb 16", tr: "1Z999AA10123456721" },
      ].map((o, i) => (
        <div key={i} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ display: "flex", gap: 6, marginBottom: 3 }}><span className="mn" style={{ fontSize: 12, color: "#2563EB" }}>{o.id}</span><span className="tag tg">Delivered</span></div><div style={{ fontWeight: 600, fontSize: 14, color: B.dark }}>{o.m}</div><div style={{ fontSize: 12, color: B.muted }}>Delivered {o.del}</div></div>
            <div style={{ textAlign: "right" }}><div className="mn" style={{ fontSize: 11, color: B.muted }}>{o.tr}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Billing() {
  return (
    <div className="fi">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: B.dark, marginBottom: 24 }}>Billing</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        <div className="card"><div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>Current Plan</div><div style={{ fontSize: 17, fontWeight: 700, color: B.dark, marginBottom: 2 }}>{P.plan}</div><div className="mn" style={{ fontSize: 30, color: B.forest, fontWeight: 700 }}>${P.price}<span style={{ fontSize: 14, color: B.muted, fontWeight: 400 }}>/mo</span></div><div style={{ fontSize: 13, color: B.muted, marginTop: 6 }}>Next: <strong>{P.nextBill}</strong></div><div style={{ display: "flex", gap: 6, marginTop: 14 }}><button className="btn bo" style={{ fontSize: 12 }}>Change</button><button className="btn bo" style={{ fontSize: 12, color: "#C0392B", borderColor: "#E8C4C4" }}>Cancel</button></div></div>
        <div className="card"><div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>Payment Method</div><div style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, borderRadius: 12, background: B.cream, border: `1px solid ${B.border}` }}><div style={{ width: 44, height: 30, borderRadius: 6, background: "linear-gradient(135deg,#1a1f71,#2d4bb5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 700 }}>VISA</div><div><div style={{ fontWeight: 600, fontSize: 14 }}>•••• 4242</div><div style={{ fontSize: 12, color: B.muted }}>Expires 12/27</div></div></div><button className="btn bo" style={{ fontSize: 12, marginTop: 10 }}>Update Card</button></div>
      </div>
      <div className="card">
        <h3 style={{ fontWeight: 700, color: B.dark, marginBottom: 14, fontSize: 15 }}>Payment History</h3>
        {[
          { id: "INV-3042", d: "Mar 14", a: 299 },
          { id: "INV-2891", d: "Feb 14", a: 299 },
          { id: "INV-2710", d: "Jan 14", a: 179 },
        ].map((inv, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${B.border}` : "none", gap: 12 }}>
            <span className="mn" style={{ fontSize: 12, color: "#2563EB", width: 80 }}>{inv.id}</span>
            <span style={{ fontSize: 13, flex: 1 }}>{inv.d}, 2026</span>
            <span className="mn" style={{ fontWeight: 700, fontSize: 14 }}>${inv.a}.00</span>
            <span className="tag tg" style={{ fontSize: 11 }}>Paid</span>
            <button className="btn bo" style={{ fontSize: 11, padding: "4px 12px" }}>Receipt</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Referral() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(`https://trimdoctor.com/ref/${P.refCode}`); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="fi">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: B.dark, marginBottom: 24 }}>Refer & Earn</h1>
      <div style={{ background: `linear-gradient(135deg,${B.sageL},#EFF6FF)`, border: `2px dashed ${B.forest}`, borderRadius: 20, padding: 32, textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 42, marginBottom: 10 }}>💰</div>
        <h2 className="pf" style={{ fontSize: 28, color: B.dark, marginBottom: 6 }}>Give $50, Get $50</h2>
        <p style={{ color: B.muted, fontSize: 14, maxWidth: 380, margin: "0 auto 20px" }}>Share your link. When a friend signs up, you both get $50 off.</p>
        <div style={{ display: "flex", gap: 8, maxWidth: 380, margin: "0 auto" }}>
          <div className="mn" style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: B.white, border: `2px solid ${B.forest}`, fontSize: 14, fontWeight: 600, color: B.dark }}>trimdoctor.com/ref/{P.refCode}</div>
          <button className="btn bp" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[{ v: P.refCount, l: "Referred", c: B.forest }, { v: `$${P.refEarned}`, l: "Earned", c: B.gold }, { v: "$50", l: "Per Referral", c: "#2563EB" }].map((m, i) => (
          <div key={i} className="card" style={{ textAlign: "center", padding: 18 }}><div className="mn" style={{ fontSize: 28, fontWeight: 700, color: m.c }}>{m.v}</div><div style={{ fontSize: 12, color: B.muted }}>{m.l}</div></div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────
const NAV = [
  { id: "dash", l: "Dashboard", i: "◉" },
  { id: "msgs", l: "Messages", i: "💬", badge: 1 },
  { id: "ship", l: "Shipments", i: "📦" },
  { id: "bill", l: "Billing", i: "💳" },
  { id: "ref", l: "Refer & Earn", i: "🎁" },
];

export default function App() {
  const [pg, setPg] = useState("dash");
  return (
    <div className="grain">
      <style>{css}</style>
      <div className="sidebar">
        <div style={{ padding: "0 24px 20px", borderBottom: `1px solid ${B.border}`, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.goldL}/></svg>
            <span className="pf" style={{ fontSize: 19, fontWeight: 700, color: B.dark }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 12, color: B.muted, marginTop: 6 }}>Patient Portal</div>
        </div>
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {NAV.map(n => (
            <div key={n.id} className={`nav-i ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}>
              <span style={{ fontSize: 15 }}>{n.i}</span>{n.l}
              {n.badge && <span style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: B.forest, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{n.badge}</span>}
            </div>
          ))}
        </nav>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: B.sageL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: B.dark }}>{P.name}</div><div style={{ fontSize: 11, color: B.muted }}>Since {P.joinDate}</div></div>
          </div>
        </div>
      </div>
      <div className="main">
        {pg === "dash" && <Dashboard />}
        {pg === "msgs" && <Messages />}
        {pg === "ship" && <Shipments />}
        {pg === "bill" && <Billing />}
        {pg === "ref" && <Referral />}
      </div>
    </div>
  );
}
