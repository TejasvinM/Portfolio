import { useState, useEffect, useRef } from "react";
import "./portfolio.css";
import photo from "./assets/photo.jpg.png";
import meCartoon from "./assets/me-cartoon.png";
import meScooterShirt from "./assets/me-scooter-shirt.png";
import { Sparkle, Pencil, Cursor, Coin, Auto, Rider, Chai, Phone, CurlyArrow, Squiggle, InvoiceArt, TravelArt, KovaiArt } from "./Doodles.jsx";

/* ── Content ──────────────────────────────────────────────── */
const NAME = "TEJASVIN";
const GREETINGS = ["Vanakkam, I'm", "Hey, I'm"];
const EMAIL = "tejas2005tp@gmail.com";

/* ── Draggable sticker ────────────────────────────────────── */
function Sticker({ className, children, delay = 0 }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef(null);
  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y };
    setDrag(true);
  };
  const move = (e) => {
    if (!start.current) return;
    setPos({ x: start.current.x + e.clientX - start.current.mx, y: start.current.y + e.clientY - start.current.my });
  };
  const up = () => { start.current = null; setDrag(false); };
  return (
    <div
      className={`sticker ${className} ${drag ? "dragging" : ""}`}
      style={{ "--dx": `${pos.x}px`, "--dy": `${pos.y}px`, "--d": `${delay}s` }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    >
      <div className="sticker-bob">{children}</div>
    </div>
  );
}

/* ── Scroll reveal ────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold });
    ob.observe(el); return () => ob.disconnect();
  }, [threshold]);
  return [ref, vis];
}
function Reveal({ as: Tag = "div", className = "", delay = 0, style, children, ...rest }) {
  const [ref, vis] = useInView(0.15);
  return <Tag ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ "--rd": `${delay}s`, ...style }} {...rest}>{children}</Tag>;
}

/* ── Nav ──────────────────────────────────────────────────── */
function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Work", "Experience"];
  useEffect(() => {
    const ids = ["home", "about", "work", "experience", "contact"];
    const fn = () => {
      let cur = "home";
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 140) cur = id; });
      setActive(cur);
    };
    window.addEventListener("scroll", fn); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="logo" onClick={() => go("home")} aria-label="Home">TM</button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <button key={l} className={`nav-link ${active === l.toLowerCase() ? "active" : ""}`} onClick={() => go(l.toLowerCase())}>{l}</button>
          ))}
          <button className="btn btn-orange nav-cta-mobile" onClick={() => go("contact")}>LET'S TALK</button>
        </div>
        <button className="btn btn-orange nav-cta" onClick={() => go("contact")}>LET'S TALK</button>
        <button className={`burger ${open ? "x" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Menu"><span /><span /></button>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const [g, setG] = useState(0);
  useEffect(() => { const id = setInterval(() => setG((i) => (i + 1) % GREETINGS.length), 2400); return () => clearInterval(id); }, []);
  return (
    <section id="home" className="hero paper">
      <div className="margin-line" />

      <Sticker className="d-sparkle" delay={1.0}><Sparkle /></Sticker>
      <Sticker className="d-pencil" delay={1.1}><Pencil /></Sticker>
      <Sticker className="d-coin" delay={1.2}><Coin /></Sticker>
      <Sticker className="d-auto" delay={1.3}><Auto /></Sticker>
      <Sticker className="d-rider" delay={1.4}><Rider /></Sticker>
      <Sticker className="d-chai" delay={1.5}><Chai /></Sticker>
      <Sticker className="d-phone" delay={1.6}><Phone /></Sticker>
      <Sticker className="d-me" delay={1.8}><img src={meCartoon} alt="Tejasvin M, cartoon" draggable="false" /></Sticker>

      <div className="hero-center">
        <div className="greet hand" key={g}>{GREETINGS[g]}<CurlyArrow /></div>

        <div className="name-wrap">
          <div className="select-box">
            <h1 className="name" aria-label={NAME}>
              {NAME.split("").map((c, i) => (
                <span key={i} className="ch" style={{ "--i": i }}>{c}</span>
              ))}
            </h1>
            <i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" />
            <span className="hug">Hug × Hug</span>
          </div>
          <span className="tag t-pink   tag-tl">Python</span>
          <span className="tag t-yellow tag-tr">Full Stack</span>
          <span className="tag t-green  tag-bl">Django</span>
          <span className="tag t-blue   tag-br">SQL</span>
          <div className="cursor-tag">
            <span className="cursor-ico"><Cursor /></span>
            <span className="tag t-orange">React / MERN</span>
          </div>
        </div>

        <p className="tagline">
          I build full-stack web apps and Python backends people{" "}
          <span className="ul">enjoy using<Squiggle /></span>, and automate the data work behind them.
        </p>

        <div className="cta-row">
          <button className="btn btn-orange btn-lg" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>SEE MY WORK</button>
          <span className="hand resume-line">or grab my résumé: <a href="/Tejasvin_resume.pdf" target="_blank" rel="noreferrer">download ↓</a></span>
        </div>

        <div className="status mono"><i className="dot" />OPEN TO FULL-TIME ROLES · BENGALURU, INDIA · IST</div>
      </div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────── */
const ABOUT_TAGS = [
  ["Python", "t-yellow"], ["Django / DRF", "t-pink"], ["SQL", "t-green"], ["React / MERN", "t-blue"],
  ["REST APIs", "t-lilac"], ["Automation", "t-yellow"],
];
const STICKIES = [
  { big: "400+", small: "SQL queries optimized across relational databases", cls: "s-yellow", r: -3 },
  { big: "2", small: "internships shipped: MERN @ Innoknowvex, GenAI @ Zephyr", cls: "s-pink", r: 2.5 },
  { big: "7.5", small: "CGPA · B.Tech AI & Data Science, 2026", cls: "s-green", r: -1.5 },
];
const PLACES = [
  ["ZEPHYR TECHNOLOGIES", "t-yellow", -2], ["INNOKNOWVEX", "t-pink", 1.5], ["Q-SPIDERS", "t-green", -1],
  ["IRJCS · PUBLISHED", "t-blue", 2], ["SENGUNTHAR ENGG. COLLEGE", "t-lilac", -1.5],
];

function About() {
  return (
    <section id="about" className="about paper">
      <div className="margin-line" />
      <div className="about-grid">
        <Reveal className="polaroid" delay={0}>
          <span className="tape t-pink" />
          <img src={photo} alt="Tejasvin M" />
          <span className="hand cap">me, somewhere in Bengaluru</span>
        </Reveal>

        <Reveal className="notepad" delay={0.1}>
          <div className="rings">{Array.from({ length: 14 }).map((_, i) => <i key={i} />)}</div>
          <h2 className="np-title">A BIT ABOUT ME</h2>
          <p className="np-text">
            I'm a Python developer from Tamil Nadu, now based in Bengaluru, with a B.Tech in Artificial Intelligence
            and Data Science. I work across the stack: Python and Django on the backend, React and the MERN stack on the
            front, and SQL holding it all together. I enjoy turning slow, manual work into clean automated systems, and
            I'm always learning the next thing that makes software simpler, faster and more reliable.
          </p>
          <div className="np-tags">
            {ABOUT_TAGS.map(([t, c]) => <span key={t} className={`chip ${c}`}>{t}</span>)}
          </div>
        </Reveal>

        <div className="stickies">
          {STICKIES.map((n, i) => (
            <Reveal key={n.big} className={`sticky ${n.cls}`} delay={0.2 + i * 0.1} style={{ "--rot": `${n.r}deg` }}>
              <div className="st-big">{n.big}</div>
              <div className="st-small">{n.small}</div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="places" delay={0.1}>
        <div className="hand places-title">places I've learned & shipped with ↓</div>
        <div className="places-row">
          {PLACES.map(([t, c, r]) => <span key={t} className={`label ${c}`} style={{ "--rot": `${r}deg` }}>{t}</span>)}
        </div>
      </Reveal>
    </section>
  );
}

/* ── Selected Work ────────────────────────────────────────── */
const PROJECTS = [
  {
    meta: "PERSONAL PROJECT · 2026", short: "Invoice Platform", color: "t-green", Art: InvoiceArt,
    title: "INVOICE PROCESSING PLATFORM",
    desc: "A Django REST platform that takes invoice PDFs and images, extracts and validates the data, and turns it into searchable analytics.",
    stack: "Python, Django, DRF, PostgreSQL, Celery, Redis, Docker",
    points: [
      "Invoice PDF/image uploads with document extraction, validation and PostgreSQL storage, plus auth, search, filtering and pagination.",
      "Asynchronous processing with Celery and Redis: status tracking, retries and scheduled tasks; optimized queries; deployed with Docker.",
    ],
    links: [["VIEW ON GITHUB", "https://github.com/TejasvinM/Automated_Invoice_project", "btn-orange"]],
  },
  {
    meta: "FULL-STACK · 2026", short: "Namma Kovai", color: "t-yellow", Art: KovaiArt,
    title: "NAMMA KOVAI: TOURISM PLATFORM",
    desc: "A guide to Coimbatore's places, food and adventures, rebuilt from a static website into a full-stack application.",
    stack: "Python, Django, DRF, PostgreSQL, Next.js, TypeScript",
    points: [
      "Rebuilt a static tourism website into a full-stack application with a Django REST API, PostgreSQL, token authentication, and a Next.js front end with server-side rendering and SEO.",
      "Built user accounts, a shareable trip planner, and live weather and map integrations; deployed to production with CI/CD and 130+ automated API and end-to-end tests.",
    ],
    links: [
      ["VISIT SITE", "https://namma-kovai.netlify.app/", "btn-orange"],
      ["GITHUB", "https://github.com/TejasvinM/Explore-Kovai-Website", "btn-white"],
    ],
  },
  {
    meta: "DATABASE DESIGN · 2025", short: "European Travel DB", color: "t-pink", Art: TravelArt,
    title: "EUROPEAN TRAVEL ORGANIZATION",
    desc: "Designed a normalized relational database covering customers, tour packages, bookings, payments, hotels, guides, flights, and countries. Implemented PKs, FKs, composite keys, and junction tables following 3NF principles across 10 tables.",
    stack: "PostgreSQL, MySQL, MS SQL Server",
    points: [],
    links: [["VIEW ON GITHUB", "https://github.com/TejasvinM/Europian_Travel_organization_Database", "btn-orange"]],
  },
];

const ROAD = "M-40 210 C 120 120, 260 120, 380 170 S 620 250, 760 170 S 1000 60, 1140 120 S 1360 200, 1480 130";

function ProjectCard({ p, i, offset, onClick }) {
  const Art = p.Art;
  const abs = Math.abs(offset);
  return (
    <article
      className={`pcard ${offset === 0 ? "active" : ""}`}
      style={{ "--o": offset, "--abs": abs, zIndex: 10 - abs }}
      onClick={offset !== 0 ? onClick : undefined}
      aria-hidden={offset !== 0}
    >
      <div className="pc-art"><Art /></div>
      <div className="pc-body">
        <div className="pc-meta mono"><span className={`pc-num ${p.color}`}>{String(i + 1).padStart(2, "0")}</span>{p.meta}</div>
        <h3 className="pc-title">{p.title}</h3>
        <p className="pc-desc">{p.desc}</p>
        <div className="pc-boxes">
          <div className="pc-box t-blue"><span className="mono">STACK</span>{p.stack}</div>
        </div>
        {p.points.length > 0 && (
          <ul className="pc-points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        )}
        {p.links && (
          <div className="pc-links">
            {p.links.map(([label, href, cls]) => (
              <a key={href} className={`btn ${cls} pc-link`} href={href} target="_blank" rel="noreferrer" tabIndex={offset === 0 ? 0 : -1}>{label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* Rider follows the road; positioned in screen space so it never stretches */
function RoadRider() {
  const ref = useRef(null);
  useEffect(() => {
    const path = document.getElementById("road-path");
    const svg = path?.ownerSVGElement;
    if (!path || !svg) return;
    const len = path.getTotalLength();
    const DUR = 14000;
    let raf, t0;
    const tick = (t) => {
      if (t0 == null) t0 = t;
      const r = svg.getBoundingClientRect();
      const host = ref.current?.parentElement?.getBoundingClientRect();
      if (ref.current && host) {
        const sx = r.width / 1440, sy = r.height / 300;
        const d = (((t - t0) % DUR) / DUR) * len;
        const a = path.getPointAtLength(d), b = path.getPointAtLength(Math.min(len, d + 4));
        const x = a.x * sx + (r.left - host.left), y = a.y * sy + (r.top - host.top);
        const ang = Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180 / Math.PI;
        ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${ang}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="road-rider" ref={ref} aria-hidden="true">
      <div className="rr-inner"><Rider head={meCartoon} /></div>
    </div>
  );
}

function Work() {
  const [cur, setCur] = useState(0);
  const n = PROJECTS.length;
  const go = (k) => setCur(Math.max(0, Math.min(n - 1, k)));
  const sx = useRef(null);
  const down = (e) => { sx.current = e.clientX; };
  const up = (e) => {
    if (sx.current == null) return;
    const dx = e.clientX - sx.current; sx.current = null;
    if (dx < -50) go(cur + 1); else if (dx > 50) go(cur - 1);
  };
  useEffect(() => {
    const fn = (e) => {
      const r = document.getElementById("work")?.getBoundingClientRect();
      if (!r || r.top > window.innerHeight * 0.5 || r.bottom < window.innerHeight * 0.5) return;
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "ArrowLeft") go(cur - 1);
    };
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  });
  return (
    <section id="work" className="work">
      <div className="work-head">
        <svg className="road" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
          <path id="road-path" d={ROAD} fill="none" stroke="#fff" strokeWidth="60" strokeDasharray="22 14" />
          <path d={ROAD} fill="none" stroke="#1d1c1f" strokeWidth="50" />
          <path d={ROAD} fill="none" stroke="#f9c74f" strokeWidth="3.5" strokeDasharray="20 16" />
        </svg>
        <RoadRider />
        <Reveal className="work-title-wrap">
          <h2 className="work-title">SELECTED<br />WORK</h2>
        </Reveal>
        <div className="hand work-hint">{n} projects · swipe or use the arrows to flip →</div>
      </div>

      <div className="stage" onPointerDown={down} onPointerUp={up}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} offset={i - cur} onClick={() => go(i)} />)}
      </div>

      <div className="pager">
        <button className="pg-btn" onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="Previous project">←</button>
        <div className="pg-dots">
          {PROJECTS.map((p, i) => <button key={i} className={`pg-dot ${i === cur ? "on" : ""}`} onClick={() => go(i)} aria-label={p.short} />)}
        </div>
        <span className="mono pg-label">{String(cur + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {PROJECTS[cur].short}</span>
        <button className="pg-btn" onClick={() => go(cur + 1)} disabled={cur === n - 1} aria-label="Next project">→</button>
      </div>
    </section>
  );
}

/* ── Experience & Skills ──────────────────────────────────── */
const JOBS = [
  {
    when: "JAN – APR 2026", role: "MERN Stack Intern", company: "Innoknowvex", place: "Bengaluru", color: "t-blue", stamp: "MERN",
    points: [
      "Built responsive tourist-platform pages using HTML, CSS, JavaScript, and Bootstrap, integrating frontend components with backend services in a MERN application.",
      "Optimized page structure and navigation for cross-device usability while handling UI-database data flow and resolving frontend rendering and integration issues.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Bootstrap"],
  },
  {
    when: "JUL – AUG 2025", role: "Generative AI Intern", company: "Zephyr Technologies Pvt. Ltd.", place: "Bengaluru", color: "t-pink", stamp: "GenAI",
    points: [
      "Applied Python and SQL to extract, clean, validate, and automate ingestion of relational datasets for AI/ML model evaluation and improved data consistency.",
      "Built a traffic flow prediction model using weather data, Pandas, Random Forest, and Django; generated analytical reports on dataset quality and model-readiness.",
    ],
    tags: ["Python", "SQL", "Pandas", "Django"],
  },
];
const EXTRAS = [
  { k: "EDUCATION · 2022 – 2026", t: "B.Tech, AI & Data Science", s: "Sengunthar Engineering College, Namakkal · CGPA 7.5", c: "s-yellow", r: -1.5 },
  { k: "TRAINING · 2026", t: "Python Full Stack Development", s: "Q-Spiders, Marathahalli, Bengaluru", c: "s-green", r: 1.5 },
  { k: "PUBLICATION · MAR 2026", t: "Integrated Advertisement Bidding & Pricing", s: "A machine learning auction model · IRJCS", c: "s-pink", r: -1, href: "https://doi.org/10.26562/irjcs.2026.v13i03.14" },
];
const SKILLS = [
  { t: "LANGUAGES & CS", c: "t-yellow", items: "Python, SQL, JavaScript · Data Structures & Algorithms, OOP, DBMS" },
  { t: "BACKEND", c: "t-green", items: "Django, Django REST Framework, Flask, Node.js, Express.js, RESTful APIs, Celery, Redis" },
  { t: "FRONTEND", c: "t-blue", items: "React, Next.js, TypeScript, HTML5, CSS3, Bootstrap, responsive layouts" },
  { t: "DATA & AUTOMATION", c: "t-pink", items: "Pandas, NumPy, ETL, Python automation, data extraction, cleaning, validation & ingestion" },
  { t: "DATABASES", c: "t-lilac", items: "PostgreSQL, MySQL, MS SQL Server, MongoDB · query optimization" },
  { t: "TOOLS & SHIPPING", c: "t-white", items: "Git, GitHub, Docker, VS Code, pgAdmin, MySQL Workbench, Netlify" },
];

function Experience() {
  return (
    <section id="experience" className="xp paper">
      <div className="margin-line" />
      <div className="xp-inner">
        <Reveal className="sec-head">
          <h2 className="sec-title">EXPERIENCE</h2>
          <span className="hand sec-note">where I've clocked in ↓</span>
        </Reveal>

        <div className="timeline">
          {JOBS.map((j, i) => (
            <Reveal key={j.company} className="job" delay={i * 0.1}>
              <div className="job-when">
                <span className={`stamp ${j.color}`}>{j.stamp}</span>
                <span className="mono">{j.when}</span>
              </div>
              <div className="job-card">
                <h3 className="job-role">{j.role}</h3>
                <div className="job-co">{j.company} · <span>{j.place}</span></div>
                <ul className="pc-points job-points">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <div className="job-tags">{j.tags.map((t) => <span key={t} className="chip t-white">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="extras">
          {EXTRAS.map((e, i) => {
            const body = (<><div className="mono ex-k">{e.k}</div><div className="ex-t">{e.t}</div><div className="ex-s">{e.s}{e.href ? " ↗" : ""}</div></>);
            return (
              <Reveal key={e.t} className={`sticky ex ${e.c}`} delay={i * 0.08} style={{ "--rot": `${e.r}deg` }}>
                {e.href ? <a href={e.href} target="_blank" rel="noreferrer" className="ex-link">{body}</a> : body}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="sec-head skills-head">
          <h2 className="sec-title">TOOLBOX</h2>
          <span className="hand sec-note">what I reach for ↓</span>
        </Reveal>
        <div className="skills">
          {SKILLS.map((k, i) => (
            <Reveal key={k.t} className={`skill ${k.c}`} delay={(i % 3) * 0.08}>
              <h4 className="skill-t">{k.t}</h4>
              <p className="skill-i">{k.items}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch {
      const t = document.createElement("textarea"); t.value = EMAIL; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      t.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="contact">
      <div className="hazard" />
      <Reveal className="ct-head">
        <h2 className="ct-title">LET'S BUILD<br />SOMETHING.</h2>
        <div className="hand ct-sub">vaanga, onnah build pannalaam 💛 <span>(come, let's build something)</span></div>
      </Reveal>

      <div className="ct-body">
        <svg className="ct-road" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 200 C 200 170, 300 90, 520 110 S 900 160, 1100 80 S 1380 40, 1460 60" fill="none" stroke="#2c2b30" strokeWidth="46" />
          <path d="M-20 200 C 200 170, 300 90, 520 110 S 900 160, 1100 80 S 1380 40, 1460 60" fill="none" stroke="#f9c74f" strokeWidth="3.5" strokeDasharray="22 16" />
        </svg>

        <Reveal className="polaroid ct-pol" delay={0.05}>
          <span className="tape t-pink" />
          <div className="ct-pol-img"><img src={meScooterShirt} alt="Tejasvin on a scooter, illustrated" /></div>
          <span className="hand cap">on my way to your office</span>
        </Reveal>

        <Reveal className="letter" delay={0.15}>
          <div className="postage"><Coin /><span className="mono">BENGALURU</span></div>
          <div className="hand to">to: you, the person hiring</div>
          <p className="letter-text">Got a role, a project or just a rough idea? Email is the quickest way to reach me, and I usually reply the same day.</p>
          <div className="mail-row">
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className={`copy ${copied ? "done" : ""}`} onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
          </div>
          <div className="letter-actions">
            <a className="btn btn-orange" href="/Tejasvin_resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ</a>
            <a className="btn btn-yellow" href="tel:+918940631803">CALL ME</a>
            <a className="hand l-link" href="https://linkedin.com/in/tejju" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="hand l-link" href="https://github.com/TejasvinM" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </Reveal>
      </div>

      <footer className="foot">
        <span>© 2026 Tejasvin M</span>
        <span className="hand foot-mid">konjam fast-ah, aana proper-ah <small>(quick, but done properly)</small></span>
        <span className="foot-chai"><Chai /></span>
      </footer>
    </section>
  );
}

/* ── App ──────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <div className="site">
      <Nav />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </div>
  );
}
