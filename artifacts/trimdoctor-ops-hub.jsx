import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4" };

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
.tg{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600}
.step{padding:14px;background:rgba(0,0,0,.2);border:1px solid ${B.border};border-radius:12px;margin-bottom:6px;transition:all .2s}
.step:hover{border-color:${B.sage}25}
.step.done{opacity:.5;border-left:3px solid ${B.sage}}
.chk{width:22px;height:22px;border-radius:6px;border:2px solid ${B.border};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s;font-size:12px}
.chk.on{background:${B.sage};border-color:${B.sage};color:${B.dark}}
.link{color:${B.sage};text-decoration:none;font-weight:600;font-size:12px;transition:color .15s}
.link:hover{color:${B.bright}}

.pb{display:flex;gap:12px;padding:16px;background:rgba(0,0,0,.2);border:1px solid ${B.border};border-radius:12px;margin-bottom:8px}
.task{display:flex;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.03);align-items:center}
.task:last-child{border-bottom:none}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const STEPS = [
  { group: "Legal & Entity", color: B.purple, steps: [
    { t: "Register Delaware LLC", d: "File TrimDoctor, LLC in Delaware via Stripe Atlas or Northwest", cost: "$200-500", time: "1-3 days", url: "https://stripe.com/atlas", urlLabel: "Stripe Atlas" },
    { t: "Get EIN from IRS", d: "Apply online, instant approval", cost: "Free", time: "10 min", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online", urlLabel: "IRS.gov" },
    { t: "Register trimdoctor.com", d: "Domain + .org + .health variants", cost: "$12-40/yr", time: "5 min", url: "https://www.namecheap.com/domains/", urlLabel: "Namecheap" },
    { t: "Open business bank account", d: "Mercury for startups — instant online setup", cost: "Free", time: "1 day", url: "https://mercury.com", urlLabel: "Mercury" },
    { t: "Engage healthcare attorney", d: "Review ToS, privacy policy, HIPAA compliance, state regulations", cost: "$2,000-5,000", time: "1-2 weeks", url: "https://www.avvo.com/health-care-lawyer.html", urlLabel: "Find Attorney" },
  ]},
  { group: "Medical Infrastructure", color: B.sage, steps: [
    { t: "Sign up with OpenLoop Health", d: "Physician network — they provide licensed providers in all 50 states", cost: "$15-22/consult", time: "1-2 weeks", url: "https://openloophealth.com", urlLabel: "OpenLoop Health" },
    { t: "Partner with Belmar Pharmacy", d: "Compounding pharmacy for semaglutide/tirzepatide", cost: "$38-52/vial", time: "2-3 weeks", url: "https://www.belmarpharmacy.com", urlLabel: "Belmar Pharmacy" },
    { t: "Set up Empower Pharmacy (backup)", d: "Secondary compounding pharmacy for supply redundancy", cost: "Similar", time: "2-3 weeks", url: "https://www.empowerpharmacy.com", urlLabel: "Empower Pharmacy" },
    { t: "Configure CareValidate", d: "Provider credential verification platform", cost: "$100-300/mo", time: "1 week", url: "https://carevalidate.com", urlLabel: "CareValidate" },
  ]},
  { group: "Tech Stack", color: B.blue, steps: [
    { t: "Deploy TrimDoctor Next.js app", d: "Deploy production app to Vercel, connect trimdoctor.com", cost: "$20/mo", time: "1 hour", url: "https://vercel.com", urlLabel: "Vercel" },
    { t: "Set up AWS RDS (HIPAA)", d: "PostgreSQL database with BAA — use the TrimDoctor schema", cost: "$50-200/mo", time: "2-4 hours", url: "https://aws.amazon.com/rds/", urlLabel: "AWS RDS" },
    { t: "Configure Anthropic Claude API", d: "AI chatbot, ad generation, content — get API key", cost: "Usage-based", time: "30 min", url: "https://console.anthropic.com", urlLabel: "Anthropic Console" },
    { t: "Set up Postmark (email)", d: "Transactional email for all 6 lifecycle flows", cost: "$10-75/mo", time: "1-2 hours", url: "https://postmarkapp.com", urlLabel: "Postmark" },
    { t: "Set up Twilio (SMS)", d: "SMS notifications, shipping alerts, 2FA", cost: "Usage-based", time: "1 hour", url: "https://www.twilio.com", urlLabel: "Twilio" },
    { t: "Sign up for Vanta", d: "HIPAA compliance automation + BAA management", cost: "$5,000-10,000/yr", time: "1-2 weeks", url: "https://www.vanta.com", urlLabel: "Vanta" },
  ]},
  { group: "Payment & Billing", color: B.gold, steps: [
    { t: "Activate Stripe", d: "Payment processing, subscriptions, invoicing", cost: "2.9% + $0.30", time: "1-2 days", url: "https://stripe.com", urlLabel: "Stripe" },
    { t: "Configure subscription plans", d: "Create 3 medication tiers + VIP coaching in Stripe", cost: "—", time: "1 hour", url: "https://dashboard.stripe.com/products", urlLabel: "Stripe Products" },
    { t: "Set up Stripe webhooks", d: "Payment success/failure/cancellation events → your API", cost: "—", time: "1-2 hours", url: "https://dashboard.stripe.com/webhooks", urlLabel: "Stripe Webhooks" },
  ]},
  { group: "Marketing & Launch", color: B.cyan, steps: [
    { t: "Create Meta Business Manager", d: "Facebook + Instagram ad accounts, pixel, conversions API", cost: "$0 + ad spend", time: "1 day", url: "https://business.facebook.com", urlLabel: "Meta Business" },
    { t: "Create TikTok Ads Manager", d: "TikTok ad account + pixel", cost: "$0 + ad spend", time: "1 hour", url: "https://ads.tiktok.com", urlLabel: "TikTok Ads" },
    { t: "Set up Google Ads", d: "Brand search campaigns + Performance Max", cost: "$0 + ad spend", time: "1-2 hours", url: "https://ads.google.com", urlLabel: "Google Ads" },
    { t: "Activate first 5 influencers", d: "Send outreach from @teaceo — use the FitTea playbook template", cost: "$500-5,000", time: "1-2 weeks", url: "https://instagram.com", urlLabel: "Instagram DMs" },
    { t: "Generate first 20 ad creatives", d: "Use TrimDoctor AI Ad Studio — all platforms, all formats", cost: "Claude API usage", time: "2-3 hours", url: "#", urlLabel: "Ad Studio App" },
    { t: "Launch ads at $750/day", d: "Split: $400 Meta, $200 TikTok, $150 Google Brand", cost: "$22,500/mo", time: "Day 1", url: "#", urlLabel: "Launch!" },
  ]},
];

const DAILY = [
  { time: "8:00 AM", task: "Check Stripe dashboard — overnight revenue, failed payments", dur: "5 min", icon: "💰" },
  { time: "8:10 AM", task: "Review AI chatbot escalations — handle any flagged tickets", dur: "15 min", icon: "🤖" },
  { time: "8:30 AM", task: "Check ad performance — pause losers, scale winners", dur: "20 min", icon: "📱" },
  { time: "9:00 AM", task: "Review new patient assessments — flag edge cases for provider", dur: "10 min", icon: "📋" },
  { time: "9:15 AM", task: "Check pharmacy fulfillment queue — any delays or issues", dur: "10 min", icon: "⚗️" },
  { time: "9:30 AM", task: "Respond to VIP coaching escalations (if applicable)", dur: "15 min", icon: "👑" },
  { time: "10:00 AM", task: "Generate 2-3 new ad creatives in AI Ad Studio", dur: "30 min", icon: "⚡" },
  { time: "10:30 AM", task: "Influencer outreach — send 5-10 DMs from @teaceo", dur: "30 min", icon: "📷" },
  { time: "11:00 AM", task: "Deep work — product improvements, new features, strategy", dur: "2 hrs", icon: "🔨" },
  { time: "1:00 PM", task: "Check email/SMS automation metrics — adjust flows", dur: "15 min", icon: "📧" },
  { time: "1:30 PM", task: "Review shipping status — contact pharmacy on delays", dur: "10 min", icon: "📦" },
  { time: "2:00 PM", task: "Content creation — TikTok/Reels for @trimdoctor", dur: "1 hr", icon: "🎬" },
  { time: "3:00 PM", task: "Afternoon ad check — adjust budgets for end of day", dur: "15 min", icon: "📊" },
  { time: "3:30 PM", task: "Respond to provider messages — coordinate dosage changes", dur: "15 min", icon: "👩‍⚕️" },
  { time: "4:00 PM", task: "Plan tomorrow — priorities, blockers, goals", dur: "15 min", icon: "📝" },
];

const WEEKLY = [
  { day: "Monday", tasks: ["Weekly metrics review (MRR, churn, CAC)", "Set ad budget for the week", "Pharmacy order forecast"] },
  { day: "Tuesday", tasks: ["Influencer performance review", "New creator outreach batch", "Content planning"] },
  { day: "Wednesday", tasks: ["Email/SMS flow optimization", "A/B test review", "Product improvements"] },
  { day: "Thursday", tasks: ["Financial review (P&L, cashflow)", "Vendor check-ins (OpenLoop, Belmar)", "Ad creative refresh"] },
  { day: "Friday", tasks: ["Week-in-review analytics report", "Plan next week's priorities", "Competitor monitoring"] },
];

const PLAYBOOKS = [
  { title: "🚨 Pharmacy Stockout", severity: "critical", steps: ["Immediately activate Empower Pharmacy (backup)", "Notify affected patients via SMS within 1 hour", "Offer free month credit for delays > 5 days", "Update website with transparent timeline", "Contact Belmar account rep — demand ETA"] },
  { title: "💳 Stripe Payment Processing Down", severity: "critical", steps: ["Check status.stripe.com for outage info", "Enable backup payment method (PayPal checkout)", "Pause all ad spend immediately", "Draft patient communication: 'billing delayed, no action needed'", "Monitor — resume ads when resolved"] },
  { title: "📉 Ad Performance Crash (>50% ROAS drop)", severity: "high", steps: ["Pause all affected campaigns", "Check for platform policy violations or ad rejections", "Review landing page — is it loading? Any errors?", "Generate 5 new creatives in Ad Studio — test fresh angles", "Reduce budget 50% and test for 48 hours before scaling back"] },
  { title: "⚕️ Patient Medical Emergency", severity: "critical", steps: ["Tell patient to call 911 immediately", "Do NOT provide medical advice", "Flag to OpenLoop provider within 15 minutes", "Document everything in audit log", "Follow up within 24 hours via provider"] },
  { title: "📰 Negative Press / Viral Complaint", severity: "high", steps: ["Do NOT respond publicly for first 2 hours", "Assess validity — is the complaint legitimate?", "Draft response with healthcare attorney review", "Contact patient directly — resolve privately", "Prepare statement if media inquiry comes"] },
  { title: "🔒 Data Breach / HIPAA Incident", severity: "critical", steps: ["Contain the breach — isolate affected systems", "Contact Vanta compliance team immediately", "Notify healthcare attorney within 1 hour", "HHS must be notified within 60 days (if 500+ patients affected)", "Notify affected patients per HIPAA Breach Notification Rule", "Document everything for OCR investigation"] },
];

function LaunchPage() {
  const [done, setDone] = useState(new Set());
  const toggle = (i) => setDone(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  let idx = 0;
  const total = STEPS.reduce((s, g) => s + g.steps.length, 0);
  const prog = Math.round((done.size / total) * 100);
  const cost = STEPS.reduce((s, g) => s + g.steps.reduce((a, st) => { const m = st.cost.match(/\$[\d,]+/); return a + (m ? parseInt(m[0].replace(/[$,]/g, "")) : 0); }, 0), 0);

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Launch Sequence</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 16 }}>{total} steps to live patients · {done.size} complete · Est. ~$28K to launch</p>

      <div style={{ height: 6, background: "rgba(255,255,255,.04)", borderRadius: 3, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${prog}%`, background: `linear-gradient(90deg,${B.forest},${B.sage})`, borderRadius: 3, transition: "width .4s" }} />
      </div>

      {STEPS.map((group, gi) => {
        const groupStart = idx;
        return (
          <div key={gi} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: group.color }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: B.bright }}>{group.group}</span>
              <span style={{ fontSize: 11, color: B.muted }}>({group.steps.length} steps)</span>
            </div>
            {group.steps.map((step, si) => {
              const i = idx++;
              const isDone = done.has(i);
              return (
                <div key={si} className={`step ${isDone ? "done" : ""}`}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div className={`chk ${isDone ? "on" : ""}`} onClick={() => toggle(i)}>{isDone ? "✓" : ""}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: isDone ? B.muted : B.bright, marginBottom: 2 }}>{step.t}</div>
                      <div style={{ fontSize: 12, color: B.muted, lineHeight: 1.6, marginBottom: 6 }}>{step.d}</div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                        <span className="mn" style={{ fontSize: 11, color: group.color }}>{step.cost}</span>
                        <span style={{ fontSize: 11, color: B.muted }}>⏱ {step.time}</span>
                        {step.url !== "#" && <a href={step.url} target="_blank" rel="noopener noreferrer" className="link">→ {step.urlLabel}</a>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function OpsPage() {
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Daily Operations</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 16 }}>The 2-person operation rhythm — 4.5 hours of actual work/day</p>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 12 }}>Daily Routine</div>
        {DAILY.map((t, i) => (
          <div key={i} className="task">
            <span style={{ fontSize: 16, flexShrink: 0 }}>{t.icon}</span>
            <span className="mn" style={{ fontSize: 11, color: B.sage, width: 60, flexShrink: 0 }}>{t.time}</span>
            <span style={{ fontSize: 13, color: B.bright, flex: 1 }}>{t.task}</span>
            <span style={{ fontSize: 10, color: B.muted, flexShrink: 0 }}>{t.dur}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: `${B.sage}08`, fontSize: 12, color: B.sage }}>
          💡 Total active work: ~4.5 hrs/day. The AI handles customer support (82% resolution). Pharmacies handle fulfillment. Doctors handle medicine. You handle growth.
        </div>
      </div>

      <div className="cd">
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 12 }}>Weekly Rhythm</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
          {WEEKLY.map((d, i) => (
            <div key={i} style={{ padding: 12, background: "rgba(0,0,0,.2)", borderRadius: 10, border: `1px solid ${B.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: B.sage, marginBottom: 8 }}>{d.day}</div>
              {d.tasks.map((t, j) => (
                <div key={j} style={{ fontSize: 11, color: B.text, lineHeight: 1.6, padding: "3px 0", borderBottom: j < d.tasks.length - 1 ? `1px solid ${B.border}` : "none" }}>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaybookPage() {
  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Emergency Playbooks</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 16 }}>When things break — follow these step by step</p>

      {PLAYBOOKS.map((pb, i) => (
        <div key={i} className="cd" style={{ borderLeft: `3px solid ${pb.severity === "critical" ? B.red : B.amber}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: B.bright }}>{pb.title}</span>
            <span className="tg" style={{ background: pb.severity === "critical" ? `${B.red}15` : `${B.amber}15`, color: pb.severity === "critical" ? B.red : B.amber }}>{pb.severity.toUpperCase()}</span>
          </div>
          {pb.steps.map((s, j) => (
            <div key={j} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: j < pb.steps.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <span className="mn" style={{ fontSize: 11, color: B.muted, width: 14, flexShrink: 0 }}>{j + 1}.</span>
              <span style={{ fontSize: 13, color: B.text, lineHeight: 1.6 }}>{s}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function VendorPage() {
  const vendors = [
    { n: "OpenLoop Health", r: "Physician network", c: "providers@openloophealth.com", u: "openloophealth.com", s: "Active", color: B.sage },
    { n: "Belmar Pharmacy", r: "Primary compounding", c: "partners@belmarpharmacy.com", u: "belmarpharmacy.com", s: "Active", color: B.sage },
    { n: "Empower Pharmacy", r: "Backup compounding", c: "info@empowerpharmacy.com", u: "empowerpharmacy.com", s: "Standby", color: B.amber },
    { n: "Stripe", r: "Payment processing", c: "support@stripe.com", u: "stripe.com", s: "Active", color: B.sage },
    { n: "Vercel", r: "Frontend hosting", c: "support@vercel.com", u: "vercel.com", s: "Active", color: B.sage },
    { n: "AWS", r: "HIPAA database (RDS)", c: "aws.amazon.com/support", u: "aws.amazon.com", s: "Active", color: B.sage },
    { n: "Anthropic", r: "Claude AI API", c: "sales@anthropic.com", u: "anthropic.com", s: "Active", color: B.sage },
    { n: "Postmark", r: "Transactional email", c: "support@postmarkapp.com", u: "postmarkapp.com", s: "Active", color: B.sage },
    { n: "Twilio", r: "SMS notifications", c: "support@twilio.com", u: "twilio.com", s: "Active", color: B.sage },
    { n: "Vanta", r: "HIPAA compliance", c: "sales@vanta.com", u: "vanta.com", s: "Setup", color: B.blue },
    { n: "Namecheap", r: "Domain registrar", c: "support@namecheap.com", u: "namecheap.com", s: "Active", color: B.sage },
  ];

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 16 }}>Vendor Directory</h1>
      {vendors.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}`, borderRadius: 10, marginBottom: 5 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: B.bright }}>{v.n}</div>
            <div style={{ fontSize: 11, color: B.muted }}>{v.r} · {v.c}</div>
          </div>
          <span className="tg" style={{ background: `${v.color}15`, color: v.color }}>{v.s}</span>
        </div>
      ))}
    </div>
  );
}

const NAV = [
  { id: "launch", l: "Launch Sequence", i: "🚀" },
  { id: "ops", l: "Daily Ops", i: "📋" },
  { id: "playbooks", l: "Emergency Playbooks", i: "🚨" },
  { id: "vendors", l: "Vendor Directory", i: "🏢" },
];

export default function App() {
  const [pg, setPg] = useState("launch");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>Operations Hub</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          {NAV.map(n => (<div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}><span style={{ fontSize: 14 }}>{n.i}</span>{n.l}</div>))}
        </div>
      </div>
      <div className="ma">
        {pg === "launch" && <LaunchPage />}
        {pg === "ops" && <OpsPage />}
        {pg === "playbooks" && <PlaybookPage />}
        {pg === "vendors" && <VendorPage />}
      </div>
    </div>
  );
}
