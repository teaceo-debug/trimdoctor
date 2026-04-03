import { useState, useEffect } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#B8860B", goldL: "#DAA520", goldBg: "#FDF8ED", cream: "#FBF8F3", warm: "#F5F0E8", dark: "#1A1A1A", text: "#3D3D3D", muted: "#8A8A8A", border: "#E8E2D6", white: "#FFFFFF" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Figtree',sans-serif;background:${B.cream};color:${B.text};-webkit-font-smoothing:antialiased;max-width:430px;margin:0 auto;overflow-x:hidden}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}

@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes gp{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes countUp{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
.au{animation:fu .5s ease forwards}
.shm{background:linear-gradient(90deg,${B.gold} 0%,#F5D76E 50%,${B.gold} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:sh 3s linear infinite}

.cta-g{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:18px;background:linear-gradient(135deg,${B.gold},#C69C21,${B.gold});color:#fff;border:none;border-radius:16px;font-family:Figtree;font-size:17px;font-weight:800;cursor:pointer;transition:all .3s;letter-spacing:.3px;box-shadow:0 4px 20px rgba(184,134,11,.3)}
.cta-g:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(184,134,11,.4)}
.cta-f{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;background:${B.forest};color:#fff;border:none;border-radius:14px;font-family:Figtree;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s}
.cta-f:hover{background:${B.forestL}}

.vc{background:${B.white};border-radius:16px;border:1px solid ${B.border};padding:16px;margin-bottom:10px}
.vip{background:linear-gradient(135deg,#1a1a1a,#2a2a2a);border:1px solid rgba(218,165,32,.3);border-radius:16px;padding:16px;margin-bottom:10px;color:#fff}
.tag-g{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;background:${B.goldBg};color:${B.gold};font-size:11px;font-weight:700;border:1px solid rgba(184,134,11,.15)}
.tag-vip{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;background:rgba(218,165,32,.12);color:${B.goldL};font-size:11px;font-weight:700}

.check{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid ${B.border}}
.check:last-child{border-bottom:none}
.check-ico{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px}

.coach{display:flex;gap:12px;padding:14px;background:rgba(0,0,0,.03);border-radius:14px;border:1px solid ${B.border};margin-bottom:8px}
.coach-av{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}

.comp-row{display:grid;grid-template-columns:2fr 1fr 1fr;padding:10px 0;border-bottom:1px solid ${B.border};align-items:center;font-size:13px}
.comp-row:last-child{border-bottom:none}

.sticky-cta{position:fixed;bottom:0;left:0;right:0;max-width:430px;margin:0 auto;padding:12px 16px;background:rgba(251,248,243,.95);backdrop-filter:blur(16px);border-top:1px solid ${B.border};z-index:100}
`;

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.goldL}/></svg>
      <span className="pf" style={{ fontSize: 18, fontWeight: 700, color: B.dark }}>TrimDoctor</span>
      <span className="tag-g" style={{ fontSize: 10, padding: "3px 7px" }}>VIP</span>
    </div>
  );
}

export default function App() {
  const [enrolled, setEnrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (enrolled) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <style>{css}</style>
        <div style={{ textAlign: "center" }} className="au">
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg,${B.gold},#DAA520)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>👑</div>
          <h1 className="pf" style={{ fontSize: 28, color: B.dark, marginBottom: 6 }}>Welcome to VIP</h1>
          <p style={{ color: B.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>Your concierge coach will reach out within 2 hours to schedule your onboarding call.</p>
          <div className="vc" style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: B.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>What happens next</div>
            {["Coach intro call (today)", "Body composition assessment", "Custom meal plan delivery (48 hrs)", "First workout program (48 hrs)", "Weekly accountability schedule set"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", fontSize: 13, color: B.text }}>
                <span style={{ color: B.gold }}>✓</span>{s}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <style>{css}</style>

      {/* ─── Hero ─── */}
      <section style={{ padding: "48px 20px 32px", background: `linear-gradient(180deg, ${B.dark} 0%, #1a2a20 100%)`, textAlign: "center" }}>
        <div className="au"><Logo /></div>
        <div className="au" style={{ animationDelay: ".06s", opacity: 0 }}>
          <div className="tag-vip" style={{ margin: "20px auto 14px", display: "inline-flex" }}>👑 EXCLUSIVE INVITATION</div>
        </div>
        <h1 className="pf au" style={{ fontSize: 32, color: "#fff", lineHeight: 1.12, letterSpacing: -1, marginBottom: 12, animationDelay: ".1s", opacity: 0 }}>
          Unlock your<br /><span className="shm">maximum results</span>
        </h1>
        <p className="au" style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 24px", animationDelay: ".14s", opacity: 0 }}>
          1-on-1 coaching, custom workouts, personalized nutrition — your concierge weight loss team.
        </p>

        {/* Social proof */}
        <div className="au" style={{ display: "flex", justifyContent: "center", gap: 20, animationDelay: ".18s", opacity: 0 }}>
          {[{ v: "3.2x", l: "More weight lost" }, { v: "91%", l: "Retain muscle" }, { v: "96%", l: "Stay 12+ months" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="mn" style={{ fontSize: 20, fontWeight: 700, color: B.goldL }}>{s.v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ padding: "0 16px" }}>

        {/* ─── The Problem ─── */}
        <section style={{ padding: "28px 0 16px" }}>
          <h2 className="pf" style={{ fontSize: 22, color: B.dark, marginBottom: 12, textAlign: "center" }}>The medication works.<br />But are you maximizing it?</h2>
          <div className="vc">
            {[
              { e: "⚠️", t: "40% of weight lost on GLP-1s is muscle", d: "Without a structured exercise program, you're losing the tissue that keeps your metabolism high." },
              { e: "🍽️", t: "Most patients eat the wrong foods", d: "Reduced appetite doesn't mean optimal nutrition. Poor protein timing = accelerated muscle loss." },
              { e: "📉", t: "70% of patients plateau by month 4", d: "Without accountability and program adjustments, weight loss stalls and motivation drops." },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: i < 2 ? `1px solid ${B.border}` : "none" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{p.e}</span>
                <div><div style={{ fontWeight: 700, fontSize: 14, color: B.dark, marginBottom: 2 }}>{p.t}</div><div style={{ fontSize: 12.5, color: B.muted, lineHeight: 1.65 }}>{p.d}</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Value Stack ─── */}
        <section style={{ padding: "8px 0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: B.gold, margin: "0 auto 10px" }} />
            <h2 className="pf" style={{ fontSize: 22, color: B.dark }}>Everything included</h2>
          </div>

          {[
            { e: "👤", t: "Dedicated 1-on-1 Coach", d: "Your personal accountability partner. Weekly 30-min video calls. Unlimited text check-ins.", val: "$800/mo value" },
            { e: "🏋️", t: "Custom Workout Programming", d: "Personalized resistance training plan updated every 4 weeks. Designed for muscle preservation during GLP-1 therapy. Video demos for every exercise.", val: "$300/mo value" },
            { e: "🥗", t: "Personalized Meal Plans", d: "Weekly meal plans optimized for your GLP-1 medication schedule. Protein-first approach. Macro tracking with a dietitian. Adjusted as your appetite changes.", val: "$400/mo value" },
            { e: "📊", t: "Body Composition Tracking", d: "Monthly DEXA-equivalent analysis. Track fat loss vs. muscle preservation. Data-driven program adjustments.", val: "$200/mo value" },
            { e: "👩‍⚕️", t: "Priority Physician Access", d: "Same-day responses from your provider. Priority dosage adjustments. Direct line to your care team.", val: "$150/mo value" },
            { e: "📱", t: "24/7 Private Coaching App", d: "Food photo logging with instant feedback. Workout tracking. Daily motivation. Direct coach messaging anytime.", val: "$100/mo value" },
            { e: "🧬", t: "Supplement Protocol", d: "Custom supplement stack based on your bloodwork. TrimDoctor supplements included at wholesale cost.", val: "$80/mo value" },
            { e: "🤝", t: "Private VIP Community", d: "Connect with other high-performance TrimDoctor VIP members. Weekly group calls. Accountability partnerships.", val: "$50/mo value" },
          ].map((item, i) => (
            <div key={i} className="vc">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{item.e}</span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: B.dark }}>{item.t}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: B.muted, lineHeight: 1.65, marginBottom: 6, paddingLeft: 30 }}>{item.d}</div>
              <div style={{ paddingLeft: 30 }}><span className="tag-g">{item.val}</span></div>
            </div>
          ))}
        </section>

        {/* ─── Value Stack Total ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div className="vip">
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Total value</div>
              <div className="mn" style={{ fontSize: 36, fontWeight: 700, color: B.goldL, textDecoration: "line-through", opacity: .5 }}>$2,080</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", margin: "6px 0 14px" }}>Your price</div>
              <div className="mn" style={{ fontSize: 52, fontWeight: 800, color: "#fff" }}>$1,799<span style={{ fontSize: 16, color: "rgba(255,255,255,.4)" }}>/mo</span></div>
              <div style={{ fontSize: 12, color: B.goldL, marginTop: 4, fontWeight: 600 }}>Save $281/month vs. hiring separately</div>
            </div>
            <button className="cta-g" onClick={() => setShowForm(true)} style={{ marginTop: 10 }}>
              👑 Enroll in VIP Coaching
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "rgba(255,255,255,.25)" }}>Cancel anytime · No long-term contract</div>
          </div>
        </section>

        {/* ─── Comparison ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: B.gold, margin: "0 auto 10px" }} />
            <h2 className="pf" style={{ fontSize: 22, color: B.dark }}>Standard vs. VIP</h2>
          </div>
          <div className="vc" style={{ padding: 0, overflow: "hidden" }}>
            <div className="comp-row" style={{ background: B.warm, fontWeight: 700, fontSize: 12, color: B.muted, padding: "10px 14px" }}>
              <div>Feature</div><div style={{ textAlign: "center" }}>Standard</div><div style={{ textAlign: "center", color: B.gold }}>VIP 👑</div>
            </div>
            {[
              ["GLP-1 Medication", "✓", "✓"],
              ["Physician Access", "48 hrs", "Same day"],
              ["1-on-1 Coach", "—", "Weekly calls"],
              ["Custom Workouts", "—", "Updated monthly"],
              ["Meal Plans", "—", "Personalized weekly"],
              ["Body Comp Tracking", "—", "Monthly analysis"],
              ["Supplement Protocol", "—", "Custom + wholesale"],
              ["24/7 App Access", "Portal only", "Full coaching app"],
              ["Text Your Coach", "—", "Unlimited"],
              ["VIP Community", "—", "Private group"],
              ["Price", "$299/mo", "$1,799/mo"],
            ].map((row, i) => (
              <div key={i} className="comp-row" style={{ padding: "10px 14px" }}>
                <div style={{ fontWeight: 500, color: B.dark, fontSize: 13 }}>{row[0]}</div>
                <div style={{ textAlign: "center", color: row[1] === "—" ? B.border : B.text }}>{row[1]}</div>
                <div style={{ textAlign: "center", fontWeight: 600, color: B.forest }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Coaches ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: B.gold, margin: "0 auto 10px" }} />
            <h2 className="pf" style={{ fontSize: 22, color: B.dark }}>Your Coaching Team</h2>
          </div>
          {[
            { av: "💪", name: "Jake Morales, CSCS", title: "Head Strength Coach", desc: "12 years in body recomposition. Former D1 athlete. Specializes in resistance training during medical weight loss.", bg: "#EFF6FF" },
            { av: "🥗", name: "Dr. Amy Chen, RD", title: "Lead Dietitian", desc: "PhD in clinical nutrition. Published researcher on protein timing with GLP-1 therapy. Designs all VIP meal plans.", bg: "#ECFDF5" },
            { av: "🧠", name: "Maria Santos", title: "Accountability Coach", desc: "Certified health coach. 500+ clients through transformations. Your daily check-in partner and motivator.", bg: "#FDF2F8" },
          ].map((c, i) => (
            <div key={i} className="coach">
              <div className="coach-av" style={{ background: c.bg }}>{c.av}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: B.dark }}>{c.name}</div>
                <div style={{ fontSize: 12, color: B.gold, fontWeight: 600, marginBottom: 3 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: B.muted, lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: B.gold, margin: "0 auto 10px" }} />
            <h2 className="pf" style={{ fontSize: 22, color: B.dark }}>VIP Results</h2>
          </div>
          {[
            { name: "David K.", lost: "52 lbs in 5 months", muscle: "Maintained 94% lean mass", q: "The coaching made all the difference. I was losing weight on the medication alone but I was losing muscle too. Jake's program completely changed that." },
            { name: "Amanda R.", lost: "38 lbs in 4 months", muscle: "Gained 3 lbs muscle", q: "Having a coach text me every morning kept me accountable. The meal plans were so easy to follow even with zero appetite. Worth every penny." },
            { name: "Marcus T.", lost: "67 lbs in 7 months", muscle: "DEXA: 91% fat loss", q: "I tried the standard plan for 2 months and plateaued. Upgraded to VIP and broke through immediately. My body composition completely changed." },
          ].map((t, i) => (
            <div key={i} className="vc">
              <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>{[1,2,3,4,5].map(j => <svg key={j} width="14" height="14" viewBox="0 0 16 16" fill={B.goldL}><path d="M8 0l2.47 4.94L16 5.73l-4 3.85.94 5.42L8 12.34 3.06 15l.94-5.42-4-3.85 5.53-.79z"/></svg>)}</div>
              <p style={{ fontSize: 14, color: B.text, lineHeight: 1.7, marginBottom: 12 }}>"{t.q}"</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontWeight: 700, fontSize: 14, color: B.dark }}>{t.name}</div><div style={{ fontSize: 11, color: B.muted }}>VIP Member</div></div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 5, background: B.sageL, color: B.forest, fontSize: 11, fontWeight: 600, display: "inline-block" }}>{t.lost}</span>
                  <div style={{ fontSize: 10, color: B.gold, fontWeight: 600, marginTop: 3 }}>{t.muscle}</div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ─── ROI Calculator ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div className="vip">
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>The Real Cost Comparison</div>
            {[
              { l: "Personal trainer (3x/week)", v: "$600-1,200/mo" },
              { l: "Registered dietitian", v: "$400-800/mo" },
              { l: "Accountability coach", v: "$300-500/mo" },
              { l: "Meal prep service", v: "$200-400/mo" },
              { l: "DEXA scans", v: "$100-200/mo" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid rgba(255,255,255,.06)`, fontSize: 13 }}>
                <span style={{ color: "rgba(255,255,255,.5)" }}>{r.l}</span>
                <span className="mn" style={{ color: "rgba(255,255,255,.35)", fontSize: 12 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", marginTop: 4 }}>
              <span style={{ fontWeight: 700, color: "#fff" }}>Hiring separately</span>
              <span className="mn" style={{ fontWeight: 700, color: "#E74C3C", fontSize: 14 }}>$1,600-3,100/mo</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid ${B.goldL}40` }}>
              <span style={{ fontWeight: 700, color: B.goldL }}>TrimDoctor VIP</span>
              <span className="mn" style={{ fontWeight: 700, color: B.goldL, fontSize: 16 }}>$1,799/mo</span>
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: B.goldL, fontWeight: 600, marginTop: 6 }}>All-in-one. One team. One price.</div>
          </div>
        </section>

        {/* ─── Guarantee ─── */}
        <section style={{ padding: "0 0 24px" }}>
          <div className="vc" style={{ textAlign: "center", border: `2px solid ${B.forest}` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: B.dark, marginBottom: 6 }}>30-Day Results Guarantee</h3>
            <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.7 }}>
              If you don't see measurable progress in body composition within your first 30 days, we'll refund your coaching fee. No questions asked.
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: "0 0 24px" }}>
          {[
            { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel through your portal or tell your coach. We'll stop billing immediately." },
            { q: "Do I keep my GLP-1 medication?", a: "Absolutely. VIP coaching is an add-on to your existing medication plan. Your prescription continues as normal." },
            { q: "How quickly do I get matched with a coach?", a: "Within 2 hours of enrolling, your coach will reach out. Your onboarding call happens within 24 hours." },
            { q: "What if I travel or miss a week?", a: "Your coach adjusts. Travel workouts, restaurant guides, and flexible scheduling are all part of VIP." },
          ].map((f, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: B.dark, marginBottom: 4 }}>{f.q}</div>
              <div style={{ fontSize: 13, color: B.muted, lineHeight: 1.65 }}>{f.a}</div>
            </div>
          ))}
        </section>

        {/* ─── Final CTA ─── */}
        <section style={{ padding: "0 0 20px" }}>
          <div className="vip" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>👑</div>
            <h2 className="pf" style={{ fontSize: 24, color: "#fff", marginBottom: 6 }}>Ready for maximum results?</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 14 }}>Your coach is ready. Your program is waiting.</p>
            <div className="mn" style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 4 }}>$1,799<span style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>/mo</span></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginBottom: 14 }}>30-day guarantee · Cancel anytime</div>
            <button className="cta-g" onClick={() => setEnrolled(true)}>👑 Enroll Now — Start Today</button>
          </div>
        </section>
      </div>

      {/* ─── Sticky Bottom CTA ─── */}
      <div className="sticky-cta">
        <button className="cta-g" onClick={() => setEnrolled(true)}>
          👑 Enroll in VIP — $1,799/mo
        </button>
      </div>
    </div>
  );
}
