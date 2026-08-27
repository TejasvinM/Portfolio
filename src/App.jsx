import photo from "./assets/photo.jpeg";
import { useState, useEffect, useRef } from "react";
 
/* ── Palette ──────────────────────────────────────────────── */
const C = {
  bg:      "#161616",
  bgDark:  "#0e0e0e",
  surface: "#1a1a1a",
  card:    "#202020",
  border:  "#2a2a2a",
  gold:    "#c9a84c",
  goldL:   "#e8d07a",
  goldD:   "#8a6e2f",
  text:    "#f0ece4",
  muted:   "#6b6b6b",
  subtle:  "#2e2e2e",
};
 
/* ── Typography — serif portfolio feel ───────────────────── */
const FH = "'Playfair Display', 'Georgia', 'Times New Roman', serif";   // headings
const FB = "'Lora', 'Georgia', 'Times New Roman', serif";               // body
const FM = "'JetBrains Mono', 'Courier New', monospace";                // code/labels
 
/* ── Data (from new resume) ───────────────────────────────── */
const SKILLS_DATA = [
  { id:1,  name:"Python",            cat:"Programming",  level:90, color:"#c9a84c" },
  { id:2,  name:"SQL",               cat:"Programming",  level:85, color:"#e8d07a" },
  { id:3,  name:"JavaScript",        cat:"Programming",  level:68, color:"#c9a84c" },
  { id:4,  name:"Pandas / NumPy",    cat:"Data & Auto",  level:82, color:"#d4b85a" },
  { id:5,  name:"ETL & Data Validation", cat:"Data & Auto", level:80, color:"#c9a84c" },
  { id:6,  name:"Data Extraction",   cat:"Data & Auto",  level:78, color:"#e8d07a" },
  { id:7,  name:"PostgreSQL",        cat:"Databases",    level:82, color:"#c9a84c" },
  { id:8,  name:"MySQL",             cat:"Databases",    level:80, color:"#d4b85a" },
  { id:9,  name:"MS SQL Server",     cat:"Databases",    level:75, color:"#e8d07a" },
  { id:10, name:"CTEs & Window Fns", cat:"SQL & Opt.",   level:78, color:"#c9a84c" },
  { id:11, name:"Query Optimization",cat:"SQL & Opt.",   level:75, color:"#d4b85a" },
  { id:12, name:"REST APIs",         cat:"Web & Backend",level:72, color:"#c9a84c" },
  { id:13, name:"Node.js / Express", cat:"Web & Backend",level:65, color:"#e8d07a" },
  { id:14, name:"Git & GitHub",      cat:"Tools",        level:80, color:"#c9a84c" },
];
 
const EXPERIENCE = [
  {
    period: "Jan 2026 – Apr 2026",
    role: "Software Engineering Intern",
    company: "Innoknowvex, Bangalore",
    points: [
      "Developed backend routing and database integration using REST APIs and MERN stack for data-driven web modules.",
      "Built responsive web interfaces using HTML, CSS, and Bootstrap, integrating API data across application components.",
      "Automated database querying workflows and implemented input validation, reducing query latency by 25%.",
      "Diagnosed and resolved async data-handling issues between frontend, backend services, and databases.",
    ],
  },
  {
    period: "Jul 2025 – Aug 2025",
    role: "Generative AI & ML Intern",
    company: "Zephyr Technologies Pvt. Ltd., Bangalore",
    points: [
      "Developed modular Python automation scripts to extract, clean, and validate 100,000+ relational records, cutting preprocessing time by 30%.",
      "Built automated ETL and data validation workflows to handle inconsistent records before ML model consumption.",
      "Automated multi-source data ingestion and generated structured analytical reports using Python and SQL.",
    ],
  },
];
 
const PROJECTS = [
  {
    num: "01",
    title: "Integrated Ad Bidding & Pricing Automation",
    stack: ["Python", "SQL", "Analytics"],
    desc: "Built Python automation pipelines to extract, clean, and validate bid transaction and clickstream data. Designed normalized relational schemas and developed SQL queries using CTEs and window functions to calculate pricing trends, impressions, and conversion metrics.",
  },
  {
    num: "02",
    title: "European Travel Organization — Relational DB",
    stack: ["PostgreSQL", "MySQL", "MS SQL Server"],
    desc: "Designed a normalized relational database covering customers, tour packages, bookings, payments, hotels, guides, flights, and countries. Implemented PKs, FKs, composite keys, and junction tables following 3NF principles across 10 tables.",
  },
];
 
const SOCIALS = [
  { label:"LinkedIn",  short:"in", color:"#0077b5", href:"https://linkedin.com/in/tejju",  icon:"in" },
  { label:"GitHub",    short:"gh", color:"#6e40c9", href:"https://github.com/TejasvinM",   icon:"gh" },
  { label:"Instagram", short:"ig", color:"#e1306c", href:"https://www.instagram.com/_tejju.__?igsi=bm5wcXpuYXN0aDFz",  icon:"ig" },
];
 
/* ── Helpers ──────────────────────────────────────────────── */
function useInView(t=0.1){
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:t});
    if(ref.current)obs.observe(ref.current); return()=>obs.disconnect();
  },[]);
  return [ref,vis];
}
function Reveal({children,delay=0,y=28}){
  const [ref,vis]=useInView();
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":`translateY(${y}px)`,transition:`opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s,transform .85s cubic-bezier(.16,1,.3,1) ${delay}s`}}>{children}</div>;
}
function Counter({to}){
  const [val,setVal]=useState(0); const [ref,vis]=useInView(0.5);
  useEffect(()=>{
    if(!vis)return; let v=0,step=Math.ceil(to/50);
    const id=setInterval(()=>{v=Math.min(v+step,to);setVal(v);if(v>=to)clearInterval(id);},22);
    return()=>clearInterval(id);
  },[vis,to]);
  return <span ref={ref}>{val}</span>;
}
 
/* ── Gold divider ─────────────────────────────────────────── */
function GDivider(){
  return <div style={{width:"100%",height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,opacity:.25}}/>;
}
 
/* ── Section label ────────────────────────────────────────── */
function SLabel({children}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
      <span style={{fontFamily:FM,fontSize:11,color:C.gold,letterSpacing:".2em",textTransform:"uppercase"}}>{children}</span>
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,${C.gold}50,transparent)`,maxWidth:120}}/>
    </div>
  );
}
 
/* ── Nav ──────────────────────────────────────────────────── */
function Nav(){
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>30);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 52px",height:64,background:sc?"rgba(14,14,14,0.96)":"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${C.border}`:"none",transition:"all .4s ease"}}>
      <div style={{width:40,height:40,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FH,fontWeight:700,fontSize:17,color:C.bgDark,cursor:"pointer",borderRadius:4}} onClick={()=>go("home")}>T.</div>
      <div style={{display:"flex",gap:4}}>
        {["Home","About","Skills","Works","Contact"].map(l=>(
          <button key={l} onClick={()=>go(l.toLowerCase())} style={{background:"none",border:"none",cursor:"pointer",fontFamily:FB,fontSize:14,color:C.muted,padding:"6px 16px",transition:"color .2s",letterSpacing:".02em"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.gold}
            onMouseLeave={e=>e.currentTarget.style.color=C.muted}
          >{l}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <div style={{width:36,height:36,border:`1px solid ${C.border}`,borderRadius:4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold}
          onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
        >
          {[0,1].map(i=><div key={i} style={{width:14,height:1.5,background:C.text,borderRadius:1}}/>)}
        </div>
      </div>
    </nav>
  );
}
 
/* ── Social Badge ─────────────────────────────────────────── */
function SocialBadge({label,color,href,icon,delay=0}){
  const [hov,setHov]=useState(false);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),delay*1000+200);return()=>clearTimeout(t);},[delay]);
  return(
    <a href={href} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
        display:"flex",alignItems:"center",gap:8,
        padding:hov?"9px 18px":"9px 13px",
        background:hov?color:C.card,
        border:`1px solid ${hov?color:C.border}`,
        borderRadius:40,cursor:"pointer",
        boxShadow:hov?`0 6px 24px ${color}50`:`0 2px 10px rgba(0,0,0,.4)`,
        transform:loaded?(hov?"translateY(-4px) scale(1.06)":"translateY(0) scale(1)"):"translateY(16px) scale(.85)",
        opacity:loaded?1:0,
        transition:"all .35s cubic-bezier(.16,1,.3,1)",
        whiteSpace:"nowrap",
      }}>
        <span style={{fontFamily:FM,fontSize:11,fontWeight:600,color:hov?"#fff":C.gold,letterSpacing:".06em"}}>{icon}</span>
        <span style={{fontFamily:FB,fontSize:12,fontWeight:600,color:hov?"#fff":C.muted,maxWidth:hov?80:0,overflow:"hidden",transition:"max-width .3s ease",display:"inline-block"}}>{label}</span>
      </div>
    </a>
  );
}
 
/* ── Hero ─────────────────────────────────────────────────── */
function Hero(){
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),80);return()=>clearTimeout(t);},[]);
  const a=(d,x=0,y=22)=>({opacity:loaded?1:0,transform:loaded?"translate(0,0)":`translate(${x}px,${y}px)`,transition:`opacity .9s cubic-bezier(.16,1,.3,1) ${d}s,transform .9s cubic-bezier(.16,1,.3,1) ${d}s`});
 
  return(
    <section id="home" style={{minHeight:"100vh",background:C.bgDark,position:"relative",overflow:"hidden"}}>
      {/* Ambient glow */}
      <div style={{position:"absolute",top:"15%",left:"18%",width:480,height:480,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}06 0%,transparent 65%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"10%",right:"12%",width:320,height:320,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}05 0%,transparent 65%)`,pointerEvents:"none"}}/>
 
      {/* Social sidebar */}
      <div style={{...a(1.1),position:"absolute",left:26,bottom:110,zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
        {SOCIALS.map(s=>(
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
            <div style={{width:32,height:32,borderRadius:6,background:C.surface,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.muted,fontFamily:FM,letterSpacing:".05em",cursor:"pointer",transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=s.color;e.currentTarget.style.borderColor=s.color;e.currentTarget.style.color="#fff";e.currentTarget.style.transform="scale(1.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.surface;e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted;e.currentTarget.style.transform="scale(1)";}}
            >{s.short.toUpperCase()}</div>
          </a>
        ))}
        <div style={{width:1,height:44,background:C.border,marginTop:4}}/>
      </div>
 
      {/* 3-col hero grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 400px 360px",minHeight:"calc(100vh - 100px)",paddingTop:64}}>
 
        {/* LEFT — big name */}
        <div style={{display:"flex",alignItems:"center",paddingLeft:"6vw",paddingBottom:50,zIndex:5}}>
          <div>
            <div style={{...a(.2),marginBottom:22}}>
              <span style={{fontFamily:FM,fontSize:11,color:C.gold,background:`${C.gold}12`,padding:"5px 14px",borderRadius:20,border:`1px solid ${C.gold}28`,letterSpacing:".08em"}}>
                Python Developer · Data Automation · Backend
              </span>
            </div>
            <div style={a(.38)}>
              <div style={{fontFamily:FH,fontSize:"clamp(60px,8.5vw,112px)",fontWeight:700,lineHeight:.9,letterSpacing:"-2px",color:C.text,fontStyle:"italic"}}>Tejas</div>
              <div style={{fontFamily:FH,fontSize:"clamp(60px,8.5vw,112px)",fontWeight:700,lineHeight:.9,letterSpacing:"-2px",WebkitTextStroke:`1.5px ${C.gold}`,color:"transparent",fontStyle:"italic",marginBottom:32}}>vin M.</div>
            </div>
            <div style={{...a(.55),display:"flex",gap:10,flexWrap:"wrap"}}>
              <GoldBtn primary onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Contact Me</GoldBtn>
              <GoldBtn onClick={()=>document.getElementById("works")?.scrollIntoView({behavior:"smooth"})}>View Work →</GoldBtn>
            </div>
          </div>
        </div>
 
        {/* CENTER — photo */}
        <div style={{...a(.52,0,0),display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:6,position:"relative"}}>
          <div style={{width:"100%",height:"80vh",background:`linear-gradient(170deg,#242424 0%,#161616 100%)`,position:"relative",overflow:"hidden",borderTop:`3px solid ${C.gold}`}}>
            {/* Placeholder */}
            <img
  src={photo}
  alt="Tejasvin M"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
  }}
/>
            {/* Corner accent */}
            <div style={{position:"absolute",top:0,right:0,width:50,height:50,borderRight:`2px solid ${C.gold}`,borderTop:`2px solid ${C.gold}`,opacity:.4}}/>
            <div style={{position:"absolute",top:14,right:14,width:7,height:7,borderRadius:"50%",background:C.gold,opacity:.6}}/>
            {/* Bottom fade */}
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,background:`linear-gradient(to top,${C.bgDark},transparent)`}}/>
          </div>
 
          {/* Animated badges below photo */}
          <div style={{position:"absolute",bottom:-54,left:"50%",transform:"translateX(-50%)",display:"flex",gap:10,zIndex:20}}>
            {SOCIALS.map((s,i)=><SocialBadge key={s.label} {...s} delay={.7+i*.12}/>)}
          </div>
        </div>
 
        {/* RIGHT — info */}
        <div style={{...a(.72,18,0),display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 4vw 50px 3vw",zIndex:5}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            <span style={{fontFamily:FM,fontSize:10,color:C.gold,letterSpacing:".18em",textTransform:"uppercase"}}>Fresher · Open to Work</span>
            <div style={{flex:1,height:1,background:C.gold,opacity:.28}}/>
          </div>
          <p style={{fontFamily:FH,fontSize:19,fontWeight:600,color:C.text,lineHeight:1.45,marginBottom:16,fontStyle:"italic"}}>
            Based in Bengaluru,<br/>I build Python automation,<br/>data pipelines & backend systems.
          </p>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.85,marginBottom:26,maxWidth:270,fontFamily:FB}}>
            Engineering graduate skilled in Python, SQL, ETL workflows, REST APIs, and relational database design. Ready to contribute from day one.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:26}}>
            {[["P","08940631803"],["E","tejas2005tp@gmail.com"]].map(([k,v])=>(
              <div key={k} style={{fontSize:12,color:C.muted,fontFamily:FM,display:"flex",gap:10}}>
                <span style={{color:C.gold,fontWeight:600}}>{k}</span>{v}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:24,paddingTop:22,borderTop:`1px solid ${C.border}`}}>
            {[["2","Internships"],["2","Projects"],["8","CGPA"]].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:FH,fontSize:34,fontWeight:700,color:C.gold,lineHeight:1,fontStyle:"italic"}}><Counter to={parseInt(n)}/></div>
                <div style={{fontSize:10,color:C.muted,letterSpacing:".1em",textTransform:"uppercase",marginTop:4,fontFamily:FM}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Badge spacer */}
      <div style={{height:76}}/>
 
      {/* Info strip */}
      <div style={{display:"flex",justifyContent:"center",gap:56,padding:"20px 8vw",borderTop:`1px solid ${C.border}`}}>
        {[["Degree","B.Tech AI & DS"],["College","SEC, Namakkal"],["Year","2022 – 2026"],["Status","Available"]].map(([k,v])=>(
          <div key={k} style={{textAlign:"center"}}>
            <div style={{fontSize:10,color:C.muted,letterSpacing:".14em",textTransform:"uppercase",marginBottom:4,fontFamily:FM}}>{k}</div>
            <div style={{fontSize:13,color:C.gold,fontWeight:600,fontFamily:FB}}>{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
 
/* ── About ────────────────────────────────────────────────── */
function About(){
  return(
    <section id="about" style={{background:C.bg,borderTop:`1px solid ${C.border}`,padding:"90px 8vw"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8vw",alignItems:"start"}}>
        <Reveal>
          <SLabel>About Me</SLabel>
          <h2 style={{fontFamily:FH,fontSize:"clamp(26px,3.5vw,44px)",fontWeight:700,lineHeight:1.2,color:C.text,marginBottom:22,fontStyle:"italic"}}>
            You can't stop learning.<br/>The more you build,<br/><span style={{color:C.gold}}>the more you grow.</span>
          </h2>
          <p style={{fontSize:14,color:C.muted,lineHeight:1.95,maxWidth:440,fontFamily:FB}}>
            Fresher-level engineering graduate with hands-on internship experience in Python development, data automation, SQL, and backend engineering. Skilled in building automation scripts, ETL workflows, and optimizing SQL queries across relational databases. Experienced with REST API development, database integration, and data-driven applications.
          </p>
        </Reveal>
        <Reveal delay={.15}>
          <h3 style={{fontFamily:FH,fontSize:"clamp(22px,3vw,36px)",fontWeight:700,lineHeight:1.2,color:C.text,marginBottom:14,fontStyle:"italic"}}>Any Opportunity<br/>& Collaboration<br/>Welcome.</h3>
          <p style={{fontSize:13,color:C.muted,marginBottom:30,fontFamily:FB}}>Let's build something meaningful together.</p>
          <a href="mailto:tejas2005tp@gmail.com" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,textDecoration:"none",color:C.gold,fontFamily:FH,fontSize:15,fontWeight:600,fontStyle:"italic",transition:"letter-spacing .3s"}}
            onMouseEnter={e=>e.currentTarget.style.letterSpacing=".04em"}
            onMouseLeave={e=>e.currentTarget.style.letterSpacing="0"}
          >tejas2005tp@gmail.com <span style={{fontSize:20,fontStyle:"normal"}}>→</span></a>
          <div style={{marginTop:36,display:"flex",alignItems:"baseline",gap:14}}>
            <span style={{fontFamily:FH,fontSize:68,fontWeight:700,color:C.gold,lineHeight:1,fontStyle:"italic"}}><Counter to={2}/></span>
            <div>
              <div style={{fontSize:14,color:C.text,fontWeight:600,fontFamily:FB}}>Internships</div>
              <div style={{fontSize:12,color:C.muted,fontFamily:FB}}>Completed</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
 
/* ── Skills ───────────────────────────────────────────────── */
function Skills(){
  const [active,setActive]=useState(null);
  const cats=[...new Set(SKILLS_DATA.map(s=>s.cat))];
  return(
    <section id="skills" style={{background:C.bgDark,borderTop:`1px solid ${C.border}`,padding:"90px 8vw"}}>
      <Reveal>
        <SLabel>Expertise</SLabel>
        <h2 style={{fontFamily:FH,fontSize:"clamp(30px,4vw,52px)",fontWeight:700,letterSpacing:"-1px",color:C.text,marginBottom:52,fontStyle:"italic"}}>
          Skills &<br/><span style={{WebkitTextStroke:`1.5px ${C.gold}`,color:"transparent"}}>Tools.</span>
        </h2>
      </Reveal>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"start"}}>
        {/* Skill bars */}
        <Reveal delay={.05}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {SKILLS_DATA.map((sk,i)=><SkillBar key={sk.id} {...sk} index={i} active={active===sk.id} onHover={v=>setActive(v?sk.id:null)}/>)}
          </div>
        </Reveal>
        {/* Right panel */}
        <Reveal delay={.15}>
          {/* Category pills */}
          <div style={{display:"flex",flexWrap:"wrap",gap:9,marginBottom:40}}>
            {cats.map(cat=>{
              const items=SKILLS_DATA.filter(s=>s.cat===cat);
              const isActive=active&&items.find(s=>s.id===active);
              return(
                <div key={cat} style={{padding:"7px 16px",background:isActive?`${C.gold}15`:C.surface,border:`1px solid ${isActive?C.gold+"55":C.border}`,borderRadius:40,fontSize:12,color:isActive?C.text:C.muted,fontFamily:FM,letterSpacing:".06em",transition:"all .3s",cursor:"default",display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:isActive?C.gold:C.subtle,transition:"background .3s"}}/>
                  {cat} <span style={{fontSize:10,color:C.muted}}>({items.length})</span>
                </div>
              );
            })}
          </div>
          {/* Spotlight */}
          <div style={{background:active?`${C.gold}0a`:C.surface,border:`1px solid ${active?C.gold+"40":C.border}`,borderRadius:12,padding:"26px 28px",transition:"all .4s ease",marginBottom:32,minHeight:96,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {active?(()=>{
              const sk=SKILLS_DATA.find(s=>s.id===active);
              return(<>
                <div style={{fontSize:10,color:C.gold,letterSpacing:".15em",textTransform:"uppercase",fontFamily:FM,marginBottom:7}}>{sk.cat}</div>
                <div style={{fontFamily:FH,fontSize:24,fontWeight:700,color:C.text,marginBottom:10,fontStyle:"italic"}}>{sk.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{flex:1,height:3,background:C.border,borderRadius:3}}>
                    <div style={{height:"100%",width:`${sk.level}%`,background:`linear-gradient(90deg,${C.goldD},${C.gold})`,borderRadius:3,transition:"width .6s ease"}}/>
                  </div>
                  <span style={{fontSize:12,color:C.gold,fontFamily:FM,fontWeight:600}}>{sk.level}%</span>
                </div>
              </>);
            })():<p style={{fontSize:13,color:C.muted,fontFamily:FM}}>← Hover a skill to inspect</p>}
          </div>
          {/* Mini stats */}
          <div style={{display:"flex",gap:28}}>
            {[["14","Skills"],["5","Domains"],["2+","Years Exp"]].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:FH,fontSize:38,fontWeight:700,color:C.gold,lineHeight:1,fontStyle:"italic"}}>{n}</div>
                <div style={{fontSize:10,color:C.muted,letterSpacing:".1em",textTransform:"uppercase",marginTop:4,fontFamily:FM}}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
 
function SkillBar({name,level,cat,active,onHover,index}){
  const [ref,vis]=useInView(0.05);
  return(
    <div ref={ref} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)} style={{display:"flex",alignItems:"center",gap:13,padding:"9px 12px",borderRadius:8,background:active?`${C.gold}0c`:"transparent",border:`1px solid ${active?C.gold+"38":"transparent"}`,cursor:"default",transition:"all .3s"}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:active?C.gold:C.subtle,flexShrink:0,boxShadow:active?`0 0 8px ${C.gold}`:"none",transition:"all .3s"}}/>
      <span style={{fontFamily:FB,fontSize:13,color:active?C.text:C.muted,width:140,flexShrink:0,transition:"color .3s"}}>{name}</span>
      <div style={{flex:1,height:2,background:C.subtle,borderRadius:2}}>
        <div style={{height:"100%",borderRadius:2,background:active?`linear-gradient(90deg,${C.goldD},${C.gold})`:C.subtle,width:vis?`${level}%`:"0%",transition:`width .9s cubic-bezier(.16,1,.3,1) ${index*.04}s,background .3s`,boxShadow:active?`0 0 6px ${C.gold}70`:"none"}}/>
      </div>
      <span style={{fontFamily:FM,fontSize:11,color:active?C.gold:C.subtle,width:32,textAlign:"right",flexShrink:0,transition:"color .3s"}}>{level}%</span>
    </div>
  );
}
 
/* ── Works ────────────────────────────────────────────────── */
function Works(){
  return(
    <section id="works" style={{background:C.bg,borderTop:`1px solid ${C.border}`,padding:"90px 8vw"}}>
      <Reveal>
        <SLabel>Portfolio</SLabel>
        <h2 style={{fontFamily:FH,fontSize:"clamp(28px,4vw,50px)",fontWeight:700,letterSpacing:"-1px",color:C.text,marginBottom:52,fontStyle:"italic"}}>Selected Work.</h2>
      </Reveal>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:72}}>
        {PROJECTS.map((p,i)=><Reveal key={p.num} delay={i*.1}><ProjectCard {...p}/></Reveal>)}
      </div>
 
      <Reveal>
        <SLabel>Career</SLabel>
        <h2 style={{fontFamily:FH,fontSize:"clamp(24px,3vw,40px)",fontWeight:700,letterSpacing:"-1px",color:C.text,marginBottom:36,fontStyle:"italic"}}>Experience.</h2>
      </Reveal>
      {EXPERIENCE.map((e,i)=>(
        <Reveal key={i} delay={i*.08}>
          <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:40,padding:"36px 0",borderBottom:`1px solid ${C.border}`}}>
            <div>
              <div style={{fontSize:11,color:C.gold,letterSpacing:".08em",marginBottom:8,fontFamily:FM}}>{e.period}</div>
              <div style={{fontFamily:FH,fontSize:16,fontWeight:700,color:C.text,marginBottom:4,fontStyle:"italic"}}>{e.role}</div>
              <div style={{fontSize:12,color:C.muted,fontFamily:FB}}>{e.company}</div>
            </div>
            <ul style={{listStyle:"none",padding:0}}>
              {e.points.map((p,j)=>(
                <li key={j} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:13,color:C.muted,lineHeight:1.85,marginBottom:9,fontFamily:FB}}>
                  <span style={{color:C.gold,fontSize:7,marginTop:6,flexShrink:0}}>◆</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
 
      {/* Education */}
      <Reveal delay={.15}>
        <div style={{marginTop:40,background:C.card,border:`1px solid ${C.border}`,borderLeft:`4px solid ${C.gold}`,borderRadius:10,padding:"28px 32px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:10,color:C.gold,letterSpacing:".14em",textTransform:"uppercase",marginBottom:8,fontFamily:FM}}>2022 – 2026 · Education</div>
            <div style={{fontFamily:FH,fontSize:18,fontWeight:700,color:C.text,marginBottom:4,fontStyle:"italic"}}>B.Tech — Artificial Intelligence & Data Science</div>
            <div style={{fontSize:13,color:C.muted,fontFamily:FB}}>Sengunthar Engineering College, Tiruchengode, Namakkal</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:24}}>
            <div style={{fontSize:10,color:C.muted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4,fontFamily:FM}}>CGPA</div>
            <div style={{fontFamily:FH,fontSize:40,fontWeight:700,color:C.gold,lineHeight:1,fontStyle:"italic"}}>8.0</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
 
function ProjectCard({num,title,stack,desc}){
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?C.card:C.surface,border:`1px solid ${hov?C.gold+"45":C.border}`,borderRadius:14,padding:"30px 26px",transition:"all .35s ease",cursor:"default",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-6,right:14,fontFamily:FH,fontStyle:"italic",fontSize:78,fontWeight:700,color:hov?`${C.gold}15`:`${C.text}04`,lineHeight:1,userSelect:"none",transition:"color .4s"}}>{num}</div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {stack.map(t=><span key={t} style={{padding:"3px 10px",background:`${C.gold}12`,border:`1px solid ${C.gold}28`,borderRadius:5,fontSize:11,color:C.gold,fontFamily:FM}}>{t}</span>)}
      </div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:700,color:C.text,marginBottom:10,fontStyle:"italic"}}>{title}</div>
      <p style={{fontSize:13,color:C.muted,lineHeight:1.82,fontFamily:FB}}>{desc}</p>
      <div style={{marginTop:18,fontSize:12,color:hov?C.gold:C.subtle,fontFamily:FM,transition:"color .3s"}}>
        View project <span style={{display:"inline-block",transform:hov?"translateX(4px)":"none",transition:"transform .3s"}}>→</span>
      </div>
    </div>
  );
}
 
/* ── Contact ──────────────────────────────────────────────── */
function Contact(){
  return(
    <section id="contact" style={{background:C.bgDark,borderTop:`1px solid ${C.border}`,padding:"90px 8vw 80px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8vw",alignItems:"start"}}>
        <Reveal>
          <SLabel>Get In Touch</SLabel>
          <h2 style={{fontFamily:FH,fontSize:"clamp(36px,5.5vw,70px)",fontWeight:700,letterSpacing:"-1.5px",color:C.text,lineHeight:.95,marginBottom:22,fontStyle:"italic"}}>
            Let's<br/><span style={{WebkitTextStroke:`1.5px ${C.gold}`,color:"transparent"}}>Work.</span>
          </h2>
          <p style={{fontSize:14,color:C.muted,lineHeight:1.85,maxWidth:360,marginBottom:36,fontFamily:FB}}>
            Actively seeking entry-level roles in Python development, data automation, and backend engineering. Open to full-time roles, internships, and collaborations.
          </p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <GoldBtn primary onClick={()=>window.location.href="mailto:tejas2005tp@gmail.com"}>Say Hello →</GoldBtn>
            <GoldBtn onClick={()=>window.open("https://linkedin.com/in/tejju","_blank")}>LinkedIn ↗</GoldBtn>
          </div>
        </Reveal>
        <Reveal delay={.15}>
          {[{label:"Email",value:"tejas2005tp@gmail.com",href:"mailto:tejas2005tp@gmail.com"},{label:"Phone",value:"+91 8940631803",href:"tel:+918940631803"},{label:"LinkedIn",value:"linkedin.com/in/tejju",href:"https://linkedin.com/in/tejju"}].map(({label,value,href})=>(
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0",borderBottom:`1px solid ${C.border}`,textDecoration:"none",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.querySelector(".arr").style.transform="translate(4px,-4px)";e.currentTarget.querySelector(".lbl").style.color=C.text;}}
              onMouseLeave={e=>{e.currentTarget.querySelector(".arr").style.transform="translate(0,0)";e.currentTarget.querySelector(".lbl").style.color=C.muted;}}
            >
              <div>
                <div style={{fontSize:10,color:C.gold,letterSpacing:".15em",textTransform:"uppercase",marginBottom:4,fontFamily:FM}}>{label}</div>
                <div className="lbl" style={{fontSize:14,color:C.muted,fontFamily:FB,transition:"color .3s"}}>{value}</div>
              </div>
              <span className="arr" style={{fontSize:18,color:C.gold,transition:"transform .3s"}}>→</span>
            </a>
          ))}
          <div style={{display:"flex",gap:10,marginTop:28,flexWrap:"wrap"}}>
            {SOCIALS.map((s,i)=><SocialBadge key={s.label} {...s} delay={.1+i*.08}/>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
 
/* ── Gold Button ──────────────────────────────────────────── */
function GoldBtn({children,primary,onClick}){
  const [hov,setHov]=useState(false);
  return(
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      padding:"12px 26px",borderRadius:8,
      background:primary?(hov?C.goldL:C.gold):(hov?C.surface:"transparent"),
      color:primary?C.bgDark:(hov?C.text:C.muted),
      border:primary?"none":`1px solid ${hov?C.gold+"60":C.border}`,
      fontFamily:FB,fontSize:13,fontWeight:600,
      cursor:"pointer",transform:hov?"translateY(-2px)":"none",
      boxShadow:hov&&primary?`0 10px 26px ${C.gold}38`:"none",
      transition:"all .25s ease",letterSpacing:".01em",
    }}>{children}</button>
  );
}
 
/* ── Footer ───────────────────────────────────────────────── */
function Footer(){
  return(
    <footer style={{background:C.bg,borderTop:`1px solid ${C.border}`,padding:"20px 52px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:11,color:C.subtle,fontFamily:FM}}>© 2025 Tejasvin M</span>
      <div style={{width:36,height:36,background:C.gold,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FH,fontWeight:700,fontSize:16,color:C.bgDark,fontStyle:"italic"}}>T.</div>
      <span style={{fontSize:11,color:C.subtle,fontFamily:FM}}>Built with React</span>
    </footer>
  );
}
 
/* ── App ──────────────────────────────────────────────────── */
export default function Portfolio(){
  return(
    <div style={{background:C.bgDark,color:C.text,minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#0e0e0e;}
        ::selection{background:#c9a84c30;color:#e8d07a;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#0e0e0e;}
        ::-webkit-scrollbar-thumb{background:#c9a84c55;border-radius:4px;}
      `}</style>
      <Nav/>
      <Hero/>
      <About/>
      <Skills/>
      <Works/>
      <Contact/>
      <Footer/>
    </div>
  );
}