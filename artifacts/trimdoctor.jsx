import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// TRIMDOCTOR — Complete Product Experience
// ═══════════════════════════════════════════════════════════

const B = {
  forest: "#1B4332", forestL: "#2D6A4F", forestM: "#40916C",
  sage: "#95D5B2", sageL: "#D8F3DC",
  cream: "#FBF8F3", warm: "#F5F0E8", warmD: "#EDE6D9",
  gold: "#B8860B", goldL: "#DAA520",
  dark: "#1A1A1A", text: "#3D3D3D", muted: "#8A8A8A", border: "#E8E2D6",
  white: "#FFFFFF", error: "#C0392B",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Figtree',sans-serif;background:${B.cream};color:${B.text};-webkit-font-smoothing:antialiased;overflow-x:hidden}
.pf{font-family:'Playfair Display',Georgia,serif}
.mn{font-family:'JetBrains Mono',monospace}

/* grain */
.grain::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}

@keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes el{from{width:0}to{width:48px}}
@keyframes gp{0%,100%{opacity:1}50%{opacity:.4}}

.au{opacity:0;animation:fu .7s cubic-bezier(.16,1,.3,1) forwards}
.ad1{animation-delay:.06s}.ad2{animation-delay:.12s}.ad3{animation-delay:.18s}.ad4{animation-delay:.24s}.ad5{animation-delay:.3s}
.shm{background:linear-gradient(90deg,${B.forest} 0%,${B.goldL} 50%,${B.forest} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:sh 4s linear infinite}

.btn{display:inline-flex;align-items:center;gap:10px;padding:17px 40px;background:${B.forest};color:#fff;border:none;border-radius:56px;font-family:Figtree,sans-serif;font-size:16px;font-weight:700;cursor:pointer;position:relative;overflow:hidden;transition:all .3s cubic-bezier(.4,0,.2,1);text-decoration:none;letter-spacing:.2px}
.btn::after{content:'→';font-size:17px;transition:transform .3s}
.btn:hover{background:${B.forestL};transform:translateY(-2px);box-shadow:0 14px 40px rgba(27,67,50,.28)}
.btn:hover::after{transform:translateX(4px)}
.btn2{display:inline-flex;align-items:center;gap:8px;padding:15px 34px;background:transparent;color:${B.forest};border:2px solid ${B.forest};border-radius:56px;font-family:Figtree,sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s;text-decoration:none}
.btn2:hover{background:${B.forest};color:#fff}

.glass{background:rgba(255,255,255,.82);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.4)}
.lft{transition:all .4s cubic-bezier(.4,0,.2,1)}
.lft:hover{transform:translateY(-7px);box-shadow:0 20px 56px rgba(0,0,0,.06)}

.inp{width:100%;padding:15px 18px;border:2px solid ${B.border};border-radius:14px;font-family:Figtree,sans-serif;font-size:15px;background:${B.white};outline:none;transition:all .25s;color:${B.dark}}
.inp:focus{border-color:${B.forest};box-shadow:0 0 0 4px rgba(27,67,50,.07)}
.inp::placeholder{color:${B.muted}}

.rc{padding:18px;border:2px solid ${B.border};border-radius:16px;cursor:pointer;transition:all .25s;background:${B.white}}
.rc:hover{border-color:${B.forestM};background:${B.sageL}}
.rc.on{border-color:${B.forest};background:${B.sageL};box-shadow:0 0 0 4px rgba(27,67,50,.08)}

.dv{width:48px;height:1px;background:${B.gold};margin:0 auto;animation:el 1s ease forwards}

.pbar{height:3px;background:${B.border};border-radius:3px;overflow:hidden}
.pfill{height:100%;background:linear-gradient(90deg,${B.forest},${B.goldL});border-radius:3px;transition:width .5s cubic-bezier(.4,0,.2,1)}

@media(max-width:768px){.htl{font-size:38px!important}.stl{font-size:32px!important}.hm{display:none!important}.g4{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr!important}.g2{grid-template-columns:1fr!important}}
`;

// ─── LOGO ─────────────────────────────────────────────────
function Logo({ size = 34, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={dark ? B.white : B.forest}/>
        <path d="M10 10h4v16h10v4H10V10z" fill={dark ? B.forest : "white"} fillOpacity=".92"/>
        <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.goldL}/>
      </svg>
      <span className="pf" style={{ fontSize: size * 0.58, fontWeight: 700, color: dark ? B.white : B.dark, letterSpacing: -.5 }}>TrimDoctor</span>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────
const I={
  shield:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeWidth="2"/></svg>,
  truck:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  chat:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  check:()=><svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.667 5L7.5 14.167 3.333 10"/></svg>,
  star:()=><svg width="14" height="14" viewBox="0 0 16 16" fill={B.goldL}><path d="M8 0l2.47 4.94L16 5.73l-4 3.85.94 5.42L8 12.34 3.06 15l.94-5.42-4-3.85 5.53-.79z"/></svg>,
};

// ═══════════════════════════════════════════════════════════
// LANDING PAGE SECTIONS
// ═══════════════════════════════════════════════════════════

function NavBar({go}){
  const[s,setS]=useState(false);
  useEffect(()=>{const h=()=>setS(window.scrollY>30);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1e3,padding:"0 28px",background:s?"rgba(251,248,243,.92)":"transparent",backdropFilter:s?"blur(20px) saturate(180%)":"none",borderBottom:s?`1px solid ${B.border}`:"1px solid transparent",transition:"all .4s"}}>
      <div style={{maxWidth:1180,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:74}}>
        <div style={{cursor:"pointer"}} onClick={()=>go("home")}><Logo size={32}/></div>
        <div style={{display:"flex",alignItems:"center",gap:32}}>
          <span className="hm" style={{color:B.muted,fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={()=>document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>How It Works</span>
          <span className="hm" style={{color:B.muted,fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={()=>document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})}>Pricing</span>
          <span className="hm" style={{color:B.muted,fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={()=>document.getElementById("faq")?.scrollIntoView({behavior:"smooth"})}>FAQ</span>
          <button className="btn" onClick={()=>go("intake")} style={{padding:"11px 26px",fontSize:14}}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({go}){
  return(
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",background:`linear-gradient(168deg,${B.cream} 0%,${B.warm} 45%,${B.sageL} 100%)`,position:"relative",overflow:"hidden",padding:"0 28px"}}>
      <div style={{position:"absolute",top:-180,right:-140,width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,rgba(27,67,50,.04) 0%,transparent 70%)`}}/>
      <div style={{position:"absolute",bottom:-100,left:-80,width:420,height:420,borderRadius:"50%",background:`radial-gradient(circle,rgba(184,134,11,.04) 0%,transparent 70%)`}}/>
      <div style={{maxWidth:1180,margin:"0 auto",paddingTop:110,position:"relative",zIndex:1,width:"100%"}}>
        <div style={{maxWidth:660}}>
          <div className="au" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 16px",borderRadius:40,background:`rgba(27,67,50,.05)`,border:`1px solid rgba(27,67,50,.1)`,marginBottom:26}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:B.forestM}}/>
            <span style={{fontSize:11.5,fontWeight:700,color:B.forest,letterSpacing:1.5,textTransform:"uppercase"}}>Now Accepting New Patients</span>
          </div>
          <h1 className="pf au ad1 htl" style={{fontSize:60,lineHeight:1.06,color:B.dark,letterSpacing:-2.5,marginBottom:22,fontWeight:700}}>
            Doctor-guided<br/>weight loss,<br/><span className="shm">delivered.</span>
          </h1>
          <p className="au ad2" style={{fontSize:18.5,lineHeight:1.75,color:B.muted,maxWidth:470,marginBottom:36}}>
            Compounded GLP-1 medication prescribed by board-certified physicians. Shipped to your door. No insurance needed. Starting at <strong style={{color:B.dark,fontWeight:700}}>$179/month</strong>.
          </p>
          <div className="au ad3" style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}}>
            <button className="btn" onClick={()=>go("intake")} style={{fontSize:16.5,padding:"19px 42px"}}>Start Your Free Assessment</button>
            <button className="btn2" onClick={()=>document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>See How It Works</button>
          </div>
          <div className="au ad4" style={{display:"flex",gap:26,flexWrap:"wrap"}}>
            {[{i:<I.shield/>,t:"Board-certified physicians"},{i:<I.truck/>,t:"Free discreet shipping"},{i:<I.chat/>,t:"24/7 care team access"}].map((x,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:7,color:B.muted,fontSize:13,fontWeight:500}}>
                <span style={{color:B.forestM}}>{x.i}</span>{x.t}
              </div>
            ))}
          </div>
        </div>
        <div className="au ad5" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:28,marginTop:72,paddingTop:36,borderTop:`1px solid ${B.border}`}} className="au ad5 g4">
          {[{v:"100,000+",l:"Patients treated"},{v:"25 lbs",l:"Avg. lost in 3 months"},{v:"4.8★",l:"Patient satisfaction"},{v:"48 hrs",l:"Prescription turnaround"}].map((s,i)=>(
            <div key={i}>
              <div className="pf" style={{fontSize:34,color:B.forest,fontWeight:700,letterSpacing:-1}}>{s.v}</div>
              <div style={{fontSize:13,color:B.muted,marginTop:2,fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks(){
  const steps=[
    {n:"01",t:"Complete Your Assessment",d:"Answer a few health questions online. Takes about 5 minutes — no appointment needed.",e:"📋"},
    {n:"02",t:"Physician Review",d:"A board-certified doctor reviews your profile within 48 hours and creates your personalized treatment plan.",e:"👩‍⚕️"},
    {n:"03",t:"Medication Delivered",d:"Your compounded GLP-1 is prepared by an FDA-regulated pharmacy and shipped free to your door.",e:"📦"},
    {n:"04",t:"Ongoing Support",d:"Unlimited messaging with your care team. Monthly check-ins. Dosage adjustments as needed.",e:"💚"},
  ];
  return(
    <section id="how" style={{padding:"110px 28px",background:B.white}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}><div className="dv" style={{marginBottom:18}}/><h2 className="pf stl" style={{fontSize:42,color:B.dark,letterSpacing:-1,fontWeight:700}}>How TrimDoctor Works</h2><p style={{color:B.muted,marginTop:10,fontSize:16.5}}>From assessment to your doorstep in as little as 5 days.</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="g4">
          {steps.map((s,i)=>(
            <div key={i} className="lft" style={{padding:"32px 26px",borderRadius:22,background:B.cream,border:`1px solid ${B.border}`}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
                <span style={{fontSize:12,fontWeight:800,color:B.gold,letterSpacing:2}}>{s.n}</span>
                <span style={{fontSize:26}}>{s.e}</span>
              </div>
              <h3 style={{fontSize:18,fontWeight:700,color:B.dark,marginBottom:8,lineHeight:1.3}}>{s.t}</h3>
              <p style={{fontSize:14,lineHeight:1.75,color:B.muted}}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({go}){
  const plans=[
    {name:"Semaglutide Tablets",sub:"Needle-Free",f:149,o:249,feats:["Oral semaglutide tablets","Easy daily dosing","Physician consultation","24/7 care messaging","Free shipping"],top:false},
    {name:"Semaglutide Injection",sub:"Most Popular",f:179,o:299,feats:["Compounded semaglutide vial","Syringes & supplies included","Physician consultation","24/7 care messaging","Free priority shipping","Monthly dose optimization"],top:true},
    {name:"Tirzepatide Injection",sub:"Maximum Results",f:249,o:399,feats:["Dual-action GLP-1/GIP","Compounded tirzepatide vial","Physician consultation","24/7 care messaging","Free priority shipping","Enhanced weight loss"],top:false},
  ];
  return(
    <section id="pricing" style={{padding:"110px 28px",background:B.cream}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}><div className="dv" style={{marginBottom:18}}/><h2 className="pf stl" style={{fontSize:42,color:B.dark,letterSpacing:-1,fontWeight:700}}>Transparent Pricing</h2><p style={{color:B.muted,marginTop:10,fontSize:16.5}}>No hidden fees. No insurance required. Cancel anytime.</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}} className="g3">
          {plans.map((p,i)=>(
            <div key={i} style={p.top?{padding:2,borderRadius:26,background:`linear-gradient(135deg,${B.forest},${B.goldL},${B.forest})`}:{}}>
              <div className="lft" style={{padding:"36px 28px",borderRadius:24,background:B.white,border:p.top?"none":`1px solid ${B.border}`,height:"100%",display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:11,fontWeight:800,color:B.gold,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{p.sub}</div>
                <h3 style={{fontSize:19,fontWeight:700,color:B.dark,marginBottom:22}}>{p.name}</h3>
                <div><span style={{fontSize:13,color:B.muted}}>First month</span>
                  <div style={{display:"flex",alignItems:"baseline",gap:2}}><span className="pf" style={{fontSize:50,fontWeight:700,color:B.forest,letterSpacing:-2}}>${p.f}</span><span style={{color:B.muted,fontSize:14}}>/mo</span></div>
                </div>
                <div style={{fontSize:13,color:B.muted,marginBottom:26,paddingBottom:26,borderBottom:`1px solid ${B.border}`}}>Then ${p.o}/month</div>
                <div style={{display:"flex",flexDirection:"column",gap:13,marginBottom:28,flex:1}}>
                  {p.feats.map((f,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:9,fontSize:14,color:B.text}}>
                      <span style={{color:B.forestM,flexShrink:0}}><I.check/></span>{f}
                    </div>
                  ))}
                </div>
                <button className={p.top?"btn":"btn2"} onClick={()=>go("intake")} style={{width:"100%",justifyContent:"center"}}>Get Started</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials(){
  const r=[
    {n:"Sarah M.",l:"32 lbs · 3 months",t:"The process was incredibly easy. I had my medication within a week and the support team has been amazing every step of the way."},
    {n:"James R.",l:"28 lbs · 10 weeks",t:"I was skeptical about online prescriptions, but my doctor was thorough and genuinely cared about my health goals. Best decision I've made."},
    {n:"Maria L.",l:"45 lbs · 5 months",t:"The needle-free tablets changed everything for me. No injections, just a daily pill. And the price compared to brand-name? It's not even close."},
  ];
  return(
    <section style={{padding:"110px 28px",background:B.white}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}><div className="dv" style={{marginBottom:18}}/><h2 className="pf stl" style={{fontSize:42,color:B.dark,letterSpacing:-1,fontWeight:700}}>Real Patients, Real Results</h2><p style={{color:B.muted,marginTop:10,fontSize:16.5}}>Individual results may vary.</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}} className="g3">
          {r.map((v,i)=>(
            <div key={i} className="lft" style={{padding:32,borderRadius:22,border:`1px solid ${B.border}`,background:B.cream,position:"relative"}}>
              <div className="pf" style={{position:"absolute",top:8,left:20,fontSize:68,color:B.forest,opacity:.05,lineHeight:1}}>"</div>
              <div style={{display:"flex",gap:3,marginBottom:14,position:"relative",zIndex:1}}>{[1,2,3,4,5].map(j=><I.star key={j}/>)}</div>
              <p style={{fontSize:15,lineHeight:1.75,color:B.text,marginBottom:22,position:"relative",zIndex:1}}>"{v.t}"</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:700,fontSize:15,color:B.dark}}>{v.n}</div><div style={{fontSize:12,color:B.muted}}>Verified Patient</div></div>
                <span style={{padding:"5px 13px",borderRadius:40,background:B.sageL,color:B.forest,fontSize:12,fontWeight:700}}>{v.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  const[o,setO]=useState(null);
  const qs=[
    {q:"How does compounded semaglutide differ from Ozempic?",a:"Compounded semaglutide uses the same active ingredient. It's produced by FDA-regulated compounding pharmacies but is not FDA-approved as a finished product. Your physician will discuss specific risks and benefits."},
    {q:"Do I need insurance?",a:"No. All pricing is transparent and cash-pay. No prior authorizations, no coverage denials. Many patients find our pricing significantly lower than brand-name alternatives."},
    {q:"How quickly will I receive my medication?",a:"Most prescriptions are reviewed within 48 hours. Medication ships priority and arrives in 3-5 business days. Total: about 5-7 days from assessment to your door."},
    {q:"What if I'm not approved?",a:"If our physician determines GLP-1 medication isn't appropriate for you, you won't be charged. Approval depends on meeting medical criteria."},
    {q:"Can I cancel anytime?",a:"Yes. No contracts. Cancel through your portal or contact us. We also offer a free 30-day pause option."},
    {q:"What side effects should I expect?",a:"Mild nausea, decreased appetite, and occasional digestive discomfort are common. These typically subside within 1-2 weeks. Your care team is available 24/7."},
  ];
  return(
    <section id="faq" style={{padding:"110px 28px",background:B.cream}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}><div className="dv" style={{marginBottom:18}}/><h2 className="pf stl" style={{fontSize:42,color:B.dark,letterSpacing:-1,fontWeight:700}}>Common Questions</h2></div>
        {qs.map((f,i)=>(
          <div key={i} style={{borderBottom:`1px solid ${B.border}`,padding:"22px 0",cursor:"pointer"}} onClick={()=>setO(o===i?null:i)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}}>
              <h3 style={{fontSize:16.5,fontWeight:600,color:B.dark,lineHeight:1.4}}>{f.q}</h3>
              <span style={{fontSize:22,color:B.forest,flexShrink:0,transition:"transform .3s",transform:o===i?"rotate(45deg)":"none"}}>+</span>
            </div>
            <div style={{maxHeight:o===i?200:0,overflow:"hidden",transition:"max-height .4s ease"}}>
              <p style={{fontSize:15,lineHeight:1.75,color:B.muted,paddingTop:14}}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({go}){
  return(
    <section style={{padding:"110px 28px",background:B.forest,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-200,right:-200,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,.04) 0%,transparent 70%)"}}/>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <h2 className="pf" style={{fontSize:46,color:B.white,letterSpacing:-1,lineHeight:1.1,marginBottom:14,fontWeight:700}}>Ready to start your<br/>weight loss journey?</h2>
        <p style={{fontSize:17.5,color:"rgba(255,255,255,.45)",maxWidth:440,margin:"0 auto 36px",lineHeight:1.7}}>Join over 100,000 patients who trust TrimDoctor for physician-guided GLP-1 therapy.</p>
        <button className="btn" onClick={()=>go("intake")} style={{background:B.white,color:B.forest,fontSize:17,padding:"19px 46px"}}>Start Your Free Assessment</button>
        <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:36,flexWrap:"wrap"}}>
          {["No credit card required","5-minute assessment","48-hour physician review"].map((t,i)=>(
            <span key={i} style={{fontSize:12.5,color:"rgba(255,255,255,.32)",fontWeight:500}}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{padding:"52px 28px",background:B.dark}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20,marginBottom:32}}>
          <Logo size={26} dark/>
          <div style={{display:"flex",gap:24,fontSize:13,color:"rgba(255,255,255,.3)"}}>
            {["Privacy","Terms","HIPAA","Refunds","Contact"].map((l,i)=><span key={i} style={{cursor:"pointer"}}>{l}</span>)}
          </div>
        </div>
        <p style={{fontSize:11,lineHeight:1.9,color:"rgba(255,255,255,.18)",maxWidth:880}}>
          TrimDoctor, LLC provides the digital platform, patient intake, and administrative coordination. Medical evaluations and prescribing decisions are conducted by independently licensed healthcare providers. TrimDoctor does not provide medical care and is not licensed to practice medicine. Compounded medications are produced in FDA-regulated facilities but are not FDA-approved. Individual results may vary.
        </p>
        <p style={{fontSize:11,color:"rgba(255,255,255,.12)",marginTop:10}}>© 2026 TrimDoctor, LLC · trimdoctor.com</p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// INTAKE FLOW
// ═══════════════════════════════════════════════════════════
function Intake({go}){
  const[s,setS]=useState(0);
  const[f,setF]=useState({fn:"",ln:"",em:"",ph:"",st:"",dob:"",sex:"",ht:"",wt:"",gw:"",med:"",conds:[],meds:"",prev:""});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const tc=(c)=>setF(p=>({...p,conds:p.conds.includes(c)?p.conds.filter(x=>x!==c):[...p.conds,c]}));
  const bmi=f.wt&&f.ht?(703*Number(f.wt)/(Number(f.ht)**2)).toFixed(1):null;
  const tot=5;const prog=((s+1)/tot)*100;

  const submit=()=>{
    fetch("/api/assessment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)}).catch(()=>{});
    setS(4);
  };

  return(
    <div style={{minHeight:"100vh",background:B.cream,paddingTop:8}}>
      <div style={{maxWidth:580,margin:"0 auto",padding:"0 20px"}}>
        <div style={{marginBottom:24,cursor:"pointer"}} onClick={()=>go("home")}><Logo size={30}/></div>
        <div style={{marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <button onClick={s>0?()=>setS(x=>x-1):()=>go("home")} style={{background:"none",border:"none",color:B.forest,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Figtree"}}>← {s===0?"Back":"Previous"}</button>
            <span style={{fontSize:13,color:B.muted}}>Step {s+1} of {tot}</span>
          </div>
          <div className="pbar"><div className="pfill" style={{width:`${prog}%`}}/></div>
        </div>

        <div style={{background:B.white,borderRadius:24,border:`1px solid ${B.border}`,padding:"36px 32px",boxShadow:"0 4px 20px rgba(0,0,0,.03)"}}>
          {s===0&&(<div>
            <h2 className="pf" style={{fontSize:30,color:B.dark,marginBottom:6}}>Let's get started</h2>
            <p style={{color:B.muted,marginBottom:28,fontSize:15}}>Tell us about yourself.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}} className="g2">
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>First Name</label><input className="inp" value={f.fn} onChange={e=>u("fn",e.target.value)} placeholder="John"/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Last Name</label><input className="inp" value={f.ln} onChange={e=>u("ln",e.target.value)} placeholder="Doe"/></div>
            </div>
            <div style={{marginTop:14}}><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Email</label><input className="inp" type="email" value={f.em} onChange={e=>u("em",e.target.value)} placeholder="john@example.com"/></div>
            <div style={{marginTop:14}}><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Phone</label><input className="inp" type="tel" value={f.ph} onChange={e=>u("ph",e.target.value)} placeholder="(555) 555-5555"/></div>
            <div style={{marginTop:14}}><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>State</label><input className="inp" value={f.st} onChange={e=>u("st",e.target.value)} placeholder="CA" maxLength={2}/></div>
          </div>)}

          {s===1&&(<div>
            <h2 className="pf" style={{fontSize:30,color:B.dark,marginBottom:6}}>Health information</h2>
            <p style={{color:B.muted,marginBottom:28,fontSize:15}}>This helps our physicians evaluate eligibility.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}} className="g2">
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Date of Birth</label><input className="inp" type="date" value={f.dob} onChange={e=>u("dob",e.target.value)}/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Biological Sex</label>
                <div style={{display:"flex",gap:10}}>{["Male","Female"].map(x=><div key={x} className={`rc ${f.sex===x?"on":""}`} onClick={()=>u("sex",x)} style={{flex:1,textAlign:"center",padding:13}}><span style={{fontWeight:600,fontSize:14}}>{x}</span></div>)}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginTop:14}} className="g3">
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Height (in)</label><input className="inp" type="number" value={f.ht} onChange={e=>u("ht",e.target.value)} placeholder="68"/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Weight (lbs)</label><input className="inp" type="number" value={f.wt} onChange={e=>u("wt",e.target.value)} placeholder="210"/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Goal (lbs)</label><input className="inp" type="number" value={f.gw} onChange={e=>u("gw",e.target.value)} placeholder="170"/></div>
            </div>
            {bmi&&<div style={{marginTop:16,padding:"12px 18px",borderRadius:12,background:B.sageL}}><span style={{fontSize:14,color:B.forest,fontWeight:600}}>Your BMI: {bmi}</span></div>}
          </div>)}

          {s===2&&(<div>
            <h2 className="pf" style={{fontSize:30,color:B.dark,marginBottom:6}}>Choose your medication</h2>
            <p style={{color:B.muted,marginBottom:28,fontSize:15}}>Your physician will confirm the best option.</p>
            {[{id:"sem_inj",n:"Semaglutide Injection",d:"Weekly subcutaneous injection — most popular",p:"$179/first month"},
              {id:"sem_tab",n:"Semaglutide Tablets",d:"Daily oral tablet — no needles",p:"$149/first month"},
              {id:"tirz_inj",n:"Tirzepatide Injection",d:"Dual-action GLP-1/GIP weekly injection",p:"$249/first month"},
            ].map(m=>(
              <div key={m.id} className={`rc ${f.med===m.id?"on":""}`} onClick={()=>u("med",m.id)} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontWeight:600,color:B.dark}}>{m.n}</div><div style={{fontSize:13,color:B.muted,marginTop:3}}>{m.d}</div></div>
                  <div style={{fontWeight:700,color:B.forest,fontSize:15,whiteSpace:"nowrap"}}>{m.p}</div>
                </div>
              </div>
            ))}
          </div>)}

          {s===3&&(<div>
            <h2 className="pf" style={{fontSize:30,color:B.dark,marginBottom:6}}>Medical history</h2>
            <p style={{color:B.muted,marginBottom:28,fontSize:15}}>Select any conditions that apply.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}} className="g2">
              {["Type 2 Diabetes","High Blood Pressure","High Cholesterol","Thyroid Conditions","Heart Disease","Kidney Disease","Pancreatitis","None of the above"].map(c=>(
                <div key={c} className={`rc ${f.conds.includes(c)?"on":""}`} onClick={()=>tc(c)} style={{padding:13,textAlign:"center"}}><span style={{fontSize:14,fontWeight:500}}>{c}</span></div>
              ))}
            </div>
            <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:5}}>Current Medications</label><input className="inp" value={f.meds} onChange={e=>u("meds",e.target.value)} placeholder="List any current medications"/></div>
            <div><label style={{fontSize:13,fontWeight:600,color:B.dark,display:"block",marginBottom:7}}>Previously used GLP-1 medication?</label>
              <div style={{display:"flex",gap:10}}>{["Yes","No"].map(v=><div key={v} className={`rc ${f.prev===v?"on":""}`} onClick={()=>u("prev",v)} style={{flex:1,textAlign:"center",padding:13}}><span style={{fontWeight:600,fontSize:14}}>{v}</span></div>)}</div>
            </div>
          </div>)}

          {s===4&&(<div style={{textAlign:"center",padding:"32px 0"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:B.sageL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={B.forest} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg></div>
            <h2 className="pf" style={{fontSize:30,color:B.dark,marginBottom:10}}>Assessment Complete!</h2>
            <p style={{color:B.muted,fontSize:15,lineHeight:1.7,maxWidth:400,margin:"0 auto 28px"}}>A licensed physician will review your information within 48 hours. You'll receive an email with next steps.</p>
            <button className="btn" onClick={()=>go("home")}>Return Home</button>
          </div>)}

          {s<4&&<div style={{marginTop:28,display:"flex",justifyContent:"flex-end"}}><button className="btn" onClick={s===3?submit:()=>setS(x=>x+1)}>{s===3?"Submit Assessment":"Continue"}</button></div>}
        </div>

        <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:24,marginBottom:32,flexWrap:"wrap"}}>
          {["HIPAA Compliant","256-bit Encryption","U.S. Licensed Physicians"].map((b,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:11.5,color:B.muted}}>🔒 {b}</div>))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App(){
  const[pg,setPg]=useState("home");
  useEffect(()=>{window.scrollTo(0,0)},[pg]);
  const go=(p)=>setPg(p);

  if(pg==="intake") return <div className="grain"><style>{css}</style><Intake go={go}/></div>;

  return(
    <div className="grain">
      <style>{css}</style>
      <NavBar go={go}/>
      <Hero go={go}/>
      <HowItWorks/>
      <Pricing go={go}/>
      <Testimonials/>
      <FAQ/>
      <FinalCTA go={go}/>
      <Footer/>
    </div>
  );
}
