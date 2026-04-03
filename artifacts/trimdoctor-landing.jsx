import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// TRIMDOCTOR — Production Landing Page
// Aesthetic: Luxury Clinical — Aesop meets One Medical
// ═══════════════════════════════════════════════════════════

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Albert+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

:root {
  --forest: #1B4332;
  --forest-light: #2D6A4F;
  --forest-muted: #40916C;
  --sage: #95D5B2;
  --sage-light: #D8F3DC;
  --cream: #FDFAF5;
  --cream-dark: #F5EFE6;
  --warm: #F8F4EE;
  --gold: #B8860B;
  --gold-light: #DAA520;
  --dark: #1A1A1A;
  --text: #3D3D3D;
  --muted: #8A8A8A;
  --border: #E8E3DA;
  --white: #FFFFFF;
}

body {
  font-family: 'Albert Sans', -apple-system, sans-serif;
  color: var(--text);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.display { font-family: 'Playfair Display', Georgia, serif; }
.mono { font-family: 'JetBrains Mono', monospace; }

/* Noise grain overlay */
body::after {
  content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.4;
}

/* Animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes expandLine { from { width: 0; } to { width: 60px; } }
@keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.anim-up { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.anim-d1 { animation-delay: 0.08s; }
.anim-d2 { animation-delay: 0.16s; }
.anim-d3 { animation-delay: 0.24s; }
.anim-d4 { animation-delay: 0.32s; }
.anim-d5 { animation-delay: 0.40s; }

.shimmer {
  background: linear-gradient(90deg, var(--forest) 0%, var(--gold) 50%, var(--forest) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}

/* Buttons */
.cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 18px 42px; background: var(--forest); color: var(--white);
  border: none; border-radius: 60px; font-family: 'Albert Sans', sans-serif;
  font-size: 16px; font-weight: 700; letter-spacing: 0.3px;
  cursor: pointer; position: relative; overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}
.cta::after {
  content: '→'; font-size: 18px; transition: transform 0.3s ease;
}
.cta:hover { background: var(--forest-light); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(27,67,50,0.25); }
.cta:hover::after { transform: translateX(4px); }

.cta-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 36px; background: transparent; color: var(--forest);
  border: 2px solid var(--forest); border-radius: 60px;
  font-family: 'Albert Sans', sans-serif; font-size: 15px; font-weight: 700;
  cursor: pointer; transition: all 0.3s; text-decoration: none;
}
.cta-outline:hover { background: var(--forest); color: var(--white); }

/* Elegant divider */
.divider { width: 60px; height: 1px; background: var(--gold); margin: 0 auto; animation: expandLine 1s ease forwards; }

/* Card hover */
.lift { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.lift:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(0,0,0,0.06); }

/* Pricing featured glow */
.featured-card { position: relative; }
.featured-card::before {
  content: ''; position: absolute; inset: -2px; border-radius: 26px;
  background: linear-gradient(135deg, var(--forest), var(--gold), var(--forest));
  z-index: -1;
}

@media (max-width: 768px) {
  .hero-title { font-size: 40px !important; }
  .section-title { font-size: 36px !important; }
  .hide-mobile { display: none !important; }
}
`;

// ─── ICONS ────────────────────────────────────────────────
const Ic = {
  Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeWidth="2"/></svg>,
  Truck: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Chat: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.667 5L7.5 14.167 3.333 10"/></svg>,
  Star: () => <svg width="15" height="15" viewBox="0 0 16 16" fill="#DAA520"><path d="M8 0l2.47 4.94L16 5.73l-4 3.85.94 5.42L8 12.34 3.06 15l.94-5.42-4-3.85 5.53-.79z"/></svg>,
};

// ─── NAV ──────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 32px",
      background: scrolled ? "rgba(253,250,245,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#1B4332"/>
            <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity="0.9"/>
            <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520"/>
          </svg>
          <span className="display" style={{ fontSize: 22, fontWeight: 700, color: "var(--dark)", letterSpacing: -0.5 }}>TrimDoctor</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <a href="#how" className="hide-mobile" style={{ textDecoration: "none", color: "var(--muted)", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>How It Works</a>
          <a href="#pricing" className="hide-mobile" style={{ textDecoration: "none", color: "var(--muted)", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>Pricing</a>
          <a href="#faq" className="hide-mobile" style={{ textDecoration: "none", color: "var(--muted)", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>FAQ</a>
          <a href="#start" className="cta" style={{ padding: "12px 28px", fontSize: 14 }}>Get Started</a>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(170deg, var(--cream) 0%, var(--warm) 50%, var(--sage-light) 100%)",
      position: "relative", overflow: "hidden", padding: "0 32px",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -180, right: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,67,50,0.04) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -100, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 120, position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div className="anim-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 40, background: "rgba(27,67,50,0.06)", border: "1px solid rgba(27,67,50,0.1)", marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--forest-muted)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--forest)", letterSpacing: 1.5, textTransform: "uppercase" }}>Now Accepting New Patients</span>
          </div>

          {/* Headline */}
          <h1 className="display anim-up anim-d1 hero-title" style={{ fontSize: 62, lineHeight: 1.06, color: "var(--dark)", letterSpacing: -2, marginBottom: 24, fontWeight: 700 }}>
            Doctor-guided<br/>weight loss,<br/><span className="shimmer">delivered.</span>
          </h1>

          {/* Subheadline */}
          <p className="anim-up anim-d2" style={{ fontSize: 19, lineHeight: 1.75, color: "var(--muted)", maxWidth: 480, marginBottom: 40, fontWeight: 400 }}>
            Compounded GLP-1 medication prescribed by board-certified physicians. Shipped to your door. No insurance needed. Starting at <strong style={{ color: "var(--dark)", fontWeight: 700 }}>$179/month</strong>.
          </p>

          {/* CTAs */}
          <div className="anim-up anim-d3" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#start" className="cta" style={{ fontSize: 17, padding: "20px 44px" }}>Start Your Free Assessment</a>
            <a href="#how" className="cta-outline">See How It Works</a>
          </div>

          {/* Trust strip */}
          <div className="anim-up anim-d4" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              { icon: <Ic.Shield />, text: "Board-certified physicians" },
              { icon: <Ic.Truck />, text: "Free discreet shipping" },
              { icon: <Ic.Chat />, text: "24/7 care team access" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13, fontWeight: 500 }}>
                <span style={{ color: "var(--forest-muted)" }}>{t.icon}</span>
                {t.text}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="anim-up anim-d5" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginTop: 80, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
          {[
            { value: "100,000+", label: "Patients treated" },
            { value: "25 lbs", label: "Avg. lost in 3 months" },
            { value: "4.8", label: "Patient satisfaction", star: true },
            { value: "48 hrs", label: "Prescription turnaround" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="display" style={{ fontSize: 36, color: "var(--forest)", fontWeight: 700, letterSpacing: -1 }}>{s.value}</span>
                {s.star && <Ic.Star />}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF BAR ─────────────────────────────────────
function SocialProof() {
  return (
    <section style={{ padding: "32px 32px", background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
        {["As seen in", "Forbes Health", "Healthline", "GQ", "Women's Health", "USA Today"].map((pub, i) => (
          <span key={i} style={{ fontSize: i === 0 ? 11 : 15, fontWeight: i === 0 ? 600 : 700, color: i === 0 ? "var(--muted)" : "rgba(0,0,0,0.15)", letterSpacing: i === 0 ? 2 : 1, textTransform: i === 0 ? "uppercase" : "none" }}>
            {pub}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "01", title: "Complete Your Assessment", desc: "Answer a few health questions online. Takes about 5 minutes — no appointment needed. We screen for eligibility before you pay.", icon: "📋" },
    { num: "02", title: "Physician Review", desc: "A U.S.-licensed, board-certified doctor reviews your profile within 48 hours and creates a personalized treatment plan.", icon: "👩‍⚕️" },
    { num: "03", title: "Medication Delivered", desc: "Your compounded GLP-1 medication is prepared by an FDA-regulated pharmacy and shipped free, directly to your door.", icon: "📦" },
    { num: "04", title: "Ongoing Support", desc: "Unlimited messaging with your care team. Monthly check-ins. Dosage adjustments. We're with you every step of the way.", icon: "💚" },
  ];

  return (
    <section id="how" style={{ padding: "120px 32px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="divider" style={{ marginBottom: 20 }} />
          <h2 className="display section-title" style={{ fontSize: 44, color: "var(--dark)", letterSpacing: -1, fontWeight: 700 }}>How TrimDoctor Works</h2>
          <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 17, maxWidth: 460, margin: "12px auto 0" }}>From assessment to your doorstep in as little as 5 days.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map((step, i) => (
            <div key={i} className="lift" style={{ padding: "36px 28px", borderRadius: 24, background: "var(--cream)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "var(--gold)", letterSpacing: 2 }}>{step.num}</span>
                <span style={{ fontSize: 28 }}>{step.icon}</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--dark)", marginBottom: 10, lineHeight: 1.3 }}>{step.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────
function Pricing() {
  const plans = [
    { name: "Semaglutide Tablets", sub: "Needle-Free", first: 149, ongoing: 249, features: ["Oral semaglutide tablets", "Easy daily dosing", "Physician consultation", "24/7 care team messaging", "Free standard shipping"], featured: false },
    { name: "Semaglutide Injection", sub: "Most Popular", first: 179, ongoing: 299, features: ["Compounded semaglutide vial", "Syringes & supplies included", "Physician consultation", "24/7 care team messaging", "Free priority shipping", "Monthly dosage optimization"], featured: true },
    { name: "Tirzepatide Injection", sub: "Maximum Results", first: 249, ongoing: 399, features: ["Dual-action GLP-1/GIP", "Compounded tirzepatide vial", "Physician consultation", "24/7 care team messaging", "Free priority shipping", "Enhanced weight loss"], featured: false },
  ];

  return (
    <section id="pricing" style={{ padding: "120px 32px", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="divider" style={{ marginBottom: 20 }} />
          <h2 className="display section-title" style={{ fontSize: 44, color: "var(--dark)", letterSpacing: -1, fontWeight: 700 }}>Transparent Pricing</h2>
          <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 17 }}>No hidden fees. No insurance required. Cancel anytime.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {plans.map((plan, i) => (
            <div key={i} className={plan.featured ? "featured-card" : ""} style={{ padding: plan.featured ? 2 : 0 }}>
              <div className="lift" style={{
                padding: "40px 32px", borderRadius: 24, background: "var(--white)",
                border: plan.featured ? "none" : "1px solid var(--border)",
                height: "100%", display: "flex", flexDirection: "column",
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{plan.sub}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--dark)", marginBottom: 24 }}>{plan.name}</h3>

                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>First month</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                    <span className="display" style={{ fontSize: 52, fontWeight: 700, color: "var(--forest)", letterSpacing: -2 }}>${plan.first}</span>
                    <span style={{ color: "var(--muted)", fontSize: 14 }}>/mo</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                  Then ${plan.ongoing}/month
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text)" }}>
                      <span style={{ color: "var(--forest-muted)", flexShrink: 0 }}><Ic.Check /></span>
                      {f}
                    </div>
                  ))}
                </div>

                <a href="#start" className={plan.featured ? "cta" : "cta-outline"} style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: "Sarah M.", lost: "32 lbs in 3 months", text: "The process was so easy. I had my medication within a week and the support team has been incredible every step of the way. I finally feel like myself again.", rating: 5 },
    { name: "James R.", lost: "28 lbs in 10 weeks", text: "I was skeptical about online prescriptions, but my doctor was thorough and genuinely cared about my health goals. Best decision I've made in years.", rating: 5 },
    { name: "Maria L.", lost: "45 lbs in 5 months", text: "The needle-free tablets changed everything for me. No injections, just a daily pill. And the price compared to what my insurance wanted? No contest.", rating: 5 },
  ];

  return (
    <section style={{ padding: "120px 32px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="divider" style={{ marginBottom: 20 }} />
          <h2 className="display section-title" style={{ fontSize: 44, color: "var(--dark)", letterSpacing: -1, fontWeight: 700 }}>Real Patients, Real Results</h2>
          <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 17 }}>Individual results may vary. These are self-reported outcomes.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={i} className="lift" style={{ padding: 36, borderRadius: 24, border: "1px solid var(--border)", background: "var(--cream)", position: "relative" }}>
              <div className="display" style={{ position: "absolute", top: 12, left: 24, fontSize: 72, color: "var(--forest)", opacity: 0.06, lineHeight: 1 }}>"</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 16, position: "relative", zIndex: 1 }}>
                {[...Array(r.rating)].map((_, j) => <Ic.Star key={j} />)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text)", marginBottom: 24, position: "relative", zIndex: 1 }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--dark)" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Verified Patient</div>
                </div>
                <span style={{ padding: "6px 14px", borderRadius: 40, background: "var(--sage-light)", color: "var(--forest)", fontSize: 12, fontWeight: 700 }}>
                  {r.lost}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How does compounded semaglutide differ from brand-name Ozempic?", a: "Compounded semaglutide uses the same active ingredient as Ozempic and Wegovy. It's produced by FDA-regulated compounding pharmacies. While the active ingredient is identical, compounded versions are not FDA-approved as finished products. Your physician will discuss the specific risks and benefits." },
    { q: "Do I need insurance?", a: "No. All pricing is transparent and paid out-of-pocket. No prior authorizations, no coverage denials, no surprise bills. Many patients find our pricing significantly lower than brand-name alternatives, even with insurance." },
    { q: "How quickly will I receive my medication?", a: "Most prescriptions are reviewed within 48 hours. Once approved, medication ships priority and typically arrives within 3-5 business days. Total time from assessment to medication in hand: about 5-7 days." },
    { q: "What if I'm not approved for medication?", a: "If our physician determines GLP-1 medication isn't appropriate for your health profile, you won't be charged. Approval is based on meeting specific medical criteria during your evaluation." },
    { q: "Can I cancel anytime?", a: "Yes. No long-term contracts, no commitments. Cancel anytime through your patient portal or by contacting our care team. We also offer a free 30-day pause if you just need a break." },
    { q: "What side effects should I expect?", a: "The most common side effects include mild nausea, decreased appetite, and occasional digestive discomfort. These typically subside within the first 1-2 weeks as your body adjusts. Your care team is available 24/7 to help manage any side effects." },
  ];

  return (
    <section id="faq" style={{ padding: "120px 32px", background: "var(--cream)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="divider" style={{ marginBottom: 20 }} />
          <h2 className="display section-title" style={{ fontSize: 44, color: "var(--dark)", letterSpacing: -1, fontWeight: 700 }}>Common Questions</h2>
        </div>

        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)", padding: "24px 0", cursor: "pointer" }} onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--dark)", lineHeight: 1.4 }}>{faq.q}</h3>
              <span style={{ fontSize: 24, color: "var(--forest)", flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </div>
            <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", paddingTop: 16 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="start" style={{ padding: "120px 32px", background: "var(--forest)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 className="display" style={{ fontSize: 48, color: "var(--white)", letterSpacing: -1, lineHeight: 1.1, marginBottom: 16, fontWeight: 700 }}>
          Ready to start your<br/>weight loss journey?
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Join over 100,000 patients who trust TrimDoctor for physician-guided GLP-1 weight loss therapy.
        </p>
        <a href="#" className="cta" style={{ background: "var(--white)", color: "var(--forest)", fontSize: 18, padding: "20px 48px" }}>
          Start Your Free Assessment
        </a>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 40 }}>
          {["No credit card required", "5-minute assessment", "48-hour physician review"].map((t, i) => (
            <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "60px 32px", background: "var(--dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="#1B4332"/>
              <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity="0.9"/>
              <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520"/>
            </svg>
            <span className="display" style={{ fontSize: 18, color: "var(--white)" }}>TrimDoctor</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            {["Privacy Policy", "Terms of Service", "HIPAA Notice", "Refund Policy", "Contact"].map((link, i) => (
              <a key={i} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}>{link}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
          <p style={{ fontSize: 11, lineHeight: 1.9, color: "rgba(255,255,255,0.2)", maxWidth: 900 }}>
            TrimDoctor, LLC provides the digital platform, patient intake, and administrative coordination. Medical evaluations and prescribing decisions are conducted by independently licensed healthcare providers through our partner network. TrimDoctor does not provide medical care and is not licensed to practice medicine. Compounded medications are produced in FDA-regulated facilities but are not FDA-approved as finished products. Individual results may vary. This website does not provide medical advice.
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 12 }}>© 2026 TrimDoctor, LLC · All rights reserved · trimdoctor.com</p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  return (
    <div>
      <style>{css}</style>
      <Nav />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
