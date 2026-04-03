import { useState } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", cream: "#FBF8F3", warm: "#F5F0E8", dark: "#1A1A1A", text: "#3D3D3D", muted: "#8A8A8A", border: "#E8E2D6", white: "#FFFFFF" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Figtree',sans-serif;background:${B.cream};color:${B.text};-webkit-font-smoothing:antialiased}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}

.cta{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:${B.forest};color:#fff;border:none;border-radius:50px;font-family:Figtree;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s;text-decoration:none}
.cta:hover{background:${B.forestL};transform:translateY(-2px);box-shadow:0 10px 30px rgba(27,67,50,.2)}
.cta2{display:inline-flex;align-items:center;gap:6px;padding:12px 26px;background:transparent;color:${B.forest};border:2px solid ${B.forest};border-radius:50px;font-family:Figtree;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s}
.cta2:hover{background:${B.forest};color:#fff}

.pc{background:${B.white};border-radius:22px;border:1px solid ${B.border};overflow:hidden;transition:all .4s cubic-bezier(.4,0,.2,1)}
.pc:hover{transform:translateY(-6px);box-shadow:0 18px 48px rgba(0,0,0,.06)}

.tag{display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700}
.pill-i{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}

.bb{background:${B.white};border:2px solid ${B.border};border-radius:18px;padding:22px;cursor:pointer;transition:all .3s}
.bb:hover{border-color:${B.forestM}}.bb.on{border-color:${B.forest};background:${B.sageL};box-shadow:0 0 0 4px rgba(27,67,50,.08)}

.tab{padding:10px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;border:none;background:transparent;color:${B.muted};font-family:Figtree}
.tab.on{background:${B.forest};color:#fff}

@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fu .6s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.06s;opacity:0}.d2{animation-delay:.12s;opacity:0}.d3{animation-delay:.18s;opacity:0}

@media(max-width:768px){.g4{grid-template-columns:1fr 1fr!important}.g3{grid-template-columns:1fr!important}.htl{font-size:36px!important}}
`;

const PRODUCTS = [
  {
    id: "protein", name: "TrimProtein+", tagline: "Lean Muscle Preservation Complex",
    category: "muscle", emoji: "💪", color: "#2563EB",
    price: 49, subPrice: 39, servings: 30, form: "Powder (Chocolate & Vanilla)",
    why: "GLP-1 patients lose up to 40% muscle alongside fat. Protein is the #1 recommended supplement by every clinical guideline for GLP-1 therapy.",
    keyIngredients: [
      { name: "Whey Protein Isolate", dose: "25g per serving", purpose: "Highest bioavailability protein for muscle synthesis" },
      { name: "HMB (β-Hydroxy β-Methylbutyrate)", dose: "1.5g", purpose: "Clinically shown to reduce muscle breakdown during caloric deficit" },
      { name: "Creatine Monohydrate", dose: "3g", purpose: "Supports muscle strength and lean mass preservation" },
      { name: "Leucine (added)", dose: "2.5g total", purpose: "Primary amino acid triggering muscle protein synthesis" },
      { name: "Digestive Enzymes", dose: "Blend", purpose: "Enhanced absorption for GLP-1 patients with slowed digestion" },
    ],
    highlights: ["30g total protein per serving", "Only 150 calories — designed for reduced appetite", "No bloating formula with digestive enzymes", "Mixes smooth even with cold water"],
    best: true,
  },
  {
    id: "multi", name: "TrimComplete", tagline: "GLP-1 Optimized Daily Multivitamin",
    category: "foundation", emoji: "🛡️", color: "#059669",
    price: 34, subPrice: 27, servings: 30, form: "Capsules (2 per day)",
    why: "GLP-1 medications reduce caloric intake by 16-39%, creating significant nutrient gaps. A targeted multivitamin prevents deficiencies that cause fatigue, hair loss, and weakened immunity.",
    keyIngredients: [
      { name: "Vitamin D3", dose: "5,000 IU", purpose: "Most common GLP-1 deficiency — supports bone health and immunity" },
      { name: "Vitamin B12 (Methylcobalamin)", dose: "1,000 mcg", purpose: "GLP-1 slows digestion and reduces B12-rich food intake" },
      { name: "Iron (Ferrous Bisglycinate)", dose: "18mg", purpose: "Gentle chelated form — prevents anemia with reduced meat intake" },
      { name: "Magnesium Glycinate", dose: "400mg", purpose: "Supports muscle function, sleep, and 300+ enzymatic processes" },
      { name: "Calcium (TruCal®)", dose: "600mg", purpose: "Bone density protection during rapid weight loss" },
      { name: "Zinc + Selenium", dose: "15mg / 55mcg", purpose: "Immune support and thyroid function" },
      { name: "Biotin", dose: "5,000 mcg", purpose: "Hair and nail health — counteracts hair loss from caloric deficit" },
    ],
    highlights: ["Clinical doses, not fairy-dusted RDA minimums", "Chelated minerals for 3x better absorption", "Includes biotin for GLP-1 related hair thinning", "2-capsule dose — easy on low appetite"],
  },
  {
    id: "collagen", name: "TrimGlow", tagline: "Skin Elasticity & Recovery Peptides",
    category: "beauty", emoji: "✨", color: "#EC4899",
    price: 39, subPrice: 31, servings: 30, form: "Powder (Unflavored, mixable)",
    why: "Rapid weight loss causes loose skin. Collagen peptides support skin elasticity, and hyaluronic acid helps skin retain moisture and firmness during body recomposition.",
    keyIngredients: [
      { name: "Hydrolyzed Collagen Peptides (Types I & III)", dose: "10g", purpose: "Supports skin elasticity, hair strength, and joint health" },
      { name: "Hyaluronic Acid", dose: "120mg", purpose: "Skin hydration and plumpness from within" },
      { name: "Vitamin C (from Acerola)", dose: "250mg", purpose: "Essential cofactor for collagen synthesis" },
      { name: "Biotin", dose: "2,500 mcg", purpose: "Additional hair and nail support" },
      { name: "Silica (from Bamboo Extract)", dose: "40mg", purpose: "Structural support for connective tissue" },
    ],
    highlights: ["Unflavored — mixes into coffee, smoothies, or water", "Grass-fed, pasture-raised bovine collagen", "Visible skin improvement in 4-6 weeks", "Supports hair regrowth during GLP-1 therapy"],
  },
  {
    id: "probiotic", name: "TrimBiome", tagline: "GI Support & Gut Microbiome Formula",
    category: "gut", emoji: "🦠", color: "#8B5CF6",
    price: 36, subPrice: 29, servings: 30, form: "Delayed-release capsules",
    why: "70%+ of GLP-1 patients report GI side effects (nausea, constipation, bloating). A targeted probiotic restores gut balance disrupted by slowed gastric emptying.",
    keyIngredients: [
      { name: "Lactobacillus Rhamnosus GG", dose: "10B CFU", purpose: "Most studied probiotic strain — reduces nausea and bloating" },
      { name: "Bifidobacterium Lactis", dose: "10B CFU", purpose: "Supports regularity and reduces constipation" },
      { name: "Akkermansia Muciniphila", dose: "1B CFU", purpose: "Emerging evidence for metabolic health and gut barrier function" },
      { name: "Ginger Root Extract", dose: "250mg", purpose: "Clinically shown to reduce GLP-1-induced nausea" },
      { name: "Prebiotic Fiber (FOS)", dose: "2g", purpose: "Feeds beneficial bacteria — synbiotic effect" },
    ],
    highlights: ["Delayed-release capsule survives stomach acid", "Includes ginger for anti-nausea support", "30 billion total CFU — clinically relevant dose", "Shelf-stable — no refrigeration needed"],
  },
  {
    id: "fiber", name: "TrimFiber", tagline: "Digestive Regularity & Satiety Blend",
    category: "gut", emoji: "🌿", color: "#16A34A",
    price: 29, subPrice: 23, servings: 30, form: "Powder (Berry flavor)",
    why: "Reduced food intake means reduced fiber intake. Low fiber causes constipation — one of the most common GLP-1 complaints. Fiber also enhances satiety and supports blood sugar regulation.",
    keyIngredients: [
      { name: "Psyllium Husk", dose: "5g", purpose: "Soluble fiber — promotes regularity and feeds gut bacteria" },
      { name: "Acacia Fiber", dose: "3g", purpose: "Gentle prebiotic fiber — less bloating than inulin" },
      { name: "Flaxseed Powder", dose: "2g", purpose: "Omega-3 ALA + additional fiber" },
      { name: "L-Glutamine", dose: "500mg", purpose: "Supports intestinal lining integrity" },
    ],
    highlights: ["10g total fiber per serving", "Gentle formula — no cramping or excessive gas", "Mixes clear — add to any beverage", "Supports healthy blood sugar levels"],
  },
  {
    id: "electrolytes", name: "TrimHydrate", tagline: "Clinical Electrolyte & Hydration Formula",
    category: "foundation", emoji: "💧", color: "#06B6D4",
    price: 24, subPrice: 19, servings: 30, form: "Stick packs (Lemon-Lime & Mixed Berry)",
    why: "Reduced food and fluid intake on GLP-1s leads to dehydration, headaches, fatigue, and muscle cramps. Most patients don't drink enough water, and when they do, it lacks electrolytes.",
    keyIngredients: [
      { name: "Sodium (Pink Himalayan Salt)", dose: "1,000mg", purpose: "Primary electrolyte — prevents headaches and dizziness" },
      { name: "Potassium Citrate", dose: "200mg", purpose: "Muscle function and heart health" },
      { name: "Magnesium Glycinate", dose: "150mg", purpose: "Muscle cramp prevention and relaxation" },
      { name: "Calcium", dose: "100mg", purpose: "Bone and nerve support" },
      { name: "B-Vitamin Complex", dose: "Blend", purpose: "Energy support during caloric deficit" },
    ],
    highlights: ["Zero sugar — stevia sweetened", "Convenient stick packs — take anywhere", "1,000mg sodium — clinical dose, not marketing dose", "Tastes like a premium sports drink"],
  },
  {
    id: "omega", name: "TrimOmega", tagline: "Ultra-Pure Omega-3 Fish Oil",
    category: "foundation", emoji: "🐟", color: "#F59E0B",
    price: 32, subPrice: 26, servings: 60, form: "Softgels (2 per day)",
    why: "Omega-3s reduce inflammation, support heart health, and may enhance GLP-1 efficacy. Most GLP-1 patients eat less fish, making supplementation critical.",
    keyIngredients: [
      { name: "EPA (Eicosapentaenoic Acid)", dose: "1,200mg", purpose: "Anti-inflammatory — supports heart and metabolic health" },
      { name: "DHA (Docosahexaenoic Acid)", dose: "600mg", purpose: "Brain health and cognitive function" },
      { name: "Vitamin E (as d-alpha tocopherol)", dose: "10 IU", purpose: "Antioxidant — prevents fish oil oxidation" },
    ],
    highlights: ["1,800mg total EPA+DHA — therapeutic dose", "IFOS 5-star certified for purity", "Enteric-coated — no fish burps", "Molecularly distilled — heavy metal free"],
  },
  {
    id: "sleep", name: "TrimRest", tagline: "Deep Sleep & Recovery Formula",
    category: "recovery", emoji: "🌙", color: "#6366F1",
    price: 29, subPrice: 23, servings: 30, form: "Capsules (2 before bed)",
    why: "Poor sleep sabotages weight loss and increases hunger hormones. GLP-1 patients who sleep well lose more fat and preserve more muscle. Magnesium glycinate + L-theanine promote deep restorative sleep without grogginess.",
    keyIngredients: [
      { name: "Magnesium Glycinate", dose: "300mg", purpose: "Calming — promotes muscle relaxation and deep sleep" },
      { name: "L-Theanine", dose: "200mg", purpose: "Reduces anxiety and promotes alpha brain waves" },
      { name: "Apigenin (from Chamomile)", dose: "50mg", purpose: "Natural sleep-onset support without dependency" },
      { name: "Glycine", dose: "3g", purpose: "Improves sleep quality and next-day cognitive function" },
      { name: "Tart Cherry Extract", dose: "500mg", purpose: "Natural melatonin source + anti-inflammatory" },
    ],
    highlights: ["Non-habit forming — no synthetic melatonin", "Wake up refreshed, not groggy", "Supports overnight muscle recovery", "Pairs perfectly with evening GLP-1 injection routine"],
  },
];

const BUNDLES = [
  { id: "essential", name: "The Essentials", desc: "Foundation stack for every GLP-1 patient", products: ["multi", "protein", "electrolytes"], price: 107, subPrice: 69, save: "36%", popular: false },
  { id: "complete", name: "The Complete Stack", desc: "Everything your body needs on GLP-1 therapy", products: ["multi", "protein", "collagen", "probiotic", "electrolytes", "omega"], price: 214, subPrice: 129, save: "40%", popular: true },
  { id: "glow", name: "Glow & Restore", desc: "Skin, hair, and beauty support during weight loss", products: ["collagen", "multi", "omega"], price: 105, subPrice: 69, save: "34%", popular: false },
  { id: "gut", name: "Gut Reset", desc: "Digestive comfort for GLP-1 side effects", products: ["probiotic", "fiber", "electrolytes"], price: 89, subPrice: 59, save: "34%", popular: false },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
      <span className="pf" style={{ fontSize: 20, fontWeight: 700, color: B.dark, letterSpacing: -.5 }}>TrimDoctor</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: B.forestM, background: B.sageL, padding: "2px 8px", borderRadius: 5 }}>SUPPLEMENTS</span>
    </div>
  );
}

function ProductCard({ p, onClick }) {
  return (
    <div className="pc" onClick={() => onClick(p.id)} style={{ cursor: "pointer" }}>
      <div style={{ height: 180, background: `linear-gradient(135deg, ${p.color}12, ${p.color}06)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
        <div style={{ fontSize: 56, marginBottom: 6 }}>{p.emoji}</div>
        {p.best && <div className="tag" style={{ position: "absolute", top: 12, right: 12, background: B.forest, color: "#fff" }}>BESTSELLER</div>}
        <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{p.category}</div>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: B.dark, marginBottom: 2 }}>{p.name}</h3>
        <p style={{ fontSize: 13, color: B.muted, marginBottom: 12 }}>{p.tagline}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <span className="mn" style={{ fontSize: 24, fontWeight: 700, color: B.forest }}>${p.subPrice}</span>
          <span className="mn" style={{ fontSize: 14, color: B.muted, textDecoration: "line-through" }}>${p.price}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: B.forest, background: B.sageL, padding: "2px 8px", borderRadius: 4 }}>SUBSCRIBE</span>
        </div>
        <div style={{ fontSize: 12, color: B.muted }}>{p.servings} servings · {p.form}</div>
      </div>
    </div>
  );
}

function ProductDetail({ p, onBack }) {
  const [tab, setTab] = useState("formula");
  return (
    <div className="au" style={{ maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: B.forest, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Figtree", marginBottom: 20 }}>← Back to All Products</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="g3">
        <div>
          <div style={{ height: 320, background: `linear-gradient(135deg, ${p.color}15, ${p.color}06)`, borderRadius: 22, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", border: `1px solid ${B.border}` }}>
            <div style={{ fontSize: 90, marginBottom: 8 }}>{p.emoji}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{p.category}</div>
            {p.best && <div className="tag" style={{ position: "absolute", top: 14, right: 14, background: B.forest, color: "#fff" }}>BESTSELLER</div>}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>TrimDoctor Supplements</div>
          <h1 className="pf" style={{ fontSize: 36, color: B.dark, letterSpacing: -1, marginBottom: 4 }}>{p.name}</h1>
          <p style={{ fontSize: 16, color: B.muted, marginBottom: 16 }}>{p.tagline}</p>
          <div style={{ padding: 16, borderRadius: 14, background: B.sageL, border: `1px solid rgba(27,67,50,.1)`, marginBottom: 16, fontSize: 13, color: B.forest, lineHeight: 1.7 }}>
            <strong>Why GLP-1 patients need this:</strong> {p.why}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span className="mn" style={{ fontSize: 36, fontWeight: 700, color: B.forest }}>${p.subPrice}</span>
            <span className="mn" style={{ fontSize: 16, color: B.muted, textDecoration: "line-through" }}>${p.price}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: B.forest }}>Subscribe & save {Math.round((1 - p.subPrice / p.price) * 100)}%</span>
          </div>
          <div style={{ fontSize: 13, color: B.muted, marginBottom: 20 }}>{p.servings} servings · {p.form} · Ships free monthly</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="cta" style={{ flex: 1, justifyContent: "center" }}>Subscribe — ${p.subPrice}/mo</button>
            <button className="cta2">One-time ${p.price}</button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 32, marginBottom: 16 }}>
        {[["formula", "Formula"], ["highlights", "Highlights"]].map(([id, l]) => (
          <button key={id} className={`tab ${tab === id ? "on" : ""}`} onClick={() => setTab(id)}>{l}</button>
        ))}
      </div>

      {tab === "formula" && (
        <div style={{ background: B.white, borderRadius: 18, border: `1px solid ${B.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2.5fr", padding: "12px 20px", background: B.warm, fontSize: 10, fontWeight: 700, color: B.muted, letterSpacing: 1, textTransform: "uppercase" }}>
            <div>Ingredient</div><div>Dose</div><div>Purpose</div>
          </div>
          {p.keyIngredients.map((ing, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2.5fr", padding: "14px 20px", borderBottom: i < p.keyIngredients.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: B.dark }}>{ing.name}</div>
              <div className="mn" style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>{ing.dose}</div>
              <div style={{ fontSize: 13, color: B.muted, lineHeight: 1.5 }}>{ing.purpose}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "highlights" && (
        <div style={{ background: B.white, borderRadius: 18, border: `1px solid ${B.border}`, padding: 24 }}>
          {p.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < p.highlights.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ color: B.forestM }}>✓</span>
              <span style={{ fontSize: 15, color: B.text }}>{h}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BundleCard({ b, onClick }) {
  const prods = PRODUCTS.filter(p => b.products.includes(p.id));
  return (
    <div className={`bb ${b.popular ? "on" : ""}`} onClick={onClick} style={{ position: "relative" }}>
      {b.popular && <div className="tag" style={{ position: "absolute", top: -10, left: 16, background: B.forest, color: "#fff" }}>MOST POPULAR</div>}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {prods.map((p, i) => <span key={i} style={{ fontSize: 22 }}>{p.emoji}</span>)}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: B.dark, marginBottom: 2 }}>{b.name}</h3>
      <p style={{ fontSize: 13, color: B.muted, marginBottom: 12 }}>{b.desc}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {prods.map((p, i) => <span key={i} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 5, background: `${p.color}10`, color: p.color, fontWeight: 600 }}>{p.name}</span>)}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="mn" style={{ fontSize: 28, fontWeight: 700, color: B.forest }}>${b.subPrice}</span>
        <span className="mn" style={{ fontSize: 14, color: B.muted, textDecoration: "line-through" }}>${b.price}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: B.forest, background: B.sageL, padding: "2px 8px", borderRadius: 5 }}>SAVE {b.save}</span>
      </div>
      <div style={{ fontSize: 12, color: B.muted, marginTop: 4 }}>/month · Free shipping · Cancel anytime</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

export default function App() {
  const [view, setView] = useState("store"); // store | detail
  const [detailId, setDetailId] = useState(null);
  const [section, setSection] = useState("all"); // all | muscle | foundation | gut | beauty | recovery
  const openDetail = (id) => { setDetailId(id); setView("detail"); window.scrollTo(0, 0); };
  const product = PRODUCTS.find(p => p.id === detailId);

  const cats = ["all", "foundation", "muscle", "gut", "beauty", "recovery"];
  const filtered = section === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === section);

  if (view === "detail" && product) {
    return (
      <div style={{ minHeight: "100vh", padding: "28px 32px" }}>
        <style>{css}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}><Logo /></div>
          <ProductDetail p={product} onBack={() => setView("store")} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{css}</style>

      {/* Header */}
      <div style={{ padding: "28px 32px", borderBottom: `1px solid ${B.border}`, background: B.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Logo />
          <button className="cta" style={{ padding: "10px 24px", fontSize: 13 }}>View Cart (0)</button>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: "80px 32px 60px", background: `linear-gradient(168deg,${B.cream} 0%,${B.warm} 40%,${B.sageL} 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -140, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(27,67,50,.04) 0%, transparent 70%)` }} />
        <div className="au" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 30, background: `rgba(27,67,50,.05)`, border: `1px solid rgba(27,67,50,.1)`, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: B.forestM }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: B.forest, letterSpacing: 1.2, textTransform: "uppercase" }}>Clinically Dosed · GLP-1 Optimized</span>
        </div>
        <h1 className="pf au d1 htl" style={{ fontSize: 52, color: B.dark, letterSpacing: -2, lineHeight: 1.08, maxWidth: 700, margin: "0 auto 16px" }}>
          Supplements designed for your GLP-1 journey
        </h1>
        <p className="au d2" style={{ fontSize: 17, color: B.muted, maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.65 }}>
          Clinical doses. No fillers. Formulated specifically to address the nutritional gaps, muscle loss, and side effects that come with GLP-1 medication.
        </p>
        <div className="au d3" style={{ display: "flex", justifyContent: "center", gap: 28 }}>
          {[{ v: "8", l: "Products" }, { v: "4", l: "Curated Bundles" }, { v: "100%", l: "Transparent Labels" }].map((s, i) => (
            <div key={i}><span className="pf" style={{ fontSize: 28, color: B.forest, fontWeight: 700 }}>{s.v}</span><div style={{ fontSize: 12, color: B.muted }}>{s.l}</div></div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Bundles */}
        <section style={{ paddingTop: 60, paddingBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 48, height: 1, background: B.gold, margin: "0 auto 14px" }} />
            <h2 className="pf" style={{ fontSize: 36, color: B.dark, letterSpacing: -1 }}>Curated Bundles</h2>
            <p style={{ color: B.muted, marginTop: 8, fontSize: 15 }}>Save up to 40% with a monthly subscription bundle</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="g4">
            {BUNDLES.map(b => <BundleCard key={b.id} b={b} onClick={() => {}} />)}
          </div>
        </section>

        {/* Products */}
        <section style={{ paddingTop: 20, paddingBottom: 60 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 48, height: 1, background: B.gold, margin: "0 auto 14px" }} />
            <h2 className="pf" style={{ fontSize: 36, color: B.dark, letterSpacing: -1 }}>Shop All Products</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 28, flexWrap: "wrap" }}>
            {cats.map(c => <button key={c} className={`tab ${section === c ? "on" : ""}`} onClick={() => setSection(c)}>{c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}</button>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="g4">
            {filtered.map(p => <ProductCard key={p.id} p={p} onClick={openDetail} />)}
          </div>
        </section>

        {/* Trust */}
        <section style={{ padding: "40px 0 60px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {["🔬 Clinically Dosed", "🏭 GMP Certified", "🧪 Third-Party Tested", "🌿 No Proprietary Blends", "🇺🇸 Made in USA", "📦 Free Shipping"].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: B.muted, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ padding: "40px 32px", background: B.dark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/></svg>
            <span className="pf" style={{ fontSize: 16, color: "#fff" }}>TrimDoctor</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Supplements</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.2)", maxWidth: 600, lineHeight: 1.7 }}>
            *These statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement regimen.
          </div>
        </div>
      </footer>
    </div>
  );
}
