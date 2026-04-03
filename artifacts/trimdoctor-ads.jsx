import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", dark3: "#1C2B24", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4", pink: "#EC4899" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100}
.ma{margin-left:236px;min-height:100vh;padding:24px 28px}
.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}
.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px}
.tg{display:inline-flex;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600}
.inp{background:rgba(0,0,0,.3);border:1px solid ${B.border};border-radius:10px;padding:10px 14px;color:${B.bright};font-family:Figtree;font-size:13px;outline:none;width:100%}.inp:focus{border-color:${B.sage}}
textarea.inp{resize:vertical;min-height:70px;line-height:1.6}
.bt{padding:8px 16px;border-radius:10px;font-family:Figtree;font-size:13px;font-weight:600;cursor:pointer;border:none;background:${B.forestL};color:#fff;transition:all .15s}.bt:hover{background:${B.forestM}}
.bt-g{background:transparent;color:${B.muted};border:1px solid ${B.border}}.bt-g:hover{color:${B.bright};border-color:${B.muted}}
.script-b{background:rgba(0,0,0,.3);border-radius:12px;padding:18px 22px;border-left:3px solid ${B.sage};font-size:14px;line-height:1.85;color:${B.text};white-space:pre-wrap}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const SYS = `You are an expert direct-response ad copywriter for TrimDoctor, a GLP-1 telehealth weight loss platform (trimdoctor.com). Compounded semaglutide starting at $179/mo, tirzepatide at $249/mo. No insurance needed. Board-certified physicians. Free shipping.

TARGET: Adults 30-60, overweight, tried failed diets, priced out of brand-name GLP-1s ($1,200+/mo).

COMPLIANCE (CRITICAL): Never guarantee weight loss. Use "may help", "patients have reported". Include "results may vary". Never claim to cure diseases. Use "consult with a healthcare provider" where appropriate.

TONE: Conversational, authentic — NOT salesy. For UGC: write as a real person sharing their story. For authority: doctor explaining science simply.`;

function GeneratorPage() {
  const [cfg, setCfg] = useState({ platform: "meta", format: "ugc", length: "30", angle: "price" });
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);

  const FORMATS = [
    { id: "ugc", l: "UGC Testimonial", d: "First-person weight loss story" },
    { id: "doctor", l: "Doctor Authority", d: "Physician explaining GLP-1 science" },
    { id: "price", l: "Price Comparison", d: "Ozempic $1,200 vs TrimDoctor $179" },
    { id: "problem", l: "Problem → Solution", d: "Pattern interrupt → GLP-1 answer" },
    { id: "myth", l: "Myth Buster", d: "'Everything you've heard about diets is wrong'" },
  ];

  const generate = async () => {
    setLoading(true); setOut(null);
    const fmt = FORMATS.find(f => f.id === cfg.format);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYS,
          messages: [{ role: "user", content: `Generate a ${cfg.length}-second ${fmt?.l} ad script for ${cfg.platform === "meta" ? "Facebook/Instagram" : cfg.platform === "tiktok" ? "TikTok" : "YouTube"}. Angle: ${cfg.angle === "price" ? "Price savings vs brand-name" : cfg.angle === "convenience" ? "No doctor visits, delivered to door" : cfg.angle === "science" ? "The science behind GLP-1s" : "Failed diets, this actually works"}. Return ONLY JSON (no markdown): {"hook":"3-sec hook","script":"Full script with [VISUAL] cues","cta":"Call to action","headlines":["A","B","C"],"primary_text":"Ad copy above video"}` }] }),
      });
      const data = await res.json();
      const txt = data.content?.[0]?.text || "";
      setOut(JSON.parse(txt.replace(/```json|```/g, "").trim()));
    } catch (e) { setOut({ error: "Generation failed — try again." }); }
    setLoading(false);
  };

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 4 }}>AI Ad Generator</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 22 }}>Generate compliant ad scripts, hooks, and copy</p>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        <div className="cd">
          <div style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 14 }}>Creative Brief</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: B.bright, display: "block", marginBottom: 4 }}>Platform</label>
            <div style={{ display: "flex", gap: 5 }}>
              {[["meta", "Meta"], ["tiktok", "TikTok"], ["youtube", "YouTube"]].map(([id, l]) => (
                <div key={id} onClick={() => setCfg(c => ({ ...c, platform: id }))} style={{ flex: 1, padding: "7px 0", textAlign: "center", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", background: cfg.platform === id ? B.forestL : "rgba(0,0,0,.3)", color: cfg.platform === id ? "#fff" : B.muted, border: `1px solid ${cfg.platform === id ? B.forestL : B.border}` }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: B.bright, display: "block", marginBottom: 4 }}>Format</label>
            {FORMATS.map(f => (
              <div key={f.id} onClick={() => setCfg(c => ({ ...c, format: f.id }))} style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, marginBottom: 3, background: cfg.format === f.id ? `${B.sage}15` : "rgba(0,0,0,.2)", border: `1px solid ${cfg.format === f.id ? B.sage : B.border}`, color: cfg.format === f.id ? B.sage : B.text }}>
                <div style={{ fontWeight: 600 }}>{f.l}</div>
                <div style={{ fontSize: 11, color: B.muted }}>{f.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: B.bright, display: "block", marginBottom: 4 }}>Length</label>
            <div style={{ display: "flex", gap: 5 }}>
              {["15", "30", "60"].map(l => (
                <div key={l} onClick={() => setCfg(c => ({ ...c, length: l }))} style={{ flex: 1, padding: "7px 0", textAlign: "center", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", background: cfg.length === l ? B.forestL : "rgba(0,0,0,.3)", color: cfg.length === l ? "#fff" : B.muted, border: `1px solid ${cfg.length === l ? B.forestL : B.border}` }}>{l}s</div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: B.bright, display: "block", marginBottom: 4 }}>Angle</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {[["price", "Price savings"], ["convenience", "Convenience"], ["science", "Science"], ["frustration", "Failed diets"]].map(([id, l]) => (
                <div key={id} onClick={() => setCfg(c => ({ ...c, angle: id }))} style={{ padding: "6px 8px", textAlign: "center", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", background: cfg.angle === id ? `${B.sage}15` : "rgba(0,0,0,.2)", color: cfg.angle === id ? B.sage : B.muted, border: `1px solid ${cfg.angle === id ? B.sage : B.border}` }}>{l}</div>
              ))}
            </div>
          </div>
          <button className="bt" onClick={generate} disabled={loading} style={{ width: "100%", padding: 12, fontSize: 14, opacity: loading ? .7 : 1 }}>
            {loading ? "⚡ Generating..." : "⚡ Generate Creative"}
          </button>
        </div>

        <div>
          {loading && <div className="cd" style={{ textAlign: "center", padding: 70 }}><div style={{ fontSize: 44, marginBottom: 12 }}>⚡</div><div style={{ fontSize: 16, fontWeight: 600, color: B.bright }}>Generating...</div></div>}
          {out && !out.error && !loading && (
            <div className="fi">
              <div className="cd" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span className="tg" style={{ background: `${B.red}15`, color: B.red }}>HOOK (0-3s)</span></div>
                <div style={{ fontSize: 17, fontWeight: 700, color: B.bright, lineHeight: 1.5 }}>"{out.hook}"</div>
              </div>
              <div className="cd" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span className="tg" style={{ background: `${B.sage}15`, color: B.sage }}>SCRIPT</span><span style={{ fontSize: 11, color: B.muted }}>{cfg.length}s · {cfg.platform}</span></div>
                <div className="script-b">{out.script}</div>
              </div>
              <div className="cd" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span className="tg" style={{ background: `${B.amber}15`, color: B.amber }}>CTA</span></div>
                <div style={{ fontSize: 16, fontWeight: 700, color: B.gold }}>"{out.cta}"</div>
              </div>
              <div className="cd" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><span className="tg" style={{ background: `${B.blue}15`, color: B.blue }}>HEADLINES (A/B test)</span></div>
                {out.headlines?.map((h, i) => (
                  <div key={i} style={{ padding: "9px 14px", borderRadius: 8, background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}`, marginBottom: 5, fontSize: 14, color: B.bright, fontWeight: 600 }}>
                    <span style={{ color: B.muted, marginRight: 8 }}>V{i + 1}:</span>{h}
                  </div>
                ))}
              </div>
              {out.primary_text && (
                <div className="cd">
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span className="tg" style={{ background: `${B.purple}15`, color: B.purple }}>AD COPY</span></div>
                  <div style={{ fontSize: 14, color: B.text, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{out.primary_text}</div>
                </div>
              )}
            </div>
          )}
          {out?.error && !loading && <div className="cd" style={{ borderColor: B.red }}><div style={{ color: B.red, fontSize: 14 }}>{out.error}</div></div>}
          {!out && !loading && <div className="cd" style={{ textAlign: "center", padding: 70 }}><div style={{ fontSize: 44, opacity: .3, marginBottom: 12 }}>⚡</div><div style={{ color: B.muted }}>Configure brief and hit Generate</div></div>}
        </div>
      </div>
    </div>
  );
}

function HookPage() {
  const [gen, setGen] = useState(false);
  const [hooks, setHooks] = useState(null);

  const cats = [
    { cat: "Pattern Interrupt", color: B.red, ex: ["Stop scrolling if you've tried every diet.", "Your doctor won't tell you this about weight loss.", "I lost 30 pounds and my friends think I had surgery.", "This $179 medication is the same drug celebs pay $1,200 for."] },
    { cat: "Social Proof", color: B.sage, ex: ["100,000 people have tried this. The results speak for themselves.", "My doctor recommended this after seeing my bloodwork.", "I was skeptical. Then I stepped on the scale after 30 days.", "4.8 stars and 10,000+ reviews. There's a reason people stay."] },
    { cat: "Emotional", color: B.blue, ex: ["I cried when I fit into my old jeans after 3 years.", "My kids said 'mom, you look different.' That was everything.", "For the first time in my life, I don't think about food 24/7.", "I spent 15 years hating my body. 3 months changed it all."] },
    { cat: "Urgency", color: B.amber, ex: ["They're raising the price next week. Lock in $179 today.", "The FDA shortage exemption won't last forever.", "I waited 6 months to start. I wish I hadn't wasted that time.", "New patient pricing: $179 for your first month."] },
  ];

  const genMore = async (category) => {
    setGen(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYS,
          messages: [{ role: "user", content: `Generate 5 new "${category}" hooks for TrimDoctor GLP-1 ads. Return ONLY a JSON array of strings.` }] }),
      });
      const data = await res.json();
      const txt = data.content?.[0]?.text || "[]";
      setHooks({ category, items: JSON.parse(txt.replace(/```json|```/g, "").trim()) });
    } catch { setHooks({ category, items: ["Generation failed"] }); }
    setGen(false);
  };

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 4 }}>Hook Bank</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 22 }}>Scroll-stopping openers by psychological trigger — click to generate more</p>
      {cats.map((c, ci) => (
        <div key={ci} className="cd" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span className="tg" style={{ background: `${c.color}15`, color: c.color }}>{c.cat}</span>
            <button className="bt bt-g" onClick={() => genMore(c.cat)} disabled={gen} style={{ fontSize: 11 }}>{gen && hooks?.category === c.cat ? "..." : "⚡ More"}</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {c.ex.map((h, i) => (
              <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}`, fontSize: 13, color: B.bright, lineHeight: 1.55 }}>"{h}"</div>
            ))}
            {hooks?.category === c.cat && hooks.items.map((h, i) => (
              <div key={`g${i}`} className="fi" style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(0,0,0,.3)", border: `1px solid ${c.color}30`, fontSize: 13, color: B.bright, lineHeight: 1.55 }}>
                <span style={{ fontSize: 10, color: c.color, fontWeight: 600 }}>⚡ AI </span>"{h}"
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const NAV = [{ id: "gen", l: "AI Generator", i: "⚡" }, { id: "hooks", l: "Hook Bank", i: "🎣" }];

export default function App() {
  const [pg, setPg] = useState("gen");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>Ad Creative Studio</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          {NAV.map(n => (<div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}><span style={{ fontSize: 14 }}>{n.i}</span>{n.l}</div>))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, borderTop: `1px solid ${B.border}` }}>
          <div style={{ fontSize: 10, color: B.muted, lineHeight: 1.6 }}>⚡ Powered by Claude API<br/>FTC-compliant copy</div>
        </div>
      </div>
      <div className="ma">{pg === "gen" ? <GeneratorPage /> : <HookPage />}</div>
    </div>
  );
}
