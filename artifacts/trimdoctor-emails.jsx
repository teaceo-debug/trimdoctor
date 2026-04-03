import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", dark: "#0C1210", dark2: "#141F1A", dark3: "#1C2B24", text: "#8FA89A", bright: "#D4E8DC", muted: "#5A6E63", border: "rgba(255,255,255,.06)", red: "#E74C3C", amber: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6", cyan: "#06B6D4", pink: "#EC4899" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.sb{position:fixed;left:0;top:0;bottom:0;width:236px;background:${B.dark2};border-right:1px solid ${B.border};padding:20px 0;z-index:100;overflow-y:auto}
.ma{margin-left:236px;min-height:100vh;padding:24px 28px}
.ni{display:flex;align-items:center;gap:10px;padding:9px 20px;color:${B.muted};cursor:pointer;font-size:13px;font-weight:500;transition:all .15s;border-left:2px solid transparent}
.ni:hover{color:${B.bright};background:rgba(255,255,255,.03)}.ni.on{color:${B.sage};background:rgba(149,213,178,.06);border-left-color:${B.sage}}
.cd{background:${B.dark2};border-radius:14px;border:1px solid ${B.border};padding:20px;margin-bottom:12px}
.fn{position:relative;padding:14px 18px;border-radius:10px;border:1px solid ${B.border};background:rgba(0,0,0,.2);margin-bottom:4px;cursor:pointer;transition:all .2s}
.fn:hover{border-color:${B.sage}30}.fn.sel{border-color:${B.sage};background:rgba(149,213,178,.04);box-shadow:0 0 0 2px ${B.sage}15}
.fc{width:2px;height:14px;background:${B.border};margin:0 auto}
.ep{background:#fff;border-radius:10px;max-width:480px;box-shadow:0 4px 24px rgba(0,0,0,.3);overflow:hidden;color:#333}
.eh{padding:24px 26px;text-align:center}
.eb{padding:0 26px 26px;font-size:13.5px;line-height:1.85;color:#555}
.ec{display:inline-block;padding:12px 26px;background:${B.forest};color:#fff;border-radius:10px;font-weight:600;font-size:14px}
.ef{padding:18px 26px;background:#f8f9fa;font-size:10.5px;color:#999;text-align:center;line-height:1.8}
.sp{background:#1a1a2e;border-radius:18px;padding:14px;max-width:300px;box-shadow:0 4px 20px rgba(0,0,0,.3)}
.sm{background:#2563EB;color:#fff;padding:10px 14px;border-radius:16px 16px 4px 16px;font-size:12.5px;line-height:1.6}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fadeIn .3s ease}
@media(max-width:900px){.sb{display:none}.ma{margin-left:0;padding:16px}}
`;

const FLOWS = {
  welcome: { name: "Welcome Sequence", trigger: "After checkout", color: B.sage, metrics: { sent: 14892, open: 72.4, click: 34.8 },
    steps: [
      { type: "email", delay: "Immediate", subj: "Welcome to TrimDoctor — Here's What Happens Next", open: 78.2, click: 42.1, email: { head: "Welcome to TrimDoctor! 🎉", body: "Hi {{first_name}},\n\nThank you for taking the first step. Here's what happens next:\n\n1. A board-certified physician reviews your profile within 24-48 hours\n2. Once approved, your medication is prepared by our licensed pharmacy\n3. You'll receive tracking info when your order ships (3-5 days)\n\nSet up your patient portal to track progress and message your care team anytime.", cta: "Set Up Your Portal →" }},
      { type: "sms", delay: "+1 hour", subj: "SMS: Welcome", sms: "Welcome to TrimDoctor, {{first_name}}! 🎉 Your physician will review your profile within 24-48 hrs. Track status: portal.trimdoctor.com" },
      { type: "email", delay: "+24 hours", subj: "What to Expect From GLP-1 Medication", open: 64.1, click: 28.3, email: { head: "What to Expect 💊", body: "Hi {{first_name}},\n\nWhile you wait for your physician review:\n\n• Most patients notice reduced appetite within week 1\n• Mild nausea is common — usually passes in 1-2 weeks\n• Stay hydrated and eat smaller, protein-rich meals\n• Average weight loss: 8-12 lbs in the first month\n\nYour care team is available 24/7 through your portal.", cta: "Read Our Getting Started Guide →" }},
    ]},
  shipping: { name: "Shipping Notifications", trigger: "Order status changes", color: B.cyan, metrics: { sent: 38420, open: 85.2, click: 22.4 },
    steps: [
      { type: "email", delay: "Rx approved", subj: "Great News — You're Approved!", open: 89.3, click: 28.1, email: { head: "You're Approved! ✅", body: "Hi {{first_name}},\n\nDr. {{provider_name}} has approved your prescription for {{medication}} at {{dose}}.\n\nYour medication is being prepared by our pharmacy partner and will ship within 2-3 business days.", cta: "View Your Prescription →" }},
      { type: "sms", delay: "Shipped", subj: "SMS: Shipped", sms: "Your TrimDoctor medication has shipped! 📦 Track: track.trimdoctor.com/{{tracking_id}} — Arriving in 3-5 days." },
      { type: "sms", delay: "Delivered", subj: "SMS: Delivered", sms: "Your TrimDoctor package was delivered! 🎉 Refrigerate your medication right away. Questions? Message us in the app." },
    ]},
  retention: { name: "Monthly Retention", trigger: "Every 30 days", color: B.purple, metrics: { sent: 42180, open: 58.6, click: 26.3 },
    steps: [
      { type: "email", delay: "Day 25", subj: "Your Monthly Check-in is Ready", open: 62.4, click: 38.2, email: { head: "Time for Your Check-in 📋", body: "Hi {{first_name}},\n\nYou've been on your TrimDoctor journey for {{months_active}} months!\n\nProgress so far: {{total_weight_lost}} lbs lost\n\nComplete your quick monthly check-in before your next shipment. This helps your provider optimize your plan.\n\nNext charge: ${{price}} on {{billing_date}}.", cta: "Complete Check-in →" }},
      { type: "email", delay: "10 lbs milestone", subj: "🎉 You've Lost 10 Pounds!", open: 84.2, click: 52.8, email: { head: "10 LBS DOWN! 🎉🔥", body: "{{first_name}}, this is HUGE!\n\nYou've officially lost 10 pounds since starting TrimDoctor.\n\nWhat 10 lbs of fat loss means:\n• Lower blood pressure\n• Improved insulin sensitivity\n• More energy & better sleep\n\nKeep going — you're on an incredible trajectory.", cta: "Share Your Progress →" }},
    ]},
  churn: { name: "Churn Prevention", trigger: "Risk signals", color: B.red, metrics: { sent: 3840, open: 52.1, click: 18.6 },
    steps: [
      { type: "email", delay: "Payment failed", subj: "We Couldn't Process Your Payment", open: 68.4, click: 42.1, email: { head: "Payment Issue 💳", body: "Hi {{first_name}},\n\nWe weren't able to process your ${{price}} payment. This could be an expired card or temporary hold.\n\nYour subscription is still active — please update your payment method within 3 days to avoid interruption.", cta: "Update Payment →" }},
      { type: "email", delay: "Cancel clicked", subj: "Before You Go — Can We Help?", open: 61.3, click: 32.8, email: { head: "We'd Hate to See You Go 💚", body: "Hi {{first_name}},\n\nBefore you cancel, can we help?\n\n• Side effects? → Your provider can adjust dosage\n• Cost? → We can switch to a more affordable plan\n• Not seeing results? → Let's review your treatment\n\nOr try a free 30-day pause instead of canceling.", cta: "Talk to Your Provider →" }},
    ]},
  winback: { name: "Win-Back", trigger: "After cancellation", color: B.amber, metrics: { sent: 2140, open: 38.6, click: 12.4 },
    steps: [
      { type: "email", delay: "+7 days", subj: "We Saved Your Spot", open: 42.1, click: 14.3, email: { head: "Your Spot is Still Here 💚", body: "Hi {{first_name}},\n\nIt's been a week since you paused. Your treatment plan and progress are saved — pick up right where you left off anytime.\n\nNew plans starting at $149/month.", cta: "Reactivate →" }},
      { type: "email", delay: "+30 days", subj: "Come Back for $99", open: 36.8, click: 18.9, email: { head: "Special Comeback Offer 🎁", body: "Hi {{first_name}},\n\nWelcome-back offer: your first month back at just $99 (normally ${{price}}).\n\nYour provider, progress, and plan are all waiting. Offer expires in 7 days.", cta: "Claim $99 Offer →" }},
    ]},
  referral: { name: "Referral Nudges", trigger: "Milestone events", color: B.pink, metrics: { sent: 8920, open: 54.2, click: 22.6 },
    steps: [
      { type: "email", delay: "After 10+ lbs", subj: "Give $50, Get $50 — Share TrimDoctor", open: 58.4, click: 28.1, email: { head: "Know Someone Who'd Love This? 💰", body: "Hi {{first_name}},\n\nYou've lost {{weight_lost}} lbs — amazing! 🎉\n\nShare your unique link and you'll BOTH get $50 off your next month.\n\nYour link: trimdoctor.com/ref/{{code}}", cta: "Share & Earn $50 →" }},
    ]},
};

const KEYS = Object.keys(FLOWS);

function EmailPreview({ d }) {
  return (
    <div className="ep">
      <div className="eh" style={{ background: `linear-gradient(135deg,${B.forest},${B.forestM})` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 12 }}>
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="rgba(255,255,255,.15)"/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/></svg>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>TrimDoctor</span>
        </div>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{d.head}</h2>
      </div>
      <div className="eb" style={{ paddingTop: 20 }}>
        {d.body.split("\n").map((l, i) => <p key={i} style={{ marginBottom: l === "" ? 10 : 3 }}>{l || <br />}</p>)}
        {d.cta && <div style={{ textAlign: "center", margin: "20px 0 6px" }}><span className="ec">{d.cta}</span></div>}
      </div>
      <div className="ef">TrimDoctor, LLC · 131 Continental Dr, Suite 305, Newark, DE 19713<br />Unsubscribe · Preferences · Privacy</div>
    </div>
  );
}

function SmsPreview({ t }) {
  return (
    <div className="sp">
      <div style={{ textAlign: "center", fontSize: 10, color: B.muted, marginBottom: 10 }}>TrimDoctor · iMessage</div>
      <div className="sm">{t}</div>
      <div style={{ textAlign: "right", fontSize: 9, color: B.muted, marginTop: 4 }}>Delivered · 10:32 AM</div>
    </div>
  );
}

function OverviewPage() {
  const totalSent = KEYS.reduce((s, k) => s + FLOWS[k].metrics.sent, 0);
  const avgOpen = (KEYS.reduce((s, k) => s + FLOWS[k].metrics.open, 0) / KEYS.length).toFixed(1);
  const totalSteps = KEYS.reduce((s, k) => s + FLOWS[k].steps.length, 0);

  return (
    <div className="fi">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright, marginBottom: 2 }}>Email & SMS Automation</h1>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>The retention engine — runs while you sleep</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 18 }}>
        {[{ l: "Total Sent", v: (totalSent / 1e3).toFixed(0) + "K", c: B.bright }, { l: "Avg Open", v: avgOpen + "%", c: B.sage }, { l: "Flows", v: KEYS.length, c: B.blue }, { l: "Templates", v: totalSteps, c: B.purple }, { l: "Active", v: KEYS.length, c: B.sage }].map((m, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(0,0,0,.2)", borderRadius: 10, border: `1px solid ${B.border}` }}>
            <div className="mn" style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div>
            <div style={{ fontSize: 10, color: B.muted }}>{m.l}</div>
          </div>
        ))}
      </div>

      {KEYS.map(k => { const f = FLOWS[k]; return (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "rgba(0,0,0,.2)", border: `1px solid ${B.border}`, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color }} />
          <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14, color: B.bright }}>{f.name}</div><div style={{ fontSize: 11, color: B.muted }}>Trigger: {f.trigger}</div></div>
          <div className="mn" style={{ fontSize: 13, color: B.sage }}>{f.metrics.open}% open</div>
          <div style={{ fontSize: 11, color: B.muted }}>{f.steps.length} steps</div>
          <span style={{ padding: "3px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600, background: `${B.sage}15`, color: B.sage }}>Active</span>
        </div>
      );})}

      <div className="cd" style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: B.bright, marginBottom: 8 }}>Retention Impact</div>
        <div style={{ fontSize: 13, color: B.text, lineHeight: 2 }}>
          <div>• <strong style={{ color: B.sage }}>Welcome + Onboarding</strong> → reduces Day 1-14 churn by ~40%</div>
          <div>• <strong style={{ color: B.cyan }}>Shipping Notifications</strong> → reduces "where's my order" tickets by ~60%</div>
          <div>• <strong style={{ color: B.purple }}>Monthly Check-ins</strong> → reduces involuntary churn by ~25%</div>
          <div>• <strong style={{ color: B.red }}>Churn Prevention</strong> → saves ~18% of at-risk patients</div>
          <div>• <strong style={{ color: B.amber }}>Win-Back</strong> → recovers ~12% of churned patients</div>
          <div>• <strong style={{ color: B.pink }}>Referral Nudges</strong> → drives 8-12% of new signups</div>
        </div>
      </div>
    </div>
  );
}

function FlowPage({ flowKey }) {
  const [sel, setSel] = useState(0);
  const flow = FLOWS[flowKey];
  const step = flow.steps[sel];

  return (
    <div className="fi">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: flow.color }} />
        <h1 style={{ fontSize: 22, fontWeight: 800, color: B.bright }}>{flow.name}</h1>
      </div>
      <p style={{ fontSize: 12, color: B.muted, marginBottom: 20 }}>Trigger: {flow.trigger}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 18 }}>
        {[{ l: "Sent", v: (flow.metrics.sent / 1e3).toFixed(1) + "K" }, { l: "Open Rate", v: flow.metrics.open + "%" }, { l: "Click Rate", v: flow.metrics.click + "%" }].map((m, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(0,0,0,.2)", borderRadius: 10, border: `1px solid ${B.border}` }}>
            <div className="mn" style={{ fontSize: 20, fontWeight: 700, color: B.bright }}>{m.v}</div>
            <div style={{ fontSize: 10, color: B.muted }}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Steps</div>
          {flow.steps.map((s, i) => (
            <div key={i}>
              <div className={`fn ${sel === i ? "sel" : ""}`} onClick={() => setSel(i)}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 12 }}>{s.type === "email" ? "📧" : "📱"}</span>
                  <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: s.type === "email" ? `${B.blue}15` : `${B.cyan}15`, color: s.type === "email" ? B.blue : B.cyan }}>{s.type === "email" ? "Email" : "SMS"}</span>
                  <span style={{ fontSize: 10, color: B.muted, marginLeft: "auto" }}>{s.delay}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: B.bright, lineHeight: 1.4 }}>{s.subj}</div>
                {s.open && <div style={{ fontSize: 10, color: B.muted, marginTop: 4 }}>Open: <span style={{ color: B.sage }}>{s.open}%</span> · Click: <span style={{ color: B.blue }}>{s.click}%</span></div>}
              </div>
              {i < flow.steps.length - 1 && <div className="fc" />}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: B.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Preview</div>
          {step.type === "email" && step.email ? <EmailPreview d={step.email} /> : step.sms ? <SmsPreview t={step.sms} /> : <div className="cd"><div style={{ color: B.muted, textAlign: "center", padding: 40 }}>No preview</div></div>}
        </div>
      </div>
    </div>
  );
}

const NAV = [{ id: "overview", l: "Overview", i: "◉" }, ...KEYS.map(k => ({ id: k, l: FLOWS[k].name, i: "", dot: FLOWS[k].color }))];

export default function App() {
  const [pg, setPg] = useState("overview");
  return (
    <div><style>{css}</style>
      <div className="sb">
        <div style={{ padding: "0 20px 18px", borderBottom: `1px solid ${B.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forestL}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
            <span className="pf" style={{ fontSize: 17, fontWeight: 700, color: B.bright }}>TrimDoctor</span>
          </div>
          <div style={{ fontSize: 11, color: B.muted, marginTop: 5 }}>Email & SMS Automation</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          {NAV.map(n => (
            <div key={n.id} className={`ni ${pg === n.id ? "on" : ""}`} onClick={() => setPg(n.id)}>
              {n.dot ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.dot, flexShrink: 0 }} /> : <span style={{ fontSize: 13 }}>{n.i}</span>}
              <span style={{ fontSize: 12.5 }}>{n.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ma">
        {pg === "overview" ? <OverviewPage /> : <FlowPage flowKey={pg} />}
      </div>
    </div>
  );
}
