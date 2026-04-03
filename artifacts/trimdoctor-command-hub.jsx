import { useState, useEffect } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4", pink: "#EC4899" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100;overflow-y:auto}
.ma{margin-left:236px;min-height:100vh;padding:24px 28px}
.ni{display:flex;align-items:center;gap:10px;padding:9px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}
.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px;margin-bottom:12px}
.mt{background:${B.dark2};border-radius:12px;border:1px solid ${B.border};padding:14px 16px}
.tg{display:inline-flex;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600}
.app{background:rgba(0,0,0,.2);border:1px solid ${B.border};border-radius:14px;padding:18px;cursor:pointer;transition:all .25s}
.app:hover{border-color:${B.sage}40;transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.15)}
.btn{padding:10px 20px;border-radius:10px;font-family:Figtree;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .2s}
.bp{background:${B.forestL};color:#fff}.bp:hover{background:${B.forestM}}
.bo{background:transparent;border:1px solid ${B.border};color:${B.muted}}.bo:hover{border-color:${B.sage};color:${B.sage}}
.doc-out{background:rgba(0,0,0,.3);border-radius:12px;padding:20px 24px;border-left:3px solid ${B.sage};font-size:13px;line-height:2;color:${B.text};white-space:pre-wrap;max-height:500px;overflow-y:auto}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@keyframes gp{0%,100%{opacity:1}50%{opacity:.4}}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const fmt = n => n>=1e6?`$${(n/1e6).toFixed(2)}M`:n>=1e3?`$${(n/1e3).toFixed(1)}K`:`$${n}`;

const APPS = [
  { name: "Landing + Intake", desc: "Patient acquisition", icon: "🏠", color: B.sage, status: "live", file: "trimdoctor.jsx" },
  { name: "Patient Portal", desc: "Weight, messages, billing", icon: "👤", color: B.blue, status: "live", file: "trimdoctor-portal.jsx" },
  { name: "Admin + AI Chatbot", desc: "Operations + Claude support", icon: "🤖", color: B.purple, status: "live", file: "trimdoctor-admin.jsx" },
  { name: "AI Ad Studio", desc: "Generate ad creatives", icon: "⚡", color: B.amber, status: "live", file: "trimdoctor-ads.jsx" },
  { name: "Pitch Deck v2", desc: "Investor presentation", icon: "📊", color: B.gold, status: "live", file: "trimdoctor-deck-v2.jsx" },
  { name: "Influencer Center", desc: "FitTea playbook", icon: "📷", color: B.pink, status: "live", file: "trimdoctor-influencers.jsx" },
  { name: "Email & SMS", desc: "6 retention flows", icon: "📧", color: B.cyan, status: "live", file: "trimdoctor-emails.jsx" },
  { name: "Analytics", desc: "MRR, cohorts, P&L", icon: "📈", color: B.sage, status: "live", file: "trimdoctor-analytics.jsx" },
  { name: "Supplements", desc: "8 SKUs + bundles", icon: "💊", color: B.forestM, status: "live", file: "trimdoctor-supplements.jsx" },
  { name: "VIP Coaching", desc: "$1,799/mo upsell", icon: "👑", color: B.gold, status: "live", file: "trimdoctor-vip-coaching.jsx" },
  { name: "Operations Hub", desc: "Launch + SOPs + playbooks", icon: "🚀", color: B.red, status: "live", file: "trimdoctor-ops-hub.jsx" },
  { name: "Brand System", desc: "Logo, colors, components", icon: "🎨", color: B.purple, status: "live", file: "trimdoctor-landing.jsx" },
  { name: "Next.js App", desc: "15-route production code", icon: "💻", color: B.blue, status: "live", file: "trimdoctor-nextjs-app.tar.gz" },
  { name: "Command Hub", desc: "You are here", icon: "◉", color: B.sage, status: "active", file: "" },
  { name: "Legal Docs", desc: "ToS, Privacy, HIPAA", icon: "⚖️", color: B.muted, status: "live", file: "" },
];

function DashPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 5000); return () => clearInterval(t); }, []);

  return (
    <div className="fi">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: B.bright }}>Good evening, Michael</h1>
          <div style={{ fontSize: 13, color: B.muted }}>TrimDoctor Command Hub · Everything at a glance</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: B.sage, animation: "gp 2s ease infinite" }} />
          <span style={{ fontSize: 12, color: B.sage, fontWeight: 600 }}>ALL SYSTEMS LIVE</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { l: "MRR", v: fmt(6175000 + tick * 340), c: B.sage, d: "↑ 31.6% MoM" },
          { l: "Active Patients", v: "25,012", c: B.bright, d: "↑ 842 this week" },
          { l: "Churn", v: "16.8%", c: B.amber, d: "↓ 0.4% from last" },
          { l: "CAC", v: "$62", c: B.sage, d: "24:1 LTV ratio" },
          { l: "AI Resolution", v: "82.4%", c: B.purple, d: "1,240 tickets today" },
          { l: "VIP Members", v: "312", c: B.gold, d: fmt(312 * 1799) + " MRR" },
        ].map((m, i) => (
          <div key={i} className="mt">
            <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 3 }}>{m.l}</div>
            <div className="mn" style={{ fontSize: 22, fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 10, color: m.d.includes("↑") ? B.sage : m.d.includes("↓") ? B.sage : B.muted, marginTop: 3 }}>{m.d}</div>
          </div>
        ))}
      </div>

      {/* Revenue streams */}
      <div className="cd" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 12 }}>Revenue Streams</div>
        {[
          { s: "GLP-1 Medication", mrr: 5614000, pct: 80, c: B.sage },
          { s: "VIP Coaching", mrr: 561288, pct: 8, c: B.gold },
          { s: "Supplements", mrr: 438000, pct: 6, c: B.purple },
          { s: "Referral Credits (net)", mrr: -85000, pct: -1, c: B.red },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < 3 ? `1px solid ${B.border}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.c, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: B.bright, flex: 1 }}>{r.s}</span>
            <span className="mn" style={{ fontSize: 13, fontWeight: 700, color: r.c }}>{fmt(r.mrr)}</span>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="cd" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 12 }}>Alerts</div>
        {[
          { icon: "📦", text: "Belmar shipment batch #4082 delayed 1 day — 23 patients affected", severity: "warning", time: "32m ago" },
          { icon: "💳", text: "14 failed payments in retry queue — Stripe Smart Retries active", severity: "info", time: "1h ago" },
          { icon: "🎉", text: "New milestone: 25,000 active patients reached", severity: "success", time: "3h ago" },
          { icon: "📱", text: "TikTok ad 'Doctor Authority v3' hit $4.8 ROAS — scaling to $500/day", severity: "success", time: "5h ago" },
          { icon: "👑", text: "12 new VIP coaching enrollments this week (+38% WoW)", severity: "success", time: "6h ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? `1px solid ${B.border}` : "none" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, color: B.bright }}>{a.text}</span>
              <div style={{ fontSize: 10, color: B.muted, marginTop: 2 }}>{a.time}</div>
            </div>
            <span className="tg" style={{ background: a.severity === "success" ? `${B.sage}15` : a.severity === "warning" ? `${B.amber}15` : `${B.blue}15`, color: a.severity === "success" ? B.sage : a.severity === "warning" ? B.amber : B.blue, flexShrink: 0, alignSelf: "flex-start" }}>
              {a.severity}
            </span>
          </div>
        ))}
      </div>

      {/* App Launcher */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 12 }}>TrimDoctor Apps ({APPS.length})</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
          {APPS.map((app, i) => (
            <div key={i} className="app">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{app.icon}</span>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: app.status === "active" ? B.sage : app.status === "live" ? B.sage : B.muted, animation: app.status === "active" ? "gp 2s ease infinite" : "none" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: B.bright, marginBottom: 2, lineHeight: 1.3 }}>{app.name}</div>
              <div style={{ fontSize: 11, color: B.muted }}>{app.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegalPage() {
  const [docType, setDocType] = useState("terms");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const DOCS = {
    terms: { title: "Terms of Service", icon: "📜", prompt: "Generate a comprehensive Terms of Service for TrimDoctor (trimdoctor.com), a GLP-1 telehealth platform. Include sections: 1) Platform vs Healthcare distinction (TrimDoctor provides tech platform, NOT medical care), 2) Eligibility (18+, US residents), 3) Subscription billing ($179 first month, $299 ongoing semaglutide; $149/$249 tablets; $249/$399 tirzepatide), 4) Cancellation (anytime, no refund after medication ships), 5) Compounded medications disclaimer (FDA-regulated facilities, not FDA-approved products), 6) Limitation of liability, 7) Mandatory arbitration, 8) HIPAA compliance. Entity: TrimDoctor, LLC, Delaware. Return plain text, professional legal tone." },
    privacy: { title: "Privacy Policy", icon: "🔒", prompt: "Generate a HIPAA-compliant Privacy Policy for TrimDoctor (trimdoctor.com). Include: 1) Information collected (personal, PHI, usage data), 2) How we use it (medical consultations, billing, support, marketing), 3) PHI handling (HIPAA, BAAs with OpenLoop Health, Belmar Pharmacy, AWS, Stripe), 4) Data security (AES-256, TLS 1.3, audit trail), 5) Your rights (access, correction, deletion), 6) CCPA for California residents, 7) Cookies, 8) Data retention. Entity: TrimDoctor, LLC." },
    hipaa: { title: "HIPAA Notice", icon: "🏥", prompt: "Generate a Notice of Privacy Practices (HIPAA NPP) for TrimDoctor. Include: 1) How we use/disclose PHI (treatment, payment, operations), 2) Your rights (access, amendment, accounting of disclosures, restrictions, confidential communications, complaints), 3) Our duties (maintain privacy, notify of breaches, provide this notice), 4) Business Associates (OpenLoop Health, Belmar Pharmacy, AWS, Stripe, Vanta). Entity: TrimDoctor, LLC." },
    consent: { title: "Patient Consent", icon: "✍️", prompt: "Generate an Informed Consent form for TrimDoctor GLP-1 telehealth services. Include: 1) Telehealth consent (evaluation via online platform, not in-person), 2) GLP-1 medication risks (nausea, pancreatitis risk, thyroid C-cell tumors, contraindications), 3) Compounded medication consent (not FDA-approved as finished products), 4) Treatment expectations (results vary, not a guaranteed outcome), 5) Patient responsibilities (accurate health info, follow provider instructions, report side effects), 6) Consent to communicate (email, SMS, portal messaging). Keep it patient-friendly but thorough." },
    refund: { title: "Refund Policy", icon: "💰", prompt: "Generate a Refund Policy for TrimDoctor. Include: 1) Not approved by physician = full refund, 2) Medication shipped = no refund (compounded medications cannot be resold), 3) VIP Coaching = 30-day money-back guarantee on coaching fee only, 4) Supplements = unopened returns within 30 days, 5) Failed payment = 3 retry attempts before subscription pause, 6) Cancellation = effective immediately, no prorated refunds for partial months. Be fair but clear." },
  };

  const generate = async () => {
    setLoading(true); setOutput(null);
    const doc = DOCS[docType];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "You are a legal document generator for a GLP-1 telehealth company. Generate professional legal documents. Include clear section headings. Add a disclaimer at the end that this is a template and should be reviewed by a licensed healthcare attorney before publication. Use today's date: April 2, 2026.",
          messages: [{ role: "user", content: doc.prompt }] }),
      });
      const data = await res.json();
      setOutput(data.content?.[0]?.text || "Generation failed. Please try again.");
    } catch { setOutput("⚠️ API call failed. The document generator requires the Claude API. In production, this generates real legal documents tailored to TrimDoctor's specific business structure, pricing, and vendor relationships.\n\nTo use: add your Anthropic API key to the artifact's API call configuration."); }
    setLoading(false);
  };

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Legal Document Generator</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>AI-generated legal templates — always have an attorney review before publishing</p>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Document Type</div>
          {Object.entries(DOCS).map(([id, doc]) => (
            <div key={id} onClick={() => { setDocType(id); setOutput(null); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, background: docType === id ? `${B.sage}08` : "rgba(0,0,0,.2)", border: `1px solid ${docType === id ? B.sage + "40" : B.border}` }}>
              <span style={{ fontSize: 18 }}>{doc.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: docType === id ? B.sage : B.bright }}>{doc.title}</div>
              </div>
            </div>
          ))}

          <button className="btn bp" onClick={generate} disabled={loading} style={{ width: "100%", marginTop: 12, padding: 14, opacity: loading ? .7 : 1 }}>
            {loading ? "⚡ Generating..." : `⚡ Generate ${DOCS[docType].title}`}
          </button>

          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: `${B.amber}08`, border: `1px solid ${B.amber}15`, fontSize: 11, color: B.amber, lineHeight: 1.7 }}>
            ⚠️ These are AI-generated templates. <strong>Always have a licensed healthcare attorney review before publishing.</strong>
          </div>
        </div>

        <div>
          {loading && (
            <div className="cd" style={{ textAlign: "center", padding: 70 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>⚡</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: B.bright }}>Generating {DOCS[docType].title}...</div>
              <div style={{ fontSize: 12, color: B.muted, marginTop: 4 }}>Tailored to TrimDoctor's business structure</div>
            </div>
          )}
          {output && !loading && (
            <div className="fi">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{DOCS[docType].icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: B.bright }}>{DOCS[docType].title}</span>
                </div>
                <button className="btn bo" onClick={() => navigator.clipboard?.writeText(output)} style={{ fontSize: 11, padding: "6px 12px" }}>📋 Copy</button>
              </div>
              <div className="doc-out">{output}</div>
            </div>
          )}
          {!output && !loading && (
            <div className="cd" style={{ textAlign: "center", padding: 70 }}>
              <div style={{ fontSize: 44, opacity: .3, marginBottom: 12 }}>{DOCS[docType].icon}</div>
              <div style={{ color: B.muted }}>Select a document type and click Generate</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickActionsPage() {
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 16 }}>Quick Actions</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: "⚡", title: "Generate Ad Creative", desc: "Open AI Ad Studio and create new scripts", color: B.amber },
          { icon: "📧", title: "Send Broadcast", desc: "One-time email/SMS to patient segments", color: B.cyan },
          { icon: "📷", title: "DM Influencer", desc: "Open @teaceo and send outreach template", color: B.pink },
          { icon: "💊", title: "Check Pharmacy Queue", desc: "View pending Belmar/Empower orders", color: B.sage },
          { icon: "📊", title: "Pull Weekly Report", desc: "Generate MRR/churn/attribution summary", color: B.blue },
          { icon: "🚀", title: "Launch New Ad Set", desc: "Duplicate winning creative to new audience", color: B.amber },
          { icon: "👑", title: "Review VIP Pipeline", desc: "See pending VIP coaching enrollments", color: B.gold },
          { icon: "⚖️", title: "Generate Legal Doc", desc: "Create ToS, Privacy, HIPAA templates", color: B.purple },
          { icon: "💰", title: "Process Payouts", desc: "Review and send influencer commissions", color: B.sage },
          { icon: "🛡️", title: "Run HIPAA Audit", desc: "Check Vanta compliance dashboard", color: B.red },
        ].map((a, i) => (
          <div key={i} className="app" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{a.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: B.bright }}>{a.title}</div>
              <div style={{ fontSize: 12, color: B.muted }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { id: "dash", l: "Command Hub", i: "◉" },
  { id: "legal", l: "Legal Docs", i: "⚖️" },
  { id: "actions", l: "Quick Actions", i: "⚡" },
];

export default function App() {
  const [pg, setPg] = useState("dash");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>CEO Command Hub</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          {NAV.map(n => (<div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}><span style={{ fontSize: 14 }}>{n.i}</span>{n.l}</div>))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, borderTop: `1px solid ${B.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: B.forestL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700 }}>M</div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: B.bright }}>Michael Gonzalez</div><div style={{ fontSize: 10, color: B.muted }}>Founder & CEO</div></div>
          </div>
        </div>
      </div>
      <div className="ma">
        {pg === "dash" && <DashPage />}
        {pg === "legal" && <LegalPage />}
        {pg === "actions" && <QuickActionsPage />}
      </div>
    </div>
  );
}
