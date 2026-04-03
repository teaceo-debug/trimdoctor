import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", dark3: "#1C2B24", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4", pink: "#EC4899" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100;overflow-y:auto}
.ma{margin-left:236px;min-height:100vh;padding:24px 28px}
.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}
.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px;margin-bottom:12px}
.tg{display:inline-flex;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600}
.cc{background:rgba(0,0,0,.2);border:1px solid ${B.border};border-radius:14px;padding:20px;transition:all .2s;margin-bottom:10px}
.cc:hover{border-color:${B.sage}30}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n}`;

const CREATORS = [
  { id: 1, name: "Kylie Health", handle: "@kyliehealth", platform: "Instagram", followers: "12.4M", tier: "celebrity", status: "negotiating", code: "", clicks: 0, signups: 0, revenue: 0, commission: 0, rate: 20, notes: "Via Eli Maroun connection from FitTea days. Initial DM sent. Asking $50K upfront + 20% commission." },
  { id: 2, name: "Dr. Mike Official", handle: "@drmikeh", platform: "YouTube", followers: "1.2M", tier: "macro", status: "active", code: "DRMIKE", clicks: 42000, signups: 520, revenue: 93080, commission: 13962, rate: 15, notes: "Strong performer. Doctor authority angle. Video content converts at 1.2% CVR." },
  { id: 3, name: "FitMom Jessica", handle: "@fitmomjess", platform: "Instagram", followers: "340K", tier: "mid", status: "active", code: "JESS40", clicks: 18400, signups: 312, revenue: 55848, commission: 8377, rate: 15, notes: "Best CVR of any creator (1.7%). UGC testimonial style. Scaling her content budget." },
  { id: 4, name: "Sarah Wellness", handle: "@sarahwellness", platform: "TikTok", followers: "284K", tier: "mid", status: "active", code: "SARAH50", clicks: 15600, signups: 280, revenue: 50120, commission: 7518, rate: 15, notes: "Consistent performer. Repost her content to our TikTok. Negotiating exclusivity." },
  { id: 5, name: "HealthyHabits Mark", handle: "@healthymark", platform: "TikTok", followers: "92K", tier: "micro", status: "active", code: "MARK30", clicks: 8200, signups: 164, revenue: 29356, commission: 4403, rate: 15, notes: "Low follower count but highest engagement rate (6.2%). Great for authentic UGC." },
  { id: 6, name: "Real Talk Rachel", handle: "@realtalkrach", platform: "TikTok", followers: "520K", tier: "macro", status: "outreach", code: "", clicks: 0, signups: 0, revenue: 0, commission: 0, rate: 18, notes: "Body positivity angle. Perfect for 'it's not a diet, it's medical' messaging. DM sent via Michael's @teaceo." },
  { id: 7, name: "Nutrition Nick", handle: "@nutritionnick", platform: "YouTube", followers: "68K", tier: "micro", status: "paused", code: "NICK25", clicks: 3200, signups: 42, revenue: 7518, commission: 1128, rate: 15, notes: "Paused — low conversion. Content was too clinical. May reactivate with new brief." },
  { id: 8, name: "Body Coach Beth", handle: "@bcoachbeth", platform: "Instagram", followers: "180K", tier: "mid", status: "outreach", code: "", clicks: 0, signups: 0, revenue: 0, commission: 0, rate: 15, notes: "Personal trainer angle. Good for 'GLP-1 + exercise' messaging. Outreach via DM." },
];

const tierColor = { celebrity: B.gold, macro: B.purple, mid: B.blue, micro: B.cyan };
const statusColor = { active: B.sage, negotiating: B.gold, outreach: B.blue, paused: B.muted };

function RosterPage() {
  const [filter, setFilter] = useState("all");
  const active = CREATORS.filter(c => c.status === "active");
  const totalRev = active.reduce((s, c) => s + c.revenue, 0);
  const totalSign = active.reduce((s, c) => s + c.signups, 0);
  const totalComm = active.reduce((s, c) => s + c.commission, 0);
  const filtered = filter === "all" ? CREATORS : CREATORS.filter(c => c.status === filter);

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Creator Roster</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>{active.length} active · {CREATORS.filter(c => c.status === "outreach" || c.status === "negotiating").length} in pipeline · Leveraging your FitTea/Kardashian network</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, marginBottom: 18 }}>
        {[
          { l: "Revenue", v: fmt(totalRev), c: B.sage },
          { l: "Signups", v: totalSign.toLocaleString(), c: B.cyan },
          { l: "Commission", v: fmt(totalComm), c: B.purple },
          { l: "Blended CAC", v: `$${totalSign > 0 ? (totalComm / totalSign).toFixed(0) : 0}`, c: B.sage },
          { l: "Creators", v: CREATORS.length, c: B.bright },
          { l: "Pipeline", v: CREATORS.filter(c => ["outreach", "negotiating"].includes(c.status)).length, c: B.gold },
        ].map((m, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(0,0,0,.2)", borderRadius: 10, border: `1px solid ${B.border}` }}>
            <div className="mn" style={{ fontSize: 20, fontWeight: 700, color: m.c }}>{m.v}</div>
            <div style={{ fontSize: 10, color: B.muted }}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
        {["all", "active", "negotiating", "outreach", "paused"].map(s => (
          <div key={s} onClick={() => setFilter(s)} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", background: filter === s ? B.forestL : "rgba(0,0,0,.3)", color: filter === s ? "#fff" : B.muted }}>{s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}</div>
        ))}
      </div>

      {filtered.map(c => (
        <div key={c.id} className="cc">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${tierColor[c.tier]}20`, border: `2px solid ${tierColor[c.tier]}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {c.platform === "TikTok" ? "🎵" : c.platform === "YouTube" ? "▶️" : "📷"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: B.bright }}>{c.name}</div>
                <div style={{ fontSize: 12, color: B.muted }}>{c.handle} · {c.followers} · {c.platform}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <span className="tg" style={{ background: `${tierColor[c.tier]}15`, color: tierColor[c.tier] }}>{c.tier}</span>
              <span className="tg" style={{ background: `${statusColor[c.status]}15`, color: statusColor[c.status] }}>{c.status}</span>
            </div>
          </div>

          {c.status === "active" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginTop: 14, padding: 12, background: "rgba(0,0,0,.2)", borderRadius: 10 }}>
              {[
                { l: "Code", v: c.code },
                { l: "Clicks", v: c.clicks.toLocaleString() },
                { l: "Signups", v: c.signups },
                { l: "CVR", v: c.clicks > 0 ? ((c.signups / c.clicks) * 100).toFixed(1) + "%" : "—" },
                { l: "Revenue", v: fmt(c.revenue), c: B.sage },
                { l: "Commission", v: fmt(c.commission), c: B.purple },
                { l: "Rate", v: c.rate + "%" },
              ].map((m, j) => (
                <div key={j} style={{ textAlign: "center" }}>
                  <div className={m.l === "Code" ? "mn" : ""} style={{ fontSize: 14, fontWeight: 700, color: m.c || B.bright }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: B.muted }}>{m.l}</div>
                </div>
              ))}
            </div>
          )}

          {c.notes && (
            <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: `${B.sage}08`, border: `1px solid ${B.sage}10`, fontSize: 12, color: B.sage, lineHeight: 1.6 }}>
              💡 {c.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PlaybookPage() {
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>The FitTea Playbook</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>The exact influencer strategy that built $100M in DTC health — adapted for TrimDoctor</p>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Michael's Proven Framework</div>
        <div style={{ fontSize: 14, color: B.text, lineHeight: 2 }}>
          {[
            "**Tier 1: Celebrity Anchors** — 1-2 mega-celebrities (Kardashian-level) for brand legitimacy. $25-100K upfront + commission. These set the tone and make every smaller creator want to participate.",
            "**Tier 2: Macro Authority** — 5-10 creators at 500K-5M followers. Mix of doctor/nurse accounts (authority) and lifestyle influencers (relatability). $2-10K upfront + 15-18% commission.",
            "**Tier 3: Mid-Tier Volume** — 20-50 creators at 100K-500K. Pure performance deals — product + commission only. These are your workhorses. High volume, consistent content.",
            "**Tier 4: Micro UGC Army** — 100+ creators at 10K-100K. Product-only deals. Raw, authentic content you repurpose for paid ads. Highest engagement rates. Cheapest CAC.",
          ].map((line, i) => {
            const parts = line.split("**");
            return (
              <div key={i} style={{ marginBottom: 8 }}>
                {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: B.bright }}>{p}</strong> : <span key={j}>{p}</span>)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.sage, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Deal Structures</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          {[
            { tier: "Celebrity", range: "5M+", upfront: "$25-100K", comm: "15-20%", content: "1-2 posts/mo", color: B.gold },
            { tier: "Macro", range: "500K-5M", upfront: "$2-10K", comm: "15-18%", content: "2-4 posts/mo", color: B.purple },
            { tier: "Mid", range: "100K-500K", upfront: "$500-2K", comm: "15%", content: "3-6 posts/mo", color: B.blue },
            { tier: "Micro", range: "10K-100K", upfront: "Product only", comm: "12-15%", content: "4-8 posts/mo", color: B.cyan },
          ].map((t, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 12, background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}` }}>
              <div className="tg" style={{ background: `${t.color}15`, color: t.color, marginBottom: 10 }}>{t.tier}</div>
              <div style={{ fontSize: 12, color: B.text, lineHeight: 1.9 }}>
                <div>Followers: <span style={{ color: B.bright }}>{t.range}</span></div>
                <div>Upfront: <span style={{ color: B.bright }}>{t.upfront}</span></div>
                <div>Commission: <span style={{ color: B.bright }}>{t.comm}</span></div>
                <div>Content: <span style={{ color: B.bright }}>{t.content}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Outreach Template (From @teaceo)</div>
        <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 12, padding: 20, borderLeft: `3px solid ${B.sage}`, fontSize: 13, color: B.text, lineHeight: 1.9 }}>
          <div style={{ color: B.muted, marginBottom: 8 }}>DM from @teaceo (491K followers)</div>
          Hey {"{{creator_name}}"} 👋<br /><br />
          Michael here — I built FitTea to $100M (you might remember us from the Kylie/Kardashian days). I've got a new company called TrimDoctor — we're making GLP-1 weight loss meds accessible at $179/mo vs $1,200 for Ozempic.<br /><br />
          Your content around {"{{their_niche}}"} is exactly the audience we're looking for. Would love to send you a free product kit and discuss a partnership — 15% commission on every sale through your link.<br /><br />
          We handle all the creative support. You just share your honest experience.<br /><br />
          Interested? Happy to jump on a quick call.<br /><br />
          — Michael<br />
          <span style={{ color: B.muted }}>Founder, TrimDoctor · Previously FitTea ($100M+ exit)</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: B.muted, lineHeight: 1.7 }}>
          💡 <strong style={{ color: B.bright }}>Why this works:</strong> Leading with FitTea credibility + Kardashian name-drop instantly separates you from every other brand in their DMs. The 491K @teaceo following means they can verify you're legit in 2 seconds.
        </div>
      </div>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.amber, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Content Briefs by Tier</div>
        {[
          { type: "Celebrity Post", desc: "Simple 'I've been using TrimDoctor' with product visible. No hard sell. Just association. 1 story + 1 feed post.", kpi: "Brand awareness, 1M+ impressions" },
          { type: "Doctor Authority Video", desc: "60-sec YouTube/TikTok: 'How GLP-1s actually work — the science explained.' Mention TrimDoctor as the affordable access point. Link in bio.", kpi: "Trust + conversions, 3-5% CVR" },
          { type: "UGC Testimonial", desc: "30-sec selfie-style: 'I've been on TrimDoctor for X weeks...' Real results, real emotions. Raw aesthetic. We repurpose for paid ads.", kpi: "Ad creative pipeline, lowest CAC" },
          { type: "Transformation Story", desc: "Before mindset → after confidence. NOT before/after body shots (FTC compliance). Focus on energy, confidence, clothes fitting.", kpi: "Emotional resonance, high share rate" },
        ].map((brief, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${B.border}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontWeight: 700, color: B.bright, fontSize: 14 }}>{brief.type}</span>
              <span style={{ fontSize: 11, color: B.muted }}>{brief.kpi}</span>
            </div>
            <div style={{ fontSize: 13, color: B.text, lineHeight: 1.6 }}>{brief.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayoutsPage() {
  const payouts = [
    { d: "Apr 15", c: "Dr. Mike Official", a: 3962, s: "pending" },
    { d: "Apr 15", c: "FitMom Jessica", a: 2377, s: "pending" },
    { d: "Apr 15", c: "Sarah Wellness", a: 2018, s: "pending" },
    { d: "Apr 15", c: "HealthyHabits Mark", a: 1403, s: "pending" },
    { d: "Mar 31", c: "Dr. Mike Official", a: 3500, s: "paid" },
    { d: "Mar 31", c: "FitMom Jessica", a: 2500, s: "paid" },
    { d: "Mar 31", c: "Sarah Wellness", a: 2200, s: "paid" },
    { d: "Mar 31", c: "HealthyHabits Mark", a: 1500, s: "paid" },
  ];
  const pending = payouts.filter(p => p.s === "pending").reduce((s, p) => s + p.a, 0);

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Payouts</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>Bi-monthly commission payments · Net-15 terms</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
        <div style={{ textAlign: "center", padding: 16, background: "rgba(0,0,0,.2)", borderRadius: 12, border: `1px solid ${B.border}` }}>
          <div className="mn" style={{ fontSize: 26, fontWeight: 700, color: B.amber }}>{fmt(pending)}</div>
          <div style={{ fontSize: 11, color: B.muted }}>Pending Next Payout</div>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: "rgba(0,0,0,.2)", borderRadius: 12, border: `1px solid ${B.border}` }}>
          <div className="mn" style={{ fontSize: 26, fontWeight: 700, color: B.sage }}>{fmt(payouts.filter(p => p.s === "paid").reduce((s, p) => s + p.a, 0))}</div>
          <div style={{ fontSize: 11, color: B.muted }}>Paid This Month</div>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: "rgba(0,0,0,.2)", borderRadius: 12, border: `1px solid ${B.border}` }}>
          <div className="mn" style={{ fontSize: 26, fontWeight: 700, color: B.purple }}>15%</div>
          <div style={{ fontSize: 11, color: B.muted }}>Standard Rate</div>
        </div>
      </div>

      <div className="cd" style={{ padding: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Date", "Creator", "Amount", "Status"].map((h, i) => (
            <th key={i} style={{ textAlign: i === 2 ? "right" : "left", padding: "12px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: .8, color: B.muted, borderBottom: `1px solid ${B.border}` }}>{h}</th>
          ))}</tr></thead>
          <tbody>{payouts.map((p, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${B.border}` }}>
              <td style={{ padding: "10px 16px", fontSize: 13 }}>{p.d}</td>
              <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: B.bright }}>{p.c}</td>
              <td className="mn" style={{ padding: "10px 16px", fontSize: 13, textAlign: "right", fontWeight: 700, color: B.sage }}>${p.a.toLocaleString()}</td>
              <td style={{ padding: "10px 16px" }}><span className="tg" style={{ background: p.s === "paid" ? `${B.sage}15` : `${B.amber}15`, color: p.s === "paid" ? B.sage : B.amber }}>{p.s}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

const NAV = [
  { id: "roster", l: "Creator Roster", i: "👥" },
  { id: "playbook", l: "FitTea Playbook", i: "📖" },
  { id: "payouts", l: "Payouts", i: "💸" },
];

export default function App() {
  const [pg, setPg] = useState("roster");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>Influencer Command Center</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          {NAV.map(n => (<div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}><span style={{ fontSize: 14 }}>{n.i}</span>{n.l}</div>))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, borderTop: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: B.forestL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>M</div>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: B.bright }}>@teaceo</div><div style={{ fontSize: 10, color: B.muted }}>491K followers</div></div>
          </div>
        </div>
      </div>
      <div className="ma">
        {pg === "roster" && <RosterPage />}
        {pg === "playbook" && <PlaybookPage />}
        {pg === "payouts" && <PayoutsPage />}
      </div>
    </div>
  );
}
