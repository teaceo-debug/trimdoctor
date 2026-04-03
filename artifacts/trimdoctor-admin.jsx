import { useState, useEffect, useRef } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", dark3: "#1C2B24", text: "#8FA89A", bright: "#D4E8DC", white: "#F0F5F2", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}
.mn{font-family:'JetBrains Mono',monospace}

.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100;overflow-y:auto}
.mn-area{margin-left:236px;min-height:100vh;padding:24px 28px}

.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}
.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}

.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px}
.mt{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:16px 18px}

.tg{display:inline-flex;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600}
.tg-g{background:rgba(149,213,178,.1);color:${B.sage}}
.tg-r{background:rgba(231,76,60,.1);color:${B.red}}
.tg-a{background:rgba(245,158,11,.1);color:${B.amber}}
.tg-b{background:rgba(59,130,246,.1);color:${B.blue}}
.tg-p{background:rgba(139,92,246,.1);color:${B.purple}}

.ch-box{display:flex;flex-direction:column;height:480px;background:${B.dark};border-radius:14px;border:1px solid ${B.border};overflow:hidden}
.ch-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.ch-in{padding:12px;border-top:1px solid ${B.border};display:flex;gap:8px}
.ch-m{max-width:82%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.6}
.ch-u{align-self:flex-end;background:${B.forestL};color:#fff;border-bottom-right-radius:4px}
.ch-a{align-self:flex-start;background:${B.dark2};color:${B.text};border:1px solid ${B.border};border-bottom-left-radius:4px}

.inp{background:rgba(0,0,0,.3);border:1px solid ${B.border};border-radius:10px;padding:9px 14px;color:${B.bright};font-family:Figtree;font-size:13px;outline:none;width:100%;transition:border .2s}
.inp:focus{border-color:${B.sage}}
.bt{padding:8px 16px;border-radius:10px;font-family:Figtree;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:none;background:${B.forestL};color:#fff}
.bt:hover{background:${B.forestM}}

@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fadeIn .3s ease}
@keyframes gp{0%,100%{opacity:1}50%{opacity:.4}}
@media(max-width:900px){.sb{display:none}.mn-area{margin-left:0;padding:16px}}
`;

const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n}`;

function DashPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 6000); return () => clearInterval(t); }, []);

  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div><h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright }}>Dashboard</h1><div style={{ fontSize: 12, color: B.muted }}>Real-time business metrics</div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: B.sage, animation: "gp 2s ease infinite" }} /><span style={{ fontSize: 12, color: B.sage, fontWeight: 600 }}>LIVE</span></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 22 }}>
        {[
          { l: "Revenue Today", v: fmt(48720 + tick * 180), c: B.sage },
          { l: "New Patients", v: "47", c: B.cyan },
          { l: "Active Subs", v: "14,892", c: B.bright },
          { l: "Churn Rate", v: "16.8%", c: B.amber },
          { l: "AI Resolution", v: "82.4%", c: B.purple },
          { l: "ROAS", v: "3.9x", c: B.blue },
        ].map((m, i) => (
          <div key={i} className="mt">
            <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{m.l}</div>
            <div className="mn" style={{ fontSize: 24, fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="cd">
          <h3 style={{ fontSize: 14, fontWeight: 700, color: B.bright, marginBottom: 14 }}>Patient Pipeline</h3>
          {[{ s: "Intake", n: 34, c: B.blue }, { s: "Review", n: 28, c: B.amber }, { s: "Approved", n: 22, c: B.sage }, { s: "Pharmacy", n: 18, c: B.purple }, { s: "Shipped", n: 31, c: B.cyan }, { s: "Active", n: 67, c: B.sage }].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: B.muted, width: 70 }}>{p.s}</span>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,.04)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${(p.n / 67) * 100}%`, height: "100%", borderRadius: 3, background: p.c }} /></div>
              <span className="mn" style={{ fontSize: 12, color: B.bright, width: 24, textAlign: "right" }}>{p.n}</span>
            </div>
          ))}
        </div>
        <div className="cd">
          <h3 style={{ fontSize: 14, fontWeight: 700, color: B.bright, marginBottom: 14 }}>Activity Feed</h3>
          {[
            { t: "2m", e: "New signup", d: "Sarah Chen — Semaglutide", c: B.sage },
            { t: "5m", e: "Rx approved", d: "Marcus Rivera — Dr. Williams", c: B.blue },
            { t: "8m", e: "Order shipped", d: "ORD-20041 → TX", c: B.purple },
            { t: "12m", e: "AI resolved ticket", d: "Shipping inquiry", c: B.cyan },
            { t: "15m", e: "Payment received", d: "$299 — Emily Watson", c: B.sage },
            { t: "18m", e: "Ticket escalated", d: "Side effects concern", c: B.amber },
            { t: "22m", e: "Cancelled", d: "Nina Williams — Mo 3", c: B.red },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: a.c, marginTop: 6, flexShrink: 0 }} />
              <div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 12, fontWeight: 600, color: B.bright }}>{a.e}</span><span style={{ fontSize: 10, color: B.muted }}>{a.t}</span></div><span style={{ fontSize: 11, color: B.muted }}>{a.d}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="cd">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: B.bright, marginBottom: 14 }}>Fulfillment</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {[{ l: "Pending Rx", n: 24, e: "📋", c: B.amber }, { l: "Compounding", n: 18, e: "⚗️", c: B.purple }, { l: "QC Check", n: 12, e: "🔬", c: B.blue }, { l: "Shipped", n: 31, e: "📦", c: B.cyan }, { l: "Delivered", n: 45, e: "✅", c: B.sage }].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: 14, background: "rgba(0,0,0,.2)", borderRadius: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.e}</div>
              <div className="mn" style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 10, color: B.muted, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [msgs, setMsgs] = useState([
    { r: "sys", t: "TrimDoctor AI Support Agent Online" },
    { r: "ai", t: "Hi! I'm the TrimDoctor AI support assistant. I can help with billing, shipping, dosage questions, and more. What can I help with?" },
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const SYS = `You are the AI customer support agent for TrimDoctor, a telehealth platform for GLP-1 weight loss medication. Pricing: Semaglutide injection $179 first month, $299 ongoing. Tablets $149/$249. Tirzepatide $249/$399. Free shipping, 3-5 days. Physician review 24-48 hrs. Cancel anytime. Common side effects: nausea, reduced appetite (subside in 1-2 weeks). Storage: refrigerate injectables. Be concise (2-3 sentences), friendly, professional. For medical concerns: say you're connecting them with their provider. Never make up info.`;

  const send = async () => {
    if (!inp.trim() || loading) return;
    const txt = inp.trim();
    setInp(""); setLoading(true);
    setMsgs(p => [...p, { r: "user", t: txt }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYS,
          messages: [...msgs.filter(m => m.r !== "sys").map(m => ({ role: m.r === "ai" ? "assistant" : "user", content: m.t })), { role: "user", content: txt }] }),
      });
      const data = await res.json();
      setMsgs(p => [...p, { r: "ai", t: data.content?.[0]?.text || "I'm having trouble. Email help@trimdoctor.com." }]);
    } catch { setMsgs(p => [...p, { r: "ai", t: "I'm temporarily unavailable. Email help@trimdoctor.com or call (323) 690-1564." }]); }
    setLoading(false);
  };

  const quick = ["When will my order ship?", "I want to cancel", "I'm feeling nauseous", "How do I change my dose?", "I was charged twice"];

  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright }}>AI Support Chatbot</h1><p style={{ fontSize: 12, color: B.muted }}>Powered by Claude — test the customer experience</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: B.sage, animation: "gp 2s ease infinite" }} /><span style={{ fontSize: 12, color: B.sage, fontWeight: 600 }}>ONLINE</span></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 14 }}>
        <div className="ch-box">
          <div className="ch-msgs" ref={ref}>
            {msgs.map((m, i) => (
              <div key={i} className={`ch-m ${m.r === "user" ? "ch-u" : m.r === "sys" ? "" : "ch-a"}`} style={m.r === "sys" ? { alignSelf: "center", background: `${B.purple}15`, color: B.purple, fontSize: 11, padding: "4px 12px", borderRadius: 20 } : {}}>
                {m.t}
              </div>
            ))}
            {loading && <div className="ch-m ch-a" style={{ opacity: .6 }}>Thinking...</div>}
            <div ref={ref} />
          </div>
          <div className="ch-in">
            <input className="inp" placeholder="Type a customer message..." value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} disabled={loading} />
            <button className="bt" onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
        <div>
          <div className="cd" style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>Quick Tests</div>
            {quick.map((q, i) => (
              <div key={i} onClick={() => setInp(q)} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}`, cursor: "pointer", fontSize: 12, color: B.text, marginBottom: 5, transition: "border .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = B.sage}
                onMouseLeave={e => e.currentTarget.style.borderColor = B.border}>{q}</div>
            ))}
          </div>
          <div className="cd">
            <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>Config</div>
            <div style={{ fontSize: 12, color: B.text, lineHeight: 1.8 }}>
              <div>Model: <span className="mn" style={{ color: B.sage }}>claude-sonnet-4</span></div>
              <div>Escalation: Medical → Provider</div>
              <div>Tone: Friendly, concise</div>
              <div>Target: 82%+ AI resolution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────
const NAV = [{ id: "dash", l: "Dashboard", i: "◉" }, { id: "chat", l: "AI Chatbot", i: "🤖" }];

export default function App() {
  const [pg, setPg] = useState("dash");
  return (
    <div>
      <style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: B.sage, background: `${B.sage}15`, padding: "2px 6px", borderRadius: 4, marginLeft: 2 }}>ADMIN</span>
          </div>
        </div>
        <div style={{ padding: "0 8px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: 1, padding: "8px 12px 4px" }}>Operations</div>
          {NAV.map(n => (
            <div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}>
              <span style={{ fontSize: 14 }}>{n.i}</span>{n.l}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, borderTop: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.forestL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700 }}>M</div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: B.bright }}>Michael</div><div style={{ fontSize: 10, color: B.muted }}>Founder & CEO</div></div>
          </div>
        </div>
      </div>
      <div className="mn-area">
        {pg === "dash" && <DashPage />}
        {pg === "chat" && <ChatPage />}
      </div>
    </div>
  );
}
