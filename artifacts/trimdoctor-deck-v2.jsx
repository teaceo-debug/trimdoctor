import { useState, useEffect } from "react";

const B = { forest: "#1B4332", forestL: "#2D6A4F", sage: "#95D5B2", sageL: "#D8F3DC", gold: "#DAA520", goldL: "#B8860B", dark: "#0C0F0D", text: "#8FA89A", bright: "#D4E8DC", white: "#F0F5F2", muted: "#5A6E63" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Figtree:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Figtree',sans-serif;background:${B.dark};color:#fff;-webkit-font-smoothing:antialiased;overflow:hidden;height:100vh}
.pf{font-family:'Playfair Display',serif}.mn{font-family:'JetBrains Mono',monospace}
.slide{width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;padding:56px 76px;position:relative;overflow:hidden}
.glow{position:absolute;border-radius:50%;filter:blur(80px);opacity:.08;pointer-events:none}
@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fu .6s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.06s;opacity:0}.d2{animation-delay:.12s;opacity:0}.d3{animation-delay:.18s;opacity:0}.d4{animation-delay:.24s;opacity:0}.d5{animation-delay:.3s;opacity:0}.d6{animation-delay:.36s;opacity:0}
@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}
.shm{background:linear-gradient(90deg,${B.forest} 0%,${B.gold} 50%,${B.forest} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:sh 4s linear infinite}
.sb{padding:26px;border-radius:18px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);backdrop-filter:blur(4px)}
.dots{position:fixed;left:26px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:7px;z-index:100}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.1);cursor:pointer;transition:all .3s}
.dot.on{background:${B.sage};height:20px;border-radius:4px}
.nav-b{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);display:flex;gap:7px;z-index:100}
.nb{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;transition:all .2s}
.nb:hover{background:rgba(255,255,255,.08);color:#fff}
.cnt{position:fixed;bottom:22px;right:26px;font-size:12px;color:rgba(255,255,255,.18);z-index:100}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.lbl{font-size:13px;color:rgba(255,255,255,.4)}.val{font-size:14px;font-weight:600}
`;

const Logo = ({s=44}) => (
  <div style={{display:"flex",alignItems:"center",gap:s*.3}}>
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill={B.forest}/><path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".9"/><path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill={B.gold}/></svg>
    <span className="pf" style={{fontSize:s*.65,fontWeight:700}}>TrimDoctor</span>
  </div>
);

const SLIDES = [
  // 0 — Title
  () => (
    <div className="slide" style={{alignItems:"center",textAlign:"center"}}>
      <div className="glow" style={{width:600,height:600,background:B.sage,top:"5%",left:"20%"}}/>
      <div className="glow" style={{width:400,height:400,background:B.gold,bottom:"10%",right:"20%"}}/>
      <div className="au"><Logo s={48}/></div>
      <h1 className="pf au d1" style={{fontSize:64,lineHeight:1.05,letterSpacing:-3,maxWidth:760,marginTop:24,marginBottom:20}}>
        The AI-Native <span className="shm">GLP-1</span> Telehealth Platform
      </h1>
      <p className="au d2" style={{fontSize:18,color:"rgba(255,255,255,.4)",maxWidth:540,lineHeight:1.65,marginBottom:28}}>
        From the founder who built FitTea into a $100M+ global health brand. Now bringing doctor-guided GLP-1 weight loss to millions.
      </p>
      <div className="au d3" style={{display:"flex",gap:24,fontSize:13,color:"rgba(255,255,255,.2)"}}>
        <span>Confidential</span><span>·</span><span>April 2026</span><span>·</span><span>trimdoctor.com</span>
      </div>
    </div>
  ),

  // 1 — Founder
  () => (
    <div className="slide">
      <div className="glow" style={{width:500,height:500,background:B.gold,top:"-5%",right:"-5%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>The Founder</p>
      <h2 className="pf au d1" style={{fontSize:48,lineHeight:1.08,letterSpacing:-2,maxWidth:700,marginBottom:36}}>
        Michael Gonzalez built a <span style={{color:B.gold}}>$100M+</span> health empire. Now he's doing it again.
      </h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div className="sb au d2">
          <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>Track Record</div>
          {[
            ["Founded FitTea","2013 — world's #1 detox tea brand"],
            ["Revenue","$100M+ in e-commerce sales"],
            ["Scale","2 million+ households reached globally"],
            ["Distribution","Every major U.S. retailer"],
            ["Exit","Successfully exited FitTea"],
            ["Also Founded","HappyTea (CBD brand)"],
          ].map(([l,v],i)=>(
            <div key={i} className="row"><span className="lbl">{l}</span><span className="val" style={{color:i===1?B.gold:"#fff",textAlign:"right",maxWidth:"55%"}}>{v}</span></div>
          ))}
        </div>

        <div className="sb au d3">
          <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:16}}>Unfair Advantages</div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {t:"Pioneer of Influencer Marketing",d:"Scaled FitTea through celebrity partnerships including Kardashians, Kylie Jenner (112M followers), and 1,000+ influencers. 1.6M brand followers built organically."},
              {t:"DTC Health & Wellness Expert",d:"Decade of experience in consumer health products — formulation, supply chain, FDA compliance, and customer acquisition at scale."},
              {t:"AI-Native Operator",d:"Building TrimDoctor with the same lean, tech-forward approach — AI for development, marketing, and support. 2 employees targeting $40M+ Year 1."},
              {t:"491K Personal Following",d:"@teaceo on Instagram. Built-in distribution channel and credibility in the health/wellness space."},
            ].map((x,i)=>(
              <div key={i}>
                <div style={{fontWeight:700,fontSize:14,color:B.sage,marginBottom:3}}>{x.t}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.35)",lineHeight:1.65}}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="au d4" style={{marginTop:20,padding:14,borderRadius:12,background:`${B.gold}10`,border:`1px solid ${B.gold}25`,textAlign:"center"}}>
        <span style={{fontSize:14,color:B.gold,fontWeight:600}}>"I started FitTea with $10,000 and zero infrastructure. I built it into a $100M brand. TrimDoctor is the same playbook — applied to the biggest health opportunity of our generation."</span>
      </div>
    </div>
  ),

  // 2 — Problem
  () => (
    <div className="slide">
      <div className="glow" style={{width:500,height:500,background:"#E74C3C",top:"-10%",right:"-5%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>The Problem</p>
      <h2 className="pf au d1" style={{fontSize:48,lineHeight:1.08,letterSpacing:-2,maxWidth:680,marginBottom:36}}>74% of Americans are overweight. GLP-1s work. Access is broken.</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        {[{s:"$1,200+",l:"Monthly cost of brand-name Ozempic",e:"💰"},{s:"6-12 mo",l:"Average wait for insurance authorization",e:"⏳"},{s:"73%",l:"Of prescriptions abandoned due to cost",e:"🚫"}].map((x,i)=>(
          <div key={i} className={`sb au d${i+2}`}><div style={{fontSize:24,marginBottom:8}}>{x.e}</div><div className="mn" style={{fontSize:32,fontWeight:700,color:B.sage,marginBottom:6}}>{x.s}</div><div style={{fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.6}}>{x.l}</div></div>
        ))}
      </div>
    </div>
  ),

  // 3 — Solution
  () => (
    <div className="slide">
      <div className="glow" style={{width:500,height:500,background:B.sage,bottom:"-10%",left:"-5%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>The Solution</p>
      <h2 className="pf au d1" style={{fontSize:48,lineHeight:1.08,letterSpacing:-2,maxWidth:660,marginBottom:32}}>Compounded GLP-1s. Online. <span style={{color:B.sage}}>$179/month.</span></h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[{t:"AI-Built Platform",d:"Entire tech stack built with AI. Website, patient portal, support chatbot — no engineering team needed.",e:"🤖"},
          {t:"Outsourced Medicine",d:"Licensed physicians via OpenLoop Health. FDA-regulated compounding pharmacies. We never practice medicine.",e:"🏥"},
          {t:"DTC Marketing Machine",d:"Applying the FitTea influencer playbook + AI-generated ads. 15-20 new creatives/week. $62 CAC.",e:"📱"},
          {t:"2-Person Operation",d:"Michael + his proven playbook. No office, no warehouse, no medical staff. $20M+ profit on $44M revenue.",e:"⚡"}
        ].map((x,i)=>(
          <div key={i} className={`sb au d${i+2}`} style={{display:"flex",gap:12}}><span style={{fontSize:24}}>{x.e}</span><div><div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{x.t}</div><div style={{fontSize:12.5,color:"rgba(255,255,255,.4)",lineHeight:1.7}}>{x.d}</div></div></div>
        ))}
      </div>
    </div>
  ),

  // 4 — Why Michael Wins
  () => (
    <div className="slide">
      <div className="glow" style={{width:600,height:600,background:B.gold,top:"5%",left:"10%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Why Now, Why Me</p>
      <h2 className="pf au d1" style={{fontSize:48,lineHeight:1.08,letterSpacing:-2,maxWidth:700,marginBottom:36}}>The FitTea playbook, <span style={{color:B.gold}}>perfected for GLP-1s.</span></h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[
          {phase:"FitTea (2013-2022)",items:["Started with $10K","Built to $100M+ revenue","Pioneered influencer marketing","Kardashian/Kylie partnerships","2M+ households reached","Exited successfully"],color:B.gold},
          {phase:"The Bridge",items:["Mastered DTC supply chain","Learned FDA compliance","Built 491K personal audience","Proven celebrity/influencer network","10+ years health & wellness","Identified GLP-1 opportunity"],color:"rgba(255,255,255,.4)"},
          {phase:"TrimDoctor (2026+)",items:["AI replaces the team I needed before","Same influencer playbook at 10x efficiency","OpenLoop/Belmar = outsourced medicine","$179 vs $1,200 — obvious value prop","$50B market, perfect timing","Targeting $500M in 3 years"],color:B.sage},
        ].map((p,i)=>(
          <div key={i} className={`sb au d${i+2}`}>
            <div style={{fontSize:13,fontWeight:700,color:p.color,letterSpacing:1,marginBottom:14,textTransform:"uppercase"}}>{p.phase}</div>
            {p.items.map((item,j)=>(
              <div key={j} style={{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.8,display:"flex",gap:6}}>
                <span style={{color:p.color,flexShrink:0}}>→</span>{item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),

  // 5 — Market
  () => (
    <div className="slide" style={{alignItems:"center",textAlign:"center"}}>
      <div className="glow" style={{width:700,height:700,background:B.gold,top:"5%",left:"25%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Market</p>
      <h2 className="pf au d1" style={{fontSize:48,letterSpacing:-2,marginBottom:40}}>The GLP-1 market is <span style={{color:B.gold}}>$50B+</span> and growing</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,maxWidth:840,width:"100%"}}>
        {[{l:"TAM",v:"$50B+",s:"Global GLP-1 (2026)",c:B.gold},{l:"SAM",v:"$12B",s:"U.S. DTC telehealth GLP-1",c:B.sage},{l:"SOM",v:"$500M",s:"Capturable in 3 years",c:"#3B82F6"}].map((m,i)=>(
          <div key={i} className={`sb au d${i+2}`} style={{textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.22)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{m.l}</div>
            <div className="mn" style={{fontSize:44,fontWeight:700,color:m.c,lineHeight:1}}>{m.v}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.3)",marginTop:6}}>{m.s}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // 6 — Traction + Unit Economics
  () => (
    <div className="slide">
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Traction & Unit Economics</p>
      <h2 className="pf au d1" style={{fontSize:46,letterSpacing:-2,marginBottom:32}}><span style={{color:B.sage}}>$44.5M</span> Year 1 · <span style={{color:B.sage}}>24:1</span> LTV:CAC</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="sb au d2">
          <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>Growth Trajectory</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{v:"300",l:"Month 1 patients"},{v:"14K",l:"Month 6 patients"},{v:"55K",l:"Month 12 patients"},{v:"$9.8M",l:"Month 12 MRR"},{v:"$20.3M",l:"Year 1 net profit"},{v:"45%",l:"Net margin"}].map((m,i)=>(
              <div key={i} style={{textAlign:"center",padding:10,background:"rgba(0,0,0,.2)",borderRadius:10}}>
                <div className="mn" style={{fontSize:22,fontWeight:700,color:B.sage}}>{m.v}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:2}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="sb au d3">
          <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>Per-Customer Economics</div>
          {[["First month","$179"],["Ongoing","$299/mo"],["Avg retention","5.8 months"],["Customer LTV","$1,495"],["Total COGS","$76.99"],["Gross margin","57%"],["Blended CAC","$62"],["Payback period","11 days"]].map(([l,v],i)=>(
            <div key={i} className="row"><span className="lbl">{l}</span><span className="mn val" style={{color:["$1,495","57%","11 days"].includes(v)?B.sage:"#fff"}}>{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  ),

  // 7 — Competition
  () => (
    <div className="slide">
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Competition</p>
      <h2 className="pf au d1" style={{fontSize:46,letterSpacing:-2,marginBottom:24}}>Same market. <span style={{color:B.sage}}>Unfair advantage.</span></h2>
      <div className="au d2">
        <div style={{display:"grid",gridTemplateColumns:"2.2fr 1fr 1fr 1fr 1fr",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:10,fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:1,textTransform:"uppercase"}}>
          <div>Company</div><div style={{textAlign:"center"}}>Employees</div><div style={{textAlign:"center"}}>Revenue</div><div style={{textAlign:"center"}}>Rev/Emp</div><div style={{textAlign:"center"}}>Founder Edge</div>
        </div>
        {[
          {n:"TrimDoctor",e:"2",r:"$44M*",rpe:"$22M",edge:"$100M+ DTC exits",hl:true},
          {n:"MEDVi",e:"2",r:"$401M",rpe:"$200M",edge:"AI marketing",hl:false},
          {n:"Hims & Hers",e:"2,442",r:"$2.4B",rpe:"$983K",edge:"Brand scale",hl:false},
          {n:"Ro",e:"800+",r:"$500M+",rpe:"$625K",edge:"Clinical depth",hl:false},
          {n:"Calibrate",e:"200+",r:"$100M+",rpe:"$500K",edge:"Metabolic focus",hl:false},
        ].map((c,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"2.2fr 1fr 1fr 1fr 1fr",padding:"11px 4px",borderBottom:"1px solid rgba(255,255,255,.04)",color:c.hl?B.sage:"rgba(255,255,255,.5)",fontWeight:c.hl?700:400,background:c.hl?`${B.sage}08`:"transparent",borderRadius:8,fontSize:13,alignItems:"center"}}>
            <div style={{fontWeight:600}}>{c.n}</div><div className="mn" style={{textAlign:"center"}}>{c.e}</div><div className="mn" style={{textAlign:"center"}}>{c.r}</div><div className="mn" style={{textAlign:"center"}}>{c.rpe}</div><div style={{textAlign:"center",fontSize:12}}>{c.edge}</div>
          </div>
        ))}
      </div>
      <div className="au d3" style={{marginTop:18,fontSize:14,color:"rgba(255,255,255,.35)",lineHeight:1.7}}>
        <strong style={{color:"#fff"}}>Michael's edge:</strong> He's done this before. FitTea was the first brand to scale through influencer marketing. TrimDoctor applies that same playbook — plus AI automation — to a $50B market. No other GLP-1 founder has his combination of DTC health expertise, celebrity network, and AI-native efficiency.
      </div>
    </div>
  ),

  // 8 — The Ask
  () => (
    <div className="slide" style={{alignItems:"center",textAlign:"center"}}>
      <div className="glow" style={{width:700,height:700,background:B.sage,top:"0",left:"15%"}}/>
      <p className="au" style={{fontSize:12,fontWeight:700,color:B.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>The Opportunity</p>
      <h2 className="pf au d1" style={{fontSize:52,letterSpacing:-2,marginBottom:32}}>Seeking <span style={{color:B.gold}}>$5M</span> to scale to <span style={{color:B.sage}}>$500M</span></h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,maxWidth:840,width:"100%",marginBottom:28}}>
        {[{t:"Marketing Scale",p:"60%",a:"$3M",d:"Scale ads from $1M→$5M/mo. Activate Michael's celebrity/influencer network."},{t:"Product Expansion",p:"25%",a:"$1.25M",d:"Tirzepatide tablets, meal delivery, peptides, men's health vertical."},{t:"Infrastructure",p:"15%",a:"$750K",d:"Small ops team, enterprise platform, additional pharmacy partnerships."}].map((x,i)=>(
          <div key={i} className={`sb au d${i+2}`} style={{textAlign:"left"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span className="mn" style={{fontSize:12,color:"rgba(255,255,255,.25)"}}>{x.p}</span><span className="mn" style={{fontSize:14,fontWeight:700,color:B.sage}}>{x.a}</span></div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:5}}>{x.t}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.35)",lineHeight:1.7}}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  // 9 — Close
  () => (
    <div className="slide" style={{alignItems:"center",textAlign:"center"}}>
      <div className="glow" style={{width:600,height:600,background:B.sage,top:"15%",left:"30%"}}/>
      <div className="au"><Logo s={52}/></div>
      <h2 className="pf au d1" style={{fontSize:48,lineHeight:1.12,letterSpacing:-2,marginTop:20,marginBottom:14}}>The founder who built<br/>a $100M health brand<br/>is doing it again.</h2>
      <p className="au d2" style={{fontSize:16.5,color:"rgba(255,255,255,.35)",marginBottom:36}}>
        Michael Gonzalez · michael@trimdoctor.com · trimdoctor.com
      </p>
      <div className="au d3" style={{display:"flex",gap:20,fontSize:13,color:"rgba(255,255,255,.18)",flexWrap:"wrap",justifyContent:"center"}}>
        {["$100M+ FitTea Exit","$44.5M Y1 Target","45% Net Margins","24:1 LTV:CAC","2 Employees","491K Social Following"].map((s,i)=><span key={i}>{s}</span>)}
      </div>
    </div>
  ),
];

export default function App(){
  const[s,setS]=useState(0);
  const[k,setK]=useState(0);
  const n=SLIDES.length;
  const go=(i)=>{if(i>=0&&i<n){setS(i);setK(x=>x+1)}};
  useEffect(()=>{const h=(e)=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();go(s+1)}if(e.key==="ArrowLeft"){e.preventDefault();go(s-1)}};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)},[s]);
  const Slide=SLIDES[s];
  return(
    <div><style>{css}</style>
      <div className="dots">{SLIDES.map((_,i)=><div key={i} className={`dot ${s===i?"on":""}`} onClick={()=>go(i)}/>)}</div>
      <div key={k}><Slide/></div>
      <div className="nav-b"><div className="nb" onClick={()=>go(s-1)} style={{opacity:s===0?.3:1}}>←</div><div className="nb" onClick={()=>go(s+1)} style={{opacity:s===n-1?.3:1}}>→</div></div>
      <div className="cnt"><span className="mn">{s+1}/{n}</span></div>
    </div>
  );
}
